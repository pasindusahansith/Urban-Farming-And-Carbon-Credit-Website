import React from "react";
import '../Assest/css/Login.css';
import '../Assest/FA 6.4.0 Pro/css/all.min.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
      navigate("/individualSignUp"); 
      };

  const handleNonGov = () => {
      navigate("/Nongovenment"); 
      };

  const handleGov = () => {
      navigate("/Nongovenment"); 
      };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>SIGN-UP</h1>
        <p>Choose your option</p>
        <button className="signup-button" onClick={handleLogout}>
          <i className="fas fa-seedling"></i> Individual Farming
        </button>
        <button className="signup-button" onClick={handleNonGov}>
          <i className="fas fa-handshake"></i> Non-Government Organization
        </button>
        <button className="signup-button" onClick={handleGov}>
          <i className="fas fa-balance-scale"></i> Government Organization
        </button>
      </div>
    </div>
  );
};

export default SignUp;
