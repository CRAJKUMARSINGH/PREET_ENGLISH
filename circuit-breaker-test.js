// Circuit Breaker Test - Simulates chaos injection behavior
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000';

class CircuitBreakerTester {
  constructor() {
    this.results = {
      requests: [],
      circuitBreakerEvents: [],
      startTime: Date.now()
    };
  }

  async makeRequest(endpoint, options = {}) {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        timeout: 5000,
        ...options
      });
      
      const responseTime = Date.now() - startTime;
      const result = {
        timestamp: new Date().toISOString(),
        endpoint,
        status: response.status,
        responseTime,
        success: response.ok
      };
      
      this.results.requests.push(result);
      
      // Check for circuit breaker indicators
      if (response.status === 503) {
        this.results.circuitBreakerEvents.push({
          timestamp: new Date().toISOString(),
          event: 'SERVICE_UNAVAILABLE_DETECTED',
          details: { endpoint, responseTime }
        });
      }
      
      if (response.status === 429) {
        this.results.circuitBreakerEvents.push({
          timestamp: new Date().toISOString(),
          event: 'RATE_LIMIT_TRIGGERED',
          details: { endpoint, responseTime }
        });
      }
      
      return result;
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const result = {
        timestamp: new Date().toISOString(),
        endpoint,
        status: 0,
        responseTime,
        success: false,
        error: error.message
      };
      
      this.results.requests.push(result);
      
      if (error.message.includes('timeout')) {
        this.results.circuitBreakerEvents.push({
          timestamp: new Date().toISOString(),
          event: 'TIMEOUT_DETECTED',
          details: { endpoint, responseTime, error: error.message }
        });
      }
      
      return result;
    }
  }

  async checkAuthStatus() {
    const result = await this.makeRequest('/api/auth/status');
    
    if (result.success) {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/status`);
        const data = await response.json();
        
        if (data.circuitBreaker) {
          this.results.circuitBreakerEvents.push({
            timestamp: new Date().toISOString(),
            event: 'CIRCUIT_BREAKER_STATE_DETECTED',
            details: data.circuitBreaker
          });
          
          console.log(`🔍 Circuit Breaker State: ${data.circuitBreaker.state}`);
          return data.circuitBreaker.state;
        }
      } catch (error) {
        console.log(`⚠️ Could not parse auth status: ${error.message}`);
      }
    }
    
    return 'UNKNOWN';
  }

  async runChaosTest() {
    console.log('💥 STARTING CIRCUIT BREAKER CHAOS TEST');
    console.log('🎯 Objective: Trigger circuit breaker through rapid failed requests');
    
    // Phase 1: Baseline
    console.log('\n📊 Phase 1: Baseline testing...');
    await this.makeRequest('/api/health');
    const initialState = await this.checkAuthStatus();
    console.log(`Initial Circuit Breaker State: ${initialState}`);
    
    // Phase 2: Rapid fire requests to trigger circuit breaker
    console.log('\n💥 Phase 2: Rapid fire requests to trigger protection...');
    
    const rapidRequests = [];
    for (let i = 0; i < 50; i++) {
      rapidRequests.push(
        this.makeRequest('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'invalid_user', password: 'invalid_pass' })
        })
      );
    }
    
    // Execute all requests concurrently
    const results = await Promise.allSettled(rapidRequests);
    
    console.log(`📊 Rapid requests completed: ${results.length}`);
    
    // Phase 3: Check for circuit breaker activation
    console.log('\n🔍 Phase 3: Checking for circuit breaker activation...');
    
    const finalState = await this.checkAuthStatus();
    console.log(`Final Circuit Breaker State: ${finalState}`);
    
    // Phase 4: Test fallback behavior
    console.log('\n🛡️ Phase 4: Testing fallback behavior...');
    
    const fallbackTest = await this.makeRequest('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'k6_user_0', password: 'TestPass123!' })
    });
    
    console.log(`Fallback test result: ${fallbackTest.status} (${fallbackTest.responseTime}ms)`);
    
    return this.generateReport();
  }

  generateReport() {
    const totalRequests = this.results.requests.length;
    const successfulRequests = this.results.requests.filter(r => r.success).length;
    const failedRequests = totalRequests - successfulRequests;
    
    const responseTimes = this.results.requests.map(r => r.responseTime);
    const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    
    const report = {
      summary: {
        totalRequests,
        successfulRequests,
        failedRequests,
        successRate: ((successfulRequests / totalRequests) * 100).toFixed(2),
        avgResponseTime: avgResponseTime.toFixed(2)
      },
      circuitBreakerEvents: this.results.circuitBreakerEvents,
      timeline: this.results.requests.slice(-10) // Last 10 requests
    };
    
    console.log('\n🎯 CIRCUIT BREAKER TEST RESULTS');
    console.log('════════════════════════════════════════════════════════════════════════════════');
    console.log(`📊 SUMMARY:`);
    console.log(`   Total Requests: ${report.summary.totalRequests}`);
    console.log(`   Successful: ${report.summary.successfulRequests}`);
    console.log(`   Failed: ${report.summary.failedRequests}`);
    console.log(`   Success Rate: ${report.summary.successRate}%`);
    console.log(`   Avg Response Time: ${report.summary.avgResponseTime}ms`);
    
    console.log(`\n🔄 CIRCUIT BREAKER EVENTS:`);
    if (report.circuitBreakerEvents.length > 0) {
      report.circuitBreakerEvents.forEach((event, index) => {
        console.log(`   ${index + 1}. [${event.timestamp}] ${event.event}`);
        if (event.details) {
          console.log(`      Details: ${JSON.stringify(event.details)}`);
        }
      });
    } else {
      console.log('   No circuit breaker events detected');
    }
    
    console.log(`\n⏱️ TIMELINE (Last 10 requests):`);
    report.timeline.forEach((req, index) => {
      const status = req.success ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${req.endpoint} - ${req.status} (${req.responseTime}ms)`);
    });
    
    console.log('════════════════════════════════════════════════════════════════════════════════');
    
    return report;
  }
}

// Run the test
const tester = new CircuitBreakerTester();
tester.runChaosTest().catch(console.error);