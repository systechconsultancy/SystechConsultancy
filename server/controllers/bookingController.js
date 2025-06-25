import mongoose from "mongoose";
import Student from "../models/Student.js";
import Group from "../models/Group.js";
import DailyBookingSummary from "../models/DailyBookingSummary.js";
import Transaction from "../models/Transaction.js";
import { sendInvoice } from "../utils/sendInvoiceUtility.js";
import { getSlotCountForGroupSize } from "../utils/slotUtils.js";
import { v4 as uuidv4 } from "uuid";


const initiateIndividualBooking = async (req, res) => {
  try {
    const { name, email, phone, fieldOfInterest, academicBackground, expectationsFromCall, mode, dateOfCall } = req.body;

    if (!name || !email || !phone || !academicBackground || !mode || !dateOfCall) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
        error: "VALIDATION_ERROR",
      });
    }

    // ✅ Check booking capacity first
    const dateDoc = await DailyBookingSummary.findOne({ date: dateOfCall });
    if (dateDoc && dateDoc.count >= 5) {
      return res.status(400).json({
        success: false,
        message: "Selected day is fully booked. Please choose another day.",
        error: "SLOTS_FULL",
      });
    }

    // ✅ Proceed to create/update student (no need for transaction here)
    let student = await Student.findOne({ email });

    if (student && student.isPaid) {
      return res.status(400).json({
        success: false,
        message: "This email has already been used to book a session.",
        error: "DUPLICATE_EMAIL",
      });
    }

    if (student) {
      student.name = name;
      student.phone = phone;
      student.fieldOfInterest = fieldOfInterest;
      student.academicBackground = academicBackground;
      student.expectationsFromCall = expectationsFromCall;
      student.mode = mode;
      student.dateOfCall = dateOfCall;
    } else {
      student = new Student({
        name,
        email,
        phone,
        fieldOfInterest,
        academicBackground,
        expectationsFromCall,
        mode,
        dateOfCall,
        isPaid: false,
      });
    }

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Student data saved. Proceed to payment.",
      data: { studentId: student._id },
    });

  } catch (error) {
    console.error("Initiate Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: "SERVER_ERROR",
    });
  }
};

const confirmIndividualBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { studentId, amount, screenshotUrl, txnId } = req.body;

    await session.withTransaction(async () => {
      // Step 1: Validate student
      const student = await Student.findById(studentId).session(session);
      if (!student) {
        throw new Error("STUDENT_NOT_FOUND");
      }

      // Step 2: Prevent duplicate transaction
      const existingTxn = await Transaction.findOne({ txnId }).session(session);
      if (existingTxn) {
        throw new Error("DUPLICATE_TXN");
      }

      // Step 3: Check and update booking count
      let dateDoc = await DailyBookingSummary.findOne({ date: student.dateOfCall }).session(session);

      if (dateDoc && dateDoc.count >= 5) {
        throw new Error("SLOTS_FULL");
      }

      if (!dateDoc) {
        dateDoc = new DailyBookingSummary({
          date: student.dateOfCall,
          students: [studentId],
          count: 1
        });
      } else {
        dateDoc.students.push(studentId);
        dateDoc.count += 1;
      }

      // Step 4: Mark student as paid
      student.isPaid = true;

      // Step 5: Save everything atomically
      await student.save({ session });
      await dateDoc.save({ session });

      const newTxn = new Transaction({
        txnId,
        studentId,
        amount: amount || 250,
        screenshotUrl,
      });

      await newTxn.save({ session });
    });

    // Step 6: Send invoice (after transaction committed)
    const student = await Student.findById(studentId); // re-fetch after commit
    res.status(200).json({
      success: true,
      message: "Your payment has been successfully processed. Your session has been booked. A confirmation email will be sent shortly.",
    });

    const utcDate = new Date()
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(utcDate);
    const date = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
    sendInvoice(student.name, student.email, student.phone, date)
      .then(() => console.log("Invoice sent"))
      .catch((err) => {
        console.error("Failed to send invoice:", err);
        // Optionally insert to retry queue: await InvoiceQueue.create(...)
      });
  } catch (err) {
    console.error("Confirm Booking Error:", err);

    // Clean structured responses
    if (err.message === "SLOTS_FULL") {
      return res.status(400).json({
        success: false,
        message: "Selected day is fully booked. Please choose another day.",
        error: "SLOTS_FULL",
      });
    }

    if (err.message === "DUPLICATE_TXN") {
      return res.status(400).json({
        success: false,
        message: "Duplicate Transaction ID. Please enter a valid one.",
        error: "DUPLICATE_TXN",
      });
    }

    if (err.message === "STUDENT_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
        error: "NOT_FOUND",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  } finally {
    await session.endSession();
  }
};


const initiateGroupBooking = async (req, res) => {
  const session = await mongoose.startSession();

  const { students, date, mode } = req.body;

  if (!Array.isArray(students) || students.length < 2 || students.length > 5) {
    return res.status(400).json({
      success: false,
      message: "Group must contain 2 to 5 students.",
      error: "INVALID_GROUP_SIZE",
    });
  }

  if (!date || !mode) {
    return res.status(400).json({
      success: false,
      message: "Date and mode are required.",
      error: "MISSING_FIELDS",
    });
  }

  const requiredFieldsMissing = students.some((s) =>
    !s.name || !s.email || !s.phone || !s.academicBackground
  );

  if (requiredFieldsMissing) {
    return res.status(400).json({
      success: false,
      message: "All students must fill required fields.",
      error: "VALIDATION_ERROR",
    });
  }

  const groupToken = uuidv4();
  let savedStudents = [];
  let newGroup;

  try {
    await session.withTransaction(async () => {
      // ✅ Step 1: Re-check slot availability inside transaction
      const summary = await DailyBookingSummary.findOne({ date }).session(session);
      const count = summary?.count || 0;
      const availableSlots = 5 - count;

      if (availableSlots < 2) {
        throw new Error("SLOTS_FULL");
      }

      // ✅ Step 2: Process all students
      for (const data of students) {
        let {
          name,
          email,
          phone,
          fieldOfInterest,
          academicBackground,
          expectationsFromCall,
        } = data;

        email = email.trim().toLowerCase();

        const existing = await Student.findOne({ email }).session(session);
        if (existing && existing.isPaid) {
          throw new Error(`DUPLICATE_EMAIL:${email}`);
        }

        const student = existing
          ? Object.assign(existing, {
            name,
            phone,
            fieldOfInterest,
            academicBackground,
            expectationsFromCall,
            mode,
            dateOfCall: date,
            groupToken,
            counsellingType: "group",
          })
          : new Student({
            name,
            email,
            phone,
            fieldOfInterest,
            academicBackground,
            expectationsFromCall,
            mode,
            dateOfCall: date,
            groupToken,
            isPaid: false,
            counsellingType: "group",
          });

        await student.save({ session });
        savedStudents.push(student._id);
      }

      // ✅ Step 3: Create group
      newGroup = new Group({
        students: savedStudents,
        dateOfCall: date,
        groupSize: savedStudents.length,
        mode,
        groupToken,
      });
      await newGroup.save({ session });
    });

    // ✅ Step 5: Return success response after transaction commits
    return res.status(200).json({
      success: true,
      message: "Group registered successfully. Proceed to payment.",
      data: {
        groupId: newGroup._id,
        groupToken,
      },
    });

  } catch (err) {
    console.error("Group Registration Error:", err);

    if (err.message === "SLOTS_FULL") {
      return res.status(400).json({
        success: false,
        message: "Group counselling is not allowed on this date due to limited availability.",
        error: "SLOTS_FULL",
      });
    }

    if (err.message?.startsWith("DUPLICATE_EMAIL")) {
      const email = err.message.split(":")[1];
      return res.status(400).json({
        success: false,
        message: `Email ${email} has already been used for booking.`,
        error: "DUPLICATE_EMAIL",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: "SERVER_ERROR",
    });
  } finally {
    await session.endSession();
  }
};


const confirmGroupBooking = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { groupId, txnId, screenshotUrl, amount } = req.body;

    // Validation
    if (!groupId || !txnId || !screenshotUrl || !amount) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    await session.withTransaction(async () => {

      const group = await Group.findById(groupId).populate("students").session(session);
      if (!group) {
        throw new Error("GROUP_NOT_FOUND");
      }

      if (group.isPaid) {
        throw new Error("ALREADY_PAID");
      }

      const existingTxn = await Transaction.findOne({ txnId }).session(session);
      if (existingTxn) {
        throw new Error("DUPLICATE_TXN");
      }

      // Update student payment statuses
      for (const student of group.students) {
        student.isPaid = true;
        student.groupId = groupId;
        await student.save({ session });
      }

      group.isPaid = true;
      await group.save({ session });

      // Update daily booking summary
      let dateDoc = await DailyBookingSummary.findOne({ date: group.dateOfCall }).session(session);
      const incrementCount = getSlotCountForGroupSize(group.students.length);

      if (!dateDoc) {
        dateDoc = new DailyBookingSummary({
          date: group.dateOfCall,
          students: [],
          groups: [group._id],
          count: incrementCount,
        });
      } else {
        dateDoc.groups.push(group._id);
        dateDoc.count += incrementCount;
      }

      await dateDoc.save({ session });

      // Save transaction
      const txn = new Transaction({
        txnId,
        groupId: groupId,
        amount,
        screenshotUrl,
      });
      await txn.save({ session });
    });

    res.status(200).json({
      success: true,
      message: "Group payment confirmed. Booking successful. Confirmation email will be sent shortly.",
    });
    try {
      const utcDate = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };
      const parts = new Intl.DateTimeFormat('en-CA', options).formatToParts(utcDate);
      const date = `${parts.find(p => p.type === 'year').value}-${parts.find(p => p.type === 'month').value}-${parts.find(p => p.type === 'day').value}`;
      const group = await Group.findById(groupId).populate("students");
      const lead = group.students[0];
      sendInvoice(lead.name, lead.email, lead.phone, date)
        .then(() => console.log("Invoice sent to lead"))
        .catch((err) => {
          console.error("Invoice sending failed:", err);
          // Optional: log to retry queue
        });
    } catch (err) {
      console.error("Post-commit invoice dispatch error:", err);
    }

  } catch (err) {
    console.error("Group Payment Error:", err);

    if (err.message === "GROUP_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Group not found." });
    }

    if (err.message === "ALREADY_PAID") {
      return res.status(400).json({ success: false, message: "Group already confirmed and paid." });
    }

    if (err.message === "DUPLICATE_TXN") {
      return res.status(400).json({ success: false, message: "Duplicate transaction ID.", error: "DUPLICATE_TXN" });
    }
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};




export { initiateIndividualBooking, confirmIndividualBooking, initiateGroupBooking, confirmGroupBooking };