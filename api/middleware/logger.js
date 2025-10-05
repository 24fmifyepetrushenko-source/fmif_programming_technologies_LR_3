import loggerClient from "../utils/loggerClient.js";

const METHODS_TO_LOG = new Set(["GET", "POST"]);

const requestLogger = (req, res, next) => {
  if (!METHODS_TO_LOG.has(req.method)) {
    return next();
  }

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const level = status >= 500 ? "error" : "info";

    let message = `${req.method} ${req.originalUrl} - ${status} (${duration}ms)`;

    if (req.method === "POST") {
      const title =
          typeof req.body?.title === "string" ? req.body.title.trim() : "";

      if (title) {
        message += ` - title: "${title}"`;
      }
    }

    loggerClient.log({ level, message }).catch((error) => {
      console.error("Unexpected error while logging request", error);
    });
  });

  next();
};

export default requestLogger;