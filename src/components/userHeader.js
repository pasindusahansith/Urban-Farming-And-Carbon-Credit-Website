import React, { useState } from "react";
import {
  FaLeaf,
  FaUser,
  FaHistory,
  FaCreditCard,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../assets/css/userHeader.css";

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New carbon credit order available.",
      read: false,
      redirectTo: null, // No redirection for this notification
    },
    {
      id: 2,
      message: "Your payment has been confirmed.",
      read: false,
      redirectTo: "/payments", // Redirect to the payments page
    },
    {
      id: 3,
      message: "Order #ORD12345 has been delivered.",
      read: true,
      redirectTo: null, // No redirection for this notification
    },
  ]);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen((prev) => !prev);

    // Mark all notifications as read when the dropdown is opened
    if (!isNotificationDropdownOpen) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) => ({ ...notif, read: true }))
      );
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationDropdownOpen(false);
  };

  const handleNotificationClick = (notification) => {
    if (notification.redirectTo) {
      navigate(notification.redirectTo);
    }
    setIsNotificationDropdownOpen(false);
  };

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">
        <a href="/" className="logo-link">
          <span className="green">Green</span>
          <span className="credit">Credit</span>
        </a>
      </h1>

      <button
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li onClick={() => handleNavigation("/projects")}>
          <FaLeaf /> <span style={{ marginLeft: "8px" }}>Carbon Credit</span>
        </li>


        <li className="notification-dropdown">
          <button
            className="notification-button"
            onClick={toggleNotificationDropdown}
            aria-expanded={isNotificationDropdownOpen}
          >
            <FaBell className="notification-icon" />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          {isNotificationDropdownOpen && (
            <ul className="dropdown-menu">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={notif.read ? "read" : "unread"}
                    onClick={() => handleNotificationClick(notif)}
                  >
                    {notif.message}
                  </li>
                ))
              ) : (
                <li>No new notifications.</li>
              )}
            </ul>
          )}
        </li>

        <li className="profile-dropdown">
          <button
            className="profile-button"
            onClick={toggleProfileDropdown}
            aria-expanded={isProfileDropdownOpen}
          >
            <FaUser className="profile-icon" />
            <span style={{ marginLeft: "8px" }}>Profile</span>
          </button>
          {isProfileDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={() => handleNavigation("/profile")}>
                <FaUser /> <span style={{ marginLeft: "8px" }}>My Profile</span>
              </li>
              <li onClick={() => handleNavigation("/history")}>
                <FaHistory /> <span style={{ marginLeft: "8px" }}>History</span>
              </li>
              <li onClick={() => handleNavigation("/payments")}>
                <FaCreditCard />{" "}
                <span style={{ marginLeft: "8px" }}>Payments</span>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default UserHeader;
