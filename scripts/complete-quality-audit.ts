/**
 * COMPLETE QUALITY AUDIT & TESTING MASTER SCRIPT
 * 
 * Runs the complete quality improvement pipeline:
 * 1. Audit all lessons
 * 2. Enrich content
 * 3. Run virtual user tests
 * 4. Run robustness tests
 * 5. (Optional) Run deployment tests
 */

import { ComprehensiveLessonAuditor } from './comprehensive-lesson-audit';
import { ContentEnricher } from './enrich-lessons-content';
import { VirtualUserTester } from './virtual-user-testing';
import { RobustnessTestRunner } from './robustness-test-runner';
import { DeploymentTestRunner } from './deployment-test-runner';

interface PipelineOptions {
  skipEnrichment?: boolean;
  skipVirtualUsers?: boolean;
  skipRobustness?: boolean;
  skipDeployment?: boolean;
  deploymentUrl?: string;
  virtualUserCount?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

class CompleteQualityAudit {
  private options: Required<PipelineOptions>;

  constructor(options: PipelineOptions = {}) {
    this.options = {
      skipEnrichment: options.skipEnrichment ?? false,
      skipVirtualUsers: options.skipVirtualUsers ?? false,
      skipRobustness: options.skipRobustness ?? false,
      skipDeployment: options.skipDeployment ?? true,
      deploymentUrl: options.deploymentUrl || '',
      virtualUserCount: {
        beginner: options.virtualUserCount?.beginner ?? 500,
        intermediate: options.virtualUserCount?.intermediate ?? 500,
        advanced: options.virtualUserCount?.advanced ?? 500
      }
    };
  }

  /**
   * Run complete pipeline
   */
  async run(): Promise<void> {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('        COMPLETE QUALITY AUDIT & TESTING PIPELINE');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Step 1: Audit lessons
    console.log('STEP 1: AUDITING ALL LESSONS');
    console.log('───────────────────────────────────────────────────────────────\n');
    const auditor = new ComprehensiveLessonAuditor();
    const auditReport = await auditor.auditAllLessons();
    console.log(auditor.generateSummary());
    await auditor.saveReport('comprehensive-lesson-audit-report.json');

    // Step 2: Enrich content
    if (!this.options.skipEnrichment) {
      console.log('\n\nSTEP 2: ENRICHING LESSON CONTENT');
      console.log('───────────────────────────────────────────────────────────────\n');
      const enricher = new ContentEnricher();
      const lessonsToEnrich = auditReport.lessons.filter(l => l.needsEnrichment);
      await enricher.enrichAllLessons(lessonsToEnrich);
      const enrichStats = enricher.getStats();
      console.log(`\n✅ Enriched ${enrichStats.enrichedCount} lessons`);
      if (enrichStats.errorCount > 0) {
        console.log(`   ⚠️  ${enrichStats.errorCount} errors occurred`);
      }
    } else {
      console.log('\n⏭️  Skipping content enrichment (skipEnrichment=true)');
    }

    // Step 3: Virtual user testing
    if (!this.options.skipVirtualUsers) {
      console.log('\n\nSTEP 3: VIRTUAL USER TESTING');
      console.log('───────────────────────────────────────────────────────────────\n');
      const tester = new VirtualUserTester();
      const testReport = await tester.runTestSuite();
      
      if (testReport.successRate < 100) {
        console.log(`\n⚠️  Virtual user test success rate: ${testReport.successRate.toFixed(2)}%`);
        console.log(`   Target: 100% success rate`);
      } else {
        console.log('\n✅ Virtual user tests: 100% success rate!');
      }
      
      await tester.cleanup();
    } else {
      console.log('\n⏭️  Skipping virtual user tests (skipVirtualUsers=true)');
    }

    // Step 4: Robustness testing
    if (!this.options.skipRobustness) {
      console.log('\n\nSTEP 4: ROBUSTNESS TESTING');
      console.log('───────────────────────────────────────────────────────────────\n');
      const robustnessRunner = new RobustnessTestRunner();
      const robustnessReport = await robustnessRunner.runAllTests();
      
      if (robustnessReport.successRate < 100) {
        console.log(`\n⚠️  Robustness test success rate: ${robustnessReport.successRate.toFixed(2)}%`);
        console.log(`   Target: 100% success rate`);
      } else {
        console.log('\n✅ Robustness tests: 100% success rate!');
      }
    } else {
      console.log('\n⏭️  Skipping robustness tests (skipRobustness=true)');
    }

    // Step 5: Deployment testing
    if (!this.options.skipDeployment && this.options.deploymentUrl) {
      console.log('\n\nSTEP 5: DEPLOYMENT TESTING');
      console.log('───────────────────────────────────────────────────────────────\n');
      const deploymentRunner = new DeploymentTestRunner(this.options.deploymentUrl);
      await deploymentRunner.initialize();
      const deploymentReport = await deploymentRunner.runAllTests();
      
      if (deploymentReport.successRate < 100) {
        console.log(`\n⚠️  Deployment test success rate: ${deploymentReport.successRate.toFixed(2)}%`);
        console.log(`   Target: 100% success rate`);
      } else {
        console.log('\n✅ Deployment tests: 100% success rate!');
      }
    } else {
      console.log('\n⏭️  Skipping deployment tests (skipDeployment=true or no URL provided)');
    }

    // Final summary
    console.log('\n\n═══════════════════════════════════════════════════════════════');
    console.log('                    PIPELINE COMPLETE');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`   • Lessons audited: ${auditReport.totalLessons}`);
    console.log(`   • Average quality grade: ${auditReport.averageGrade.toFixed(2)}/10`);
    console.log(`   • Lessons needing enrichment: ${auditReport.lessonsNeedingEnrichment}`);
    
    if (!this.options.skipEnrichment) {
      const enricher = new ContentEnricher();
      const stats = enricher.getStats();
      console.log(`   • Lessons enriched: ${stats.enrichedCount}`);
    }

    console.log('\n📄 Reports generated:');
    console.log('   • comprehensive-lesson-audit-report.json');
    if (!this.options.skipVirtualUsers) {
      console.log('   • virtual-user-test-report.json');
    }
    if (!this.options.skipRobustness) {
      console.log('   • robustness-test-report.json');
    }
    if (!this.options.skipDeployment && this.options.deploymentUrl) {
      console.log('   • deployment-test-report.json');
    }

    console.log('\n✅ Pipeline execution complete!\n');
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const options: PipelineOptions = {
    skipEnrichment: args.includes('--skip-enrichment'),
    skipVirtualUsers: args.includes('--skip-virtual-users'),
    skipRobustness: args.includes('--skip-robustness'),
    skipDeployment: !args.includes('--test-deployment'),
    deploymentUrl: process.env.DEPLOYMENT_URL || args.find(arg => arg.startsWith('--url='))?.split('=')[1]
  };

  const pipeline = new CompleteQualityAudit(options);
  
  try {
    await pipeline.run();
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('complete-quality-audit.ts')) {
  main();
}

export { CompleteQualityAudit, type PipelineOptions };
