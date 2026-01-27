#!/usr/bin/env tsx
/**
 * PRAGMATIC QUALITY TEST RUNNER
 * 
 * Runs comprehensive quality tests and generates actionable reports
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

class QualityTestRunner {
  private results: TestResult[] = [];
  private startTime: number = 0;

  async runAllTests(): Promise<void> {
    console.log('🚀 Starting Comprehensive Quality Tests...\n');
    console.log('='.repeat(80));

    this.startTime = Date.now();

    await this.runTestCategory('Critical User Journeys', 'CRITICAL USER JOURNEYS');
    await this.runTestCategory('Content Quality', 'CONTENT QUALITY VALIDATION');
    await this.runTestCategory('Data Integrity', 'DATA INTEGRITY');
    await this.runTestCategory('Hindi Readability', 'HINDI READABILITY');
    await this.runTestCategory('Performance', 'PERFORMANCE');
    await this.runTestCategory('Content Richness', 'CONTENT RICHNESS');
    await this.runTestCategory('Security Basics', 'SECURITY BASICS');

    await this.generateReport();
  }

  private async runTestCategory(name: string, pattern: string): Promise<void> {
    console.log(`\n📋 Running: ${name}`);
    console.log('-'.repeat(80));

    return new Promise((resolve) => {
      const jestProcess = spawn('npx', [
        'jest',
        'tests/comprehensive-quality-suite.test.ts',
        '--testNamePattern', pattern,
        '--verbose',
        '--no-coverage'
      ], { stdio: 'pipe' });

      let output = '';

      jestProcess.stdout.on('data', (data) => {
        output += data.toString();
        process.stdout.write(data);
      });

      jestProcess.stderr.on('data', (data) => {
        output += data.toString();
      });

      jestProcess.on('close', (code) => {
        const result = this.parseTestOutput(name, output);
        this.results.push(result);
        resolve();
      });
    });
  }

  private parseTestOutput(category: string, output: string): TestResult {
    const result: TestResult = {
      category,
      passed: 0,
      failed: 0,
      total: 0,
      duration: 0,
      failures: []
    };

    // Parse test counts
    const passMatch = output.match(/(\d+) passed/);
    const failMatch = output.match(/(\d+) failed/);
    const totalMatch = output.match(/Tests:\s+.*?(\d+) total/);
    const timeMatch = output.match(/Time:\s+([\d.]+)\s*s/);

    if (passMatch) result.passed = parseInt(passMatch[1]);
    if (failMatch) result.failed = parseInt(failMatch[1]);
    if (totalMatch) result.total = parseInt(totalMatch[1]);
    if (timeMatch) result.duration = parseFloat(timeMatch[1]);

    // Extract failures
    const failureMatches = output.match(/● .+$/gm) || [];
    result.failures = failureMatches.map(f => f.trim());

    return result;
  }

  private async generateReport(): Promise<void> {
    const totalDuration = (Date.now() - this.startTime) / 1000;
    const totalTests = this.results.reduce((sum, r) => sum + r.total, 0);
    const totalPassed = this.results.reduce((sum, r) => sum + r.passed, 0);
    const totalFailed = this.results.reduce((sum, r) => sum + r.failed, 0);
    const passRate = totalTests > 0 ? (totalPassed / totalTests) * 100 : 0;

    console.log('\n' + '='.repeat(80));
    console.log('📊 QUALITY TEST REPORT');
    console.log('='.repeat(80));

    console.log(`\n🎯 OVERALL RESULTS:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${totalPassed} ✅`);
    console.log(`   Failed: ${totalFailed} ${totalFailed > 0 ? '❌' : '✅'}`);
    console.log(`   Pass Rate: ${passRate.toFixed(2)}%`);
    console.log(`   Duration: ${totalDuration.toFixed(2)}s`);

    console.log(`\n📋 CATEGORY BREAKDOWN:`);
    console.log('-'.repeat(80));

    for (const result of this.results) {
      const status = result.failed === 0 ? '✅' : '❌';
      const rate = result.total > 0 ? (result.passed / result.total) * 100 : 0;
      
      console.log(`${status} ${result.category.padEnd(30)} ${result.passed}/${result.total} (${rate.toFixed(0)}%)`);
      
      if (result.failures.length > 0) {
        result.failures.forEach(failure => {
          console.log(`     - ${failure}`);
        });
      }
    }

    // Generate grade
    const grade = this.calculateGrade(passRate);
    console.log(`\n🏆 QUALITY GRADE: ${grade.letter} (${grade.score}/10)`);
    console.log(`   ${grade.message}`);

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests,
        passed: totalPassed,
        failed: totalFailed,
        passRate,
        duration: totalDuration,
        grade: grade.letter,
        score: grade.score
      },
      categories: this.results,
      recommendations: this.generateRecommendations()
    };

    const reportPath = path.join(process.cwd(), 'QUALITY_TEST_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Full report saved to: ${reportPath}`);

    console.log('\n' + '='.repeat(80));
    console.log(`✨ Quality Testing Complete! Grade: ${grade.letter}`);
    console.log('='.repeat(80) + '\n');
  }

  private calculateGrade(passRate: number): { letter: string; score: number; message: string } {
    if (passRate >= 98) {
      return { letter: 'A+', score: 10, message: 'Excellent! Production ready.' };
    } else if (passRate >= 95) {
      return { letter: 'A', score: 9, message: 'Very good! Minor improvements needed.' };
    } else if (passRate >= 90) {
      return { letter: 'A-', score: 8.5, message: 'Good! Some issues to address.' };
    } else if (passRate >= 85) {
      return { letter: 'B+', score: 8, message: 'Acceptable. Several improvements needed.' };
    } else if (passRate >= 80) {
      return { letter: 'B', score: 7, message: 'Fair. Significant improvements needed.' };
    } else if (passRate >= 70) {
      return { letter: 'C', score: 6, message: 'Below standard. Major improvements required.' };
    } else {
      return { letter: 'F', score: 5, message: 'Failing. Critical issues must be fixed.' };
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const failedCategories = this.results.filter(r => r.failed > 0);

    if (failedCategories.length === 0) {
      recommendations.push('✅ All quality checks passing! Consider adding more edge case tests.');
      return recommendations;
    }

    for (const category of failedCategories) {
      if (category.category.includes('Hindi')) {
        recommendations.push('🇮🇳 Improve Hindi translations - ensure all content has proper Devanagari script');
      }
      if (category.category.includes('Content Quality')) {
        recommendations.push('📚 Enrich content - add more vocabulary and examples to lessons');
      }
      if (category.category.includes('Data Integrity')) {
        recommendations.push('🔒 Fix data integrity issues - check for orphaned records and duplicates');
      }
      if (category.category.includes('Performance')) {
        recommendations.push('⚡ Optimize database queries - add indexes and reduce query complexity');
      }
      if (category.category.includes('Security')) {
        recommendations.push('🔐 Address security concerns - sanitize inputs and validate data');
      }
    }

    return recommendations;
  }
}

async function main() {
  const runner = new QualityTestRunner();
  await runner.runAllTests();
  process.exit(0);
}

main().catch(console.error);
