// File: backend/routes/Auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Register } from "../controllers/Auth.js";
const AuthRoutes = express.Router();



AuthRoutes.post("/register", Register);

AuthRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { UserId: user._id, email: user.email },
      "your_secret_key",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: { email: user.email, userName: user.userName },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});






 export default AuthRoutes;
//above v-1
