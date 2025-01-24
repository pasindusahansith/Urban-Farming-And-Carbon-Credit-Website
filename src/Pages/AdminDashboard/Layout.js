import React from "react";
import Sidebar from "./Sidebar";
import Header from "./AdminHeader";
import { Outlet } from "react-router-dom";
import "../AdminDashboard/layout.css";

const Layout = () => {
  const [activePage, setActivePage] = React.useState("carbon");

  return (
    <div className="layout-container">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        <Header />
        <div className="page-content">
          {activePage === "carbon" && <Outlet />}
          {activePage === "orders" && <Outlet />}
          {activePage === "reports" && <Outlet />}
          {activePage === "Client" && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
