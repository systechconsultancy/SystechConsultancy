import mongoose from "mongoose";

const dailyBookingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  }],
  count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("DailyBookingSummary", dailyBookingSchema);