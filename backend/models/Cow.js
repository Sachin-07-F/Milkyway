import mongoose from "mongoose";
const CowSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  production: {
    type: Number,
    required: true, // Daily milk production in milliliters
  },
  description: {
    type: String,
  },
});

const CowModel = mongoose.model("Cowsses", CowSchema);

export default CowModel