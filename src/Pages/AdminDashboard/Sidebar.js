import React from "react";
import "./sidebar.css";
import {
  FaLeaf,
  FaShoppingCart,
  FaChartBar,
  FaUser,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-name">CarbonCredit</div>
      </div>

      <ul className="sidebar-menu">
        <li>
          <Link to="carbon">
            <FaLeaf className="icon" />
            Carbon Credits
          </Link>
        </li>
        <li>
          <Link to="orders">
            <FaShoppingCart className="icon" />
            Orders
          </Link>
        </li>
        <li>
          <Link to="quotations">
            <FaFileInvoiceDollar className="icon" />
            Quotations
          </Link>
        </li>
        <li>
          <Link to="reports">
            <FaChartBar className="icon" />
            Reports
          </Link>
        </li>
        <li>
          <Link to="client">
            <FaUser className="icon" />
            Client
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
