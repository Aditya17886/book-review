// models/bookModel.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, default: "Anonymous" },
  comment: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  date: { type: Date, default: Date.now }
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  date: String,
  description: String,
  image: String,
  rating: { type: Number, default: 0 }, // average rating
  reviews: [reviewSchema] // ✅ reviews array
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
