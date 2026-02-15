#!/usr/bin/env tsx
/**
 * Real-World Test Orchestrator
 * Master script that coordinates all phases of the resiliency testing
 * Implements the complete RAJKUMAR.MD specification
 */

import { spawn, ChildProcess } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import logger from '../server/logger';
import { TestUserOrchestrator } from './seed-test-users';
import { ChaosInjectionTester } from './chaos-injection-test';
import { PlaywrightStressTester } from '../tests/e2e/playwright-stress-test';

interface TestPhaseResult {
  phase: string;
  success: boolean;
  duration: number;
  details: any;
  errors: string[];
}

interface OrchestrationResult {
  success: boolean;
  totalDuration: number;
  phases: TestPhaseResult[];
  summary: {
    phasesCompleted: number;
    phasesTotal: number;
    criticalFailures: string[];
    recommendations: string[];
  };
}

class RealWorldTestOrchestrator {
  private results: TestPhaseResult[] = [];
  private startTime: number = 0;
  private dockerProcess: ChildProcess | null = null;
  private k6Process: ChildProcess | null = null;

  constructor() {
    this.startTime = Date.now();
  }

  private addPhaseResult(phase: string, success: boolean, duration: number, details: any = {}, errors: string[] = []) {
    this.results.push({
      phase,
      success,
      duration,
      details,
      errors
    });

    const status = success ? '✅ PASS' : '❌ FAIL';
    logger.info(`${status} Phase: ${phase} (${duration}ms)`);

    if (errors.length > 0) {
      logger.error(`Errors in ${phase}:`, errors);
    }
  }

  async phase1_TestDataOrchestration(): Promise<boolean> {
    const phaseStart = Date.now();
    logger.info('🌱 Phase 1: Test Data Orchestration');

    try {
      const orchestrator = new TestUserOrchestrator();

      // Clean up any existing test users first
      logger.info('Cleaning up existing test users...');
      const cleanupResult = await orchestrator.cleanupTestUsers();

      // Seed new test users
      logger.info('Seeding 500 test users...');
      const seedResult = await orchestrator.seedUsers();

      if (!seedResult.success) {
        this.addPhaseResult(
          'Test Data Orchestration',
          false,
          Date.now() - phaseStart,
          { created: seedResult.created },
          seedResult.errors
        );
        return false;
      }

      // Verify test users
      const verifyResult = await orchestrator.verifyTestUsers();

      this.addPhaseResult(
        'Test Data Orchestration',
        true,
        Date.now() - phaseStart,
        {
          usersCreated: seedResult.created,
          usersVerified: verifyResult.count,
          sampleUsers: verifyResult.sampleUsers.slice(0, 3)
        }
      );

      return true;

    } catch (error: any) {
      this.addPhaseResult(
        'Test Data Orchestration',
        false,
        Date.now() - phaseStart,
        {},
        [`Phase 1 error: ${error.message}`]
      );
      return false;
    }
  }

  async phase2_K6LoadTesting(): Promise<boolean> {
    const phaseStart = Date.now();
    logger.info('🚀 Phase 2: K6 Load Testing');

    try {
      // Start K6 load test
      const k6Result = await this.runK6LoadTest();

      this.addPhaseResult(
        'K6 Load Testing',
        k6Result.success,
        Date.now() - phaseStart,
        k6Result.metrics,
        k6Result.errors
      );

      return k6Result.success;

    } catch (error: any) {
      this.addPhaseResult(
        'K6 Load Testing',
        false,
        Date.now() - phaseStart,
        {},
        [`Phase 2 error: ${error.message}`]
      );
      return false;
    }
  }

  async phase3_CircuitBreakerTesting(): Promise<boolean> {
    const phaseStart = Date.now();
    logger.info('💥 Phase 3: Circuit Breaker & Chaos Testing');

    try {
      const chaosConfig = {
        baseUrl: 'http://localhost:5000',
        toxiproxyUrl: 'http://localhost:8474',
        targetService: 'preet_english',
        latencyMs: 5000,
        testDurationMs: 60000,
        requestIntervalMs: 2000,
      };

      const chaosTester = new ChaosInjectionTester(chaosConfig);
      const chaosResult = await chaosTester.runFullTest();

      this.addPhaseResult(
        'Circuit Breaker Testing',
        chaosResult.success,
        Date.now() - phaseStart,
        {
          circuitBreakerTriggered: chaosResult.circuitBreakerTriggered,
          openStateDetected: chaosResult.openStateDetected,
          fallbackResponseDetected: chaosResult.fallbackResponseDetected,
          metrics: chaosResult.metrics
        },
        chaosResult.errors
      );

      return chaosResult.success;

    } catch (error: any) {
      this.addPhaseResult(
        'Circuit Breaker Testing',
        false,
        Date.now() - phaseStart,
        {},
        [`Phase 3 error: ${error.message}`]
      );
      return false;
    }
  }

  async phase4_PlaywrightE2ETesting(): Promise<boolean> {
    const phaseStart = Date.now();
    logger.info('🎭 Phase 4: Playwright E2E Stress Testing');

    try {
      const playwrightConfig = {
        baseUrl: 'http://localhost:5000',
        concurrentInstances: 5,
        testDurationMs: 120000,
        actionIntervalMs: 3000,
        headless: true
      };

      const playwrightTester = new PlaywrightStressTester(playwrightConfig);
      const playwrightResult = await playwrightTester.runStressTest();

      this.addPhaseResult(
        'Playwright E2E Testing',
        playwrightResult.success,
        Date.now() - phaseStart,
        {
          globalMetrics: playwrightResult.globalMetrics,
          instanceResults: playwrightResult.instances.map(i => ({
            id: i.id,
            actions: i.actions,
            errors: i.errors.length,
            gracefulDegradation: i.gracefulDegradation
          }))
        }
      );

      return playwrightResult.success;

    } catch (error: any) {
      this.addPhaseResult(
        'Playwright E2E Testing',
        false,
        Date.now() - phaseStart,
        {},
        [`Phase 4 error: ${error.message}`]
      );
      return false;
    }
  }

  private async runK6LoadTest(): Promise<{ success: boolean; metrics: any; errors: string[] }> {
    return new Promise((resolve) => {
      const k6Process = spawn('k6', [
        'run',
        '--out', 'json=k6-results.json',
        'tests/load/k6-config.js'
      ], {
        stdio: ['ignore', 'pipe', 'pipe'],
        env: {
          ...process.env,
          BASE_URL: 'http://localhost:5000'
        }
      });

      let stdout = '';
      let stderr = '';

      k6Process.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      k6Process.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      k6Process.on('close', async (code) => {
        const success = code === 0;
        const errors: string[] = [];

        if (stderr) {
          errors.push(`K6 stderr: ${stderr}`);
        }

        let metrics = {};
        try {
          // Try to read K6 results
          const resultsPath = path.join(process.cwd(), 'k6-results.json');
          const resultsContent = await fs.readFile(resultsPath, 'utf-8');
          const results = JSON.parse(resultsContent);

          metrics = {
            totalRequests: results.metrics?.http_reqs?.count || 0,
            avgResponseTime: results.metrics?.http_req_duration?.avg || 0,
            errorRate: results.metrics?.http_req_failed?.rate || 0,
            p95ResponseTime: results.metrics?.http_req_duration?.['p(95)'] || 0
          };
        } catch (error) {
          errors.push(`Failed to parse K6 results: ${error}`);
        }

        resolve({ success, metrics, errors });
      });

      k6Process.on('error', (error) => {
        resolve({
          success: false,
          metrics: {},
          errors: [`K6 process error: ${error.message}`]
        });
      });
    });
  }

  async startDockerEnvironment(): Promise<boolean> {
    logger.info('🐳 Starting Docker test environment...');

    return new Promise((resolve) => {
      this.dockerProcess = spawn('docker-compose', [
        '-f', 'docker-compose.test.yml',
        'up', '-d'
      ], {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      this.dockerProcess.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      this.dockerProcess.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      this.dockerProcess.on('close', (code) => {
        if (code === 0) {
          logger.info('✅ Docker environment started successfully');
          resolve(true);
        } else {
          logger.error('❌ Failed to start Docker environment');
          logger.error('Docker stderr:', stderr);
          resolve(false);
        }
      });

      this.dockerProcess.on('error', (error) => {
        logger.error('Docker process error:', error);
        resolve(false);
      });
    });
  }

  async stopDockerEnvironment(): Promise<void> {
    logger.info('🛑 Stopping Docker test environment...');

    return new Promise((resolve) => {
      const stopProcess = spawn('docker-compose', [
        '-f', 'docker-compose.test.yml',
        'down', '-v'
      ], {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      stopProcess.on('close', () => {
        logger.info('✅ Docker environment stopped');
        resolve();
      });

      stopProcess.on('error', (error) => {
        logger.warn('Docker stop error:', error);
        resolve();
      });
    });
  }

  async generateReport(): Promise<void> {
    const totalDuration = Date.now() - this.startTime;
    const successfulPhases = this.results.filter(r => r.success).length;
    const totalPhases = this.results.length;

    const criticalFailures: string[] = [];
    const recommendations: string[] = [];

    // Analyze results and generate recommendations
    this.results.forEach(result => {
      if (!result.success) {
        criticalFailures.push(`${result.phase}: ${result.errors.join(', ')}`);

        // Generate specific recommendations
        if (result.phase.includes('Data Orchestration')) {
          recommendations.push('Check database connectivity and permissions');
        } else if (result.phase.includes('K6')) {
          recommendations.push('Optimize API endpoints and add caching');
        } else if (result.phase.includes('Circuit Breaker')) {
          recommendations.push('Review circuit breaker configuration and thresholds');
        } else if (result.phase.includes('Playwright')) {
          recommendations.push('Improve UI error handling and loading states');
        }
      }
    });

    const orchestrationResult: OrchestrationResult = {
      success: successfulPhases === totalPhases,
      totalDuration,
      phases: this.results,
      summary: {
        phasesCompleted: successfulPhases,
        phasesTotal: totalPhases,
        criticalFailures,
        recommendations
      }
    };

    // Generate detailed report
    const reportContent = this.generateDetailedReport(orchestrationResult);

    // Save report
    const reportPath = path.join(process.cwd(), 'REAL_WORLD_TEST_REPORT.md');
    await fs.writeFile(reportPath, reportContent);

    // Save JSON report
    const jsonReportPath = path.join(process.cwd(), 'real-world-test-results.json');
    await fs.writeFile(jsonReportPath, JSON.stringify(orchestrationResult, null, 2));

    logger.info(`📊 Reports generated: ${reportPath}, ${jsonReportPath}`);
  }

  private generateDetailedReport(result: OrchestrationResult): string {
    const timestamp = new Date().toISOString();
    const status = result.success ? '✅ PASS' : '❌ FAIL';

    return `# Real-World Resiliency & Load Testing Report

**Generated:** ${timestamp}
**Overall Status:** ${status}
**Total Duration:** ${(result.totalDuration / 1000).toFixed(2)} seconds
**Phases Completed:** ${result.summary.phasesCompleted}/${result.summary.phasesTotal}

## Executive Summary

This report documents the results of comprehensive real-world testing for PREET_ENGLISH, following the RAJKUMAR.MD specification. The testing validates system resilience under concurrent load, database integrity, and circuit breaker functionality.

## Test Results by Phase

${result.phases.map(phase => `
### ${phase.phase}

**Status:** ${phase.success ? '✅ PASS' : '❌ FAIL'}
**Duration:** ${(phase.duration / 1000).toFixed(2)} seconds

${phase.success ? '**Results:**' : '**Errors:**'}
${phase.success ?
        Object.entries(phase.details).map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`).join('\n') :
        phase.errors.map(error => `- ${error}`).join('\n')
      }
`).join('\n')}

## Critical Failures

${result.summary.criticalFailures.length > 0 ?
        result.summary.criticalFailures.map(failure => `- ${failure}`).join('\n') :
        'No critical failures detected.'
      }

## Recommendations

${result.summary.recommendations.length > 0 ?
        result.summary.recommendations.map(rec => `- ${rec}`).join('\n') :
        'System performed within acceptable parameters.'
      }

## Compliance Assessment

- **Real Database Testing:** ${result.phases.find(p => p.phase.includes('Data'))?.success ? '✅' : '❌'} No mocks used
- **Concurrent Load Handling:** ${result.phases.find(p => p.phase.includes('K6'))?.success ? '✅' : '❌'} 100 concurrent users tested
- **Circuit Breaker Functionality:** ${result.phases.find(p => p.phase.includes('Circuit'))?.success ? '✅' : '❌'} Chaos injection validated
- **UI Graceful Degradation:** ${result.phases.find(p => p.phase.includes('Playwright'))?.success ? '✅' : '❌'} E2E stress testing completed

## Next Steps

${result.success ?
        '✅ System is ready for production deployment with validated resilience patterns.' :
        '❌ Address critical failures before production deployment.'
      }

---
*Report generated by Real-World Test Orchestrator*
`;
  }

  async runFullTestSuite(): Promise<OrchestrationResult> {
    logger.info('🎯 Starting Real-World Resiliency & Load Testing Suite');
    logger.info('Following RAJKUMAR.MD specification');

    try {
      // Start Docker environment (optional - can run against existing server)
      const useDocker = process.env.USE_DOCKER === 'true';
      if (useDocker) {
        const dockerStarted = await this.startDockerEnvironment();
        if (!dockerStarted) {
          throw new Error('Failed to start Docker environment');
        }

        // Wait for services to be ready
        await new Promise(resolve => setTimeout(resolve, 30000));
      }

      // Phase 1: Test Data Orchestration
      const phase1Success = await this.phase1_TestDataOrchestration();
      if (!phase1Success) {
        logger.error('❌ Phase 1 failed - aborting test suite');
      }

      // Phase 2: K6 Load Testing (continue even if Phase 1 failed for partial results)
      const phase2Success = await this.phase2_K6LoadTesting();

      // Phase 3: Circuit Breaker Testing
      const phase3Success = await this.phase3_CircuitBreakerTesting();

      // Phase 4: Playwright E2E Testing
      const phase4Success = await this.phase4_PlaywrightE2ETesting();

      // Generate comprehensive report
      await this.generateReport();

      const totalDuration = Date.now() - this.startTime;
      const overallSuccess = phase1Success && phase2Success && phase3Success && phase4Success;

      logger.info(`🏁 Test suite completed in ${(totalDuration / 1000).toFixed(2)} seconds`);
      logger.info(`📊 Overall result: ${overallSuccess ? '✅ PASS' : '❌ FAIL'}`);

      return {
        success: overallSuccess,
        totalDuration,
        phases: this.results,
        summary: {
          phasesCompleted: this.results.filter(r => r.success).length,
          phasesTotal: this.results.length,
          criticalFailures: this.results.filter(r => !r.success).map(r => r.phase),
          recommendations: []
        }
      };

    } catch (error: any) {
      logger.error('❌ Test orchestration failed:', error);

      this.addPhaseResult(
        'Test Orchestration',
        false,
        Date.now() - this.startTime,
        {},
        [`Orchestration error: ${error.message}`]
      );

      return {
        success: false,
        totalDuration: Date.now() - this.startTime,
        phases: this.results,
        summary: {
          phasesCompleted: 0,
          phasesTotal: 4,
          criticalFailures: [`Orchestration failed: ${error.message}`],
          recommendations: ['Check system requirements and dependencies']
        }
      };

    } finally {
      // Cleanup
      if (process.env.USE_DOCKER === 'true') {
        await this.stopDockerEnvironment();
      }
    }
  }
}

// CLI Interface
async function main() {
  const orchestrator = new RealWorldTestOrchestrator();
  const result = await orchestrator.runFullTestSuite();

  // Print summary
  console.log('\n🎯 REAL-WORLD RESILIENCY & LOAD TESTING RESULTS');
  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log(`✅ Overall Success: ${result.success}`);
  console.log(`⏱️  Total Duration: ${(result.totalDuration / 1000).toFixed(2)} seconds`);
  console.log(`📊 Phases Completed: ${result.summary.phasesCompleted}/${result.summary.phasesTotal}`);

  if (result.summary.criticalFailures.length > 0) {
    console.log('\n❌ CRITICAL FAILURES:');
    result.summary.criticalFailures.forEach((failure, index) => {
      console.log(`   ${index + 1}. ${failure}`);
    });
  }

  console.log('\n📋 PHASE RESULTS:');
  result.phases.forEach((phase, index) => {
    const status = phase.success ? '✅ PASS' : '❌ FAIL';
    console.log(`   ${index + 1}. ${status} ${phase.phase} (${(phase.duration / 1000).toFixed(2)}s)`);
  });

  console.log('════════════════════════════════════════════════════════════════════════════════');
  console.log('📊 Detailed reports saved to:');
  console.log('   - REAL_WORLD_TEST_REPORT.md');
  console.log('   - real-world-test-results.json');

  // Exit with appropriate code
  process.exit(result.success ? 0 : 1);
}


// Force execution for testing
main().catch(console.error);


export { RealWorldTestOrchestrator };