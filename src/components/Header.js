import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../services/api";
import { toast } from "react-toastify";
import "../assets/css/Header.css";

const Header = ({ isLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    setIsAdmin(false);
    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo-link" onClick={handleNavClick}>
            <h1>
              <span className="green">GREEN</span>{" "}
              <span className="credit">CREDIT</span>
            </h1>
          </Link>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={handleNavClick}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={handleNavClick}>
              PROJECTS
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/profile" onClick={handleNavClick}>
                  {user?.name || "PROFILE"}
                </Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to="/admin" onClick={handleNavClick}>
                    DASHBOARD
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="logout-button">
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" onClick={handleNavClick}>
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
