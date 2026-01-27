# CHANDRAYAAN Test Results Template

**Test Date:** [DATE]
**Test Duration:** [DURATION]
**Environment:** [DEV/STAGING/PROD]
**Node Version:** [VERSION]

## Executive Summary

| Metric | Result | Status |
|--------|--------|--------|
| Total Users Simulated | 1,500 | ✓ |
| Total Requests | [COUNT] | ✓ |
| Success Rate | [%] | [PASS/FAIL] |
| Avg Response Time | [MS]ms | [PASS/FAIL] |
| Peak Memory Usage | [MB]MB | [PASS/FAIL] |
| Peak CPU Usage | [%]% | [PASS/FAIL] |

## Global Metrics

### Request Performance
- **Total Requests:** [COUNT]
- **Successful:** [COUNT]
- **Failed:** [COUNT]
- **Success Rate:** [%]%
- **Requests/sec:** [COUNT]

### Response Time
- **Average:** [MS]ms
- **Minimum:** [MS]ms
- **Maximum:** [MS]ms
- **P95:** [MS]ms
- **P99:** [MS]ms

## Per-Category Results

### Beginner (500 users)
- **Total Requests:** [COUNT]
- **Success Rate:** [%]%
- **Avg Response Time:** [MS]ms
- **Content Coverage:** [COUNT] endpoints
- **Status:** [PASS/FAIL]

### Intermediate (500 users)
- **Total Requests:** [COUNT]
- **Success Rate:** [%]%
- **Avg Response Time:** [MS]ms
- **Content Coverage:** [COUNT] endpoints
- **Status:** [PASS/FAIL]

### Advanced (500 users)
- **Total Requests:** [COUNT]
- **Success Rate:** [%]%
- **Avg Response Time:** [MS]ms
- **Content Coverage:** [COUNT] endpoints
- **Status:** [PASS/FAIL]

## System Performance

### CPU Usage
- **Average:** [%]%
- **Peak:** [%]%
- **Status:** [HEALTHY/WARNING/CRITICAL]

### Memory Usage
- **Average Heap:** [MB]MB
- **Peak Heap:** [MB]MB
- **Current RSS:** [MB]MB
- **Status:** [HEALTHY/WARNING/CRITICAL]

### Event Loop
- **Average Lag:** [MS]ms
- **Max Lag:** [MS]ms
- **Status:** [HEALTHY/WARNING/CRITICAL]

### System Load
- **1-min:** [VALUE]
- **5-min:** [VALUE]
- **15-min:** [VALUE]

## Error Analysis

### Top Errors
1. [ENDPOINT]: [COUNT] failures
2. [ENDPOINT]: [COUNT] failures
3. [ENDPOINT]: [COUNT] failures

### Error Categories
- **4xx Errors:** [COUNT]
- **5xx Errors:** [COUNT]
- **Timeouts:** [COUNT]
- **Connection Errors:** [COUNT]

## Endpoint Performance

| Endpoint | Requests | Success | Avg Time | Status |
|----------|----------|---------|----------|--------|
| [PATH] | [COUNT] | [%]% | [MS]ms | [✓/✗] |
| [PATH] | [COUNT] | [%]% | [MS]ms | [✓/✗] |
| [PATH] | [COUNT] | [%]% | [MS]ms | [✓/✗] |

## Bottlenecks Identified

1. **[ISSUE]**
   - Severity: [HIGH/MEDIUM/LOW]
   - Affected Endpoint: [PATH]
   - Impact: [DESCRIPTION]
   - Recommendation: [ACTION]

2. **[ISSUE]**
   - Severity: [HIGH/MEDIUM/LOW]
   - Affected Endpoint: [PATH]
   - Impact: [DESCRIPTION]
   - Recommendation: [ACTION]

## Recommendations

### Immediate Actions
- [ ] [ACTION]
- [ ] [ACTION]
- [ ] [ACTION]

### Short-term Improvements
- [ ] [ACTION]
- [ ] [ACTION]
- [ ] [ACTION]

### Long-term Optimizations
- [ ] [ACTION]
- [ ] [ACTION]
- [ ] [ACTION]

## Comparison with Previous Test

| Metric | Previous | Current | Change |
|--------|----------|---------|--------|
| Success Rate | [%]% | [%]% | [+/-]% |
| Avg Response Time | [MS]ms | [MS]ms | [+/-]ms |
| Peak Memory | [MB]MB | [MB]MB | [+/-]MB |
| Peak CPU | [%]% | [%]% | [+/-]% |

## Conclusion

**Overall Status:** [PASS/FAIL]

**Summary:**
[DETAILED SUMMARY OF TEST RESULTS AND KEY FINDINGS]

**Next Steps:**
1. [ACTION]
2. [ACTION]
3. [ACTION]

---

**Tested By:** [NAME]
**Reviewed By:** [NAME]
**Date:** [DATE]
