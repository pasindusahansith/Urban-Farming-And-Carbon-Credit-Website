import React, { useState } from "react";
import "../assets/css/history.css";

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: "ORD12345",
      date: "2025-01-03",
      companyName: "Eco Green Inc.",
      companyType: "Private",
      companySector: "Energy",
      carbonCredits: 500,
      projectType: "Reforestation",
      carbonFootprint: 1200,
      sustainabilityGoals: "Achieve net-zero emissions by 2030.",
      budget: 10000,
      message: "Please prioritize projects in tropical regions.",
      total: 10000,
      status: "Delivered",
    },
    {
      id: "ORD12346",
      date: "2025-01-02",
      companyName: "GreenFuture NGO",
      companyType: "NGO",
      companySector: "Non-Profit",
      carbonCredits: 300,
      projectType: "Renewable Energy",
      carbonFootprint: 800,
      sustainabilityGoals: "Promote solar energy in underserved areas.",
      budget: 6000,
      message: "We are open to project suggestions.",
      total: 6000,
      status: "In Transit",
    },
    {
      id: "ORD12347",
      date: "2025-01-01",
      companyName: "Global Industries",
      companyType: "Private",
      companySector: "Manufacturing",
      carbonCredits: 1000,
      projectType: "Carbon Capture",
      carbonFootprint: 5000,
      sustainabilityGoals: "Reduce industrial emissions by 40% by 2028.",
      budget: 20000,
      message: "Looking for innovative carbon capture technologies.",
      total: 20000,
      status: "Cancelled",
    },
    {
      id: "ORD12348",
      date: "2025-01-04",
      companyName: "Sustainable Growth Ltd.",
      companyType: "Private",
      companySector: "Agriculture",
      carbonCredits: 750,
      projectType: "Afforestation",
      carbonFootprint: 3200,
      sustainabilityGoals: "Offset farming emissions through tree planting.",
      budget: 15000,
      message: "Prefer projects in temperate regions.",
      total: 15000,
      status: "Delivered",
    },
    {
      id: "ORD12349",
      date: "2025-01-05",
      companyName: "Urban Renewables Co.",
      companyType: "Private",
      companySector: "Urban Development",
      carbonCredits: 200,
      projectType: "Renewable Energy",
      carbonFootprint: 1000,
      sustainabilityGoals: "Transition urban projects to renewable sources.",
      budget: 5000,
      message: "Focus on wind energy projects.",
      total: 5000,
      status: "In Transit",
    },
    {
      id: "ORD12350",
      date: "2025-01-06",
      companyName: "CleanTech Solutions",
      companyType: "Private",
      companySector: "Technology",
      carbonCredits: 400,
      projectType: "Carbon Capture",
      carbonFootprint: 2200,
      sustainabilityGoals: "Innovate sustainable tech solutions.",
      budget: 12000,
      message: "Looking for collaborative opportunities.",
      total: 12000,
      status: "Delivered",
    },
    {
      id: "ORD12351",
      date: "2025-01-07",
      companyName: "Blue Planet NGO",
      companyType: "NGO",
      companySector: "Environmental Conservation",
      carbonCredits: 100,
      projectType: "Reforestation",
      carbonFootprint: 500,
      sustainabilityGoals: "Preserve biodiversity and offset emissions.",
      budget: 2000,
      message: "Prioritize coastal forest projects.",
      total: 2000,
      status: "Delivered",
    },
  ]);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="order-history-container">
      <h1 className="order-history-title">Carbon Credit Order History</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order ID: {order.id}</h3>
                <p>Date: {order.date}</p>
                <p>
                  Status:{" "}
                  <span className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
              </div>
              <button
                className="order-details-btn"
                onClick={() => toggleDetails(order.id)}
              >
                {expandedOrderId === order.id ? "Hide Details" : "Show Details"}
              </button>
            </div>

            {expandedOrderId === order.id && (
              <div className="order-details">
                <p>
                  <strong>Company Name:</strong> {order.companyName}
                </p>
                <p>
                  <strong>Company Type:</strong> {order.companyType}
                </p>
                <p>
                  <strong>Company Sector:</strong> {order.companySector}
                </p>
                <p>
                  <strong>Desired Carbon Credits:</strong> {order.carbonCredits}{" "}
                  tons
                </p>
                <p>
                  <strong>Preferred Project Type:</strong> {order.projectType}
                </p>
                <p>
                  <strong>Carbon Footprint:</strong> {order.carbonFootprint}{" "}
                  tons/year
                </p>
                <p>
                  <strong>Sustainability Goals:</strong>{" "}
                  {order.sustainabilityGoals}
                </p>
                <p>
                  <strong>Budget:</strong> ${order.budget}
                </p>
                <p>
                  <strong>Message:</strong> {order.message}
                </p>
                <p>
                  <strong>Total Cost:</strong> ${order.total}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
