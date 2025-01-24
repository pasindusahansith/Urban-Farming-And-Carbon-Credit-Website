import React from "react";
import "../assets/css/general.css";
import image from "../assets/image.png";
import Footer from "../components/Footer";

import projectImage1 from "../assets/Each_one_ Plant_one.jpg";
import projectImage2 from "../assets/IMAGE-Hameedia-‘Donate-Oxygen-to-the-Planet’-project.jpg";
import projectImage3 from "../assets/maxresdefault.jpg";

import homeImage from "../assets/home_image.png";
import backgroundImage from "../assets/image.png";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* Home Section */}
      <div
        id="home"
        className="home-section"
        style={{ backgroundImage: `url(${homeImage})` }}
      >
        <div className="content">
          <h1>
            "Empowering Urban Farming & Sustainability through Carbon Credits."
          </h1>
          <h3>
            Join a community dedicated to urban farming, sustainability, and
            carbon credit trading.
          </h3>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="about-section">
        <div className="about-content">
          <div className="text-content">
            <h1>About Us</h1>
            <p>
              At <b>GreenCredit</b>, we are dedicated to creating a sustainable
              future through innovative solutions in urban farming and
              environmental responsibility. Our focus is on promoting green
              practices that make a real impact on our planet's health.
            </p>
            <p>
              We are also committed to supporting carbon credit trading, helping
              businesses and individuals offset their carbon emissions. Through
              this, we empower our community to actively participate in reducing
              environmental footprints and fostering a greener future.
            </p>
            <p>
              Join us as we work towards a world where sustainability and urban
              farming thrive together, creating positive change for both the
              environment and communities.
            </p>
          </div>
          <div className="image-content">
            <img src={image} alt="About Us" />
          </div>
        </div>
      </div>

      {/* Our Projects Section */}
      <div id="our-projects" className="our-section">
        <h1>Our Projects</h1>
        <div className="project-grid">
          <div className="project-card">
            <img src={projectImage1} alt="Urban Farming Initiative" />
            <h3>Urban Farming Initiative</h3>
            <p>
              Promoting sustainable agriculture in urban areas to create green
              spaces and provide fresh produce.
            </p>
          </div>
          <div className="project-card">
            <img src={projectImage2} alt="Carbon Reduction Program" />
            <h3>Carbon Reduction Program</h3>
            <p>
              Helping individuals and businesses offset carbon emissions through
              impactful environmental projects.
            </p>
          </div>
          <div className="project-card">
            <img src={projectImage3} alt="Renewable Energy Integration" />
            <h3>Renewable Energy Integration</h3>
            <p>
              Integrating renewable energy solutions to power urban farming and
              community initiatives sustainably.
            </p>
          </div>
        </div>
      </div>

      {/* Carbon Credit Section */}
      <div
        id="carbon-credit"
        className="section"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="background-container">
          <div className="content">
            <h2>How Carbon Credits Work</h2>
            <p>
              Carbon credits allow businesses and individuals to offset their
              carbon emissions by supporting environmental projects like urban
              farming, reforestation, and renewable energy. By participating in
              carbon credit trading, you contribute to projects that absorb or
              reduce carbon emissions, helping the planet recover from the
              adverse effects of climate change.
            </p>
            <p>
              Through the purchase of carbon credits, individuals and
              organizations can compensate for their carbon emissions, making a
              tangible difference in the fight against global warming.
            </p>
            <button
              className="learn-more-btn"
              onClick={() => (window.location.href = "/projects")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="modern-contact-section">
        <h2>Contact Us</h2>
        <p>
          We’re here to help and answer any questions you might have. Let’s
          connect!
        </p>

        {/* Quick Contact Options */}
        <div className="quick-contact">
          <div className="contact-card">
            <FaPhoneAlt className="icon" />
            <h3>Call Us</h3>
            <p>
              <a href="tel:+1800123456">+1 800 123 456</a>
            </p>
          </div>
          <div className="contact-card">
            <FaEnvelope className="icon" />
            <h3>Email Us</h3>
            <p>
              <a href="mailto:contact@greencredit.com">
                contact@greencredit.com
              </a>
            </p>
          </div>
          <div className="contact-card">
            <FaMapMarkerAlt className="icon" />
            <h3>Visit Us</h3>
            <p>123 Sustainability Street, GreenCity, Earth</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
