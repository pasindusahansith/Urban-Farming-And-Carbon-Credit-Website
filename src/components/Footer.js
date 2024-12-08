import React from "react";
import '../Assest/css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="footer-logo">
        <img
          src="path/to/your/logo.png"
          alt="GreenCredit Logo"
          className="footer-logo-img"
        />
      </div> */}

    <div className="footer-main">
        <h3 className="footer-title">CONTACT US</h3>

        <div className="footer-content">
            <div className="footer-social">
                <h4>CONNECT WITH US</h4>
                <ul className="social-icons">
                <li>
                    <a href="#instagram">
                        Instagram <i className="fa fa-instagram" aria-hidden="true"></i> 
                    </a>
                </li>
                <li>
                    <a href="#twitter">
                        Twitter <i className="fa fa-twitter" aria-hidden="true"></i> 
                    </a>
                </li>
                <li>
                    <a href="#facebook">
                        Facebook <i className="fa fa-facebook" aria-hidden="true"></i> 
                    </a>
                </li>
                <li>
                    <a href="#linkedin">
                        LinkedIn <i className="fa fa-linkedin" aria-hidden="true"></i> 
                    </a>
                </li>
                </ul>
                <p className="footer-email">Green@Credit.com</p>
            </div>

            <div className="footer-locations">
                <h4>OUR LOCATIONS</h4>
                    <div className="location-row">
                        <p>
                            123 Anywhere St., Any City, ST 12345
                        </p>
                        <p>
                            456 Somewhere Ave., Some City, ST 67890
                        </p>
                        <p>
                            789 Elsewhere Blvd., Other City, ST 54321
                        </p>
                    </div>
            </div>
        </div>
    </div>
    </footer>
  );
}

export default Footer;
