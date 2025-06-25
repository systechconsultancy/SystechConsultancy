import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  fieldOfInterest: { type: String },
  academicBackground: { type: String, required: true },
  expectationsFromCall: { type: String },
  mode: { type: String, enum: ["online", "offline"], required: true },
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