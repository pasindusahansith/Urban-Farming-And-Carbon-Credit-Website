import React, { useState } from "react";
import UserHeader from "../components/userHeader";
import "../assets/css/CarbonCreditForm.css";

const CarbonCreditForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyType: "private",
    companySector: "",
    carbonCredits: "",
    projectType: "reforestation",
    carbonFootprint: "",
    sustainabilityGoals: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <>
      <UserHeader />
      <div id="carbon-credit-order-form" className="carbon-credit-form-container">
        <h2 className="form-title">Order Carbon Credits</h2>
        <p className="form-description">
          Fill out the form below to order carbon credits and support your sustainability efforts. 
          Your contributions can make a difference in achieving global sustainability goals.
        </p>

        <form onSubmit={handleSubmit} className="carbon-credit-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Enter your company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyType">Company Type:</label>
            <select
              id="companyType"
              name="companyType"
              value={formData.companyType}
              onChange={handleChange}
              required
            >
              <option value="private">Private Business</option>
              <option value="ngo">NGO</option>
              <option value="government">Government</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="companySector">Company Sector:</label>
            <input
              type="text"
              id="companySector"
              name="companySector"
              value={formData.companySector}
              onChange={handleChange}
              required
              placeholder="Enter your company sector (e.g., manufacturing, energy, etc.)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="carbonCredits">Desired Carbon Credits (in tons):</label>
            <input
              type="number"
              id="carbonCredits"
              name="carbonCredits"
              value={formData.carbonCredits}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter the number of carbon credits (in tons)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectType">Preferred Project Type:</label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="reforestation">Reforestation</option>
              <option value="renewable-energy">Renewable Energy</option>
              <option value="afforestation">Afforestation</option>
              <option value="carbon-capture">Carbon Capture & Storage</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="carbonFootprint">Your Company’s Current Carbon Footprint (in tons per year):</label>
            <input
              type="number"
              id="carbonFootprint"
              name="carbonFootprint"
              value={formData.carbonFootprint}
              onChange={handleChange}
              required
              placeholder="Enter your current carbon footprint"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sustainabilityGoals">Your Sustainability Goals:</label>
            <textarea
              id="sustainabilityGoals"
              name="sustainabilityGoals"
              value={formData.sustainabilityGoals}
              onChange={handleChange}
              placeholder="Describe your sustainability goals and how carbon credits align with them"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="budget">Budget for Carbon Credit Purchase (in USD):</label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              placeholder="Enter your budget for carbon credit purchases"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message or Special Requests:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional information or special requests"
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="submit-btn">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CarbonCreditForm;
