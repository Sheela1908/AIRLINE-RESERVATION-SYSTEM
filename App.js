import React, { useEffect, useState } from "react";  
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Flights from "./flights";
import Users from "./users";
import UsersData from "./usersdata"; 
import Login from "./login";
import Bookings from "./bookings";
import BookingForm from "./bookingform"; 
import Settings from "./applicationsetting"; 
import Support from "./support";
import logo from './assets/images/logo.webp';

const Home = () => {
    const [homeData, setHomeData] = useState({ welcomeMessage: "", description: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch("http://localhost:4000/api/home")
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                setHomeData(data || { welcomeMessage: "Welcome", description: "Explore our services" });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching home data:', error);
                setError('Failed to load home data');
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const lowerCaseTerm = searchTerm.toLowerCase();
        switch (lowerCaseTerm) {
            case "flights":
                navigate("/flights");
                break;
            case "users":
                navigate("/users");
                break;
            case "login":
                navigate("/login");
                break;
            case "usersdata": 
                navigate("/usersdata");
                break;
            case "bookings":
                navigate("/bookings");
                break;
            case "bookingform":
                navigate("/bookingform"); 
                break;
            case "applicationsettings":
                navigate("/applicationsettings");
                break;
            case "support":
                navigate("/support");
                break;
            default:
                alert("No matching page found.");
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-container">
            <img src={logo} alt="Logo" className="home-logo" />

            <form onSubmit={handleSearchSubmit} className="home-search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="home-search-input"
                />
            </form>

            <h1 className="home-welcome-message">{homeData.welcomeMessage}</h1>
            <p className="home-description">{homeData.description}</p>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Airline Reservations. All rights reserved.</p>
            <p>Follow us on <a href="https://en.wikipedia.org/wiki/AirAsia" className="footer-link">Social Media</a></p>
        </footer>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <nav className="top-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/flights" className="nav-link">Flights</Link>
                    <Link to="/users" className="nav-link">Users</Link>
                    <Link to="/usersdata" className="nav-link">User Data</Link> 
                    <Link to="/bookings" className="nav-link">Bookings</Link>
                    <Link to="/bookingform" className="nav-link">BookingForm</Link> 
                    <Link to="/applicationsettings" className="nav-link">Application Settings</Link>
                    <Link to="/support" className="nav-link">Support</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/usersdata" element={<UsersData />} /> {/* Corrected to UsersData */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/bookingform" element={<BookingForm />} />  
                    <Route path="/applicationsettings" element={<Settings />} />
                    <Route path="/support" element={<Support />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
