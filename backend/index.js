// import express from "express";
// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables

// import cors from "cors";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import path from "path";
// import fileUpload from "express-fileupload";
// import { bookRouter } from "./routes/Book.js";
// import AuthRoutes from "./routes/Auth.js";
// import DbCon from "./libs/db.js";
// import axios from 'axios'
// import  jwt from "jsonwebtoken";
// import otpRoutes from "./routes/otpRoutes.js";
// import routerr from './routes/AddData.js';
// import router from "./routes/otpRoutes.js";
// import bookRoutering from './routes/Booking.js'
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to database
// DbCon();

// // Middleware
// app.use(cors({ origin: "*", credentials: true }));
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());
// app.use(express.static(path.join(path.resolve(), "public")));
// app.use('/api/books', bookRouter); 
// // Routes
//  app.use("/book", bookRouter);

// app.use("/auth", AuthRoutes);

// app.use("/api/otp", router);

// app.use("/api/bookings", bookRoutering);
// app.use('/api',routerr)
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running successfully!" });
// });


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// //above v-1







// import express from "express";
// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables

// import cors from "cors";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import path from "path";
// import fileUpload from "express-fileupload";
// import { bookRouter } from "./routes/Book.js";
// import AuthRoutes from "./routes/Auth.js";
// import DbCon from "./libs/db.js";
// import axios from 'axios';
// import jwt from "jsonwebtoken";
// import otpRoutes from "./routes/otpRoutes.js";
// import routerr from './routes/AddData.js';
// import router from "./routes/otpRoutes.js";
// import bookRoutering from './routes/Booking.js';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to database
// DbCon();

// // CORS configuration: Allow both local and deployed frontend
// const allowedOrigins = [
//   'http://localhost:3000', // Your local frontend URL
//   'https://milkyway-7qer-b975wyp15-sachinfulari529-gmailcoms-projects.vercel.app/' // Your deployed frontend URL
// ];


// app.use(cors({
//   origin: function(origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       // Allow the request (either from allowed origin or no origin if it's a direct request)
//       callback(null, true);
//     } else {
//       // Reject the request
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,  // Allow sending credentials (cookies, HTTP authentication)
// }));

// // Middleware
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());
// app.use(express.static(path.join(path.resolve(), "public")));
// app.use('/api/books', bookRouter);

// // Routes
// app.use("/book", bookRouter);
// app.use("/auth", AuthRoutes);
// app.use("/api/otp", router);
// app.use("/api/bookings", bookRoutering);
// app.use('/api', routerr);

// app.get("/", (req, res) => {
//   res.json({ message: "Server is running successfully!" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';  // Fix for static path resolution

import { bookRouter } from "./routes/Book.js";
import AuthRoutes from "./routes/Auth.js";
import DbCon from "./libs/db.js";
import otpRoutes from "./routes/otpRoutes.js";
import routerr from './routes/AddData.js';
import bookRoutering from './routes/Booking.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;  // Ensure backend runs on correct port

// Connect to database
DbCon();

// CORS configuration: Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "https://milkyway-tgek.vercel.app" // Deployed frontend (fixed URL)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Fix static path resolution (for manifest.json, etc.)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/books", bookRouter);
app.use("/book", bookRouter);
app.use("/auth", AuthRoutes);
app.use("/api/otp", otpRoutes);  // Fixed duplicate import
app.use("/api/bookings", bookRoutering);
app.use('/api', routerr);

app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
