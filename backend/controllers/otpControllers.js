import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";
import { Book } from "../models/book.js"; // Import Book model
import dotenv from "dotenv";
dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Replace with your email
    pass: process.env.EMAIL_PASSWORD,  // Replace with your email password
  },
});



export const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate random OTP

  try {
    const existingOTP = await Otp.findOne({ email });

    if (existingOTP) {
      // Update OTP if it already exists
      await Otp.updateOne({ email }, { $set: { otp, createdAt: new Date() } });
    } else {
      // Create a new OTP record
      await Otp.create({ email, otp });
    }

    const mailOptions = {
      from: "MilkTrack",
      to: email,
      subject: "Your OTP Code - MilkTrack",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #008080;">MilkTrack</h2>
            <p style="font-size: 14px; color: #666;">Your Dairy Partner</p>
          </div>
          <p>Hi there,</p>
          <p>Your OTP code for verification is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color:#008080; padding: 10px 20px; border: 1px dashed rgb(117, 181, 7); border-radius: 5px; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p>This OTP is valid for <strong>5 minutes</strong>. Please use it to complete your verification process.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Thank you,<br>The MilkTrack Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666; text-align: center;">This is an automated email, please do not reply.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send OTP." });
      }
      res.status(200).json({ message: "OTP sent successfully!" });
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while sending OTP." });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord) {
      return res.status(404).json({ error: "OTP record not found" });
    }

    const otpExpired = new Date() - otpRecord.createdAt > 5 * 60 * 1000; // Check if OTP is older than 5 minutes

    if (otpExpired) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // After OTP is verified, fetch the books related to the email
    const books = await Book.find({ email });
    res.status(200).json({ message: "OTP verified successfully!", books });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while verifying OTP." });
  }
};

