import Workshop from '../../models/Workshop.js';

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