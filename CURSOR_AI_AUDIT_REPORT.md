# Cursor AI Deep Scan Results

**Status:** Completed
**Target:** `ref_app` (Project Ultimate)

## 1. 🚨 Critical Type Safety Violation
**File:** `server/db.ts` (Line 15)
**Code:** `let db: any;`
**Impact:** Disables TypeScript's safety checks for all database queries. Invalid SQL or schema mismatches will only be caught at runtime, causing 500 errors.
**Recommendation:** Define a proper type for `db` such as `any` | `PostgresJsDatabase<typeof schema>` | `BetterSqlite3Database<typeof schema>`.

## 2. 🔓 Unsafe Authentication Middleware
**File:** `server/middleware/sessionSecurity.ts` (Line 43)
**Code:** `export function requireAuth(req: any, res: any, next: any)`
**Impact:** Bypasses Express type definitions. Makes authentication logic fragile and prone to breaking if the session library changes.
**Recommendation:** Import `Request`, `Response`, `NextFunction` from `express` and type the arguments correctly.

## 3. 💀 Potential Memory Leak
**File:** `server/services/openai.ts` (Line 443)
**Code:** `setInterval(() => { resetDailyQuotas(); }, 24 * 60 * 60 * 1000);`
**Impact:** Development hot-reloading will likely spawn duplicate intervals (zombies), leading to memory exhaustion and race conditions.
**Recommendation:** Check if a timer already exists before creating a new one, or move this to a scheduled cron job managed outside the process.

## 4. 💣 Mass Assignment Vulnerability
**File:** `server/storage.ts` (Line 210)
**Code:** `async updateLesson(id: number, data: any)`
**Impact:** Accepts arbitrary data payloads. Malicious users could overwrite restricted fields (like `id` or `createdAt`) if the ORM doesn't filter them.
**Recommendation:** Use Zod schemas to validate `data` strictly before passing it to the database query.

## 5. 🔑 Hardcoded Secrets Risk
**File:** `server/middleware/sessionSecurity.ts` (Line 10)
**Code:** `secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production'`
**Impact:** If the environment variable fails, the app uses a known secret, allowing attackers to forge sessions.
**Recommendation:** Throw an error if `SESSION_SECRET` is missing in production, rather than falling back to a hardcoded string.
