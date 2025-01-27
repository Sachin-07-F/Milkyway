import express from "express";
import { Book } from "../models/book.js";

const bookRoutering = express.Router();

bookRoutering.get("/details/:id", async (req, res) => {
  try {
    const {id} = req.params.id;
    const book = await Book.findById(id); // Correct findById usage
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book details:", err);
    return res.status(500).json({ message: "Error fetching book details" });
  }
});

export default bookRoutering;
