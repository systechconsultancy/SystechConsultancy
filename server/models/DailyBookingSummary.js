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

dailyBookingSchema.pre('save', function(next) {
  if (this.isModified('date') || this.isNew) {
    this.date.setHours(0, 0, 0, 0);
  }
  next();
});

export default mongoose.model("DailyBookingSummary", dailyBookingSchema);