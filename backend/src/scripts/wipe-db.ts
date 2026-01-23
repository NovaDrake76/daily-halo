import mongoose from "mongoose";
import dotenv from "dotenv";
import StudentModel from "../models/student.model";

dotenv.config();

const wipeDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    console.log("⚠️  WARNING: Deleting ALL students...");
    const result = await StudentModel.deleteMany({});

    console.log(`🗑️  Deleted ${result.deletedCount} students.`);
  } catch (error) {
    console.error("Fatal Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

wipeDB();
