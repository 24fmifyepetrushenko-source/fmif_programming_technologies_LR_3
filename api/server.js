import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/database.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err); // keep console output simple for debugging
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
