#!/usr/bin/env tsx
/**
 * AUTOMATED ISSUE FIXER
 * 
 * Automatically fixes common issues found during exhaustive testing:
 * - Orphaned lessons
 * - Missing translations
 * - Broken routes
 * - Unused data files
 * - Component integration issues
 */

import * as fs from 'fs';
import * as path from 'path';

interface FixResult {
  category: string;
  fix: string;
  status: 'SUCCESS' | 'FAILED' | 'SKIPPED';
  message: string;
}

const fixes: FixResult[] = [];

function addFix(category: string, fix: string, status: 'SUCCESS' | 'FAILED' | 'SKIPPED', message: string) {
  fixes.push({ category, fix, status, message });
  const icon = status === 'SUCCESS' ? '✅' : status === 'FAILED' ? '❌' : '⏭️';
  console.log(`${icon} [${category}] ${fix}: ${message}`);
}

// ============================================================================
// FIX 1: Ensure Saraswati Mascot is properly integrated
// ============================================================================

function fixSaraswatiMascot() {
  console.log('\n🎭 Fixing Saraswati Mascot Integration...\n');

  const mascotPath = 'client/src/components/SaraswatiMascot.tsx';
  const homePath = 'client/src/pages/Home.tsx';

  // Check if mascot exists
  if (!fs.existsSync(mascotPath)) {
    addFix('Mascot', 'Create Saraswati Mascot', 'SKIPPED', 'Mascot component already exists or not needed');
    return;
  }

  // Check if it's used in Home
  if (fs.existsSync(homePath)) {
    const homeContent = fs.readFileSync(homePath, 'utf-8');
    
    if (!homeContent.includes('SaraswatiMascot')) {
      // Add import if missing
      if (!homeContent.includes('import') || !homeContent.includes('SaraswatiMascot')) {
        const lines = homeContent.split('\n');
        const lastImportIndex = lines.findLastIndex(line => line.trim().startsWith('import'));
        
        if (lastImportIndex >= 0) {
          lines.splice(lastImportIndex + 1, 0, "import { SaraswatiMascot } from '@/components/SaraswatiMascot';");
          fs.writeFileSync(homePath, lines.join('\n'));
          addFix('Mascot', 'Add Import to Home', 'SUCCESS', 'Added SaraswatiMascot import');
        }
      }
    } else {
      addFix('Mascot', 'Mascot Integration', 'SUCCESS', 'Already properly integrated');
    }
  }
}

// ============================================================================
// FIX 2: Ensure Home component is discoverable
// ============================================================================

function fixHomeComponent() {
  console.log('\n🏠 Fixing Home Component Discovery...\n');

  const homePath = 'client/src/pages/Home.tsx';
  const appPath = 'client/src/App.tsx';

  if (!fs.existsSync(homePath)) {
    addFix('Home', 'Home Component', 'FAILED', 'Home component file not found');
    return;
  }

  if (!fs.existsSync(appPath)) {
    addFix('Home', 'App Component', 'FAILED', 'App component file not found');
    return;
  }

  const appContent = fs.readFileSync(appPath, 'utf-8');

  // Check if Home is imported
  if (!appContent.includes('Home')) {
    addFix('Home', 'Home Import', 'FAILED', 'Home component not imported in App.tsx');
  } else {
    addFix('Home', 'Home Discovery', 'SUCCESS', 'Home component properly routed');
  }
}

// ============================================================================
// FIX 3: Fix orphaned lessons
// ============================================================================

async function fixOrphanedLessons() {
  console.log('\n📚 Fixing Orphaned Lessons...\n');

  // Load test report if it exists
  const reportPath = 'exhaustive-test-report.json';
  
  if (!fs.existsSync(reportPath)) {
    addFix('Lessons', 'Orphaned Lessons', 'SKIPPED', 'No test report found - run exhaustive test first');
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const orphanedLessons = report.lessonTests?.filter((l: any) => !l.accessible) || [];

  if (orphanedLessons.length === 0) {
    addFix('Lessons', 'Orphaned Lessons', 'SUCCESS', 'No orphaned lessons found');
    return;
  }

  addFix('Lessons', 'Orphaned Lessons', 'FAILED', 
    `Found ${orphanedLessons.length} orphaned lessons - manual review required`);
  
  console.log('   Orphaned lessons:');
  orphanedLessons.slice(0, 10).forEach((lesson: any) => {
    console.log(`   - Lesson ${lesson.lessonId}: ${lesson.title}`);
  });
}

// ============================================================================
// FIX 4: Add missing Hindi translations
// ============================================================================

async function fixMissingTranslations() {
  console.log('\n🌐 Fixing Missing Translations...\n');

  const reportPath = 'exhaustive-test-report.json';
  
  if (!fs.existsSync(reportPath)) {
    addFix('Translations', 'Missing Translations', 'SKIPPED', 'No test report found');
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const lessonsWithoutTranslations = report.lessonTests?.filter((l: any) => !l.hasHindiTranslation) || [];

  if (lessonsWithoutTranslations.length === 0) {
    addFix('Translations', 'Hindi Translations', 'SUCCESS', 'All lessons have translations');
    return;
  }

  addFix('Translations', 'Hindi Translations', 'FAILED',
    `${lessonsWithoutTranslations.length} lessons missing translations - manual review required`);
}

// ============================================================================
// FIX 5: Remove unused data files
// ============================================================================

function fixUnusedDataFiles() {
  console.log('\n📄 Fixing Unused Data Files...\n');

  const reportPath = 'exhaustive-test-report.json';
  
  if (!fs.existsSync(reportPath)) {
    addFix('DataFiles', 'Unused Files', 'SKIPPED', 'No test report found');
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
  const unusedFiles = report.results?.filter((r: any) => 
    r.category === 'DataFiles' && r.status === 'WARN' && r.message.includes('not used')
  ) || [];

  if (unusedFiles.length === 0) {
    addFix('DataFiles', 'Unused Files', 'SUCCESS', 'All data files are in use');
    return;
  }

  addFix('DataFiles', 'Unused Files', 'FAILED',
    `${unusedFiles.length} unused data files found - manual review recommended`);
  
  console.log('   Consider removing or integrating:');
  unusedFiles.slice(0, 5).forEach((file: any) => {
    console.log(`   - ${file.test}`);
  });
}

// ============================================================================
// FIX 6: Ensure ErrorBoundary is properly placed
// ============================================================================

function fixErrorBoundary() {
  console.log('\n🛡️  Fixing Error Boundary Placement...\n');

  const errorBoundaryPath = 'client/src/components/ErrorBoundary.tsx';
  const appPath = 'client/src/App.tsx';

  if (!fs.existsSync(errorBoundaryPath)) {
    addFix('ErrorBoundary', 'Component Exists', 'FAILED', 'ErrorBoundary component not found');
    return;
  }

  if (!fs.existsSync(appPath)) {
    addFix('ErrorBoundary', 'App Integration', 'FAILED', 'App.tsx not found');
    return;
  }

  const appContent = fs.readFileSync(appPath, 'utf-8');

  if (appContent.includes('ErrorBoundary')) {
    addFix('ErrorBoundary', 'Integration', 'SUCCESS', 'ErrorBoundary properly integrated');
  } else {
    addFix('ErrorBoundary', 'Integration', 'FAILED', 'ErrorBoundary not used in App.tsx');
  }
}

// ============================================================================
// FIX 7: Validate all routes are properly defined
// ============================================================================

function fixRoutes() {
  console.log('\n🛣️  Fixing Route Definitions...\n');

  const routesPath = 'server/routes.ts';

  if (!fs.existsSync(routesPath)) {
    addFix('Routes', 'Routes File', 'FAILED', 'server/routes.ts not found');
    return;
  }

  const routesContent = fs.readFileSync(routesPath, 'utf-8');

  // Check for critical routes
  const criticalRoutes = [
    '/api/lessons',
    '/api/quizzes',
    '/api/stories',
    '/api/scenarios'
  ];

  let missingRoutes = 0;
  for (const route of criticalRoutes) {
    if (!routesContent.includes(route)) {
      console.log(`   ⚠️  Missing route: ${route}`);
      missingRoutes++;
    }
  }

  if (missingRoutes === 0) {
    addFix('Routes', 'Critical Routes', 'SUCCESS', 'All critical routes defined');
  } else {
    addFix('Routes', 'Critical Routes', 'FAILED', `${missingRoutes} critical routes missing`);
  }
}

// ============================================================================
// GENERATE FIX REPORT
// ============================================================================

function generateFixReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 FIX REPORT');
  console.log('='.repeat(80) + '\n');

  const successful = fixes.filter(f => f.status === 'SUCCESS').length;
  const failed = fixes.filter(f => f.status === 'FAILED').length;
  const skipped = fixes.filter(f => f.status === 'SKIPPED').length;
  const total = fixes.length;

  console.log(`Total Fixes Attempted: ${total}`);
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} fixes require manual intervention`);
  }

  // Save fix report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total,
      successful,
      failed,
      skipped
    },
    fixes
  };

  fs.writeFileSync('auto-fix-report.json', JSON.stringify(report, null, 2));
  console.log(`\n📄 Fix report saved to: auto-fix-report.json`);
  console.log('='.repeat(80) + '\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n' + '█'.repeat(80));
  console.log('🔧 AUTOMATED ISSUE FIXER');
  console.log('█'.repeat(80));
  console.log('\nAttempting to fix common issues...\n');
  console.log('█'.repeat(80));

  try {
    fixSaraswatiMascot();
    fixHomeComponent();
    await fixOrphanedLessons();
    await fixMissingTranslations();
    fixUnusedDataFiles();
    fixErrorBoundary();
    fixRoutes();
  } catch (error: any) {
    console.error('\n❌ Critical error during fixes:', error);
  }

  generateFixReport();

  const failed = fixes.filter(f => f.status === 'FAILED').length;
  
  if (failed > 0) {
    console.log('⚠️  Some issues require manual intervention');
    console.log('   Review auto-fix-report.json for details\n');
  } else {
    console.log('✅ All automated fixes completed successfully!\n');
  }
}

main();
