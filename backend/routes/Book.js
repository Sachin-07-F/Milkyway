import express from "express";
import { Book } from "../models/book.js";
import routerr from "./AddData.js";

const router = express.Router();

// Add book route
router.post("/add", async (req, res) => {
  try {

    const { name, author, imageUrl, grade, production, description, email } = req.body;

    if (!name || !author || !imageUrl || !grade || !production || !description || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      name,
      author,
      imageUrl,
      grade,
      production,
      description,
      email,
    });

    await newBook.save();
    return res.status(201).json({ added: true, message: "Book added successfully" });
  } catch (err) {
    console.error("Error in adding book:", err);
    return res.status(500).json({ added: false, message: "Error in adding book" });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});





  

router.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById({ _id: id });
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching book details" });
  }
});



//23




// Update a book
router.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, imageUrl, grade, production, description } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, author, imageUrl, grade, production, description },
      { new: true }
    );

    if (updatedBook) {
      return res.json({ updated: true });
    } else {
      return res.json({ updated: false, message: "Book not found" });
    }
  } catch (err) {
    console.error("Error updating book:", err);
    return res.status(500).json({ updated: false, message: "Server error" });
  }
});

// Delete a book
router.delete("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, book });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting book" });
  }
});








// In the routes/Book.js file
// Search books by email
router.get('/search', async (req, res) => {
  const { query } = req.query; // Get query from URL parameters
  try {
    const books = await Book.find({
      email: { $regex: query, $options: 'i' }, // Case-insensitive search
    });
    return res.json(books);
  } catch (err) {
    console.error('Error searching books:', err);
    return res.status(500).json({ message: 'Error searching books' });
  }
});






export { router as bookRouter };
// above v-1


