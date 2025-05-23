const mongoose = require('mongoose'); 
const supportSchema = new mongoose.Schema({
  flightId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: { 
    type: String,
    required: true,
  }
});

const Support = mongoose.model('Support', supportSchema); 
module.exports = Support; 
