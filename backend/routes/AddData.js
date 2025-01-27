import express from 'express';
import mongoose from 'mongoose';
import AddData from '../models/AddData.js';

const routerr = express.Router();

// POST route to add data
routerr.post('/add-data/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { weeklyData, dailyData, monthlyData } = req.body;

  try {
    // Validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid bookId format' });
    }

    // Check if record already exists
    let addData = await AddData.findOne({ bookId });

    if (!addData) {
      addData = new AddData({
        bookId,
        weeklyData,
        dailyData,
        monthlyData,
      });
    } else {
      // Update existing data, skipping any null or undefined values
      if (weeklyData) addData.weeklyData = { ...addData.weeklyData, ...weeklyData };
      if (dailyData) addData.dailyData = { ...addData.dailyData, ...dailyData };
      if (monthlyData) addData.monthlyData = { ...addData.monthlyData, ...monthlyData };
    }

    // Save the data after removing null or undefined values
    await addData.save();
    res.status(201).json({ message: 'Data added successfully', addData });
  } catch (err) {
    console.error('Error in /add-data:', err);
    res.status(500).json({ message: 'Failed to add data', error: err.message });
  }
});

// GET route to fetch data
routerr.get('/details/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    // Validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid bookId format' });
    }

    const addData = await AddData.findOne({ bookId }).populate('bookId');
    if (!addData) {
      return res.status(404).json({ message: 'No data found for this book' });
    }

    res.status(200).json({
      weeklyData: addData.weeklyData,
      dailyData: addData.dailyData,
      monthlyData: addData.monthlyData,
    });
  } catch (err) {
    console.error('Error in /details:', err);
    res.status(500).json({ message: 'Failed to fetch data', error: err.message });
  }
});

export default routerr;
