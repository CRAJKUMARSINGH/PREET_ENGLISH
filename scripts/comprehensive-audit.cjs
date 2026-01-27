#!/usr/bin/env node

/**
 * Comprehensive Lesson Audit System
 * 
 * Audits all lessons and content for quality metrics (Grade 3-9 scale)
 * Ensures complete Hindi readability and content completeness
 */

const fs = require('fs');
const path = require('path');

class ContentAuditor {
  constructor() {
    this.lessons = [];
    this.vocabulary = [];
    this.stories = [];
    this.auditResults = {
      lessons: [],
      vocabulary: [],
      stories: [],
      overall: {
        totalLessons: 0,
        qualityScore: 0,
        hindiCompleteness: 0,
        contentGaps: [],
        recommendations: []
      }
    };
    this.qualityMetrics = {
      beginner: { target: 8, current: 0 },
      intermediate: { target: 8, current: 0 },
      advanced: { target: 9, current: 0 }
    };
  }

  async initialize() {
    console.log('🔍 Initializing Comprehensive Content Audit...\n');
    
    // Load database content
    await this.loadDatabaseContent();
    
    // Load curriculum files
    await this.loadCurriculumContent();
    
    // Load Hindi content
    await this.loadHindiContent();
  }

  async loadDatabaseContent() {
    try {
      // Load lessons from database or storage
      console.log('📚 Loading lessons from database...');
      
      // For now, simulate loading - in real implementation, would connect to DB
      this.lessons = this.generateSampleLessons();
      console.log(`✅ Loaded ${this.lessons.length} lessons`);
      
    } catch (error) {
      console.error('❌ Error loading database content:', error);
    }
  }

  async loadCurriculumContent() {
    try {
      console.log('📖 Loading curriculum content...');
      
      // Check for curriculum files
      const curriculumPath = path.join(process.cwd(), 'hindiCurriculum.ts');
      if (fs.existsSync(curriculumPath)) {
        console.log('✅ Found Hindi curriculum file');
      } else {
        console.log('⚠️  Hindi curriculum file not found');
      }
      
    } catch (error) {
      console.error('❌ Error loading curriculum:', error);
    }
  }

  async loadHindiContent() {
    try {
      console.log('🇮🇳 Loading Hindi content modules...');
      
      // Check for Hindi learning modules
      const hindiModules = [
        'client/src/components/HindiFirstLearningModule.tsx',
        'client/src/components/HindiGrammarModule.tsx',
        'client/src/components/HindiSpeakingPractice.tsx'
      ];
      
      for (const module of hindiModules) {
        const modulePath = path.join(process.cwd(), module);
        if (fs.existsSync(modulePath)) {
          console.log(`✅ Found ${module}`);
        } else {
          console.log(`⚠️  Missing ${module}`);
        }
      }
      
    } catch (error) {
      console.error('❌ Error loading Hindi content:', error);
    }
  }

  generateSampleLessons() {
    return [
      {
        id: 1,
        title: 'Basic Greetings',
        titleHindi: 'बेसिक ग्रीटिंग्स',
        description: 'Learn basic English greetings',
        descriptionHindi: 'बेसिक अंग्रेजी ग्रीटिंग्स सीखें',
        level: 'beginner',
        content: 'Hello, Hi, Good morning',
        contentHindi: 'नमस्ते, हाय, सुप्रभात',
        order: 1,
        vocabulary: [],
        objectives: [],
        exercises: []
      },
      {
        id: 2,
        title: 'Numbers 1-10',
        titleHindi: 'अंक 1-10',
        description: 'Learn numbers from 1 to 10',
        descriptionHindi: '1 से 10 तक अंक सीखें',
        level: 'beginner',
        content: 'One, Two, Three...',
        contentHindi: 'एक, दो, तीन...',
        order: 2,
        vocabulary: [],
        objectives: [],
        exercises: []
      }
    ];
  }

  async auditLessonContent() {
    console.log('\n🔍 Auditing Lesson Content...\n');
    
    for (const lesson of this.lessons) {
      const audit = {
        id: lesson.id,
        title: lesson.title,
        level: lesson.level,
        scores: {
          hindiCompleteness: 0,
          contentQuality: 0,
          vocabularyAdequacy: 0,
          learningObjectives: 0,
          exercisesQuality: 0,
          culturalContext: 0
        },
        issues: [],
        recommendations: []
      };

      // Check Hindi completeness
      audit.scores.hindiCompleteness = this.checkHindiCompleteness(lesson);
      
      // Check content quality
      audit.scores.contentQuality = this.checkContentQuality(lesson);
      
      // Check vocabulary adequacy
      audit.scores.vocabularyAdequacy = this.checkVocabularyAdequacy(lesson);
      
      // Check learning objectives
      audit.scores.learningObjectives = this.checkLearningObjectives(lesson);
      
      // Check exercises quality
      audit.scores.exercisesQuality = this.checkExercisesQuality(lesson);
      
      // Check cultural context
      audit.scores.culturalContext = this.checkCulturalContext(lesson);

      // Calculate overall score
      const totalScore = Object.values(audit.scores).reduce((a, b) => a + b, 0);
      audit.overallScore = Math.round(totalScore / Object.keys(audit.scores).length);

      // Generate issues and recommendations
      this.generateIssuesAndRecommendations(audit, lesson);

      this.auditResults.lessons.push(audit);
    }
  }

  checkHindiCompleteness(lesson) {
    let score = 0;
    const checks = [
      { field: 'titleHindi', weight: 20 },
      { field: 'descriptionHindi', weight: 20 },
      { field: 'contentHindi', weight: 30 },
      { field: 'instructionsHindi', weight: 15 },
      { field: 'examplesHindi', weight: 15 }
    ];

    for (const check of checks) {
      if (lesson[check.field] && lesson[check.field].length > 0) {
        score += check.weight;
      }
    }

    return score;
  }

  checkContentQuality(lesson) {
    let score = 0;
    
    // Check content length (should be substantial)
    if (lesson.content && lesson.content.length > 50) score += 25;
    if (lesson.contentHindi && lesson.contentHindi.length > 50) score += 25;
    
    // Check for structured content
    if (lesson.content && lesson.content.includes('\n')) score += 15;
    if (lesson.contentHindi && lesson.contentHindi.includes('\n')) score += 15;
    
    // Check for examples
    if (lesson.content && lesson.content.includes('example')) score += 10;
    if (lesson.contentHindi && lesson.contentHindi.includes('उदाहरण')) score += 10;

    return Math.min(score, 100);
  }

  checkVocabularyAdequacy(lesson) {
    let score = 0;
    
    // Check vocabulary count (target: 5-10 per lesson)
    const vocabCount = lesson.vocabulary ? lesson.vocabulary.length : 0;
    if (vocabCount >= 5) score += 50;
    if (vocabCount >= 8) score += 25;
    if (vocabCount >= 10) score += 25;
    
    // Check vocabulary quality
    if (lesson.vocabulary && lesson.vocabulary.length > 0) {
      const hasHindi = lesson.vocabulary.some(v => v.hindi);
      const hasExamples = lesson.vocabulary.some(v => v.example);
      
      if (hasHindi) score += 12.5;
      if (hasExamples) score += 12.5;
    }

    return Math.min(score, 100);
  }

  checkLearningObjectives(lesson) {
    let score = 0;
    
    if (lesson.objectives && lesson.objectives.length > 0) {
      score += 40; // Has objectives
      
      // Check objective quality
      const hasMeasurable = lesson.objectives.some(obj => 
        obj.includes('learn') || obj.includes('understand') || obj.includes('practice')
      );
      if (hasMeasurable) score += 30;
      
      // Check Hindi objectives
      const hasHindi = lesson.objectives.some(obj => 
        /[ऀ-ॿ]/.test(obj) // Hindi characters
      );
      if (hasHindi) score += 30;
    }
    
    return score;
  }

  checkExercisesQuality(lesson) {
    let score = 0;
    
    if (lesson.exercises && lesson.exercises.length > 0) {
      score += 40; // Has exercises
      
      // Check exercise variety
      const exerciseTypes = new Set(lesson.exercises.map(e => e.type));
      if (exerciseTypes.size >= 2) score += 20;
      if (exerciseTypes.size >= 3) score += 10;
      
      // Check Hindi instructions
      const hasHindiInstructions = lesson.exercises.some(e => e.instructionsHindi);
      if (hasHindiInstructions) score += 30;
    }
    
    return score;
  }

  checkCulturalContext(lesson) {
    let score = 0;
    
    // Check for cultural notes
    if (lesson.culturalNotes) score += 30;
    if (lesson.culturalNotesHindi) score += 30;
    
    // Check for context relevant to Hindi speakers
    if (lesson.content && (
      lesson.content.includes('India') || 
      lesson.content.includes('Hindi') ||
      lesson.content.includes('context')
    )) score += 20;
    
    if (lesson.contentHindi && (
      lesson.contentHindi.includes('भारत') || 
      lesson.contentHindi.includes('संदर्भ')
    )) score += 20;
    
    return score;
  }

  generateIssuesAndRecommendations(audit, lesson) {
    // Hindi completeness issues
    if (audit.scores.hindiCompleteness < 80) {
      audit.issues.push('Incomplete Hindi translations');
      audit.recommendations.push('Add complete Hindi translations for all content');
    }

    // Content quality issues
    if (audit.scores.contentQuality < 70) {
      audit.issues.push('Content needs enrichment');
      audit.recommendations.push('Add more detailed content with examples');
    }

    // Vocabulary issues
    if (audit.scores.vocabularyAdequacy < 70) {
      audit.issues.push('Insufficient vocabulary');
      audit.recommendations.push('Add 5-10 vocabulary items with Hindi translations');
    }

    // Learning objectives issues
    if (audit.scores.learningObjectives < 70) {
      audit.issues.push('Missing learning objectives');
      audit.recommendations.push('Add clear learning objectives in both languages');
    }

    // Exercises issues
    if (audit.scores.exercisesQuality < 70) {
      audit.issues.push('Insufficient practice exercises');
      audit.recommendations.push('Add varied exercises with Hindi instructions');
    }

    // Cultural context issues
    if (audit.scores.culturalContext < 60) {
      audit.issues.push('Missing cultural context');
      audit.recommendations.push('Add cultural notes relevant to Hindi speakers');
    }
  }

  async generateAuditReport() {
    console.log('\n📊 Generating Audit Report...\n');
    
    // Calculate overall metrics
    const totalLessons = this.auditResults.lessons.length;
    const avgQualityScore = this.auditResults.lessons.reduce((sum, lesson) => sum + lesson.overallScore, 0) / totalLessons;
    const avgHindiCompleteness = this.auditResults.lessons.reduce((sum, lesson) => sum + lesson.scores.hindiCompleteness, 0) / totalLessons;
    
    this.auditResults.overall = {
      totalLessons,
      qualityScore: Math.round(avgQualityScore),
      hindiCompleteness: Math.round(avgHindiCompleteness),
      contentGaps: this.identifyContentGaps(),
      recommendations: this.generateGlobalRecommendations()
    };

    // Display summary
    this.displayAuditSummary();
    
    // Generate detailed report
    await this.saveDetailedReport();
  }

  identifyContentGaps() {
    const gaps = [];
    
    // Check for missing levels
    const levels = new Set(this.lessons.map(l => l.level));
    if (!levels.has('beginner')) gaps.push('Missing beginner level content');
    if (!levels.has('intermediate')) gaps.push('Missing intermediate level content');
    if (!levels.has('advanced')) gaps.push('Missing advanced level content');
    
    // Check for lesson count per level
    const levelCounts = {};
    this.lessons.forEach(lesson => {
      levelCounts[lesson.level] = (levelCounts[lesson.level] || 0) + 1;
    });
    
    if (levelCounts.beginner < 10) gaps.push('Need more beginner lessons (target: 10+)');
    if (levelCounts.intermediate < 15) gaps.push('Need more intermediate lessons (target: 15+)');
    if (levelCounts.advanced < 10) gaps.push('Need more advanced lessons (target: 10+)');
    
    return gaps;
  }

  generateGlobalRecommendations() {
    const recommendations = [];
    
    const avgHindi = this.auditResults.overall.hindiCompleteness;
    const avgQuality = this.auditResults.overall.qualityScore;
    
    if (avgHindi < 80) {
      recommendations.push('Priority: Complete Hindi translations across all lessons');
    }
    
    if (avgQuality < 75) {
      recommendations.push('Priority: Enhance content quality with examples and context');
    }
    
    recommendations.push('Add structured learning objectives to all lessons');
    recommendations.push('Implement vocabulary enrichment (5-10 items per lesson)');
    recommendations.push('Create varied practice exercises for each lesson');
    recommendations.push('Add cultural context and notes for Hindi speakers');
    
    return recommendations;
  }

  displayAuditSummary() {
    console.log('🎯 AUDIT SUMMARY');
    console.log('================');
    console.log(`Total Lessons: ${this.auditResults.overall.totalLessons}`);
    console.log(`Average Quality Score: ${this.auditResults.overall.qualityScore}/100`);
    console.log(`Hindi Completeness: ${this.auditResults.overall.hindiCompleteness}%`);
    
    console.log('\n📈 QUALITY BY LEVEL:');
    Object.entries(this.qualityMetrics).forEach(([level, metrics]) => {
      console.log(`${level}: ${metrics.current}/10 (Target: ${metrics.target}/10)`);
    });
    
    console.log('\n⚠️  CONTENT GAPS:');
    this.auditResults.overall.contentGaps.forEach(gap => {
      console.log(`  - ${gap}`);
    });
    
    console.log('\n💡 RECOMMENDATIONS:');
    this.auditResults.overall.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
    
    // Grade assessment
    const grade = this.calculateGrade();
    console.log(`\n🎓 OVERALL GRADE: ${grade.letter} (${grade.score}/10)`);
    
    if (grade.score >= 8) {
      console.log('✅ Content quality meets launch standards!');
    } else if (grade.score >= 6) {
      console.log('⚠️  Content needs improvements before launch');
    } else {
      console.log('❌ Content requires significant enhancements');
    }
  }

  calculateGrade() {
    const qualityScore = this.auditResults.overall.qualityScore;
    const hindiScore = this.auditResults.overall.hindiCompleteness;
    const overallScore = (qualityScore + hindiScore) / 20; // Convert to 10-point scale
    
    let letter;
    if (overallScore >= 9) letter = 'A+';
    else if (overallScore >= 8.5) letter = 'A';
    else if (overallScore >= 8) letter = 'B+';
    else if (overallScore >= 7.5) letter = 'B';
    else if (overallScore >= 7) letter = 'C+';
    else if (overallScore >= 6.5) letter = 'C';
    else if (overallScore >= 6) letter = 'D';
    else letter = 'F';
    
    return { letter, score: overallScore };
  }

  async saveDetailedReport() {
    const reportPath = path.join(process.cwd(), 'audit-report.json');
    const report = {
      timestamp: new Date().toISOString(),
      results: this.auditResults,
      qualityMetrics: this.qualityMetrics
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Detailed report saved to: ${reportPath}`);
  }

  async run() {
    await this.initialize();
    await this.auditLessonContent();
    await this.generateAuditReport();
  }
}

// Run the audit
if (require.main === module) {
  const auditor = new ContentAuditor();
  auditor.run().catch(console.error);
}

module.exports = ContentAuditor;
