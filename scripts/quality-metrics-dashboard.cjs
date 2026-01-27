#!/usr/bin/env node

/**
 * Quality Metrics Dashboard and Launch Readiness Report
 * 
 * Comprehensive dashboard showing all quality metrics
 * Final launch readiness assessment
 * Combines results from all testing systems
 */

const fs = require('fs');
const path = require('path');

class QualityMetricsDashboard {
  constructor() {
    this.dashboardData = {
      overview: {
        totalAudits: 0,
        overallGrade: 'F',
        qualityScore: 0,
        hindiCompleteness: 0,
        launchReadiness: 'NOT READY',
        timestamp: new Date().toISOString()
      },
      contentQuality: {
        lessonsAudited: 0,
        averageQuality: 0,
        hindiCoverage: 0,
        vocabularyAdequacy: 0,
        contentGaps: [],
        enrichmentStatus: 'NOT STARTED'
      },
      userTesting: {
        virtualUsers: 0,
        successRate: 0,
        lessonCoverage: 0,
        bugReports: 0,
        performanceScore: 0,
        userSatisfaction: 0
      },
      robustness: {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        coverage: {
          lessons: 0,
          pages: 0,
          components: 0,
          apis: 0,
          overall: 0
        },
        criticalBugs: 0,
        functionalityHealth: 'POOR'
      },
      deployment: {
        baseUrl: '',
        endpointTests: 0,
        pageTests: 0,
        functionalityTests: 0,
        performanceTests: 0,
        securityTests: 0,
        deploymentScore: 0,
        productionReady: false
      },
      recommendations: [],
      launchChecklist: {
        content: false,
        functionality: false,
        performance: false,
        security: false,
        deployment: false,
        overall: false
      },
      finalAssessment: {
        ready: false,
        score: 0,
        blockers: [],
        risks: [],
        nextSteps: []
      }
    };
  }

  async initialize() {
    console.log('📊 Initializing Quality Metrics Dashboard...\n');
    
    // Load data from all test reports
    await this.loadAuditResults();
    await this.loadUserTestingResults();
    await this.loadRobustnessResults();
    await this.loadDeploymentResults();
    
    console.log('✅ Loaded all test results');
  }

  async loadAuditResults() {
    try {
      const auditPath = path.join(process.cwd(), 'audit-report.json');
      if (fs.existsSync(auditPath)) {
        const auditData = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
        
        this.dashboardData.contentQuality = {
          lessonsAudited: auditData.results.overall.totalLessons,
          averageQuality: auditData.results.overall.qualityScore,
          hindiCoverage: auditData.results.overall.hindiCompleteness,
          vocabularyAdequacy: this.calculateVocabularyAdequacy(auditData.results.lessons),
          contentGaps: auditData.results.overall.contentGaps,
          enrichmentStatus: 'COMPLETED'
        };
        
        console.log('✅ Loaded audit results');
      } else {
        console.log('⚠️  Audit results not found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading audit results:', error.message);
    }
  }

  async loadUserTestingResults() {
    try {
      const userTestPath = path.join(process.cwd(), 'virtual-user-test-report.json');
      if (fs.existsSync(userTestPath)) {
        const userData = JSON.parse(fs.readFileSync(userTestPath, 'utf8'));
        
        this.dashboardData.userTesting = {
          virtualUsers: userData.testSummary.totalUsers,
          successRate: userData.testSummary.successRate,
          lessonCoverage: userData.testSummary.lessonCoverage,
          bugReports: userData.bugReports.total,
          performanceScore: this.calculatePerformanceScore(userData.performanceMetrics),
          userSatisfaction: this.calculateUserSatisfaction(userData.userBehavior)
        };
        
        console.log('✅ Loaded user testing results');
      } else {
        console.log('⚠️  User testing results not found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading user testing results:', error.message);
    }
  }

  async loadRobustnessResults() {
    try {
      const robustnessPath = path.join(process.cwd(), 'robustness-test-report.json');
      if (fs.existsSync(robustnessPath)) {
        const robustnessData = JSON.parse(fs.readFileSync(robustnessPath, 'utf8'));
        
        this.dashboardData.robustness = {
          totalTests: robustnessData.summary.totalTests,
          passedTests: robustnessData.summary.passedTests,
          failedTests: robustnessData.summary.failedTests,
          coverage: robustnessData.summary.coverage,
          criticalBugs: robustnessData.bugs.critical,
          functionalityHealth: this.assessFunctionalityHealth(robustnessData.functionality)
        };
        
        console.log('✅ Loaded robustness test results');
      } else {
        console.log('⚠️  Robustness test results not found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading robustness test results:', error.message);
    }
  }

  async loadDeploymentResults() {
    try {
      const deploymentPath = path.join(process.cwd(), 'deployed-web-test-report.json');
      if (fs.existsSync(deploymentPath)) {
        const deploymentData = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
        
        this.dashboardData.deployment = {
          baseUrl: deploymentData.deployment.baseUrl,
          endpointTests: deploymentData.categories.endpoints.totalTests,
          pageTests: deploymentData.categories.pages.totalTests,
          functionalityTests: deploymentData.categories.functionality.totalTests,
          performanceTests: deploymentData.categories.performance.totalTests,
          securityTests: deploymentData.categories.security.totalTests,
          deploymentScore: parseFloat(deploymentData.summary.successRate),
          productionReady: deploymentData.summary.launchReadiness.status.includes('READY')
        };
        
        console.log('✅ Loaded deployment test results');
      } else {
        console.log('⚠️  Deployment test results not found, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading deployment test results:', error.message);
    }
  }

  calculateVocabularyAdequacy(lessons) {
    if (!lessons || lessons.length === 0) return 0;
    
    const totalVocabulary = lessons.reduce((sum, lesson) => {
      return sum + (lesson.scores?.vocabularyAdequacy || 0);
    }, 0);
    
    return Math.round(totalVocabulary / lessons.length);
  }

  calculatePerformanceScore(performanceMetrics) {
    if (!performanceMetrics) return 0;
    
    // Calculate performance score based on response times and error rates
    let score = 100;
    
    if (performanceMetrics.averagePageLoadTime) {
      const loadTime = parseInt(performanceMetrics.averagePageLoadTime);
      if (loadTime > 3000) score -= 30;
      else if (loadTime > 2000) score -= 15;
    }
    
    if (performanceMetrics.averageApiResponseTime) {
      const responseTime = parseInt(performanceMetrics.averageApiResponseTime);
      if (responseTime > 1000) score -= 30;
      else if (responseTime > 500) score -= 15;
    }
    
    if (performanceMetrics.errorRate) {
      const errorRate = parseFloat(performanceMetrics.errorRate);
      if (errorRate > 5) score -= 40;
      else if (errorRate > 2) score -= 20;
    }
    
    return Math.max(0, score);
  }

  calculateUserSatisfaction(userBehavior) {
    if (!userBehavior || !userBehavior.engagementMetrics) return 0;
    
    const metrics = Object.values(userBehavior.engagementMetrics);
    const totalSatisfaction = metrics.reduce((sum, metric) => sum + metric.averageSatisfaction, 0);
    return Math.round(totalSatisfaction / metrics.length);
  }

  assessFunctionalityHealth(functionality) {
    if (!functionality) return 'POOR';
    
    const categories = Object.entries(functionality);
    const healthyCategories = categories.filter(([name, results]) => {
      const total = results.passed + results.failed;
      const successRate = total > 0 ? results.passed / total : 0;
      return successRate >= 0.9;
    });
    
    const healthPercentage = (healthyCategories.length / categories.length) * 100;
    
    if (healthPercentage >= 95) return 'EXCELLENT';
    else if (healthPercentage >= 85) return 'GOOD';
    else if (healthPercentage >= 70) return 'FAIR';
    else return 'POOR';
  }

  async generateDashboard() {
    console.log('\n📈 Generating Quality Metrics Dashboard...\n');
    
    // Calculate overall metrics
    this.calculateOverallMetrics();
    
    // Generate launch checklist
    this.generateLaunchChecklist();
    
    // Create final assessment
    this.createFinalAssessment();
    
    // Generate recommendations
    this.generateRecommendations();
    
    // Save dashboard
    await this.saveDashboard();
    
    // Display dashboard
    this.displayDashboard();
  }

  calculateOverallMetrics() {
    // Calculate overall quality score
    const contentWeight = 0.3;
    const userTestingWeight = 0.25;
    const robustnessWeight = 0.25;
    const deploymentWeight = 0.2;
    
    const contentScore = this.dashboardData.contentQuality.averageQuality;
    const userScore = this.dashboardData.userTesting.successRate;
    const robustnessScore = this.dashboardData.robustness.totalTests > 0 ? 
      (this.dashboardData.robustness.passedTests / this.dashboardData.robustness.totalTests) * 100 : 0;
    const deploymentScore = this.dashboardData.deployment.deploymentScore;
    
    this.dashboardData.overall.qualityScore = Math.round(
      contentScore * contentWeight +
      userScore * userTestingWeight +
      robustnessScore * robustnessWeight +
      deploymentScore * deploymentWeight
    );
    
    // Calculate overall grade
    this.dashboardData.overall.overallGrade = this.calculateGrade(this.dashboardData.overall.qualityScore);
    
    // Calculate Hindi completeness
    this.dashboardData.overall.hindiCompleteness = this.dashboardData.contentQuality.hindiCoverage;
    
    // Calculate launch readiness
    this.dashboardData.overall.launchReadiness = this.assessLaunchReadiness();
    
    // Update overview
    this.dashboardData.overview.totalAudits = 
      this.dashboardData.contentQuality.lessonsAudited +
      this.dashboardData.userTesting.virtualUsers +
      this.dashboardData.robustness.totalTests +
      this.dashboardData.deployment.endpointTests +
      this.dashboardData.deployment.pageTests;
  }

  calculateGrade(score) {
    if (score >= 95) return 'A+';
    else if (score >= 90) return 'A';
    else if (score >= 85) return 'B+';
    else if (score >= 80) return 'B';
    else if (score >= 75) return 'C+';
    else if (score >= 70) return 'C';
    else if (score >= 65) return 'D';
    else return 'F';
  }

  assessLaunchReadiness() {
    const criteria = {
      content: this.dashboardData.contentQuality.averageQuality >= 80,
      hindi: this.dashboardData.contentQuality.hindiCoverage >= 90,
      userTesting: this.dashboardData.userTesting.successRate >= 95,
      robustness: this.dashboardData.robustness.totalTests > 0 && 
        (this.dashboardData.robustness.passedTests / this.dashboardData.robustness.totalTests) >= 0.95,
      deployment: this.dashboardData.deployment.productionReady,
      bugs: this.dashboardData.robustness.criticalBugs === 0
    };
    
    const passedCriteria = Object.values(criteria).filter(Boolean).length;
    const totalCriteria = Object.keys(criteria).length;
    const readinessScore = (passedCriteria / totalCriteria) * 100;
    
    if (readinessScore >= 95) return 'READY FOR LAUNCH';
    else if (readinessScore >= 85) return 'READY WITH MINOR MONITORING';
    else if (readinessScore >= 70) return 'NEEDS IMPROVEMENTS';
    else return 'NOT READY';
  }

  generateLaunchChecklist() {
    this.dashboardData.launchChecklist = {
      content: this.dashboardData.contentQuality.averageQuality >= 80 && 
               this.dashboardData.contentQuality.hindiCoverage >= 90,
      functionality: this.dashboardData.robustness.functionalityHealth !== 'POOR',
      performance: this.dashboardData.userTesting.performanceScore >= 75,
      security: this.dashboardData.deployment.securityTests > 0 && 
               this.dashboardData.robustness.criticalBugs === 0,
      deployment: this.dashboardData.deployment.productionReady,
      overall: false // Will be calculated below
    };
    
    // Calculate overall checklist status
    const checks = Object.values(this.dashboardData.launchChecklist);
    const passedChecks = checks.filter(Boolean).length;
    this.dashboardData.launchChecklist.overall = (passedChecks / checks.length) >= 0.8;
  }

  createFinalAssessment() {
    const score = this.dashboardData.overall.qualityScore;
    const ready = this.dashboardData.overall.launchReadiness.includes('READY');
    
    const blockers = [];
    const risks = [];
    
    // Identify blockers
    if (this.dashboardData.robustness.criticalBugs > 0) {
      blockers.push(`${this.dashboardData.robustness.criticalBugs} critical bugs must be fixed`);
    }
    
    if (this.dashboardData.contentQuality.hindiCoverage < 90) {
      blockers.push('Hindi translations must reach 90% coverage');
    }
    
    if (!this.dashboardData.deployment.productionReady) {
      blockers.push('Deployment must pass all production tests');
    }
    
    // Identify risks
    if (this.dashboardData.userTesting.performanceScore < 75) {
      risks.push('Performance issues may affect user experience');
    }
    
    if (this.dashboardData.robustness.functionalityHealth === 'FAIR') {
      risks.push('Some functionality issues may impact user experience');
    }
    
    if (this.dashboardData.contentQuality.contentGaps.length > 0) {
      risks.push('Content gaps may affect learning progression');
    }
    
    // Generate next steps
    const nextSteps = [];
    
    if (blockers.length > 0) {
      nextSteps.push('Address all critical blockers immediately');
    }
    
    if (this.dashboardData.contentQuality.averageQuality < 85) {
      nextSteps.push('Complete content enrichment to reach Grade 8-9 quality');
    }
    
    if (risks.length > 0) {
      nextSteps.push('Mitigate identified risks before launch');
    }
    
    if (ready) {
      nextSteps.push('Proceed with launch preparation');
      nextSteps.push('Set up production monitoring');
      nextSteps.length = 0; // Clear and add launch-specific steps
      nextSteps.push('🚀 READY FOR LAUNCH!');
      nextSteps.push('Execute launch checklist');
      nextSteps.push('Monitor launch metrics');
      nextSteps.push('Prepare rollback plan');
    } else {
      nextSteps.push('Fix identified issues');
      nextSteps.push('Re-run testing after fixes');
      nextSteps.push('Review launch readiness criteria');
    }
    
    this.dashboardData.finalAssessment = {
      ready,
      score,
      blockers,
      risks,
      nextSteps
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Content recommendations
    if (this.dashboardData.contentQuality.averageQuality < 85) {
      recommendations.push({
        category: 'Content',
        priority: 'HIGH',
        action: 'Enhance lesson content to reach Grade 8-9 quality standards',
        details: 'Add more examples, cultural context, and practice exercises'
      });
    }
    
    if (this.dashboardData.contentQuality.hindiCoverage < 95) {
      recommendations.push({
        category: 'Content',
        priority: 'HIGH',
        action: 'Complete Hindi translations for all content',
        details: 'Ensure 100% Hindi readability across the application'
      });
    }
    
    // Functionality recommendations
    if (this.dashboardData.robustness.functionalityHealth !== 'EXCELLENT') {
      recommendations.push({
        category: 'Functionality',
        priority: 'MEDIUM',
        action: 'Improve application functionality',
        details: 'Fix failing tests and improve user experience'
      });
    }
    
    // Performance recommendations
    if (this.dashboardData.userTesting.performanceScore < 80) {
      recommendations.push({
        category: 'Performance',
        priority: 'MEDIUM',
        action: 'Optimize application performance',
        details: 'Reduce page load times and API response times'
      });
    }
    
    // Security recommendations
    if (this.dashboardData.robustness.criticalBugs > 0) {
      recommendations.push({
        category: 'Security',
        priority: 'CRITICAL',
        action: 'Fix all security vulnerabilities',
        details: 'Address critical security issues immediately'
      });
    }
    
    // Deployment recommendations
    if (!this.dashboardData.deployment.productionReady) {
      recommendations.push({
        category: 'Deployment',
        priority: 'HIGH',
        action: 'Ensure deployment is production-ready',
        details: 'Fix deployment issues and pass all production tests'
      });
    }
    
    this.dashboardData.recommendations = recommendations;
  }

  async saveDashboard() {
    const dashboardPath = path.join(process.cwd(), 'quality-metrics-dashboard.json');
    fs.writeFileSync(dashboardPath, JSON.stringify(this.dashboardData, null, 2));
    
    // Also save a readable HTML report
    const htmlReport = this.generateHtmlReport();
    const htmlPath = path.join(process.cwd(), 'quality-metrics-dashboard.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log(`💾 Dashboard saved to: ${dashboardPath}`);
    console.log(`📄 HTML report saved to: ${htmlPath}`);
  }

  generateHtmlReport() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preet English - Quality Metrics Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .dashboard { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .grade { font-size: 48px; font-weight: bold; margin: 10px 0; }
        .grade.A { color: #4CAF50; }
        .grade.B { color: #2196F3; }
        .grade.C { color: #FF9800; }
        .grade.D { color: #F44336; }
        .grade.F { color: #9E9E9E; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric-card { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff; }
        .metric-title { font-weight: bold; margin-bottom: 5px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #007bff; }
        .checklist { margin: 20px 0; }
        .checklist-item { display: flex; align-items: center; margin: 10px 0; }
        .checklist-item.passed { color: #4CAF50; }
        .checklist-item.failed { color: #F44336; }
        .checklist-item.passed::before { content: "✅ "; }
        .checklist-item.failed::before { content: "❌ "; }
        .recommendations { margin: 20px 0; }
        .recommendation { background: #fff3cd; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 4px solid #ffc107; }
        .priority-HIGH { border-left-color: #F44336; }
        .priority-CRITICAL { border-left-color: #8B0000; }
        .final-assessment { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .ready { background: #d4edda; border-left: 4px solid #28a745; }
        .not-ready { background: #f8d7da; border-left: 4px solid #dc3545; }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🇮🇳 Preet English - Quality Metrics Dashboard</h1>
            <div class="grade ${this.dashboardData.overall.overallGrade}">
                Grade: ${this.dashboardData.overall.overallGrade}
            </div>
            <p>Quality Score: ${this.dashboardData.overall.qualityScore}/100 | Hindi Completeness: ${this.dashboardData.overall.hindiCompleteness}%</p>
            <p><strong>Status: ${this.dashboardData.overall.launchReadiness}</strong></p>
            <p>Generated: ${new Date(this.dashboardData.overview.timestamp).toLocaleString()}</p>
        </div>

        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">Content Quality</div>
                <div class="metric-value">${this.dashboardData.contentQuality.averageQuality}/100</div>
                <p>Lessons: ${this.dashboardData.contentQuality.lessonsAudited}</p>
                <p>Hindi Coverage: ${this.dashboardData.contentQuality.hindiCoverage}%</p>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">User Testing</div>
                <div class="metric-value">${this.dashboardData.userTesting.successRate}%</div>
                <p>Virtual Users: ${this.dashboardData.userTesting.virtualUsers}</p>
                <p>Coverage: ${this.dashboardData.userTesting.lessonCoverage}%</p>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Robustness</div>
                <div class="metric-value">${this.dashboardData.robustness.totalTests > 0 ? Math.round((this.dashboardData.robustness.passedTests / this.dashboardData.robustness.totalTests) * 100) : 0}%</div>
                <p>Tests: ${this.dashboardData.robustness.passedTests}/${this.dashboardData.robustness.totalTests}</p>
                <p>Critical Bugs: ${this.dashboardData.robustness.criticalBugs}</p>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Deployment</div>
                <div class="metric-value">${this.dashboardData.deployment.deploymentScore}%</div>
                <p>Production Ready: ${this.dashboardData.deployment.productionReady ? '✅' : '❌'}</p>
                <p>URL: ${this.dashboardData.deployment.baseUrl || 'Not tested'}</p>
            </div>
        </div>

        <div class="checklist">
            <h3>🚀 Launch Checklist</h3>
            <div class="checklist-item ${this.dashboardData.launchChecklist.content ? 'passed' : 'failed'}">
                Content Quality (≥80% and ≥90% Hindi)
            </div>
            <div class="checklist-item ${this.dashboardData.launchChecklist.functionality ? 'passed' : 'failed'}">
                Functionality Health (Good or Excellent)
            </div>
            <div class="checklist-item ${this.dashboardData.launchChecklist.performance ? 'passed' : 'failed'}">
                Performance (≥75% score)
            </div>
            <div class="checklist-item ${this.dashboardData.launchChecklist.security ? 'passed' : 'failed'}">
                Security (No critical bugs)
            </div>
            <div class="checklist-item ${this.dashboardData.launchChecklist.deployment ? 'passed' : 'failed'}">
                Deployment Ready
            </div>
        </div>

        <div class="final-assessment ${this.dashboardData.finalAssessment.ready ? 'ready' : 'not-ready'}">
            <h3>📋 Final Assessment</h3>
            <p><strong>Status: ${this.dashboardData.finalAssessment.ready ? '✅ READY FOR LAUNCH' : '❌ NOT READY'}</strong></p>
            <p>Overall Score: ${this.dashboardData.finalAssessment.score}/100</p>
            
            ${this.dashboardData.finalAssessment.blockers.length > 0 ? `
                <h4>🚫 Blockers:</h4>
                <ul>
                    ${this.dashboardData.finalAssessment.blockers.map(blocker => `<li>${blocker}</li>`).join('')}
                </ul>
            ` : ''}
            
            ${this.dashboardData.finalAssessment.risks.length > 0 ? `
                <h4>⚠️ Risks:</h4>
                <ul>
                    ${this.dashboardData.finalAssessment.risks.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            ` : ''}
            
            <h4>📝 Next Steps:</h4>
            <ol>
                ${this.dashboardData.finalAssessment.nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>

        ${this.dashboardData.recommendations.length > 0 ? `
            <div class="recommendations">
                <h3>💡 Recommendations</h3>
                ${this.dashboardData.recommendations.map(rec => `
                    <div class="recommendation priority-${rec.priority}">
                        <strong>${rec.category} - ${rec.priority}:</strong> ${rec.action}
                        <br><small>${rec.details}</small>
                    </div>
                `).join('')}
            </div>
        ` : ''}
    </div>
</body>
</html>`;
  }

  displayDashboard() {
    console.log('📊 QUALITY METRICS DASHBOARD');
    console.log('=============================');
    console.log(`🎯 Overall Grade: ${this.dashboardData.overall.overallGrade}`);
    console.log(`📈 Quality Score: ${this.dashboardData.overall.qualityScore}/100`);
    console.log(`🇮🇳 Hindi Completeness: ${this.dashboardData.overall.hindiCompleteness}%`);
    console.log(`🚀 Launch Readiness: ${this.dashboardData.overall.launchReadiness}`);
    console.log(`📅 Generated: ${new Date(this.dashboardData.overview.timestamp).toLocaleString()}`);
    
    console.log('\n📚 CONTENT QUALITY:');
    console.log(`   Lessons Audited: ${this.dashboardData.contentQuality.lessonsAudited}`);
    console.log(`   Average Quality: ${this.dashboardData.contentQuality.averageQuality}/100`);
    console.log(`   Hindi Coverage: ${this.dashboardData.contentQuality.hindiCoverage}%`);
    console.log(`   Vocabulary Adequacy: ${this.dashboardData.contentQuality.vocabularyAdequacy}/100`);
    console.log(`   Enrichment Status: ${this.dashboardData.contentQuality.enrichmentStatus}`);
    
    console.log('\n👥 USER TESTING:');
    console.log(`   Virtual Users: ${this.dashboardData.userTesting.virtualUsers}`);
    console.log(`   Success Rate: ${this.dashboardData.userTesting.successRate}%`);
    console.log(`   Lesson Coverage: ${this.dashboardData.userTesting.lessonCoverage}%`);
    console.log(`   Bug Reports: ${this.dashboardData.userTesting.bugReports}`);
    console.log(`   Performance Score: ${this.dashboardData.userTesting.performanceScore}/100`);
    console.log(`   User Satisfaction: ${this.dashboardData.userTesting.userSatisfaction}/100`);
    
    console.log('\n🛡️ ROBUSTNESS:');
    console.log(`   Total Tests: ${this.dashboardData.robustness.totalTests}`);
    console.log(`   Passed: ${this.dashboardData.robustness.passedTests}`);
    console.log(`   Failed: ${this.dashboardData.robustness.failedTests}`);
    console.log(`   Overall Coverage: ${this.dashboardData.robustness.coverage.overall.toFixed(1)}%`);
    console.log(`   Critical Bugs: ${this.dashboardData.robustness.criticalBugs}`);
    console.log(`   Functionality Health: ${this.dashboardData.robustness.functionalityHealth}`);
    
    console.log('\n🌐 DEPLOYMENT:');
    console.log(`   Base URL: ${this.dashboardData.deployment.baseUrl || 'Not tested'}`);
    console.log(`   Endpoint Tests: ${this.dashboardData.deployment.endpointTests}`);
    console.log(`   Page Tests: ${this.dashboardData.deployment.pageTests}`);
    console.log(`   Functionality Tests: ${this.dashboardData.deployment.functionalityTests}`);
    console.log(`   Performance Tests: ${this.dashboardData.deployment.performanceTests}`);
    console.log(`   Security Tests: ${this.dashboardData.deployment.securityTests}`);
    console.log(`   Deployment Score: ${this.dashboardData.deployment.deploymentScore}%`);
    console.log(`   Production Ready: ${this.dashboardData.deployment.productionReady ? '✅' : '❌'}`);
    
    console.log('\n✅ LAUNCH CHECKLIST:');
    Object.entries(this.dashboardData.launchChecklist).forEach(([item, passed]) => {
      if (item !== 'overall') {
        console.log(`   ${passed ? '✅' : '❌'} ${item.charAt(0).toUpperCase() + item.slice(1)}`);
      }
    });
    console.log(`   Overall: ${this.dashboardData.launchChecklist.overall ? '✅ PASSED' : '❌ FAILED'}`);
    
    console.log('\n📋 FINAL ASSESSMENT:');
    console.log(`   Status: ${this.dashboardData.finalAssessment.ready ? '✅ READY FOR LAUNCH' : '❌ NOT READY'}`);
    console.log(`   Score: ${this.dashboardData.finalAssessment.score}/100`);
    
    if (this.dashboardData.finalAssessment.blockers.length > 0) {
      console.log('\n🚫 BLOCKERS:');
      this.dashboardData.finalAssessment.blockers.forEach((blocker, i) => {
        console.log(`   ${i + 1}. ${blocker}`);
      });
    }
    
    if (this.dashboardData.finalAssessment.risks.length > 0) {
      console.log('\n⚠️  RISKS:');
      this.dashboardData.finalAssessment.risks.forEach((risk, i) => {
        console.log(`   ${i + 1}. ${risk}`);
      });
    }
    
    console.log('\n📝 NEXT STEPS:');
    this.dashboardData.finalAssessment.nextSteps.forEach((step, i) => {
      console.log(`   ${i + 1}. ${step}`);
    });
    
    if (this.dashboardData.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      this.dashboardData.recommendations.slice(0, 5).forEach((rec, i) => {
        console.log(`   ${i + 1}. [${rec.category}] ${rec.action}`);
      });
    }
    
    console.log('\n' + '='.repeat(50));
    if (this.dashboardData.finalAssessment.ready) {
      console.log('🎉 APPLICATION IS READY FOR LAUNCH! 🚀');
    } else {
      console.log('⚠️  IMPROVEMENTS NEEDED BEFORE LAUNCH');
    }
    console.log('='.repeat(50));
  }

  async run() {
    await this.initialize();
    await this.generateDashboard();
  }
}

// Run the quality metrics dashboard
if (require.main === module) {
  const dashboard = new QualityMetricsDashboard();
  dashboard.run().catch(console.error);
}

module.exports = QualityMetricsDashboard;
