import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
  dateOfCall: {
    type: Date,
    required: true,
  },
  mode: { type: String, enum: ["online", "offline"], required: true },
  isPaid: {
    type: Boolean,
    default: false,
  },
  groupSize: {
    type: Number,
    required: true,
  },
  groupToken: { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model("Group", groupSchema);