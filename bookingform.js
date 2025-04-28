import React, { useState } from "react"; 
import backgroundImage from "./assets/images/bookingform.webp"; 

const BookingForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    flightId: "",
    status: "confirmed", // Default status
    source: "",
    destination: "",
    email: "",
    classType: "",  
    name: "", // Added this field to match validation and reset logic
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const countries = [
    "New York",
    "Los Angeles",
    "Miami",
    "Houstan",
    "Chicago"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const requiredFields = ['userId', 'flightId', 'classType', 'name', 'source', 'destination', 'email'];
    const isValid = requiredFields.every(field => formData[field].trim() !== "");

    if (!isValid) {
      setError("All fields are required!");
      return;
    }

    setError(""); // Reset error if validation passes
    console.log("Form Submitted:", formData);
    setLoading(true); // Start loading

    try {
      // Sending form data to the backend
      const response = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        // Set confirmation message on successful booking
        setConfirmationMessage(`Ticket Confirmed! Class Type: ${formData.classType}`);
      } else {
        // Handle errors from the backend
        setError(result.error?.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false); // End loading
    }

    // Reset form fields after submission
    setFormData({
      userId: "",
      flightId: "",
      status: "confirmed", 
      name: "",
      source: "",
      destination: "",
      email: "",
      classType: ""
    });
  };

  // Styles
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  };

  const formStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark transparent background for form
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    width: "400px",
    textAlign: "center"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#f4f4f4"
  };

  const buttonStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold"
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2>Booking Form</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {confirmationMessage && (
          <div style={{ marginBottom: "20px", color: "lightgreen" }}>
            <p>{confirmationMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>User ID:</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Flight ID:</label>
            <input
              type="text"
              name="flightId"
              value={formData.flightId}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Source:</label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Source</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Destination:</label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Destination</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Class Type:</label>
            <select
              name="classType"
              value={formData.classType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Class Type</option>
              <option value="economy">Economy</option>
              <option value="first">First</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Hidden input for status */}
          <input
            type="hidden"
            name="status"
            value={formData.status}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
