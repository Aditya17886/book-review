import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signin.css"; // optional if you want extra styling

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/auth/login", {
        email,
        password,
      });

      console.log(data);
      

      if(data.success){
        localStorage.setItem("token", data.token);
        console.log(data.user);
        
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");
        navigate("/");
      }

     
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        {/* <p className="signup-link">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p> */}
      </div>
    </div>
  );
}

export default Signin;
