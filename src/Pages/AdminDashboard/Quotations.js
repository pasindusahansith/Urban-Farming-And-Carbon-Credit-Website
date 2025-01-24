import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./quotations.css";
import { useNavigate } from "react-router-dom";

const Quotations = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedQuotation, setEditedQuotation] = useState(null);

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("Token:", token);
      console.log("User:", user);

      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      if (!user || user.role !== "admin") {
        setError("Admin access required");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/quotations", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);
      setQuotations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error details:", error.response || error);
      setError(
        error.response?.data?.message ||
          "Failed to load quotations. Please make sure you're logged in as admin."
      );
      setLoading(false);
    }
  };

  const handleDelete = async (quotationId) => {
    if (!window.confirm("Are you sure you want to delete this quotation?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/quotations/${quotationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Quotation deleted successfully");
      setQuotations(quotations.filter((q) => q._id !== quotationId));
      if (showDetails && selectedQuotation?._id === quotationId) {
        setShowDetails(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete quotation"
      );
    }
  };

  const handleEdit = (quotation) => {
    navigate(`/admin/quotations/edit/${quotation._id}`);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/quotations/${editedQuotation._id}`,
        editedQuotation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedQuotation = response.data;
      setQuotations(
        quotations.map((q) =>
          q._id === updatedQuotation._id ? updatedQuotation : q
        )
      );
      toast.success("Quotation updated successfully");
      setEditMode(false);
      setShowDetails(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update quotation"
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuotation({
      ...editedQuotation,
      [name]: value,
    });
  };

  const getFilteredQuotations = () => {
    if (filter === "all") return quotations;
    return quotations.filter((quotation) => quotation.status === filter);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewDetails = (quotation) => {
    setSelectedQuotation(quotation);
    setShowDetails(true);
  };

  const QuotationDetails = ({ quotation, onClose }) => (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Quotation Details</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {editMode ? (
            // Edit Form
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
              className="edit-form"
            >
              <div className="section">
                <h3>Quotation Details</h3>
                <div className="edit-grid">
                  <div className="form-group required">
                    <label>Carbon Credits (tons)</label>
                    <input
                      type="number"
                      name="carbonCredits"
                      value={editedQuotation.carbonCredits}
                      onChange={handleInputChange}
                      placeholder="Enter amount in tons"
                      min="0"
                      required
                    />
                  </div>
                  <div className="form-group required">
                    <label>Price per Credit ($)</label>
                    <input
                      type="number"
                      name="pricePerCredit"
                      value={editedQuotation.pricePerCredit}
                      onChange={handleInputChange}
                      placeholder="Enter price per credit"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group required">
                    <label>Project Duration (months)</label>
                    <input
                      type="number"
                      name="projectDuration"
                      value={editedQuotation.projectDuration}
                      onChange={handleInputChange}
                      placeholder="Enter duration in months"
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group required">
                    <label>Implementation Costs ($)</label>
                    <input
                      type="number"
                      name="implementationCosts"
                      value={editedQuotation.implementationCosts}
                      onChange={handleInputChange}
                      placeholder="Enter implementation costs"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Discounts (%)</label>
                    <input
                      type="number"
                      name="discounts"
                      value={editedQuotation.discounts}
                      onChange={handleInputChange}
                      placeholder="Enter discount percentage"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div className="form-group required">
                    <label>Status</label>
                    <select
                      name="status"
                      value={editedQuotation.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="form-group required full-width">
                  <label>Payment Terms</label>
                  <textarea
                    name="paymentTerms"
                    value={editedQuotation.paymentTerms}
                    onChange={handleInputChange}
                    placeholder="Enter payment terms and conditions"
                    required
                  />
                </div>
                <div className="form-group required full-width">
                  <label>Environmental Impact</label>
                  <textarea
                    name="environmentalImpact"
                    value={editedQuotation.environmentalImpact}
                    onChange={handleInputChange}
                    placeholder="Describe the environmental impact"
                    required
                  />
                </div>
                <div className="form-group required full-width">
                  <label>Verification Process</label>
                  <textarea
                    name="verification"
                    value={editedQuotation.verification}
                    onChange={handleInputChange}
                    placeholder="Describe the verification process"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <>
              <div className="section">
                <h3>User Information</h3>
                <p>
                  <strong>Name:</strong> {quotation.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {quotation.user.email}
                </p>
              </div>

              <div className="section">
                <h3>Order Information</h3>
                <p>
                  <strong>Project Type:</strong> {quotation.order.projectType}
                </p>
                <p>
                  <strong>Investor Type:</strong> {quotation.order.investorType}
                </p>
              </div>

              <div className="section">
                <h3>Quotation Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Carbon Credits:</label>
                    <span>{quotation.carbonCredits} tons</span>
                  </div>
                  <div className="detail-item">
                    <label>Price per Credit:</label>
                    <span>${quotation.pricePerCredit}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total Cost:</label>
                    <span>${quotation.totalCost}</span>
                  </div>
                  <div className="detail-item">
                    <label>Project Duration:</label>
                    <span>{quotation.projectDuration} months</span>
                  </div>
                  <div className="detail-item">
                    <label>Implementation Costs:</label>
                    <span>${quotation.implementationCosts}</span>
                  </div>
                  {quotation.discounts > 0 && (
                    <div className="detail-item">
                      <label>Discounts:</label>
                      <span>{quotation.discounts}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="section">
                <h3>Additional Information</h3>
                <div className="info-block">
                  <h4>Payment Terms</h4>
                  <p>{quotation.paymentTerms}</p>
                </div>
                <div className="info-block">
                  <h4>Environmental Impact</h4>
                  <p>{quotation.environmentalImpact}</p>
                </div>
                <div className="info-block">
                  <h4>Verification Process</h4>
                  <p>{quotation.verification}</p>
                </div>
              </div>

              <div className="section">
                <h3>Status Information</h3>
                <p>
                  <strong>Current Status:</strong>{" "}
                  <span className={`status ${quotation.status}`}>
                    {quotation.status}
                  </span>
                </p>
                <p>
                  <strong>Created:</strong> {formatDate(quotation.createdAt)}
                </p>
                {quotation.status !== "pending" && (
                  <p>
                    <strong>Response Received:</strong>{" "}
                    {formatDate(quotation.updatedAt)}
                  </p>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(quotation)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(quotation._id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="loading">Loading quotations...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="quotations-container">
      <div className="header">
        <h2>Quotation Management</h2>
        <div className="filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === "accepted" ? "active" : ""}`}
            onClick={() => setFilter("accepted")}
          >
            Accepted
          </button>
          <button
            className={`filter-btn ${filter === "rejected" ? "active" : ""}`}
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {quotations.length === 0 ? (
        <div className="no-quotations">No quotations found</div>
      ) : (
        <div className="quotations-list">
          {getFilteredQuotations().map((quotation) => (
            <div key={quotation._id} className="quotation-card">
              <div className="quotation-header">
                <div className="user-info">
                  <h3>{quotation.user.name}</h3>
                  <p>{quotation.user.email}</p>
                </div>
                <span className={`status ${quotation.status}`}>
                  {quotation.status.charAt(0).toUpperCase() +
                    quotation.status.slice(1)}
                </span>
              </div>

              <div className="quotation-summary">
                <div className="summary-row">
                  <span>Carbon Credits:</span>
                  <span>{quotation.carbonCredits} tons</span>
                </div>
                <div className="summary-row">
                  <span>Total Cost:</span>
                  <span>${quotation.totalCost}</span>
                </div>
                <div className="summary-row">
                  <span>Project Duration:</span>
                  <span>{quotation.projectDuration} months</span>
                </div>
              </div>

              <div className="quotation-footer">
                <button
                  className="view-details-btn"
                  onClick={() => handleViewDetails(quotation)}
                >
                  View Details
                </button>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(quotation)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(quotation._id)}
                  >
                    Delete
                  </button>
                </div>
                <span className="date">
                  Created: {formatDate(quotation.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDetails && selectedQuotation && (
        <QuotationDetails
          quotation={selectedQuotation}
          onClose={() => {
            setShowDetails(false);
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default Quotations;
