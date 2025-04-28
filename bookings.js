import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import backgroundImage from './assets/images/bookingbg.jpeg';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/bookings");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching booking data:', error);
        setError('Failed to load booking data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, []);

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    color: "white",
    textAlign: "center",
  };

  if (isLoading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  if (error) {
    return <div style={containerStyle}>{error}</div>; // Display the error
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "black" }}>Bookings</h2>

      {/* Display bookings */}
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "15px", padding: "20px", margin: "10px", width: "80%", maxWidth: "500px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", color: "white" }}>
            <h3>Booking ID: {booking._id}</h3>
            <p><strong>User ID:</strong> {booking.userId}</p>
            <p><strong>Flight ID:</strong> {booking.flightId}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Class Type:</strong> {booking.classType}</p>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Source:</strong> {booking.source}</p>
            <p><strong>Destination:</strong> {booking.destination}</p>
            <p><strong>Email:</strong> {booking.email}</p>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}

      {/* Navigate to booking form */}
      <button onClick={() => navigate("/bookingform")} style={{ marginTop: "20px" }}>
        Go to Booking Form
      </button>
    </div>
  );
};

export default Bookings;
