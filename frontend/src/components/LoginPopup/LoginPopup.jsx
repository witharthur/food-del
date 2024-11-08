import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Navbar/context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const { setToken } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin
      ? "https://food-del-t1rl.onrender.com/api/user/login"
      : "https://food-del-t1rl.onrender.com/api/user/register";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(url, body);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        setName("");
        setEmail("");
        setPassword("");
        setShowLogin(false);

        console.log(
          isLogin ? "Login successful" : "Registration successful:",
          response.data
        );

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Sign Up/Login error:", error);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-header">
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.crossIcon}
            alt="Close"
            className="cross-icon"
          />
        </div>

        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              marginBottom: "10px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {error}
          </div>
        )}

        <div className="login-popup-inputs">
          {!isLogin && (
            <input
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">{isLogin ? "Login" : "Create account"}</button>

        {!isLogin && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <p className="newOrHave">
          {isLogin ? (
            <span style={{ color: "black" }}>
              Don't have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign Up</span>
            </span>
          ) : (
            <span style={{ color: "black" }}>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
