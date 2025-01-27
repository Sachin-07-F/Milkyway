import UserModel from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD, 
  },
});

// Register User
const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    

    const capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const mailOptions = {
  from: "MilkTrack <no-reply@milktrack.com>",
  to: email,
  subject: "Welcome to MilkTrack! 🌟",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
      <!-- Header Section -->
      <div style="text-align: center; padding: 10px 0; background-color: indigo; border-radius: 10px;">
        <h1 style="color: white; margin: 0;">MilkTrack</h1>
      </div>

      <!-- Greeting Section -->
      <p style="font-size: 16px; color: #333; margin-top: 20px;">
        Hello <strong>${capitalizeFirstLetter(userName)}</strong>,
      </p>

      <!-- Introduction -->
      <p style="font-size: 16px; color: #333;">
        Welcome to <strong>MilkTrack</strong>! We're thrilled to have you onboard. MilkTrack helps you manage your dairy efficiently with features like:
      </p>

     <ul style="font-size: 16px; color: #333; line-height: 1.6; padding-left: 0; list-style: none; margin: 0;">
  <!-- First Item -->
  <li style="display: flex; align-items: center; margin-bottom: 10px;">
    <div style="background-color: #4169e1; width: 50px; height: 39px; display: flex; justify-content: center; align-items: center; border-radius: 20%; margin-right: 10px;  ">
      <img src="https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png" 
           alt="Cow Icon" 
           style="max-width: 35px; max-height: 35px; object-fit: contain;">
    </div>
    <span style="color: #333;">Add, edit, and delete cows for your dairy. 🐄</span>
  </li>

  <!-- Second Item -->
  <li style="display: flex; align-items: center; margin-bottom: 10px;">
    <div style="background-color: #008080; width: 60px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 25%; margin-right: 10px;  ">
      <img src="https://cdn-icons-png.flaticon.com/512/5580/5580909.png" 
           alt="Image Icon" 
           style="max-width: 40px; max-height: 40px; object-fit: contain;">
    </div>
    <span style="color: #333;">Provide details such as images, names, and more. 📸</span>
  </li>

  <!-- Third Item -->
  <li style="display: flex; align-items: center; margin-bottom: 10px;">
    <div style="background-color: #87CEEB; width: 60px; height: 40px; display: flex; justify-content: center; align-items: center; border-radius: 25%; margin-right: 10px;  ">
      <img src="https://static.vecteezy.com/system/resources/previews/019/045/387/original/increasing-stocks-icon-growing-graph-bar-chart-png.png" 
           alt="Chart Icon" 
           style="max-width: 40px; max-height: 40px; object-fit: contain;">
    </div>
    <span style="color: #333;">Track milk production and analyze through interactive charts. 📊</span>
  </li>
</ul>




      <!-- Images Section -->
      <div style="text-align: center; margin: 20px 0;">
        <img src="https://i.pinimg.com/originals/2e/50/9a/2e509ad6d207f1a47b30a42eddf379ed.gif" alt="Cow Management Example" style="max-width: 100%; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 15px;">
        <p style="font-size: 14px; color: #888;">Example: Add and manage your cows with images and details.</p>
        
        <img src="https://cdn.dribbble.com/userupload/3643986/file/original-46c802e7d8e8caea33deb227ffc22e6f.png?resize={width}x{height}&vertical=center" alt="Milk Production Chart" style="max-width: 100%; border-radius: 5px; border: 1px solid #ddd; margin-bottom: 15px;">
        <p style="font-size: 14px; color: #888;">Example: Analyze milk production with detailed charts.</p>
        
        <img src="https://www.hiveage.com/wp-content/uploads/2015/06/small-business-analytics-dashboard.jpg" alt="Dashboard Example" style="max-width: 100%; border-radius: 5px; border: 1px solid #ddd;">
        <p style="font-size: 14px; color: #888;">Example: Overview of your dairy using dashboard.</p>
      </div>

      <!-- Call to Action -->
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://www.milktrack.com" style="text-decoration: none; padding: 10px 20px; background-color: #34a853; color: white; border-radius: 5px; font-size: 16px;">Go to MilkTrack</a>
      </div>

      <!-- Footer -->
      <p style="font-size: 14px; color: #888; margin-top: 20px; text-align: center;">
        Thanks, <br/> The MilkTrack Team
      </p>
    </div>
  `,
};


    

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.error("Error sending welcome email:", error);
        return res.status(500).json({
          success: false,
          message: "User registered, but welcome email failed to send.",
        });
      }

      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        "your-secret-key",
        { expiresIn: "2h" }
      );

      res.status(201).json({
        success: true,
        message: "User registered successfully and welcome email sent!",
        user: { id: newUser._id, userName: newUser.userName, email: newUser.email },
        token,
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { Register };
