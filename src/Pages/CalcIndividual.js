import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Assest/css/CalcIndividual.css';

function CalcIndividual() {
  const [selectedOption, setSelectedOption] = useState('Backyard Garden');
  const [amount, setAmount] = useState(0);
  const [carbonOffset, setCarbonOffset] = useState(0);
  const [usdCost, setUsdCost] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const options = [
    {
      label: 'Backyard Garden (10 square feet)',
      carbonOffset: 0.05,
    },
    {
      label: 'Rooftop Farm (500 square feet)',
      carbonOffset: 0.30,
    },
    {
      label: 'Community Garden (1,000 square feet)',
      carbonOffset: 1.00,
    },
    {
      label: 'Hydroponic System (Home setup)',
      carbonOffset: 0.02,
    },
    {
      label: 'Vertical Farming (20 racks)',
      carbonOffset: 1.50,
    },
  ];

  const handleOptionChange = (event) => {
    const selectedOption = options.find((option) => option.label === event.target.value);
    setSelectedOption(selectedOption.label);
    setCarbonOffset(selectedOption.carbonOffset);
    setAmount(0);
    setUsdCost(0);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setUsdCost(event.target.value * carbonOffset * 100);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="header">
      <div className="logo">
          <h1 className='green'>Green</h1>
          <h1 className='credit'>Credit</h1>
        </div>
        <div className="buttons">
          <button className="button active">Individual</button>
          <button className="button" onClick={() => navigate('/CalcOrganization')}>Companies</button>
        </div>
      </header>

      {/* Calculator Section */}
      <div className="carbon-credit-calculator">
        <h2>Calculate Your Carbon Credits with Urban Farming</h2>
        <div className="option-container">
          <label>
            <select value={selectedOption} onChange={handleOptionChange}>
              {options.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="input-container">
          <label>
            Amount (Number of Units):{' '}
            <input type="number" value={amount} onChange={handleAmountChange} />
          </label>
        </div>
        <div className="result-container">
          <div className="result-item">
            <p>CO2 Offset:</p>
            <p>{(carbonOffset * amount).toFixed(2)} tons</p>
          </div>
          <div className="result-item">
            <p>USD Cost:</p>
            <p>${usdCost.toFixed(2)}</p>
          </div>
        </div>
        <div className='carbon-credit-button'>
          pay
        </div>
      </div>
    </div>
  );
}

export default CalcIndividual;
