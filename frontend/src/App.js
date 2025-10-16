// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Categories from "./pages/Categories";
import About from "./pages/About";
import BookDetail from "./pages/BookDetail"; // <-- for Read More page
import Signin from "./pages/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
} 

export default App;
