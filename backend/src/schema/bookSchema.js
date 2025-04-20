import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  author: String,
  country: String,
  imageLink: String,
  language: String,
  link: String,
  pages: Number,
  title: String,
  year: Number,
  available: { type: Boolean, default: true }, // Book availability
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Authentication", default: null },
  dueDate: Date, // Return deadline
});

export const bookModel = mongoose.model("Books", bookSchema);
