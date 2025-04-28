import React from "react";
import { Link } from "react-router-dom";

const Users = () => {
  // Styles
  const containerStyle = {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "lightblue",
    minHeight: "100vh",
    color: "black",
  };

  const headerStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
  };

  const paragraphStyle = {
    fontSize: "18px",
    marginBottom: "40px",
  };

  const navContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  };

  const linkStyle = {
    padding: "10px 20px",
    margin: "10px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, background-color 0.3s",
  };

  const linkHoverStyle = {
    backgroundColor: "#4d4dff",
    transform: "scale(1.05)",
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, linkHoverStyle);
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#333";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Users Dashboard</h1>
      <p style={paragraphStyle}>
        Welcome to the users page. Manage different sections of the application below.
      </p>

      <div style={navContainerStyle}>
        <Link
          to="/login"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Login
        </Link>
        <Link
          to="/usersData"
          style={linkStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          User Data
        </Link>
      </div>
    </div>
  );
};

export default Users;
