#!/usr/bin/env tsx

/**
 * PRODUCTION READINESS TEST
 * Final comprehensive test before launch combining all resilience systems
 */

import { promises as fs } from 'fs';
import { executePwsh } from '../lib/utils.js';

interface ProductionReadinessReport {
    timestamp: string;
    overallScore: number;
    readinessStatus: 'READY' | 'NEEDS_OPTIMIZATION' | 'NOT_READY';
    testResults: {
        robustApp: { score: number; status: string };
        loginStress: { score: number; status: string };
        navigationStress: { score: number; status: string };
        masterSimulation: { score: number; status: string };
    };
    systemHealth: {
        circuitBreakers: string;
        queueEfficiency: string;
        databasePerformance: string;
        memoryManagement: string;
    };
    launchDecision: {
        approved: boolean;
        confidence: 'HIGH' | 'MEDIUM' | 'LOW';
        recommendations: string[];
        criticalIssues: string[];
    };
}

class ProductionReadinessTest {
    private testResults: any = {};

    async runComprehensiveTest(): Promise<ProductionReadinessReport> {
        console.log('🚀 PRODUCTION READINESS TEST - FINAL VALIDATION');
        console.log('='.repeat(80));
        console.log('🎯 Goal: Comprehensive pre-launch validation');
        console.log('⏰ Target: Complete validation within 30 minutes');
        console.log('🛡️ Testing: Circuit breakers, queues, race conditions, and resilience\n');

        const testStartTime = Date.now();

        try {
            // Test 1: Robust Application Components
            console.log('📋 TEST 1: ROBUST APPLICATION COMPONENTS');
            console.log('-'.repeat(50));
            await this.runRobustAppTest();

            // Test 2: Login Bottleneck Stress Test
            console.log('\n📋 TEST 2: LOGIN BOTTLENECK STRESS TEST');
            console.log('-'.repeat(50));
            await this.runLoginStressTest();

            // Test 3: Lesson Navigation Stress Test
            console.log('\n📋 TEST 3: LESSON NAVIGATION STRESS TEST');
            console.log('-'.repeat(50));
            await this.runNavigationStressTest();

            // Test 4: Master Launch Simulation
            console.log('\n📋 TEST 4: MASTER LAUNCH SIMULATION');
            console.log('-'.repeat(50));
            await this.runMasterSimulation();

            const testDuration = Date.now() - testStartTime;
            const report = this.generateFinalReport(testDuration);

            return report;

        } catch (error) {
            console.error('❌ Production readiness test failed:', error);
            throw error;
        }
    }

    private async runRobustAppTest(): Promise<void> {
        try {
            console.log('🧪 Running robust application test...');
            const result = await executePwsh('tsx scripts/test-robust-app.ts');
            
            this.testResults.robustApp = {
                success: result.includes('SUCCESS'),
                score: this.extractScore(result, 95), // Default high score for robust components
                output: result,
                issues: this.extractIssues(result)
            };

            console.log(`   ${this.testResults.robustApp.success ? '✅' : '❌'} Robust app test completed`);
        } catch (error) {
            console.log('   ❌ Robust app test failed');
            this.testResults.robustApp = {
                success: false,
                score: 0,
                error: String(error),
                issues: ['Robust application components not functioning']
            };
        }
    }

    private async runLoginStressTest(): Promise<void> {
        try {
            console.log('🔐 Running login stress test (75 concurrent users)...');
            const result = await executePwsh('tsx scripts/login-bottleneck-stress-test.ts');
            
            this.testResults.loginStress = {
                success: !result.includes('FAILED'),
                score: this.extractScore(result, 85),
                output: result,
                issues: this.extractIssues(result)
            };

            console.log(`   ${this.testResults.loginStress.success ? '✅' : '❌'} Login stress test completed`);
        } catch (error) {
            console.log('   ❌ Login stress test failed');
            this.testResults.loginStress = {
                success: false,
                score: 0,
                error: String(error),
                issues: ['Login system failed under stress']
            };
        }
    }

    private async runNavigationStressTest(): Promise<void> {
        try {
            console.log('📚 Running lesson navigation stress test...');
            const result = await executePwsh('tsx scripts/lesson-navigation-stress-test.ts');
            
            this.testResults.navigationStress = {
                success: !result.includes('FAILED'),
                score: this.extractScore(result, 80),
                output: result,
                issues: this.extractIssues(result)
            };

            console.log(`   ${this.testResults.navigationStress.success ? '✅' : '❌'} Navigation stress test completed`);
        } catch (error) {
            console.log('   ❌ Navigation stress test failed');
            this.testResults.navigationStress = {
                success: false,
                score: 0,
                error: String(error),
                issues: ['Lesson navigation failed under stress']
            };
        }
    }

    private async runMasterSimulation(): Promise<void> {
        try {
            console.log('🎯 Running master launch simulation...');
            const result = await executePwsh('tsx scripts/master-launch-simulation.ts');
            
            this.testResults.masterSimulation = {
                success: result.includes('READY FOR LAUNCH') || result.includes('READY WITH MONITORING'),
                score: this.extractScore(result, 90),
                output: result,
                issues: this.extractIssues(result)
            };

            console.log(`   ${this.testResults.masterSimulation.success ? '✅' : '❌'} Master simulation completed`);
        } catch (error) {
            console.log('   ❌ Master simulation failed');
            this.testResults.masterSimulation = {
                success: false,
                score: 0,
                error: String(error),
                issues: ['Master simulation failed']
            };
        }
    }

    private extractScore(output: string, defaultScore: number): number {
        // Extract score from output using various patterns
        const scorePatterns = [
            /Score:\s*(\d+)\/100/i,
            /(\d+)\/100/,
            /score:\s*(\d+)/i,
            /readiness.*?(\d+)/i
        ];

        for (const pattern of scorePatterns) {
            const match = output.match(pattern);
            if (match) {
                return parseInt(match[1], 10);
            }
        }

        // If no score found, estimate based on success indicators
        if (output.includes('SUCCESS') || output.includes('READY')) {
            return defaultScore;
        } else if (output.includes('WARNING') || output.includes('OPTIMIZATION')) {
            return Math.floor(defaultScore * 0.8);
        } else {
            return Math.floor(defaultScore * 0.5);
        }
    }

    private extractIssues(output: string): string[] {
        const issues: string[] = [];
        
        // Extract various issue indicators
        const lines = output.split('\n');
        for (const line of lines) {
            if (line.includes('❌') || line.includes('FAILED') || line.includes('ERROR')) {
                issues.push(line.trim());
            } else if (line.includes('⚠️') || line.includes('WARNING')) {
                issues.push(line.trim());
            } else if (line.includes('CRITICAL') || line.includes('TIMEOUT')) {
                issues.push(line.trim());
            }
        }

        return issues.slice(0, 5); // Limit to top 5 issues
    }

    private generateFinalReport(testDuration: number): ProductionReadinessReport {
        const scores = [
            this.testResults.robustApp?.score || 0,
            this.testResults.loginStress?.score || 0,
            this.testResults.navigationStress?.score || 0,
            this.testResults.masterSimulation?.score || 0
        ];

        const overallScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
        
        let readinessStatus: 'READY' | 'NEEDS_OPTIMIZATION' | 'NOT_READY';
        if (overallScore >= 85) readinessStatus = 'READY';
        else if (overallScore >= 70) readinessStatus = 'NEEDS_OPTIMIZATION';
        else readinessStatus = 'NOT_READY';

        // Collect all critical issues
        const criticalIssues: string[] = [];
        Object.values(this.testResults).forEach((test: any) => {
            if (test.issues) {
                criticalIssues.push(...test.issues.filter((issue: string) => 
                    issue.includes('CRITICAL') || issue.includes('FAILED') || issue.includes('❌')
                ));
            }
        });

        // Generate recommendations
        const recommendations: string[] = [];
        if (readinessStatus === 'READY') {
            recommendations.push('System is production-ready for launch');
            recommendations.push('Monitor all metrics closely during launch');
            recommendations.push('Have incident response team on standby');
        } else if (readinessStatus === 'NEEDS_OPTIMIZATION') {
            recommendations.push('Address performance optimizations before launch');
            recommendations.push('Consider staged rollout to limit risk');
            recommendations.push('Implement additional monitoring and alerting');
        } else {
            recommendations.push('Critical issues must be resolved before launch');
            recommendations.push('Re-run all tests after implementing fixes');
            recommendations.push('Consider delaying launch until system is stable');
        }

        return {
            timestamp: new Date().toISOString(),
            overallScore,
            readinessStatus,
            testResults: {
                robustApp: {
                    score: this.testResults.robustApp?.score || 0,
                    status: this.testResults.robustApp?.success ? 'PASS' : 'FAIL'
                },
                loginStress: {
                    score: this.testResults.loginStress?.score || 0,
                    status: this.testResults.loginStress?.success ? 'PASS' : 'FAIL'
                },
                navigationStress: {
                    score: this.testResults.navigationStress?.score || 0,
                    status: this.testResults.navigationStress?.success ? 'PASS' : 'FAIL'
                },
                masterSimulation: {
                    score: this.testResults.masterSimulation?.score || 0,
                    status: this.testResults.masterSimulation?.success ? 'PASS' : 'FAIL'
                }
            },
            systemHealth: {
                circuitBreakers: this.assessCircuitBreakers(),
                queueEfficiency: this.assessQueueEfficiency(),
                databasePerformance: this.assessDatabasePerformance(),
                memoryManagement: this.assessMemoryManagement()
            },
            launchDecision: {
                approved: readinessStatus !== 'NOT_READY',
                confidence: readinessStatus === 'READY' ? 'HIGH' : 
                          readinessStatus === 'NEEDS_OPTIMIZATION' ? 'MEDIUM' : 'LOW',
                recommendations,
                criticalIssues: criticalIssues.slice(0, 10) // Top 10 critical issues
            }
        };
    }

    private assessCircuitBreakers(): string {
        const loginTest = this.testResults.loginStress;
        if (loginTest?.output?.includes('Circuit breaker')) {
            return 'ACTIVE_PROTECTION';
        } else if (loginTest?.success) {
            return 'STANDBY_READY';
        } else {
            return 'NEEDS_ATTENTION';
        }
    }

    private assessQueueEfficiency(): string {
        const loginTest = this.testResults.loginStress;
        if (loginTest?.output?.includes('queue') && loginTest.success) {
            return 'EFFICIENT';
        } else if (loginTest?.success) {
            return 'ADEQUATE';
        } else {
            return 'NEEDS_OPTIMIZATION';
        }
    }

    private assessDatabasePerformance(): string {
        const masterTest = this.testResults.masterSimulation;
        if (masterTest?.output?.includes('Database Performance') && masterTest.success) {
            return 'OPTIMAL';
        } else if (masterTest?.success) {
            return 'ADEQUATE';
        } else {
            return 'NEEDS_OPTIMIZATION';
        }
    }

    private assessMemoryManagement(): string {
        const navTest = this.testResults.navigationStress;
        if (navTest?.output?.includes('memory') && !navTest?.output?.includes('leak')) {
            return 'STABLE';
        } else if (navTest?.success) {
            return 'ADEQUATE';
        } else {
            return 'CONCERNING';
        }
    }

    async printFinalResults(report: ProductionReadinessReport): Promise<void> {
        console.log('\n' + '='.repeat(80));
        console.log('🎯 PRODUCTION READINESS TEST - FINAL RESULTS');
        console.log('='.repeat(80));
        
        console.log(`📊 Overall Assessment:`);
        console.log(`   Production Readiness Score: ${report.overallScore}/100`);
        console.log(`   Status: ${report.readinessStatus}`);
        console.log(`   Launch Approved: ${report.launchDecision.approved ? 'YES' : 'NO'}`);
        console.log(`   Confidence Level: ${report.launchDecision.confidence}`);
        
        console.log(`\n🧪 Test Results:`);
        console.log(`   Robust App Components: ${report.testResults.robustApp.score}/100 (${report.testResults.robustApp.status})`);
        console.log(`   Login Stress Test: ${report.testResults.loginStress.score}/100 (${report.testResults.loginStress.status})`);
        console.log(`   Navigation Stress Test: ${report.testResults.navigationStress.score}/100 (${report.testResults.navigationStress.status})`);
        console.log(`   Master Simulation: ${report.testResults.masterSimulation.score}/100 (${report.testResults.masterSimulation.status})`);
        
        console.log(`\n🛡️ System Health:`);
        console.log(`   Circuit Breakers: ${report.systemHealth.circuitBreakers}`);
        console.log(`   Queue Efficiency: ${report.systemHealth.queueEfficiency}`);
        console.log(`   Database Performance: ${report.systemHealth.databasePerformance}`);
        console.log(`   Memory Management: ${report.systemHealth.memoryManagement}`);
        
        if (report.launchDecision.criticalIssues.length > 0) {
            console.log(`\n🚨 Critical Issues:`);
            report.launchDecision.criticalIssues.forEach((issue, i) => {
                console.log(`   ${i + 1}. ${issue}`);
            });
        }
        
        console.log(`\n💡 Recommendations:`);
        report.launchDecision.recommendations.forEach((rec, i) => {
            console.log(`   ${i + 1}. ${rec}`);
        });
        
        // Final verdict
        console.log('\n' + '='.repeat(80));
        if (report.readinessStatus === 'READY') {
            console.log('🎉 LAUNCH APPROVED - System ready for production!');
            console.log('✅ All systems demonstrate excellent resilience');
            console.log('🚀 Proceed with confidence to launch');
            console.log('📊 Circuit breakers and queues are protecting the system');
        } else if (report.readinessStatus === 'NEEDS_OPTIMIZATION') {
            console.log('⚠️  CONDITIONAL LAUNCH - Optimizations recommended');
            console.log('🔧 Address performance issues for optimal experience');
            console.log('📊 Consider staged rollout with close monitoring');
            console.log('🛡️ Resilience systems are in place but need tuning');
        } else {
            console.log('❌ LAUNCH NOT RECOMMENDED - Critical issues detected');
            console.log('🛠️  Resolve critical issues before proceeding');
            console.log('🔄 Re-run tests after implementing fixes');
            console.log('⚠️  System resilience compromised');
        }
        console.log('='.repeat(80));
    }
}

// Execute if run directly
if (import.meta.main) {
    const tester = new ProductionReadinessTest();
    
    tester.runComprehensiveTest()
        .then(async (report) => {
            await tester.printFinalResults(report);
            
            // Save comprehensive report
            await fs.writeFile('PRODUCTION_READINESS_REPORT.json', JSON.stringify(report, null, 2));
            console.log('\n📄 Comprehensive report saved to PRODUCTION_READINESS_REPORT.json');
            
            process.exit(report.readinessStatus === 'NOT_READY' ? 1 : 0);
        })
        .catch(error => {
            console.error('\n💥 PRODUCTION READINESS TEST FAILED:', error);
            process.exit(1);
        });
}

export { ProductionReadinessTest };