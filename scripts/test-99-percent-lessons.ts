#!/usr/bin/env tsx

/**
 * Comprehensive Test: 99% Lesson Utilization
 * Tests application performance and functionality using nearly all available lessons
 */

import { db } from '../server/db';
import { lessons, users, progress, vocabulary } from '../shared/schema';
import { eq, sql, count, desc, asc } from 'drizzle-orm';

interface TestMetrics {
  totalLessons: number;
  lessonsToTest: number;
  testPercentage: number;
  startTime: number;
  endTime?: number;
  duration?: number;
  successCount: number;
  failureCount: number;
  errors: string[];
  performance: {
    avgFetchTime: number;
    maxFetchTime: number;
    minFetchTime: number;
    totalFetchTime: number;
  };
  memoryUsage: {
    initial: NodeJS.MemoryUsage;
    peak: NodeJS.MemoryUsage;
    final: NodeJS.MemoryUsage;
  };
}

class Lesson99PercentTester {
  private metrics: TestMetrics;
  private fetchTimes: number[] = [];

  constructor() {
    this.metrics = {
      totalLessons: 0,
      lessonsToTest: 0,
      testPercentage: 99,
      startTime: Date.now(),
      successCount: 0,
      failureCount: 0,
      errors: [],
      performance: {
        avgFetchTime: 0,
        maxFetchTime: 0,
        minFetchTime: Infinity,
        totalFetchTime: 0
      },
      memoryUsage: {
        initial: process.memoryUsage(),
        peak: process.memoryUsage(),
        final: process.memoryUsage()
      }
    };
  }

  private updateMemoryPeak() {
    const current = process.memoryUsage();
    if (current.heapUsed > this.metrics.memoryUsage.peak.heapUsed) {
      this.metrics.memoryUsage.peak = current;
    }
  }

  private async getLessonCount(): Promise<number> {
    try {
      const result = await db.select({ count: count() }).from(lessons);
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error getting lesson count:', error);
      return 0;
    }
  }

  private async fetchLessonWithVocabulary(lessonId: number): Promise<boolean> {
    const fetchStart = Date.now();
    
    try {
      // Fetch lesson details
      const lesson = await db
        .select()
        .from(lessons)
        .where(eq(lessons.id, lessonId))
        .limit(1);

      if (!lesson.length) {
        throw new Error(`Lesson ${lessonId} not found`);
      }

      // Fetch associated vocabulary
      const vocab = await db
        .select()
        .from(vocabulary)
        .where(eq(vocabulary.lessonId, lessonId));

      // Simulate content processing
      const lessonData = lesson[0];
      let contentSize = 0;
      
      if (lessonData.content) {
        try {
          const parsedContent = JSON.parse(lessonData.content);
          contentSize = JSON.stringify(parsedContent).length;
        } catch (e) {
          contentSize = lessonData.content.length;
        }
      }

      // Validate lesson structure
      const isValid = this.validateLessonStructure(lessonData, vocab);
      
      const fetchTime = Date.now() - fetchStart;
      this.fetchTimes.push(fetchTime);
      
      // Update performance metrics
      this.metrics.performance.totalFetchTime += fetchTime;
      this.metrics.performance.maxFetchTime = Math.max(this.metrics.performance.maxFetchTime, fetchTime);
      this.metrics.performance.minFetchTime = Math.min(this.metrics.performance.minFetchTime, fetchTime);

      this.updateMemoryPeak();

      if (isValid) {
        this.metrics.successCount++;
        return true;
      } else {
        this.metrics.failureCount++;
        this.metrics.errors.push(`Lesson ${lessonId}: Invalid structure`);
        return false;
      }

    } catch (error) {
      const fetchTime = Date.now() - fetchStart;
      this.fetchTimes.push(fetchTime);
      this.metrics.performance.totalFetchTime += fetchTime;
      
      this.metrics.failureCount++;
      this.metrics.errors.push(`Lesson ${lessonId}: ${error.message}`);
      return false;
    }
  }

  private validateLessonStructure(lesson: any, vocab: any[]): boolean {
    // Check required fields
    if (!lesson.title || !lesson.slug || !lesson.difficulty) {
      return false;
    }

    // Check content structure - accept both JSON and Markdown formats
    if (lesson.content) {
      try {
        // Try to parse as JSON first
        const parsedContent = JSON.parse(lesson.content);
        if (!Array.isArray(parsedContent)) {
          return false;
        }
      } catch (e) {
        // If JSON parsing fails, check if it's valid Markdown content
        const content = lesson.content.trim();
        if (content.length === 0) {
          return false;
        }
        // Accept Markdown content (starts with # or has reasonable length)
        if (!content.startsWith('#') && content.length < 50) {
          return false;
        }
      }
    }

    // Check vocabulary structure - using correct field names
    for (const vocabItem of vocab) {
      if (!vocabItem.word || !vocabItem.definition) {
        return false;
      }
    }

    return true;
  }

  private async testLessonBatch(lessonIds: number[], batchSize: number = 10): Promise<void> {
    console.log(`\n🔄 Testing batch of ${lessonIds.length} lessons (batch size: ${batchSize})`);
    
    for (let i = 0; i < lessonIds.length; i += batchSize) {
      const batch = lessonIds.slice(i, i + batchSize);
      const batchPromises = batch.map(id => this.fetchLessonWithVocabulary(id));
      
      try {
        await Promise.all(batchPromises);
        
        const progress = Math.round(((i + batch.length) / lessonIds.length) * 100);
        process.stdout.write(`\r📊 Progress: ${progress}% (${i + batch.length}/${lessonIds.length} lessons)`);
        
        // Memory cleanup hint
        if (global.gc) {
          global.gc();
        }
        
      } catch (error) {
        console.error(`\n❌ Batch error at index ${i}:`, error.message);
      }
    }
    
    console.log('\n✅ Batch testing complete');
  }

  private async performanceStressTest(sampleLessonIds: number[]): Promise<void> {
    console.log('\n🚀 Running performance stress test...');
    
    const stressTestSample = sampleLessonIds.slice(0, 50); // Test with 50 lessons
    const concurrencyLevels = [1, 5, 10, 20];
    
    for (const concurrency of concurrencyLevels) {
      console.log(`\n📈 Testing concurrency level: ${concurrency}`);
      const startTime = Date.now();
      
      const promises = [];
      for (let i = 0; i < concurrency; i++) {
        const lessonId = stressTestSample[i % stressTestSample.length];
        promises.push(this.fetchLessonWithVocabulary(lessonId));
      }
      
      try {
        await Promise.all(promises);
        const duration = Date.now() - startTime;
        console.log(`✅ Concurrency ${concurrency}: ${duration}ms`);
      } catch (error) {
        console.log(`❌ Concurrency ${concurrency}: Failed - ${error.message}`);
      }
    }
  }

  private async memoryLeakTest(sampleLessonIds: number[]): Promise<void> {
    console.log('\n🧠 Running memory leak test...');
    
    const initialMemory = process.memoryUsage();
    const testSample = sampleLessonIds.slice(0, 100);
    
    // Run multiple iterations to detect memory leaks
    for (let iteration = 0; iteration < 5; iteration++) {
      console.log(`\n🔄 Memory test iteration ${iteration + 1}/5`);
      
      for (const lessonId of testSample) {
        await this.fetchLessonWithVocabulary(lessonId);
      }
      
      const currentMemory = process.memoryUsage();
      const heapIncrease = currentMemory.heapUsed - initialMemory.heapUsed;
      console.log(`📊 Heap increase: ${(heapIncrease / 1024 / 1024).toFixed(2)}MB`);
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
    }
  }

  private calculateFinalMetrics(): void {
    this.metrics.endTime = Date.now();
    this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
    this.metrics.memoryUsage.final = process.memoryUsage();
    
    if (this.fetchTimes.length > 0) {
      this.metrics.performance.avgFetchTime = 
        this.metrics.performance.totalFetchTime / this.fetchTimes.length;
    }
  }

  private printDetailedReport(): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 COMPREHENSIVE 99% LESSON TEST REPORT');
    console.log('='.repeat(80));
    
    console.log('\n📈 OVERVIEW:');
    console.log(`Total Lessons in Database: ${this.metrics.totalLessons}`);
    console.log(`Lessons Tested (99%): ${this.metrics.lessonsToTest}`);
    console.log(`Test Duration: ${(this.metrics.duration! / 1000).toFixed(2)}s`);
    console.log(`Success Rate: ${((this.metrics.successCount / this.metrics.lessonsToTest) * 100).toFixed(2)}%`);
    
    console.log('\n⚡ PERFORMANCE METRICS:');
    console.log(`Average Fetch Time: ${this.metrics.performance.avgFetchTime.toFixed(2)}ms`);
    console.log(`Fastest Fetch: ${this.metrics.performance.minFetchTime}ms`);
    console.log(`Slowest Fetch: ${this.metrics.performance.maxFetchTime}ms`);
    console.log(`Total Fetch Time: ${(this.metrics.performance.totalFetchTime / 1000).toFixed(2)}s`);
    
    console.log('\n🧠 MEMORY USAGE:');
    const initialMB = this.metrics.memoryUsage.initial.heapUsed / 1024 / 1024;
    const peakMB = this.metrics.memoryUsage.peak.heapUsed / 1024 / 1024;
    const finalMB = this.metrics.memoryUsage.final.heapUsed / 1024 / 1024;
    
    console.log(`Initial Memory: ${initialMB.toFixed(2)}MB`);
    console.log(`Peak Memory: ${peakMB.toFixed(2)}MB`);
    console.log(`Final Memory: ${finalMB.toFixed(2)}MB`);
    console.log(`Memory Increase: ${(finalMB - initialMB).toFixed(2)}MB`);
    
    console.log('\n📊 RESULTS SUMMARY:');
    console.log(`✅ Successful: ${this.metrics.successCount}`);
    console.log(`❌ Failed: ${this.metrics.failureCount}`);
    
    if (this.metrics.errors.length > 0) {
      console.log('\n🚨 ERRORS (First 10):');
      this.metrics.errors.slice(0, 10).forEach(error => {
        console.log(`  • ${error}`);
      });
      
      if (this.metrics.errors.length > 10) {
        console.log(`  ... and ${this.metrics.errors.length - 10} more errors`);
      }
    }
    
    console.log('\n🎯 PERFORMANCE ASSESSMENT:');
    const avgFetchTime = this.metrics.performance.avgFetchTime;
    if (avgFetchTime < 50) {
      console.log('🟢 EXCELLENT: Average fetch time under 50ms');
    } else if (avgFetchTime < 100) {
      console.log('🟡 GOOD: Average fetch time under 100ms');
    } else if (avgFetchTime < 200) {
      console.log('🟠 ACCEPTABLE: Average fetch time under 200ms');
    } else {
      console.log('🔴 NEEDS OPTIMIZATION: Average fetch time over 200ms');
    }
    
    const successRate = (this.metrics.successCount / this.metrics.lessonsToTest) * 100;
    if (successRate >= 99) {
      console.log('🟢 EXCELLENT: 99%+ success rate');
    } else if (successRate >= 95) {
      console.log('🟡 GOOD: 95%+ success rate');
    } else if (successRate >= 90) {
      console.log('🟠 ACCEPTABLE: 90%+ success rate');
    } else {
      console.log('🔴 CRITICAL: Below 90% success rate');
    }
    
    console.log('\n' + '='.repeat(80));
  }

  async runComprehensiveTest(): Promise<void> {
    console.log('🚀 Starting Comprehensive 99% Lesson Test');
    console.log('=' .repeat(50));
    
    try {
      // Get total lesson count
      console.log('\n📊 Analyzing database...');
      this.metrics.totalLessons = await this.getLessonCount();
      this.metrics.lessonsToTest = Math.floor(this.metrics.totalLessons * 0.99);
      
      console.log(`📚 Found ${this.metrics.totalLessons} total lessons`);
      console.log(`🎯 Will test ${this.metrics.lessonsToTest} lessons (99%)`);
      
      if (this.metrics.totalLessons === 0) {
        throw new Error('No lessons found in database');
      }
      
      // Get lesson IDs to test
      const allLessons = await db
        .select({ id: lessons.id })
        .from(lessons)
        .orderBy(asc(lessons.id))
        .limit(this.metrics.lessonsToTest);
      
      const lessonIds = allLessons.map(l => l.id);
      
      console.log(`\n🔍 Retrieved ${lessonIds.length} lesson IDs for testing`);
      
      // Run batch testing
      await this.testLessonBatch(lessonIds, 20);
      
      // Run performance stress test
      await this.performanceStressTest(lessonIds);
      
      // Run memory leak test
      await this.memoryLeakTest(lessonIds);
      
      // Calculate final metrics
      this.calculateFinalMetrics();
      
      // Print detailed report
      this.printDetailedReport();
      
    } catch (error) {
      console.error('\n❌ Test failed:', error);
      this.metrics.errors.push(`Critical error: ${error.message}`);
      throw error;
    }
  }
}

// Run the test
async function main() {
  const tester = new Lesson99PercentTester();
  
  try {
    await tester.runComprehensiveTest();
    console.log('\n🎉 Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Test failed with critical error:', error);
    process.exit(1);
  }
}

// Execute if run directly
main().catch(console.error);

export { Lesson99PercentTester };