# AI Agent Task: Real-World Resiliency & Load Testing

## 1. Context & Objective

The application located at `https://github.com/CRAJKUMARSINGH/PREET_ENGLISH.git` requires a "Real-World" validation suite. You are to move away from unit testing/mocking and implement an integration-heavy performance suite.

The goal is to prove the application can handle **concurrent sessions**, manage **database integrity under load**, and verify that **Circuit Breakers** (Resilience4j or similar) actually trip when downstream services or databases latency increases.

## 2. Phase 1: Test Data Orchestration

Develop a script (Node.js or Python) that interacts directly with the production/staging database (PostgreSQL/MongoDB) to:

* **Seed Users:** Create 500 unique test users with valid encrypted passwords and necessary profile relations.
* **State Management:** Ensure each user has a "Ready" state for login.
* **Cleanup:** Provide a teardown script to remove these records via UUID prefixing to prevent database bloat.

## 3. Phase 2: Concurrent Login & Session Load (K6)

Create a `load-test.js` script using **K6** (or Locust) that:

* **Simulates VUs (Virtual Users):** Ramp up to 100 concurrent users over 2 minutes.
* **Flow:** 1. POST to `/api/auth/login`.
2. Extract JWT/Session Cookie.
3. Perform a GET on a protected resource (e.g., `/api/user/profile`).
4. Simulate "Think Time" (random 1-3 seconds).
* **Thresholds:** Set a failure criteria of `http_req_duration < 500ms` for 95% of requests.

## 4. Phase 3: Circuit Breaker Triggering

Write a "Chaos Injection" script that targets the backend:

* **Dependency Simulation:** If the app calls an external API or heavy DB query, use a tool like **Toxiproxy** or a simple interceptor to inject a 5-second latency.
* **Verification:** The test must prove that after  failed/slow attempts, the system returns a `503 Service Unavailable` or a fallback response immediately (the Circuit Breaker "Open" state) without hitting the database.
* **Metric:** Log the exact timestamp the breaker opens and when it transitions back to "Half-Open."

## 5. Phase 4: Full-Stack E2E Stress (Playwright)

Create a Playwright script that runs in "Headed" mode for 5 concurrent instances:

* **Visual Validation:** Ensure that during the load test, the UI displays a "Server Busy" or "Loading" state gracefully rather than a white screen or raw 500 error.

## 6. Deliverables Required

1. **`docker-compose.test.yml`**: To spin up the App, DB, and Toxiproxy in an isolated environment.
2. **`scripts/seed-users.sql`** or **`.js`**: For real database population.
3. **`tests/load/k6-config.js`**: The load script with thresholds.
4. **`REPORTING_TEMPLATE.md`**: A summary file that captures:
* Peak Response Time.
* Error Rate during Circuit Breaker trip.
* Database CPU/Memory usage during the peak 100-user load.



## 7. Constraints

* **NO MOCKS:** Do not mock the database or the Auth service.
* **REAL ENCRYPTION:** Use the actual app logic to generate password hashes so login attempts are authentic.
* **CLEAN EXIT:** If the error rate exceeds 10%, the test must fail the CI/CD pipeline immediately.
