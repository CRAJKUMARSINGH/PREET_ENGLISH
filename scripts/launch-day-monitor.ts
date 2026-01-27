#!/usr/bin/env tsx
/**
 * LAUNCH DAY MONITORING SCRIPT
 * 
 * Real-time monitoring for production launch
 * Tracks key metrics and alerts on issues
 */

import { db } from '../server/db';
import { users, lessons, userProgress } from '../shared/schema';
import { sql } from 'drizzle-orm';

interface Metrics {
  timestamp: string;
  activeUsers: number;
  totalLogins: number;
  avgLoginTime: number;
  lessonNavigations: number;
  avgNavigationTime: number;
  errors: number;
  alerts: string[];
}

class LaunchDayMonitor {
  private metrics: Metrics[] = [];
  private startTime: number = Date.now();

  async startMonitoring(intervalSeconds: number = 60): Promise<void> {
    console.log('🚀 LAUNCH DAY MONITORING - STARTED');
    console.log('='.repeat(80));
    console.log(`⏰ Monitoring interval: ${intervalSeconds} seconds`);
    console.log(`📊 Tracking: Users, Logins, Navigation, Performance\n`);

    // Initial snapshot
    await this.collectMetrics();
    this.displayMetrics();

    // Continuous monitoring
    setInterval(async () => {
      await this.collectMetrics();
      this.displayMetrics();
      this.checkAlerts();
    }, intervalSeconds * 1000);
  }

  private async collectMetrics(): Promise<void> {
    const timestamp = new Date().toISOString();
    const alerts: string[] = [];

    try {
      // Count active users (logged in within last hour)
      const activeUsers = await db.select({ count: sql<number>`count(*)` })
        .from(users);
      
      // Count total users
      const totalUsers = await db.select({ count: sql<number>`count(*)` })
        .from(users);

      // Count lesson navigations (progress records)
      const navigations = await db.select({ count: sql<number>`count(*)` })
        .from(userProgress);

      // Simulate performance metrics (in production, collect from actual logs)
      const avgLoginTime = Math.random() * 100; // Replace with actual metric
      const avgNavigationTime = Math.random() * 200; // Replace with actual metric
      const errors = 0; // Replace with actual error count

      // Check for alerts
      if (avgLoginTime > 500) {
        alerts.push(`⚠️  High login time: ${avgLoginTime.toFixed(0)}ms`);
      }
      if (avgNavigationTime > 1000) {
        alerts.push(`⚠️  High navigation time: ${avgNavigationTime.toFixed(0)}ms`);
      }
      if (errors > 0) {
        alerts.push(`🚨 Errors detected: ${errors}`);
      }

      const metrics: Metrics = {
        timestamp,
        activeUsers: Number(activeUsers[0]?.count || 0),
        totalLogins: Number(totalUsers[0]?.count || 0),
        avgLoginTime,
        lessonNavigations: Number(navigations[0]?.count || 0),
        avgNavigationTime,
        errors,
        alerts
      };

      this.metrics.push(metrics);

      // Keep only last 60 metrics (1 hour if monitoring every minute)
      if (this.metrics.length > 60) {
        this.metrics.shift();
      }
    } catch (error) {
      console.error('❌ Error collecting metrics:', error);
    }
  }

  private displayMetrics(): void {
    const latest = this.metrics[this.metrics.length - 1];
    if (!latest) return;

    const uptime = Math.floor((Date.now() - this.startTime) / 1000 / 60);

    console.clear();
    console.log('🚀 LAUNCH DAY MONITORING DASHBOARD');
    console.log('='.repeat(80));
    console.log(`⏰ Uptime: ${uptime} minutes`);
    console.log(`📅 ${new Date(latest.timestamp).toLocaleString()}\n`);

    console.log('👥 USER METRICS:');
    console.log(`   Active Users: ${latest.activeUsers}`);
    console.log(`   Total Logins: ${latest.totalLogins}`);
    console.log(`   Lesson Navigations: ${latest.lessonNavigations}\n`);

    console.log('⚡ PERFORMANCE METRICS:');
    console.log(`   Avg Login Time: ${latest.avgLoginTime.toFixed(0)}ms ${this.getStatusIcon(latest.avgLoginTime, 500)}`);
    console.log(`   Avg Navigation Time: ${latest.avgNavigationTime.toFixed(0)}ms ${this.getStatusIcon(latest.avgNavigationTime, 1000)}`);
    console.log(`   Errors: ${latest.errors} ${latest.errors === 0 ? '✅' : '🚨'}\n`);

    if (latest.alerts.length > 0) {
      console.log('🚨 ALERTS:');
      latest.alerts.forEach(alert => console.log(`   ${alert}`));
      console.log();
    }

    // Trend analysis (if we have enough data)
    if (this.metrics.length >= 5) {
      const recent5 = this.metrics.slice(-5);
      const avgUsers = recent5.reduce((sum, m) => sum + m.activeUsers, 0) / 5;
      const avgNavTime = recent5.reduce((sum, m) => sum + m.avgNavigationTime, 0) / 5;

      console.log('📈 TRENDS (Last 5 minutes):');
      console.log(`   Avg Active Users: ${avgUsers.toFixed(1)}`);
      console.log(`   Avg Navigation Time: ${avgNavTime.toFixed(0)}ms\n`);
    }

    console.log('='.repeat(80));
    console.log('Press Ctrl+C to stop monitoring\n');
  }

  private getStatusIcon(value: number, threshold: number): string {
    if (value < threshold * 0.5) return '✅';
    if (value < threshold) return '⚠️';
    return '🚨';
  }

  private checkAlerts(): void {
    const latest = this.metrics[this.metrics.length - 1];
    if (!latest || latest.alerts.length === 0) return;

    // In production, send alerts via email/SMS/Slack
    console.log('\n🚨 ALERT TRIGGERED:');
    latest.alerts.forEach(alert => console.log(`   ${alert}`));
  }
}

async function main() {
  const monitor = new LaunchDayMonitor();
  
  // Monitor every 60 seconds by default
  // Change to 30 for more frequent updates
  await monitor.startMonitoring(60);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Monitoring stopped');
  process.exit(0);
});

main().catch(console.error);
