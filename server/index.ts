import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { registerRoutes } from "./routes";
import rateLimit from "express-rate-limit";
import logger from "./logger";

const app = express();
const httpServer = createServer(app);

// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" || process.env.TEST_LOAD_PATTERN ? 50000 : 100, // Limit each IP to 100 requests per windowMs (50000 for tests)
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Apply rate limiter to all API routes
app.use("/api/", limiter);

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Setup Authentication
setupAuth(app);

// API Health Check (Enhanced)
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
    version: "2.1.0",
  });
});

// Register API Routes
(async () => {
  try {
    await registerRoutes(httpServer, app);
    logger.info("API routes registered successfully");
    
    // Setup Vite for development or static serving for production
    if (process.env.NODE_ENV === "production") {
      const { serveStatic } = await import("./static");
      serveStatic(app);
      logger.info("Static files serving enabled");
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      logger.info("Vite development server enabled");
    }
  } catch (error) {
    logger.error("Failed to register API routes:", error);
  }
})();

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(`Unhandled Error: ${message}`, { status, stack: err.stack });
  res.status(status).json({ message });
});

// Clean exports
export { app, httpServer };
export default app;

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  httpServer.listen(port, host, () => {
    logger.info(`PREET_ENGLISH server running on ${host}:${port}`);
    logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
