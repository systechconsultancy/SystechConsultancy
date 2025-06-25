import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  txnId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  screenshotUrl: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    default: null,
  },
  type: {
    type: String,
    enum: ["individual", "group"],
    required: true,
  }
}, { timestamps: true });

transactionSchema.pre("validate", function (next) {
  if (this.studentId && !this.groupId) {
    this.type = "individual";
  } else if (this.groupId && !this.studentId) {
    this.type = "group";
  } else {
    return next(new Error("Transaction must be either individual or group, not both or neither."));
  }
  next();
});

export default mongoose.model("Transaction", transactionSchema);
