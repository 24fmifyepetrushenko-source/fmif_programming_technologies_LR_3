import dotenv from "dotenv";

dotenv.config();

const LOGGER_URL = process.env.LOGGER_URL || "http://logger:4000/log";

const log = async (event, data) => {
  try {
    await fetch(LOGGER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Logger service error:", error.message);
    }
  }
};

export default { log };
