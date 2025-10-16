import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Fetch all books from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // ✅ Filter search results from MongoDB data
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBooks([]);
      return;
    }

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [search, books]);

  // ✅ Static Featured Books
  const featuredBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg" },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", cover: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg" },
    { title: "1984", author: "George Orwell", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg" },
    { title: "India That is Bharat", author: "J Sai Deepak", cover: "india.jpg" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg" },
    { title: "Harry Potter", author: "J.K. Rowling", cover: "https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg" }
  ];

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📚 ReadMate</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="content">
        <h1 className="main-heading">Which book do you want to read?</h1>
        <p>Lost in choices? Explore our handpicked collection and find your next great read!</p>
        <button className="explore-btn" onClick={() => navigate("/explore")}>
          Explore →
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* 🔍 Search Results */}
      {search.trim() && (
        <>
          <h2 className="section-heading">Search Results</h2>
          <div className="card-container">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div key={book._id} className="card">
                  <img
                    src={book.image}
                    alt={book.title}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  />
                  <h3>{book.title}</h3>
                  <p>by {book.author}</p>
                  <Link to={`/book/${book._id}`}>
                    <button>Read More</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        </>
      )}

      {/* ⭐ Featured Books Section */}
      <h2 className="section-heading">Featured Books</h2>
      <div className="card-container">
        {featuredBooks.map((book, index) => (
          <div key={index} className="card">
            <img src={book.cover} alt={book.title} />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
