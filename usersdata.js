import React, { useEffect, useState } from "react";
import backgroundImage from './assets/images/userdata.webp'; 

const UsersData = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/usersdata");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await res.json();
        console.log("Fetched users data:", json);
        setUsersData(json);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setError("Error fetching users data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const userCardStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    padding: "20px",
    margin: "20px auto",
    width: "80%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    color: "#fff",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  };

  const loadingStyle = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "50px",
    color: "#fff",
  };

  const errorStyle = {
    textAlign: "center",
    fontSize: "20px",
    color: "red",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Users Data</h2>
      
      {error && <p style={errorStyle}>{error}</p>}
      
      {isLoading ? (
        <p style={loadingStyle}>Loading users data...</p>
      ) : (
        usersData.length > 0 ? (
          usersData.map((user) => (
            <div key={user.id} style={userCardStyle}>
              <h3>{user.name}</h3>
              <p>
                <strong>UserName:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ))
        ) : (
          <p style={loadingStyle}>No users found.</p> // Handle empty data case
        )
      )}
    </div>
  );
};

export default UsersData;
