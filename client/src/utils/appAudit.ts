/**
 * APP AUDIT UTILITY - GRADE 9 FLOW VALIDATION
 * 
 * Master manifest system to ensure no content is orphaned
 * and all bilingual features are working correctly
 */

import { DATA_REGISTRY, validateDataRegistry } from '../data/index';
import { lessonEngine } from './lessonEngine';
import { contentQualityAuditor } from './contentQualityManifest';

export interface AppAuditResult {
  totalActiveContent: number;
  isFlowBroken: boolean;
  bilingualCoverage: string;
  qualityScore: number;
  grade: string;
  issues: string[];
  recommendations: string[];
  timestamp: string;
}

export const auditAppFlow = (): AppAuditResult => {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let qualityScore = 100;

  // 1. Validate Data Registry
  const registryValidation = validateDataRegistry();
  if (!registryValidation.isValid) {
    issues.push(`Missing data modules: ${registryValidation.missingModules.join(', ')}`);
    qualityScore -= 20;
  }

  // 2. Check Bilingual Support
  const bilingualModules = DATA_REGISTRY.modules.filter(module => 
    module.includes('bilingual') || module.includes('hindi')
  );
  const bilingualCoverage = (bilingualModules.length / DATA_REGISTRY.modules.length) * 100;
  
  if (bilingualCoverage < 50) {
    issues.push('Insufficient bilingual module coverage');
    qualityScore -= 15;
  }

  // 3. Validate Typography System
  if (typeof document !== 'undefined') {
    const hindiElements = document.querySelectorAll('.hindi-text');
    const hasHindiTypography = hindiElements.length > 0;
    
    if (!hasHindiTypography) {
      issues.push('Hindi typography classes not found in DOM');
      qualityScore -= 10;
    }
  }

  // 4. Check Language Persistence
  if (typeof localStorage !== 'undefined') {
    const hasLanguageStorage = localStorage.getItem('preet_english_language') !== null;
    if (!hasLanguageStorage) {
      recommendations.push('Initialize language preference for better UX');
    }
  }

  // 5. Validate HTML Lang Attribute
  if (typeof document !== 'undefined') {
    const htmlLang = document.documentElement.lang;
    if (!htmlLang || !['en', 'hi'].includes(htmlLang)) {
      issues.push('HTML lang attribute not properly set');
      qualityScore -= 5;
    }
  }

  // 6. Check Font Loading
  if (typeof document !== 'undefined') {
    const hasDevanagariFont = document.fonts ? 
      Array.from(document.fonts).some(font => 
        font.family.includes('Noto Sans Devanagari') || font.family.includes('Hind')
      ) : true; // Assume true if fonts API not available
    
    if (!hasDevanagariFont) {
      issues.push('Devanagari fonts not loaded');
      qualityScore -= 10;
    }
  }

  // Determine grade
  let grade: string;
  if (qualityScore >= 95) grade = 'A+';
  else if (qualityScore >= 90) grade = 'A';
  else if (qualityScore >= 85) grade = 'B+';
  else if (qualityScore >= 80) grade = 'B';
  else if (qualityScore >= 75) grade = 'C+';
  else if (qualityScore >= 70) grade = 'C';
  else grade = 'F';

  // Generate recommendations
  if (qualityScore < 90) {
    recommendations.push('Implement missing bilingual features');
  }
  if (issues.length > 0) {
    recommendations.push('Fix identified issues for Grade 9 compliance');
  }
  if (bilingualCoverage < 80) {
    recommendations.push('Increase Hindi content coverage');
  }

  return {
    totalActiveContent: DATA_REGISTRY.modules.length,
    isFlowBroken: issues.length > 0,
    bilingualCoverage: `${bilingualCoverage.toFixed(1)}%`,
    qualityScore,
    grade,
    issues,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

// Real-time audit for development
export const runLiveAudit = () => {
  const result = auditAppFlow();
  
  console.group('🎯 PREET ENGLISH - Live App Audit');
  console.log('📊 Quality Score:', `${result.qualityScore}% (Grade ${result.grade})`);
  console.log('🌍 Bilingual Coverage:', result.bilingualCoverage);
  console.log('📁 Active Content Modules:', result.totalActiveContent);
  console.log('🔗 Flow Status:', result.isFlowBroken ? '❌ Broken' : '✅ Healthy');
  
  if (result.issues.length > 0) {
    console.group('⚠️ Issues Found:');
    result.issues.forEach(issue => console.warn('•', issue));
    console.groupEnd();
  }
  
  if (result.recommendations.length > 0) {
    console.group('💡 Recommendations:');
    result.recommendations.forEach(rec => console.info('•', rec));
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return result;
};

// Lesson-specific audit
export const auditLessonFlow = (lessons: any[]) => {
  if (!lessons || lessons.length === 0) {
    return {
      isValid: false,
      issues: ['No lessons provided for audit'],
      totalLessons: 0
    };
  }

  const issues: string[] = [];
  const orphanedLessons = lessons.filter(l => !l.id || !l.title);
  
  if (orphanedLessons.length > 0) {
    issues.push(`Found ${orphanedLessons.length} orphaned lessons without proper ID or title`);
  }

  // Check for Hindi support
  const lessonsWithHindi = lessons.filter(l => l.hindiTitle || l.hindiDescription);
  const hindiCoverage = (lessonsWithHindi.length / lessons.length) * 100;
  
  if (hindiCoverage < 70) {
    issues.push(`Hindi coverage is ${hindiCoverage.toFixed(1)}% (target: 70%+)`);
  }

  // Check for proper ordering
  const orderedLessons = lessons.filter(l => l.order && l.order > 0);
  if (orderedLessons.length !== lessons.length) {
    issues.push('Some lessons missing proper order sequence');
  }

  return {
    isValid: issues.length === 0,
    issues,
    totalLessons: lessons.length,
    hindiCoverage: `${hindiCoverage.toFixed(1)}%`,
    orphanedCount: orphanedLessons.length
  };
};

// Performance audit for bilingual features
export const auditBilingualPerformance = () => {
  const startTime = performance.now();
  
  // Simulate bilingual operations
  const testOperations = [
    () => DATA_REGISTRY.modules.length,
    () => validateDataRegistry(),
    () => document.querySelectorAll('.hindi-text').length,
    () => localStorage.getItem('preet_english_language')
  ];
  
  const results = testOperations.map(op => {
    const opStart = performance.now();
    const result = op();
    const opEnd = performance.now();
    return { result, duration: opEnd - opStart };
  });
  
  const totalTime = performance.now() - startTime;
  
  return {
    totalDuration: totalTime,
    operations: results,
    isPerformant: totalTime < 50, // Should complete in under 50ms
    grade: totalTime < 20 ? 'A+' : totalTime < 50 ? 'A' : 'B'
  };
};

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).auditApp = runLiveAudit;
  (window as any).auditLessons = auditLessonFlow;
  (window as any).auditPerformance = auditBilingualPerformance;
}