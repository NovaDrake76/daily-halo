import express from "express";
import cors from "cors";
import { studentRouter } from "./routes/student.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok", server: "Blue Archive Daily Guess API" });
});

app.get("/", (req, res) => {
  res.send("Schale DB Backend is Running");
});

export default app;
