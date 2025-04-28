const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose');

// Importing data and models
const homeData = require('./home');
const flights = require('./flights');
const users = require('./usersdata');
const Booking = require('./bookings');

const Support = require('./support.js')

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/airlineReservation_db', {
    
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from this origin
app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Airline Reservation System API");
});

// Get home page data
app.get("/api/home", (req, res) => {
  res.json(homeData);
});

// Get users data
app.get("/api/usersdata", (req, res) => {
  res.json(users);
});

// Get all flights
app.get("/api/flights", (req, res) => {
  res.json(flights);
});

// Get all bookings from MongoDB 
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().select('userId flightId status classType name source destination email');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { userId, flightId, classType, name, source, destination, email } = req.body;

    // Validate required fields
    if (!userId || !flightId || !classType || !name || !source || !destination || !email) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Set a default status for the booking
    const status = 'confirmed'; // Default status

    // Create new booking
    const newBooking = await Booking.create({
      userId,
      flightId,
      classType,
      name,
      source,
      destination,
      email,
      status 
    });

    // Log the new booking details
    console.log("New Booking Created:", newBooking); 
    // Send success response back to the client
    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});
app.post('/api/support', async (req, res) => {
  const { name, email, flightId, message } = req.body;  // Use flightId

  // Basic validation
  if (!name || !email || !message || !flightId) {  // Check flightId
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const support = await Support.create({ name, email, flightId, message });
    console.log('New Support Request Created:', support);

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Support request received. We will get back to you shortly.",
      support
    });
  } catch (error) {
    console.error('Error creating support request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


app.get('/api/support', async (req, res) => {
  try {
    const allSupports = await Support.find()
    console.log(allSupports)
    res.status(200).json({supports: allSupports})
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

// Handle 404 errors for unknown routes
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Resource Not Found"
  });
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
