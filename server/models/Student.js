import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[6-9]\d{9}$/,
  },
  dob: { type: Date }, // optional DOB field
  city: { type: String }, // optional city

  userType: {
    type: String,
    enum: ["student", "professional"],
    required: true,
  },

  // Student-specific fields
  collegeName: { type: String },
  branch: { type: String },
  cgpa: { type: String },
  graduationYear: {
    type: Number,
    validate: {
      validator: function (val) {
        const currentYear = new Date().getFullYear();
        return val >= 2000 && val <= currentYear + 5;
      },
      message: props => `${props.value} is not a valid graduation year`
    }
  },
  backlogs: { type: String },

  // Professional-specific fields
  jobTitle: { type: String },
  company: { type: String },
  experienceYears: { type: Number, min: 0 },
  careerGoal: { type: String },

  // Common fields
  fieldOfInterest: { type: String },
  expectationsFromCall: { type: String },

  mode: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  dateOfCall: { type: Date, required: true },

  counsellingType: {
    type: String,
    enum: ["individual", "group"],
    default: "individual",
    required: true,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);