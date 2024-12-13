import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Assest/css/IndividualSignUp.css";
import GovenmentSignUp from '../components/GovenmentSignUp';
import GovenmentSignUpNext from '../components/GovenmentSignUpNext';

const Govenment = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
      <h1>test</h1>
      <div className="signup-form-card-individual">
        {currentStep === 1 && (
          <GovenmentSignUp
            data={formData}
            onChange={handleChange}
            onAddressChange={handleAddressChange}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <GovenmentSignUpNext
            data={formData}
            onChange={handleChange}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default Govenment;
