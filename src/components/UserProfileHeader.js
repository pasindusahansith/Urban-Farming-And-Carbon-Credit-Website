import React from "react";
import "../Assest/css/UserProfileHeader.css";

export default function UserProfileHeader() {
  return (
    <div className="user-profile-header">
      <h1 className="profile-title">User profile</h1>
      <div className="profile-actions">
        <div className="user-info">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
          <span className="user-name">Alfredo Torres</span>
        </div>
        <div className="action-icons">
          <button className="icon-button">
            <i className="notification-icon"></i>
          </button>
          <button className="icon-button">
            <i className="cart-icon"></i>
          </button>
          <button className="icon-button">
            <i className="co-icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
