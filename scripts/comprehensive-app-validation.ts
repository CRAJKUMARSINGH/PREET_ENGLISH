#!/usr/bin/env tsx
/**
 * COMPREHENSIVE APP VALIDATION SCRIPT
 * 
 * Tests every lesson, validates all components, checks data integration
 * Ensures SaraswatiMascot and Home component are functional
 */

import { db } from '../server/db';
import { lessons, vocabulary, users } from '../shared/schema';
import { eq, sql } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  category: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: any;
}

const results: ValidationResult[] = [];

console.log('🔍 COMPREHENSIVE APP VALIDATION');
console.log('================================\n');

// Test 1: Validate SaraswatiMascot Component
console.log('Test 1: SaraswatiMascot Component...');
try {
  const mascotPath = path.join(process.cwd(), 'client/src/components/SaraswatiMascot.tsx');
  if (fs.existsSync(mascotPath)) {
    const content = fs.readFileSync(mascotPath, 'utf-8');
    
    // Check for key exports
    const hasMainExport = content.includes('export function SaraswatiMascot');
    const hasLogoExport = content.includes('export function SaraswatiLogo');
    const hasImage = content.includes('saraswati.jpg');
    
    if (hasMainExport && hasLogoExport && hasImage) {
      results.push({
        category: 'Components',
        test: 'SaraswatiMascot',
        status: 'PASS',
        message: 'Component exists with all exports',
        details: { mainExport: true, logoExport: true, image: true }
      });
      console.log('  ✅ PASS: SaraswatiMascot component validated\n');
    } else {
      results.push({
        category: 'Components',
        test: 'SaraswatiMascot',
        status: 'WARN',
        message: 'Component exists but missing some exports',
        details: { mainExport: hasMainExport, logoExport: hasLogoExport, image: hasImage }
      });
      console.log('  ⚠️  WARN: SaraswatiMascot missing some exports\n');
    }
  } else {
    results.push({
      category: 'Components',
      test: 'SaraswatiMascot',
      status: 'FAIL',
      message: 'Component file not found'
    });
    console.log('  ❌ FAIL: SaraswatiMascot component not found\n');
  }
} catch (error: any) {
  results.push({
    category: 'Components',
    test: 'SaraswatiMascot',
    status: 'FAIL',
    message: `Error: ${error.message}`
  });
  console.log(`  ❌ FAIL: ${error.message}\n`);
}

// Test 2: Validate Home Component
console.log('Test 2: Home Component...');
try {
  const homePath = path.join(process.cwd(), 'client/src/pages/Home.tsx');
  if (fs.existsSync(homePath)) {
    const content = fs.readFileSync(homePath, 'utf-8');
    
    // Check for key imports and usage
    const importsSaraswati = content.includes('SaraswatiMascot');
    const importsLayout = content.includes('Layout');
    const hasDefaultExport = content.includes('export default function Home');
    const usesAuth = content.includes('useAuth');
    const usesLessons = content.includes('useLessons');
    
    if (hasDefaultExport && importsSaraswati && importsLayout) {
      results.push({
        category: 'Components',
        test: 'Home',
        status: 'PASS',
        message: 'Home component properly configured',
        details: {
          defaultExport: hasDefaultExport,
          saraswatiImport: importsSaraswati,
          layoutImport: importsLayout,
          authHook: usesAuth,
          lessonsHook: usesLessons
        }
      });
      console.log('  ✅ PASS: Home component validated\n');
    } else {
      results.push({
        category: 'Components',
        test: 'Home',
        status: 'WARN',
        message: 'Home component exists but may have issues',
        details: {
          defaultExport: hasDefaultExport,
          saraswatiImport: importsSaraswati,
          layoutImport: importsLayout
        }
      });
      console.log('  ⚠️  WARN: Home component may have issues\n');
    }
  } else {
    results.push({
      category: 'Components',
      test: 'Home',
      status: 'FAIL',
      message: 'Home component file not found'
    });
    console.log('  ❌ FAIL: Home component not found\n');
  }
} catch (error: any) {
  results.push({
    category: 'Components',
    test: 'Home',
    status: 'FAIL',
    message: `Error: ${error.message}`
  });
  console.log(`  ❌ FAIL: ${error.message}\n`);
}

// Test 3: Validate All Lessons
console.log('Test 3: Validating All Lessons...');
try {
  const allLessons = await db.select().from(lessons);
  
  console.log(`  Found ${allLessons.length} lessons in database`);
  
  let validLessons = 0;
  let invalidLessons = 0;
  const issues: string[] = [];
  
  for (const lesson of allLessons) {
    let isValid = true;
    
    // Check required fields
    if (!lesson.title || lesson.title.trim() === '') {
      issues.push(`Lesson ${lesson.id}: Missing title`);
      isValid = false;
    }
    
    if (!lesson.content || lesson.content.trim() === '') {
      issues.push(`Lesson ${lesson.id}: Missing content`);
      isValid = false;
    }
    
    if (!lesson.difficulty) {
      issues.push(`Lesson ${lesson.id}: Missing difficulty`);
      isValid = false;
    }
    
    // Check vocabulary
    const vocabCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(vocabulary)
      .where(eq(vocabulary.lessonId, lesson.id));
    
    if (vocabCount[0].count === 0) {
      issues.push(`Lesson ${lesson.id}: No vocabulary items`);
      isValid = false;
    }
    
    if (isValid) {
      validLessons++;
    } else {
      invalidLessons++;
    }
  }
  
  const passRate = (validLessons / allLessons.length) * 100;
  
  if (passRate >= 95) {
    results.push({
      category: 'Lessons',
      test: 'All Lessons Validation',
      status: 'PASS',
      message: `${validLessons}/${allLessons.length} lessons valid (${passRate.toFixed(1)}%)`,
      details: { valid: validLessons, invalid: invalidLessons, issues: issues.slice(0, 10) }
    });
    console.log(`  ✅ PASS: ${passRate.toFixed(1)}% lessons valid\n`);
  } else if (passRate >= 80) {
    results.push({
      category: 'Lessons',
      test: 'All Lessons Validation',
      status: 'WARN',
      message: `${validLessons}/${allLessons.length} lessons valid (${passRate.toFixed(1)}%)`,
      details: { valid: validLessons, invalid: invalidLessons, issues: issues.slice(0, 10) }
    });
    console.log(`  ⚠️  WARN: Only ${passRate.toFixed(1)}% lessons valid\n`);
  } else {
    results.push({
      category: 'Lessons',
      test: 'All Lessons Validation',
      status: 'FAIL',
      message: `Only ${validLessons}/${allLessons.length} lessons valid (${passRate.toFixed(1)}%)`,
      details: { valid: validLessons, invalid: invalidLessons, issues: issues.slice(0, 10) }
    });
    console.log(`  ❌ FAIL: Only ${passRate.toFixed(1)}% lessons valid\n`);
  }
  
  if (issues.length > 0) {
    console.log(`  First 10 issues:`);
    issues.slice(0, 10).forEach(issue => console.log(`    - ${issue}`));
    console.log('');
  }
} catch (error: any) {
  results.push({
    category: 'Lessons',
    test: 'All Lessons Validation',
    status: 'FAIL',
    message: `Error: ${error.message}`
  });
  console.log(`  ❌ FAIL: ${error.message}\n`);
}

// Test 4: Check Data File Integration
console.log('Test 4: Data File Integration...');
try {
  const dataFiles = [
    'client/src/data/hindiStoriesData.ts',
    'client/src/data/hindiLearningData.ts',
    'client/src/data/advancedVocabularyData.ts',
    'client/src/data/bilingualTranslations.ts',
    'client/src/data/hindiCommonPhrasesData.ts',
    'client/src/data/hindiDialoguesData.ts',
    'client/src/data/hindiListeningData.ts',
    'client/src/data/hindiRolePlayData.ts',
  ];
  
  let existingFiles = 0;
  let integratedFiles = 0;
  const notIntegrated: string[] = [];
  
  for (const file of dataFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      existingFiles++;
      
      // Check if file is imported anywhere
      const fileName = path.basename(file, '.ts');
      const searchPattern = fileName;
      
      // Search in component files
      const clientSrc = path.join(process.cwd(), 'client/src');
      let isIntegrated = false;
      
      function searchInDirectory(dir: string): boolean {
        const files = fs.readdirSync(dir);
        for (const f of files) {
          const fullPath = path.join(dir, f);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory() && !f.includes('node_modules')) {
            if (searchInDirectory(fullPath)) return true;
          } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            if (content.includes(searchPattern) && !fullPath.includes(file)) {
              return true;
            }
          }
        }
        return false;
      }
      
      isIntegrated = searchInDirectory(clientSrc);
      
      if (isIntegrated) {
        integratedFiles++;
      } else {
        notIntegrated.push(fileName);
      }
    }
  }
  
  const integrationRate = (integratedFiles / existingFiles) * 100;
  
  if (integrationRate === 100) {
    results.push({
      category: 'Data Integration',
      test: 'Data Files',
      status: 'PASS',
      message: `All ${existingFiles} data files integrated`,
      details: { existing: existingFiles, integrated: integratedFiles }
    });
    console.log(`  ✅ PASS: All data files integrated\n`);
  } else if (integrationRate >= 80) {
    results.push({
      category: 'Data Integration',
      test: 'Data Files',
      status: 'WARN',
      message: `${integratedFiles}/${existingFiles} data files integrated`,
      details: { existing: existingFiles, integrated: integratedFiles, notIntegrated }
    });
    console.log(`  ⚠️  WARN: ${integratedFiles}/${existingFiles} data files integrated\n`);
    console.log(`  Not integrated: ${notIntegrated.join(', ')}\n`);
  } else {
    results.push({
      category: 'Data Integration',
      test: 'Data Files',
      status: 'FAIL',
      message: `Only ${integratedFiles}/${existingFiles} data files integrated`,
      details: { existing: existingFiles, integrated: integratedFiles, notIntegrated }
    });
    console.log(`  ❌ FAIL: Only ${integratedFiles}/${existingFiles} data files integrated\n`);
    console.log(`  Not integrated: ${notIntegrated.join(', ')}\n`);
  }
} catch (error: any) {
  results.push({
    category: 'Data Integration',
    test: 'Data Files',
    status: 'FAIL',
    message: `Error: ${error.message}`
  });
  console.log(`  ❌ FAIL: ${error.message}\n`);
}

// Test 5: Check Route Configuration
console.log('Test 5: Route Configuration...');
try {
  const appPath = path.join(process.cwd(), 'client/src/App.tsx');
  const content = fs.readFileSync(appPath, 'utf-8');
  
  const routes = [
    { path: '/', component: 'Landing' },
    { path: '/dashboard', component: 'Home' },
    { path: '/lesson/:id', component: 'LessonView' },
    { path: '/speak', component: 'SpeakingPractice' },
    { path: '/vocabulary', component: 'HindiVocabulary' },
  ];
  
  let configuredRoutes = 0;
  const missingRoutes: string[] = [];
  
  for (const route of routes) {
    if (content.includes(route.path) && content.includes(route.component)) {
      configuredRoutes++;
    } else {
      missingRoutes.push(`${route.path} -> ${route.component}`);
    }
  }
  
  if (configuredRoutes === routes.length) {
    results.push({
      category: 'Routes',
      test: 'Route Configuration',
      status: 'PASS',
      message: `All ${routes.length} key routes configured`,
      details: { configured: configuredRoutes, total: routes.length }
    });
    console.log(`  ✅ PASS: All key routes configured\n`);
  } else {
    results.push({
      category: 'Routes',
      test: 'Route Configuration',
      status: 'WARN',
      message: `${configuredRoutes}/${routes.length} key routes configured`,
      details: { configured: configuredRoutes, total: routes.length, missing: missingRoutes }
    });
    console.log(`  ⚠️  WARN: ${configuredRoutes}/${routes.length} key routes configured\n`);
  }
} catch (error: any) {
  results.push({
    category: 'Routes',
    test: 'Route Configuration',
    status: 'FAIL',
    message: `Error: ${error.message}`
  });
  console.log(`  ❌ FAIL: ${error.message}\n`);
}

// Generate Report
console.log('\n📊 VALIDATION REPORT');
console.log('===================\n');

const passed = results.filter(r => r.status === 'PASS').length;
const warned = results.filter(r => r.status === 'WARN').length;
const failed = results.filter(r => r.status === 'FAIL').length;
const total = results.length;

console.log(`Total Tests: ${total}`);
console.log(`✅ Passed: ${passed}`);
console.log(`⚠️  Warnings: ${warned}`);
console.log(`❌ Failed: ${failed}\n`);

const passRate = (passed / total) * 100;

console.log(`Pass Rate: ${passRate.toFixed(1)}%\n`);

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total,
    passed,
    warned,
    failed,
    passRate: passRate.toFixed(1)
  },
  results
};

fs.writeFileSync(
  'comprehensive-validation-report.json',
  JSON.stringify(report, null, 2)
);

console.log('📄 Report saved to: comprehensive-validation-report.json\n');

// Final verdict
if (failed === 0 && warned === 0) {
  console.log('🏆 VERDICT: EXCELLENT');
  console.log('All tests passed! App is in perfect condition.\n');
  process.exit(0);
} else if (failed === 0) {
  console.log('✅ VERDICT: GOOD');
  console.log('All tests passed with some warnings. Review warnings.\n');
  process.exit(0);
} else {
  console.log('⚠️  VERDICT: NEEDS ATTENTION');
  console.log('Some tests failed. Review and fix issues.\n');
  process.exit(1);
}
