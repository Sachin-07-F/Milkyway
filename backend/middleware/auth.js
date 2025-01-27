import jwt from 'jsonwebtoken';

// Middleware to authenticate user via JWT
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
    req.user = decoded.user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};

export default authenticate;
