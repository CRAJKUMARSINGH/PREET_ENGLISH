import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { registerRoutes } from "./routes";
import rateLimit from "express-rate-limit";
import logger from "./lib/logger";
import { globalErrorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { HealthMonitor, performanceMonitor } from "./middleware/monitoring.js";
import { chaosMiddleware } from "./middleware/chaos";
import { db } from "./db.js";
import { selectOne } from "./lib/db-helpers";

const app = express();
const httpServer = createServer(app);


// Chaos Middleware (First, to affect everything)
app.use(chaosMiddleware);

// Initialize health monitoring
const healthMonitor = new HealthMonitor();

// Add health checks
healthMonitor.addCheck('database', async () => {
  try {
    const { users } = await import('../shared/schema.js');
    await selectOne<any>(db.select().from(users).limit(1));
    return true;

  } catch {
    return false;
  }
});

healthMonitor.addCheck('memory', async () => {
  const usage = process.memoryUsage();
  const maxMemory = 1024 * 1024 * 1024; // 1GB
  return usage.heapUsed < maxMemory;
});

// Basic middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Performance monitoring
app.use(performanceMonitor);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

import helmet from "helmet";

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" || process.env.TEST_LOAD_PATTERN || process.env.STRESS_TEST ? 50000 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.polyfill.io"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'", "https://api.openai.com", "wss://*.replit.dev"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for Vite compatibility
}));

// Apply rate limiter to all API routes except in specific stress test modes
if (process.env.NODE_ENV !== "test" && !process.env.STRESS_TEST && !process.env.TEST_LOAD_PATTERN) {
  app.use("/api/", limiter);
  logger.info("Rate limiting enabled for /api/ routes");
} else {
  logger.warn("Rate limiting DISABLED for stress testing/simulation mode");
}


// Setup Authentication
setupAuth(app);

// API Health Check (Enhanced)
app.get("/api/health", async (req, res) => {
  const healthResults = await healthMonitor.runAllChecks();
  const isHealthy = Object.values(healthResults).every(result => result.status);

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development",
    version: "2.1.0",
    checks: healthResults,
    memory: process.memoryUsage(),
    cpu: process.cpuUsage()
  });
});

// Register API Routes and Setup Vite
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

    // Error handlers (must be last)
    app.use(notFoundHandler);
    app.use(globalErrorHandler);

  } catch (error) {
    logger.error("Failed to setup server:", error);
    process.exit(1);
  }
})();

// Clean exports
export { app, httpServer };
export default app;


// Global error handlers
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

  httpServer.listen(port, host, () => {
    logger.info(`PREET_ENGLISH server running on ${host}:${port}`);
    logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
