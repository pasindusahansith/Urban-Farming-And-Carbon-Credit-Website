import React, { useState, useEffect } from "react";
import styles from "./client.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setClients(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch clients. Please make sure you're logged in as admin."
      );
      setLoading(false);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const handleActivate = async (userId, e) => {
    // Prevent row click event
    e.stopPropagation();

    if (
      !window.confirm("Are you sure you want to activate this user's account?")
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/users/activate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      // Update the client's status in the state using the returned user data
      setClients(
        clients.map((client) =>
          client._id === userId
            ? { ...client, status: "Active", isActive: true }
            : client
        )
      );

      // Update selected client if it's the activated one
      if (selectedClient && selectedClient._id === userId) {
        setSelectedClient((prev) => ({
          ...prev,
          status: "Active",
          isActive: true,
        }));
      }
    } catch (error) {
      console.error("Error activating user:", error);
      toast.error(
        error.response?.data?.message || "Failed to activate user account"
      );
    }
  };

  const handleDeactivate = async (userId, e) => {
    // Prevent row click event
    e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to deactivate this user's account?"
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/users/deactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      // Update the client's status in the state using the returned user data
      setClients(
        clients.map((client) =>
          client._id === userId
            ? { ...client, status: "Inactive", isActive: false }
            : client
        )
      );

      // Update selected client if it's the deactivated one
      if (selectedClient && selectedClient._id === userId) {
        setSelectedClient((prev) => ({
          ...prev,
          status: "Inactive",
          isActive: false,
        }));
      }
    } catch (error) {
      console.error("Error deactivating user:", error);
      toast.error(
        error.response?.data?.message || "Failed to deactivate user account"
      );
    }
  };

  const handleDelete = async (userId, e) => {
    // Prevent row click event
    e.stopPropagation();

    if (
      !window.confirm(
        "Are you sure you want to delete this user's account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("User account deleted successfully");

      // Remove the client from the state
      setClients(clients.filter((client) => client._id !== userId));

      // Clear selected client if it's the deleted one
      if (selectedClient && selectedClient._id === userId) {
        setSelectedClient(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete user account"
      );
    }
  };

  if (loading) return <div className={styles.loading}>Loading clients...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles["carbon-credits-clients"]}>
      <h2>Carbon Credit Clients</h2>
      <table className={styles["clients-table"]}>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client._id}
              onClick={() => handleClientClick(client)}
              className={styles.clickableRow}
            >
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.role}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    styles[client.status?.toLowerCase()]
                  }`}
                >
                  {client.status}
                </span>
              </td>
              <td>
                {client.role !== "admin" && (
                  <div className={styles.actionButtons}>
                    {client.status === "Inactive" ? (
                      <button
                        className={styles.activateButton}
                        onClick={(e) => handleActivate(client._id, e)}
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        className={styles.deactivateButton}
                        onClick={(e) => handleDeactivate(client._id, e)}
                      >
                        Deactivate
                      </button>
                    )}
                    <button
                      className={styles.deleteButton}
                      onClick={(e) => handleDelete(client._id, e)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedClient && (
        <div className={styles["client-details"]}>
          <h3>Client Details</h3>
          <div className={styles["client-info"]}>
            {selectedClient.profilePicture && (
              <img
                src={selectedClient.profilePicture}
                alt={selectedClient.name}
                className={styles["client-picture"]}
              />
            )}
            <div>
              <p>
                <strong>Name:</strong> {selectedClient.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedClient.email}
              </p>
              {selectedClient.phone && (
                <p>
                  <strong>Phone:</strong> {selectedClient.phone}
                </p>
              )}
              {selectedClient.address && (
                <p>
                  <strong>Address:</strong> {selectedClient.address}
                </p>
              )}
              {selectedClient.socialMedia && (
                <>
                  {selectedClient.socialMedia.linkedIn && (
                    <p>
                      <strong>LinkedIn:</strong>{" "}
                      <a
                        href={selectedClient.socialMedia.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profile
                      </a>
                    </p>
                  )}
                  {selectedClient.socialMedia.twitter && (
                    <p>
                      <strong>Twitter:</strong>{" "}
                      <a
                        href={selectedClient.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profile
                      </a>
                    </p>
                  )}
                </>
              )}
              <p>
                <strong>Role:</strong> {selectedClient.role}
              </p>
              <p>
                <strong>Status:</strong> {selectedClient.status || "Active"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Client;
