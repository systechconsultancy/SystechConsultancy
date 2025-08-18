import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  // --- Core Account Info ---
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian mobile number']
  },
  password: { type: String, required: true },
  profileImageUrl: { type: String, default: '' },

  profileSummary: { type: String },
  resumeUrl: { type: String },

  // --- Profile Information ---
  city: { type: String },
  skills: { type: [String], default: [] },

  // --- Education History (Array of Objects) ---
  education: [{
    qualification: {
      type: String,
      enum: ['12th', 'Intermediate', 'Diploma', 'B.Tech', 'Masters', 'PhD'],
    },
    institute: { type: String },
    stream: { type: String },
    score: { type: String },
    year: { type: Number },
    _id: false
  }],

  // --- Professional History (Array of Objects) ---
  workExperience: [{
    jobTitle: { type: String },
    company: { type: String },
    startMonth: { type: String },
    startYear: { type: String },
    endMonth: { type: String },
    endYear: { type: String }, // Can be 'Present'
    _id: false
  }],

  certifications: [{
    name: { type: String },
    organization: { type: String },
    year: { type: Number },
    _id: false,
  }],
  achievements: {
    type: [String],
    default: [],
  },

  // --- Auth & Session Management ---
  refreshToken: { type: String },
  passwordResetToken: String,
  passwordResetExpires: Date,

}, { timestamps: true });

// --- Mongoose Hooks & Methods ---
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);