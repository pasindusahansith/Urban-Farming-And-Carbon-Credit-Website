import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styles from "./Quotations.module.css";

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/quotations/my-quotations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setQuotations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load quotations. Please try again."
      );
      setLoading(false);
    }
  };

  const handleAccept = async (quotationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/quotations/${quotationId}`,
        { status: "accepted" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Quotation accepted successfully");
      setQuotations((prev) =>
        prev.map((q) =>
          q._id === quotationId ? { ...q, status: "accepted" } : q
        )
      );
      setShowDetails(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to accept quotation"
      );
    }
  };

  const handleReject = async (quotationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/quotations/${quotationId}`,
        { status: "rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Quotation rejected successfully");
      setQuotations((prev) =>
        prev.map((q) =>
          q._id === quotationId ? { ...q, status: "rejected" } : q
        )
      );
      setShowDetails(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reject quotation"
      );
    }
  };

  const handleViewDetails = (quotation) => {
    setSelectedQuotation(quotation);
    setShowDetails(true);
  };

  if (loading)
    return <div className={styles.loading}>Loading quotations...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.quotationsContainer}>
      <h2 className={styles.heading}>My Quotations</h2>
      <p className={styles.description}>
        Review and respond to quotations for your orders.
      </p>

      {quotations.length === 0 ? (
        <div className={styles.noQuotations}>No quotations found</div>
      ) : (
        <div className={styles.quotationsList}>
          {quotations.map((quotation) => (
            <div key={quotation._id} className={styles.quotationCard}>
              <div className={styles.quotationHeader}>
                <h3>Quotation for {quotation.order.projectType}</h3>
                <span className={styles[quotation.status]}>
                  {quotation.status.charAt(0).toUpperCase() +
                    quotation.status.slice(1)}
                </span>
              </div>
              <div className={styles.quotationInfo}>
                <p>
                  <strong>Carbon Credits:</strong> {quotation.carbonCredits}{" "}
                  tons
                </p>
                <p>
                  <strong>Price per Credit:</strong> ${quotation.pricePerCredit}
                </p>
                <p>
                  <strong>Total Cost:</strong> ${quotation.totalCost}
                </p>
              </div>
              <button
                className={styles.viewButton}
                onClick={() => handleViewDetails(quotation)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {showDetails && selectedQuotation && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Quotation Details</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailGroup}>
                <h4>Project Information</h4>
                <p>
                  <strong>Project Type:</strong>{" "}
                  {selectedQuotation.order.projectType}
                </p>
                <p>
                  <strong>Carbon Credits:</strong>{" "}
                  {selectedQuotation.carbonCredits} tons
                </p>
                <p>
                  <strong>Price per Credit:</strong> $
                  {selectedQuotation.pricePerCredit}
                </p>
                <p>
                  <strong>Total Cost:</strong> ${selectedQuotation.totalCost}
                </p>
                <p>
                  <strong>Project Duration:</strong>{" "}
                  {selectedQuotation.projectDuration} months
                </p>
              </div>
              <div className={styles.detailGroup}>
                <h4>Financial Information</h4>
                <p>
                  <strong>Implementation Costs:</strong> $
                  {selectedQuotation.implementationCosts}
                </p>
                <p>
                  <strong>Discounts:</strong> {selectedQuotation.discounts}%
                </p>
                <p>
                  <strong>Payment Terms:</strong>
                </p>
                <p className={styles.terms}>{selectedQuotation.paymentTerms}</p>
              </div>
              <div className={styles.detailGroup}>
                <h4>Environmental Impact</h4>
                <p>{selectedQuotation.environmentalImpact}</p>
              </div>
              <div className={styles.detailGroup}>
                <h4>Verification Process</h4>
                <p>{selectedQuotation.verification}</p>
              </div>
            </div>
            <div className={styles.modalActions}>
              {selectedQuotation.status === "pending" && (
                <>
                  <button
                    className={styles.acceptButton}
                    onClick={() => handleAccept(selectedQuotation._id)}
                  >
                    Accept Quotation
                  </button>
                  <button
                    className={styles.rejectButton}
                    onClick={() => handleReject(selectedQuotation._id)}
                  >
                    Reject Quotation
                  </button>
                </>
              )}
              <button
                className={styles.closeButton}
                onClick={() => setShowDetails(false)}
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

export default Quotations;
