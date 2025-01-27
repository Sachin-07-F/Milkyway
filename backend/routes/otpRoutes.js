import express from "express";
import { sendOTP } from "../controllers/otpControllers.js"; // Named export from the controller
import { verifyOTP } from "../controllers/otpControllers.js"; // Named export from the controller

const router = express.Router();

// Define routes
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

export default router; // Export as default
