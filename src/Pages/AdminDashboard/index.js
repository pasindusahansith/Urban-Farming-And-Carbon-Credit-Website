import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Orders from "./Orders";
import Users from "./Users";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.sidebar}>
        <h2>Admin</h2>
        <ul>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive ? styles.activeLink : undefined
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
