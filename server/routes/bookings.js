import express from "express";
import Student from "../models/Student.js";
import Transaction from "../models/Transaction.js";
import BookingDate from "../models/BookingDate.js";

const router = express.Router();

router.post("/initiate", async (req, res) => {
  try {
    const { name, email, phone, fieldOfIntrest, academicBackground, expectationsFromcall, mode, dateOfCall } = req.body;

    const dateDoc = await BookingDate.findOne({ date: dateOfCall });
    if (dateDoc && dateDoc.count >= 5) {
      return res.status(400).json({
        success: false,
        message: "Selected day is fully booked. Please choose another day.",
        error: "SLOTS_FULL",
      });
    }

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
      student.fieldOfIntrest = fieldOfIntrest;
      student.academicBackground = academicBackground;
      student.expectationsFromcall = expectationsFromcall;
      student.mode = mode;
      student.dateOfCall = dateOfCall;
      await student.save();
    } else {
      student = new Student({ name, email, phone, fieldOfIntrest, academicBackground, expectationsFromcall, mode, dateOfCall, isPaid: false });
      await student.save();
    }

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
});

router.post("/confirm", async (req, res) => {
  try {
    const { studentId, dateOfCall, screenshotUrl, txnId } = req.body;

    let dateDoc = await BookingDate.findOne({ date: dateOfCall });

    if (dateDoc && dateDoc.count >= 5) {
      return res.status(400).json({
        success: false,
        message: "Selected day is fully booked. Please choose another day.",
        error: "SLOTS_FULL",
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const existingTxn = await Transaction.findOne({ txnId: txnId });
    if (existingTxn) {
      return res.status(400).json({
        success: false,
        message: "Duplicate Transaction ID. Please enter a valid one.",
        error: "DUPLICATE_TXN",
      });
    }

    student.isPaid = true;
    await student.save();

    if (!dateDoc) {
      dateDoc = new BookingDate({
        date: dateOfCall,
        students: [studentId],
        count: 1,
      });
    } else {
      dateDoc.students.push(studentId);
      dateDoc.count += 1;
    }

    await dateDoc.save();

    const newTxn = new Transaction({
      txnId: txnId,
      student: student._id,
      screenshotUrl,
    });
    await newTxn.save();

    return res.status(200).json({
      success: true,
      message: "Your payment has been successfully processed. Your session has been booked. A confirmation email will be sent shortly.",
    });

  } catch (err) {
    console.error("Confirm error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/full-dates", async (req, res) => {
  try {
    const fullDates = await BookingDate.find({ count: { $gte: 5 } }).select("date -_id");
    res.json(fullDates.map(d => d.date));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch full dates." });
  }
});


export default router;
