#!/usr/bin/env node
/**
 * COMPREHENSIVE LESSON QUALITY AUDIT
 * 
 * Audits all lessons for:
 * - Missing Hindi translations
 * - Content quality (grade 1-10 scale)
 * - Vocabulary coverage (5-10 items per lesson)
 * - Missing learning objectives
 * - Missing practice exercises
 * - Missing audio references
 * - UI Hindi readability
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs').promises;

// Quality scoring criteria (similar to Duolingo, Babbel, MySivi)
const QUALITY_METRICS = {
  // Current baseline: Grade 3
  baseline: {
    hindiTitle: false,           // Missing
    hindiDescription: false,      // Missing
    hindiContent: false,          // Missing
    vocabularyCount: 2,           // Too low (need 5-10)
    learningObjectives: false,    // Missing
    practiceExercises: false,     // Missing
    audioReferences: false,       // Missing
    culturalNotes: false,         // Missing
    richMarkdown: false,          // Basic only
    examples: false               // Limited
  },
  
  // Target: Grade 9
  target: {
    hindiTitle: true,             // Required
    hindiDescription: true,        // Required
    hindiContent: true,            // Required
    vocabularyCount: 7,            // 5-10 range
    learningObjectives: true,      // Required
    practiceExercises: true,       // Required
    audioReferences: true,         // Required
    culturalNotes: true,           // Required
    richMarkdown: true,            // Rich formatting
    examples: true,                // Multiple examples
    tips: true,                    // Learning tips
    progressTracking: true         // Progress indicators
  }
};

// Benchmark scores from competitor apps
const BENCHMARK_SCORES = {
  duolingo: 9.2,
  babbel: 8.8,
  mysivi: 8.5,
  current: 3.0,  // Estimated current grade
  target: 9.0
};

class LessonQualityAuditor {
  constructor(dbPath) {
    this.db = new Database(dbPath);
    this.results = {
      totalLessons: 0,
      auditedLessons: [],
      qualityScores: [],
      missingHindi: [],
      insufficientVocabulary: [],
      missingFeatures: [],
      recommendations: [],
      overallGrade: 0
    };
  }

  /**
   * Calculate quality score for a lesson (1-10 scale)
   */
  calculateQualityScore(lesson, vocabulary, conversationLines) {
    let score = 0;
    const maxScore = 10;
    const weights = {
      hindiTitle: 0.5,
      hindiDescription: 0.5,
      hindiContent: 1.0,
      vocabularyCount: 1.5,
      learningObjectives: 1.0,
      practiceExercises: 1.0,
      audioReferences: 0.5,
      culturalNotes: 0.5,
      richMarkdown: 1.0,
      examples: 1.0,
      conversationLines: 0.5,
      vocabularyHindi: 1.0
    };

    // Check Hindi translations (handle both camelCase and snake_case)
    const hindiTitle = lesson.hindiTitle || lesson.hindi_title;
    const hindiDescription = lesson.hindiDescription || lesson.hindi_description;
    
    if (hindiTitle && hindiTitle.trim() !== '') score += weights.hindiTitle;
    if (hindiDescription && hindiDescription.trim() !== '') score += weights.hindiDescription;
    
    // Check if content has Hindi (basic check)
    const hasHindiContent = lesson.content && (
      lesson.content.includes('हिंदी') || 
      lesson.content.match(/[\u0900-\u097F]/) || // Devanagari script
      lesson.content.includes('Hindi:')
    );
    if (hasHindiContent) score += weights.hindiContent;

    // Vocabulary count (target: 5-10, ideal: 7)
    const vocabCount = vocabulary.length;
    if (vocabCount >= 10) score += weights.vocabularyCount;
    else if (vocabCount >= 7) score += weights.vocabularyCount * 0.9;
    else if (vocabCount >= 5) score += weights.vocabularyCount * 0.7;
    else if (vocabCount >= 3) score += weights.vocabularyCount * 0.5;
    else score += weights.vocabularyCount * 0.2;

    // Check vocabulary Hindi translations (handle both camelCase and snake_case)
    const vocabWithHindi = vocabulary.filter(v => 
      (v.hindiTranslation || v.hindi_translation) && 
      (v.hindiTranslation || v.hindi_translation).trim() !== ''
    ).length;
    if (vocabCount > 0) {
      const hindiCoverage = vocabWithHindi / vocabCount;
      score += weights.vocabularyHindi * hindiCoverage;
    }

    // Check for learning objectives in content
    const hasObjectives = lesson.content && (
      lesson.content.includes('## Learning Objectives') ||
      lesson.content.includes('**Objectives**') ||
      lesson.content.includes('**Goals**') ||
      lesson.content.toLowerCase().includes('you will learn')
    );
    if (hasObjectives) score += weights.learningObjectives;

    // Check for practice exercises
    const hasExercises = lesson.content && (
      lesson.content.includes('## Practice') ||
      lesson.content.includes('## Exercise') ||
      lesson.content.includes('**Try it**') ||
      lesson.content.includes('**Practice**')
    );
    if (hasExercises) score += weights.practiceExercises;

    // Check for audio references
    const hasAudio = lesson.content && (
      lesson.content.includes('audio') ||
      lesson.content.includes('pronunciation') ||
      lesson.content.includes('🎵') ||
      lesson.content.includes('🔊')
    );
    if (hasAudio) score += weights.audioReferences;

    // Check for cultural notes
    const hasCultural = lesson.content && (
      lesson.content.includes('## Cultural Note') ||
      lesson.content.includes('**Tip**') ||
      lesson.content.includes('**Cultural**') ||
      lesson.content.includes('💡')
    );
    if (hasCultural) score += weights.culturalNotes;

    // Check for rich markdown (headings, lists, formatting)
    const markdownFeatures = [
      lesson.content.includes('#'),      // Headings
      lesson.content.includes('**'),     // Bold
      lesson.content.includes('*'),      // Italic or lists
      lesson.content.includes('-'),      // Lists
      lesson.content.includes('`'),      // Code blocks
      lesson.content.includes('>')       // Quotes
    ].filter(Boolean).length;
    if (markdownFeatures >= 3) score += weights.richMarkdown;
    else if (markdownFeatures >= 2) score += weights.richMarkdown * 0.7;
    else if (markdownFeatures >= 1) score += weights.richMarkdown * 0.4;

    // Check for examples
    const exampleCount = (lesson.content.match(/example/gi) || []).length;
    if (exampleCount >= 3) score += weights.examples;
    else if (exampleCount >= 2) score += weights.examples * 0.7;
    else if (exampleCount >= 1) score += weights.examples * 0.4;

    // Conversation lines (dialogue practice)
    if (conversationLines && conversationLines.length > 0) {
      score += weights.conversationLines;
    }

    return Math.min(score, maxScore);
  }

  /**
   * Audit all lessons
   */
  async auditAllLessons() {
    console.log('\n🔍 Starting Comprehensive Lesson Quality Audit...\n');

    // Get all lessons
    const lessons = this.db.prepare(`
      SELECT * FROM lessons ORDER BY "order"
    `).all();

    this.results.totalLessons = lessons.length;
    console.log(`📚 Found ${lessons.length} lessons to audit\n`);

    let totalScore = 0;

    for (const lesson of lessons) {
      // Get vocabulary for this lesson
      const vocabulary = this.db.prepare(`
        SELECT * FROM vocabulary WHERE lesson_id = ?
      `).all(lesson.id);

      // Get conversation lines
      const conversationLines = this.db.prepare(`
        SELECT * FROM conversation_lines WHERE lesson_id = ? ORDER BY line_order
      `).all(lesson.id);

      // Calculate quality score
      const qualityScore = this.calculateQualityScore(lesson, vocabulary, conversationLines);
      totalScore += qualityScore;

      // Identify issues
      const issues = [];
      const missing = [];

      // Check both camelCase and snake_case field names
      const hindiTitle = lesson.hindiTitle || lesson.hindi_title;
      const hindiDescription = lesson.hindiDescription || lesson.hindi_description;

      if (!hindiTitle || hindiTitle.trim() === '') {
        issues.push('Missing Hindi title');
        missing.push('hindiTitle');
      }
      if (!hindiDescription || hindiDescription.trim() === '') {
        issues.push('Missing Hindi description');
        missing.push('hindiDescription');
      }
      
      const hasHindiContent = lesson.content && lesson.content.match(/[\u0900-\u097F]/);
      if (!hasHindiContent) {
        issues.push('Missing Hindi content/translations');
        missing.push('hindiContent');
      }

      if (vocabulary.length < 5) {
        issues.push(`Insufficient vocabulary (${vocabulary.length}/5-10)`);
        missing.push('vocabulary');
      }

      if (vocabulary.length > 0) {
        const vocabWithHindi = vocabulary.filter(v => v.hindiTranslation).length;
        if (vocabWithHindi < vocabulary.length) {
          issues.push(`Missing Hindi translations for ${vocabulary.length - vocabWithHindi} vocabulary items`);
          missing.push('vocabularyHindi');
        }
      }

      // Check for learning objectives
      const hasObjectives = lesson.content && (
        lesson.content.includes('Learning Objectives') ||
        lesson.content.includes('**Objectives**')
      );
      if (!hasObjectives) {
        issues.push('Missing learning objectives');
        missing.push('learningObjectives');
      }

      // Check for practice exercises
      const hasExercises = lesson.content && (
        lesson.content.includes('Practice') ||
        lesson.content.includes('Exercise')
      );
      if (!hasExercises) {
        issues.push('Missing practice exercises');
        missing.push('practiceExercises');
      }

      // Check for audio references
      const hasAudio = lesson.content && (
        lesson.content.includes('audio') ||
        lesson.content.includes('pronunciation')
      );
      if (!hasAudio) {
        issues.push('Missing audio/pronunciation references');
        missing.push('audioReferences');
      }

      // Record audit result
      const auditResult = {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        difficulty: lesson.difficulty,
        qualityScore: parseFloat(qualityScore.toFixed(2)),
        vocabularyCount: vocabulary.length,
        conversationLinesCount: conversationLines.length,
        issues: issues,
        missing: missing,
        recommendations: this.generateRecommendations(lesson, vocabulary, issues)
      };

      this.results.auditedLessons.push(auditResult);
      this.results.qualityScores.push(qualityScore);

      if (missing.includes('hindiTitle') || missing.includes('hindiDescription') || missing.includes('hindiContent')) {
        this.results.missingHindi.push({
          lessonId: lesson.id,
          title: lesson.title,
          missing: missing.filter(m => m.includes('hindi'))
        });
      }

      if (vocabulary.length < 5) {
        this.results.insufficientVocabulary.push({
          lessonId: lesson.id,
          title: lesson.title,
          currentCount: vocabulary.length,
          needed: 5 - vocabulary.length
        });
      }

      // Display progress
      const status = qualityScore >= 8 ? '✅' : qualityScore >= 5 ? '⚠️' : '❌';
      console.log(`${status} Lesson ${lesson.id}: ${lesson.title}`);
      console.log(`   Quality Score: ${qualityScore.toFixed(2)}/10`);
      console.log(`   Vocabulary: ${vocabulary.length} items`);
      if (issues.length > 0) {
        console.log(`   Issues: ${issues.length}`);
        issues.slice(0, 3).forEach(issue => console.log(`     - ${issue}`));
      }
      console.log('');
    }

    // Calculate overall grade
    this.results.overallGrade = totalScore / lessons.length;
    
    // Generate summary
    this.generateSummary();

    return this.results;
  }

  /**
   * Generate recommendations for improvement
   */
  generateRecommendations(lesson, vocabulary, issues) {
    const recommendations = [];

    if (!lesson.hindiTitle) {
      recommendations.push('Add Hindi title translation');
    }
    if (!lesson.hindiDescription) {
      recommendations.push('Add Hindi description translation');
    }
    if (vocabulary.length < 5) {
      recommendations.push(`Add ${5 - vocabulary.length} more vocabulary items (target: 5-10)`);
    }
    if (!lesson.content.match(/[\u0900-\u097F]/)) {
      recommendations.push('Add Hindi translations throughout content');
    }
    if (!lesson.content.includes('Learning Objectives')) {
      recommendations.push('Add learning objectives section');
    }
    if (!lesson.content.includes('Practice')) {
      recommendations.push('Add practice exercises section');
    }
    if (!lesson.content.includes('audio') && !lesson.content.includes('pronunciation')) {
      recommendations.push('Add audio pronunciation references');
    }

    return recommendations;
  }

  /**
   * Generate audit summary
   */
  generateSummary() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 AUDIT SUMMARY');
    console.log('='.repeat(80) + '\n');

    console.log(`Total Lessons Audited: ${this.results.totalLessons}`);
    console.log(`Overall Quality Grade: ${this.results.overallGrade.toFixed(2)}/10`);
    console.log(`\nCurrent Grade: ${this.results.overallGrade.toFixed(1)}/10`);
    console.log(`Target Grade: ${BENCHMARK_SCORES.target}/10`);
    console.log(`\nBenchmark Comparison:`);
    console.log(`  Duolingo: ${BENCHMARK_SCORES.duolingo}/10`);
    console.log(`  Babbel: ${BENCHMARK_SCORES.babbel}/10`);
    console.log(`  MySivi: ${BENCHMARK_SCORES.mysivi}/10`);
    console.log(`  Current: ${this.results.overallGrade.toFixed(1)}/10`);
    console.log(`  Target: ${BENCHMARK_SCORES.target}/10`);

    console.log(`\n📋 Issues Found:`);
    console.log(`  Lessons missing Hindi translations: ${this.results.missingHindi.length}`);
    console.log(`  Lessons with insufficient vocabulary: ${this.results.insufficientVocabulary.length}`);

    // Grade distribution
    const excellent = this.results.qualityScores.filter(s => s >= 8).length;
    const good = this.results.qualityScores.filter(s => s >= 6 && s < 8).length;
    const fair = this.results.qualityScores.filter(s => s >= 4 && s < 6).length;
    const poor = this.results.qualityScores.filter(s => s < 4).length;

    console.log(`\n📈 Quality Distribution:`);
    console.log(`  Excellent (8-10): ${excellent} lessons`);
    console.log(`  Good (6-8): ${good} lessons`);
    console.log(`  Fair (4-6): ${fair} lessons`);
    console.log(`  Poor (<4): ${poor} lessons`);

    const gap = BENCHMARK_SCORES.target - this.results.overallGrade;
    console.log(`\n🎯 Improvement Needed: ${gap.toFixed(1)} points to reach target grade 9`);
  }

  /**
   * Save audit report to file
   */
  async saveReport(outputPath) {
    const report = {
      timestamp: new Date().toISOString(),
      auditSummary: {
        totalLessons: this.results.totalLessons,
        overallGrade: parseFloat(this.results.overallGrade.toFixed(2)),
        currentGrade: parseFloat(this.results.overallGrade.toFixed(1)),
        targetGrade: BENCHMARK_SCORES.target,
        benchmark: BENCHMARK_SCORES,
        gap: parseFloat((BENCHMARK_SCORES.target - this.results.overallGrade).toFixed(2))
      },
      issues: {
        missingHindi: this.results.missingHindi.length,
        insufficientVocabulary: this.results.insufficientVocabulary.length,
        lessonsMissingHindi: this.results.missingHindi,
        lessonsInsufficientVocabulary: this.results.insufficientVocabulary
      },
      lessons: this.results.auditedLessons,
      recommendations: this.generateOverallRecommendations()
    };

    await fs.writeFile(outputPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Audit report saved to: ${outputPath}`);
  }

  /**
   * Generate overall recommendations
   */
  generateOverallRecommendations() {
    const recommendations = [];

    if (this.results.missingHindi.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Hindi Translations',
        description: `Add Hindi translations to ${this.results.missingHindi.length} lessons`,
        impact: 'Critical for Hindi readability'
      });
    }

    if (this.results.insufficientVocabulary.length > 0) {
      recommendations.push({
        priority: 'HIGH',
        category: 'Vocabulary',
        description: `Increase vocabulary in ${this.results.insufficientVocabulary.length} lessons to 5-10 items`,
        impact: 'Improves learning depth'
      });
    }

    recommendations.push({
      priority: 'MEDIUM',
      category: 'Content Enrichment',
      description: 'Add learning objectives, practice exercises, and cultural notes to all lessons',
      impact: 'Improves learning experience'
    });

    recommendations.push({
      priority: 'MEDIUM',
      category: 'Audio Integration',
      description: 'Add audio pronunciation references to all lessons',
      impact: 'Enhances pronunciation learning'
    });

    return recommendations;
  }

  close() {
    this.db.close();
  }
}

// Main execution
async function main() {
  const dbPath = path.join(process.cwd(), 'preet_english.db');
  const outputPath = path.join(process.cwd(), 'LESSON_QUALITY_AUDIT.json');

  if (!require('fs').existsSync(dbPath)) {
    console.error(`❌ Database not found at: ${dbPath}`);
    process.exit(1);
  }

  const auditor = new LessonQualityAuditor(dbPath);
  
  try {
    await auditor.auditAllLessons();
    await auditor.saveReport(outputPath);
    
    console.log('\n✅ Audit complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  } finally {
    auditor.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { LessonQualityAuditor, QUALITY_METRICS, BENCHMARK_SCORES };
