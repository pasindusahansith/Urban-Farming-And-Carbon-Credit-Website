import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    marginBottom: 15,
    borderBottom: 2,
    borderBottomColor: "#006400",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 10,
    color: "#546E7A",
    marginBottom: 3,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 10,
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    minHeight: 25,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 8,
    padding: 5,
    textAlign: "left",
  },
  tableCellHeader: {
    fontSize: 9,
    padding: 5,
    textAlign: "left",
    color: "#006400",
  },
  clientCell: {
    flex: 2,
  },
  projectCell: {
    flex: 2,
  },
  investorCell: {
    flex: 1.5,
  },
  emailCell: {
    flex: 2,
  },
  phoneCell: {
    flex: 1.5,
  },
  statusCell: {
    flex: 1,
  },
  dateCell: {
    flex: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 10,
    fontSize: 8,
    color: "#757575",
  },
  summarySection: {
    marginTop: 15,
    marginBottom: 15,
    padding: 12,
    backgroundColor: "#F8F9FA",
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: "#006400",
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 9,
    color: "#424242",
  },
  summaryHighlight: {
    fontSize: 9,
    color: "#006400",
    fontWeight: "bold",
  },
  status: {
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
  },
  statusPending: {
    color: "#ED6C02",
    backgroundColor: "#FFF3E0",
  },
  statusApproved: {
    color: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  statusRejected: {
    color: "#C62828",
    backgroundColor: "#FFEBEE",
  },
  detailsSection: {
    marginTop: 10,
    fontSize: 8,
    color: "#616161",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  detailsLabel: {
    width: 100,
    fontWeight: "bold",
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 8,
    color: "#9E9E9E",
  },
});

const OrdersListPDF = ({ orders }) => {
  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const approvedOrders = orders.filter(
    (order) => order.status === "approved"
  ).length;
  const rejectedOrders = orders.filter(
    (order) => order.status === "rejected"
  ).length;

  // Calculate statistics
  const individualOrders = orders.filter(
    (order) => order.investorType === "Individual"
  ).length;
  const companyOrders = orders.filter(
    (order) => order.investorType === "Company"
  ).length;
  const averageResponseTime =
    orders.reduce((sum, order) => {
      if (order.updatedAt && order.createdAt) {
        return sum + (new Date(order.updatedAt) - new Date(order.createdAt));
      }
      return sum;
    }, 0) / (orders.length || 1);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return styles.statusPending;
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      default:
        return {};
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>GREEN CREDIT - Orders Report</Text>
          <Text style={styles.subtitle}>
            Generated on: {new Date().toLocaleString()}
          </Text>
          <Text style={styles.subtitle}>
            Report Period: {new Date().toLocaleDateString()} - Current
          </Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Executive Summary</Text>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryText}>
                Total Orders:{" "}
                <Text style={styles.summaryHighlight}>{orders.length}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Pending:{" "}
                <Text style={styles.summaryHighlight}>{pendingOrders}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.summaryText}>
                Approved:{" "}
                <Text style={styles.summaryHighlight}>{approvedOrders}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Rejected:{" "}
                <Text style={styles.summaryHighlight}>{rejectedOrders}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Individual Investors:</Text>
              <Text>
                {individualOrders} (
                {((individualOrders / orders.length) * 100).toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Company Investors:</Text>
              <Text>
                {companyOrders} (
                {((companyOrders / orders.length) * 100).toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Avg. Response Time:</Text>
              <Text>
                {Math.round(averageResponseTime / (1000 * 60 * 60 * 24))} days
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCellHeader, styles.clientCell]}>
              Client Details
            </Text>
            <Text style={[styles.tableCellHeader, styles.projectCell]}>
              Project Info
            </Text>
            <Text style={[styles.tableCellHeader, styles.investorCell]}>
              Investor
            </Text>
            <Text style={[styles.tableCellHeader, styles.emailCell]}>
              Contact
            </Text>
            <Text style={[styles.tableCellHeader, styles.phoneCell]}>
              Phone
            </Text>
            <Text style={[styles.tableCellHeader, styles.statusCell]}>
              Status
            </Text>
            <Text style={[styles.tableCellHeader, styles.dateCell]}>
              Timeline
            </Text>
          </View>

          {orders.map((order, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? { backgroundColor: "#FAFAFA" } : {},
              ]}
            >
              <View style={[styles.tableCell, styles.clientCell]}>
                <Text style={{ fontWeight: "bold" }}>
                  {order.user.name || "N/A"}
                </Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  ID: {order._id?.slice(-6) || "N/A"}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.projectCell]}>
                <Text>{order.projectType || "N/A"}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {order.orderDetails?.description || "No description"}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.investorCell]}>
                <Text>{order.investorType || "N/A"}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {order.companyName || "Individual"}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.emailCell]}>
                <Text>{order.email || "N/A"}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {order.companyEmail || ""}
                </Text>
              </View>
              <Text style={[styles.tableCell, styles.phoneCell]}>
                {order.phone || "N/A"}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.statusCell,
                  styles.status,
                  getStatusStyle(order.status),
                ]}
              >
                {order.status.toUpperCase()}
              </Text>
              <View style={[styles.tableCell, styles.dateCell]}>
                <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {order.updatedAt
                    ? `Updated: ${new Date(
                        order.updatedAt
                      ).toLocaleDateString()}`
                    : ""}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>GREEN CREDIT Admin System - Confidential Report</Text>
          <Text>
            Generated by:{" "}
            {JSON.parse(localStorage.getItem("user"))?.name || "Admin"}
          </Text>
          <Text>
            GREEN CREDIT © {new Date().getFullYear()} | All Rights Reserved
          </Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default OrdersListPDF;
