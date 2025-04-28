const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/airline_system_db');
    console.log("Connected to MongoDB Server");
}

module.exports = connectDB