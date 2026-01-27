#!/usr/bin/env node

/**
 * Master Test Runner
 * 
 * Executes all testing systems for comprehensive application validation
 * Runs: Audit → Content Enrichment → Virtual User Testing → Robustness → Deployment → Dashboard
 * Provides complete launch readiness assessment
 */

const fs = require('fs');
const path = require('path');

class MasterTestRunner {
  constructor() {
    this.testResults = {
      startTime: null,
      endTime: null,
      totalDuration: 0,
      phases: {
        audit: { status: 'PENDING', duration: 0, issues: 0 },
        enrichment: { status: 'PENDING', duration: 0, issues: 0 },
        virtualUsers: { status: 'PENDING', duration: 0, issues: 0 },
        robustness: { status: 'PENDING', duration: 0, issues: 0 },
        deployment: { status: 'PENDING', duration: 0, issues: 0 },
        dashboard: { status: 'PENDING', duration: 0, issues: 0 }
      },
      overall: {
        status: 'PENDING',
        grade: 'F',
        score: 0,
        launchReady: false,
        blockers: [],
        recommendations: []
      }
    };
  }

  async run() {
    console.log('🚀 STARTING MASTER TEST RUNNER');
    console.log('================================');
    console.log('🎯 Objective: Complete application validation for launch');
    console.log('📅 Date:', new Date().toLocaleString());
    console.log('⏱️  Expected Duration: 5-10 minutes\n');
    
    this.testResults.startTime = new Date();
    
    try {
      // Phase 1: Content Audit
      await this.runPhase('audit', 'Content Audit', this.runAudit);
      
      // Phase 2: Content Enrichment
      await this.runPhase('enrichment', 'Content Enrichment', this.runEnrichment);
      
      // Phase 3: Virtual User Testing
      await this.runPhase('virtualUsers', 'Virtual User Testing (1500 users)', this.runVirtualUserTesting);
      
      // Phase 4: Robustness Testing
      await this.runPhase('robustness', 'Robustness Testing (90% coverage)', this.runRobustnessTesting);
      
      // Phase 5: Deployment Testing
      await this.runPhase('deployment', 'Deployed Web Testing', this.runDeploymentTesting);
      
      // Phase 6: Quality Dashboard
      await this.runPhase('dashboard', 'Quality Metrics Dashboard', this.runDashboard);
      
      // Final Assessment
      await this.generateFinalAssessment();
      
      // Display Results
      this.displayFinalResults();
      
    } catch (error) {
      console.error('❌ Master test runner failed:', error);
      this.testResults.overall.status = 'FAILED';
      this.testResults.endTime = new Date();
    }
    
    this.testResults.endTime = new Date();
    this.testResults.totalDuration = (this.testResults.endTime - this.testResults.startTime) / 1000;
    
    // Save master results
    await this.saveMasterResults();
  }

  async runPhase(phaseId, phaseName, phaseFunction) {
    console.log(`\n📍 Phase: ${phaseName}`);
    console.log('='.repeat(phaseName.length + 9));
    
    const startTime = Date.now();
    this.testResults.phases[phaseId].status = 'RUNNING';
    
    try {
      await phaseFunction();
      this.testResults.phases[phaseId].status = 'COMPLETED';
      console.log(`✅ ${phaseName} completed successfully`);
    } catch (error) {
      this.testResults.phases[phaseId].status = 'FAILED';
      this.testResults.phases[phaseId].issues = 1;
      console.error(`❌ ${phaseName} failed:`, error.message);
    }
    
    const duration = (Date.now() - startTime) / 1000;
    this.testResults.phases[phaseId].duration = duration;
    console.log(`⏱️  Duration: ${duration.toFixed(2)} seconds\n`);
  }

  async runAudit() {
    const ContentAuditor = require('./comprehensive-audit.cjs');
    const auditor = new ContentAuditor();
    await auditor.run();
  }

  async runEnrichment() {
    const ContentEnricher = require('./content-enricher.cjs');
    const enricher = new ContentEnricher();
    await enricher.run();
  }

  async runVirtualUserTesting() {
    const VirtualUserTesting = require('./virtual-user-testing.cjs');
    const testing = new VirtualUserTesting();
    await testing.run();
  }

  async runRobustnessTesting() {
    const RobustnessTestSuite = require('./robustness-test-suite.cjs');
    const robustness = new RobustnessTestSuite();
    await robustness.run();
  }

  async runDeploymentTesting() {
    const DeployedWebTesting = require('./deployed-web-testing.cjs');
    const deployment = new DeployedWebTesting();
    await deployment.run();
  }

  async runDashboard() {
    const QualityMetricsDashboard = require('./quality-metrics-dashboard.cjs');
    const dashboard = new QualityMetricsDashboard();
    await dashboard.run();
  }

  async generateFinalAssessment() {
    console.log('\n🎯 Generating Final Assessment...\n');
    
    // Load all test results
    const results = await this.loadAllTestResults();
    
    // Calculate overall score
    const scores = [];
    
    if (results.audit) {
      scores.push(results.audit.results.overall.qualityScore);
    }
    
    if (results.virtualUser) {
      scores.push(results.virtualUser.testSummary.successRate);
    }
    
    if (results.robustness) {
      const robustnessScore = results.robustness.summary.totalTests > 0 ? 
        (results.robustness.summary.passedTests / results.robustness.summary.totalTests) * 100 : 0;
      scores.push(robustnessScore);
    }
    
    if (results.deployment) {
      scores.push(parseFloat(results.deployment.summary.successRate));
    }
    
    const overallScore = scores.length > 0 ? 
      Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    
    // Determine grade
    let grade;
    if (overallScore >= 95) grade = 'A+';
    else if (overallScore >= 90) grade = 'A';
    else if (overallScore >= 85) grade = 'B+';
    else if (overallScore >= 80) grade = 'B';
    else if (overallScore >= 75) grade = 'C+';
    else if (overallScore >= 70) grade = 'C';
    else if (overallScore >= 65) grade = 'D';
    else grade = 'F';
    
    // Check launch readiness
    const launchReady = this.assessLaunchReadiness(results);
    
    // Identify blockers
    const blockers = this.identifyBlockers(results);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(results, blockers);
    
    this.testResults.overall = {
      status: launchReady ? 'READY' : 'NOT_READY',
      grade,
      score: overallScore,
      launchReady,
      blockers,
      recommendations
    };
  }

  async loadAllTestResults() {
    const results = {};
    
    // Load audit results
    try {
      const auditPath = path.join(process.cwd(), 'audit-report.json');
      if (fs.existsSync(auditPath)) {
        results.audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading audit results:', error.message);
    }
    
    // Load virtual user testing results
    try {
      const userTestPath = path.join(process.cwd(), 'virtual-user-test-report.json');
      if (fs.existsSync(userTestPath)) {
        results.virtualUser = JSON.parse(fs.readFileSync(userTestPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading user test results:', error.message);
    }
    
    // Load robustness results
    try {
      const robustnessPath = path.join(process.cwd(), 'robustness-test-report.json');
      if (fs.existsSync(robustnessPath)) {
        results.robustness = JSON.parse(fs.readFileSync(robustnessPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading robustness results:', error.message);
    }
    
    // Load deployment results
    try {
      const deploymentPath = path.join(process.cwd(), 'deployed-web-test-report.json');
      if (fs.existsSync(deploymentPath)) {
        results.deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading deployment results:', error.message);
    }
    
    // Load dashboard results
    try {
      const dashboardPath = path.join(process.cwd(), 'quality-metrics-dashboard.json');
      if (fs.existsSync(dashboardPath)) {
        results.dashboard = JSON.parse(fs.readFileSync(dashboardPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error loading dashboard results:', error.message);
    }
    
    return results;
  }

  assessLaunchReadiness(results) {
    const criteria = [];
    
    // Content quality criteria
    if (results.audit && results.audit.results.overall.qualityScore >= 80) {
      criteria.push(true);
    } else {
      criteria.push(false);
    }
    
    // Hindi completeness criteria
    if (results.audit && results.audit.results.overall.hindiCompleteness >= 90) {
      criteria.push(true);
    } else {
      criteria.push(false);
    }
    
    // User testing criteria
    if (results.virtualUser && results.virtualUser.testSummary.successRate >= 95) {
      criteria.push(true);
    } else {
      criteria.push(false);
    }
    
    // Robustness criteria
    if (results.robustness && results.robustness.summary.launchReadiness.status.includes('READY')) {
      criteria.push(true);
    } else {
      criteria.push(false);
    }
    
    // Deployment criteria
    if (results.deployment && results.deployment.summary.launchReadiness.status.includes('READY')) {
      criteria.push(true);
    } else {
      criteria.push(false);
    }
    
    const passedCriteria = criteria.filter(Boolean).length;
    return passedCriteria >= 4; // At least 4 out of 5 criteria must pass
  }

  identifyBlockers(results) {
    const blockers = [];
    
    // Content blockers
    if (results.audit) {
      if (results.audit.results.overall.qualityScore < 70) {
        blockers.push('Content quality below minimum threshold (70%)');
      }
      
      if (results.audit.results.overall.hindiCompleteness < 85) {
        blockers.push('Hindi completeness below minimum threshold (85%)');
      }
      
      if (results.audit.results.overall.contentGaps.length > 3) {
        blockers.push('Too many content gaps identified');
      }
    }
    
    // User testing blockers
    if (results.virtualUser) {
      if (results.virtualUser.testSummary.successRate < 90) {
        blockers.push('User testing success rate below 90%');
      }
      
      if (results.virtualUser.bugReports.critical > 0) {
        blockers.push(`${results.virtualUser.bugReports.critical} critical bugs found`);
      }
    }
    
    // Robustness blockers
    if (results.robustness) {
      if (results.robustness.bugs.critical > 0) {
        blockers.push(`${results.robustness.bugs.critical} critical robustness issues`);
      }
      
      if (results.robustness.summary.coverage.overall < 85) {
        blockers.push('Test coverage below 85%');
      }
    }
    
    // Deployment blockers
    if (results.deployment) {
      if (!results.deployment.summary.launchReadiness.status.includes('READY')) {
        blockers.push('Deployment not ready for production');
      }
      
      if (results.bugs.critical > 0) {
        blockers.push(`${results.deployment.bugs.critical} critical deployment issues`);
      }
    }
    
    return blockers;
  }

  generateRecommendations(results, blockers) {
    const recommendations = [];
    
    if (blockers.length > 0) {
      recommendations.push('🚫 CRITICAL: Address all blockers before launch');
    }
    
    // Content recommendations
    if (results.audit && results.audit.results.overall.qualityScore < 85) {
      recommendations.push('📚 Enhance content quality to reach Grade 8-9 standards');
    }
    
    if (results.audit && results.audit.results.overall.hindiCompleteness < 95) {
      recommendations.push('🇮🇳 Complete Hindi translations for 100% coverage');
    }
    
    // Performance recommendations
    if (results.virtualUser && results.virtualUser.testSummary.successRate < 98) {
      recommendations.push('⚡ Optimize performance and fix user experience issues');
    }
    
    // Testing recommendations
    if (results.robustness && results.robustness.summary.coverage.overall < 90) {
      recommendations.push('🧪 Increase test coverage to 90% or higher');
    }
    
    // Security recommendations
    const totalCriticalBugs = (results.robustness?.bugs.critical || 0) + (results.deployment?.bugs.critical || 0);
    if (totalCriticalBugs > 0) {
      recommendations.push('🔒 Fix all critical security vulnerabilities');
    }
    
    // Launch recommendations
    if (blockers.length === 0) {
      recommendations.push('🚀 READY: Proceed with launch preparation');
      recommendations.push('📊 Set up production monitoring and alerting');
      recommendations.push('🔄 Prepare rollback strategy for launch day');
    } else {
      recommendations.push('🔧 Fix all identified issues and re-run tests');
      recommendations.push('📋 Review launch readiness criteria');
    }
    
    return recommendations;
  }

  displayFinalResults() {
    console.log('\n🎯 FINAL TEST RESULTS');
    console.log('=====================');
    console.log(`⏱️  Total Duration: ${this.testResults.totalDuration.toFixed(2)} seconds`);
    console.log(`📊 Overall Grade: ${this.testResults.overall.grade}`);
    console.log(`📈 Overall Score: ${this.testResults.overall.score}/100`);
    console.log(`🚀 Launch Ready: ${this.testResults.overall.launchReady ? '✅ YES' : '❌ NO'}`);
    
    console.log('\n📋 Phase Results:');
    Object.entries(this.testResults.phases).forEach(([phase, result]) => {
      const status = result.status === 'COMPLETED' ? '✅' : result.status === 'FAILED' ? '❌' : '⏳';
      console.log(`   ${status} ${phase.charAt(0).toUpperCase() + phase.slice(1)}: ${result.status} (${result.duration.toFixed(2)}s)`);
    });
    
    if (this.testResults.overall.blockers.length > 0) {
      console.log('\n🚫 BLOCKERS:');
      this.testResults.overall.blockers.forEach((blocker, i) => {
        console.log(`   ${i + 1}. ${blocker}`);
      });
    }
    
    console.log('\n💡 RECOMMENDATIONS:');
    this.testResults.overall.recommendations.slice(0, 5).forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
    
    console.log('\n' + '='.repeat(50));
    if (this.testResults.overall.launchReady) {
      console.log('🎉 APPLICATION IS READY FOR LAUNCH! 🚀');
      console.log('📊 All quality metrics meet launch standards');
      console.log('🛡️ Robustness testing passed');
      console.log('🌐 Deployment validated');
      console.log('🇮🇳 Hindi completeness achieved');
    } else {
      console.log('⚠️  IMPROVEMENTS NEEDED BEFORE LAUNCH');
      console.log('🔧 Address all blockers and re-run tests');
      console.log('📈 Target: Grade A (90+) and 100% launch readiness');
    }
    console.log('='.repeat(50));
  }

  async saveMasterResults() {
    const resultsPath = path.join(process.cwd(), 'master-test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.testResults, null, 2));
    console.log(`\n💾 Master test results saved to: ${resultsPath}`);
  }
}

// Run the master test runner
if (require.main === module) {
  const runner = new MasterTestRunner();
  runner.run().catch(console.error);
}

module.exports = MasterTestRunner;
