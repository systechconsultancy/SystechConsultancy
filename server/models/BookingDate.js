import mongoose from "mongoose";

const bookingDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

bookingDateSchema.index({ date: 1 });

export default mongoose.model("BookingDate", bookingDateSchema);
