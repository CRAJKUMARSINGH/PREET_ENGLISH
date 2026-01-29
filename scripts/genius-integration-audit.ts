#!/usr/bin/env tsx

/**
 * GENIUS-LEVEL INTEGRATION AUDIT
 * 
 * This script performs a comprehensive "Ghost Hunter" audit to ensure:
 * 1. Every data file is properly registered and accessible
 * 2. No orphaned content exists in the system
 * 3. All lesson flows are properly connected
 * 4. Grade 9 quality standards are met
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { db } from '../server/db';
import { lessons, vocabulary, stories, scenarios, speakingTopics, quizzes } from '../shared/schema';
import { eq, count } from 'drizzle-orm';

interface AuditResult {
  category: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

interface ContentManifest {
  totalFiles: number;
  registeredFiles: number;
  orphanedFiles: string[];
  missingFiles: string[];
  qualityScore: number;
  hindiCoverage: number;
}

class GeniusIntegrationAuditor {
  private results: AuditResult[] = [];
  private manifest: ContentManifest = {
    totalFiles: 0,
    registeredFiles: 0,
    orphanedFiles: [],
    missingFiles: [],
    qualityScore: 0,
    hindiCoverage: 0
  };

  async runFullAudit(): Promise<void> {
    console.log('🔍 Starting GENIUS-LEVEL Integration Audit...\n');

    await this.auditDataFiles();
    await this.auditDatabaseContent();
    await this.auditLessonFlow();
    await this.auditHindiCoverage();
    await this.auditQualityStandards();

    this.generateReport();
  }

  private async auditDataFiles(): Promise<void> {
    console.log('📁 Phase 1: Data File Integration Audit');

    try {
      // Scan client/src/data directory
      const dataDir = join(process.cwd(), 'client/src/data');
      const files = await this.scanDirectory(dataDir);
      
      // Check index.ts registry
      const indexPath = join(dataDir, 'index.ts');
      const indexContent = await readFile(indexPath, 'utf-8');
      
      const registeredFiles = this.extractExports(indexContent);
      const orphanedFiles = files.filter(file => 
        !registeredFiles.includes(this.getModuleName(file))
      );

      this.manifest.totalFiles = files.length;
      this.manifest.registeredFiles = registeredFiles.length;
      this.manifest.orphanedFiles = orphanedFiles;

      if (orphanedFiles.length === 0) {
        this.results.push({
          category: 'Data Integration',
          status: 'PASS',
          message: `All ${files.length} data files are properly registered`,
          details: { files, registeredFiles }
        });
      } else {
        this.results.push({
          category: 'Data Integration',
          status: 'FAIL',
          message: `Found ${orphanedFiles.length} orphaned data files`,
          details: { orphanedFiles }
        });
      }

    } catch (error) {
      this.results.push({
        category: 'Data Integration',
        status: 'FAIL',
        message: `Error scanning data files: ${error.message}`
      });
    }
  }

  private async auditDatabaseContent(): Promise<void> {
    console.log('🗄️  Phase 2: Database Content Audit');

    try {
      // Count all content types
      const [lessonCount] = await db.select({ count: count() }).from(lessons);
      const [vocabCount] = await db.select({ count: count() }).from(vocabulary);
      const [storyCount] = await db.select({ count: count() }).from(stories);
      const [scenarioCount] = await db.select({ count: count() }).from(scenarios);
      const [speakingCount] = await db.select({ count: count() }).from(speakingTopics);
      const [quizCount] = await db.select({ count: count() }).from(quizzes);

      const totalContent = lessonCount.count + vocabCount.count + storyCount.count + 
                          scenarioCount.count + speakingCount.count + quizCount.count;

      if (totalContent >= 100) { // Grade 9 minimum content threshold
        this.results.push({
          category: 'Database Content',
          status: 'PASS',
          message: `Excellent content volume: ${totalContent} total items`,
          details: {
            lessons: lessonCount.count,
            vocabulary: vocabCount.count,
            stories: storyCount.count,
            scenarios: scenarioCount.count,
            speaking: speakingCount.count,
            quizzes: quizCount.count
          }
        });
      } else {
        this.results.push({
          category: 'Database Content',
          status: 'WARNING',
          message: `Content volume below Grade 9 threshold: ${totalContent}/100`,
          details: { totalContent }
        });
      }

    } catch (error) {
      this.results.push({
        category: 'Database Content',
        status: 'FAIL',
        message: `Database audit failed: ${error.message}`
      });
    }
  }

  private async auditLessonFlow(): Promise<void> {
    console.log('🔗 Phase 3: Lesson Flow Connectivity Audit');

    try {
      const allLessons = await db.select().from(lessons).orderBy(lessons.order);
      
      let brokenLinks = 0;
      let duplicateOrders = new Set();
      let orderNumbers = allLessons.map(l => l.order);
      
      // Check for duplicate orders
      orderNumbers.forEach(order => {
        if (orderNumbers.filter(o => o === order).length > 1) {
          duplicateOrders.add(order);
        }
      });

      // Check for gaps in sequence
      const gaps = [];
      for (let i = 1; i < allLessons.length; i++) {
        if (allLessons[i].order - allLessons[i-1].order > 1) {
          gaps.push(`Gap between lesson ${allLessons[i-1].order} and ${allLessons[i].order}`);
        }
      }

      if (duplicateOrders.size === 0 && gaps.length === 0) {
        this.results.push({
          category: 'Lesson Flow',
          status: 'PASS',
          message: `Perfect lesson sequence: ${allLessons.length} lessons properly ordered`,
          details: { totalLessons: allLessons.length }
        });
      } else {
        this.results.push({
          category: 'Lesson Flow',
          status: 'FAIL',
          message: `Flow issues detected: ${duplicateOrders.size} duplicates, ${gaps.length} gaps`,
          details: { duplicateOrders: Array.from(duplicateOrders), gaps }
        });
      }

    } catch (error) {
      this.results.push({
        category: 'Lesson Flow',
        status: 'FAIL',
        message: `Flow audit failed: ${error.message}`
      });
    }
  }

  private async auditHindiCoverage(): Promise<void> {
    console.log('🇮🇳 Phase 4: Hindi Coverage Audit');

    try {
      const allLessons = await db.select().from(lessons);
      const hindiTitleCount = allLessons.filter(l => l.hindiTitle && l.hindiTitle.trim()).length;
      const hindiDescCount = allLessons.filter(l => l.hindiDescription && l.hindiDescription.trim()).length;
      
      const coverage = (hindiTitleCount + hindiDescCount) / (allLessons.length * 2) * 100;
      this.manifest.hindiCoverage = coverage;

      if (coverage >= 90) {
        this.results.push({
          category: 'Hindi Coverage',
          status: 'PASS',
          message: `Excellent Hindi coverage: ${coverage.toFixed(1)}%`,
          details: { 
            totalLessons: allLessons.length,
            hindiTitles: hindiTitleCount,
            hindiDescriptions: hindiDescCount,
            coverage: coverage.toFixed(1)
          }
        });
      } else if (coverage >= 70) {
        this.results.push({
          category: 'Hindi Coverage',
          status: 'WARNING',
          message: `Good Hindi coverage: ${coverage.toFixed(1)}% (Grade 9 target: 90%+)`,
          details: { coverage: coverage.toFixed(1) }
        });
      } else {
        this.results.push({
          category: 'Hindi Coverage',
          status: 'FAIL',
          message: `Insufficient Hindi coverage: ${coverage.toFixed(1)}% (Grade 9 minimum: 70%)`,
          details: { coverage: coverage.toFixed(1) }
        });
      }

    } catch (error) {
      this.results.push({
        category: 'Hindi Coverage',
        status: 'FAIL',
        message: `Hindi audit failed: ${error.message}`
      });
    }
  }

  private async auditQualityStandards(): Promise<void> {
    console.log('⭐ Phase 5: Grade 9 Quality Standards Audit');

    const qualityChecks = [
      { name: 'Data Integration', weight: 25 },
      { name: 'Database Content', weight: 20 },
      { name: 'Lesson Flow', weight: 20 },
      { name: 'Hindi Coverage', weight: 25 },
      { name: 'Typography Support', weight: 10 }
    ];

    let totalScore = 0;
    let maxScore = 0;

    qualityChecks.forEach(check => {
      const result = this.results.find(r => r.category === check.name);
      maxScore += check.weight;
      
      if (result) {
        if (result.status === 'PASS') totalScore += check.weight;
        else if (result.status === 'WARNING') totalScore += check.weight * 0.7;
      }
    });

    const qualityScore = (totalScore / maxScore) * 100;
    this.manifest.qualityScore = qualityScore;

    if (qualityScore >= 90) {
      this.results.push({
        category: 'Quality Standards',
        status: 'PASS',
        message: `GRADE 9 ACHIEVED! Quality Score: ${qualityScore.toFixed(1)}%`,
        details: { score: qualityScore.toFixed(1), grade: 'A+' }
      });
    } else if (qualityScore >= 80) {
      this.results.push({
        category: 'Quality Standards',
        status: 'WARNING',
        message: `Grade 8 Quality: ${qualityScore.toFixed(1)}% (Target: 90%+)`,
        details: { score: qualityScore.toFixed(1), grade: 'B+' }
      });
    } else {
      this.results.push({
        category: 'Quality Standards',
        status: 'FAIL',
        message: `Below Grade 9: ${qualityScore.toFixed(1)}% (Minimum: 80%)`,
        details: { score: qualityScore.toFixed(1), grade: 'C' }
      });
    }
  }

  private async scanDirectory(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await readdir(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isFile() && ['.ts', '.js', '.json'].includes(extname(entry))) {
        files.push(entry);
      }
    }

    return files.filter(f => f !== 'index.ts'); // Exclude the registry file itself
  }

  private extractExports(content: string): string[] {
    const exportRegex = /export\s+\*\s+from\s+['"](\.\/)?([^'"]+)['"]/g;
    const exports: string[] = [];
    let match;

    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[2]);
    }

    return exports;
  }

  private getModuleName(filename: string): string {
    return basename(filename, extname(filename));
  }

  private generateReport(): void {
    console.log('\n' + '='.repeat(80));
    console.log('🎯 GENIUS-LEVEL INTEGRATION AUDIT REPORT');
    console.log('='.repeat(80));

    // Summary
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const warnings = this.results.filter(r => r.status === 'WARNING').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;

    console.log(`\n📊 SUMMARY:`);
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ⚠️  Warnings: ${warnings}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   🎯 Quality Score: ${this.manifest.qualityScore.toFixed(1)}%`);
    console.log(`   🇮🇳 Hindi Coverage: ${this.manifest.hindiCoverage.toFixed(1)}%`);

    // Detailed Results
    console.log(`\n📋 DETAILED RESULTS:`);
    this.results.forEach(result => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`\n${icon} ${result.category}: ${result.message}`);
      
      if (result.details && Object.keys(result.details).length > 0) {
        console.log(`   Details: ${JSON.stringify(result.details, null, 2)}`);
      }
    });

    // Recommendations
    console.log(`\n🚀 GRADE 9 UPGRADE RECOMMENDATIONS:`);
    
    if (this.manifest.orphanedFiles.length > 0) {
      console.log(`   1. Fix orphaned files: ${this.manifest.orphanedFiles.join(', ')}`);
    }
    
    if (this.manifest.hindiCoverage < 90) {
      console.log(`   2. Improve Hindi coverage from ${this.manifest.hindiCoverage.toFixed(1)}% to 90%+`);
    }
    
    if (this.manifest.qualityScore < 90) {
      console.log(`   3. Address quality issues to reach Grade 9 (90%+) from current ${this.manifest.qualityScore.toFixed(1)}%`);
    }

    console.log(`\n   4. Implement Devanagari font support`);
    console.log(`   5. Add bilingual navigation system`);
    console.log(`   6. Create content quality manifest`);

    console.log('\n' + '='.repeat(80));
    console.log('🎓 Audit Complete - Ready for Grade 9 Implementation!');
    console.log('='.repeat(80));
  }
}

// Execute the audit
async function main() {
  const auditor = new GeniusIntegrationAuditor();
  await auditor.runFullAudit();
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { GeniusIntegrationAuditor };