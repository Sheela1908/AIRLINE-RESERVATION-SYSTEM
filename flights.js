import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'; 

const Flights = () => {
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [flights, setFlights] = useState([]); // Store the fetched flights
  const [filteredFlights, setFilteredFlights] = useState([]); // Store flights filtered by source and destination
  const navigate = useNavigate(); 

  const sources = ["New York", "Los Angeles", "Chicago", "Houston"];
  const destinations = ["Miami", "San Francisco", "Seattle", "Las Vegas"];

  // Fetch flight data from backend on component mount
  useEffect(() => {
    fetch("http://localhost:4000/api/flights") // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error("Error fetching flights:", error));
  }, []);

  // Filter flights whenever source or destination changes
  useEffect(() => {
    if (selectedSource && selectedDestination) {
      const filtered = flights.filter(
        (flight) => flight.source === selectedSource && flight.destination === selectedDestination
      );
      setFilteredFlights(filtered);
    } else {
      setFilteredFlights([]); // Reset if no source or destination is selected
    }
  }, [selectedSource, selectedDestination, flights]);

  const handleNavigation = () => {
    if (selectedSource && selectedDestination) {
      navigate('/bookings');
    } else {
      alert("Please select both a source and a destination.");
    }
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#ffffff", // White background for the form container
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto"
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333"
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    width: "100%",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "100%"
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3"
  };

  const flightsListStyle = {
    marginTop: "30px",
    backgroundColor: "#f4f4f4", // Light grey background for the flights list
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  };

  const pageContainerStyle = {
    backgroundColor: "#e6f2ff", // Light blue background for the entire page
    minHeight: "100vh",
    padding: "50px 0"
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333"
  };

  return (
    <div className="container" style={pageContainerStyle}>
      <h2 style={headingStyle}>Flight Booking</h2>
      <div style={formContainerStyle}>
        <label htmlFor="source" style={labelStyle}>Source:</label>
        <select
          id="source"
          name="source"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)} 
          style={selectStyle}
        >
          <option value="">Select Source</option>
          {sources.map((source, index) => (
            <option key={index} value={source}>{source}</option>
          ))}
        </select>

        <label htmlFor="destination" style={labelStyle}>Destination:</label>
        <select
          id="destination"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)} 
          style={selectStyle}
        >
          <option value="">Select Destination</option>
          {destinations.map((destination, index) => (
            <option key={index} value={destination}>{destination}</option>
          ))}
        </select>

        <button
          onClick={handleNavigation}
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
<a href="/bookingform">Proceed to Bookings</a>
</button>
      </div>

      {/* Display available flights */}
      <div className="flights-list" style={flightsListStyle}>
        <h3>Available Flights</h3>
        {filteredFlights.length > 0 ? (
          <ul>
            {filteredFlights.map((flight, index) => (
              <li key={index}>
                {flight.airline} - {flight.source} to {flight.destination} - Duration: {flight.duration} - ${flight.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights available for the selected route.</p>
        )}
      </div>
    </div>
  );
};

export default Flights;
