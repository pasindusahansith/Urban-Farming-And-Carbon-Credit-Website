import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  headerBar: {
    backgroundColor: "#006400",
    padding: 15,
    marginBottom: 20,
    borderRadius: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#E8F5E9",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  quotationMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  metaBlock: {
    backgroundColor: "#F1F8E9",
    padding: 10,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 5,
  },
  metaTitle: {
    color: "#006400",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 12,
    color: "#2E7D32",
  },
  section: {
    margin: 10,
    padding: 15,
    backgroundColor: "#FAFFF9",
    borderRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#006400",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#006400",
    borderBottomWidth: 1,
    borderBottomColor: "#A5D6A7",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    paddingVertical: 3,
  },
  label: {
    width: 150,
    fontSize: 10,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  value: {
    flex: 1,
    fontSize: 10,
    color: "#1B5E20",
  },
  highlightBox: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
  },
  infoBlock: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  status: {
    marginTop: 15,
    padding: 10,
    borderRadius: 4,
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
    color: "#E65100",
  },
  statusAccepted: {
    backgroundColor: "#E8F5E9",
    color: "#1B5E20",
  },
  statusRejected: {
    backgroundColor: "#FFEBEE",
    color: "#B71C1C",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
  footerContent: {
    borderTopWidth: 2,
    borderTopColor: "#006400",
    paddingTop: 10,
  },
  footerText: {
    color: "#2E7D32",
    fontSize: 8,
    textAlign: "center",
    marginBottom: 3,
  },
  footerHighlight: {
    color: "#006400",
    fontWeight: "bold",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: "#2E7D32",
  },
});

// Create Document Component
const QuotationPDF = ({ quotation }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>GREEN CREDIT</Text>
        <Text style={styles.headerSubtitle}>Carbon Credit Quotation</Text>
      </View>

      <View style={styles.quotationMeta}>
        <View style={styles.metaBlock}>
          <Text style={styles.metaTitle}>QUOTATION DATE</Text>
          <Text style={styles.metaValue}>
            {new Date(quotation.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaTitle}>QUOTATION ID</Text>
          <Text style={styles.metaValue}>#{quotation._id?.slice(-6)}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaTitle}>PROJECT TYPE</Text>
          <Text style={styles.metaValue}>{quotation.order.projectType}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Carbon Credits Details</Text>
        <View style={styles.highlightBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Carbon Credits:</Text>
            <Text style={styles.value}>{quotation.carbonCredits} tons</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price per Credit:</Text>
            <Text style={styles.value}>${quotation.pricePerCredit}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Cost:</Text>
            <Text style={[styles.value, { fontWeight: "bold" }]}>
              ${quotation.totalCost}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Implementation</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.value}>{quotation.projectDuration} months</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Implementation Costs:</Text>
          <Text style={styles.value}>${quotation.implementationCosts}</Text>
        </View>
        {quotation.discounts > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>Applied Discount:</Text>
            <Text style={styles.value}>{quotation.discounts}%</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terms & Environmental Impact</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Payment Terms:</Text>
          <Text style={styles.value}>{quotation.paymentTerms}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Environmental Impact:</Text>
          <Text style={styles.value}>{quotation.environmentalImpact}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Verification Process:</Text>
          <Text style={styles.value}>{quotation.verification}</Text>
        </View>
      </View>

      <View
        style={[
          styles.status,
          quotation.status === "pending" && styles.statusPending,
          quotation.status === "accepted" && styles.statusAccepted,
          quotation.status === "rejected" && styles.statusRejected,
        ]}
      >
        <Text style={styles.label}>
          Status: {quotation.status.toUpperCase()}
        </Text>
        {quotation.status !== "pending" && (
          <Text style={styles.value}>
            Response Date: {new Date(quotation.updatedAt).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>
            This quotation is valid for 30 days from the date of issue.
          </Text>
          <Text style={styles.footerText}>
            <Text style={styles.footerHighlight}>GREEN CREDIT</Text> -
            Transforming Environmental Responsibility into Value
          </Text>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} GREEN CREDIT. All rights reserved.
          </Text>
        </View>
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

export default QuotationPDF;
