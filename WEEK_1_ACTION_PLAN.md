# 🚀 WEEK 1 ACTION PLAN: Foundation & Infrastructure

**Based on:** `0=improve.md` - 15-Week Improvement Roadmap  
**Status:** READY TO START  
**Priority:** CRITICAL - Foundation for all future improvements  
**Date:** February 18, 2026

---

## 📋 OVERVIEW

Week 1 focuses on establishing a production-ready foundation by:
1. Migrating from SQLite to PostgreSQL
2. Setting up comprehensive monitoring
3. Implementing proper development environments

---

## 🎯 WEEK 1 GOALS

### Database Migration
- ✅ Current: SQLite (not production-ready beyond 10K users)
- 🎯 Target: PostgreSQL with Prisma ORM
- 📊 Metric: Query time <100ms, 99.9% uptime

### Monitoring & Observability
- ✅ Current: Basic console logging
- 🎯 Target: Sentry + PostHog + Winston
- 📊 Metric: 100% error tracking, real-time analytics

### Development Environment
- ✅ Current: Manual setup
- 🎯 Target: Docker Compose with env separation
- 📊 Metric: <5 min setup time for new developers

---

## 📝 DETAILED TASKS

### Task 1: PostgreSQL Migration with Prisma
**Priority:** CRITICAL  
**Estimated Time:** 8-12 hours  
**Dependencies:** None

#### Subtasks:
1. ✅ Install Prisma and PostgreSQL dependencies
   ```bash
   npm install prisma @prisma/client @prisma/extension-accelerate
   npm install -D @types/pg
   ```

2. ✅ Create Prisma schema from existing Drizzle schema
   - File: `prisma/schema.prisma`
   - Convert all tables: users, lessons, vocabulary, progress, etc.
   - Add indexes for performance
   - Add full-text search capabilities

3. ✅ Setup PostgreSQL database
   - Option A: Local PostgreSQL (development)
   - Option B: Neon/Supabase (cloud)
   - Configure connection pooling (10-20 connections)

4. ✅ Create migration script
   - File: `scripts/migrate-sqlite-to-postgres.ts`
   - Migrate users (preserve all data)
   - Migrate lessons (all 1625+ lessons)
   - Migrate progress, vocabulary, achievements
   - Add progress bar for visibility

5. ✅ Update application code
   - Replace Drizzle imports with Prisma
   - Update `server/storage.ts` to use Prisma client
   - Test all database operations
   - Ensure zero data loss

6. ✅ Verify migration
   - Run all tests
   - Check data integrity
   - Performance benchmarks

#### Files to Create:
- `prisma/schema.prisma` - Complete database schema
- `lib/prisma.ts` - Prisma client singleton
- `scripts/migrate-sqlite-to-postgres.ts` - Migration script
- `.env.example` - Add DATABASE_URL and DIRECT_URL

#### Success Criteria:
- ✅ All 1625+ lessons migrated
- ✅ All user data preserved
- ✅ Query performance <100ms
- ✅ All tests passing
- ✅ Zero data loss

---

### Task 2: Monitoring & Observability Setup
**Priority:** HIGH  
**Estimated Time:** 6-8 hours  
**Dependencies:** None

#### Subtasks:
1. ✅ Setup Sentry for error tracking
   ```bash
   npm install @sentry/node @sentry/profiling-node
   ```
   - File: `lib/monitoring/sentry.ts`
   - Configure DSN, environment, release tracking
   - Add Express middleware
   - Setup error filtering
   - Add performance monitoring

2. ✅ Setup PostHog for product analytics
   ```bash
   npm install posthog-node
   ```
   - File: `lib/monitoring/posthog.ts`
   - Create Analytics class
   - Track key events: lesson_started, lesson_completed, ai_interaction
   - Add user identification
   - Setup event batching

3. ✅ Implement structured logging with Winston
   ```bash
   npm install winston winston-daily-rotate-file
   ```
   - File: `lib/monitoring/logger.ts`
   - Configure log levels (error, warn, info, debug)
   - Add daily log rotation
   - JSON formatting for production
   - Console formatting for development

4. ✅ Add Web Vitals tracking
   - File: `client/src/lib/webVitals.ts`
   - Track LCP, FID, CLS, TTFB
   - Send to PostHog
   - Setup performance budgets

5. ✅ Integrate monitoring into application
   - Update `server/index.ts` with Sentry middleware
   - Add analytics tracking to key user actions
   - Replace console.log with structured logger
   - Add error boundaries with Sentry reporting

#### Files to Create:
- `lib/monitoring/sentry.ts` - Sentry configuration
- `lib/monitoring/posthog.ts` - PostHog analytics
- `lib/monitoring/logger.ts` - Winston logger
- `client/src/lib/webVitals.ts` - Performance tracking

#### Environment Variables Needed:
```env
SENTRY_DSN=https://...@sentry.io/...
POSTHOG_API_KEY=phc_...
POSTHOG_HOST=https://app.posthog.com
```

#### Success Criteria:
- ✅ All errors tracked in Sentry
- ✅ User events tracked in PostHog
- ✅ Structured logs with rotation
- ✅ Web Vitals monitored
- ✅ <1% monitoring overhead

---

### Task 3: Development Environment Setup
**Priority:** MEDIUM  
**Estimated Time:** 4-6 hours  
**Dependencies:** Task 1 (PostgreSQL)

#### Subtasks:
1. ✅ Create Docker Compose configuration
   - File: `docker-compose.yml`
   - Services: PostgreSQL, Redis (for future caching)
   - Volume mounts for data persistence
   - Network configuration

2. ✅ Create Dockerfile for application
   - File: `Dockerfile`
   - Multi-stage build (build + production)
   - Optimize layer caching
   - Health checks

3. ✅ Setup environment configurations
   - `.env.development` - Local development
   - `.env.staging` - Staging environment
   - `.env.production` - Production (template only)
   - Document all required variables

4. ✅ Create setup scripts
   - `scripts/setup-dev.sh` - One-command setup
   - `scripts/reset-db.sh` - Reset database
   - `scripts/seed-db.ts` - Seed test data

5. ✅ Update documentation
   - Update `README.md` with new setup instructions
   - Add troubleshooting guide
   - Document environment variables

#### Files to Create:
- `docker-compose.yml` - Docker services
- `Dockerfile` - Application container
- `.env.development` - Dev environment
- `.env.staging` - Staging environment
- `scripts/setup-dev.sh` - Setup script
- `scripts/reset-db.sh` - Reset script
- `scripts/seed-db.ts` - Seed script

#### Success Criteria:
- ✅ New developer setup <5 minutes
- ✅ Docker Compose working
- ✅ Environment separation clear
- ✅ Documentation complete
- ✅ Seed data available

---

## 📊 SUCCESS METRICS

### Database Performance
- Query time: <100ms (target: <50ms)
- Connection pool: 10-20 connections
- Uptime: 99.9%
- Zero data loss during migration

### Monitoring Coverage
- Error tracking: 100% of errors captured
- Analytics events: 10+ key events tracked
- Log retention: 30 days
- Performance overhead: <1%

### Developer Experience
- Setup time: <5 minutes
- Environment clarity: 3 environments (dev, staging, prod)
- Documentation: Complete and up-to-date
- Troubleshooting: Common issues documented

---

## 🚨 RISKS & MITIGATION

### Risk 1: Data Loss During Migration
**Probability:** Medium  
**Impact:** CRITICAL  
**Mitigation:**
- Create full SQLite backup before migration
- Test migration on copy first
- Verify data integrity after migration
- Keep SQLite as fallback for 1 week

### Risk 2: PostgreSQL Connection Issues
**Probability:** Low  
**Impact:** HIGH  
**Mitigation:**
- Use connection pooling
- Implement retry logic
- Add health checks
- Monitor connection count

### Risk 3: Monitoring Overhead
**Probability:** Low  
**Impact:** MEDIUM  
**Mitigation:**
- Use sampling for performance monitoring
- Batch analytics events
- Async error reporting
- Monitor monitoring overhead

---

## 📦 DEPENDENCIES TO INSTALL

```bash
# Database
npm install prisma @prisma/client @prisma/extension-accelerate
npm install -D @types/pg

# Monitoring
npm install @sentry/node @sentry/profiling-node
npm install posthog-node
npm install winston winston-daily-rotate-file

# Development
npm install -D docker-compose
npm install better-sqlite3  # For migration script
npm install cli-progress     # For migration progress bar
```

---

## 🔄 ROLLBACK PLAN

If Week 1 implementation fails:

1. **Database Rollback:**
   - Keep SQLite database intact
   - Revert Prisma changes
   - Restore Drizzle ORM
   - Use backup if needed

2. **Monitoring Rollback:**
   - Remove Sentry/PostHog if causing issues
   - Revert to console logging
   - Keep structured logger (low risk)

3. **Docker Rollback:**
   - Continue with manual setup
   - Docker is optional for development

---

## 📅 TIMELINE

### Day 1-2: Database Migration
- Setup PostgreSQL
- Create Prisma schema
- Write migration script
- Test migration

### Day 3-4: Monitoring Setup
- Configure Sentry
- Setup PostHog
- Implement Winston logger
- Add Web Vitals tracking

### Day 5: Development Environment
- Create Docker Compose
- Write setup scripts
- Update documentation

### Day 6-7: Testing & Verification
- Run all tests
- Performance benchmarks
- Documentation review
- Team training

---

## ✅ COMPLETION CHECKLIST

### Database Migration
- [ ] PostgreSQL database created
- [ ] Prisma schema complete
- [ ] Migration script tested
- [ ] All data migrated successfully
- [ ] Performance benchmarks passed
- [ ] All tests passing

### Monitoring
- [ ] Sentry configured and testing
- [ ] PostHog tracking events
- [ ] Winston logger implemented
- [ ] Web Vitals tracked
- [ ] Error boundaries updated

### Development Environment
- [ ] Docker Compose working
- [ ] Dockerfile optimized
- [ ] Environment files created
- [ ] Setup scripts tested
- [ ] Documentation updated

### Verification
- [ ] Zero data loss confirmed
- [ ] All 1625+ lessons intact
- [ ] User data preserved
- [ ] Performance improved
- [ ] Team trained on new setup

---

## 🎯 NEXT STEPS (WEEK 2)

After completing Week 1, proceed to:

**WEEK 2: Security Hardening**
- JWT/OAuth2 authentication
- Rate limiting
- CSRF protection
- Security headers
- Secrets management

---

## 📚 REFERENCES

- `0=improve.md` - Complete 15-week roadmap
- `COMPREHENSIVE_ERROR_ANALYSIS.md` - Identified issues
- `ALL_TESTS_RESULTS.md` - Current test status
- Prisma Docs: https://www.prisma.io/docs
- Sentry Docs: https://docs.sentry.io
- PostHog Docs: https://posthog.com/docs

---

**Document Version:** 1.0  
**Last Updated:** February 18, 2026  
**Status:** READY TO START  
**Estimated Completion:** 7 days
