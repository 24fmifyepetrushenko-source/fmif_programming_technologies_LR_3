import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

// This pool keeps a small group of ready database connections.
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "tasksdb",
  max: Number(process.env.DB_POOL_MAX) || 10,
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 30000,
});

pool.on("error", (error) => {
  console.error("Unexpected database error", error);
});

export default pool;
