require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const testUser = {
  username: "admin",
  email: "admin@procedureflow.com",
  password: "admin123",
  role: "admin",
  department: "Administration",
};

async function insertTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if user exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log("Test user already exists");
      process.exit(0);
    }

    // Create user
    const user = await User.create(testUser);
    console.log("Test user created:", user);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

insertTestUser();

