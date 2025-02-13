import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectToDb = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is missing in .env file");
    }

    const res = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectToDb;
