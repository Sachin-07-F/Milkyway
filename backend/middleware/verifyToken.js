// backend/middleware/verifyToken.js
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key"); // Replace "your-secret-key" with your secret
    req.user = decoded; // Attach the decoded data to the request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

export default verifyToken;
//above v-1
