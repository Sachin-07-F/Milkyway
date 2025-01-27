import mongoose from "mongoose";
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } }, // Expires in 5 minutes
});

const Otp = mongoose.model("Otp", OTPSchema);
export default Otp; // Ensure it's exported as default
