import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./Orders.module.css";

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showQuotationForm, setShowQuotationForm] = useState(false);
  const [quotationDetails, setQuotationDetails] = useState({
    carbonCredits: "",
    pricePerCredit: "",
    totalCost: "",
    projectDuration: "",
    implementationCosts: "",
    discounts: "",
    paymentTerms: "",
    environmentalImpact: "",
    verification: "",
  });
  const [quotations, setQuotations] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchAllQuotations();
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
      // Filter only approved orders
      const approvedOrders = response.data.filter(
        (order) => order.status === "approved"
      );
      setOrders(approvedOrders);
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

  const fetchAllQuotations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/quotations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Create a map of orderId to quotation for easy lookup
      const quotationMap = {};
      response.data.forEach((quotation) => {
        quotationMap[quotation.order] = quotation;
      });
      setQuotations(quotationMap);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      toast.error("Failed to load quotations");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotationDetails((prev) => {
      const newDetails = { ...prev, [name]: value };

      // Calculate total cost if both carbonCredits and pricePerCredit are set
      if (name === "carbonCredits" || name === "pricePerCredit") {
        const credits = name === "carbonCredits" ? value : prev.carbonCredits;
        const price = name === "pricePerCredit" ? value : prev.pricePerCredit;

        if (credits && price) {
          newDetails.totalCost = (
            parseFloat(credits) * parseFloat(price)
          ).toFixed(2);
        }
      }

      return newDetails;
    });
  };

  const handleCreateQuotation = (order) => {
    setSelectedOrder(order);
    setShowQuotationForm(true);
  };

  const handleSubmitQuotation = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        "carbonCredits",
        "pricePerCredit",
        "totalCost",
        "projectDuration",
        "implementationCosts",
        "paymentTerms",
        "environmentalImpact",
        "verification",
      ];

      const missingFields = requiredFields.filter(
        (field) => !quotationDetails[field]
      );

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
        return;
      }

      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/quotations`,
        {
          ...quotationDetails,
          orderId: selectedOrder._id,
          userId: selectedOrder.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Quotation sent successfully");
      setShowQuotationForm(false);
      setSelectedOrder(null);
      setQuotationDetails({
        carbonCredits: "",
        pricePerCredit: "",
        totalCost: "",
        projectDuration: "",
        implementationCosts: "",
        discounts: "",
        paymentTerms: "",
        environmentalImpact: "",
        verification: "",
      });
      fetchAllQuotations(); // Refresh quotations after sending a new one
    } catch (error) {
      console.error("Error sending quotation:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send quotation. Please try again."
      );
    }
  };

  const renderQuotationStatus = (order) => {
    const quotation = quotations[order._id];
    if (!quotation) {
      return (
        <div className={styles.actionButtons}>
          <button
            className={styles.quotationButton}
            onClick={() => handleCreateQuotation(order)}
          >
            Create Quotation
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteOrder(order._id)}
          >
            Delete Order
          </button>
        </div>
      );
    }

    return (
      <div className={styles.quotationStatus}>
        <h4>Quotation Status</h4>
        <div className={`${styles.status} ${styles[quotation.status]}`}>
          {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
        </div>
        {quotation.status === "pending" && (
          <p className={styles.pendingNote}>Waiting for client response</p>
        )}
        {(quotation.status === "accepted" ||
          quotation.status === "rejected") && (
          <>
            <p className={styles.responseDate}>
              Response received:{" "}
              {new Date(quotation.updatedAt).toLocaleDateString()}
            </p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteOrder(order._id)}
            >
              Delete Order
            </button>
          </>
        )}
      </div>
    );
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Order deleted successfully");
      // Remove the order from the state
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error(error.response?.data?.message || "Failed to delete order");
    }
  };

  if (loading) return <div className={styles.loading}>Loading orders...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.heading}>Accepted Orders</h2>
      <p className={styles.description}>
        Create and manage quotations for approved orders.
      </p>

      {orders.length === 0 ? (
        <div className={styles.noOrders}>No approved orders found</div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.headerMain}>
                  <h3>
                    {order.investorType === "Individual"
                      ? order.name
                      : order.companyName}
                  </h3>
                  <span className={styles.orderType}>{order.projectType}</span>
                </div>
                <div className={styles.orderMeta}>
                  <span className={styles.orderDate}>
                    Submitted: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className={styles.orderId}>
                    ID: {order._id.slice(-6)}
                  </span>
                </div>
              </div>

              <div className={styles.orderContent}>
                <div className={styles.orderInfo}>
                  <div className={styles.infoSection}>
                    <h4>Contact Information</h4>
                    <p>
                      <strong>Email:</strong> {order.email}
                      {order.companyEmail && (
                        <span className={styles.secondaryEmail}>
                          <br />
                          Company: {order.companyEmail}
                        </span>
                      )}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {order.investorType === "Individual"
                        ? order.phone
                        : order.companyPhone}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {order.investorType === "Individual"
                        ? order.address
                        : order.companyAddress}
                    </p>
                  </div>

                  <div className={styles.infoSection}>
                    <h4>Project Details</h4>
                    <p>
                      <strong>Type:</strong> {order.projectType}
                    </p>
                    <p>
                      <strong>Investor Type:</strong> {order.investorType}
                    </p>
                    {order.orderDetails && (
                      <div className={styles.projectDescription}>
                        <strong>Description:</strong>
                        <p>{order.orderDetails.description}</p>
                      </div>
                    )}
                  </div>

                  {order.investorType === "Company" && (
                    <div className={styles.infoSection}>
                      <h4>Company Information</h4>
                      <p>
                        <strong>Company:</strong> {order.companyName}
                      </p>
                      <p>
                        <strong>Registration:</strong>{" "}
                        {order.companyRegistration || "N/A"}
                      </p>
                      <p>
                        <strong>Industry:</strong> {order.industry || "N/A"}
                      </p>
                    </div>
                  )}

                  <div className={styles.infoSection}>
                    <h4>Additional Information</h4>
                    <p>
                      <strong>Preferred Contact:</strong>{" "}
                      {order.preferredContact || "Not specified"}
                    </p>
                    {order.additionalNotes && (
                      <div className={styles.notes}>
                        <strong>Notes:</strong>
                        <p>{order.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
                {renderQuotationStatus(order)}
              </div>
            </div>
          ))}
        </div>
      )}

      {showQuotationForm && selectedOrder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Create Quotation</h3>
              <div className={styles.clientInfo}>
                <p className={styles.clientName}>
                  For:{" "}
                  {selectedOrder.investorType === "Individual"
                    ? selectedOrder.name
                    : selectedOrder.companyName}
                </p>
                <p className={styles.projectType}>
                  Project: {selectedOrder.projectType}
                </p>
              </div>
            </div>

            <form
              className={styles.quotationForm}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.formSection}>
                <h4>Carbon Credits Information</h4>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Carbon Credits (Tons)*</label>
                    <input
                      type="number"
                      name="carbonCredits"
                      value={quotationDetails.carbonCredits}
                      onChange={handleInputChange}
                      placeholder="Enter amount in tons"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price per Credit ($)*</label>
                    <input
                      type="number"
                      name="pricePerCredit"
                      value={quotationDetails.pricePerCredit}
                      onChange={handleInputChange}
                      placeholder="Enter price per credit"
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Total Cost ($)</label>
                  <input
                    type="text"
                    value={quotationDetails.totalCost}
                    readOnly
                    className={styles.calculatedField}
                    placeholder="Automatically calculated"
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <h4>Project Timeline & Costs</h4>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Project Duration (months)*</label>
                    <input
                      type="number"
                      name="projectDuration"
                      value={quotationDetails.projectDuration}
                      onChange={handleInputChange}
                      placeholder="Enter project duration"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Implementation Costs ($)*</label>
                    <input
                      type="number"
                      name="implementationCosts"
                      value={quotationDetails.implementationCosts}
                      onChange={handleInputChange}
                      placeholder="Enter implementation costs"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Discounts (%)</label>
                    <input
                      type="number"
                      name="discounts"
                      value={quotationDetails.discounts}
                      onChange={handleInputChange}
                      placeholder="Enter discount percentage"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h4>Terms & Conditions</h4>
                <div className={styles.formGroup}>
                  <label>Payment Terms*</label>
                  <textarea
                    name="paymentTerms"
                    value={quotationDetails.paymentTerms}
                    onChange={handleInputChange}
                    placeholder="Specify payment schedule, methods, and conditions"
                    required
                  />
                </div>
              </div>

              <div className={styles.formSection}>
                <h4>Environmental Impact & Verification</h4>
                <div className={styles.formGroup}>
                  <label>Environmental Impact Assessment*</label>
                  <textarea
                    name="environmentalImpact"
                    value={quotationDetails.environmentalImpact}
                    onChange={handleInputChange}
                    placeholder="Detail the project's environmental benefits, carbon reduction metrics, and sustainability impact"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Verification Process*</label>
                  <textarea
                    name="verification"
                    value={quotationDetails.verification}
                    onChange={handleInputChange}
                    placeholder="Outline the verification methodology, standards compliance, and monitoring procedures"
                    required
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowQuotationForm(false);
                    setQuotationDetails({
                      carbonCredits: "",
                      pricePerCredit: "",
                      totalCost: "",
                      projectDuration: "",
                      implementationCosts: "",
                      discounts: "",
                      paymentTerms: "",
                      environmentalImpact: "",
                      verification: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  onClick={handleSubmitQuotation}
                >
                  Send Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
