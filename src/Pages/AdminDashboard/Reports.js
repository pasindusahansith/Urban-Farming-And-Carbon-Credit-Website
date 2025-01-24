import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUsers, FaFileInvoiceDollar, FaClipboardList } from "react-icons/fa";
import styles from "./Reports.module.css";
import UsersListPDF from "../../components/reports/UsersListPDF";
import OrdersListPDF from "../../components/reports/OrdersListPDF";
import QuotationsListPDF from "../../components/reports/QuotationsListPDF";

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [usersRes, ordersRes, quotationsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users", { headers }),
        axios.get("http://localhost:5000/api/orders/admin", { headers }),
        axios.get("http://localhost:5000/api/quotations", { headers }),
      ]);

      setUsers(usersRes.data);
      setOrders(ordersRes.data);
      setQuotations(quotationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response?.data?.message || "Failed to fetch data");
      toast.error(error.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading reports...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.reportsPage}>
      <h2>Reports</h2>
      <p>
        Generate and download detailed reports for users, orders, and
        quotations.
      </p>

      <div className={styles.reportsList}>
        <div className={styles.reportCard}>
          <div className={styles.reportIcon}>
            <FaUsers size={40} />
          </div>
          <div className={styles.reportInfo}>
            <h3>Users Report</h3>
            <p>Total Users: {users.length}</p>
            <PDFDownloadLink
              document={<UsersListPDF users={users} />}
              fileName="users-report.pdf"
              className={styles.downloadBtn}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download Users Report"
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.reportIcon}>
            <FaClipboardList size={40} />
          </div>
          <div className={styles.reportInfo}>
            <h3>Orders Report</h3>
            <p>Total Orders: {orders.length}</p>
            <PDFDownloadLink
              document={<OrdersListPDF orders={orders} />}
              fileName="orders-report.pdf"
              className={styles.downloadBtn}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download Orders Report"
              }
            </PDFDownloadLink>
          </div>
        </div>

        <div className={styles.reportCard}>
          <div className={styles.reportIcon}>
            <FaFileInvoiceDollar size={40} />
          </div>
          <div className={styles.reportInfo}>
            <h3>Quotations Report</h3>
            <p>Total Quotations: {quotations.length}</p>
            <PDFDownloadLink
              document={<QuotationsListPDF quotations={quotations} />}
              fileName="quotations-report.pdf"
              className={styles.downloadBtn}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generating PDF..." : "Download Quotations Report"
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
