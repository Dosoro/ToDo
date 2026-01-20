import mongoose from "mongoose";
import env from "./env.js";

// ========================================
// MONGODB CONNECTION
// ========================================
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
