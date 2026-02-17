#!/usr/bin/env tsx
/**
 * PRODUCTION CLEANUP SCRIPT
 * 
 * Removes cache, duplicates, legacy files, and temporary files
 * Prepares repository for clean production deployment
 */

import * as fs from 'fs';
import * as path from 'path';

interface CleanupResult {
  category: string;
  files: string[];
  size: number;
}

const results: CleanupResult[] = [];
let totalSize = 0;

console.log('🧹 PRODUCTION CLEANUP');
console.log('====================\n');

function getFileSize(filePath: string): number {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function deleteFile(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      const size = getFileSize(filePath);
      fs.unlinkSync(filePath);
      totalSize += size;
      return true;
    }
  } catch (error: any) {
    console.error(`  ❌ Failed to delete ${filePath}: ${error.message}`);
  }
  return false;
}

function deleteDirectory(dirPath: string): boolean {
  try {
    if (fs.existsSync(dirPath)) {
      const size = getDirSize(dirPath);
      fs.rmSync(dirPath, { recursive: true, force: true });
      totalSize += size;
      return true;
    }
  } catch (error: any) {
    console.error(`  ❌ Failed to delete ${dirPath}: ${error.message}`);
  }
  return false;
}

function getDirSize(dirPath: string): number {
  let size = 0;
  try {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        size += stat.size;
      }
    }
  } catch {
    // Ignore errors
  }
  return size;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

// Category 1: Build Artifacts and Cache
console.log('📦 Category 1: Build Artifacts and Cache');
const buildFiles: string[] = [];

const buildArtifacts = [
  'dist',
  '.vite',
  '.turbo',
  'build',
  '.cache',
  '.parcel-cache',
  '.next',
  'out',
];

for (const artifact of buildArtifacts) {
  if (deleteDirectory(artifact)) {
    buildFiles.push(artifact);
    console.log(`  ✅ Removed: ${artifact}/`);
  }
}

results.push({ category: 'Build Artifacts', files: buildFiles, size: totalSize });
console.log('');

// Category 2: Node Modules Cache
console.log('🗂️  Category 2: Node Modules Cache');
const cacheFiles: string[] = [];
const cacheSize = totalSize;

const nodeCache = [
  'node_modules/.cache',
  'node_modules/.vite',
  '.npm',
  '.pnpm-store',
  '.yarn/cache',
];

for (const cache of nodeCache) {
  if (deleteDirectory(cache)) {
    cacheFiles.push(cache);
    console.log(`  ✅ Removed: ${cache}/`);
  }
}

results.push({ category: 'Node Cache', files: cacheFiles, size: totalSize - cacheSize });
console.log('');

// Category 3: Legacy Test Files
console.log('🧪 Category 3: Legacy Test Files');
const legacyTestFiles: string[] = [];
const testSize = totalSize;

const legacyTests = [
  'Raj_Test',
  'Code-Fixer',
  'test by senior AI software testing.md',
  'test Deployment, Live T.md',
  'testing instructions.md',
  'chaos-control.js',
  'circuit-breaker-test.js',
  'simple-load-test.js',
  'verify-db-users.js',
];

for (const test of legacyTests) {
  if (fs.existsSync(test)) {
    const isDir = fs.statSync(test).isDirectory();
    if (isDir ? deleteDirectory(test) : deleteFile(test)) {
      legacyTestFiles.push(test);
      console.log(`  ✅ Removed: ${test}${isDir ? '/' : ''}`);
    }
  }
}

results.push({ category: 'Legacy Tests', files: legacyTestFiles, size: totalSize - testSize });
console.log('');

// Category 4: Temporary and Debug Files
console.log('🐛 Category 4: Temporary and Debug Files');
const tempFiles: string[] = [];
const tempSize = totalSize;

const temporaryFiles = [
  'sqlite.db-shm',
  'sqlite.db-wal',
  'tsc_baseline.txt',
  'tsc_errors.txt',
  'tsc_errors_clean.txt',
  'tsc_final.txt',
  'tsc_round2.txt',
  '.replit',
  'debug-auth.html',
];

for (const temp of temporaryFiles) {
  if (deleteFile(temp)) {
    tempFiles.push(temp);
    console.log(`  ✅ Removed: ${temp}`);
  }
}

results.push({ category: 'Temporary Files', files: tempFiles, size: totalSize - tempSize });
console.log('');

// Category 5: Duplicate and Legacy Documentation
console.log('📄 Category 5: Duplicate and Legacy Documentation');
const docFiles: string[] = [];
const docSize = totalSize;

const duplicateDocs = [
  'ACTION_1_COMPLETE.md',
  'APP_FUNCTIONAL_STATUS_REPORT.md',
  'APP_FUNCTIONAL_SUCCESS_REPORT.md',
  'CLEANUP_PLAN.md',
  'CLEANUP_SUMMARY.md',
  'CURSOR_AI_AUDIT_REPORT.md',
  'DEPLOYMENT_READY.md',
  'ENRICHMENT_COMPLETE.md',
  'FIXES_COMPLETE.md',
  'FUNCTIONAL_RESTORATION_SUMMARY.md',
  'GRADE9_AUDIT_SUMMARY.md',
  'GRADE_9_IMPLEMENTATION_GUIDE.md',
  'LAUNCH_READINESS_FINAL_VALIDATION.md',
  'LIVE_RUN_REPORT.md',
  'QUICK_FIX.md',
  'QUICK_START_REAL_WORLD_TEST.md',
  'RAJKUMAR.MD',
  'RATE_LIMIT_FIX_GUIDE.md',
  'REAL_WORLD_TEST_FIXED_SUMMARY.md',
  'REAL_WORLD_TEST_FIX_GUIDE.md',
  'REMOTE_UPDATE_COMPLETE.md',
  'REPORTING_TEMPLATE.md',
  'REPOSITORY_FINAL_UPDATE_COMPLETE.md',
  'REPOSITORY_PRODUCTION_UPDATE_COMPLETE.md',
  'REPOSITORY_UPDATE_COMPLETE.md',
  'TEST_REPORT_FINAL.md',
  'TEST_RUN_VALIDATION_COMPLETE.md',
  'VERCEL_AUTH_FIX_GUIDE.md',
  'VERCEL_AUTH_ISSUE_FIX.md',
  'PRODUCTION_FAILURE_ANALYSIS_AND_FIXES.md',
  'PRODUCTION_FIXES_COMPLETE.md',
  'PRODUCTION_LAUNCH_VALIDATION_COMPLETE.md',
  'PRODUCTION_READY_SUCCESS_REPORT.md',
  'PRODUCTION_DEPLOYMENT_FIXED.md',
  'PRODUCTION_DEPLOYMENT_VALIDATION_COMPLETE.md',
];

for (const doc of duplicateDocs) {
  if (deleteFile(doc)) {
    docFiles.push(doc);
    console.log(`  ✅ Removed: ${doc}`);
  }
}

results.push({ category: 'Duplicate Docs', files: docFiles, size: totalSize - docSize });
console.log('');

// Category 6: Analysis and Report Files
console.log('📊 Category 6: Analysis and Report Files');
const analysisFiles: string[] = [];
const analysisSize = totalSize;

const analysisReports = [
  'comprehensive-grade9-audit-report.json',
  'comprehensive-integration-fix-report.json',
  'CONTENT_AUDIT_REPORT.json',
  'data-files-integration-report.json',
  'enriched-lessons.json',
  'exhaustive-test-report.json',
  'final-comprehensive-check-report.json',
  'FIXED_REAL_LOAD_TEST_REPORT.json',
  'LESSON_QUALITY_AUDIT.json',
  'production-deployment-report.json',
  'production-user-config.json',
  'unused-data-files-integration-plan.json',
];

for (const analysis of analysisReports) {
  if (deleteFile(analysis)) {
    analysisFiles.push(analysis);
    console.log(`  ✅ Removed: ${analysis}`);
  }
}

results.push({ category: 'Analysis Reports', files: analysisFiles, size: totalSize - analysisSize });
console.log('');

// Category 7: Legacy Directories
console.log('📁 Category 7: Legacy Directories');
const legacyDirs: string[] = [];
const dirSize = totalSize;

const legacyDirectories = [
  'archived_prep',
  'ARCHIVE',
  'backups',
  'action-plan',
  'ACTION_PLAN',
  'Attached_Assets',
  'logs',
];

for (const dir of legacyDirectories) {
  if (deleteDirectory(dir)) {
    legacyDirs.push(dir);
    console.log(`  ✅ Removed: ${dir}/`);
  }
}

results.push({ category: 'Legacy Directories', files: legacyDirs, size: totalSize - dirSize });
console.log('');

// Category 8: Cleanup Scripts (Keep only production ones)
console.log('🔧 Category 8: Legacy Cleanup Scripts');
const scriptFiles: string[] = [];
const scriptSize = totalSize;

const legacyScripts = [
  'cleanup-comprehensive.ps1',
  'cleanup.ps1',
  'cleanup.sh',
  'find_bloat.ps1',
];

for (const script of legacyScripts) {
  if (deleteFile(script)) {
    scriptFiles.push(script);
    console.log(`  ✅ Removed: ${script}`);
  }
}

results.push({ category: 'Legacy Scripts', files: scriptFiles, size: totalSize - scriptSize });
console.log('');

// Summary
console.log('\n📊 CLEANUP SUMMARY');
console.log('==================\n');

let totalFiles = 0;
results.forEach(result => {
  const count = result.files.length;
  totalFiles += count;
  if (count > 0) {
    console.log(`${result.category}: ${count} items (${formatSize(result.size)})`);
  }
});

console.log(`\nTotal Items Removed: ${totalFiles}`);
console.log(`Total Space Freed: ${formatSize(totalSize)}`);

console.log('\n✅ CLEANUP COMPLETE!');
console.log('===================\n');

console.log('Kept Essential Files:');
console.log('  ✅ FINAL_PRODUCTION_DEPLOYMENT_COMPLETE.md');
console.log('  ✅ PRODUCTION_DEPLOYMENT_GUIDE.md');
console.log('  ✅ DEPLOYMENT_READY_SUMMARY.md');
console.log('  ✅ README.md');
console.log('  ✅ CHANGELOG.md');
console.log('  ✅ CONTRIBUTING.md');
console.log('  ✅ SECURITY.md');
console.log('  ✅ LICENSE');
console.log('  ✅ All production scripts');
console.log('  ✅ All source code');
console.log('  ✅ All configuration files\n');

console.log('🚀 Repository is now clean and ready for production deployment!');
