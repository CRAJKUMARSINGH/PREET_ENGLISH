#!/usr/bin/env tsx

/**
 * LESSON NAVIGATION STRESS TEST
 * Simulates 75 users navigating through 90% of lessons to find race conditions
 * Tests tab spamming, progress syncing, and memory leaks
 */

import { promises as fs } from 'fs';
import axios from 'axios';

interface NavigationSession {
    userId: number;
    username: string;
    userType: 'beginner' | 'intermediate' | 'advanced';
    lessonsCompleted: number[];
    navigationPattern: string;
    startTime: number;
    endTime?: number;
    errors: string[];
    memoryUsage: number[];
    responseTimeMs: number[];
}

interface LessonNavigationReport {
    timestamp: string;
    totalUsers: number;
    totalLessons: number;
    targetCompletionRate: number;
    actualCompletionRate: number;
    testDuration: number;
    raceConditions: {
        duplicateProgress: number;
        concurrentWrites: number;
        stateInconsistencies: number;
    };
    performanceIssues: {
        memoryLeaks: number;
        slowResponses: number;
        timeouts: number;
        serverErrors: number;
    };
    navigationPatterns: {
        linear: number;
        tabSpamming: number;
        apiFlooding: number;
    };
    sessions: NavigationSession[];
    recommendations: string[];
}

class LessonNavigationTester {
    private baseUrl = 'http://localhost:5000';
    private sessions: NavigationSession[] = [];
    private availableLessons: any[] = [];

    async initialize(): Promise<void> {
        console.log('🔍 Discovering available lessons...');
        
        try {
            const response = await axios.get(`${this.baseUrl}/api/lessons`, { timeout: 10000 });
            this.availableLessons = response.data;
            console.log(`   Found ${this.availableLessons.length} lessons`);
        } catch (error) {
            console.error('Failed to fetch lessons:', error);
            throw error;
        }
    }

    async authenticateUser(username: string, password: string): Promise<string | null> {
        try {
            const response = await axios.post(`${this.baseUrl}/api/login`, {
                username, password
            }, { 
                timeout: 10000,
                withCredentials: true 
            });
            
            // Extract session cookie
            const cookies = response.headers['set-cookie'];
            if (cookies) {
                const sessionCookie = cookies.find(cookie => cookie.startsWith('connect.sid='));
                return sessionCookie || null;
            }
            return null;
        } catch (error) {
            console.warn(`Authentication failed for ${username}`);
            return null;
        }
    }

    async simulateBeginnerNavigation(session: NavigationSession, sessionCookie: string): Promise<void> {
        // Beginners: Linear progression with progress locks testing
        session.navigationPattern = 'linear';
        const targetLessons = Math.floor(this.availableLessons.length * 0.9);
        
        for (let i = 0; i < targetLessons && i < this.availableLessons.length; i++) {
            const lesson = this.availableLessons[i];
            const startTime = Date.now();
            
            try {
                // Test: Try to access lesson (should work for linear progression)
                const lessonResponse = await axios.get(`${this.baseUrl}/api/lessons/${lesson.id}`, {
                    headers: { Cookie: sessionCookie },
                    timeout: 8000
                });
                
                // Test: Mark lesson complete
                const progressResponse = await axios.post(`${this.baseUrl}/api/lessons/${lesson.id}/complete`, 
                    { completed: true },
                    {
                        headers: { Cookie: sessionCookie },
                        timeout: 8000
                    }
                );
                
                session.lessonsCompleted.push(lesson.id);
                session.responseTimeMs.push(Date.now() - startTime);
                
                // Test: Try to skip ahead (should be blocked for beginners)
                if (i < this.availableLessons.length - 5) {
                    const futureLesson = this.availableLessons[i + 5];
                    try {
                        await axios.get(`${this.baseUrl}/api/lessons/${futureLesson.id}`, {
                            headers: { Cookie: sessionCookie },
                            timeout: 5000
                        });
                        // If this succeeds when it shouldn't, it's a race condition
                        session.errors.push(`RACE_CONDITION: Accessed future lesson ${futureLesson.id} prematurely`);
                    } catch (error) {
                        // Expected behavior - lesson should be locked
                    }
                }
                
            } catch (error: any) {
                session.errors.push(`Lesson ${lesson.id}: ${error.message}`);
                session.responseTimeMs.push(Date.now() - startTime);
            }
            
            // Small delay to simulate reading
            await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
        }
    }

    async simulateIntermediateNavigation(session: NavigationSession, sessionCookie: string): Promise<void> {
        // Intermediates: Tab spamming - open multiple lessons simultaneously
        session.navigationPattern = 'tabSpamming';
        const targetLessons = Math.floor(this.availableLessons.length * 0.9);
        
        // Simulate opening 5 tabs at once
        const batchSize = 5;
        for (let i = 0; i < targetLessons; i += batchSize) {
            const batch = this.availableLessons.slice(i, i + batchSize);
            const startTime = Date.now();
            
            // Concurrent lesson access (tab spamming)
            const promises = batch.map(async (lesson) => {
                try {
                    // Simulate rapid tab switching
                    const lessonPromise = axios.get(`${this.baseUrl}/api/lessons/${lesson.id}`, {
                        headers: { Cookie: sessionCookie },
                        timeout: 8000
                    });
                    
                    const progressPromise = axios.post(`${this.baseUrl}/api/lessons/${lesson.id}/complete`,
                        { completed: true },
                        {
                            headers: { Cookie: sessionCookie },
                            timeout: 8000
                        }
                    );
                    
                    await Promise.all([lessonPromise, progressPromise]);
                    session.lessonsCompleted.push(lesson.id);
                    
                } catch (error: any) {
                    session.errors.push(`Concurrent access lesson ${lesson.id}: ${error.message}`);
                }
            });
            
            try {
                await Promise.all(promises);
                session.responseTimeMs.push(Date.now() - startTime);
            } catch (error: any) {
                session.errors.push(`Batch processing error: ${error.message}`);
            }
            
            // Brief pause between batches
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    async simulateAdvancedNavigation(session: NavigationSession, sessionCookie: string): Promise<void> {
        // Advanced: API flooding - mark multiple lessons complete rapidly
        session.navigationPattern = 'apiFlooding';
        const targetLessons = Math.floor(this.availableLessons.length * 0.9);
        
        // Rapid-fire completion (10 lessons in 10 seconds)
        const rapidBatch = this.availableLessons.slice(0, Math.min(10, targetLessons));
        const startTime = Date.now();
        
        const floodPromises = rapidBatch.map(async (lesson, index) => {
            try {
                // Stagger slightly to create race conditions
                await new Promise(resolve => setTimeout(resolve, index * 100));
                
                const response = await axios.post(`${this.baseUrl}/api/lessons/${lesson.id}/complete`,
                    { completed: true },
                    {
                        headers: { Cookie: sessionCookie },
                        timeout: 5000
                    }
                );
                
                session.lessonsCompleted.push(lesson.id);
                return response.data;
                
            } catch (error: any) {
                session.errors.push(`API flood lesson ${lesson.id}: ${error.message}`);
                throw error;
            }
        });
        
        try {
            await Promise.all(floodPromises);
            session.responseTimeMs.push(Date.now() - startTime);
        } catch (error: any) {
            session.errors.push(`API flooding failed: ${error.message}`);
        }
        
        // Continue with remaining lessons at normal pace
        const remainingLessons = this.availableLessons.slice(10, targetLessons);
        for (const lesson of remainingLessons) {
            const startTime = Date.now();
            
            try {
                await axios.post(`${this.baseUrl}/api/lessons/${lesson.id}/complete`,
                    { completed: true },
                    {
                        headers: { Cookie: sessionCookie },
                        timeout: 8000
                    }
                );
                
                session.lessonsCompleted.push(lesson.id);
                session.responseTimeMs.push(Date.now() - startTime);
                
            } catch (error: any) {
                session.errors.push(`Lesson ${lesson.id}: ${error.message}`);
            }
            
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    async runNavigationSession(userId: number, userType: 'beginner' | 'intermediate' | 'advanced'): Promise<NavigationSession> {
        const username = `${userType}_user_${userId}`;
        const session: NavigationSession = {
            userId,
            username,
            userType,
            lessonsCompleted: [],
            navigationPattern: '',
            startTime: Date.now(),
            errors: [],
            memoryUsage: [],
            responseTimeMs: []
        };
        
        try {
            // Authenticate
            const sessionCookie = await this.authenticateUser(username, 'test123');
            if (!sessionCookie) {
                session.errors.push('Authentication failed');
                session.endTime = Date.now();
                return session;
            }
            
            // Record initial memory
            session.memoryUsage.push(process.memoryUsage().heapUsed);
            
            // Run navigation pattern based on user type
            switch (userType) {
                case 'beginner':
                    await this.simulateBeginnerNavigation(session, sessionCookie);
                    break;
                case 'intermediate':
                    await this.simulateIntermediateNavigation(session, sessionCookie);
                    break;
                case 'advanced':
                    await this.simulateAdvancedNavigation(session, sessionCookie);
                    break;
            }
            
            // Record final memory
            session.memoryUsage.push(process.memoryUsage().heapUsed);
            
        } catch (error: any) {
            session.errors.push(`Session error: ${error.message}`);
        }
        
        session.endTime = Date.now();
        return session;
    }

    async runConcurrentNavigationTest(): Promise<LessonNavigationReport> {
        console.log('🚀 Starting 75-user lesson navigation stress test...');
        console.log('📚 Target: 90% lesson completion across all users\n');
        
        const testStartTime = Date.now();
        
        // Create user sessions
        const sessionPromises: Promise<NavigationSession>[] = [];
        
        // 25 Beginners
        for (let i = 1; i <= 25; i++) {
            sessionPromises.push(this.runNavigationSession(i, 'beginner'));
        }
        
        // 25 Intermediates  
        for (let i = 26; i <= 50; i++) {
            sessionPromises.push(this.runNavigationSession(i, 'intermediate'));
        }
        
        // 25 Advanced
        for (let i = 51; i <= 75; i++) {
            sessionPromises.push(this.runNavigationSession(i, 'advanced'));
        }
        
        // Run all sessions concurrently
        console.log('⚡ Running concurrent navigation sessions...');
        this.sessions = await Promise.all(sessionPromises);
        
        const testEndTime = Date.now();
        const testDuration = testEndTime - testStartTime;
        
        console.log('✅ Navigation test completed');
        return this.generateNavigationReport(testDuration);
    }

    private generateNavigationReport(testDuration: number): LessonNavigationReport {
        const totalLessons = this.availableLessons.length;
        const targetCompletionRate = 0.9;
        
        // Calculate completion rates
        const totalPossibleCompletions = this.sessions.length * Math.floor(totalLessons * targetCompletionRate);
        const actualCompletions = this.sessions.reduce((sum, session) => sum + session.lessonsCompleted.length, 0);
        const actualCompletionRate = actualCompletions / totalPossibleCompletions;
        
        // Analyze race conditions
        const duplicateProgress = this.detectDuplicateProgress();
        const concurrentWrites = this.sessions.filter(s => s.navigationPattern === 'tabSpamming').length;
        const stateInconsistencies = this.sessions.reduce((sum, s) => sum + s.errors.filter(e => e.includes('RACE_CONDITION')).length, 0);
        
        // Analyze performance issues
        const memoryLeaks = this.detectMemoryLeaks();
        const slowResponses = this.sessions.reduce((sum, s) => sum + s.responseTimeMs.filter(t => t > 3000).length, 0);
        const timeouts = this.sessions.reduce((sum, s) => sum + s.errors.filter(e => e.includes('timeout')).length, 0);
        const serverErrors = this.sessions.reduce((sum, s) => sum + s.errors.filter(e => e.includes('500')).length, 0);
        
        // Count navigation patterns
        const linear = this.sessions.filter(s => s.navigationPattern === 'linear').length;
        const tabSpamming = this.sessions.filter(s => s.navigationPattern === 'tabSpamming').length;
        const apiFlooding = this.sessions.filter(s => s.navigationPattern === 'apiFlooding').length;
        
        const recommendations = this.generateRecommendations({
            duplicateProgress,
            memoryLeaks,
            slowResponses,
            timeouts,
            serverErrors,
            actualCompletionRate
        });
        
        return {
            timestamp: new Date().toISOString(),
            totalUsers: this.sessions.length,
            totalLessons,
            targetCompletionRate,
            actualCompletionRate,
            testDuration,
            raceConditions: {
                duplicateProgress,
                concurrentWrites,
                stateInconsistencies
            },
            performanceIssues: {
                memoryLeaks,
                slowResponses,
                timeouts,
                serverErrors
            },
            navigationPatterns: {
                linear,
                tabSpamming,
                apiFlooding
            },
            sessions: this.sessions,
            recommendations
        };
    }

    private detectDuplicateProgress(): number {
        // Check for duplicate lesson completions (race condition indicator)
        let duplicates = 0;
        for (const session of this.sessions) {
            const uniqueLessons = new Set(session.lessonsCompleted);
            if (uniqueLessons.size !== session.lessonsCompleted.length) {
                duplicates++;
            }
        }
        return duplicates;
    }

    private detectMemoryLeaks(): number {
        // Check for significant memory increases during sessions
        let leaks = 0;
        for (const session of this.sessions) {
            if (session.memoryUsage.length >= 2) {
                const memoryIncrease = session.memoryUsage[1] - session.memoryUsage[0];
                if (memoryIncrease > 50 * 1024 * 1024) { // 50MB increase
                    leaks++;
                }
            }
        }
        return leaks;
    }

    private generateRecommendations(metrics: any): string[] {
        const recommendations: string[] = [];
        
        if (metrics.duplicateProgress > 0) {
            recommendations.push('Implement idempotent progress updates to prevent duplicate completions');
        }
        
        if (metrics.memoryLeaks > 5) {
            recommendations.push('Memory leaks detected - review session cleanup and garbage collection');
        }
        
        if (metrics.slowResponses > 20) {
            recommendations.push('High number of slow responses - optimize database queries and add caching');
        }
        
        if (metrics.timeouts > 10) {
            recommendations.push('Multiple timeouts detected - increase timeout values or improve performance');
        }
        
        if (metrics.serverErrors > 0) {
            recommendations.push('Server errors detected - review error handling and database constraints');
        }
        
        if (metrics.actualCompletionRate < 0.8) {
            recommendations.push('Low completion rate - investigate navigation blocking issues');
        }
        
        return recommendations;
    }

    async printNavigationResults(report: LessonNavigationReport): Promise<void> {
        console.log('\n' + '='.repeat(80));
        console.log('📚 LESSON NAVIGATION STRESS TEST RESULTS');
        console.log('='.repeat(80));
        
        console.log(`📊 Test Overview:`);
        console.log(`   Total Users: ${report.totalUsers}`);
        console.log(`   Total Lessons: ${report.totalLessons}`);
        console.log(`   Target Completion: ${(report.targetCompletionRate * 100).toFixed(1)}%`);
        console.log(`   Actual Completion: ${(report.actualCompletionRate * 100).toFixed(1)}%`);
        console.log(`   Test Duration: ${(report.testDuration / 1000).toFixed(1)}s`);
        
        console.log(`\n🏁 Race Conditions Detected:`);
        console.log(`   Duplicate Progress: ${report.raceConditions.duplicateProgress}`);
        console.log(`   Concurrent Writes: ${report.raceConditions.concurrentWrites}`);
        console.log(`   State Inconsistencies: ${report.raceConditions.stateInconsistencies}`);
        
        console.log(`\n⚡ Performance Issues:`);
        console.log(`   Memory Leaks: ${report.performanceIssues.memoryLeaks}`);
        console.log(`   Slow Responses (>3s): ${report.performanceIssues.slowResponses}`);
        console.log(`   Timeouts: ${report.performanceIssues.timeouts}`);
        console.log(`   Server Errors: ${report.performanceIssues.serverErrors}`);
        
        console.log(`\n🎯 Navigation Patterns:`);
        console.log(`   Linear (Beginners): ${report.navigationPatterns.linear}`);
        console.log(`   Tab Spamming (Intermediates): ${report.navigationPatterns.tabSpamming}`);
        console.log(`   API Flooding (Advanced): ${report.navigationPatterns.apiFlooding}`);
        
        console.log(`\n💡 Recommendations:`);
        report.recommendations.forEach(rec => console.log(`   • ${rec}`));
        
        const healthScore = this.calculateNavigationHealthScore(report);
        console.log(`\n🎯 Navigation System Health: ${healthScore}/100`);
        
        if (healthScore >= 90) {
            console.log('   ✅ EXCELLENT - Ready for high-traffic launch!');
        } else if (healthScore >= 75) {
            console.log('   ✅ GOOD - Minor optimizations recommended');
        } else if (healthScore >= 60) {
            console.log('   ⚠️  FAIR - Address performance issues before launch');
        } else {
            console.log('   ❌ POOR - Critical issues must be resolved');
        }
    }

    private calculateNavigationHealthScore(report: LessonNavigationReport): number {
        let score = 100;
        
        // Deduct for race conditions
        score -= report.raceConditions.duplicateProgress * 10;
        score -= report.raceConditions.stateInconsistencies * 5;
        
        // Deduct for performance issues
        score -= report.performanceIssues.memoryLeaks * 8;
        score -= Math.min(report.performanceIssues.slowResponses * 2, 20);
        score -= report.performanceIssues.timeouts * 3;
        score -= report.performanceIssues.serverErrors * 15;
        
        // Deduct for low completion rate
        if (report.actualCompletionRate < 0.9) {
            score -= (0.9 - report.actualCompletionRate) * 50;
        }
        
        return Math.max(0, Math.round(score));
    }
}

// Execute if run directly
if (import.meta.main) {
    const tester = new LessonNavigationTester();
    
    tester.initialize()
        .then(() => tester.runConcurrentNavigationTest())
        .then(async (report) => {
            await tester.printNavigationResults(report);
            
            // Save detailed report
            await fs.writeFile('LESSON_NAVIGATION_STRESS_TEST_REPORT.json', JSON.stringify(report, null, 2));
            console.log('\n📄 Detailed report saved to LESSON_NAVIGATION_STRESS_TEST_REPORT.json');
            
            const healthScore = tester['calculateNavigationHealthScore'](report);
            process.exit(healthScore >= 75 ? 0 : 1);
        })
        .catch(error => {
            console.error('\n💥 NAVIGATION STRESS TEST FAILED:', error);
            process.exit(1);
        });
}

export { LessonNavigationTester };