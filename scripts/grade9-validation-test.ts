#!/usr/bin/env tsx

/**
 * GRADE 9 VALIDATION TEST
 * 
 * Quick validation to ensure all Grade 9 components are working
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

async function validateGrade9Implementation() {
  console.log('🎯 GRADE 9 VALIDATION TEST\n');

  const results = [];

  // 1. Check Typography System
  try {
    const cssPath = join(process.cwd(), 'client/src/index.css');
    const cssContent = await readFile(cssPath, 'utf-8');
    
    const hasDevanagariFont = cssContent.includes('Noto Sans Devanagari') || cssContent.includes('Hind');
    const hasHindiClasses = cssContent.includes('.hindi-text');
    const hasGrade9Classes = cssContent.includes('GRADE 9 TYPOGRAPHY');
    
    results.push({
      test: 'Typography System',
      passed: hasDevanagariFont && hasHindiClasses && hasGrade9Classes,
      details: { hasDevanagariFont, hasHindiClasses, hasGrade9Classes }
    });
  } catch (error) {
    results.push({
      test: 'Typography System',
      passed: false,
      error: error.message
    });
  }

  // 2. Check Bilingual Translations
  try {
    const translationsPath = join(process.cwd(), 'client/src/data/bilingualTranslations.ts');
    const translationsContent = await readFile(translationsPath, 'utf-8');
    
    const hasBilingualNav = translationsContent.includes('BILINGUAL_NAV');
    const hasEducationalTerms = translationsContent.includes('EDUCATIONAL_TERMS');
    const hasGrammarTerms = translationsContent.includes('GRAMMAR_TERMS');
    
    results.push({
      test: 'Bilingual Translations',
      passed: hasBilingualNav && hasEducationalTerms && hasGrammarTerms,
      details: { hasBilingualNav, hasEducationalTerms, hasGrammarTerms }
    });
  } catch (error) {
    results.push({
      test: 'Bilingual Translations',
      passed: false,
      error: error.message
    });
  }

  // 3. Check Lesson Engine
  try {
    const lessonEnginePath = join(process.cwd(), 'client/src/utils/lessonEngine.ts');
    const lessonEngineContent = await readFile(lessonEnginePath, 'utf-8');
    
    const hasEnrichedLesson = lessonEngineContent.includes('EnrichedLesson');
    const hasLessonEngine = lessonEngineContent.includes('class LessonEngine');
    const hasQualityScore = lessonEngineContent.includes('qualityScore');
    
    results.push({
      test: 'Lesson Engine',
      passed: hasEnrichedLesson && hasLessonEngine && hasQualityScore,
      details: { hasEnrichedLesson, hasLessonEngine, hasQualityScore }
    });
  } catch (error) {
    results.push({
      test: 'Lesson Engine',
      passed: false,
      error: error.message
    });
  }

  // 4. Check Quality Manifest
  try {
    const qualityManifestPath = join(process.cwd(), 'client/src/utils/contentQualityManifest.ts');
    const qualityManifestContent = await readFile(qualityManifestPath, 'utf-8');
    
    const hasQualityMetrics = qualityManifestContent.includes('QualityMetrics');
    const hasContentAuditor = qualityManifestContent.includes('ContentQualityAuditor');
    const hasGrade9Threshold = qualityManifestContent.includes('GRADE_9_THRESHOLD');
    
    results.push({
      test: 'Quality Manifest',
      passed: hasQualityMetrics && hasContentAuditor && hasGrade9Threshold,
      details: { hasQualityMetrics, hasContentAuditor, hasGrade9Threshold }
    });
  } catch (error) {
    results.push({
      test: 'Quality Manifest',
      passed: false,
      error: error.message
    });
  }

  // 5. Check Hindi Scaffold Component
  try {
    const hindiScaffoldPath = join(process.cwd(), 'client/src/components/HindiScaffold.tsx');
    const hindiScaffoldContent = await readFile(hindiScaffoldPath, 'utf-8');
    
    const hasHindiScaffold = hindiScaffoldContent.includes('HindiScaffold');
    const hasBilingualText = hindiScaffoldContent.includes('BilingualText');
    const hasQualityBadge = hindiScaffoldContent.includes('QualityBadge');
    
    results.push({
      test: 'Hindi Scaffold Component',
      passed: hasHindiScaffold && hasBilingualText && hasQualityBadge,
      details: { hasHindiScaffold, hasBilingualText, hasQualityBadge }
    });
  } catch (error) {
    results.push({
      test: 'Hindi Scaffold Component',
      passed: false,
      error: error.message
    });
  }

  // 6. Check Grade 9 Lesson Card
  try {
    const grade9CardPath = join(process.cwd(), 'client/src/components/Grade9LessonCard.tsx');
    const grade9CardContent = await readFile(grade9CardPath, 'utf-8');
    
    const hasGrade9Card = grade9CardContent.includes('Grade9LessonCard');
    const hasVariants = grade9CardContent.includes("variant?: 'default' | 'compact' | 'featured'");
    const usesHindiScaffold = grade9CardContent.includes('HindiScaffold');
    
    results.push({
      test: 'Grade 9 Lesson Card',
      passed: hasGrade9Card && hasVariants && usesHindiScaffold,
      details: { hasGrade9Card, hasVariants, usesHindiScaffold }
    });
  } catch (error) {
    results.push({
      test: 'Grade 9 Lesson Card',
      passed: false,
      error: error.message
    });
  }

  // 7. Check Data Registry
  try {
    const dataIndexPath = join(process.cwd(), 'client/src/data/index.ts');
    const dataIndexContent = await readFile(dataIndexPath, 'utf-8');
    
    const hasDataRegistry = dataIndexContent.includes('DATA_REGISTRY');
    const hasValidation = dataIndexContent.includes('validateDataRegistry');
    const exportsBilingualTranslations = dataIndexContent.includes('bilingualTranslations');
    
    results.push({
      test: 'Data Registry',
      passed: hasDataRegistry && hasValidation && exportsBilingualTranslations,
      details: { hasDataRegistry, hasValidation, exportsBilingualTranslations }
    });
  } catch (error) {
    results.push({
      test: 'Data Registry',
      passed: false,
      error: error.message
    });
  }

  // Generate Report
  console.log('📊 VALIDATION RESULTS:\n');
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const percentage = Math.round((passed / total) * 100);
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.test}: ${result.passed ? 'PASSED' : 'FAILED'}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else if (result.details) {
      const detailsStr = Object.entries(result.details)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      console.log(`   Details: ${detailsStr}`);
    }
    console.log();
  });

  console.log('='.repeat(60));
  console.log(`🎯 GRADE 9 COMPLIANCE: ${percentage}% (${passed}/${total} tests passed)`);
  
  if (percentage >= 90) {
    console.log('🏆 GRADE 9 ACHIEVED! Your app meets professional standards.');
  } else if (percentage >= 80) {
    console.log('🥈 Grade 8 Quality - Close to Grade 9, minor improvements needed.');
  } else if (percentage >= 70) {
    console.log('🥉 Grade 7 Quality - Good foundation, more work needed for Grade 9.');
  } else {
    console.log('📚 Below Grade 7 - Significant improvements needed.');
  }
  
  console.log('='.repeat(60));

  return percentage >= 90;
}

// Run validation
validateGrade9Implementation()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Validation failed:', error);
    process.exit(1);
  });