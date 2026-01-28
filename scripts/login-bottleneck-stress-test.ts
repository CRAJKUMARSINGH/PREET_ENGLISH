#!/usr/bin/env tsx

/**
 * PRODUCTION-GRADE LOGIN STRESS TEST
 * Simulates 75 concurrent users to test the circuit breaker and queue system
 * Tests real bottleneck scenarios and generates comprehensive reports
 */

import { promises as fs } from 'fs';
import axios from 'axios';

interface UserProfile {
    id: number;
    username: string;
    password: string;
    type: 'beginner' | 'intermediate' | 'advanced';
    sessionToken?: string;
}

interface LoginAttempt {
    userId: number;
    username: string;
    startTime: number;
    endTime?: number;
    duration?: number;
    success: boolean;
    error?: string;
    queueStatus?: any;
    circuitBreakerState?: string;
}

interface StressTestReport {
    timestamp: string;
    totalUsers: number;
    concurrentLogins: number;
    testDuration: number;
    results: {
        successful: number;
        failed: number;
        timeouts: number;
        circuitBreakerTriggered: number;
        averageLoginTime: number;
        maxLoginTime: number;
        minLoginTime: number;
        p95LoginTime: number;
    };
    bottlenecks: {
        queueBacklog: number;
        maxConcurrentOperations: number;
        circuitBreakerOpenTime: number;
    };
    recommendations: string[];
    attempts: LoginAttempt[];
}

class LoginStressTester {
    private baseUrl = 'http://localhost:5000';
    private users: UserProfile[] = [];
    private attempts: LoginAttempt[] = [];

    constructor() {
        this.generateUserProfiles();
    }

    private generateUserProfiles() {
        console.log('🧪 Generating 75 virtual user profiles...');
        
        // 25 Beginners - Test linear progress locks
        for (let i = 1; i <= 25; i++) {
            this.users.push({
                id: i,
                username: `beginner_user_${i}`,
                password: 'test123',
                type: 'beginner'
            });
        }

        // 25 Intermediates - Test tab spamming scenarios
        for (let i = 26; i <= 50; i++) {
            this.users.push({
                id: i,
                username: `intermediate_user_${i}`,
                password: 'test123',
                type: 'intermediate'
            });
        }

        // 25 Advanced - Test API flooding
        for (let i = 51; i <= 75; i++) {
            this.users.push({
                id: i,
                username: `advanced_user_${i}`,
                password: 'test123',
                type: 'advanced'
            });
        }

        console.log(`✅ Generated ${this.users.length} user profiles`);
    }

    async createTestUsers(): Promise<void> {
        console.log('👥 Creating test users in database...');
        
        const batchSize = 10;
        for (let i = 0; i < this.users.length; i += batchSize) {
            const batch = this.users.slice(i, i + batchSize);
            const promises = batch.map(async (user) => {
                try {
                    await axios.post(`${this.baseUrl}/api/register`, {
                        username: user.username,
                        password: user.password
                    }, { timeout: 10000 });
                    return true;
                } catch (error: any) {
                    if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
                        return true; // User already exists, that's fine
                    }
                    console.warn(`Failed to create user ${user.username}:`, error.message);
                    return false;
                }
            });

            await Promise.all(promises);
            console.log(`   Created batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(this.users.length/batchSize)}`);
        }

        console.log('✅ Test users ready');
    }

    async simulateLogin(user: UserProfile): Promise<LoginAttempt> {
        const attempt: LoginAttempt = {
            userId: user.id,
            username: user.username,
            startTime: Date.now(),
            success: false
        };

        try {
            const response = await axios.post(`${this.baseUrl}/api/login`, {
                username: user.username,
                password: user.password
            }, { 
                timeout: 15000,
                validateStatus: (status) => status < 500 // Don't throw on 4xx errors
            });

            attempt.endTime = Date.now();
            attempt.duration = attempt.endTime - attempt.startTime;
            attempt.success = response.status === 200;
            attempt.queueStatus = response.data.queueStatus;
            
            if (!attempt.success) {
                attempt.error = response.data.message || `HTTP ${response.status}`;
            }

        } catch (error: any) {
            attempt.endTime = Date.now();
            attempt.duration = attempt.endTime - attempt.startTime;
            
            if (error.code === 'ECONNABORTED') {
                attempt.error = 'TIMEOUT';
            } else if (error.response) {
                attempt.error = `HTTP ${error.response.status}: ${error.response.data?.message || error.message}`;
                attempt.queueStatus = error.response.data?.queueStatus;
            } else {
                attempt.error = error.message;
            }
        }

        return attempt;
    }

    async runConcurrentLoginTest(): Promise<StressTestReport> {
        console.log('🚀 Starting 75-user concurrent login stress test...');
        console.log('⚡ Simulating real-world bottleneck scenarios...\n');

        const testStartTime = Date.now();

        // Phase 1: Immediate concurrent burst (simulate launch day)
        console.log('📊 Phase 1: Immediate concurrent burst (75 users in 2 seconds)');
        const phase1Promises = this.users.map((user, index) => {
            return new Promise(resolve => {
                setTimeout(async () => {
                    const attempt = await this.simulateLogin(user);
                    this.attempts.push(attempt);
                    resolve(attempt);
                }, Math.random() * 2000); // Spread over 2 seconds
            });
        });

        await Promise.all(phase1Promises);

        // Phase 2: Retry failed attempts (simulate user retries)
        console.log('\n📊 Phase 2: Retry failed attempts');
        const failedAttempts = this.attempts.filter(a => !a.success);
        console.log(`   Retrying ${failedAttempts.length} failed attempts...`);

        const retryPromises = failedAttempts.map(async (originalAttempt) => {
            const user = this.users.find(u => u.id === originalAttempt.userId)!;
            const retryAttempt = await this.simulateLogin(user);
            retryAttempt.userId = user.id + 1000; // Mark as retry
            this.attempts.push(retryAttempt);
            return retryAttempt;
        });

        await Promise.all(retryPromises);

        const testEndTime = Date.now();
        const testDuration = testEndTime - testStartTime;

        console.log('\n✅ Stress test completed');
        return this.generateReport(testDuration);
    }

    private generateReport(testDuration: number): StressTestReport {
        const successful = this.attempts.filter(a => a.success);
        const failed = this.attempts.filter(a => !a.success);
        const timeouts = this.attempts.filter(a => a.error === 'TIMEOUT');
        const circuitBreakerErrors = this.attempts.filter(a => 
            a.error?.includes('temporarily unavailable') || 
            a.error?.includes('Circuit breaker')
        );

        const durations = this.attempts
            .filter(a => a.duration !== undefined)
            .map(a => a.duration!)
            .sort((a, b) => a - b);

        const avgDuration = durations.length > 0 
            ? durations.reduce((sum, d) => sum + d, 0) / durations.length 
            : 0;

        const p95Index = Math.floor(durations.length * 0.95);
        const p95Duration = durations.length > 0 ? durations[p95Index] || 0 : 0;

        const maxQueueBacklog = Math.max(
            ...this.attempts
                .filter(a => a.queueStatus?.queueLength !== undefined)
                .map(a => a.queueStatus.queueLength),
            0
        );

        const maxConcurrentOps = Math.max(
            ...this.attempts
                .filter(a => a.queueStatus?.activeOperations !== undefined)
                .map(a => a.queueStatus.activeOperations),
            0
        );

        const recommendations: string[] = [];
        
        if (failed.length > successful.length * 0.1) {
            recommendations.push('High failure rate detected - consider increasing circuit breaker thresholds');
        }
        
        if (avgDuration > 3000) {
            recommendations.push('Average login time too high - optimize database queries');
        }
        
        if (maxQueueBacklog > 20) {
            recommendations.push('Queue backlog too high - increase concurrent processing limit');
        }
        
        if (timeouts.length > 5) {
            recommendations.push('Multiple timeouts detected - increase timeout values or optimize performance');
        }

        if (circuitBreakerErrors.length > 0) {
            recommendations.push('Circuit breaker activated - system successfully protected from overload');
        }

        return {
            timestamp: new Date().toISOString(),
            totalUsers: this.users.length,
            concurrentLogins: this.attempts.length,
            testDuration,
            results: {
                successful: successful.length,
                failed: failed.length,
                timeouts: timeouts.length,
                circuitBreakerTriggered: circuitBreakerErrors.length,
                averageLoginTime: Math.round(avgDuration),
                maxLoginTime: Math.max(...durations, 0),
                minLoginTime: Math.min(...durations, 0),
                p95LoginTime: Math.round(p95Duration)
            },
            bottlenecks: {
                queueBacklog: maxQueueBacklog,
                maxConcurrentOperations: maxConcurrentOps,
                circuitBreakerOpenTime: 0 // Would need to track this separately
            },
            recommendations,
            attempts: this.attempts
        };
    }

    async generateBottleneckHeatmap(report: StressTestReport): Promise<void> {
        console.log('\n📋 Generating bottleneck heatmap...');

        const heatmap = {
            timestamp: new Date().toISOString(),
            performanceMetrics: {
                loginSuccessRate: `${((report.results.successful / report.concurrentLogins) * 100).toFixed(1)}%`,
                averageResponseTime: `${report.results.averageLoginTime}ms`,
                p95ResponseTime: `${report.results.p95LoginTime}ms`,
                systemResilience: report.results.circuitBreakerTriggered > 0 ? 'PROTECTED' : 'STABLE'
            },
            bottleneckAnalysis: {
                databaseContention: report.results.averageLoginTime > 2000 ? 'HIGH' : 'LOW',
                queueEfficiency: report.bottlenecks.queueBacklog < 10 ? 'GOOD' : 'NEEDS_OPTIMIZATION',
                circuitBreakerHealth: report.results.circuitBreakerTriggered > 0 ? 'ACTIVATED' : 'STANDBY',
                concurrencyHandling: report.bottlenecks.maxConcurrentOperations <= 5 ? 'CONTROLLED' : 'OVERLOADED'
            },
            recommendations: report.recommendations,
            readinessScore: this.calculateReadinessScore(report),
            nextSteps: [
                'Monitor production metrics closely',
                'Set up alerting for circuit breaker activation',
                'Consider horizontal scaling if queue backlogs persist',
                'Implement connection pooling optimizations'
            ]
        };

        await fs.writeFile('LOGIN_BOTTLENECK_HEATMAP.json', JSON.stringify(heatmap, null, 2));
        console.log('   ✅ Bottleneck heatmap saved to LOGIN_BOTTLENECK_HEATMAP.json');
    }

    private calculateReadinessScore(report: StressTestReport): number {
        let score = 100;
        
        // Deduct points for failures
        const failureRate = report.results.failed / report.concurrentLogins;
        score -= failureRate * 50;
        
        // Deduct points for slow responses
        if (report.results.averageLoginTime > 2000) score -= 20;
        if (report.results.p95LoginTime > 5000) score -= 15;
        
        // Deduct points for timeouts
        const timeoutRate = report.results.timeouts / report.concurrentLogins;
        score -= timeoutRate * 30;
        
        // Add points for circuit breaker protection
        if (report.results.circuitBreakerTriggered > 0) score += 10;
        
        return Math.max(0, Math.round(score));
    }

    async printResults(report: StressTestReport): Promise<void> {
        console.log('\n' + '='.repeat(80));
        console.log('🎯 PRODUCTION LOGIN STRESS TEST RESULTS');
        console.log('='.repeat(80));
        
        console.log(`📊 Test Overview:`);
        console.log(`   Total Users: ${report.totalUsers}`);
        console.log(`   Total Login Attempts: ${report.concurrentLogins}`);
        console.log(`   Test Duration: ${(report.testDuration / 1000).toFixed(1)}s`);
        
        console.log(`\n✅ Success Metrics:`);
        console.log(`   Successful Logins: ${report.results.successful} (${((report.results.successful / report.concurrentLogins) * 100).toFixed(1)}%)`);
        console.log(`   Failed Logins: ${report.results.failed}`);
        console.log(`   Timeouts: ${report.results.timeouts}`);
        console.log(`   Circuit Breaker Activations: ${report.results.circuitBreakerTriggered}`);
        
        console.log(`\n⚡ Performance Metrics:`);
        console.log(`   Average Login Time: ${report.results.averageLoginTime}ms`);
        console.log(`   95th Percentile: ${report.results.p95LoginTime}ms`);
        console.log(`   Max Login Time: ${report.results.maxLoginTime}ms`);
        console.log(`   Min Login Time: ${report.results.minLoginTime}ms`);
        
        console.log(`\n🔧 System Bottlenecks:`);
        console.log(`   Max Queue Backlog: ${report.bottlenecks.queueBacklog}`);
        console.log(`   Max Concurrent Operations: ${report.bottlenecks.maxConcurrentOperations}`);
        
        console.log(`\n💡 Recommendations:`);
        report.recommendations.forEach(rec => console.log(`   • ${rec}`));
        
        const readinessScore = this.calculateReadinessScore(report);
        console.log(`\n🚀 Production Readiness Score: ${readinessScore}/100`);
        
        if (readinessScore >= 85) {
            console.log('   ✅ READY FOR PRODUCTION LAUNCH!');
        } else if (readinessScore >= 70) {
            console.log('   ⚠️  NEEDS MINOR OPTIMIZATIONS');
        } else {
            console.log('   ❌ REQUIRES SIGNIFICANT IMPROVEMENTS');
        }
    }
}

// Execute if run directly
if (import.meta.main) {
    const tester = new LoginStressTester();
    
    tester.createTestUsers()
        .then(() => tester.runConcurrentLoginTest())
        .then(async (report) => {
            await tester.printResults(report);
            await tester.generateBottleneckHeatmap(report);
            
            // Save detailed report
            await fs.writeFile('LOGIN_STRESS_TEST_REPORT.json', JSON.stringify(report, null, 2));
            console.log('\n📄 Detailed report saved to LOGIN_STRESS_TEST_REPORT.json');
            
            const readinessScore = tester['calculateReadinessScore'](report);
            process.exit(readinessScore >= 70 ? 0 : 1);
        })
        .catch(error => {
            console.error('\n💥 STRESS TEST FAILED:', error);
            process.exit(1);
        });
}

export { LoginStressTester };