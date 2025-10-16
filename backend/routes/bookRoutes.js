// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reviews for a specific book
router.get("/:id/reviews", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a review to a specific book
router.post("/:id/reviews", async (req, res) => {
  try {
    const { user, comment, rating } = req.body;
    if (!comment) return res.status(400).json({ message: "Comment is required" });

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const newReview = {
      user: user || "Anonymous",
      comment,
      rating: Number(rating) || 0,
    };

    book.reviews.push(newReview);

    // Recalculate average rating
    const total = book.reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    book.rating = book.reviews.length ? +(total / book.reviews.length).toFixed(1) : 0;

    await book.save();

    // Return updated reviews
    res.status(201).json(book.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 Search books by title or author
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
