import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
// import CarbonCredit from "./pages/CarbonCredit";
import CarbonCreditForm from "./pages/CarbonCreditForm";
import Profile from "./pages/profile";
import History from "./pages/history";
import Payment from "./pages/payments";
import Layout from "./pages/AdminDashboard/Layout";
import Carbon from "./pages/AdminDashboard/carbon";
import Orders from "./pages/AdminDashboard/Orders";
import Reports from "./pages/AdminDashboard/Reports";
import ProjectsPage from "./pages/ProjectsPage";
import OrderForm from "./pages/OrderForm";
import Client from "./pages/AdminDashboard/client";
import Quotations from "./pages/AdminDashboard/Quotations";
import EditQuotation from "./pages/AdminDashboard/EditQuotation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setIsAdmin(JSON.parse(user).role === "admin");
    }
  }, []);

  const handleRedirect = (Component) => {
    return isAdmin ? Component : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header isLoggedIn={isLoggedIn} setIsAdmin={setIsAdmin} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path="/carbon-credit" element={<CarbonCredit />} /> */}
        <Route path="/add-order" element={<CarbonCreditForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/payments" element={<Payment />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/order-form" element={<OrderForm />} />
        {/* Admin Routes */}
        <Route path="/admin" element={handleRedirect(<Layout />)}>
          <Route index element={<Carbon />} />
          <Route path="carbon" element={<Carbon />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<Reports />} />
          <Route path="client" element={<Client />} />
          <Route path="quotations" element={<Quotations />} />
          <Route path="quotations/edit/:id" element={<EditQuotation />} />
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
