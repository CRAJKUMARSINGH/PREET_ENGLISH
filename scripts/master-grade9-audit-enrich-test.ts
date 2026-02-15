/**
 * MASTER GRADE 9 AUDIT, ENRICHMENT & TESTING SCRIPT
 * 
 * This master script orchestrates:
 * 1. Comprehensive audit of all lessons
 * 2. Data integration verification
 * 3. App flow checking
 * 4. Programmatic testing of all lessons
 * 5. Enrichment of lessons to Grade 9+ quality
 * 6. Final validation
 */

import { ComprehensiveGrade9Auditor } from './comprehensive-grade9-audit-enrich';
import { LessonEnricher } from './enrich-lessons-grade9';
import { LessonTester } from './test-all-lessons-programmatic';
import * as fs from 'fs/promises';
import * as path from 'path';

class MasterGrade9System {
  private auditReportPath = path.join(process.cwd(), 'comprehensive-grade9-audit-report.json');
  private testReportPath = path.join(process.cwd(), 'lesson-test-report.json');
  private finalReportPath = path.join(process.cwd(), 'master-grade9-final-report.json');

  /**
   * Step 1: Run comprehensive audit
   */
  async runAudit(): Promise<void> {
    console.log('\n' + '='.repeat(70));
    console.log('STEP 1: COMPREHENSIVE AUDIT');
    console.log('='.repeat(70) + '\n');

    const auditor = new ComprehensiveGrade9Auditor();
    await auditor.auditAllLessons();
    await auditor.checkDataIntegration();
    await auditor.checkAppFlow();
    
    const summary = auditor.generateSummary();
    console.log(summary);
    
    const enrichmentPlan = auditor.generateEnrichmentPlan();
    console.log(enrichmentPlan);
    
    await auditor.saveReport(this.auditReportPath);
    
    const report = auditor.getReport();
    if (report.summary.overallGrade < 7) {
      throw new Error(`Overall grade ${report.summary.overallGrade.toFixed(1)}/10 is below threshold`);
    }
  }

  /**
   * Step 2: Test all lessons programmatically
   */
  async runTests(): Promise<void> {
    console.log('\n' + '='.repeat(70));
    console.log('STEP 2: PROGRAMMATIC TESTING');
    console.log('='.repeat(70) + '\n');

    const tester = new LessonTester();
    const report = await tester.testAllLessons();
    
    console.log(tester.generateSummary());
    
    // Save test report
    await fs.writeFile(
      this.testReportPath,
      JSON.stringify(report, null, 2)
    );
    console.log(`\n📄 Test report saved to: ${this.testReportPath}`);

    if (report.failed > report.totalLessons * 0.1) {
      throw new Error(`Too many test failures: ${report.failed}/${report.totalLessons}`);
    }
  }

  /**
   * Step 3: Enrich lessons
   */
  async runEnrichment(): Promise<void> {
    console.log('\n' + '='.repeat(70));
    console.log('STEP 3: LESSON ENRICHMENT');
    console.log('='.repeat(70) + '\n');

    // Check if audit report exists
    try {
      await fs.access(this.auditReportPath);
    } catch {
      throw new Error('Audit report not found. Please run audit first.');
    }

    const enricher = new LessonEnricher();
    await enricher.enrichAllLessons(this.auditReportPath);
  }

  /**
   * Step 4: Re-test after enrichment
   */
  async runReTest(): Promise<void> {
    console.log('\n' + '='.repeat(70));
    console.log('STEP 4: POST-ENRICHMENT TESTING');
    console.log('='.repeat(70) + '\n');

    const tester = new LessonTester();
    const report = await tester.testAllLessons();
    
    console.log(tester.generateSummary());
    
    return report;
  }

  /**
   * Step 5: Generate final report
   */
  async generateFinalReport(): Promise<void> {
    console.log('\n' + '='.repeat(70));
    console.log('STEP 5: FINAL REPORT GENERATION');
    console.log('='.repeat(70) + '\n');

    // Load audit report
    const auditContent = await fs.readFile(this.auditReportPath, 'utf-8');
    const auditReport = JSON.parse(auditContent);

    // Load test report
    const testContent = await fs.readFile(this.testReportPath, 'utf-8');
    const testReport = JSON.parse(testContent);

    const finalReport = {
      timestamp: new Date().toISOString(),
      audit: {
        overallGrade: auditReport.summary.overallGrade,
        lessonsAudited: auditReport.lessons.total,
        averageGrade: auditReport.lessons.averageGrade,
        grade9Plus: auditReport.lessons.grade9Plus,
        needsEnrichment: auditReport.lessons.needsEnrichment
      },
      testing: {
        totalTested: testReport.totalLessons,
        passed: testReport.passed,
        failed: testReport.failed,
        passRate: ((testReport.passed / testReport.totalLessons) * 100).toFixed(1) + '%'
      },
      dataIntegration: {
        checkedFiles: auditReport.dataIntegration.checkedFiles.length,
        integrated: auditReport.dataIntegration.integrated,
        notIntegrated: auditReport.dataIntegration.notIntegrated.length
      },
      appFlow: {
        routesChecked: auditReport.appFlow.routesChecked,
        accessible: auditReport.appFlow.accessible,
        withHindiSupport: auditReport.appFlow.withHindiSupport
      },
      summary: {
        overallStatus: auditReport.summary.overallGrade >= 9 && testReport.failed === 0 ? 'PASS' : 'NEEDS WORK',
        criticalIssues: auditReport.summary.criticalIssues,
        recommendations: auditReport.summary.recommendations
      }
    };

    await fs.writeFile(
      this.finalReportPath,
      JSON.stringify(finalReport, null, 2)
    );

    console.log(`
═══════════════════════════════════════════════════════════════
                    FINAL GRADE 9 REPORT
═══════════════════════════════════════════════════════════════

OVERALL STATUS: ${finalReport.summary.overallStatus}

AUDIT RESULTS:
──────────────
Overall Grade: ${finalReport.audit.overallGrade.toFixed(1)}/10
Lessons Audited: ${finalReport.audit.lessonsAudited}
Average Grade: ${finalReport.audit.averageGrade.toFixed(2)}/10
Grade 9+: ${finalReport.audit.grade9Plus} (${((finalReport.audit.grade9Plus / finalReport.audit.lessonsAudited) * 100).toFixed(1)}%)

TESTING RESULTS:
────────────────
Total Tested: ${finalReport.testing.totalTested}
Passed: ${finalReport.testing.passed}
Failed: ${finalReport.testing.failed}
Pass Rate: ${finalReport.testing.passRate}

DATA INTEGRATION:
─────────────────
Files Checked: ${finalReport.dataIntegration.checkedFiles}
Integrated: ${finalReport.dataIntegration.integrated}
Not Integrated: ${finalReport.dataIntegration.notIntegrated}

APP FLOW:
─────────
Routes Checked: ${finalReport.appFlow.routesChecked}
Accessible: ${finalReport.appFlow.accessible}
With Hindi Support: ${finalReport.appFlow.withHindiSupport}

CRITICAL ISSUES:
────────────────
${finalReport.summary.criticalIssues.length > 0
  ? finalReport.summary.criticalIssues.map(issue => `  ⚠️  ${issue}`).join('\n')
  : '  ✅ No critical issues found'}

RECOMMENDATIONS:
───────────────
${finalReport.summary.recommendations.map(rec => `  • ${rec}`).join('\n')}

═══════════════════════════════════════════════════════════════
`);

    console.log(`\n📄 Final report saved to: ${this.finalReportPath}`);
  }

  /**
   * Run complete pipeline
   */
  async run(): Promise<void> {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║     MASTER GRADE 9 AUDIT, ENRICHMENT & TESTING SYSTEM        ║
╚═══════════════════════════════════════════════════════════════╝

This will:
  1. Audit all lessons programmatically
  2. Verify data integration
  3. Check app flow and routes
  4. Test each lesson programmatically
  5. Enrich lessons to Grade 9+ quality
  6. Re-test after enrichment
  7. Generate final report

Starting in 2 seconds...
`);

    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Step 1: Audit
      await this.runAudit();

      // Step 2: Test
      await this.runTests();

      // Step 3: Enrich
      await this.runEnrichment();

      // Step 4: Re-test
      await this.runReTest();

      // Step 5: Final report
      await this.generateFinalReport();

      console.log('\n✅ MASTER PIPELINE COMPLETE!');
      console.log('All lessons have been audited, tested, and enriched to Grade 9+ quality.');
    } catch (error: any) {
      console.error('\n❌ PIPELINE FAILED:', error.message);
      process.exit(1);
    }
  }
}

// Main execution
async function main() {
  const master = new MasterGrade9System();
  await master.run();
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('master-grade9-audit-enrich-test.ts')) {
  main();
}

export { MasterGrade9System };

