#!/usr/bin/env tsx
/**
 * DIRECT QUALITY VALIDATION
 * Runs quality checks directly without spawning processes
 */

import { db } from '../server/db';
import { lessons, vocabulary, stories, scenarios, speakingTopics } from '../shared/schema';
import { eq, count } from 'drizzle-orm';
import * as fs from 'fs';

interface QualityCheck {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  score: number;
}

class DirectQualityValidator {
  private checks: QualityCheck[] = [];

  async runAllChecks(): Promise<void> {
    console.log('🚀 Running Direct Quality Validation...\n');
    console.log('='.repeat(80));

    await this.checkLessonQuality();
    await this.checkVocabularyQuality();
    await this.checkStoryQuality();
    await this.checkScenarioQuality();
    await this.checkSpeakingTopics();
    await this.checkDataIntegrity();
    await this.checkHindiReadability();

    await this.generateReport();
  }

  private async checkLessonQuality(): Promise<void> {
    console.log('\n📚 Checking Lesson Quality...');
    
    try {
      const allLessons = await db.select().from(lessons);
      const lessonsWithHindi = allLessons.filter(l => l.hindiTitle && l.hindiDescription);
      const hindiRate = (lessonsWithHindi.length / allLessons.length) * 100;

      this.checks.push({
        name: 'Lessons with Hindi translations',
        status: hindiRate >= 95 ? 'PASS' : hindiRate >= 80 ? 'WARNING' : 'FAIL',
        message: `${lessonsWithHindi.length}/${allLessons.length} lessons (${hindiRate.toFixed(1)}%)`,
        score: hindiRate / 10
      });

      console.log(`  ✓ Found ${allLessons.length} lessons`);
      console.log(`  ✓ ${lessonsWithHindi.length} have Hindi translations (${hindiRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Lesson Quality Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkVocabularyQuality(): Promise<void> {
    console.log('\n📖 Checking Vocabulary Quality...');
    
    try {
      const allVocab = await db.select().from(vocabulary);
      const vocabWithHindi = allVocab.filter(v => 
        v.hindiTranslation && v.exampleHindi && v.usageHindi
      );
      const hindiRate = (vocabWithHindi.length / allVocab.length) * 100;

      this.checks.push({
        name: 'Vocabulary with complete Hindi',
        status: hindiRate >= 95 ? 'PASS' : hindiRate >= 80 ? 'WARNING' : 'FAIL',
        message: `${vocabWithHindi.length}/${allVocab.length} words (${hindiRate.toFixed(1)}%)`,
        score: hindiRate / 10
      });

      // Check vocabulary per lesson
      const allLessons = await db.select().from(lessons);
      let adequateVocabCount = 0;

      for (const lesson of allLessons) {
        const vocabCount = await db
          .select({ count: count() })
          .from(vocabulary)
          .where(eq(vocabulary.lessonId, lesson.id));

        if (vocabCount[0].count >= 5) {
          adequateVocabCount++;
        }
      }

      const vocabRate = (adequateVocabCount / allLessons.length) * 100;

      this.checks.push({
        name: 'Lessons with adequate vocabulary (5+ words)',
        status: vocabRate >= 90 ? 'PASS' : vocabRate >= 70 ? 'WARNING' : 'FAIL',
        message: `${adequateVocabCount}/${allLessons.length} lessons (${vocabRate.toFixed(1)}%)`,
        score: vocabRate / 10
      });

      console.log(`  ✓ Found ${allVocab.length} vocabulary words`);
      console.log(`  ✓ ${vocabWithHindi.length} have complete Hindi (${hindiRate.toFixed(1)}%)`);
      console.log(`  ✓ ${adequateVocabCount} lessons have 5+ words (${vocabRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Vocabulary Quality Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkStoryQuality(): Promise<void> {
    console.log('\n📖 Checking Story Quality...');
    
    try {
      const allStories = await db.select().from(stories);
      const storiesWithHindi = allStories.filter(s => 
        s.titleHindi && s.descriptionHindi && s.contentHindi
      );
      const hindiRate = (storiesWithHindi.length / allStories.length) * 100;

      this.checks.push({
        name: 'Stories with complete Hindi',
        status: hindiRate >= 95 ? 'PASS' : hindiRate >= 80 ? 'WARNING' : 'FAIL',
        message: `${storiesWithHindi.length}/${allStories.length} stories (${hindiRate.toFixed(1)}%)`,
        score: hindiRate / 10
      });

      console.log(`  ✓ Found ${allStories.length} stories`);
      console.log(`  ✓ ${storiesWithHindi.length} have complete Hindi (${hindiRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Story Quality Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkScenarioQuality(): Promise<void> {
    console.log('\n🎭 Checking Scenario Quality...');
    
    try {
      const allScenarios = await db.select().from(scenarios);
      const scenariosWithHindi = allScenarios.filter(s => 
        s.titleHindi && s.descriptionHindi && s.yourRoleHindi && s.partnerRoleHindi
      );
      const hindiRate = (scenariosWithHindi.length / allScenarios.length) * 100;

      this.checks.push({
        name: 'Scenarios with complete Hindi',
        status: hindiRate >= 95 ? 'PASS' : hindiRate >= 80 ? 'WARNING' : 'FAIL',
        message: `${scenariosWithHindi.length}/${allScenarios.length} scenarios (${hindiRate.toFixed(1)}%)`,
        score: hindiRate / 10
      });

      console.log(`  ✓ Found ${allScenarios.length} scenarios`);
      console.log(`  ✓ ${scenariosWithHindi.length} have complete Hindi (${hindiRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Scenario Quality Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkSpeakingTopics(): Promise<void> {
    console.log('\n🗣️  Checking Speaking Topics...');
    
    try {
      const allTopics = await db.select().from(speakingTopics);
      const topicsWithHindi = allTopics.filter(t => t.hindiTitle);
      const hindiRate = allTopics.length > 0 ? (topicsWithHindi.length / allTopics.length) * 100 : 0;

      this.checks.push({
        name: 'Speaking topics with Hindi',
        status: hindiRate >= 90 ? 'PASS' : hindiRate >= 70 ? 'WARNING' : 'FAIL',
        message: `${topicsWithHindi.length}/${allTopics.length} topics (${hindiRate.toFixed(1)}%)`,
        score: hindiRate / 10
      });

      console.log(`  ✓ Found ${allTopics.length} speaking topics`);
      console.log(`  ✓ ${topicsWithHindi.length} have Hindi titles (${hindiRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Speaking Topics Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkDataIntegrity(): Promise<void> {
    console.log('\n🔒 Checking Data Integrity...');
    
    try {
      // Check for orphaned vocabulary
      const allVocab = await db.select().from(vocabulary);
      const allLessons = await db.select().from(lessons);
      const lessonIds = new Set(allLessons.map(l => l.id));
      
      const orphanedVocab = allVocab.filter(v => !lessonIds.has(v.lessonId));

      this.checks.push({
        name: 'No orphaned vocabulary',
        status: orphanedVocab.length === 0 ? 'PASS' : 'WARNING',
        message: `${orphanedVocab.length} orphaned vocabulary words found`,
        score: orphanedVocab.length === 0 ? 10 : 7
      });

      // Check for duplicate lesson titles
      const titles = allLessons.map(l => l.title);
      const uniqueTitles = new Set(titles);
      const duplicates = titles.length - uniqueTitles.size;

      this.checks.push({
        name: 'No duplicate lesson titles',
        status: duplicates === 0 ? 'PASS' : 'WARNING',
        message: `${duplicates} duplicate titles found`,
        score: duplicates === 0 ? 10 : 7
      });

      console.log(`  ✓ Orphaned vocabulary: ${orphanedVocab.length}`);
      console.log(`  ✓ Duplicate titles: ${duplicates}`);

    } catch (error) {
      this.checks.push({
        name: 'Data Integrity Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async checkHindiReadability(): Promise<void> {
    console.log('\n🇮🇳 Checking Hindi Readability...');
    
    try {
      const allLessons = await db.select().from(lessons);
      const devanagariRegex = /[\u0900-\u097F]/;
      
      let hindiScriptCount = 0;
      for (const lesson of allLessons) {
        if (lesson.hindiTitle && devanagariRegex.test(lesson.hindiTitle)) {
          hindiScriptCount++;
        }
      }

      const scriptRate = (hindiScriptCount / allLessons.length) * 100;

      this.checks.push({
        name: 'Hindi uses Devanagari script',
        status: scriptRate >= 90 ? 'PASS' : scriptRate >= 70 ? 'WARNING' : 'FAIL',
        message: `${hindiScriptCount}/${allLessons.length} lessons (${scriptRate.toFixed(1)}%)`,
        score: scriptRate / 10
      });

      console.log(`  ✓ Lessons with Devanagari script: ${hindiScriptCount}/${allLessons.length} (${scriptRate.toFixed(1)}%)`);

    } catch (error) {
      this.checks.push({
        name: 'Hindi Readability Check',
        status: 'FAIL',
        message: `Error: ${error}`,
        score: 0
      });
    }
  }

  private async generateReport(): Promise<void> {
    console.log('\n' + '='.repeat(80));
    console.log('📊 QUALITY VALIDATION REPORT');
    console.log('='.repeat(80));

    const passCount = this.checks.filter(c => c.status === 'PASS').length;
    const warnCount = this.checks.filter(c => c.status === 'WARNING').length;
    const failCount = this.checks.filter(c => c.status === 'FAIL').length;
    const avgScore = this.checks.reduce((sum, c) => sum + c.score, 0) / this.checks.length;

    console.log(`\n🎯 SUMMARY:`);
    console.log(`   Total Checks: ${this.checks.length}`);
    console.log(`   Passed: ${passCount} ✅`);
    console.log(`   Warnings: ${warnCount} ⚠️`);
    console.log(`   Failed: ${failCount} ❌`);
    console.log(`   Average Score: ${avgScore.toFixed(2)}/10`);

    console.log(`\n📋 DETAILED RESULTS:`);
    console.log('-'.repeat(80));

    for (const check of this.checks) {
      const icon = check.status === 'PASS' ? '✅' : check.status === 'WARNING' ? '⚠️ ' : '❌';
      console.log(`${icon} ${check.name.padEnd(45)} ${check.score.toFixed(1)}/10`);
      console.log(`   ${check.message}`);
    }

    const grade = this.calculateGrade(avgScore);
    console.log(`\n🏆 OVERALL GRADE: ${grade.letter} (${avgScore.toFixed(2)}/10)`);
    console.log(`   ${grade.message}`);

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalChecks: this.checks.length,
        passed: passCount,
        warnings: warnCount,
        failed: failCount,
        averageScore: avgScore,
        grade: grade.letter
      },
      checks: this.checks,
      recommendations: this.generateRecommendations()
    };

    fs.writeFileSync('QUALITY_VALIDATION_REPORT.json', JSON.stringify(report, null, 2));
    console.log(`\n📄 Full report saved to: QUALITY_VALIDATION_REPORT.json`);

    console.log('\n' + '='.repeat(80));
    console.log(`✨ Quality Validation Complete! Grade: ${grade.letter}`);
    console.log('='.repeat(80) + '\n');
  }

  private calculateGrade(score: number): { letter: string; message: string } {
    if (score >= 9.5) {
      return { letter: 'A+', message: 'Excellent! Production ready.' };
    } else if (score >= 9.0) {
      return { letter: 'A', message: 'Very good! Minor improvements possible.' };
    } else if (score >= 8.5) {
      return { letter: 'A-', message: 'Good! Some improvements recommended.' };
    } else if (score >= 8.0) {
      return { letter: 'B+', message: 'Acceptable. Several improvements needed.' };
    } else if (score >= 7.0) {
      return { letter: 'B', message: 'Fair. Significant improvements needed.' };
    } else if (score >= 6.0) {
      return { letter: 'C', message: 'Below standard. Major improvements required.' };
    } else {
      return { letter: 'F', message: 'Failing. Critical issues must be fixed.' };
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const failedChecks = this.checks.filter(c => c.status === 'FAIL' || c.status === 'WARNING');

    if (failedChecks.length === 0) {
      recommendations.push('✅ All quality checks passing! Maintain this standard.');
      return recommendations;
    }

    for (const check of failedChecks) {
      if (check.name.includes('Hindi')) {
        recommendations.push(`🇮🇳 ${check.name}: ${check.message} - Add missing Hindi translations`);
      } else if (check.name.includes('vocabulary')) {
        recommendations.push(`📖 ${check.name}: ${check.message} - Enrich lessons with more vocabulary`);
      } else if (check.name.includes('orphaned')) {
        recommendations.push(`🔒 ${check.name}: ${check.message} - Clean up orphaned records`);
      } else if (check.name.includes('duplicate')) {
        recommendations.push(`🔍 ${check.name}: ${check.message} - Remove duplicate entries`);
      }
    }

    return recommendations;
  }
}

async function main() {
  const validator = new DirectQualityValidator();
  await validator.runAllChecks();
  process.exit(0);
}

main().catch(console.error);
