import React from "react";

const Reports = () => {
    const handleGenerateReport = () => {
        alert("Generating report...");
        // Add report generation logic here
    };

    // Styles
    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "lightblue", // Light background color
        padding: "20px",
        textAlign: "center"
    };

    const headingStyle = {
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#333", // Darker text color
        fontWeight: "bold"
    };

    const paragraphStyle = {
        fontSize: "1.2rem",
        marginBottom: "30px",
        color: "#555" // Slightly lighter text color
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4CAF50", // Green background
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "background-color 0.3s ease" // Smooth transition for hover effect
    };

    const buttonHoverStyle = {
        backgroundColor: "#45a049" // Darker green for hover
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Generate Reports</h1>
            <p style={paragraphStyle}>Click the button below to generate a report:</p>
            <button 
                style={buttonStyle} 
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={handleGenerateReport}
            >
                Generate Report
            </button>
        </div>
    );
};

export default Reports;
