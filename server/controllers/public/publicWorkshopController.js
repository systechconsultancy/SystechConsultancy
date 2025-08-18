import mongoose from "mongoose";
import Workshop from '../../models/Workshop.js';
import Transaction from '../../models/Transaction.js';
// import { sendWorkshopConfirmationEmail } from '../../utils/emailUtils.js';

/**
 * @desc    Fetch all published, upcoming workshops
 * @route   GET /api/workshops
 * @access  Public
 */
export const getPublicWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find({
      status: 'Published',
      date: { $gte: new Date() } // Only fetch workshops with a future or current date
    }).sort({ date: 'asc' }); // Show the soonest workshops first
    
    res.json(workshops);
  } catch (err) {
    console.error("Error fetching public workshops:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @desc    Fetch a single published, upcoming workshop by ID
 * @route   GET /api/workshops/:id
 * @access  Public
 */
export const getPublicWorkshopBySlug = async (req, res) => {
  try {
    const workshop = await Workshop.findOne({
      slug: req.params.slug,
      status: 'Published',
      date: { $gte: new Date() }
    });

    if (workshop) {
      res.json(workshop);
    } else {
      // If the workshop is not found, or if it's a draft/completed, send a 404
      res.status(404).json({ message: "Workshop not found" });
    }
  } catch (error) {
    console.error(`Error fetching workshop ${req.params.id}:`, error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const initiateWorkshopRegistration = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    const userId = req.user.id;
    if (!workshop) return res.status(404).json({ message: 'Workshop not found.' });
    if (workshop.registeredUsers.some(user => user._id.equals(userId))) {
      return res.status(400).json({ message: 'You are already registered for this workshop.' });
    }
    if (workshop.registeredUsers.length >= workshop.maxParticipants) {
      return res.status(400).json({ message: 'This workshop is full.' });
    }

    res.status(200).json({ success: true, message: 'You can proceed to payment.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error });
  }
};

export const confirmWorkshopRegistration = async (req, res) => {
  const { txnId, screenshotUrl } = req.body;
  const { id: workshopId } = req.params;
  const user = req.user; // From the 'protectUser' middleware

  if (!txnId || !screenshotUrl) {
    return res.status(400).json({ message: 'Transaction ID and screenshot are required.' });
  }

  const session = await mongoose.startSession();
  try {
    let finalWorkshopTitle = '';

    await session.withTransaction(async () => {
      const workshop = await Workshop.findById(workshopId).session(session);

      // --- Pre-registration Checks ---
      if (!workshop) throw new Error('WORKSHOP_NOT_FOUND');
      if (workshop.registeredUsers.some(u => u._id.equals(user._id))) {
        throw new Error('ALREADY_REGISTERED');
      }
      if (workshop.registeredUsers.length >= workshop.maxParticipants) {
        throw new Error('WORKSHOP_FULL');
      }
      const existingTxn = await Transaction.findOne({ txnId }).session(session);
      if (existingTxn) throw new Error('DUPLICATE_TXN');

      // --- Main Logic ---
      // 1. Add user to the workshop's registered list
      workshop.registeredUsers.push({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone, // Assuming 'phone' is on the user model
        transactionId: txnId,
      });
      await workshop.save({ session });

      // 2. Create a transaction record
      const newTxn = new Transaction({
        txnId,
        studentId: user._id, // Link to the user who paid
        amount: workshop.fee,
        screenshotUrl,
        type: 'workshop', // A new type for workshop transactions
      });
      await newTxn.save({ session });

      finalWorkshopTitle = workshop.title;
    });

    // --- Post-Transaction Actions ---
    res.status(200).json({ success: true, message: `Successfully registered for ${finalWorkshopTitle}!` });

    // Optionally send a confirmation email (fire-and-forget)
    // sendWorkshopConfirmationEmail(user, { title: finalWorkshopTitle }).catch(err => console.error(err));

  } catch (error) {
    // --- Error Handling ---
    let status = 500;
    let message = "Server Error. Please try again.";

    if (error.message === 'WORKSHOP_NOT_FOUND') {
      status = 404;
      message = 'Workshop not found.';
    } else if (error.message === 'ALREADY_REGISTERED') {
      status = 400;
      message = 'You are already registered for this workshop.';
    } else if (error.message === 'WORKSHOP_FULL') {
      status = 400;
      message = 'Sorry, this workshop is now full.';
    } else if (error.message === 'DUPLICATE_TXN') {
      status = 400;
      message = 'This transaction ID has already been used.';
    }
    
    console.error("Workshop Confirmation Error:", error.message);
    res.status(status).json({ message });
  } finally {
    await session.endSession();
  }
};

export const getRegistrationStatus = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ message: 'Workshop not found.' });
    const isRegistered = workshop.registeredUsers.some(user => user._id.equals(req.user.id));
    
    res.json({ isRegistered });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};