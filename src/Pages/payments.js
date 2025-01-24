import React, { useState } from "react";
import { FaCreditCard, FaUser, FaCalendarAlt, FaLock } from "react-icons/fa";
import "../assets/css/payments.css";

const Payments = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    vatNumber: "",
    poNumber: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    saveDetails: false,
    enableRecurring: false,
    balanceThreshold: "",
    rechargeAmount: "",
  });

  const formatExpiryDate = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "expiryDate" ? formatExpiryDate(value) : value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <nav>
          <strong>Confirm your order</strong>
        </nav>
      </header>
      <main className="payment-main">
        <section className="payment-form-section">
          <h2>Checkout Details</h2>
          <form className="payment-form" onSubmit={handlePayment}>
            <div className="form-group">
              <label>VAT Number (Optional)</label>
              <input
                type="text"
                name="vatNumber"
                placeholder="12345679"
                value={paymentDetails.vatNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>PO Number (Optional)</label>
              <input
                type="text"
                name="poNumber"
                placeholder="12345678"
                value={paymentDetails.poNumber}
                onChange={handleInputChange}
              />
            </div>
            <h3>Payment Method</h3>
            <div className="form-group">
              <label htmlFor="cardNumber">
                <FaCreditCard /> Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolder">
                <FaUser /> Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                placeholder="John Doe"
                value={paymentDetails.cardHolder}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">
                  <FaCalendarAlt /> Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvv">
                  <FaLock /> CVV
                </label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  maxLength="3"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="saveDetails"
                  checked={paymentDetails.saveDetails}
                  onChange={handleInputChange}
                />
                Save my payment details for future purchases
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  name="enableRecurring"
                  checked={paymentDetails.enableRecurring}
                  onChange={handleInputChange}
                />
                Enable recurring payments
              </label>
            </div>
            {paymentDetails.enableRecurring && (
              <>
                <div className="form-group">
                  <label>When my balance is below:</label>
                  <input
                    type="number"
                    name="balanceThreshold"
                    placeholder="e.g., 10.00"
                    value={paymentDetails.balanceThreshold}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Automatically recharge:</label>
                  <input
                    type="number"
                    name="rechargeAmount"
                    placeholder="e.g., 50.00"
                    value={paymentDetails.rechargeAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <button type="submit" className="payment-button">
              Confirm Your Order
            </button>
          </form>
        </section>
        <aside className="order-summary">
          <h3>Order Summary</h3>
          <p>Balance amount: $100.00</p>
          <p>VAT (21%): $21.00</p>
          <p>Total: <strong>$121.00</strong></p>
        </aside>
      </main>
    </div>
  );
};

export default Payments;
