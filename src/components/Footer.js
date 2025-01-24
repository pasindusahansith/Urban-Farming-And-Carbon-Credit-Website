import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaLeaf,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <div className="footer-section">
            <div className="brand">
              <FaLeaf className="brand-icon" />
              <h3>GreenCredit</h3>
            </div>
            <p>
              Empowering sustainable futures through innovative carbon credit
              solutions and environmental stewardship.
            </p>
            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="#">Carbon Credits</Link>
              </li>
              <li>
                <Link to="/profile">My Account</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Our Projects</h3>
            <ul>
              <li>Renewable Energy</li>
              <li>Energy Efficiency</li>
              <li>Waste Management</li>
              <li>Reforestation</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>
                <FaPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p>
                <FaEnvelope className="contact-icon" />
                <span>contact@greencredit.com</span>
              </p>
              <p>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Green Street, Eco City</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} GreenCredit. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
