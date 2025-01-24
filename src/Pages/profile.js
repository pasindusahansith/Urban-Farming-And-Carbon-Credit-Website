import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import "../assets/css/profile.css";
import defaultProfilePic from "../assets/default_profile_pic.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QuotationPDF from "../components/QuotationPDF";
import { FaDownload } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [quotations, setQuotations] = useState([]);
  const [quotationLoading, setQuotationLoading] = useState(false);
  const [quotationError, setQuotationError] = useState(null);
  const [profileData, setProfileData] = useState({
    profilePic: defaultProfilePic,
    name: "",
    email: "",
    phone: "",
    address: "",
    socialMedia: {
      linkedIn: "",
      twitter: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState(profileData);
  const [profilePicPreview, setProfilePicPreview] = useState(defaultProfilePic);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch quotations when quotations tab is active
  useEffect(() => {
    if (activeTab === "quotations") {
      fetchQuotations();
    }
  }, [activeTab]);

  const fetchQuotations = async () => {
    setQuotationLoading(true);
    setQuotationError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        setQuotationLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/quotations/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setQuotations(response.data);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      setQuotationError(
        error.response?.data?.message || "Failed to load quotations"
      );
      toast.error(error.response?.data?.message || "Failed to load quotations");
    } finally {
      setQuotationLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      const userData = response.data;

      setProfileData({
        profilePic: userData.profilePicture || defaultProfilePic,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        socialMedia: {
          linkedIn: userData.socialMedia?.linkedIn || "",
          twitter: userData.socialMedia?.twitter || "",
        },
      });
      setProfilePicPreview(userData.profilePicture || defaultProfilePic);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewData(profileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      socialMedia: { ...prevData.socialMedia, [name]: value },
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicPreview(reader.result);
      setNewData((prevData) => ({ ...prevData, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      await api.put("/users/profile", {
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        address: newData.address,
        profilePicture: newData.profilePic,
        socialMedia: newData.socialMedia,
      });

      setProfileData(newData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleDeactivate = async () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      try {
        await api.post("/users/deactivate");
        toast.info("Your account has been deactivated.");
        navigate("/login");
      } catch (error) {
        console.error("Error deactivating account:", error);
        toast.error("Failed to deactivate account");
      }
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleQuotationAction = async (quotationId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/quotations/${quotationId}`,
        { status: action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Quotation ${action} successfully`);
      fetchQuotations(); // Refresh quotations
    } catch (error) {
      console.error(`Error ${action}ing quotation:`, error);
      toast.error(
        error.response?.data?.message || `Failed to ${action} quotation`
      );
    }
  };

  const renderQuotations = () => {
    if (quotationLoading) {
      return <div className="loading">Loading quotations...</div>;
    }

    if (quotationError) {
      return <div className="error">{quotationError}</div>;
    }

    if (!quotations.length) {
      return <div className="no-quotations">No quotations found.</div>;
    }

    return (
      <div className="quotations-list">
        {quotations.map((quotation) => (
          <div key={quotation._id} className="quotation-card">
            <div className="quotation-header">
              <div className="header-main">
                <h3>Project: {quotation.order.projectType}</h3>
                <span className={`status ${quotation.status}`}>
                  {quotation.status.toUpperCase()}
                </span>
              </div>
              <div className="quotation-id">
                Quotation ID: #{quotation._id.slice(-8)}
              </div>
            </div>

            <div className="quotation-details">
              <div className="detail-section">
                <h4>Carbon Credit Details</h4>
                <div className="detail-row">
                  <span>Carbon Credits:</span>
                  <span>{quotation.carbonCredits} tons</span>
                </div>
                <div className="detail-row">
                  <span>Price per Credit:</span>
                  <span>${quotation.pricePerCredit}</span>
                </div>
                <div className="detail-row">
                  <span>Total Cost:</span>
                  <span>${quotation.totalCost}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Project Information</h4>
                <div className="detail-row">
                  <span>Duration:</span>
                  <span>{quotation.projectDuration} months</span>
                </div>
                <div className="detail-row">
                  <span>Implementation Costs:</span>
                  <span>${quotation.implementationCosts}</span>
                </div>
                {quotation.discounts && (
                  <div className="detail-row">
                    <span>Discounts Applied:</span>
                    <span>${quotation.discounts}</span>
                  </div>
                )}
              </div>

              {quotation.environmentalImpact && (
                <div className="detail-section">
                  <h4>Environmental Impact</h4>
                  <p className="impact-text">{quotation.environmentalImpact}</p>
                </div>
              )}

              {quotation.verification && (
                <div className="detail-section">
                  <h4>Verification Details</h4>
                  <p className="verification-text">{quotation.verification}</p>
                </div>
              )}

              {quotation.paymentTerms && (
                <div className="detail-section">
                  <h4>Payment Terms</h4>
                  <p className="terms-text">{quotation.paymentTerms}</p>
                </div>
              )}
            </div>

            <div className="quotation-footer">
              <div className="date-info">
                <span>
                  Created: {new Date(quotation.createdAt).toLocaleDateString()}
                </span>
                {quotation.status !== "pending" && (
                  <span>
                    {quotation.status} on:{" "}
                    {new Date(quotation.updatedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="actions">
                {quotation.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleQuotationAction(quotation._id, "accepted")
                      }
                      className="accept-btn"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleQuotationAction(quotation._id, "rejected")
                      }
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </>
                )}
                <PDFDownloadLink
                  document={<QuotationPDF quotation={quotation} />}
                  fileName={`quotation-${quotation._id}.pdf`}
                  className="download-btn"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      "Generating PDF..."
                    ) : (
                      <>
                        <FaDownload /> Download PDF
                      </>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!isProfileVisible) return null;
  if (loading) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <AiOutlineClose
          className="close-icon"
          size={24}
          onClick={handleClose}
        />

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab-btn ${activeTab === "quotations" ? "active" : ""}`}
            onClick={() => setActiveTab("quotations")}
          >
            Quotations
          </button>
        </div>

        {activeTab === "profile" ? (
          <>
            <div className="profile-pic-section">
              <img
                src={profilePicPreview}
                alt="Profile"
                className="profile-pic"
              />
              {isEditing && (
                <>
                  <label htmlFor="profilePicUpload" className="upload-label">
                    Upload New Picture
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>
            <div className="profile-details">
              {isEditing ? (
                <div className="form-group-container">
                  <div className="form-left">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-right">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={newData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={newData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="linkedIn">LinkedIn</label>
                      <input
                        type="url"
                        id="linkedIn"
                        name="linkedIn"
                        value={newData.socialMedia.linkedIn}
                        onChange={handleSocialMediaChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="twitter">Twitter</label>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={newData.socialMedia.twitter}
                        onChange={handleSocialMediaChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2>{profileData.name}</h2>
                  <p>{profileData.email}</p>
                  <p>{profileData.phone}</p>
                  <p>{profileData.address}</p>
                  {profileData.socialMedia.linkedIn && (
                    <p>
                      LinkedIn:{" "}
                      <a
                        href={profileData.socialMedia.linkedIn}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profileData.socialMedia.linkedIn}
                      </a>
                    </p>
                  )}
                  {profileData.socialMedia.twitter && (
                    <p>
                      Twitter:{" "}
                      <a
                        href={profileData.socialMedia.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {profileData.socialMedia.twitter}
                      </a>
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="profile-actions">
              {isEditing ? (
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
              ) : (
                <button onClick={handleEditToggle} className="edit-btn">
                  Edit Profile
                </button>
              )}
              <button onClick={handleDeactivate} className="deactivate-btn">
                Deactivate Account
              </button>
            </div>
          </>
        ) : (
          renderQuotations()
        )}
      </div>
    </div>
  );
};

export default Profile;
