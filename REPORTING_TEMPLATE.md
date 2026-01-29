# Real-World Resiliency Test Report

**Date:** [Date]
**Run ID:** [CI/Build ID]

## 1. Executive Summary

| Metric | Result | Target | Pass/Fail |
| :--- | :--- | :--- | :--- |
| **Peak VUs** | 100 | 100 | ✅ |
| **P95 Response Time** | [Value]ms | < 500ms | ❓ |
| **Error Rate** | [Value]% | < 10% | ❓ |
| **Circuit Breaker** | [Triggered/Not Triggered] | Triggered | ❓ |

## 2. Load Testing (K6)

### Configuration
*   **Script:** `tests/load/k6-config.js`
*   **Ramp-up:** 30s to 20 users -> 1m to 100 users.
*   **Flow:** Login -> Profile -> Sleep(1-3s).

### Results
*   **http_req_duration (p95):** `[INSERT K6 OUTPUT HERE]`
*   **Total Requests:** `[INSERT K6 OUTPUT HERE]`
*   **Failures:** `[INSERT K6 OUTPUT HERE]`

> **Observation:** [Did the database choke? Did connection pool fill up?]

## 3. Chaos Engineering (Circuit Breaker)

### Scenario
*   **Injection:** 5000ms latency injected via Toxiproxy.
*   **Component:** PostgreSQL Connection / Login Auth Service.

### Timeline
*   `[HH:MM:SS]` - Latency Injected.
*   `[HH:MM:SS]` - Circuit Breaker State change: `CLOSED` -> `OPEN`.
*   `[HH:MM:SS]` - Fallback responses (503) served.
*   `[HH:MM:SS]` - Latency removed.
*   `[HH:MM:SS]` - Circuit Breaker Recovery: `OPEN` -> `HALF_OPEN` -> `CLOSED`.

## 4. Resource Utilization (Docker Stats)

| Container | Avg CPU | Max CPU | Avg Memory | Max Memory |
| :--- | :---: | :---: | :---: | :---: |
| `preet_english_test_app` | % | % | MB | MB |
| `preet_english_test_db` | % | % | MB | MB |

## 5. Visual Validation (Playwright)

*   [ ] UI displayed "Loading..." skeletons vs White Screen.
*   [ ] Error Toasts appeared gracefully.
*   [ ] No raw JSON stack traces leaked to user.

## Sign-off
**Evaluator:** AI Agent / [Your Name]
**Status:** [Go / No-Go]