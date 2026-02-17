#!/usr/bin/env tsx
/**
 * EXHAUSTIVE SYSTEM TESTING FRAMEWORK
 * 
 * Performs complete validation of:
 * - All lessons and their integration
 * - All components and routes
 * - All data files and assets
 * - Saraswati Mascot placement
 * - Home component discovery
 * - User flows (Beginner, Intermediate, Advanced)
 * 
 * Simulates: 125 Beginner + 75 Intermediate + 51 Advanced = 251 users
 * Each user accesses 90% of lessons randomly
 */

import fetch from 'node-fetch';
import { performance } from 'perf_hooks';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
const BEGINNER_USERS = 125;
const INTERMEDIATE_USERS = 75;
const ADVANCED_USERS = 51;
const LESSON_COVERAGE = 0.90; // 90% of lessons

// Test Results
interface TestResult {
  category: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: any;
}

interface ComponentTest {
  component: string;
  path: string;
  exists: boolean;
  hasExports: boolean;
  issues: string[];
}

interface LessonTest {
  lessonId: number;
  title: string;
  accessible: boolean;
  hasVocabulary: boolean;
  hasContent: boolean;
  hasHindiTranslation: boolean;
  issues: string[];
}

interface RouteTest {
  route: string;
  status: number;
  accessible: boolean;
  responseTime: number;
}

interface UserSimulation {
  userId: number;
  userType: 'beginner' | 'intermediate' | 'advanced';
  lessonsAccessed: number;
  quizzesTaken: number;
  errors: string[];
  totalTime: number;
  success: boolean;
}

const results: TestResult[] = [];
const componentTests: ComponentTest[] = [];
const lessonTests: LessonTest[] = [];
const routeTests: RouteTest[] = [];
const userSimulations: UserSimulation[] = [];

// Utility Functions
function addResult(category: string, test: string, status: 'PASS' | 'FAIL' | 'WARN', message: string, details?: any) {
  results.push({ category, test, status, message, details });
  
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${category}] ${test}: ${message}`);
}

async function testEndpoint(endpoint: string): Promise<RouteTest> {
  const startTime = performance.now();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const responseTime = performance.now() - startTime;
    
    return {
      route: endpoint,
      status: response.status,
      accessible: response.ok,
      responseTime
    };
  } catch (error: any) {
    return {
      route: endpoint,
      status: 0,
      accessible: false,
      responseTime: performance.now() - startTime
    };
  }
}

// ============================================================================
// PHASE 1: FILE SYSTEM VALIDATION
// ============================================================================

async function validateFileSystem() {
  console.log('\n' + '='.repeat(80));
  console.log('📁 PHASE 1: FILE SYSTEM VALIDATION');
  console.log('='.repeat(80) + '\n');

  // Check critical directories
  const criticalDirs = [
    'client/src/components',
    'client/src/pages',
    'client/src/hooks',
    'client/src/data',
    'server',
    'shared',
    'public'
  ];

  for (const dir of criticalDirs) {
    const exists = fs.existsSync(dir);
    addResult(
      'FileSystem',
      `Directory: ${dir}`,
      exists ? 'PASS' : 'FAIL',
      exists ? 'Exists' : 'Missing'
    );
  }

  // Check critical files
  const criticalFiles = [
    'client/src/App.tsx',
    'client/src/main.tsx',
    'server/index.ts',
    'server/routes.ts',
    'shared/schema.ts',
    'package.json',
    'vite.config.ts'
  ];

  for (const file of criticalFiles) {
    const exists = fs.existsSync(file);
    addResult(
      'FileSystem',
      `File: ${file}`,
      exists ? 'PASS' : 'FAIL',
      exists ? 'Exists' : 'Missing'
    );
  }
}

// ============================================================================
// PHASE 2: COMPONENT VALIDATION
// ============================================================================

async function validateComponents() {
  console.log('\n' + '='.repeat(80));
  console.log('🧩 PHASE 2: COMPONENT VALIDATION');
  console.log('='.repeat(80) + '\n');

  const componentsDir = 'client/src/components';
  
  if (!fs.existsSync(componentsDir)) {
    addResult('Components', 'Directory Check', 'FAIL', 'Components directory not found');
    return;
  }

  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && (dirent.name.endsWith('.tsx') || dirent.name.endsWith('.ts')))
    .map(dirent => dirent.name);

  // Critical components to check
  const criticalComponents = [
    'Layout.tsx',
    'LessonCard.tsx',
    'VocabularyItem.tsx',
    'AudioButton.tsx',
    'SaraswatiMascot.tsx',
    'ErrorBoundary.tsx',
    'PageTransition.tsx'
  ];

  for (const component of criticalComponents) {
    const componentPath = path.join(componentsDir, component);
    const exists = fs.existsSync(componentPath);
    const issues: string[] = [];

    if (exists) {
      const content = fs.readFileSync(componentPath, 'utf-8');
      
      // Check for exports
      const hasExport = content.includes('export') && (content.includes('function') || content.includes('const') || content.includes('class'));
      if (!hasExport) issues.push('No exports found');
      
      // Check for React import
      const hasReactImport = content.includes('import') && content.includes('react');
      if (!hasReactImport) issues.push('No React import');

      componentTests.push({
        component,
        path: componentPath,
        exists: true,
        hasExports: hasExport,
        issues
      });

      addResult(
        'Components',
        component,
        issues.length === 0 ? 'PASS' : 'WARN',
        issues.length === 0 ? 'Valid' : `Issues: ${issues.join(', ')}`
      );
    } else {
      componentTests.push({
        component,
        path: componentPath,
        exists: false,
        hasExports: false,
        issues: ['Component file not found']
      });

      addResult('Components', component, 'FAIL', 'Component file not found');
    }
  }

  // Special check for Saraswati Mascot
  const saraswatiPath = path.join(componentsDir, 'SaraswatiMascot.tsx');
  if (fs.existsSync(saraswatiPath)) {
    const content = fs.readFileSync(saraswatiPath, 'utf-8');
    const isUsedInApp = fs.readFileSync('client/src/App.tsx', 'utf-8').includes('SaraswatiMascot');
    const isUsedInHome = fs.existsSync('client/src/pages/Home.tsx') && 
                         fs.readFileSync('client/src/pages/Home.tsx', 'utf-8').includes('SaraswatiMascot');
    
    addResult(
      'Components',
      'Saraswati Mascot Integration',
      (isUsedInApp || isUsedInHome) ? 'PASS' : 'WARN',
      (isUsedInApp || isUsedInHome) ? 'Properly integrated' : 'Not used in main components'
    );
  }
}

// ============================================================================
// PHASE 3: ROUTE VALIDATION
// ============================================================================

async function validateRoutes() {
  console.log('\n' + '='.repeat(80));
  console.log('🛣️  PHASE 3: ROUTE VALIDATION');
  console.log('='.repeat(80) + '\n');

  const routes = [
    '/',
    '/api/health',
    '/api/lessons',
    '/api/quizzes',
    '/api/stories',
    '/api/scenarios',
    '/api/gamification/leaderboard'
  ];

  for (const route of routes) {
    const result = await testEndpoint(route);
    routeTests.push(result);

    addResult(
      'Routes',
      route,
      result.accessible ? 'PASS' : 'FAIL',
      result.accessible 
        ? `${result.status} (${result.responseTime.toFixed(2)}ms)` 
        : `Failed (${result.status})`
    );
  }

  // Check Home component routing
  const homeResult = await testEndpoint('/');
  if (homeResult.accessible) {
    addResult('Routes', 'Home Component Discovery', 'PASS', 'Home route accessible');
  } else {
    addResult('Routes', 'Home Component Discovery', 'FAIL', 'Home route not accessible');
  }
}

// ============================================================================
// PHASE 4: LESSON VALIDATION
// ============================================================================

async function validateLessons() {
  console.log('\n' + '='.repeat(80));
  console.log('📚 PHASE 4: LESSON VALIDATION');
  console.log('='.repeat(80) + '\n');

  try {
    const response = await fetch(`${BASE_URL}/api/lessons`);
    if (!response.ok) {
      addResult('Lessons', 'Fetch All Lessons', 'FAIL', `HTTP ${response.status}`);
      return;
    }

    const lessons = await response.json();
    addResult('Lessons', 'Fetch All Lessons', 'PASS', `Found ${lessons.length} lessons`);

    // Validate each lesson
    let validLessons = 0;
    let orphanedLessons = 0;
    let incompleteData = 0;

    for (const lesson of lessons.slice(0, 50)) { // Test first 50 for speed
      const issues: string[] = [];
      
      // Check lesson data completeness
      if (!lesson.title) issues.push('Missing title');
      if (!lesson.content) issues.push('Missing content');
      if (!lesson.hindiTitle) issues.push('Missing Hindi title');
      if (!lesson.hindiDescription) issues.push('Missing Hindi description');
      
      // Test lesson accessibility
      const lessonResponse = await testEndpoint(`/api/lessons/${lesson.id}`);
      if (!lessonResponse.accessible) {
        issues.push('Not accessible via API');
        orphanedLessons++;
      }

      // Check for vocabulary
      const hasVocabulary = lesson.vocabulary && lesson.vocabulary.length > 0;
      if (!hasVocabulary) issues.push('No vocabulary');

      if (issues.length === 0) {
        validLessons++;
      } else {
        incompleteData++;
      }

      lessonTests.push({
        lessonId: lesson.id,
        title: lesson.title,
        accessible: lessonResponse.accessible,
        hasVocabulary,
        hasContent: !!lesson.content,
        hasHindiTranslation: !!(lesson.hindiTitle && lesson.hindiDescription),
        issues
      });
    }

    addResult(
      'Lessons',
      'Lesson Data Integrity',
      orphanedLessons === 0 && incompleteData === 0 ? 'PASS' : 'WARN',
      `Valid: ${validLessons}, Orphaned: ${orphanedLessons}, Incomplete: ${incompleteData}`
    );

  } catch (error: any) {
    addResult('Lessons', 'Lesson Validation', 'FAIL', error.message);
  }
}

// ============================================================================
// PHASE 5: DATA FILE VALIDATION
// ============================================================================

async function validateDataFiles() {
  console.log('\n' + '='.repeat(80));
  console.log('📄 PHASE 5: DATA FILE VALIDATION');
  console.log('='.repeat(80) + '\n');

  const dataDir = 'client/src/data';
  
  if (!fs.existsSync(dataDir)) {
    addResult('DataFiles', 'Data Directory', 'FAIL', 'Data directory not found');
    return;
  }

  const dataFiles = fs.readdirSync(dataDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.json'));

  addResult('DataFiles', 'Data Files Found', 'PASS', `Found ${dataFiles.length} data files`);

  // Check if data files are imported/used
  const appContent = fs.readFileSync('client/src/App.tsx', 'utf-8');
  const pagesDir = 'client/src/pages';
  
  let usedFiles = 0;
  let unusedFiles = 0;

  for (const file of dataFiles) {
    const fileName = file.replace(/\.(ts|json)$/, '');
    let isUsed = false;

    // Check in App.tsx
    if (appContent.includes(fileName)) {
      isUsed = true;
    }

    // Check in pages
    if (!isUsed && fs.existsSync(pagesDir)) {
      const pageFiles = fs.readdirSync(pagesDir);
      for (const pageFile of pageFiles) {
        const pagePath = path.join(pagesDir, pageFile);
        if (fs.statSync(pagePath).isFile()) {
          const pageContent = fs.readFileSync(pagePath, 'utf-8');
          if (pageContent.includes(fileName)) {
            isUsed = true;
            break;
          }
        }
      }
    }

    if (isUsed) {
      usedFiles++;
    } else {
      unusedFiles++;
      addResult('DataFiles', file, 'WARN', 'Data file not used in application');
    }
  }

  addResult(
    'DataFiles',
    'Data File Usage',
    unusedFiles === 0 ? 'PASS' : 'WARN',
    `Used: ${usedFiles}, Unused: ${unusedFiles}`
  );
}

// ============================================================================
// PHASE 6: USER SIMULATION
// ============================================================================

class VirtualUser {
  private userId: number;
  private userType: 'beginner' | 'intermediate' | 'advanced';
  private lessonsAccessed: number = 0;
  private quizzesTaken: number = 0;
  private errors: string[] = [];
  private startTime: number = 0;

  constructor(userId: number, userType: 'beginner' | 'intermediate' | 'advanced') {
    this.userId = userId;
    this.userType = userType;
  }

  async simulate(lessons: any[], quizzes: any[]): Promise<UserSimulation> {
    this.startTime = performance.now();
    
    // Calculate 90% of lessons to access (moved outside try block)
    const lessonsToAccess = Math.ceil(lessons.length * LESSON_COVERAGE);

    try {
      // Randomly select lessons
      const shuffled = [...lessons].sort(() => Math.random() - 0.5);
      const selectedLessons = shuffled.slice(0, lessonsToAccess);

      // Access lessons
      for (const lesson of selectedLessons) {
        try {
          const response = await fetch(`${BASE_URL}/api/lessons/${lesson.id}`);
          if (response.ok) {
            this.lessonsAccessed++;
          } else {
            this.errors.push(`Lesson ${lesson.id}: HTTP ${response.status}`);
          }
        } catch (error: any) {
          this.errors.push(`Lesson ${lesson.id}: ${error.message}`);
        }

        // Small delay to simulate reading
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Take some quizzes based on user type
      const quizzesToTake = this.userType === 'beginner' ? 2 : 
                           this.userType === 'intermediate' ? 4 : 6;
      
      const selectedQuizzes = quizzes.slice(0, Math.min(quizzesToTake, quizzes.length));
      
      for (const quiz of selectedQuizzes) {
        try {
          const response = await fetch(`${BASE_URL}/api/quizzes/${quiz.id}`);
          if (response.ok) {
            this.quizzesTaken++;
          } else {
            this.errors.push(`Quiz ${quiz.id}: HTTP ${response.status}`);
          }
        } catch (error: any) {
          this.errors.push(`Quiz ${quiz.id}: ${error.message}`);
        }

        await new Promise(resolve => setTimeout(resolve, 10));
      }

    } catch (error: any) {
      this.errors.push(`Critical error: ${error.message}`);
    }

    const totalTime = performance.now() - this.startTime;
    const success = this.errors.length === 0 && this.lessonsAccessed >= lessonsToAccess * 0.9;

    return {
      userId: this.userId,
      userType: this.userType,
      lessonsAccessed: this.lessonsAccessed,
      quizzesTaken: this.quizzesTaken,
      errors: this.errors,
      totalTime,
      success
    };
  }
}

async function simulateUsers() {
  console.log('\n' + '='.repeat(80));
  console.log('👥 PHASE 6: USER SIMULATION');
  console.log('='.repeat(80) + '\n');

  // Fetch lessons and quizzes
  const lessonsResponse = await fetch(`${BASE_URL}/api/lessons`);
  const quizzesResponse = await fetch(`${BASE_URL}/api/quizzes`);

  if (!lessonsResponse.ok || !quizzesResponse.ok) {
    addResult('UserSimulation', 'Data Fetch', 'FAIL', 'Could not fetch lessons or quizzes');
    return;
  }

  const lessons = await lessonsResponse.json();
  const quizzes = await quizzesResponse.json();

  console.log(`📚 Testing with ${lessons.length} lessons and ${quizzes.length} quizzes\n`);

  // Create users
  const users: VirtualUser[] = [];
  
  for (let i = 1; i <= BEGINNER_USERS; i++) {
    users.push(new VirtualUser(i, 'beginner'));
  }
  
  for (let i = BEGINNER_USERS + 1; i <= BEGINNER_USERS + INTERMEDIATE_USERS; i++) {
    users.push(new VirtualUser(i, 'intermediate'));
  }
  
  for (let i = BEGINNER_USERS + INTERMEDIATE_USERS + 1; 
       i <= BEGINNER_USERS + INTERMEDIATE_USERS + ADVANCED_USERS; i++) {
    users.push(new VirtualUser(i, 'advanced'));
  }

  console.log(`👤 Simulating ${users.length} users...`);
  console.log(`   - ${BEGINNER_USERS} Beginner users`);
  console.log(`   - ${INTERMEDIATE_USERS} Intermediate users`);
  console.log(`   - ${ADVANCED_USERS} Advanced users`);
  console.log(`   - Each accessing 90% of ${lessons.length} lessons\n`);

  // Run simulations in batches to avoid overwhelming the server
  const batchSize = 25;
  let completedUsers = 0;
  let successfulUsers = 0;
  let failedUsers = 0;

  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(user => user.simulate(lessons, quizzes))
    );

    for (const result of batchResults) {
      userSimulations.push(result);
      completedUsers++;
      
      if (result.success) {
        successfulUsers++;
      } else {
        failedUsers++;
      }

      if (result.errors.length > 0) {
        console.log(`⚠️  User ${result.userId} (${result.userType}): ${result.errors.length} errors`);
      }
    }

    console.log(`   Progress: ${completedUsers}/${users.length} users completed`);
  }

  const successRate = (successfulUsers / users.length) * 100;

  addResult(
    'UserSimulation',
    'User Success Rate',
    successRate >= 95 ? 'PASS' : successRate >= 90 ? 'WARN' : 'FAIL',
    `${successRate.toFixed(2)}% (${successfulUsers}/${users.length})`
  );

  addResult(
    'UserSimulation',
    'Zero Blocking Issues',
    failedUsers === 0 ? 'PASS' : 'FAIL',
    failedUsers === 0 ? 'No blocking issues' : `${failedUsers} users encountered issues`
  );
}

// ============================================================================
// PHASE 7: GENERATE REPORT
// ============================================================================

function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📊 FINAL REPORT');
  console.log('='.repeat(80) + '\n');

  // Count results by status
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const warnings = results.filter(r => r.status === 'WARN').length;
  const total = results.length;

  console.log(`Total Tests: ${total}`);
  console.log(`✅ Passed: ${passed} (${((passed / total) * 100).toFixed(2)}%)`);
  console.log(`❌ Failed: ${failed} (${((failed / total) * 100).toFixed(2)}%)`);
  console.log(`⚠️  Warnings: ${warnings} (${((warnings / total) * 100).toFixed(2)}%)`);

  // Component summary
  console.log(`\n🧩 Components:`);
  console.log(`   Tested: ${componentTests.length}`);
  console.log(`   Valid: ${componentTests.filter(c => c.exists && c.hasExports).length}`);
  console.log(`   Issues: ${componentTests.filter(c => c.issues.length > 0).length}`);

  // Lesson summary
  console.log(`\n📚 Lessons:`);
  console.log(`   Tested: ${lessonTests.length}`);
  console.log(`   Accessible: ${lessonTests.filter(l => l.accessible).length}`);
  console.log(`   Complete Data: ${lessonTests.filter(l => l.hasContent && l.hasHindiTranslation).length}`);
  console.log(`   With Vocabulary: ${lessonTests.filter(l => l.hasVocabulary).length}`);

  // Route summary
  console.log(`\n🛣️  Routes:`);
  console.log(`   Tested: ${routeTests.length}`);
  console.log(`   Accessible: ${routeTests.filter(r => r.accessible).length}`);
  console.log(`   Avg Response Time: ${(routeTests.reduce((sum, r) => sum + r.responseTime, 0) / routeTests.length).toFixed(2)}ms`);

  // User simulation summary
  if (userSimulations.length > 0) {
    console.log(`\n👥 User Simulations:`);
    console.log(`   Total Users: ${userSimulations.length}`);
    console.log(`   Successful: ${userSimulations.filter(u => u.success).length}`);
    console.log(`   With Errors: ${userSimulations.filter(u => u.errors.length > 0).length}`);
    console.log(`   Avg Lessons Accessed: ${(userSimulations.reduce((sum, u) => sum + u.lessonsAccessed, 0) / userSimulations.length).toFixed(2)}`);
    console.log(`   Avg Time: ${(userSimulations.reduce((sum, u) => sum + u.totalTime, 0) / userSimulations.length / 1000).toFixed(2)}s`);
  }

  // Overall assessment
  console.log(`\n${'='.repeat(80)}`);
  const overallScore = ((passed / total) * 100);
  
  if (overallScore >= 95 && failed === 0) {
    console.log('🏆 EXCELLENT: System is fully functional and integrated!');
  } else if (overallScore >= 90) {
    console.log('✅ GOOD: System is functional with minor issues');
  } else if (overallScore >= 80) {
    console.log('⚠️  ACCEPTABLE: System has some issues that need attention');
  } else {
    console.log('❌ POOR: System has critical issues that must be fixed');
  }

  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total,
      passed,
      failed,
      warnings,
      score: overallScore
    },
    results,
    componentTests,
    lessonTests,
    routeTests,
    userSimulations: userSimulations.slice(0, 10) // Save first 10 for brevity
  };

  fs.writeFileSync(
    'exhaustive-test-report.json',
    JSON.stringify(report, null, 2)
  );

  console.log(`\n📄 Detailed report saved to: exhaustive-test-report.json`);
  console.log('='.repeat(80) + '\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n' + '█'.repeat(80));
  console.log('🔬 EXHAUSTIVE SYSTEM TESTING FRAMEWORK');
  console.log('█'.repeat(80));
  console.log(`\n📍 Target: ${BASE_URL}`);
  console.log(`📊 Test Scope:`);
  console.log(`   - File system validation`);
  console.log(`   - Component validation`);
  console.log(`   - Route validation`);
  console.log(`   - Lesson validation`);
  console.log(`   - Data file validation`);
  console.log(`   - User simulation (${BEGINNER_USERS + INTERMEDIATE_USERS + ADVANCED_USERS} users)`);
  console.log(`   - 90% lesson coverage per user`);
  console.log('\n' + '█'.repeat(80));

  const startTime = performance.now();

  try {
    await validateFileSystem();
    await validateComponents();
    await validateRoutes();
    await validateLessons();
    await validateDataFiles();
    await simulateUsers();
  } catch (error: any) {
    console.error('\n❌ Critical error during testing:', error);
    addResult('System', 'Test Execution', 'FAIL', error.message);
  }

  const duration = (performance.now() - startTime) / 1000;
  console.log(`\n⏱️  Total test duration: ${duration.toFixed(2)}s`);

  generateReport();

  // Exit with appropriate code
  const failed = results.filter(r => r.status === 'FAIL').length;
  process.exit(failed > 0 ? 1 : 0);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Test interrupted by user');
  generateReport();
  process.exit(1);
});

// Run the tests
main();
