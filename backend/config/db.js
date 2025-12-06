import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
