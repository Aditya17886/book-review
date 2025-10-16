import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";
import { Link } from "react-router-dom";

function Explore() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all books from backend
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="explore-container">
      <h1>Explore Books</h1>
      <p className="subtitle">Discover all available books in our collection.</p>

      <div className="book-grid">
        {books.map((book, index) => (
          <div key={book._id || book.id || index} className="book-card">
            <img
              src={book.cover || "https://via.placeholder.com/180x250"}
              alt={book.title}
              className="book-image"
              onError={(e) => (e.target.src = "https://via.placeholder.com/180x250")}
            />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="rating">⭐ {book.rating ? book.rating : "4.5"}</p>
              <p className="short-desc">
                {book.description
                  ? book.description.slice(0, 100) + "..."
                  : "No description available."}
              </p>

              {/* Read More button linking to BookDetail page */}
              <Link to={`/book/${book._id || book.id}`} className="read-more-btn">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
