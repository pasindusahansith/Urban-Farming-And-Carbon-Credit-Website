import React from 'react';
import { useNavigate } from 'react-router-dom'; 


function CarbonCreditPage() {
    const navigate = useNavigate(); 
    navigate("/CalcIndividual");  

    return (
        <div>
            <style>
                {`
                .carbon-credit-page {
                    font-family: Arial, sans-serif;
                    background-color: #90c07c;
                    color: #333;
                    padding: 20px;
                }

                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .header h1 {
                    font-size: 40px;
                    margin: 0;
                }

                .header p {
                    font-size: 40px;
                    color: #fff;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .info-container-upper,
                .info-container-lower {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    margin-bottom: 40px;
                    align-items: center;
                }

                .info-card {
                    background-color: #6f8d61;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    padding: 25px;
                    width: 25%;
                    min-width: 280px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .info-card h2 {
                    font-size: 26px;
                    color: #fff;
                    margin-bottom: 15px;
                }

                .info-card p {
                    font-size: 18px;
                    color: #fff;
                    line-height: 1.6;
                    margin-bottom: 15px;
                }

                .info-card ul {
                    list-style: disc;
                    padding-left: 20px;
                    text-align: right; /* Align the text to the right */
                    margin: 0;
                }

                .info-card ul li {
                    font-size: 16px;
                    color: #fff;
                    margin-bottom: 10px;
                    line-height: 1.6;
                    text-align: left; 
                }

                .info-container-upper {
                    margin-bottom: 40px;
                }

                .info-card button {
                    background-color: transparent;
                    color: #4CAF50;
                    font-size: 18px;
                    padding: 12px 24px;
                    border: 2px solid #4CAF50;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin-top: 30px;
                    align-self: center;
                    width: 400px;
                }

                .info-card button:hover {
                    background-color: #4CAF50;
                    color: white;
                }

                @media (max-width: 768px) {
                    .info-card {
                        width: 40%;
                    }
                }

                @media (max-width: 480px) {
                    .info-card {
                        width: 80%;
                    }
                }

                .button-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                    width: 100%;
                }

                .button-container button {
                    width: 100%; 
                    max-width: 250px; 
                }
                `}
            </style>

            <div className="carbon-credit-page">
                <header className="header">
                    <h1>
                        Green<span style={{ color: '#4CAF50' }}>Credit</span>
                    </h1>
                    <p>Instructions...</p>
                </header>
                <div className="info-container-upper">
                    <div className="info-card">
                        <h2>Why Urban Farming?</h2>
                        <p>
                            Urban farming is an impactful solution to fight climate change. By cultivating plants in urban areas,
                            individuals and organizations can offset their carbon footprints and contribute to environmental
                            sustainability.
                        </p>
                        <ul>
                            <li>Reduce carbon emissions through local farming</li>
                            <li>Support sustainable food production</li>
                            <li>Earn carbon credits for your contributions to the environment</li>
                        </ul>
                    </div>
                    <div className="info-card">
                        <h2>What Are Carbon Credit?</h2>
                        <p>
                            Think of carbon credits as "pollution passes." For each credit, a company gets permission to emit one ton
                            of carbon dioxide. However, they can earn extra credits by reducing pollution and selling those to other
                            companies.
                        </p>
                    </div>
                    <div className="info-card">
                        <h2>Why Should You Care?</h2>
                        <p>
                            By buying and trading carbon credits, companies are encouraged to go green and cut emissions. It's a step
                            toward a cleaner world, supporting renewable energy and eco-friendly projects that help tackle climate
                            change!
                        </p>
                    </div>
                </div>
                <div className="info-container-lower">
                    <div className="info-card">
                        <h2>How Carbon Credits Work?</h2>
                        <p>
                            A carbon credit represents a permit to emit a certain amount of CO₂ or other greenhouse gases. For every ton of carbon reduced through urban farming, 
                            you can earn credits that help balance out emissions, 
                            which can be traded or sold to others looking to reduce their carbon footprint.
                        </p>
                    </div>
                    <div className="info-card">
                        <h2>Benefits of Earning Carbon Credits</h2>
                        <ul>
                            <li>Reduce Your Carbon Footprint: Help neutralize the impact of your daily activities.</li>
                            <li>Earn Money or Save on Taxes: Carbon credits can be traded or used as tax offsets.</li>
                            <li>Support a Greener Community: Your efforts help create a healthier, more sustainable urban environment.</li>
                        </ul>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={() => navigate('/CalcIndividual')}>
                        Go to Carbon Credit Calculator
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CarbonCreditPage;
