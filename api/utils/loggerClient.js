const DEFAULT_LOGGER_PORT = process.env.LOGGER_PORT || 4000;
const LOGGER_URL =
  process.env.LOGGER_URL || `http://logger:${DEFAULT_LOGGER_PORT}/log`;
const SERVICE_NAME = process.env.SERVICE_NAME || "api";
const REQUEST_TIMEOUT = Number(process.env.LOGGER_TIMEOUT || 2000);

// This helper sends a request to the logger service with a safety timeout.
const safeFetch = async (payload) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(LOGGER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        `Logger service responded with status ${response.status}: ${body}`,
      );
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Logger service request timed out");
    } else {
      console.error("Logger service request failed", error.message);
    }
  } finally {
    clearTimeout(timeout);
  }
};

// This client prepares the log data before sending it away.
const loggerClient = {
  async log({ message, level = "info", service = SERVICE_NAME }) {
    if (!message) {
      return;
    }

    const payload = {
      service,
      level,
      message,
    };

    await safeFetch(payload);
  },
};

export default loggerClient;
