import mongoose from "mongoose";
import { type } from "os";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  grade: { type: String, required: true },
  production: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
});

const bookModel = mongoose.model("Book", bookSchema);

export { bookModel as Book };

// above v-1

