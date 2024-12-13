import React from "react";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import "../Assest/css/IndividualSignUpNext.css";

const IndividualSignUpNext = ({ data, onChange, onBack }) => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/Userprofile"); 
  };

  return (
    <div className="signup-form-card">
      <h1>SIGN-UP</h1>
      <form>
        <div className="form-group">
          <label>Farm Size</label>
          <input
            type="number"
            placeholder="Enter Farm Size"
            value={data.farmSize}
            onChange={(e) => onChange("farmSize", e.target.value)}
          />
          <div className="unit-selector">
            <label>{data.unit === "acres" ? "Acres" : "Meters"}</label>
            <Switch
              checked={data.unit === "meters"}
              onChange={(e) =>
                onChange("unit", e.target.checked ? "meters" : "acres")
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Farm Type</label>
          <select
            value={data.farmType}
            onChange={(e) => onChange("farmType", e.target.value)}
          >
            <option value="">Select Farm Type</option>
            <option value="organic">Organic</option>
            <option value="conventional">Conventional</option>
          </select>
        </div>

        <div className="form-group">
          <label>Experience Level</label>
          <div className="experience-level-options">
            <label>
              <input
                type="radio"
                value="beginner"
                checked={data.experienceLevel === "beginner"}
                onChange={(e) => onChange("experienceLevel", e.target.value)}
              />
              Beginner
            </label>
            <label>
              <input
                type="radio"
                value="intermediate"
                checked={data.experienceLevel === "intermediate"}
                onChange={(e) => onChange("experienceLevel", e.target.value)}
              />
              Intermediate
            </label>
            <label>
              <input
                type="radio"
                value="expert"
                checked={data.experienceLevel === "expert"}
                onChange={(e) => onChange("experienceLevel", e.target.value)}
              />
              Expert
            </label>
          </div>
        </div>

        <button type="button" onClick={onBack}>
          BACK
        </button>
        <button type="button" onClick={handleRegister}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default IndividualSignUpNext;
