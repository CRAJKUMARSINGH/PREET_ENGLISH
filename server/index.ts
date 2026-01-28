import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { registerRoutes } from "./routes";
import rateLimit from "express-rate-limit";
import logger from "./logger";
import { globalErrorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { HealthMonitor, performanceMonitor } from "./middleware/monitoring.js";
import { db } from "./db.js";

const app = express();
const httpServer = createServer(app);

// Initialize health monitoring
const healthMonitor = new HealthMonitor();

// Add health checks
healthMonitor.addCheck('database', async () => {
  try {
    const { users } = await import('../shared/schema.js');
    await db.select().from(users).limit(1);
    return true;
  } catch {
    return false;
  }
});

healthMonitor.addCheck('memory', async () => {
  const usage = process.memoryUsage();
  const maxMemory = 512 * 1024 * 1024; // 512MB
  return usage.heapUsed < maxMemory;
});

// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

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

// Error handlers (must be last)
app.use(notFoundHandler);
app.use(globalErrorHandler);

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
