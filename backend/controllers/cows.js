// controllers/cows.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token == null) {
    return res.sendStatus(401); // If no token, return unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // If the token is invalid, return forbidden
    }

    req.user = user;
    next(); // Continue to the next middleware or route handler
  });
};

// Other controller functions (e.g., getCows, addCow, etc.)
export const getCows = (req, res) => {
  res.send("Get cows functionality is working!");
};

export const addCow = (req, res) => {
  res.send("Add cow functionality is working!");
};

export const updateCow = (req, res) => {
  res.send("Update cow functionality is working!");
};

export const deleteCow = (req, res) => {
  res.send("Delete cow functionality is working!");
};
