import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectType } = location.state || { projectType: "Unknown" };

  const [investorType, setInvestorType] = useState("Individual");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderOrderDetails = () => {
    switch (projectType) {
      case "Renewable Energy Projects":
        return (
          <>
            <label>
              Preferred Energy Type:
              <select name="energyType" onChange={handleInputChange}>
                <option value="Solar">Solar</option>
                <option value="Wind">Wind</option>
                <option value="Hydro">Hydro</option>
                <option value="Geothermal">Geothermal</option>
              </select>
            </label>
            <label>
              Project Scale (kW):
              <input
                type="number"
                name="projectScale"
                placeholder="e.g., 500"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location for Installation:
              <input
                type="text"
                name="installationLocation"
                placeholder="e.g., City or Region"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Estimated Annual Energy Output (kWh):
              <input
                type="number"
                name="annualEnergyOutput"
                placeholder="e.g., 100000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Maintenance Plan Required? (Yes/No):
              <input
                type="text"
                name="maintenancePlan"
                placeholder="Yes or No"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Expected Completion Date:
              <input
                type="date"
                name="completionDate"
                onChange={handleInputChange}
              />
            </label>
          </>
        );
      case "Tree Planting and Reforestation":
        return (
          <>
            <label>
              Number of Trees to Plant:
              <input
                type="number"
                name="treeCount"
                placeholder="e.g., 1000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location of Plantation:
              <input
                type="text"
                name="plantationLocation"
                placeholder="e.g., Amazon Rainforest"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Tree Species to Plant:
              <input
                type="text"
                name="treeSpecies"
                placeholder="e.g., Oak, Mahogany"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Expected Growth Duration (Years):
              <input
                type="number"
                name="growthDuration"
                placeholder="e.g., 10"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Budget for Plantation (USD):
              <input
                type="number"
                name="plantationBudget"
                placeholder="e.g., 5000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Monitoring Plan Required? (Yes/No):
              <input
                type="text"
                name="monitoringPlan"
                placeholder="Yes or No"
                onChange={handleInputChange}
              />
            </label>
          </>
        );
      case "Energy Efficiency Projects":
        return (
          <>
            <label>
              Type of Building/Appliance:
              <select name="buildingType" onChange={handleInputChange}>
                <option value="Office">Office</option>
                <option value="Factory">Factory</option>
                <option value="Home">Home</option>
                <option value="Retail">Retail</option>
              </select>
            </label>
            <label>
              Current Energy Usage (kWh/month):
              <input
                type="number"
                name="currentUsage"
                placeholder="e.g., 2000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Desired Energy Efficiency Level (%):
              <input
                type="number"
                name="efficiencyLevel"
                placeholder="e.g., 30"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Budget for Improvements (USD):
              <input
                type="number"
                name="improvementBudget"
                placeholder="e.g., 10000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Upgrade Timeline (Months):
              <input
                type="number"
                name="timeline"
                placeholder="e.g., 6"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Preferred Technologies (if any):
              <select name="preferredTechnologies" onChange={handleInputChange}>
                <option value="LED">LED</option>
                <option value="Smart Systems">Smart Systems</option>
                <option value="Solar Panels">Solar Panels</option>
                <option value="HVAC">HVAC</option>
                <option value="Efficient Windows">Efficient Windows</option>
                <option value="Energy Monitoring Systems">
                  Energy Monitoring Systems
                </option>
              </select>
            </label>
          </>
        );
      case "Improved Cookstoves Projects":
        return (
          <>
            <label>
              Number of Cookstoves Required:
              <input
                type="number"
                name="cookstovesCount"
                placeholder="e.g., 500"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Preferred Cookstove Type:
              <select name="cookstoveType" onChange={handleInputChange}>
                <option value="Biomass">Biomass</option>
                <option value="Solar">Solar</option>
                <option value="Gasification">Gasification</option>
                <option value="Ethanol">Ethanol</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
            <label>
              Target Region for Distribution:
              <input
                type="text"
                name="targetRegion"
                placeholder="e.g., Rural Villages"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Training Program Required? (Yes/No):
              <input
                type="text"
                name="trainingRequired"
                placeholder="Yes or No"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Estimated Usage Hours per Day:
              <input
                type="number"
                name="usageHours"
                placeholder="e.g., 5"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Maintenance Plan Required? (Yes/No):
              <input
                type="text"
                name="maintenancePlan"
                placeholder="Yes or No"
                onChange={handleInputChange}
              />
            </label>
          </>
        );
      case "Composting and Organic Waste Management":
        return (
          <>
            <label>
              Daily Waste Volume (kg):
              <input
                type="number"
                name="dailyWasteVolume"
                placeholder="e.g., 200"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Composting Location:
              <input
                type="text"
                name="compostLocation"
                placeholder="e.g., Local Farm"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Type of Organic Waste:
              <select name="wasteType" onChange={handleInputChange}>
                <option value="Food">Food</option>
                <option value="Garden">Garden</option>
                <option value="Agricultural">Agricultural</option>
                <option value="Manure">Manure</option>
                <option value="Industrial">Industrial</option>
                <option value="Mixed Organic">Mixed Organic</option>
              </select>
            </label>
            <label>
              Composting Method:
              <select name="compostMethod" onChange={handleInputChange}>
                <option value="Windrow">Windrow</option>
                <option value="Vermicomposting">Vermicomposting</option>
                <option value="Aerated Static Pile">Aerated Static Pile</option>
                <option value="In-vessel">In-vessel</option>
              </select>
            </label>
            <label>
              Expected Output Volume (kg):
              <input
                type="number"
                name="outputVolume"
                placeholder="e.g., 150"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Budget for Composting Setup (USD):
              <input
                type="number"
                name="compostBudget"
                placeholder="e.g., 3000"
                onChange={handleInputChange}
              />
            </label>
          </>
        );
      case "Waste-to-Energy Projects":
        return (
          <>
            <label>
              Daily Waste Volume (tons):
              <input
                type="number"
                name="wasteVolume"
                placeholder="e.g., 10"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Energy Type to Generate:
              <select name="energyType" onChange={handleInputChange}>
                <option value="Biogas">Biogas</option>
                <option value="Electricity">Electricity</option>
                <option value="Heat">Heat</option>
                <option value="Ethanol">Ethanol</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="Methanol">Methanol</option>
              </select>
            </label>
            <label>
              Conversion Technology:
              <select name="conversionTech" onChange={handleInputChange}>
                <option value="Incineration">Incineration</option>
                <option value="Anaerobic Digestion">Anaerobic Digestion</option>
                <option value="Gasification">Gasification</option>
                <option value="Pyrolysis">Pyrolysis</option>
                <option value="Fermentation">Fermentation</option>
                <option value="Plasma Arc">Plasma Arc</option>
              </select>
            </label>
            <label>
              Location of Facility:
              <input
                type="text"
                name="facilityLocation"
                placeholder="e.g., City Name"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Expected Energy Output (kWh):
              <input
                type="number"
                name="energyOutput"
                placeholder="e.g., 5000"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Budget for Setup (USD):
              <input
                type="number"
                name="setupBudget"
                placeholder="e.g., 20000"
                onChange={handleInputChange}
              />
            </label>
          </>
        );
      default:
        return <p>No specific order details required for this project type.</p>;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        projectType,
        investorType,
        ...formData,
      };

      await api.post("/orders", orderData);
      toast.success("Order submitted successfully!");
      navigate("/profile"); // or wherever you want to redirect after success
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.response?.data?.message || "Error submitting order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Order Form</h1>
      <p style={styles.subtitle}>Project Type: {projectType}</p>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label>
          Investor Type:
          <select
            name="investorType"
            value={investorType}
            onChange={(e) => setInvestorType(e.target.value)}
          >
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
          </select>
        </label>

        {investorType === "Individual" ? (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone"
                placeholder="Your Phone Number"
                onChange={handleInputChange}
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Company Name:
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Company Email:
              <input
                type="email"
                name="companyEmail"
                placeholder="Company Email"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Company Address:
              <input
                type="text"
                name="companyAddress"
                placeholder="Company Address"
                onChange={handleInputChange}
              />
            </label>
            <label>
              Company Phone:
              <input
                type="text"
                name="companyPhone"
                placeholder="Company Phone"
                onChange={handleInputChange}
              />
            </label>
          </>
        )}

        <h3 style={styles.sectionTitle}>Order Details</h3>
        {renderOrderDetails()}

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "16px",
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "16px",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "18px",
    margin: "16px 0 8px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "4px",
  },
  button: {
    marginTop: "16px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default OrderForm;
