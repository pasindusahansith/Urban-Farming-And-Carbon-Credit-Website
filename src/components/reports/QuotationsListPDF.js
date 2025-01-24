import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  header: {
    marginBottom: 8,
    borderBottom: 1,
    borderBottomColor: "#006400",
    paddingBottom: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 6,
    color: "#546E7A",
    marginBottom: 1,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 6,
    borderRadius: 2,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    minHeight: 16,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#F5F5F5",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 6,
    padding: 3,
    textAlign: "left",
  },
  tableCellHeader: {
    fontSize: 6,
    padding: 3,
    textAlign: "left",
    color: "#006400",
  },
  clientCell: {
    flex: 2,
  },
  projectCell: {
    flex: 2,
  },
  creditsCell: {
    flex: 1.5,
  },
  priceCell: {
    flex: 1.5,
  },
  totalCell: {
    flex: 1.5,
  },
  durationCell: {
    flex: 1.5,
  },
  statusCell: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 6,
    fontSize: 6,
    color: "#757575",
  },
  summarySection: {
    marginTop: 8,
    marginBottom: 8,
    padding: 6,
    backgroundColor: "#F8F9FA",
    borderRadius: 2,
    borderLeftWidth: 2,
    borderLeftColor: "#006400",
  },
  summaryTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#006400",
    marginBottom: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  summaryText: {
    fontSize: 6,
    color: "#424242",
  },
  summaryHighlight: {
    fontSize: 6,
    color: "#006400",
    fontWeight: "bold",
  },
  financialSummary: {
    marginTop: 6,
    borderTopWidth: 0,
  },
  status: {
    padding: 1,
    borderRadius: 1,
    fontSize: 6,
  },
  statusPending: {
    color: "#ED6C02",
    backgroundColor: "#FFF3E0",
  },
  statusAccepted: {
    color: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  statusRejected: {
    color: "#C62828",
    backgroundColor: "#FFEBEE",
  },
  detailsSection: {
    marginTop: 6,
    fontSize: 6,
    color: "#616161",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailsLabel: {
    width: 80,
    fontSize: 7,
    color: "#000",
  },
  detailsValue: {
    fontSize: 7,
    flex: 1,
    color: "#000",
  },
  pageNumber: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 6,
    color: "#9E9E9E",
  },
});

const QuotationsListPDF = ({ quotations }) => {
  const pendingQuotations = quotations.filter(
    (q) => q.status === "pending"
  ).length;
  const acceptedQuotations = quotations.filter(
    (q) => q.status === "accepted"
  ).length;
  const rejectedQuotations = quotations.filter(
    (q) => q.status === "rejected"
  ).length;

  const totalCarbonCredits = quotations.reduce(
    (sum, q) => sum + (q.carbonCredits || 0),
    0
  );
  const totalValue = quotations.reduce((sum, q) => sum + (q.totalCost || 0), 0);
  const averagePrice =
    quotations.length > 0 ? totalValue / quotations.length : 0;
  const averageDuration =
    quotations.length > 0
      ? quotations.reduce(
          (sum, q) => sum + (parseInt(q.projectDuration) || 0),
          0
        ) / quotations.length
      : 0;

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return styles.statusPending;
      case "accepted":
        return styles.statusAccepted;
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
          <Text style={styles.title}>GREEN CREDIT - Quotations Report</Text>
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
            <Text style={styles.summaryText}>
              Total Quotations:{" "}
              <Text style={styles.summaryHighlight}>{quotations.length}</Text>
            </Text>
            <Text style={styles.summaryText}>
              Accepted:{" "}
              <Text style={styles.summaryHighlight}>{acceptedQuotations}</Text>
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              Pending:{" "}
              <Text style={styles.summaryHighlight}>{pendingQuotations}</Text>
            </Text>
            <Text style={styles.summaryText}>
              Rejected:{" "}
              <Text style={styles.summaryHighlight}>{rejectedQuotations}</Text>
            </Text>
          </View>

          <View style={styles.financialSummary}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Total Carbon Credits:</Text>
              <Text style={styles.detailsValue}>
                {totalCarbonCredits.toLocaleString()} tons
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Total Value:</Text>
              <Text style={styles.detailsValue}>
                $
                {totalValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Average Quote Value:</Text>
              <Text style={styles.detailsValue}>
                $
                {averagePrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Average Duration:</Text>
              <Text style={styles.detailsValue}>
                {averageDuration.toFixed(1)} months
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
            <Text style={[styles.tableCellHeader, styles.creditsCell]}>
              Carbon Credits
            </Text>
            <Text style={[styles.tableCellHeader, styles.priceCell]}>
              Price/Credit
            </Text>
            <Text style={[styles.tableCellHeader, styles.totalCell]}>
              Total Value
            </Text>
            <Text style={[styles.tableCellHeader, styles.durationCell]}>
              Timeline
            </Text>
            <Text style={[styles.tableCellHeader, styles.statusCell]}>
              Status
            </Text>
          </View>

          {quotations.map((quotation, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? { backgroundColor: "#FAFAFA" } : {},
              ]}
            >
              <View style={[styles.tableCell, styles.clientCell]}>
                <Text style={{ fontWeight: "bold" }}>
                  {quotation.user?.name || "N/A"}
                </Text>
                <Text style={{ fontSize: 6, color: "#757575" }}>
                  {quotation.user?.email || "N/A"}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.projectCell]}>
                <Text>{quotation.order?.projectType || "N/A"}</Text>
                <Text style={{ fontSize: 6, color: "#757575" }}>
                  ID: {quotation.order?._id?.slice(-6) || "N/A"}
                </Text>
              </View>
              <Text style={[styles.tableCell, styles.creditsCell]}>
                {quotation.carbonCredits
                  ? `${quotation.carbonCredits.toLocaleString()} tons`
                  : "N/A"}
              </Text>
              <Text style={[styles.tableCell, styles.priceCell]}>
                $
                {quotation.pricePerCredit?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }) || "N/A"}
              </Text>
              <Text style={[styles.tableCell, styles.totalCell]}>
                $
                {quotation.totalCost?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                }) || "N/A"}
              </Text>
              <View style={[styles.tableCell, styles.durationCell]}>
                <Text>
                  {quotation.projectDuration
                    ? `${quotation.projectDuration} months`
                    : "N/A"}
                </Text>
                <Text style={{ fontSize: 6, color: "#757575" }}>
                  {quotation.createdAt
                    ? new Date(quotation.createdAt).toLocaleDateString()
                    : "N/A"}
                </Text>
              </View>
              <Text
                style={[
                  styles.tableCell,
                  styles.statusCell,
                  styles.status,
                  getStatusStyle(quotation.status),
                ]}
              >
                {quotation.status.toUpperCase()}
              </Text>
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

export default QuotationsListPDF;
