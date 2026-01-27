# 🎯 CHANDRAYAAN PRECISION LOAD TEST SUITE

## Overview

The CHANDRAYAAN Precision Load Test Suite is a comprehensive testing framework designed to validate PREET_ENGLISH's performance, stability, and scalability under realistic user load conditions.

**Key Capabilities:**
- Simulates 1,500 concurrent users (500 beginner, 500 intermediate, 500 advanced)
- Tests 90% of app content per user category
- Real-time performance monitoring with system metrics
- Detailed analytics and bottleneck identification
- Automated report generation

---

## Quick Start

### Windows Users
```bash
# Run the quick start script
tests\quick-start.bat
```

### macOS/Linux Users
```bash
# Make script executable
chmod +x tests/quick-start.sh

# Run the quick start script
./tests/quick-start.sh
```

### Manual Execution

**Option 1: Full Test (Recommended)**
```bash
npm run test:chandrayaan:full
```

**Option 2: Load Test Only**
```bash
# Terminal 1
npm run dev

# Terminal 2 (after server is ready)
npm run test:chandrayaan
```

---

## Test Files

### Core Test Files

| File | Purpose |
|------|---------|
| `load-test-chandrayaan.ts` | Main load test runner with 1,500 concurrent users |
| `performance-monitor.ts` | Real-time system metrics collection |
| `run-chandrayaan-test.ts` | Test orchestrator with server management |

### Configuration & Documentation

| File | Purpose |
|------|---------|
| `quick-start.sh` | Automated test launcher (macOS/Linux) |
| `quick-start.bat` | Automated test launcher (Windows) |
| `test-results-template.md` | Template for documenting test results |
| `README.md` | This file |

---

## Test Metrics

### Global Metrics Tracked

```
✓ Total Requests
✓ Successful Requests
✓ Failed Requests
✓ Success Rate (%)
✓ Requests per Second
✓ Average Response Time (ms)
✓ Min/Max Response Time (ms)
✓ P95/P99 Response Times
```

### Per-Category Metrics

Each user category (beginner, intermediate, advanced) is tracked separately:

```
✓ User Count
✓ Total Requests
✓ Success Rate
✓ Average Response Time
✓ Content Coverage
✓ Error Analysis
```

### System Performance Metrics

```
✓ CPU Usage (%)
✓ Memory Usage (MB)
✓ Heap Usage
✓ Event Loop Lag (ms)
✓ System Load Average
✓ Garbage Collection Events
```

---

## Content Coverage

### Endpoints Tested

**Common (All Users):**
- Home page and dashboard
- Lessons list and progress
- User stats and daily goals
- Leaderboard and achievements
- Health checks

**Beginner (500 users):**
- 18 endpoints
- Beginner lessons (1-5)
- Beginner vocabulary
- Beginner stories
- Basic conversations

**Intermediate (500 users):**
- 22 endpoints
- Intermediate lessons (5-15)
- Intermediate vocabulary
- Intermediate stories
- Video call lab
- Reader lab
- Chat/AI tutor

**Advanced (500 users):**
- 24 endpoints
- Advanced lessons (15+)
- Advanced vocabulary
- Advanced stories
- Videos lab
- Advanced conversations

---

## Performance Targets

### Success Criteria

| Metric | Target | Status |
|--------|--------|--------|
| Success Rate | ≥95% | ✓ |
| Avg Response Time | ≤500ms | ✓ |
| Max Response Time | ≤2000ms | ✓ |
| CPU Usage | <75% | ✓ |
| Memory Usage | <400MB | ✓ |
| Event Loop Lag | <50ms | ✓ |

### Failure Criteria

- Success Rate < 95%
- Average Response Time > 500ms
- Memory leaks detected
- CPU usage > 75%
- Event loop lag > 50ms
- Critical errors occur

---

## Understanding Test Output

### Sample Report Structure

```
🎯 CHANDRAYAAN PRECISION LOAD TEST INITIATED
════════════════════════════════════════════════════════════════════════════════
📊 Test Configuration:
   • Total Users: 1500
   • Users per Category: 500
   • Content Coverage: 90%
   • Concurrency: 50
   • Base URL: http://localhost:5000

⏱️  Starting simulation of 1500 users...
   ✓ Completed 50/1500 users
   ✓ Completed 100/1500 users
   ...

📈 LOAD TEST RESULTS - CHANDRAYAAN PRECISION REPORT
════════════════════════════════════════════════════════════════════════════════

🌍 GLOBAL METRICS:
   Total Requests: 17,500
   Successful: 16,625
   Failed: 875
   Success Rate: 95.00%
   Duration: 245.32s
   Requests/sec: 71.35

⏱️  RESPONSE TIME METRICS:
   Average: 385.42ms
   Min: 12ms
   Max: 1,847ms

👥 PER-CATEGORY METRICS:
   BEGINNER: 500 users, 5,000 requests, 95.00% success
   INTERMEDIATE: 500 users, 6,000 requests, 95.00% success
   ADVANCED: 500 users, 6,500 requests, 95.00% success

✅ PERFORMANCE ASSESSMENT:
   ✓ PASS - Success Rate: 95.00%
   ✓ PASS - Avg Response Time: 385.42ms
   ✓ PASS - Content Coverage: 100.00%
```

---

## Troubleshooting

### Server Won't Start

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process on port 5000 (Windows)
taskkill /PID <PID> /F

# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9
```

### High Failure Rate

**Check server logs:**
```bash
npm run dev
```

**Verify database:**
```bash
npm run db:push
```

**Check for TypeScript errors:**
```bash
npm run check
```

### Memory Issues

**Run with garbage collection enabled:**
```bash
node --expose-gc dist/index.cjs
```

### Timeout Errors

- Increase timeout in test config (default: 10000ms)
- Optimize slow endpoints
- Check database indexes

---

## Performance Optimization

### For Developers

1. **Optimize API Endpoints**
   - Add caching for frequently accessed data
   - Use database indexes
   - Implement pagination

2. **Reduce Response Size**
   - Compress JSON responses
   - Only return necessary fields
   - Use field selection in queries

3. **Improve Concurrency**
   - Use connection pooling
   - Implement request queuing
   - Add rate limiting

### For DevOps

1. **Server Configuration**
   - Increase Node.js memory limit
   - Enable clustering for multi-core systems
   - Use load balancing

2. **Database Optimization**
   - Add indexes on frequently queried columns
   - Implement query caching
   - Use read replicas for scaling

3. **Monitoring**
   - Set up real-time alerts
   - Track performance trends
   - Monitor error rates

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: CHANDRAYAAN Load Test

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  workflow_dispatch:

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:chandrayaan:full
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

---

## Test Workflow

### Before Running Tests

1. ✓ Ensure Node.js 18+ is installed
2. ✓ Install dependencies: `npm install`
3. ✓ Configure environment: `.env.local`
4. ✓ Initialize database: `npm run db:push`
5. ✓ Build application: `npm run build`

### Running Tests

1. ✓ Start test suite
2. ✓ Monitor progress in console
3. ✓ Wait for completion (5-10 minutes)
4. ✓ Review results

### After Tests

1. ✓ Review success rate and response times
2. ✓ Analyze error patterns
3. ✓ Identify bottlenecks
4. ✓ Implement optimizations
5. ✓ Re-run tests to verify improvements

---

## Test Results Documentation

Use the provided template to document results:

```bash
cp tests/test-results-template.md test-results-$(date +%Y%m%d).md
```

Then fill in:
- Test date and environment
- Global metrics
- Per-category results
- System performance
- Error analysis
- Recommendations

---

## Advanced Usage

### Custom Configuration

Edit `tests/load-test-chandrayaan.ts` to customize:

```typescript
const config: LoadTestConfig = {
  baseUrl: 'http://localhost:5000',
  totalUsers: 1500,           // Change total users
  usersPerCategory: 500,      // Change users per category
  contentCoverageTarget: 90,  // Change coverage %
  concurrency: 50,            // Change concurrent users
  timeout: 10000,             // Change timeout (ms)
};
```

### Custom Endpoints

Add endpoints to `APP_CONTENT` array:

```typescript
const APP_CONTENT: ContentEndpoint[] = [
  // ... existing endpoints
  { 
    path: '/api/custom-endpoint', 
    method: 'GET', 
    category: 'all', 
    name: 'Custom Endpoint' 
  },
];
```

---

## Support & Resources

- **Full Guide:** See `CHANDRAYAAN_TEST_GUIDE.md`
- **Results Template:** See `test-results-template.md`
- **Quick Start:** Run `tests/quick-start.bat` (Windows) or `tests/quick-start.sh` (macOS/Linux)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2026 | Initial release |

---

**Status:** ✅ Production Ready
**Last Updated:** January 2026
