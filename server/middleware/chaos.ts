import { Request, Response, NextFunction } from "express";
import logger from "../logger";

// Chandrayaan Chaos Middleware
// Introduces synthetic latency and failures to verify system resilience.
// Activated only when CHAOS_MODE=true

export function chaosMiddleware(req: Request, res: Response, next: NextFunction) {
    if (process.env.CHAOS_MODE !== 'true') {
        return next();
    }

    // 1. Latency Injection (P=0.20, Delay=100ms-3000ms)
    // 20% of requests are slow
    if (Math.random() < 0.20) {
        const delay = Math.floor(Math.random() * 2900) + 100;
        logger.warn(`[CHAOS] Injecting ${delay}ms latency for ${req.path}`);
        setTimeout(() => {
            applyFaults(req, res, next);
        }, delay);
    } else {
        applyFaults(req, res, next);
    }
}

function applyFaults(req: Request, res: Response, next: NextFunction) {
    const rand = Math.random();

    // 2. Connection Drop (P=0.01)
    if (rand < 0.01) {
        logger.warn(`[CHAOS] Dropping connection for ${req.path}`);
        return res.destroy(); // Abruptly close socket
    }

    // 3. Service Unavailable (P=0.01)
    if (rand < 0.02) { // 0.01 to 0.02 coverage
        logger.warn(`[CHAOS] Returning 503 for ${req.path}`);
        return res.status(503).json({ message: "Service Temporarily Unavailable (Chaos)" });
    }

    next();
}
