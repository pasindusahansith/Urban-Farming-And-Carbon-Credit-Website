import React from "react";
import UserHeader from "../components/userHeader";
import "../assets/css/CarbonCredit.css";

const CarbonCredit = () => {
  return (
    <>
      <UserHeader />
      
      <div id="carbon-credit-page" className="carbon-credit-page">
        <div className="content">
          <h1 className="page-title">Carbon Credit Projects</h1>
          <p>
            At <span className="company-name">GreenCredit</span>, we help businesses offset their environmental impact by implementing carbon credit projects. Below is an overview of how we do this:
          </p>

          <div className="process-steps">
            <h2>Our Step-by-Step Process:</h2>
            <ol>
              <li>
                <strong>Assessment of Carbon Footprint:</strong>
                We collaborate with the company to analyze their carbon emissions, identifying major sources of pollution.
              </li>
              <li>
                <strong>Set Reduction Goals:</strong>
                Based on the assessment, we set achievable goals for reducing carbon emissions over time.
              </li>
              <li>
                <strong>Planning the Offset Projects:</strong>
                We design custom carbon offset projects such as reforestation, afforestation, or renewable energy initiatives tailored to the company’s needs.
              </li>
              <li>
                <strong>Implementation:</strong>
                Our team works with local communities, organizations, and stakeholders to execute the projects, like planting trees or developing renewable energy sources.
              </li>
              <li>
                <strong>Monitoring and Verification:</strong>
                After implementation, we regularly monitor and verify the project’s progress using advanced tools and techniques to ensure compliance with carbon credit standards.
              </li>
              <li>
                <strong>Certification and Reporting:</strong>
                Once the project is verified, the company is issued certified carbon credits, which can be traded or retired to offset their emissions.
              </li>
            </ol>
          </div>

          <div className="call-to-action">
            <p>
              Interested in partnering with us to offset your company’s carbon footprint? Get in touch with our team today and contribute to a greener future!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarbonCredit;
