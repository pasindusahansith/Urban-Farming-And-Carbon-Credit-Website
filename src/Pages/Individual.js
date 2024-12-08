import React, { useState } from "react";
import "../Assest/css/IndividualSignUp.css";
import IndividualSignUp from "../components/IndividualSignUp";
import IndividualSignUpNext from "../components/IndividualSignUpNext";

const Individual = () => {
  const [currentStep, setCurrentStep] = useState(1); // Tracks current step
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      zip: "",
      district: "",
    },
    contact: "",
    farmSize: "",
    farmType: "",
    experienceLevel: "",
    unit: "acres",
  });

  // Handles form data changes for both steps
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [field]: value,
      },
    }));
  };

  // Step navigation handlers
  const handleNext = () => setCurrentStep(2);
  const handleBack = () => setCurrentStep(1);

  return (
    <div className="signup-form-container">
      <div className="signup-form-card-individual">
        {currentStep === 1 && (
          <IndividualSignUp
            data={formData}
            onChange={handleChange}
            onAddressChange={handleAddressChange}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <IndividualSignUpNext
            data={formData}
            onChange={handleChange}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Individual;
