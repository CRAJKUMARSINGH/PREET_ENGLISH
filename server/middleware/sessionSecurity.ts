import session from 'express-session';
import { Express } from 'express';
import env from '../lib/env-validation';
import '../types/session'; // Extend session types

// Session security configuration for PREET_ENGLISH
export function configureSessionSecurity(app: Express) {
  const isProduction = env.NODE_ENV === 'production';
  
  // Production-ready session configuration
  app.use(
    session({
      // Use validated environment secret
      secret: env.SESSION_SECRET,
      
      // Don't save session if unmodified
      resave: false,
      
      // Don't create session until something stored
      saveUninitialized: false,

      cookie: {
        // HTTPS only in production
        secure: isProduction,
        
        // Prevent XSS attacks
        httpOnly: true,
        
        // Session expires after 24 hours
        maxAge: 24 * 60 * 60 * 1000,
        
        // CSRF protection (strict for better security)
        sameSite: 'strict',
        
        // Domain for subdomain sharing
        domain: process.env.SESSION_COOKIE_DOMAIN,
      },

      // Custom name (don't use default 'connect.sid')
      name: 'preet.sid',
      
      // Reset expiry on activity (rolling session)
      rolling: true,
      
      // Trust proxy in production
      proxy: isProduction,
    })
  );

  // Session rotation on privilege escalation
  app.use((req, res, next) => {
    if (req.session && req.user && !(req.session as any).rotated) {
      req.session.regenerate((err) => {
        if (err) return next(err);
        (req.session as any).rotated = true;
        next();
      });
    } else {
      next();
    }
  });

  // Session validation middleware
  app.use((req, res, next) => {
    if (req.session && req.session.userId) {
      // Check session expiration
      const sessionAge = Date.now() - (req.session.createdAt || 0);
      if (sessionAge > 24 * 60 * 60 * 1000) {
        req.session.destroy((err) => {
          if (err) console.error('Session destruction error:', err);
        });
        return res.status(401).json({ error: 'Session expired' });
      }
    }
    next();
  });
}

import { type Request, type Response, type NextFunction } from 'express';

// Middleware to require authentication
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please log in to access this feature'
    });
  }
  next();
}

// Middleware to require admin privileges
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId || !req.session?.isAdmin) {
    return res.status(403).json({
      error: 'Admin access required',
      message: 'You do not have permission to access this resource'
    });
  }
  next();
}