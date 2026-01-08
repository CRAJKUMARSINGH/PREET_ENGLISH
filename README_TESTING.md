# 🧪 COMPREHENSIVE TESTING GUIDE

## Overview

This application has comprehensive programmatic tests that verify:
- ✅ Every lesson individually
- ✅ All API endpoints
- ✅ All routes and navigation
- ✅ Data integrity
- ✅ Component integration
- ✅ Link connectivity
- ✅ Complete user flows

## Quick Start

### Option 1: Run Tests Against Running Server

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **In another terminal, run the comprehensive test:**
   ```bash
   npm run test:all-lessons
   ```

### Option 2: Auto-Start Server and Test

Run the all-in-one test script that automatically starts the server:

```bash
npm run test:everything
```

This will:
- Check if server is running
- Start server if needed
- Run all tests
- Generate comprehensive report
- Clean up

## Test Scripts

### `npm run test:all-lessons`
Tests all lessons programmatically against the API endpoints.

**What it tests:**
- Every lesson can be fetched individually
- Each lesson has valid structure
- Vocabulary endpoints work
- Quiz endpoints work (if available)
- Lesson ordering is consistent

**Requirements:**
- Server must be running on `http://localhost:5000` (or set `TEST_BASE_URL` env var)

### `npm run test:everything`
Comprehensive test suite that:
- Automatically starts server if needed
- Tests all lessons
- Tests all API endpoints
- Tests all routes
- Tests navigation flows
- Tests data integrity
- Generates detailed report

### `npm run test:comprehensive`
Legacy comprehensive user testing script.

### `npm test` (Jest)
Runs unit tests using Jest framework.

## Test Configuration

### Environment Variables

- `TEST_BASE_URL` - Base URL for API testing (default: `http://localhost:5000`)
- `TIMEOUT` - Request timeout in ms (default: 30000)
- `RETRY_ATTEMPTS` - Number of retry attempts (default: 3)

### Example:
```bash
TEST_BASE_URL=http://localhost:5000 npm run test:all-lessons
```

## Test Coverage

### ✅ Lesson Tests
- Individual lesson fetching
- Lesson structure validation
- Vocabulary endpoint testing
- Quiz endpoint testing (if available)
- Lesson ordering validation

### ✅ API Endpoint Tests
- All GET endpoints
- All POST endpoints
- Authentication-required endpoints
- Error handling

### ✅ Route Tests
- All frontend routes
- Route accessibility
- Content type validation

### ✅ Data Integrity Tests
- Required fields validation
- Data type validation
- Relationship integrity
- Schema validation

### ✅ Integration Tests
- Lesson → Vocabulary flow
- Search functionality
- Cross-endpoint integration

### ✅ Navigation Tests
- Link connectivity
- Route transitions
- Component integration

### ✅ User Flow Tests
- Complete browsing flow
- Search and access flow
- Lesson completion flow

## Test Reports

After running tests, a detailed report is generated:

**Location:** `COMPREHENSIVE_TEST_REPORT.json`

**Contains:**
- Summary statistics
- All lessons tested
- All endpoints tested
- All routes tested
- Error details
- Warnings
- Success rate

## Example Output

```
================================================================================
COMPREHENSIVE LESSON TEST SUITE
================================================================================

Testing against: http://localhost:5000
Started at: 2026-01-08T20:18:44.106Z

================================================================================
TESTING ALL LESSONS
================================================================================

Found 50 lessons to test

[TEST 1] Lesson 1: Introduction to English
✓ PASSED: Lesson 1: Introduction to English

[TEST 2] Lesson 2: Basic Greetings
✓ PASSED: Lesson 2: Basic Greetings

...

================================================================================
TEST RESULTS SUMMARY
================================================================================

Total Tests: 150
Passed: 148
Failed: 2
Warnings: 5

Lessons Tested: 50
Endpoints Tested: 45
Routes Tested: 11

Detailed report saved to: COMPREHENSIVE_TEST_REPORT.json
```

## Troubleshooting

### Server Not Running
**Error:** `Failed to fetch lessons: 404`

**Solution:**
1. Start server: `npm run dev`
2. Or use: `npm run test:everything` (auto-starts server)

### Port Already in Use
**Error:** `Port 5000 already in use`

**Solution:**
1. Change server port or kill existing process
2. Set `TEST_BASE_URL` to match your server port

### Timeout Errors
**Error:** `Request timeout`

**Solution:**
- Increase timeout: Set `TIMEOUT` environment variable
- Check server performance
- Check network connectivity

### Test Failures

**Common Issues:**
1. **Missing data:** Some endpoints may not have data (warnings, not failures)
2. **Auth required:** Some endpoints require authentication (expected 401)
3. **Server errors:** Check server logs for actual errors

## Continuous Integration

Add to CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run Comprehensive Tests
  run: |
    npm run dev &
    sleep 10
    npm run test:all-lessons
```

## Best Practices

1. **Run tests before deployment**
2. **Fix all failures before merging**
3. **Review warnings for potential issues**
4. **Keep test reports in version control**
5. **Update tests when adding new features**

## Advanced Usage

### Test Specific Lessons

Modify the test script to test only specific lessons:

```javascript
// In comprehensive-lesson-test.cjs
const lessons = lessonsResponse.body.filter(l => l.id <= 10); // Test first 10
```

### Custom Test Suite

Create custom test file:

```javascript
const { test, testAllLessons } = require('./scripts/comprehensive-lesson-test.cjs');

async function customTests() {
  await testAllLessons();
  // Add your custom tests
}

customTests();
```

## Support

For issues or questions:
1. Check test report JSON file
2. Review server logs
3. Check API documentation
4. Verify database has data

---

**Last Updated:** 2026-01-08
**Test Framework:** Custom Node.js + HTTP
**Coverage:** 100% of lessons, all endpoints, all routes
