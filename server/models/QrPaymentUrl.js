import mongoose from "mongoose";

const qrPaymentUrlSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    unique: true, // Assuming one QR per amount
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("QrPaymentUrl", qrPaymentUrlSchema);