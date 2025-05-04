// dbconfig.js

require("dotenv").config(); // Loads .env variables
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/KokebiQuizApp";

// Optional: Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add other options as needed
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("MongoDB connected:", MONGO_URI);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
