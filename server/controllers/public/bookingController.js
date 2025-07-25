import mongoose from "mongoose";
import Student from "../../models/Student.js";
import Group from "../../models/Group.js";
import DailyBookingSummary from "../../models/DailyBookingSummary.js";
import Transaction from "../../models/Transaction.js";
import { sendInvoice } from "../../utils/sendInvoiceUtility.js";
import { getSlotCountForGroupSize } from "../../utils/slotUtils.js";
import { v4 as uuidv4 } from "uuid";


const initiateIndividualBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      city,
      userType,
      collegeName,
      branch,
      cgpa,
      graduationYear,
      backlogs,
      jobTitle,
      company,
      experienceYears,
      careerGoal,
      fieldOfInterest,
      expectationsFromCall,
      mode,
      dateOfCall,
    } = req.body;

    // ✅ Basic field validation
    if (!name || !email || !phone || !userType || !mode || !dateOfCall || !city) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
        error: "VALIDATION_ERROR",
      });
    }

    // ✅ Conditional validation based on userType
    if (userType === "student") {
      if (!collegeName || !branch || !cgpa || !backlogs || !graduationYear) {
        return res.status(400).json({
          success: false,
          message: "Please fill all academic details.",
          error: "VALIDATION_ERROR",
        });
      }
    }

    if (userType === "professional") {
      if (!jobTitle || !company || !experienceYears || !careerGoal) {
        return res.status(400).json({
          success: false,
          message: "Please fill all job-related details.",
          error: "VALIDATION_ERROR",
        });
      }
    }

    // ✅ Check if the selected date is full
    const dateToFind = new Date(dateOfCall).setHours(0, 0, 0, 0);
    const dateDoc = await DailyBookingSummary.findOne({ date: dateToFind });
    if (dateDoc && dateDoc.count >= 5) {
      return res.status(400).json({
        success: false,
        message: "Selected day is fully booked. Please choose another day.",
        error: "SLOTS_FULL",
      });
    }

     const existingByEmail = await Student.findOne({ email : email.trim().toLowerCase() }, { isPaid: 1 });
    if (existingByEmail) {
      return res.status(400).json({
        success: false,
        message: existingByEmail.isPaid
          ? "This email has already been used to book a session."
          : "This email is already used by another user.",
        error: "DUPLICATE_EMAIL",
      });
    }

    const existingByPhone = await Student.findOne({ phone: phone.trim() }, { isPaid: 1 });
    if (existingByPhone) {
      return res.status(400).json({
        success: false,
        message: existingByPhone.isPaid
          ? "This phone number has already been used to book a session."
          : "This phone number is already used by another user.",
        error: "DUPLICATE_PHONE",
      });
    }

    // ✅ Build student payload
    const studentPayload = {
      name,
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      dob,
      city,
      userType,
      fieldOfInterest,
      expectationsFromCall,
      mode,
      dateOfCall: dateToFind,
      isPaid: false,
    };

    if (userType === "student") {
      Object.assign(studentPayload, {
        collegeName,
        branch,
        cgpa,
        graduationYear,
        backlogs,
      });
    }

    if (userType === "professional") {
      Object.assign(studentPayload, {
        jobTitle,
        company,
        experienceYears,
        careerGoal,
      });
    }

    const student = new Student(studentPayload);
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
      const dateToFind = new Date(student.dateOfCall).setHours(0, 0, 0, 0);
      let dateDoc = await DailyBookingSummary.findOne({ date: dateToFind }).session(session);

      if (dateDoc && dateDoc.count >= 5) {
        throw new Error("SLOTS_FULL");
      }

      if (!dateDoc) {
        dateDoc = new DailyBookingSummary({
          date: dateToFind,
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
    !s.name || !s.email || !s.phone || !s.userType ||
    (mode === "offline" && !s.city) ||
    (s.userType === "student" && (!s.collegeName || !s.branch || !s.cgpa || !s.graduationYear)) ||
    (s.userType === "professional" && (!s.jobTitle || !s.company || !s.experienceYears || !s.careerGoal))
  );

  if (requiredFieldsMissing) {
    return res.status(400).json({
      success: false,
      message: "All fields must be filled correctly.",
      error: "VALIDATION_ERROR",
    });
  }


  const groupToken = uuidv4();
  let savedStudents = [];
  let newGroup;

  try {
    await session.withTransaction(async () => {
      // Step 1: Re-check slot availability inside transaction
      const dateToFind = new Date(date).setHours(0, 0, 0, 0);
      const summary = await DailyBookingSummary.findOne({ date: dateToFind }).session(session);
      const count = summary?.count || 0;
      const availableSlots = 5 - count;

      if (availableSlots < 2) {
        throw new Error("SLOTS_FULL");
      }

      // Step 2: Create group first (empty student array for now)
      newGroup = new Group({
        students: [],
        dateOfCall: dateToFind,
        groupSize: students.length,
        mode,
        groupToken,
      });

      await newGroup.save({ session });

      // Step 3: Save each student with groupId assigned immediately
      for (const data of students) {
        const {
          name, email, phone, dob, city, userType,
          collegeName, branch, cgpa, graduationYear, backlogs,
          jobTitle, company, experienceYears, careerGoal,
          fieldOfInterest, expectationsFromCall
        } = data;

        const existing = await Student.findOne({ email }).session(session);
        if (existing && existing.isPaid) {
          throw new Error(`DUPLICATE_EMAIL:${email}`);
        }

        const studentData = {
          name, email: email.trim().toLowerCase(), phone, dob, city, userType,
          collegeName, branch, cgpa, graduationYear, backlogs,
          jobTitle, company, experienceYears, careerGoal,
          fieldOfInterest, expectationsFromCall,
          mode, dateOfCall: dateToFind,
          groupToken, counsellingType: "group", isPaid: false, groupId: newGroup._id,
        };

        const student = existing
          ? Object.assign(existing, studentData)
          : new Student(studentData);

        await student.save({ session });
        savedStudents.push(student._id);
      }

      // Step 4: Update group with student IDs
      newGroup.students = savedStudents;
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
        message: "Selected date is fully booked for group counselling.",
        error: "SLOTS_FULL",
      });
    }

    if (err.message?.startsWith("DUPLICATE_EMAIL")) {
      const email = err.message.split(":")[1];
      return res.status(400).json({
        success: false,
        message: `Email : ${email} has already been used for booking.`,
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

    let group;

    await session.withTransaction(async () => {

      group = await Group.findById(groupId).populate("students").session(session);
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
        await student.save({ session });
      }

      group.isPaid = true;
      await group.save({ session });

      // Update daily booking summary
      const dateToFind = new Date(group.dateOfCall).setHours(0, 0, 0, 0);
      let dateDoc = await DailyBookingSummary.findOne({ date: dateToFind }).session(session);
      const incrementCount = getSlotCountForGroupSize(group.students.length);

      if (!dateDoc) {
        dateDoc = new DailyBookingSummary({
          date: dateToFind,
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
      const lead = group.students[0];
      sendInvoice(lead.name, lead.email, lead.phone, date, "group", amount)
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