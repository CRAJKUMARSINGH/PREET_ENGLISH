# Real-World Resiliency & Load Testing Suite

## Overview

This comprehensive testing suite implements the **RAJKUMAR.MD** specification for real-world validation of PREET_ENGLISH. It moves beyond unit testing and mocking to provide integration-heavy performance validation that proves the application can handle concurrent sessions, maintain database integrity under load, and demonstrate proper circuit breaker behavior.

## 🎯 Test Objectives

1. **Prove Concurrent Session Handling** - Validate 100+ concurrent users
2. **Database Integrity Under Load** - Ensure data consistency during stress
3. **Circuit Breaker Validation** - Verify resilience patterns work in practice
4. **UI Graceful Degradation** - Confirm proper error handling in browsers

## 🏗️ Architecture

### Phase 1: Test Data Orchestration
- **Script:** `scripts/seed-test-users.ts`
- **Purpose:** Creates 500 unique test users with encrypted passwords
- **Features:** UUID prefixing, batch processing, cleanup automation

### Phase 2: K6 Load Testing
- **Script:** `tests/load/k6-config.js`
- **Purpose:** Simulates 100 concurrent users with realistic authentication flow
- **Metrics:** Response times, error rates, throughput, session management

### Phase 3: Chaos Engineering
- **Script:** `scripts/chaos-injection-test.ts`
- **Purpose:** Injects latency via Toxiproxy and validates circuit breaker behavior
- **Validation:** Circuit breaker state transitions, fallback responses

### Phase 4: E2E Stress Testing
- **Script:** `tests/e2e/playwright-stress-test.ts`
- **Purpose:** 5 concurrent browser instances testing UI under load
- **Validation:** Graceful degradation, no white screens, proper error states

## 🚀 Quick Start

### Prerequisites

```bash
# Install required tools
npm install -g k6
npm install -g playwright
npm install -g toxiproxy

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
```

### Option 1: Full Automated Suite

```bash
# Run complete RAJKUMAR.MD test suite
npm run test:rajkumar-suite
```

### Option 2: Docker Environment

```bash
# Start isolated test environment
npm run test:docker-up

# Run tests against Docker environment
USE_DOCKER=true npm run test:real-world

# Cleanup
npm run test:docker-down
```

### Option 3: Individual Phases

```bash
# Phase 1: Seed test users
npm run test:seed-users

# Phase 2: K6 load testing
npm run test:k6-load

# Phase 3: Chaos injection
npm run test:chaos-injection

# Phase 4: Playwright stress testing
npm run test:playwright-stress

# Cleanup test users
npm run test:cleanup-users
```

## 📊 Success Criteria

### Performance Thresholds
- **Response Time:** 95% of requests < 500ms
- **Error Rate:** < 10% during normal operation
- **Concurrent Users:** 100+ simultaneous sessions
- **Database Integrity:** No data corruption under load

### Resilience Requirements
- **Circuit Breaker:** Opens after configured failures
- **Fallback Responses:** Immediate 503 when circuit is open
- **Recovery Time:** < 30 seconds after issue resolution
- **UI Degradation:** Graceful loading states, no raw errors

## 🔧 Configuration

### Environment Variables

```bash
# Application
BASE_URL=http://localhost:5000
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SESSION_SECRET=your-session-secret

# Testing
TEST_LOAD_PATTERN=true
USE_DOCKER=false
HEADLESS=true

# Chaos Testing
TOXIPROXY_URL=http://localhost:8474
CHAOS_LATENCY_MS=5000
```

### Test Parameters

```typescript
// K6 Load Test Configuration
const K6_CONFIG = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1']
  }
};

// Chaos Testing Configuration
const CHAOS_CONFIG = {
  latencyMs: 5000,
  testDurationMs: 60000,
  failureThreshold: 10
};

// Playwright Configuration
const PLAYWRIGHT_CONFIG = {
  concurrentInstances: 5,
  testDurationMs: 120000,
  actionIntervalMs: 3000
};
```

## 📈 Monitoring & Metrics

### Real-Time Metrics Collected

```
Performance Metrics:
- Response times (avg, min, max, p95, p99)
- Request throughput (requests/second)
- Error rates by endpoint
- Concurrent session count

System Metrics:
- CPU usage
- Memory consumption
- Database connection pool
- Event loop lag

Resilience Metrics:
- Circuit breaker state changes
- Fallback response times
- Recovery duration
- Error propagation
```

### Report Generation

The suite automatically generates:

1. **Markdown Report:** `REAL_WORLD_TEST_REPORT.md`
2. **JSON Results:** `real-world-test-results.json`
3. **K6 Metrics:** `k6-load-test-report.json`
4. **Screenshots:** `screenshots/` directory
5. **System Logs:** `logs/` directory

## 🐳 Docker Environment

### Services Included

```yaml
services:
  app:           # PREET_ENGLISH application
  test-db:       # PostgreSQL database
  test-redis:    # Redis for sessions
  toxiproxy:     # Chaos engineering proxy
  k6:            # Load testing service
  prometheus:    # Metrics collection
  grafana:       # Visualization dashboard
```

### Health Checks

All services include comprehensive health checks:
- Application readiness validation
- Database connectivity verification
- Resource usage monitoring
- Service dependency validation

## 🔍 Troubleshooting

### Common Issues

**1. K6 Installation Issues**
```bash
# macOS
brew install k6

# Ubuntu/Debian
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

**2. Toxiproxy Setup**
```bash
# Download and install Toxiproxy
wget https://github.com/Shopify/toxiproxy/releases/download/v2.5.0/toxiproxy-server-linux-amd64
chmod +x toxiproxy-server-linux-amd64
sudo mv toxiproxy-server-linux-amd64 /usr/local/bin/toxiproxy-server
```

**3. Playwright Dependencies**
```bash
# Install browser dependencies
npx playwright install-deps
npx playwright install chromium
```

**4. Database Connection Issues**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test connection
psql -h localhost -p 5432 -U test_user -d preet_english_test
```

### Performance Optimization

**Database Optimization:**
```sql
-- Add indexes for test queries
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_progress_user_lesson ON progress(user_id, lesson_id);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
```

**Application Tuning:**
```javascript
// Increase Node.js memory limit
node --max-old-space-size=4096 server/index.ts

// Enable clustering
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Start application
}
```

## 📋 Test Checklist

### Pre-Test Validation
- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database accessible
- [ ] Application starts successfully
- [ ] Health endpoints responding

### During Test Execution
- [ ] Monitor system resources
- [ ] Watch for error patterns
- [ ] Verify circuit breaker behavior
- [ ] Check UI responsiveness
- [ ] Validate data integrity

### Post-Test Analysis
- [ ] Review performance metrics
- [ ] Analyze error logs
- [ ] Verify cleanup completion
- [ ] Generate recommendations
- [ ] Update documentation

## 🎯 RAJKUMAR.MD Compliance Matrix

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| 500 Test Users | `seed-test-users.ts` | ✅ |
| Real Database | No mocks, direct DB calls | ✅ |
| 100 Concurrent Users | K6 load testing | ✅ |
| Circuit Breaker Testing | Toxiproxy chaos injection | ✅ |
| E2E UI Validation | Playwright stress testing | ✅ |
| Docker Environment | `docker-compose.test.yml` | ✅ |
| Comprehensive Reporting | Automated report generation | ✅ |
| Clean Exit on Failure | Error rate monitoring | ✅ |

## 🔄 Continuous Integration

### GitHub Actions Integration

```yaml
name: Real-World Testing

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  real-world-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test_password
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm install
          npm install -g k6 playwright toxiproxy
          npx playwright install chromium
      
      - name: Run real-world test suite
        run: npm run test:rajkumar-suite
        env:
          DATABASE_URL: postgresql://postgres:test_password@localhost:5432/postgres
          SESSION_SECRET: test-session-secret
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            REAL_WORLD_TEST_REPORT.md
            real-world-test-results.json
            screenshots/
            logs/
```

## 📚 Additional Resources

- **RAJKUMAR.MD:** Original specification document
- **K6 Documentation:** https://k6.io/docs/
- **Playwright Guide:** https://playwright.dev/
- **Toxiproxy Manual:** https://github.com/Shopify/toxiproxy
- **Circuit Breaker Pattern:** https://martinfowler.com/bliki/CircuitBreaker.html

## 🤝 Contributing

When adding new test scenarios:

1. Follow the existing phase structure
2. Include comprehensive error handling
3. Add metrics collection
4. Update documentation
5. Ensure Docker compatibility
6. Add CI/CD integration

## 📞 Support

For issues with the testing suite:

1. Check the troubleshooting section
2. Review logs in `logs/` directory
3. Validate environment configuration
4. Test individual phases separately
5. Create detailed issue reports

---

**Status:** ✅ Production Ready  
**Last Updated:** January 2026  
**RAJKUMAR.MD Compliance:** 100%