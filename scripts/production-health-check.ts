#!/usr/bin/env node

/**
 * Production Health Check Script
 * Tests critical endpoints to verify deployment is working
 */

import fetch from 'node-fetch';

interface HealthCheckResult {
  endpoint: string;
  status: 'pass' | 'fail' | 'warn';
  responseTime: number;
  message: string;
  details?: any;
}

class ProductionHealthChecker {
  private baseUrl: string;
  private results: HealthCheckResult[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  async checkEndpoint(
    path: string, 
    expectedStatus: number = 200,
    timeout: number = 10000
  ): Promise<HealthCheckResult> {
    const url = `${this.baseUrl}${path}`;
    const startTime = Date.now();
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'PREET_ENGLISH-HealthCheck/1.0'
        }
      });
      
      clearTimeout(timeoutId);
      const responseTime = Date.now() - startTime;
      
      if (response.status === expectedStatus) {
        const data = await response.json().catch(() => ({}));
        return {
          endpoint: path,
          status: 'pass',
          responseTime,
          message: `✅ ${response.status} - ${responseTime}ms`,
          details: data
        };
      } else {
        return {
          endpoint: path,
          status: 'fail',
          responseTime,
          message: `❌ Expected ${expectedStatus}, got ${response.status}`,
          details: { status: response.status, statusText: response.statusText }
        };
      }
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      if (error.name === 'AbortError') {
        return {
          endpoint: path,
          status: 'fail',
          responseTime,
          message: `⏰ Timeout after ${timeout}ms`
        };
      }
      
      return {
        endpoint: path,
        status: 'fail',
        responseTime,
        message: `🔥 ${error.message}`
      };
    }
  }

  async runHealthChecks(): Promise<void> {
    console.log(`🏥 Running health checks for: ${this.baseUrl}\n`);
    
    // Critical endpoints to test
    const checks = [
      { path: '/api/health', name: 'System Health' },
      { path: '/api/ai/health', name: 'AI Service Health' },
      { path: '/api/status', name: 'System Status' },
      { path: '/', name: 'Frontend Loading', expectedStatus: 200 }
    ];

    for (const check of checks) {
      console.log(`Testing ${check.name}...`);
      const result = await this.checkEndpoint(check.path, check.expectedStatus);
      this.results.push(result);
      console.log(`  ${result.message}`);
      
      if (result.details && result.status === 'pass') {
        if (check.path === '/api/health') {
          console.log(`    Database: ${result.details.database}`);
          console.log(`    OpenAI: ${result.details.openai}`);
          console.log(`    Environment: ${result.details.environment}`);
        } else if (check.path === '/api/ai/health') {
          console.log(`    AI Status: ${result.details.status}`);
          console.log(`    Fallback Mode: ${result.details.fallbackMode}`);
        }
      }
      console.log('');
    }
  }

  async testAIFunctionality(): Promise<void> {
    console.log('🤖 Testing AI functionality...\n');
    
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Hello, test message for health check'
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ AI Chat endpoint working');
        console.log(`   Response: ${data.response?.substring(0, 100)}...`);
      } else {
        console.log(`❌ AI Chat endpoint failed: ${response.status}`);
      }
    } catch (error: any) {
      console.log(`🔥 AI Chat test failed: ${error.message}`);
    }
    
    console.log('');
  }

  async testUserFlow(): Promise<void> {
    console.log('👤 Testing critical user flows...\n');
    
    // Test lesson loading (if endpoint exists)
    try {
      const response = await fetch(`${this.baseUrl}/api/lessons`);
      if (response.ok) {
        console.log('✅ Lessons API working');
      } else {
        console.log(`⚠️  Lessons API returned: ${response.status}`);
      }
    } catch (error) {
      console.log('⚠️  Lessons API not available (may be normal)');
    }
    
    console.log('');
  }

  generateReport(): void {
    console.log('📊 HEALTH CHECK SUMMARY\n');
    console.log('='.repeat(50));
    
    const passed = this.results.filter(r => r.status === 'pass').length;
    const failed = this.results.filter(r => r.status === 'fail').length;
    const warned = this.results.filter(r => r.status === 'warn').length;
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️  Warnings: ${warned}`);
    console.log(`📈 Total: ${this.results.length}`);
    
    const avgResponseTime = this.results
      .filter(r => r.status === 'pass')
      .reduce((sum, r) => sum + r.responseTime, 0) / Math.max(passed, 1);
    
    console.log(`⏱️  Average Response Time: ${avgResponseTime.toFixed(0)}ms`);
    
    console.log('\n' + '='.repeat(50));
    
    if (failed === 0) {
      console.log('🎉 ALL CHECKS PASSED - Your app is ready for users!');
    } else if (failed <= 1) {
      console.log('⚠️  MOSTLY HEALTHY - Minor issues detected');
    } else {
      console.log('🚨 CRITICAL ISSUES - App may fail for real users');
      console.log('\nFailed checks:');
      this.results
        .filter(r => r.status === 'fail')
        .forEach(r => console.log(`  - ${r.endpoint}: ${r.message}`));
    }
    
    console.log('\n📋 Next steps:');
    if (failed > 0) {
      console.log('1. Check Vercel logs: vercel logs your-app.vercel.app');
      console.log('2. Verify environment variables in Vercel dashboard');
      console.log('3. Test OpenAI API key: https://platform.openai.com/playground');
      console.log('4. Check database connection string');
    } else {
      console.log('1. Monitor real user sessions');
      console.log('2. Set up error tracking (Sentry)');
      console.log('3. Add performance monitoring');
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const url = args[0] || 'http://localhost:5000';
  
  if (!url) {
    console.error('Usage: npm run health-check <url>');
    console.error('Example: npm run health-check https://your-app.vercel.app');
    process.exit(1);
  }
  
  console.log('🏥 PREET_ENGLISH Production Health Check');
  console.log('==========================================\n');
  
  const checker = new ProductionHealthChecker(url);
  
  try {
    await checker.runHealthChecks();
    await checker.testAIFunctionality();
    await checker.testUserFlow();
    checker.generateReport();
  } catch (error) {
    console.error('🔥 Health check failed:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { ProductionHealthChecker };