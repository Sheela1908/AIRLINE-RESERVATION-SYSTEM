import React, { useState } from "react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    flightId: "",
    message: ""
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Clear previous messages on input change
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage("Support request sent successfully.");
        setErrorMessage("");
        setFormData({
          name: "",
          email: "",
          flightId: "",
          message: ""
        });
      } else {
        setErrorMessage("Failed to send support request. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      setSuccessMessage("");
      console.error("Error submitting support request:", error);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "630px",
    width:"1500px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: "url('https://imgs.search.brave.com/vu-zAFlWqpcvV7uLRMgOsrpvbSfa617gpm2HQx4MDwI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE0/Njg1NDE0Mi9waG90/by9zdXBwb3J0LWJ1/dHRvbi1vbi1jb21w/dXRlci1rZXlib2Fy/ZC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9STRweTJoT215/U2VzczI5c2FPbVlw/amxOeVJtX2QtNXpP/c29GNFh0QlViMD0')" // Add your image path here
  };

  const formStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center",
    position: "relative",
    zIndex: 1
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    marginTop: "10px"
  };

  const messageStyle = {
    marginTop: "20px",
    color: successMessage ? "green" : "red"
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2>Support</h2>
        {successMessage && <p style={messageStyle}>{successMessage}</p>}
        {errorMessage && <p style={messageStyle}>{errorMessage}</p>}
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
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
            id="flightID"
            value={formData.flightId}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            className="my_input"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={inputStyle}
          ></textarea>
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Support;
