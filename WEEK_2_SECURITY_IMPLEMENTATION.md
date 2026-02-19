# 🔒 WEEK 2: SECURITY HARDENING IMPLEMENTATION

**Status:** Ready to Implement  
**Priority:** CRITICAL  
**Dependencies:** Week 1 (Database Migration)

---

## 📋 OVERVIEW

Week 2 focuses on implementing enterprise-grade security:
- JWT/OAuth2 authentication
- Rate limiting
- CSRF protection
- Security headers
- Secrets management

---

## 🎯 IMPLEMENTATION TASKS

### Task 1: JWT Authentication System

**File: `lib/auth/jwt.ts`**
```typescript
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface JWTPayload {
  userId: string;
  username: string;
  isAdmin: boolean;
}

export function generateAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m', // Short-lived access token
    issuer: 'preet-english',
    audience: 'preet-english-api',
  });
}

export function generateRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d', // Long-lived refresh token
    issuer: 'preet-english',
    audience: 'preet-english-api',
  });
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET, {
    issuer: 'preet-english',
    audience: 'preet-english-api',
  }) as JWTPayload;
}

export function verifyRefreshToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_REFRESH_SECRET, {
    issuer: 'preet-english',
    audience: 'preet-english-api',
  }) as JWTPayload;
}

// Middleware for JWT authentication
export async function authenticateJWT(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
```

### Task 2: Rate Limiting

**File: `lib/security/rateLimiter.ts`**
```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// General API rate limiter
export const apiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:api:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict limiter for authentication endpoints
export const authLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:auth:',
  }),
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  message: 'Too many login attempts, please try again later',
  skipSuccessfulRequests: true,
});

// AI endpoint limiter (more restrictive due to cost)
export const aiLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:ai:',
  }),
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 AI requests per hour
  message: 'AI request limit reached, please try again later',
});
```

### Task 3: CSRF Protection

**File: `lib/security/csrf.ts`**
```typescript
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

export function setupCSRF(app: any) {
  app.use(cookieParser());
  app.use(csrfProtection);
  
  // Endpoint to get CSRF token
  app.get('/api/csrf-token', (req: any, res: any) => {
    res.json({ csrfToken: req.csrfToken() });
  });
}
```

### Task 4: Security Headers

**File: `lib/security/headers.ts`**
```typescript
import helmet from 'helmet';

export function setupSecurityHeaders(app: any) {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", 'https://api.openai.com'],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
      noSniff: true,
      xssFilter: true,
      hidePoweredBy: true,
    })
  );
}
```

---

## 📦 DEPENDENCIES TO INSTALL

```bash
npm install jsonwebtoken express-rate-limit rate-limit-redis ioredis csurf cookie-parser helmet
npm install -D @types/jsonwebtoken @types/cookie-parser
```

---

## ✅ SUCCESS CRITERIA

- [ ] JWT authentication working
- [ ] Refresh token rotation implemented
- [ ] Rate limiting active on all endpoints
- [ ] CSRF protection enabled
- [ ] Security headers configured
- [ ] Security score >95%

---

**Estimated Time:** 5-7 days  
**Next:** Week 3 - CI/CD Pipeline
