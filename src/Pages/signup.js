import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupImage from "../assets/undraw_sign-up_qamz.png";
import "../assets/css/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    companyAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.companyName,
          email: formData.companyEmail,
          password: formData.password,
          phone: formData.phoneNumber,
          address: formData.companyAddress,
        }
      );

      if (response.data) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="form-section">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <p>Please fill in the details to register your company</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Official Email</label>
              <input
                type="email"
                name="companyEmail"
                placeholder="Enter company email"
                value={formData.companyEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company Address</label>
              <input
                type="text"
                name="companyAddress"
                placeholder="Enter company address"
                value={formData.companyAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
      <div className="image-section">
        <img src={signupImage} alt="Signup illustration" />
      </div>
    </div>
  );
};

export default Signup;
