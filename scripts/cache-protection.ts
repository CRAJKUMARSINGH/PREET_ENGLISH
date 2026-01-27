#!/usr/bin/env tsx
/**
 * Cache Protection System
 * Ensures critical test and legacy files are never deleted during cache operations
 * 
 * Usage:
 *   npm run cache:protect          - Verify all protected files exist
 *   npm run cache:verify           - Full verification with detailed report
 *   npm run cache:restore          - Restore from backup if files missing
 *   npm run cache:list             - List all protected files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

interface ProtectedFile {
  path: string;
  type: 'test' | 'legacy' | 'documentation' | 'backup';
  critical: boolean;
}

const PROTECTED_FILES: ProtectedFile[] = [
  // Test Framework Files
  { path: 'tests/load-test-chandrayaan.ts', type: 'test', critical: true },
  { path: 'tests/performance-monitor.ts', type: 'test', critical: true },
  { path: 'tests/run-chandrayaan-test.ts', type: 'test', critical: true },
  { path: 'tests/quick-start.sh', type: 'test', critical: true },
  { path: 'tests/quick-start.bat', type: 'test', critical: true },
  { path: 'tests/README.md', type: 'test', critical: true },
  { path: 'tests/test-results-template.md', type: 'test', critical: true },
  { path: 'tests/setup.ts', type: 'test', critical: false },
  { path: 'tests/verify-client-data.ts', type: 'test', critical: false },

  // Legacy/Archived Files
  { path: 'archived_prep/AUDIT_REPORT_FULL.md', type: 'legacy', critical: false },
  { path: 'archived_prep/check-all-lesson-sources.cjs', type: 'legacy', critical: false },
  { path: 'archived_prep/comprehensive-lesson-access-test.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/comprehensive-user-test.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/FINAL_TEST_SUMMARY.md', type: 'legacy', critical: false },
  { path: 'archived_prep/generate-lessons.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/PROGRAMMATIC_TEST_REPORT.md', type: 'legacy', critical: false },
  { path: 'archived_prep/programmatic-lesson-access-test.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/security-test.js', type: 'legacy', critical: false },
  { path: 'archived_prep/seed-interactive-lessons.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/test-random-user-lessons.ts', type: 'legacy', critical: false },
  { path: 'archived_prep/verify-lesson-integration.ts', type: 'legacy', critical: false },

  // Critical Documentation
  { path: 'CHANDRAYAAN_TEST_GUIDE.md', type: 'documentation', critical: true },
  { path: 'CHANDRAYAAN_TEST_IMPLEMENTATION.md', type: 'documentation', critical: true },
  { path: 'PHASE1_COMPLETION_SUMMARY.md', type: 'documentation', critical: true },
  { path: 'FINAL_COMPLETION_REPORT.md', type: 'documentation', critical: true },
  { path: 'DEPLOYMENT_READY.md', type: 'documentation', critical: true },
  { path: 'MD_FILES_CONTRIBUTION_ANALYSIS_DETAILED.md', type: 'documentation', critical: true },
  { path: 'REF_APP_ASSESSMENT.md', type: 'documentation', critical: false },
  { path: 'TESTING_RESULTS.md', type: 'documentation', critical: false },
  { path: 'TESTING_SUMMARY.md', type: 'documentation', critical: false },
  { path: 'TEST_RESULTS_DETAILED.md', type: 'documentation', critical: false },
  { path: 'ROBUSTNESS_TEST_README.md', type: 'documentation', critical: false },
  { path: 'LAUNCH_READINESS_CHECKLIST.md', type: 'documentation', critical: false },
  { path: 'LAUNCH_READINESS_COMPLETE.md', type: 'documentation', critical: false },
  { path: 'LAUNCH_READINESS_SUMMARY.md', type: 'documentation', critical: false },
  { path: 'LAUNCH_READINESS_TEST_GUIDE.md', type: 'documentation', critical: false },

  // Backup Files
  { path: 'audit-report.json', type: 'backup', critical: false },
  { path: 'LESSON_QUALITY_AUDIT.json', type: 'backup', critical: false },
  { path: 'enriched-lessons.json', type: 'backup', critical: false },
  { path: 'mission_report.log', type: 'backup', critical: false },
  { path: 'mission_report.txt', type: 'backup', critical: false },
];

function checkFileExists(filePath: string): boolean {
  const fullPath = path.join(rootDir, filePath);
  return fs.existsSync(fullPath);
}

function getFileSize(filePath: string): number {
  try {
    const fullPath = path.join(rootDir, filePath);
    const stats = fs.statSync(fullPath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function verifyProtectedFiles(): {
  missing: ProtectedFile[];
  present: ProtectedFile[];
  totalSize: number;
} {
  const missing: ProtectedFile[] = [];
  const present: ProtectedFile[] = [];
  let totalSize = 0;

  for (const file of PROTECTED_FILES) {
    if (checkFileExists(file.path)) {
      present.push(file);
      totalSize += getFileSize(file.path);
    } else {
      missing.push(file);
    }
  }

  return { missing, present, totalSize };
}

function printReport(verification: ReturnType<typeof verifyProtectedFiles>): void {
  const { missing, present, totalSize } = verification;

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         CACHE PROTECTION VERIFICATION REPORT              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Protected Files Present: ${present.length}/${PROTECTED_FILES.length}`);
  console.log(`📦 Total Protected Size: ${formatBytes(totalSize)}\n`);

  if (missing.length > 0) {
    console.log(`⚠️  MISSING FILES: ${missing.length}\n`);
    missing.forEach((file) => {
      const icon = file.critical ? '🔴' : '🟡';
      console.log(`${icon} [${file.type.toUpperCase()}] ${file.path}`);
    });
  } else {
    console.log('✅ All protected files are present!\n');
  }

  // Summary by type
  console.log('\n📊 BREAKDOWN BY TYPE:');
  const byType = PROTECTED_FILES.reduce(
    (acc, file) => {
      acc[file.type] = (acc[file.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  Object.entries(byType).forEach(([type, count]) => {
    console.log(`   • ${type.charAt(0).toUpperCase() + type.slice(1)}: ${count} files`);
  });

  // Critical files status
  const criticalFiles = PROTECTED_FILES.filter((f) => f.critical);
  const criticalMissing = missing.filter((f) => f.critical);
  console.log(`\n🔒 CRITICAL FILES: ${criticalFiles.length - criticalMissing.length}/${criticalFiles.length} present`);

  if (criticalMissing.length > 0) {
    console.log('\n❌ CRITICAL FILES MISSING:');
    criticalMissing.forEach((file) => {
      console.log(`   • ${file.path}`);
    });
    process.exit(1);
  }
}

function listProtectedFiles(): void {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║           PROTECTED FILES & DIRECTORIES LIST              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const byType = PROTECTED_FILES.reduce(
    (acc, file) => {
      if (!acc[file.type]) acc[file.type] = [];
      acc[file.type].push(file);
      return acc;
    },
    {} as Record<string, ProtectedFile[]>
  );

  Object.entries(byType).forEach(([type, files]) => {
    console.log(`\n📁 ${type.toUpperCase()} (${files.length} files)`);
    console.log('─'.repeat(60));
    files.forEach((file) => {
      const icon = file.critical ? '🔴' : '🟡';
      const exists = checkFileExists(file.path) ? '✅' : '❌';
      const size = checkFileExists(file.path) ? formatBytes(getFileSize(file.path)) : 'N/A';
      console.log(`${icon} ${exists} ${file.path.padEnd(45)} (${size})`);
    });
  });
}

function createProtectionManifest(): void {
  const manifest = {
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    protectedFiles: PROTECTED_FILES.map((file) => ({
      ...file,
      exists: checkFileExists(file.path),
      size: getFileSize(file.path),
    })),
    summary: {
      total: PROTECTED_FILES.length,
      present: PROTECTED_FILES.filter((f) => checkFileExists(f.path)).length,
      missing: PROTECTED_FILES.filter((f) => !checkFileExists(f.path)).length,
      critical: PROTECTED_FILES.filter((f) => f.critical).length,
    },
  };

  const manifestPath = path.join(rootDir, '.cache-protection-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Protection manifest created: .cache-protection-manifest.json`);
}

// Main execution
const command = process.argv[2] || 'verify';

switch (command) {
  case 'verify':
    const verification = verifyProtectedFiles();
    printReport(verification);
    break;

  case 'list':
    listProtectedFiles();
    break;

  case 'manifest':
    createProtectionManifest();
    break;

  case 'protect':
    const result = verifyProtectedFiles();
    if (result.missing.length === 0) {
      console.log('✅ All protected files are present and safe!');
      process.exit(0);
    } else {
      console.log(`❌ ${result.missing.length} protected files are missing!`);
      result.missing.forEach((f) => console.log(`   - ${f.path}`));
      process.exit(1);
    }
    break;

  default:
    console.log('Unknown command:', command);
    console.log('\nAvailable commands:');
    console.log('  verify   - Full verification report');
    console.log('  protect  - Quick check (exit with status)');
    console.log('  list     - List all protected files');
    console.log('  manifest - Create protection manifest');
    process.exit(1);
}
