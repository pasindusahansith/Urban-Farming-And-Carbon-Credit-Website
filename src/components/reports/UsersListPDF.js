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
  nameCell: {
    flex: 2,
  },
  emailCell: {
    flex: 2,
  },
  phoneCell: {
    flex: 1.5,
  },
  addressCell: {
    flex: 3,
  },
  roleCell: {
    flex: 1,
  },
  dateCell: {
    flex: 1.5,
  },
  socialCell: {
    flex: 2,
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
  roleTag: {
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
  },
  roleAdmin: {
    color: "#006400",
    backgroundColor: "#E8F5E9",
  },
  roleUser: {
    color: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  statusTag: {
    padding: 3,
    borderRadius: 3,
    fontSize: 8,
  },
  statusActive: {
    color: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  statusInactive: {
    color: "#C62828",
    backgroundColor: "#FFEBEE",
  },
});

const UsersListPDF = ({ users }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;
  const regularUserCount = users.filter((user) => user.role === "user").length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const inactiveUsers = users.filter((user) => !user.isActive).length;
  const verifiedUsers = users.filter((user) => user.isVerified).length;
  const socialMediaUsers = users.filter(
    (user) => user.socialMedia?.linkedIn || user.socialMedia?.twitter
  ).length;

  const getRoleStyle = (role) => {
    return role === "admin" ? styles.roleAdmin : styles.roleUser;
  };

  const getStatusStyle = (isActive) => {
    return isActive ? styles.statusActive : styles.statusInactive;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>GREEN CREDIT - Users Report</Text>
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
                Total Users:{" "}
                <Text style={styles.summaryHighlight}>{users.length}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Admins:{" "}
                <Text style={styles.summaryHighlight}>{adminCount}</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.summaryText}>
                Regular Users:{" "}
                <Text style={styles.summaryHighlight}>{regularUserCount}</Text>
              </Text>
              <Text style={styles.summaryText}>
                Active Users:{" "}
                <Text style={styles.summaryHighlight}>{activeUsers}</Text>
              </Text>
            </View>
          </View>
          <View style={styles.detailsSection}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Verified Users:</Text>
              <Text>
                {verifiedUsers} (
                {((verifiedUsers / users.length) * 100).toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Social Media Connected:</Text>
              <Text>
                {socialMediaUsers} (
                {((socialMediaUsers / users.length) * 100).toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Inactive Users:</Text>
              <Text>
                {inactiveUsers} (
                {((inactiveUsers / users.length) * 100).toFixed(1)}%)
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCellHeader, styles.nameCell]}>
              User Details
            </Text>
            <Text style={[styles.tableCellHeader, styles.emailCell]}>
              Contact Info
            </Text>
            <Text style={[styles.tableCellHeader, styles.phoneCell]}>
              Phone
            </Text>
            <Text style={[styles.tableCellHeader, styles.addressCell]}>
              Address
            </Text>
            <Text style={[styles.tableCellHeader, styles.roleCell]}>Role</Text>
            <Text style={[styles.tableCellHeader, styles.dateCell]}>
              Join Date
            </Text>
            <Text style={[styles.tableCellHeader, styles.socialCell]}>
              Social Media
            </Text>
          </View>

          {users.map((user, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 0 ? { backgroundColor: "#FAFAFA" } : {},
              ]}
            >
              <View style={[styles.tableCell, styles.nameCell]}>
                <Text style={{ fontWeight: "bold" }}>{user.name || "N/A"}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  ID: {user._id?.slice(-6) || "N/A"}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.emailCell]}>
                <Text>{user.email || "N/A"}</Text>
                <Text style={[styles.statusTag, getStatusStyle(user.isActive)]}>
                  {user.isActive ? "ACTIVE" : "INACTIVE"}
                </Text>
              </View>
              <Text style={[styles.tableCell, styles.phoneCell]}>
                {user.phone || "N/A"}
              </Text>
              <View style={[styles.tableCell, styles.addressCell]}>
                <Text>{user.address || "N/A"}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {user.isVerified ? "✓ Verified" : "Not Verified"}
                </Text>
              </View>
              <Text
                style={[
                  styles.tableCell,
                  styles.roleCell,
                  styles.roleTag,
                  getRoleStyle(user.role),
                ]}
              >
                {user.role?.toUpperCase() || "N/A"}
              </Text>
              <View style={[styles.tableCell, styles.dateCell]}>
                <Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
                <Text style={{ fontSize: 7, color: "#757575" }}>
                  {user.updatedAt
                    ? `Updated: ${new Date(
                        user.updatedAt
                      ).toLocaleDateString()}`
                    : ""}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.socialCell]}>
                {user.socialMedia?.linkedIn && (
                  <Text style={{ fontSize: 7, color: "#0077B5" }}>
                    LinkedIn
                  </Text>
                )}
                {user.socialMedia?.twitter && (
                  <Text style={{ fontSize: 7, color: "#1DA1F2" }}>Twitter</Text>
                )}
                {!user.socialMedia?.linkedIn && !user.socialMedia?.twitter && (
                  <Text style={{ fontSize: 7, color: "#757575" }}>
                    No social media
                  </Text>
                )}
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

export default UsersListPDF;
