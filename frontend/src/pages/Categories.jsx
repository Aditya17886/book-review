import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import books from "../data/BookData";
import "./categories.css";

function Categories() {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const navigate = useNavigate(); // ✅ for navigation to book details

  const mainCategories = [...new Set(books.map((b) => b.mainCategory))];

  const subCategories = selectedMain
    ? [
        ...new Set(
          books
            .filter((b) => b.mainCategory === selectedMain && b.subCategory)
            .map((b) => b.subCategory)
        ),
      ]
    : [];

  const filteredBooks = books.filter((b) => {
    if (selectedMain && selectedSub) {
      return b.mainCategory === selectedMain && b.subCategory === selectedSub;
    } else if (selectedMain && !selectedSub) {
      return b.mainCategory === selectedMain;
    }
    return false;
  });

  return (
    <div className="categories">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📚 ReadMate</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="content">
        <h1>Explore Books by Category</h1>
        <p>Select a main category and subcategory to explore books.</p>

        {/* Main Categories */}
        <div className="category-buttons">
          {mainCategories.map((cat, index) => (
            <button
              key={index}
              className={`category-btn ${selectedMain === cat ? "active" : ""}`}
              onClick={() => {
                setSelectedMain(cat);
                setSelectedSub(null);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategories (if available) */}
        {selectedMain && subCategories.length > 0 && (
          <>
            <h2>Subcategories in "{selectedMain}"</h2>
            <div className="subcategory-buttons">
              {subCategories.map((sub, index) => (
                <button
                  key={index}
                  className={`subcategory-btn ${selectedSub === sub ? "active" : ""}`}
                  onClick={() => setSelectedSub(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Books List */}
        {selectedMain && (
          <div className="book-grid">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, i) => (
                <div key={i} className="book-card">
                  <img src={book.cover} alt={book.title} />
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <button
                    className="read-more-btn"
                    onClick={() => navigate(`/book/${book.id}`)} // ✅ navigate to details page
                  >
                    Read More
                  </button>
                </div>
              ))
            ) : (
              <p>No books found in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
