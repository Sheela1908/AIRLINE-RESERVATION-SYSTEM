const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  flightId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
