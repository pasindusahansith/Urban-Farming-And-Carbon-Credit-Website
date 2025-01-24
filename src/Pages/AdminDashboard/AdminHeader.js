import React from "react";
import { FaBell } from "react-icons/fa"; 
import "./adminheader.css"; 

const Header = () => {
  return (
    <div className="header">
      <div className="website-name">Admin</div>
      <div className="header-actions">
        <button className="header-button">
          <FaBell className="header-icon" />
          Notifications
        </button>
      </div>
    </div>
  );
};

export default Header;
 