import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { studentRouter } from "./routes/student.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || "";

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", server: "Blue Archive Daily Guess API" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
  });
