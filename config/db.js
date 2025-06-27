const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

const connectDB = async () => {
  console.log("Inside connectDB, MONGODB_URL =", url);

  if (!url) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  try {
    console.log("Trying to connect to MongoDB...");
    await mongoose.connect(url);
    console.log("Connected to MongoDB Server");

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB Disconnected');
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
};

module.exports = connectDB;
