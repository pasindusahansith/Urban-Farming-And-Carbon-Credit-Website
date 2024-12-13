import React from "react";
import "../Assest/css/IndividualSignUpNext.css";

const NonGovenmentSignUpNext = ({ data, onChange, onSubmit }) => {
  return (
    
      <div className="signup-form-card">
        <h1>SIGN-UP</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Organization Registration Number</label>
            <input
              type="text"
              placeholder="Enter Registration Number"
              value={data.registrationNumber || ""}
              onChange={(e) => onChange("registrationNumber", e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Department / Division Name</label>
            <input
              type="text"
              // placeholder="Enter Registration Number"
              value={data.registrationNumber || ""}
              onChange={(e) => onChange("registrationNumber", e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Sustainability Goals</label>
            <textarea
              // placeholder="Enter Purpose"
              value={data.purpose || ""}
              onChange={(e) => onChange("purpose", e.target.value)}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>
      </div>
  );
};

export default NonGovenmentSignUpNext;
