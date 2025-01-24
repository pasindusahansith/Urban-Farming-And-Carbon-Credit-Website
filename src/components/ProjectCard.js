// src/components/ProjectCard.js
import React from "react";

const ProjectCard = ({ image, name, description, onOrder }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.description}>{description}</p>
      <button style={styles.button} onClick={onOrder}>
        Order
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "16px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  name: {
    fontSize: "1.2rem",
    margin: "8px 0",
  },
  description: {
    fontSize: "0.9rem",
    color: "#555",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ProjectCard;
