const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User'); // Your User schema
const router = express.Router();

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const client = new OAuth2Client(CLIENT_ID);

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).send({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).send({ error: 'Error signing up' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).send({ error: 'Error logging in' });
  }
});

// Google Authentication Route
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, password: null });
      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.send({ token: jwtToken, message: 'Login successful' });
  } catch (err) {
    res.status(500).send({ error: 'Error authenticating with Google' });
  }
});

module.exports = router;
