import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // Define username
  const [password, setPassword] = useState(""); // Define password

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    // Show success alert
    alert("Logged in successfully!");
    
    // Optionally, you can reset the form fields
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", backgroundColor: "red" }}>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "0 auto", textAlign: "left" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Username:
            <input
              type="text"
              value={username}
               class="my-input"
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Password:
            <input
              type="password"
               class="my-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              required
            />
          </label>
        </div>
        <button type="submit"  class="my-input" style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none" }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <Link to="/users" style={{ color: "blue" }}>
          Back to Users Page
        </Link>
      </div>
    </div>
  );
};

export default Login;
