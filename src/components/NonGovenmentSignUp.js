import React from "react";
import "../Assest/css/IndividualSignUp.css";

const NonGovenmentSignUp = ({ data, onChange, onAddressChange, onNext }) => {

  return (
    <div className="signup-form-card">
      <h1>SIGN-UP</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => onChange("password", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={data.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <div className="address-fields">
            <input
              type="text"
              placeholder="Street"
              value={data.address.street}
              onChange={(e) => onAddressChange("street", e.target.value)}
              className="form-input small-input"
            />
            <input
              type="text"
              placeholder="City"
              value={data.address.city}
              onChange={(e) => onAddressChange("city", e.target.value)}
              className="form-input small-input"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={data.address.zip}
              onChange={(e) => onAddressChange("zip", e.target.value)}
              className="form-input small-input"
            />
            <input
              type="text"
              placeholder="District"
              value={data.address.district}
              onChange={(e) => onAddressChange("district", e.target.value)}
              className="form-input small-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact No</label>
          <input
            type="text"
            id="contact"
            value={data.contact}
            onChange={(e) => onChange("contact", e.target.value)}
            className="form-input"
          />
        </div>

        <button type="button" className="next-button" onClick={onNext}>
          NEXT PAGE
        </button>
      </form>
    </div>
  );
};

export default NonGovenmentSignUp;
