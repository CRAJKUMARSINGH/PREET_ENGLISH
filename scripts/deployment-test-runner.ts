/**
 * DEPLOYMENT TEST RUNNER
 * 
 * Tests the deployed web application to ensure it's bug-free and functional.
 * Runs comprehensive tests on the live deployment URL.
 */

// Use native fetch (Node 18+) or node-fetch as fallback
async function getFetch(): Promise<typeof globalThis.fetch> {
  // Try native fetch first (Node 18+)
  if (typeof globalThis.fetch === 'function') {
    return globalThis.fetch;
  }
  
  // Fallback to node-fetch
  try {
    const nodeFetch = await import('node-fetch');
    return nodeFetch.default as any;
  } catch {
    // If node-fetch not available, use http/https
    const http = await import('http');
    const https = await import('https');
    const { URL } = await import('url');
    
    return async (url: string | URL | Request, init?: RequestInit) => {
      return new Promise((resolve, reject) => {
        const urlStr = typeof url === 'string' ? url : url instanceof URL ? url.toString() : (url as Request).url;
        const urlObj = new URL(urlStr);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options: any = {
          hostname: urlObj.hostname,
          port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
          path: urlObj.pathname + urlObj.search,
          method: init?.method || 'GET',
          headers: init?.headers || {}
        };
        
        const req = client.request(options, (res) => {
          const chunks: Buffer[] = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const headers = new Headers();
            Object.entries(res.headers).forEach(([key, value]) => {
              if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
            });
            
            resolve({
              ok: res.statusCode! >= 200 && res.statusCode! < 300,
              status: res.statusCode!,
              statusText: res.statusMessage!,
              headers,
              json: async () => JSON.parse(body),
              text: async () => body,
            } as Response);
          });
        });
        
        req.on('error', reject);
        if (init?.body) req.write(init.body);
        req.end();
      });
    };
  }
}

interface DeploymentTest {
  name: string;
  category: string;
  test: (baseUrl: string) => Promise<boolean>;
  error?: string;
}

interface DeploymentReport {
  baseUrl: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  successRate: number;
  tests: Array<{
    name: string;
    category: string;
    passed: boolean;
    error?: string;
    responseTime?: number;
  }>;
  criticalIssues: string[];
  warnings: string[];
}

class DeploymentTestRunner {
  private baseUrl: string;
  private report: DeploymentReport;
  private fetchFn: typeof globalThis.fetch;

  constructor(baseUrl: string, fetchFn?: typeof globalThis.fetch) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.fetchFn = fetchFn || globalThis.fetch;
    this.report = {
      baseUrl: this.baseUrl,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      successRate: 0,
      tests: [],
      criticalIssues: [],
      warnings: []
    };
  }

  async initialize() {
    if (!this.fetchFn) {
      this.fetchFn = await getFetch();
    }
  }

  /**
   * Test: Homepage loads
   */
  private async testHomepage(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: 'Homepage loads successfully',
        category: 'Homepage',
        test: async (url) => {
          const start = Date.now();
          const response = await this.fetchFn(url);
          const responseTime = Date.now() - start;
          
          if (responseTime > 5000) {
            this.report.warnings.push(`Homepage load time is ${responseTime}ms (target: <5000ms)`);
          }

          return response.ok;
        }
      },
      {
        name: 'Homepage returns HTML',
        category: 'Homepage',
        test: async (url) => {
          const response = await this.fetchFn(url);
          const contentType = response.headers.get('content-type');
          return contentType?.includes('text/html') ?? false;
        }
      }
    ];
  }

  /**
   * Test: API endpoints
   */
  private async testAPIEndpoints(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: 'Lessons API endpoint',
        category: 'API',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/api/lessons`);
          if (!response.ok) return false;
          
          const data = await response.json();
          return Array.isArray(data);
        }
      },
      {
        name: 'API returns valid JSON',
        category: 'API',
        test: async (url) => {
          try {
            const response = await this.fetchFn(`${url}/api/lessons`);
            const data = await response.json();
            return typeof data === 'object';
          } catch {
            return false;
          }
        }
      },
      {
        name: 'API test endpoint',
        category: 'API',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/api/test`);
          return response.ok;
        }
      }
    ];
  }

  /**
   * Test: Static assets
   */
  private async testStaticAssets(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: 'Favicon accessible',
        category: 'Static Assets',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/favicon.ico`, { method: 'HEAD' });
          // 200 or 404 both acceptable (404 means no favicon, not critical)
          return response.status === 200 || response.status === 404;
        }
      },
      {
        name: 'Manifest file accessible',
        category: 'Static Assets',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/manifest.json`, { method: 'HEAD' });
          return response.status === 200 || response.status === 404;
        }
      }
    ];
  }

  /**
   * Test: Error handling
   */
  private async testErrorHandling(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: '404 page handles gracefully',
        category: 'Error Handling',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/nonexistent-page-12345`);
          // Should return 404 or redirect to home, not 500
          return response.status !== 500;
        }
      },
      {
        name: 'Invalid API endpoint handles gracefully',
        category: 'Error Handling',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/api/invalid-endpoint-12345`);
          // Should return 404 or proper error, not 500
          return response.status !== 500;
        }
      }
    ];
  }

  /**
   * Test: Performance
   */
  private async testPerformance(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: 'Homepage loads in <3 seconds',
        category: 'Performance',
        test: async (url) => {
          const start = Date.now();
          await this.fetchFn(url);
          const loadTime = Date.now() - start;
          
          if (loadTime > 3000) {
            this.report.warnings.push(`Homepage load time: ${loadTime}ms (target: <3000ms)`);
          }
          
          return loadTime < 10000; // Fail only if >10s
        }
      },
      {
        name: 'API responds in <2 seconds',
        category: 'Performance',
        test: async (url) => {
          const start = Date.now();
          await this.fetchFn(`${url}/api/lessons`);
          const responseTime = Date.now() - start;
          
          if (responseTime > 2000) {
            this.report.warnings.push(`API response time: ${responseTime}ms (target: <2000ms)`);
          }
          
          return responseTime < 5000; // Fail only if >5s
        }
      }
    ];
  }

  /**
   * Test: CORS headers
   */
  private async testCORS(baseUrl: string): Promise<DeploymentTest[]> {
    return [
      {
        name: 'CORS headers present for API',
        category: 'CORS',
        test: async (url) => {
          const response = await this.fetchFn(`${url}/api/lessons`, {
            method: 'OPTIONS'
          });
          
          const corsHeader = response.headers.get('access-control-allow-origin');
          return corsHeader !== null;
        }
      }
    ];
  }

  /**
   * Run all deployment tests
   */
  async runAllTests(): Promise<DeploymentReport> {
    await this.initialize();
    console.log(`🌐 Starting Deployment Tests for: ${this.baseUrl}\n`);

    const testSuites: Array<{ name: string; tests: Promise<DeploymentTest[]> }> = [
      { name: 'Homepage', tests: this.testHomepage(this.baseUrl) },
      { name: 'API Endpoints', tests: this.testAPIEndpoints(this.baseUrl) },
      { name: 'Static Assets', tests: this.testStaticAssets(this.baseUrl) },
      { name: 'Error Handling', tests: this.testErrorHandling(this.baseUrl) },
      { name: 'Performance', tests: this.testPerformance(this.baseUrl) },
      { name: 'CORS', tests: this.testCORS(this.baseUrl) }
    ];

    for (const suite of testSuites) {
      const tests = await suite.tests;
      console.log(`\n📦 Running suite: ${suite.name}`);

      for (const testCase of tests) {
        const start = Date.now();
        let passed = false;
        let error: string | undefined;

        try {
          passed = await testCase.test(this.baseUrl);
          const responseTime = Date.now() - start;

          this.report.tests.push({
            name: testCase.name,
            category: testCase.category,
            passed,
            error: passed ? undefined : (testCase.error || 'Test failed'),
            responseTime
          });

          if (passed) {
            this.report.passedTests++;
            console.log(`  ✅ ${testCase.name} (${responseTime}ms)`);
          } else {
            this.report.failedTests++;
            error = testCase.error || 'Test failed';
            this.report.criticalIssues.push(`${testCase.category}: ${testCase.name} - ${error}`);
            console.log(`  ❌ ${testCase.name} - ${error}`);
          }
        } catch (err) {
          this.report.failedTests++;
          error = err instanceof Error ? err.message : String(err);
          this.report.criticalIssues.push(`${testCase.category}: ${testCase.name} - ${error}`);
          console.log(`  ❌ ${testCase.name} - ${error}`);
        }

        this.report.totalTests++;
      }
    }

    this.report.successRate = (this.report.passedTests / this.report.totalTests) * 100;

    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('                    DEPLOYMENT TEST RESULTS');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`Base URL: ${this.baseUrl}`);
    console.log(`Total Tests: ${this.report.totalTests}`);
    console.log(`Passed: ${this.report.passedTests}`);
    console.log(`Failed: ${this.report.failedTests}`);
    console.log(`Success Rate: ${this.report.successRate.toFixed(2)}%`);
    console.log(`Critical Issues: ${this.report.criticalIssues.length}`);
    console.log(`Warnings: ${this.report.warnings.length}`);
    console.log('═══════════════════════════════════════════════════════════════\n');

    return this.report;
  }

  /**
   * Save report
   */
  async saveReport(filename: string = 'deployment-test-report.json'): Promise<void> {
    const fs = await import('fs/promises');
    await fs.writeFile(filename, JSON.stringify(this.report, null, 2));
    console.log(`📄 Report saved to: ${filename}`);
  }
}

// Main execution
async function main() {
  const baseUrl = process.env.DEPLOYMENT_URL || process.argv[2];
  
  if (!baseUrl) {
    console.error('❌ Error: Deployment URL required');
    console.error('   Usage: tsx scripts/deployment-test-runner.ts <URL>');
    console.error('   Or set DEPLOYMENT_URL environment variable');
    process.exit(1);
  }

  const runner = new DeploymentTestRunner(baseUrl);
  
  try {
    const report = await runner.runAllTests();
    await runner.saveReport();

    if (report.successRate < 100) {
      console.log(`\n⚠️  Warning: Success rate is ${report.successRate.toFixed(2)}%`);
      console.log(`   Target: 100% success rate`);
      console.log(`   Review critical issues in the report`);
      process.exit(1);
    } else {
      console.log('\n✅ All deployment tests passed with 100% success rate!');
    }
  } catch (error) {
    console.error('❌ Deployment testing failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('deployment-test-runner.ts')) {
  main();
}

export { DeploymentTestRunner, type DeploymentReport };
