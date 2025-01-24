import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import forgotPasswordImage from "../assets/undraw_forgot-password_odai.png";
import "../assets/css/forgot-password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );
      toast.success(
        response.data.message || "Password reset email sent successfully!"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="image-section">
        <img src={forgotPasswordImage} alt="Forgot Password illustration" />
      </div>
      <div className="form-section">
        <div className="form-wrapper">
          <h1>Forgot Password?</h1>
          <p>Enter your email address to receive a password reset link</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <button type="submit" className="reset-button" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <p className="login-link">
            Remember your password? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
