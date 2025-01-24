import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.response?.data?.message || "Failed to load users");
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    if (
      !window.confirm(
        "Are you sure you want to deactivate this user's account?"
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/users/deactivate/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User account deactivated successfully");
      // Update the user's status in the state
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: "inactive" } : user
        )
      );
    } catch (error) {
      console.error("Error deactivating user:", error);
      toast.error(
        error.response?.data?.message || "Failed to deactivate user account"
      );
    }
  };

  if (loading) return <div className={styles.loading}>Loading users...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.usersContainer}>
      <h2 className={styles.heading}>Carbon Credit Clients</h2>
      <div className={styles.tableContainer}>
        <table className={styles.usersTable}>
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={`${styles.status} ${styles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.role !== "admin" && user.status === "active" && (
                    <button
                      className={styles.deactivateButton}
                      onClick={() => handleDeactivate(user._id)}
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
