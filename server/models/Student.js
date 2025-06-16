import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  fieldOfIntrest: { type: String },
  academicBackground: { type: String, required: true },
  expectationsFromcall: { type: String },
  mode : { type: String, required: true, enum: ['online', 'offline'] },
  dateOfCall: { type: Date, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

studentSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Student", studentSchema);
