import winston from "winston";
// Define a robust logger configuration
// Additional transports (like Sentry) can be added here if needed in the future
// using sensitive configuration from environment variables.
var logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    defaultMeta: { service: "preet-english" },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    ],
});
// Create a log file in production
if (process.env.NODE_ENV === "production") {
    logger.add(new winston.transports.File({ filename: "error.log", level: "error" }));
    logger.add(new winston.transports.File({ filename: "combined.log" }));
}
export default logger;
