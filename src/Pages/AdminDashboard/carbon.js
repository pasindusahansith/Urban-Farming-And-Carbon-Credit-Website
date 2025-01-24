import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./Carbon.module.css";

const Carbon = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/orders/admin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load orders. Please make sure you're logged in as admin."
      );
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/orders/${id}`,
        { status: "approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order approved successfully");
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "approved" } : order
        )
      );
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error(error.response?.data?.message || "Failed to approve order");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/orders/${id}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Order rejected successfully");
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: "rejected" } : order
        )
      );
    } catch (error) {
      console.error("Error rejecting order:", error);
      toast.error(error.response?.data?.message || "Failed to reject order");
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Carbon Credit Orders</h2>
      <p className={styles.description}>
        Review and manage customer orders for carbon credit projects.
      </p>
      <div className={styles.orderTable}>
        <h3>Customer Orders</h3>
        <div className={styles.filterStatus}>
          <span>Filter by status:</span>
          <button className={`${styles.filterBtn} ${styles.active}`}>
            All
          </button>
          <button className={styles.filterBtn}>Pending</button>
          <button className={styles.filterBtn}>Approved</button>
          <button className={styles.filterBtn}>Rejected</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client Name</th>
              <th>Project Type</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.noOrders}>
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className={`${styles.orderRow} ${
                    order.status === "approved"
                      ? styles.rowApproved
                      : order.status === "rejected"
                      ? styles.rowRejected
                      : ""
                  }`}
                >
                  <td>{order._id.slice(-6).toUpperCase()}</td>
                  <td>
                    {order.investorType === "Individual"
                      ? order.name
                      : order.companyName}
                  </td>
                  <td>{order.projectType}</td>
                  <td>{order.email}</td>
                  <td className={styles[order.status || "pending"]}>
                    {order.status || "pending"}
                  </td>
                  <td>
                    <div className={styles.buttonGroup}>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className={styles.detailsBtn}
                      >
                        Details
                      </button>
                      {(!order.status || order.status === "pending") && (
                        <>
                          <button
                            onClick={() => handleApprove(order._id)}
                            className={styles.approveBtn}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(order._id)}
                            className={styles.rejectBtn}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDetails && selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Order Details</h3>
            <div className={styles.orderDetails}>
              <div className={styles.detailGroup}>
                <h4>Client Information</h4>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedOrder.investorType === "Individual"
                    ? selectedOrder.name
                    : selectedOrder.companyName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedOrder.investorType === "Individual"
                    ? selectedOrder.phone
                    : selectedOrder.companyPhone}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.investorType === "Individual"
                    ? selectedOrder.address
                    : selectedOrder.companyAddress}
                </p>
              </div>
              <div className={styles.detailGroup}>
                <h4>Project Information</h4>
                <p>
                  <strong>Project Type:</strong> {selectedOrder.projectType}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={styles[selectedOrder.status || "pending"]}>
                    {selectedOrder.status || "pending"}
                  </span>
                </p>
                {selectedOrder.orderDetails && (
                  <div className={styles.additionalDetails}>
                    <h4>Additional Details</h4>
                    <pre>
                      {JSON.stringify(selectedOrder.orderDetails, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.modalActions}>
              {(!selectedOrder.status ||
                selectedOrder.status === "pending") && (
                <>
                  <button
                    onClick={() => handleApprove(selectedOrder._id)}
                    className={styles.approveBtn}
                  >
                    Approve Order
                  </button>
                  <button
                    onClick={() => handleReject(selectedOrder._id)}
                    className={styles.rejectBtn}
                  >
                    Reject Order
                  </button>
                </>
              )}
              <button
                onClick={() => setShowDetails(false)}
                className={styles.closeBtn}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carbon;
