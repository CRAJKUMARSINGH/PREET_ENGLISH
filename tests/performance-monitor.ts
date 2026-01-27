/**
 * REAL-TIME PERFORMANCE MONITOR
 * Tracks system metrics during load testing
 */

import os from 'os';
import { performance } from 'perf_hooks';

interface SystemMetrics {
  timestamp: number;
  cpuUsage: number;
  memoryUsage: {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
  };
  uptime: number;
  loadAverage: number[];
}

interface PerformanceMetrics {
  timestamp: number;
  eventLoopLag: number;
  gcCount: number;
  gcDuration: number;
}

class PerformanceMonitor {
  private systemMetrics: SystemMetrics[] = [];
  private performanceMetrics: PerformanceMetrics[] = [];
  private startTime: number = 0;
  private lastCpuUsage: NodeJS.CpuUsage | null = null;
  private lastTimestamp: number = 0;
  private gcStartTime: number = 0;
  private gcCount: number = 0;

  constructor() {
    this.startTime = Date.now();
    this.lastTimestamp = Date.now();
    this.setupGCTracking();
  }

  /**
   * Setup garbage collection tracking
   */
  private setupGCTracking(): void {
    if ((global as any).gc) {
      const originalGc = (global as any).gc;
      (global as any).gc = () => {
        this.gcStartTime = performance.now();
        originalGc();
        const gcDuration = performance.now() - this.gcStartTime;
        this.gcCount++;
      };
    }
  }

  /**
   * Collect system metrics
   */
  collectSystemMetrics(): SystemMetrics {
    const cpuUsage = process.cpuUsage();
    const memUsage = process.memoryUsage();
    const currentTime = Date.now();

    let cpuPercent = 0;
    if (this.lastCpuUsage) {
      const userDiff = cpuUsage.user - this.lastCpuUsage.user;
      const systemDiff = cpuUsage.system - this.lastCpuUsage.system;
      const timeDiff = (currentTime - this.lastTimestamp) * 1000; // Convert to microseconds
      cpuPercent = ((userDiff + systemDiff) / timeDiff) * 100;
    }

    this.lastCpuUsage = cpuUsage;
    this.lastTimestamp = currentTime;

    const metrics: SystemMetrics = {
      timestamp: currentTime,
      cpuUsage: cpuPercent,
      memoryUsage: {
        heapUsed: memUsage.heapUsed / 1024 / 1024, // Convert to MB
        heapTotal: memUsage.heapTotal / 1024 / 1024,
        external: memUsage.external / 1024 / 1024,
        rss: memUsage.rss / 1024 / 1024,
      },
      uptime: process.uptime(),
      loadAverage: os.loadavg(),
    };

    this.systemMetrics.push(metrics);
    return metrics;
  }

  /**
   * Measure event loop lag
   */
  measureEventLoopLag(): PerformanceMetrics {
    const start = performance.now();
    setImmediate(() => {
      const lag = performance.now() - start;
      const metrics: PerformanceMetrics = {
        timestamp: Date.now(),
        eventLoopLag: lag,
        gcCount: this.gcCount,
        gcDuration: 0, // Would need more sophisticated tracking
      };
      this.performanceMetrics.push(metrics);
    });

    return {
      timestamp: Date.now(),
      eventLoopLag: 0,
      gcCount: this.gcCount,
      gcDuration: 0,
    };
  }

  /**
   * Generate performance report
   */
  generateReport(): void {
    console.log('\n📊 PERFORMANCE MONITORING REPORT');
    console.log('═'.repeat(80));

    if (this.systemMetrics.length === 0) {
      console.log('No metrics collected');
      return;
    }

    // CPU Metrics
    const cpuValues = this.systemMetrics.map((m) => m.cpuUsage);
    const avgCpu = cpuValues.reduce((a, b) => a + b, 0) / cpuValues.length;
    const maxCpu = Math.max(...cpuValues);
    const minCpu = Math.min(...cpuValues);

    console.log('\n💻 CPU USAGE:');
    console.log(`   Average: ${avgCpu.toFixed(2)}%`);
    console.log(`   Max: ${maxCpu.toFixed(2)}%`);
    console.log(`   Min: ${minCpu.toFixed(2)}%`);

    // Memory Metrics
    const heapUsedValues = this.systemMetrics.map((m) => m.memoryUsage.heapUsed);
    const avgHeapUsed = heapUsedValues.reduce((a, b) => a + b, 0) / heapUsedValues.length;
    const maxHeapUsed = Math.max(...heapUsedValues);
    const minHeapUsed = Math.min(...heapUsedValues);

    console.log('\n🧠 MEMORY USAGE:');
    console.log(`   Average Heap Used: ${avgHeapUsed.toFixed(2)} MB`);
    console.log(`   Max Heap Used: ${maxHeapUsed.toFixed(2)} MB`);
    console.log(`   Min Heap Used: ${minHeapUsed.toFixed(2)} MB`);

    const lastMetric = this.systemMetrics[this.systemMetrics.length - 1];
    console.log(`   Current Heap Total: ${lastMetric.memoryUsage.heapTotal.toFixed(2)} MB`);
    console.log(`   Current RSS: ${lastMetric.memoryUsage.rss.toFixed(2)} MB`);

    // Load Average
    console.log('\n📈 SYSTEM LOAD:');
    console.log(`   1-min average: ${lastMetric.loadAverage[0].toFixed(2)}`);
    console.log(`   5-min average: ${lastMetric.loadAverage[1].toFixed(2)}`);
    console.log(`   15-min average: ${lastMetric.loadAverage[2].toFixed(2)}`);

    // Event Loop Lag
    if (this.performanceMetrics.length > 0) {
      const lagValues = this.performanceMetrics.map((m) => m.eventLoopLag);
      const avgLag = lagValues.reduce((a, b) => a + b, 0) / lagValues.length;
      const maxLag = Math.max(...lagValues);

      console.log('\n⏱️  EVENT LOOP LAG:');
      console.log(`   Average: ${avgLag.toFixed(2)}ms`);
      console.log(`   Max: ${maxLag.toFixed(2)}ms`);
    }

    console.log('\n' + '═'.repeat(80));
  }

  /**
   * Start continuous monitoring
   */
  startMonitoring(intervalMs: number = 1000): NodeJS.Timeout {
    return setInterval(() => {
      this.collectSystemMetrics();
      this.measureEventLoopLag();
    }, intervalMs);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(timer: NodeJS.Timeout): void {
    clearInterval(timer);
  }

  /**
   * Get current metrics
   */
  getCurrentMetrics(): { system: SystemMetrics; performance: PerformanceMetrics } | null {
    if (this.systemMetrics.length === 0) return null;

    return {
      system: this.systemMetrics[this.systemMetrics.length - 1],
      performance: this.performanceMetrics[this.performanceMetrics.length - 1] || {
        timestamp: Date.now(),
        eventLoopLag: 0,
        gcCount: this.gcCount,
        gcDuration: 0,
      },
    };
  }
}

export { PerformanceMonitor, SystemMetrics, PerformanceMetrics };
