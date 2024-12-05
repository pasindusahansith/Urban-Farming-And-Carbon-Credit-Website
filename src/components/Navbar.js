import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Navigation Menu */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('home')}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('about')}>
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('urbanFarming')}>
              Urban Farming
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('produceSales')}>
              Produce Sales
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('carbonCredit')}>
              Carbon Credit
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('partnership')}>
              Partnership
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('projects')}>
              Our Projects
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('reviews')}>
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => scrollToSection('contact')}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
