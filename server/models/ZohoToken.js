import mongoose from 'mongoose';

const zohoTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  expires_at: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model('ZohoToken', zohoTokenSchema);