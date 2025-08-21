import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";

configDotenv();

const MONGO_URI = process.env.DB_URL;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in your .env file");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
