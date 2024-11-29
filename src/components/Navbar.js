import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div> */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About Us" className="nav-link" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Urban Farming" className="nav-link" onClick={closeMobileMenu}>
                Urban Farming
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Produce Sales" className="nav-link" onClick={closeMobileMenu}>
                Produce Sales
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Carbon Credit" className="nav-link" onClick={closeMobileMenu}>
                Carbon Credit
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Partnership" className="nav-link" onClick={closeMobileMenu}>
                Partnership
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Our Projects" className="nav-link" onClick={closeMobileMenu}>
                Our Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Reviews" className="nav-link" onClick={closeMobileMenu}>
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact Us" className="nav-link" onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
