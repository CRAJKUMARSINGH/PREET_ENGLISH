# 🎯 CHANDRAYAAN PRECISION LOAD TEST GUIDE

## Overview

The CHANDRAYAAN Precision Load Test is a comprehensive testing framework designed to validate PREET_ENGLISH's performance, stability, and scalability under realistic user load conditions.

**Test Scope:**
- **1,500 concurrent users** (500 beginner, 500 intermediate, 500 advanced)
- **90% content coverage** per user category
- **Real-time performance monitoring** with system metrics
- **Precision metrics** tracking response times, success rates, and error analysis

---

## Test Architecture

### Components

1. **Load Test Runner** (`tests/load-test-chandrayaan.ts`)
   - Simulates 1,500 concurrent users across 3 skill levels
   - Tracks individual user metrics and global performance
   - Generates detailed performance reports

2. **Performance Monitor** (`tests/performance-monitor.ts`)
   - Real-time CPU and memory tracking
   - Event loop lag measurement
   - Garbage collection monitoring
   - System load analysis

3. **Test Orchestrator** (`tests/run-chandrayaan-test.ts`)
   - Coordinates server startup
   - Manages load test execution
   - Integrates performance monitoring
   - Generates comprehensive reports

### Content Coverage

The test covers 90% of app endpoints across all user categories:

**Common Endpoints (All Users):**
- Home page and dashboard
- Lessons list and progress tracking
- User stats and daily goals
- Leaderboard and achievements
- Health checks

**Category-Specific Endpoints:**

**Beginner (500 users):**
- Beginner lessons (1-5)
- Beginner vocabulary
- Beginner stories
- Basic conversations

**Intermediate (500 users):**
- Intermediate lessons (5-15)
- Intermediate vocabulary
- Intermediate stories
- Video call lab
- Reader lab
- Chat/AI tutor

**Advanced (500 users):**
- Advanced lessons (15+)
- Advanced vocabulary
- Advanced stories
- Videos lab
- Advanced conversations

---

## Running the Tests

### Quick Start

```bash
# Run load test only (requires server running separately)
npm run test:chandrayaan

# Run full test suite with server management
npm run test:chandrayaan:full
```

### Prerequisites

1. **Node.js 18+** installed
2. **Dependencies installed**: `npm install`
3. **Environment configured**: `.env.local` with required variables
4. **Database initialized**: `npm run db:push`

### Step-by-Step Execution

#### Option 1: Full Automated Test

```bash
npm run test:chandrayaan:full
```

This will:
1. Start the development server
2. Initialize performance monitoring
3. Run the load test with 1,500 concurrent users
4. Generate comprehensive reports
5. Display results in console

**Expected Duration:** 5-10 minutes

#### Option 2: Manual Server + Load Test

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run load test (after server is ready)
npm run test:chandrayaan
```

---

## Test Metrics & Interpretation

### Global Metrics

| Metric | Target | Interpretation |
|--------|--------|-----------------|
| Success Rate | ≥95% | Percentage of successful requests |
| Avg Response Time | ≤500ms | Average time for request completion |
| Max Response Time | ≤2000ms | Worst-case response time |
| Requests/sec | ≥10 | Throughput capacity |

### Per-Category Metrics

Each user category is tracked separately:

```
BEGINNER:
  Users: 500
  Total Requests: ~5,000
  Success Rate: 95%+
  Avg Response Time: 300-400ms

INTERMEDIATE:
  Users: 500
  Total Requests: ~6,000
  Success Rate: 95%+
  Avg Response Time: 350-450ms

ADVANCED:
  Users: 500
  Total Requests: ~6,500
  Success Rate: 95%+
  Avg Response Time: 400-500ms
```

### System Performance Metrics

| Metric | Healthy Range | Warning | Critical |
|--------|---------------|---------|----------|
| CPU Usage | <50% | 50-75% | >75% |
| Memory (Heap) | <200MB | 200-400MB | >400MB |
| Event Loop Lag | <10ms | 10-50ms | >50ms |
| Load Average | <2.0 | 2.0-4.0 | >4.0 |

---

## Understanding the Report

### Sample Output Structure

```
🎯 CHANDRYAAN PRECISION LOAD TEST INITIATED
════════════════════════════════════════════════════════════════════════════════
📊 Test Configuration:
   • Total Users: 1500
   • Users per Category: 500
   • Content Coverage: 90%
   • Concurrency: 50
   • Base URL: http://localhost:5000
════════════════════════════════════════════════════════════════════════════════

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
   BEGINNER:
      Users: 500
      Total Requests: 5,000
      Failed: 250
      Success Rate: 95.00%
      Avg Response Time: 320.15ms
      Content Coverage: 18 endpoints

   INTERMEDIATE:
      Users: 500
      Total Requests: 6,000
      Failed: 300
      Success Rate: 95.00%
      Avg Response Time: 385.42ms
      Content Coverage: 22 endpoints

   ADVANCED:
      Users: 500
      Total Requests: 6,500
      Failed: 325
      Success Rate: 95.00%
      Avg Response Time: 445.68ms
      Content Coverage: 24 endpoints

⚠️  ERROR ANALYSIS:
   Lesson 15 (Advanced): 125 failures
   Chat API: 100 failures
   Video Call Lab: 75 failures
   ...

📋 SAMPLE USER DETAILS:
   BEGINNER - user-1:
      Requests Completed: 18
      Requests Failed: 1
      Avg Response Time: 315.42ms
      Content Visited: 18 items

   INTERMEDIATE - user-501:
      Requests Completed: 22
      Requests Failed: 1
      Avg Response Time: 380.15ms
      Content Visited: 22 items

   ADVANCED - user-1001:
      Requests Completed: 24
      Requests Failed: 1
      Avg Response Time: 440.68ms
      Content Visited: 24 items

✅ PERFORMANCE ASSESSMENT:
   ✓ PASS - Success Rate: 95.00% (threshold: 95%)
   ✓ PASS - Avg Response Time: 385.42ms (threshold: 500ms)
   ✓ PASS - Content Coverage: 100.00% (threshold: 90%)

📊 PERFORMANCE MONITORING REPORT
════════════════════════════════════════════════════════════════════════════════

💻 CPU USAGE:
   Average: 35.42%
   Max: 62.15%
   Min: 8.23%

🧠 MEMORY USAGE:
   Average Heap Used: 145.32 MB
   Max Heap Used: 287.45 MB
   Min Heap Used: 98.12 MB
   Current Heap Total: 512.00 MB
   Current RSS: 625.34 MB

📈 SYSTEM LOAD:
   1-min average: 1.45
   5-min average: 1.23
   15-min average: 0.98

⏱️  EVENT LOOP LAG:
   Average: 2.34ms
   Max: 15.67ms
```

---

## Troubleshooting

### Common Issues

#### 1. Server Won't Start

```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process on port 5000
taskkill /PID <PID> /F

# Try again
npm run dev
```

#### 2. High Failure Rate (>10%)

**Possible Causes:**
- Server overload
- Database connection issues
- API endpoint errors

**Solutions:**
```bash
# Check server logs
npm run dev

# Verify database connection
npm run db:push

# Check for TypeScript errors
npm run check
```

#### 3. Memory Leaks

**Indicators:**
- Memory usage continuously increasing
- Max heap used > 400MB
- Garbage collection not freeing memory

**Solutions:**
```bash
# Run with garbage collection enabled
node --expose-gc dist/index.cjs

# Check for memory leaks in code
npm run test:coverage
```

#### 4. Timeout Errors

**Possible Causes:**
- Slow API endpoints
- Database queries taking too long
- Network latency

**Solutions:**
- Increase timeout in test config (default: 10000ms)
- Optimize slow endpoints
- Check database indexes

---

## Performance Optimization Tips

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

### GitHub Actions Integration

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

## Success Criteria

✅ **Test Passes When:**
- Success Rate ≥ 95%
- Average Response Time ≤ 500ms
- No critical errors
- Memory usage stable
- CPU usage < 75%
- Event loop lag < 50ms

❌ **Test Fails When:**
- Success Rate < 95%
- Average Response Time > 500ms
- Memory leaks detected
- CPU usage > 75%
- Event loop lag > 50ms
- Critical errors occur

---

## Next Steps

After running the test:

1. **Review Results**
   - Check success rate and response times
   - Analyze error patterns
   - Review system metrics

2. **Identify Bottlenecks**
   - Find slow endpoints
   - Check database performance
   - Monitor resource usage

3. **Optimize**
   - Fix identified issues
   - Implement improvements
   - Re-run tests to verify

4. **Document**
   - Record baseline metrics
   - Track improvements over time
   - Share results with team

---

## Support & Questions

For issues or questions about the CHANDRAYAAN test:

1. Check this guide's troubleshooting section
2. Review test output logs
3. Check server logs for errors
4. Consult team documentation

---

**Last Updated:** January 2026
**Test Version:** 1.0.0
**Status:** Production Ready ✅
