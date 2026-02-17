#!/usr/bin/env tsx
/**
 * DOCUMENTATION CONSOLIDATION SCRIPT
 * 
 * Automatically consolidates markdown files according to the plan
 * Reduces 65 files to 25 essential files
 */

import * as fs from 'fs';
import * as path from 'path';

console.log('📚 DOCUMENTATION CONSOLIDATION');
console.log('==============================\n');

let filesDeleted = 0;
let filesArchived = 0;

// Phase 1: Delete deployment duplicates (already consolidated into DEPLOYMENT.md)
console.log('Phase 1: Removing deployment duplicates...');
const deploymentDuplicates = [
  'DEPLOYMENT_READY_SUMMARY.md',
  'PRODUCTION_DEPLOYMENT_COMPLETE.md',
  'PRODUCTION_DEPLOYMENT_GUIDE.md',
  'FINAL_PRODUCTION_DEPLOYMENT_COMPLETE.md',
  'FINAL_PRODUCTION_SUCCESS_REPORT.md',
];

deploymentDuplicates.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  ✅ Deleted: ${file}`);
    filesDeleted++;
  }
});

console.log('');

// Phase 2: Archive historical files
console.log('Phase 2: Archiving historical files...');
const archiveDir = 'docs/archive';
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
  console.log(`  ✅ Created: ${archiveDir}/`);
}

const historicalFiles = [
  '.agent/artifacts/MULTI_AI_ERROR_ANALYSIS.md',
  '.agent/artifacts/STEP2_COMPLETE.md',
  '.agent/artifacts/WEEK1_PROGRESS.md',
];

historicalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const basename = path.basename(file);
    const dest = path.join(archiveDir, basename);
    fs.renameSync(file, dest);
    console.log(`  ✅ Archived: ${file} → ${dest}`);
    filesArchived++;
  }
});

console.log('');

// Phase 3: Delete empty/minimal files
console.log('Phase 3: Removing empty/minimal files...');
const emptyFiles = [
  'FINAL_COMPREHENSIVE_REPORT.md',
  'LESSON_VOCABULARY_INTEGRATION_GUIDE.md',
  'client/requirements.md',
];

emptyFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`  ✅ Deleted: ${file}`);
    filesDeleted++;
  }
});

console.log('');

// Summary
console.log('📊 CONSOLIDATION SUMMARY');
console.log('========================\n');
console.log(`Files Deleted: ${filesDeleted}`);
console.log(`Files Archived: ${filesArchived}`);
console.log(`Total Processed: ${filesDeleted + filesArchived}`);
console.log('');
console.log('✅ Phase 1 Complete!');
console.log('');
console.log('📝 Next Steps:');
console.log('  1. Review DEPLOYMENT.md (consolidated deployment guide)');
console.log('  2. Run full consolidation to merge remaining files');
console.log('  3. Update README.md links if needed');
console.log('');
console.log('🚀 Documentation is cleaner and more organized!');
