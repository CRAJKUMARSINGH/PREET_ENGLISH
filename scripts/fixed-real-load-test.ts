#!/usr/bin/env tsx

/**
 * FIXED REAL LOAD TEST - PROPER VALIDATION
 * Creates real users with proper password hashing and tests circuit breaker
 */

import { request } from 'http';
import { db } from '../server/db.js';
import { users } from '../shared/schema.js';
import { eq } from 'drizzle-orm';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

interface TestUser {
    username: string;
    password: string;
    created: boolean;
}

interface LoadTestResult {
    user: string;
    success: boolean;
    responseTime: number;
    status: number;
    error?: string;
    queueStatus?: any;
}

class FixedRealLoadTester {
    private testUsers: TestUser[] = [];
    private results: LoadTestResult[] = [];

    async runFixedLoadTest(): Promise<void> {
        console.log('🔥 FIXED REAL LOAD TEST - PROPER VALIDATION');
        console.log('='.repeat(60));
        console.log('🎯 Goal: Test circuit breaker with WORKING authentication\n');

        try {
            // Step 1: Create real test users with proper password hashing
            await this.createProperTestUsers();
            
            // Step 2: Test normal load (3 users) - should work
            await this.testNormalLoad();
            
            // Step 3: Test overload (15 users simultaneously) - should trigger circuit breaker
            await this.testOverload();
            
            // Step 4: Generate real report
            await this.generateRealReport();
            
        } finally {
            // Step 5: Cleanup test users
            await this.cleanupTestUsers();
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = randomBytes(16).toString("hex");
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString("hex")}.${salt}`;
    }

    private async createProperTestUsers(): Promise<void> {
        console.log('👥 STEP 1: Creating test users with PROPER password hashing...');
        
        // Create 15 test users with proper password hashing
        for (let i = 1; i <= 15; i++) {
            const username = `realtest_user_${i}`;
            const password = 'realtest123';
            
            try {
                // Hash password properly using the same method as the auth system
                const hashedPassword = await this.hashPassword(password);
                
                await db.insert(users).values({
                    username,
                    password: hashedPassword,
                    email: `${username}@realtest.com`
                }).onConflictDoNothing();
                
                this.testUsers.push({
                    username,
                    password,
                    created: true
                });
                
            } catch (error) {
                console.log(`   ⚠️  Failed to create ${username}: ${error}`);
                this.testUsers.push({
                    username,
                    password,
                    created: false
                });
            }
        }
        
        const created = this.testUsers.filter(u => u.created).length;
        console.log(`   ✅ Created ${created}/15 test users with proper password hashing`);
        
        if (created < 5) {
            throw new Error('Not enough test users created for meaningful test');
        }
    }

    private async testNormalLoad(): Promise<void> {
        console.log('\n⚡ STEP 2: Testing normal load (3 concurrent users)...');
        console.log('   🎯 Goal: Verify authentication works correctly');
        
        const normalUsers = this.testUsers.slice(0, 3).filter(u => u.created);
        const promises = normalUsers.map(user => this.makeLoginRequest(user));
        
        const results = await Promise.all(promises);
        this.results.push(...results);
        
        const successful = results.filter(r => r.success).length;
        const avgTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
        
        console.log(`   📊 Normal Load: ${successful}/${results.length} successful`);
        console.log(`   ⏱️  Average response time: ${avgTime.toFixed(0)}ms`);
        
        if (successful === 0) {
            console.log('   ❌ CRITICAL: Authentication still not working!');
            console.log('   🔍 Sample error:', results[0]?.error);
            return;
        }
        
        // Check auth status
        const status = await this.checkAuthStatus();
        console.log(`   🛡️  Circuit Breaker: ${status.circuitBreaker?.state || 'UNKNOWN'}`);
        console.log(`   📋 Queue: ${status.queue?.activeOperations || 0}/${status.queue?.concurrentLimit || 5}`);
    }

    private async testOverload(): Promise<void> {
        console.log('\n🔥 STEP 3: Testing overload (15 concurrent users)...');
        console.log('   🎯 Goal: Trigger circuit breaker with working logins');
        
        const overloadUsers = this.testUsers.filter(u => u.created);
        
        // Fire all requests simultaneously to create real overload
        const startTime = Date.now();
        const promises = overloadUsers.map(user => this.makeLoginRequest(user));
        
        const results = await Promise.all(promises);
        const totalTime = Date.now() - startTime;
        
        this.results.push(...results);
        
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        const circuitBreakerActivated = results.some(r => 
            r.error?.includes('temporarily unavailable') ||
            r.error?.includes('Circuit breaker') ||
            r.status === 503
        );
        
        const queueBacklog = Math.max(...results
            .filter(r => r.queueStatus?.queueLength !== undefined)
            .map(r => r.queueStatus.queueLength), 0);
        
        console.log(`   📊 Overload Results: ${successful} successful, ${failed} failed`);
        console.log(`   ⏱️  Total time: ${totalTime}ms`);
        console.log(`   📋 Max queue backlog: ${queueBacklog}`);
        console.log(`   🛡️  Circuit Breaker Activated: ${circuitBreakerActivated ? '✅ YES' : '❌ NO'}`);
        
        // Check final auth status
        const status = await this.checkAuthStatus();
        console.log(`   📋 Final Circuit Breaker State: ${status.circuitBreaker?.state || 'UNKNOWN'}`);
        console.log(`   📋 Final Queue Status: ${status.queue?.activeOperations || 0}/${status.queue?.concurrentLimit || 5}`);
        
        if (successful > 0) {
            console.log('   ✅ SUCCESS: Authentication working properly!');
            if (circuitBreakerActivated) {
                console.log('   🎉 EXCELLENT: Circuit breaker protected the system!');
            } else if (queueBacklog > 0) {
                console.log('   ✅ GOOD: Queue system managed the load');
            } else {
                console.log('   ℹ️  INFO: System handled load without protection activation');
            }
        } else {
            console.log('   ❌ CRITICAL: Authentication still failing');
        }
    }

    private async makeLoginRequest(user: TestUser): Promise<LoadTestResult> {
        const startTime = Date.now();
        
        return new Promise((resolve) => {
            const postData = JSON.stringify({
                username: user.username,
                password: user.password
            });
            
            const options = {
                hostname: 'localhost',
                port: 5000,
                path: '/api/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    const responseTime = Date.now() - startTime;
                    
                    try {
                        const parsed = JSON.parse(body);
                        resolve({
                            user: user.username,
                            success: res.statusCode === 200,
                            responseTime,
                            status: res.statusCode || 0,
                            queueStatus: parsed.queueStatus,
                            error: parsed.message
                        });
                    } catch (e) {
                        resolve({
                            user: user.username,
                            success: false,
                            responseTime,
                            status: res.statusCode || 0,
                            error: body || 'Parse error'
                        });
                    }
                });
            });

            req.on('error', (error) => {
                resolve({
                    user: user.username,
                    success: false,
                    responseTime: Date.now() - startTime,
                    status: 0,
                    error: error.message
                });
            });

            req.setTimeout(10000, () => {
                req.destroy();
                resolve({
                    user: user.username,
                    success: false,
                    responseTime: Date.now() - startTime,
                    status: 0,
                    error: 'Request timeout'
                });
            });

            req.write(postData);
            req.end();
        });
    }

    private async checkAuthStatus(): Promise<any> {
        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: 5000,
                path: '/api/auth/status',
                method: 'GET'
            };

            const req = request(options, (res) => {
                let body = '';
                res.on('data', (chunk) => body += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(body));
                    } catch (e) {
                        resolve({});
                    }
                });
            });

            req.on('error', () => resolve({}));
            req.setTimeout(5000, () => {
                req.destroy();
                resolve({});
            });

            req.end();
        });
    }

    private async generateRealReport(): Promise<void> {
        console.log('\n📊 STEP 4: Generating REAL test report...');
        
        const totalRequests = this.results.length;
        const successful = this.results.filter(r => r.success).length;
        const failed = this.results.filter(r => !r.success).length;
        const avgResponseTime = this.results.reduce((sum, r) => sum + r.responseTime, 0) / totalRequests;
        const maxResponseTime = Math.max(...this.results.map(r => r.responseTime));
        
        const circuitBreakerActivations = this.results.filter(r => 
            r.error?.includes('temporarily unavailable') ||
            r.error?.includes('Circuit breaker') ||
            r.status === 503
        ).length;
        
        const maxQueueBacklog = Math.max(...this.results
            .filter(r => r.queueStatus?.queueLength !== undefined)
            .map(r => r.queueStatus.queueLength), 0);
        
        const report = {
            timestamp: new Date().toISOString(),
            testType: 'Fixed Real Load Test',
            summary: {
                totalRequests,
                successful,
                failed,
                successRate: ((successful / totalRequests) * 100).toFixed(1) + '%',
                avgResponseTime: Math.round(avgResponseTime),
                maxResponseTime,
                circuitBreakerActivations,
                maxQueueBacklog
            },
            testUsers: {
                created: this.testUsers.filter(u => u.created).length,
                total: this.testUsers.length
            },
            results: this.results,
            verdict: this.generateVerdict(successful, totalRequests, circuitBreakerActivations, maxQueueBacklog)
        };
        
        // Save report
        const fs = await import('fs');
        fs.writeFileSync('FIXED_REAL_LOAD_TEST_REPORT.json', JSON.stringify(report, null, 2));
        
        console.log('\n' + '='.repeat(60));
        console.log('📋 FIXED REAL LOAD TEST RESULTS');
        console.log('='.repeat(60));
        console.log(`📊 Total Requests: ${totalRequests}`);
        console.log(`✅ Successful: ${successful} (${report.summary.successRate})`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⏱️  Avg Response Time: ${report.summary.avgResponseTime}ms`);
        console.log(`⏱️  Max Response Time: ${maxResponseTime}ms`);
        console.log(`🛡️  Circuit Breaker Activations: ${circuitBreakerActivations}`);
        console.log(`📋 Max Queue Backlog: ${maxQueueBacklog}`);
        console.log(`\n${report.verdict.icon} VERDICT: ${report.verdict.status}`);
        console.log(`📝 ${report.verdict.message}`);
        console.log('\n📄 Detailed report saved: FIXED_REAL_LOAD_TEST_REPORT.json');
    }

    private generateVerdict(successful: number, total: number, cbActivations: number, maxQueue: number) {
        const successRate = (successful / total) * 100;
        
        if (successRate >= 80 && (cbActivations > 0 || maxQueue > 0)) {
            return {
                status: 'READY FOR LAUNCH - RESILIENCE VALIDATED',
                icon: '🎉',
                message: 'Authentication works and system shows resilience under load'
            };
        } else if (successRate >= 80) {
            return {
                status: 'READY FOR LAUNCH - BASIC FUNCTIONALITY',
                icon: '✅',
                message: 'Authentication works well, resilience systems on standby'
            };
        } else if (successRate >= 50) {
            return {
                status: 'NEEDS OPTIMIZATION',
                icon: '⚠️',
                message: 'Authentication partially working, needs improvement'
            };
        } else {
            return {
                status: 'NOT READY - AUTHENTICATION BROKEN',
                icon: '❌',
                message: 'Critical authentication issues must be fixed'
            };
        }
    }

    private async cleanupTestUsers(): Promise<void> {
        console.log('\n🧹 STEP 5: Cleaning up test users...');
        
        let cleaned = 0;
        for (const user of this.testUsers) {
            if (user.created) {
                try {
                    await db.delete(users).where(eq(users.username, user.username));
                    cleaned++;
                } catch (error) {
                    console.log(`   ⚠️  Failed to cleanup ${user.username}`);
                }
            }
        }
        
        console.log(`   ✅ Cleaned up ${cleaned} test users`);
    }
}

// Execute the fixed real load test
if (import.meta.main) {
    const tester = new FixedRealLoadTester();
    
    tester.runFixedLoadTest()
        .then(() => {
            console.log('\n🚀 Fixed real load test completed!');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n💥 Fixed real load test failed:', error);
            process.exit(1);
        });
}

export { FixedRealLoadTester };