import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📚 ReadMate</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      {/* About Section */}
      <div className="about-content">
        <h1>About ReadMate</h1>
        <p className="subtitle">Your one-stop platform to explore and share book reviews.</p>

        <div className="about-details">
          <p>
            Welcome to <strong>ReadMate</strong> — a platform built for book lovers who wish to
            discover, explore, and review their favorite books. Our goal is to connect readers
            from all over the world and create a community that shares honest opinions and
            thoughtful discussions.
          </p>

          <p>
            Whether you’re looking for your next great read or want to share your insights about
            a recent book you’ve finished, ReadMate makes it easy. You can browse books by
            category, check popular reviews, and even contribute your own.
          </p>

          <p>
            We believe reading builds imagination, empathy, and wisdom. With ReadMate, we aim to
            make reading a social and enjoyable journey — where every opinion matters.
          </p>
        </div>

        <button className="explore-btn">
          <Link to="/categories" style={{ textDecoration: "none", color: "white" }}>
            Explore Books →
          </Link>
        </button>
      </div>
    </div>
  );
}

export default About;
