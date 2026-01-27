/**
 * ENRICH ALL LESSONS - Standalone script
 * Reads audit report and enriches all lessons
 */

import { ContentEnricher } from './enrich-lessons-content';
import { ComprehensiveLessonAuditor } from './comprehensive-lesson-audit';
import * as fs from 'fs/promises';
import * as path from 'path';

async function main() {
  console.log('🔧 Starting Content Enrichment...\n');

  // First, run audit to get current state
  console.log('Step 1: Auditing lessons to identify what needs enrichment...\n');
  const auditor = new ComprehensiveLessonAuditor();
  const auditReport = await auditor.auditAllLessons();
  
  console.log('\nStep 2: Enriching lessons based on audit results...\n');
  const enricher = new ContentEnricher();
  const lessonsToEnrich = auditReport.lessons.filter(l => l.needsEnrichment);
  
  await enricher.enrichAllLessons(lessonsToEnrich);
  
  const stats = enricher.getStats();
  console.log(`\n✅ Enrichment complete!`);
  console.log(`   Enriched: ${stats.enrichedCount} lessons`);
  if (stats.errorCount > 0) {
    console.log(`   Errors: ${stats.errorCount}`);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('enrich-all-lessons.ts')) {
  main().catch(console.error);
}
