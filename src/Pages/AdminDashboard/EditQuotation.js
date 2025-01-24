import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditQuotation.css";

const EditQuotation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState({
    carbonCredits: "",
    pricePerCredit: "",
    totalCost: "",
    projectDuration: "",
    implementationCosts: "",
    discounts: "",
    paymentTerms: "",
    environmentalImpact: "",
    verification: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        console.log("Token:", token);
        console.log("User:", user);

        if (!token || !user || user.role !== "admin") {
          toast.error("Admin access required");
          navigate("/admin/quotations");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/quotations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Quotation data:", response.data);
        setQuotation(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error details:", error.response || error);
        toast.error(
          error.response?.data?.message || "Failed to fetch quotation"
        );
        navigate("/admin/quotations");
      }
    };

    fetchQuotation();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuotation({
      ...quotation,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user || user.role !== "admin") {
        toast.error("Admin access required");
        return;
      }

      await axios.put(`http://localhost:5000/api/quotations/${id}`, quotation, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Quotation updated successfully");
      navigate("/admin/quotations");
    } catch (error) {
      console.error("Update error:", error.response || error);
      toast.error(
        error.response?.data?.message || "Failed to update quotation"
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-quotation-container">
      <div className="edit-quotation-header">
        <h2>Edit Quotation</h2>
        <button
          className="back-button"
          onClick={() => navigate("/admin/quotations")}
        >
          Back to Quotations
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-quotation-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group required">
              <label>Carbon Credits (tons)</label>
              <input
                type="number"
                name="carbonCredits"
                value={quotation.carbonCredits}
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
                value={quotation.pricePerCredit}
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
                value={quotation.projectDuration}
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
                value={quotation.implementationCosts}
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
                value={quotation.discounts}
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
                value={quotation.status}
                onChange={handleInputChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Details</h3>
          <div className="form-group required">
            <label>Payment Terms</label>
            <textarea
              name="paymentTerms"
              value={quotation.paymentTerms}
              onChange={handleInputChange}
              placeholder="Enter payment terms and conditions"
              required
            />
          </div>
          <div className="form-group required">
            <label>Environmental Impact</label>
            <textarea
              name="environmentalImpact"
              value={quotation.environmentalImpact}
              onChange={handleInputChange}
              placeholder="Describe the environmental impact"
              required
            />
          </div>
          <div className="form-group required">
            <label>Verification Process</label>
            <textarea
              name="verification"
              value={quotation.verification}
              onChange={handleInputChange}
              placeholder="Describe the verification process"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/admin/quotations")}
          >
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuotation;
