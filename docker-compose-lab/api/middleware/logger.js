import loggerClient from "../utils/loggerClient.js";

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const payload = {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration,
    };

    loggerClient.log("api_request", payload).catch((error) => {
      console.error("Failed to log request", error.message);
    });
  });

  next();
};

export default requestLogger;
