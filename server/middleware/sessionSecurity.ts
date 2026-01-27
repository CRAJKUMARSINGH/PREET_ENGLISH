import session from 'express-session';
import { Express } from 'express';
import '../types/session'; // Extend session types

// Session security configuration for PREET_ENGLISH
export function configureSessionSecurity(app: Express) {
  // Production-ready session configuration
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
      resave: false,
      saveUninitialized: false,
      
      cookie: {
        secure: process.env.NODE_ENV === 'production',  // HTTPS only in production
        httpOnly: true,  // Prevent XSS attacks
        maxAge: 24 * 60 * 60 * 1000,  // 24 hours
        sameSite: 'lax',  // CSRF protection
        domain: process.env.SESSION_COOKIE_DOMAIN,  // For subdomain sharing
      },
      
      name: 'preet.sid',  // Custom name (security through obscurity)
    })
  );

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

// Middleware to require authentication
export function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) {
    return res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please log in to access this feature'
    });
  }
  next();
}

// Middleware to require admin privileges
export function requireAdmin(req: any, res: any, next: any) {
  if (!req.session?.userId || !req.session?.isAdmin) {
    return res.status(403).json({ 
      error: 'Admin access required',
      message: 'You do not have permission to access this resource'
    });
  }
  next();
}