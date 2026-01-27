#!/usr/bin/env tsx
/**
 * BRST PRAGMATIC TEST RUNNER
 * 
 * Runs comprehensive tests and generates actionable reports
 */

import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface TestResult {
  category: string;
  passed: number;
  failed: number;
  total: number;
  duration: number;
  failures: string[];
}

class BRSTTestRunner {
  private results: TestResult[] = [];
  private startTime: number = 0;

  async runAllTests(): Promise<void> {
    console.log('🚀 BRST PRAGMATIC TEST SUITE');
    console.log('=' .repeat(80));
    console.log('🎯 OBJECTIVE: Verify production readiness');
    console.log('📊 FOCUS: Real issues, actionable insights\n');

    this.startTime = Date.now();

    await this.runTestCategory('Database Integrity');
    await this.runTestCategory('Content Quality');
    await this.runTestCategory('Data Integrity');
    await this.runTestCategory('Performance');
    await this.runTestCategory('Hindi Readability');
    await this.runTestCategory('Production Readiness');

    await this.generateReport();
  }

  private async runTestCategory(category: string): Promise<void> {
    console.log(`\n📋 Running: ${category}`);
    console.log('-'.repeat(80));

    const start = Date.now();
    
    try {
      const result = await this.executeJest(category);
      const duration = Date.now() - start;

      this.results.push({
        category,
        passed: result.passed,
        failed: result.failed,
        total: result.total,
        duration,
        failures: result.failures
      });

      if (result.failed === 0) {
        console.log(`✅ ${category}: ${result.passed}/${result.total} passed (${duration}ms)`);
      } else {
        console.log(`⚠️  ${category}: ${result.passed}/${result.total} passed, ${result.failed} failed (${duration}ms)`);
        result.failures.forEach(f => console.log(`   - ${f}`));
      }

    } catch (error) {
      console.error(`❌ ${category}: Error running tests`, error);
      this.results.push({
        category,
        passed: 0,
        failed: 1,
        total: 1,
        duration: Date.now() - start,
        failures: [error instanceof Error ? error.message : 'Unknown error']
      });
    }
  }

  private async executeJest(category: string): Promise<{
    passed: number;
    failed: number;
    total: number;
    failures: string[];
  }> {
    return new Promise((resolve) => {
      const jestProcess = spawn('npx', [
        'jest',
        'tests/brst-pragmatic-suite.test.ts',
        '--testNamePattern', category,
        '--verbose',
        '--no-coverage'
      ], { stdio: 'pipe' });

      let output = '';
      jestProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      jestProcess.stderr.on('data', (data) => {
        output += data.toString();
      });

      jestProcess.on('close', (code) => {
        const result = this.parseJestOutput(output);
        resolve(result);
      });
    });
  }

  private parseJestOutput(output: string): {
    passed: number;
    failed: number;
    total: number;
    failures: string[];
  } {
    const result = {
      passed: 0,
      failed: 0,
      total: 0,
      failures: [] as string[]
    };

    // Parse test counts
    const passMatch = output.match(/(\d+) passed/);
    const failMatch = output.match(/(\d+) failed/);
    const totalMatch = output.match(/Tests:\s+(\d+)/);

    if (passMatch) result.passed = parseInt(passMatch[1]);
    if (failMatch) result.failed = parseInt(failMatch[1]);
    if (totalMatch) result.total = parseInt(totalMatch[1]);
    else result.total = result.passed + result.failed;

    // Extract failure messages
    const failureMatches = output.match(/● .+$/gm) || [];
    result.failures = failureMatches.map(f => f.replace('● ', '').trim());

    return result;
  }

  private async generateReport(): Promise<void> {
    const totalDuration = Date.now() - this.startTime;
    const totalTests = this.results.reduce((sum, r) => sum + r.total, 0);
    const totalPassed = this.results.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = this.results.reduce((sum, r) => sum + r.failed, 0);

    console.log('\n' + '='.repeat(80));
    console.log('📊 BRST TEST RESULTS SUMMARY');
    console.log('='.repeat(80));

    console.log(`\n🎯 Overall Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${totalPassed} (${((totalPassed/totalTests)*100).toFixed(1)}%)`);
    console.log(`   Failed: ${totalFailed} (${((totalFailed/totalTests)*100).toFixed(1)}%)`);
    console.log(`   Duration: ${(totalDuration/1000).toFixed(2)}s`);

    console.log(`\n📋 Category Breakdown:`);
    for (const result of this.results) {
      const status = result.failed === 0 ? '✅' : '⚠️ ';
      const passRate = ((result.passed / result.total) * 100).toFixed(1);
      console.log(`   ${status} ${result.category.padEnd(25)} ${result.passed}/${result.total} (${passRate}%)`);
    }

    // Calculate grade
    const grade = this.calculateGrade(totalPassed, totalTests);
    console.log(`\n🏆 Production Readiness Grade: ${grade.score}/10 ${grade.emoji}`);
    console.log(`   Status: ${grade.status}`);

    // Generate recommendations
    if (totalFailed > 0) {
      console.log(`\n💡 Recommendations:`);
      const failedCategories = this.results.filter(r => r.failed > 0);
      for (const category of failedCategories) {
        console.log(`   - Fix ${category.category}: ${category.failures.length} issues`);
        category.failures.slice(0, 3).forEach(f => {
          console.log(`     • ${f}`);
        });
      }
    }

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        totalPassed,
        totalFailed,
        passRate: (totalPassed / totalTests) * 100,
        duration: totalDuration,
        grade: grade.score
      },
      categories: this.results,
      recommendations: this.generateRecommendations()
    };

    const reportPath = path.join(process.cwd(), 'BRST_TEST_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);

    console.log('\n' + '='.repeat(80));
    console.log(`✨ BRST Testing Complete!`);
    console.log('='.repeat(80) + '\n');
  }

  private calculateGrade(passed: number, total: number): {
    score: number;
    emoji: string;
    status: string;
  } {
    const passRate = (passed / total) * 100;
    
    if (passRate >= 95) {
      return { score: 10, emoji: '🏆', status: 'EXCELLENT - Production Ready' };
    } else if (passRate >= 90) {
      return { score: 9, emoji: '✅', status: 'VERY GOOD - Minor fixes needed' };
    } else if (passRate >= 80) {
      return { score: 8, emoji: '👍', status: 'GOOD - Some improvements needed' };
    } else if (passRate >= 70) {
      return { score: 7, emoji: '⚠️ ', status: 'FAIR - Significant work needed' };
    } else {
      return { score: 6, emoji: '❌', status: 'POOR - Major issues to address' };
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    for (const result of this.results) {
      if (result.failed > 0) {
        switch (result.category) {
          case 'Database Integrity':
            recommendations.push('Review database schema and add missing constraints');
            recommendations.push('Implement data validation before database writes');
            break;
          case 'Content Quality':
            recommendations.push('Add Hindi translations for all content');
            recommendations.push('Enrich vocabulary for lessons with < 5 words');
            break;
          case 'Data Integrity':
            recommendations.push('Add unique constraints to prevent duplicates');
            recommendations.push('Implement foreign key validation');
            break;
          case 'Performance':
            recommendations.push('Add database indexes for frequently queried fields');
            recommendations.push('Implement query result caching');
            break;
          case 'Hindi Readability':
            recommendations.push('Complete Hindi translations for all user-facing content');
            recommendations.push('Verify Devanagari script encoding');
            break;
          case 'Production Readiness':
            recommendations.push('Fix data corruption issues');
            recommendations.push('Add monitoring and alerting');
            break;
        }
      }
    }

    return [...new Set(recommendations)]; // Remove duplicates
  }
}

async function main() {
  const runner = new BRSTTestRunner();
  await runner.runAllTests();
  process.exit(0);
}

main().catch(console.error);
