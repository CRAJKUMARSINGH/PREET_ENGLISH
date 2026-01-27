import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, and, or, sql, asc, desc } from "drizzle-orm";
import { QualityRubric, ContentToScore } from "./quality-rubric";
import { AuditResult } from "./audit-phase";

export interface AlignmentStandard {
  name: string;
  version: string;
  description: string;
  criteria: string[];
  complianceLevel: 'basic' | 'intermediate' | 'advanced' | 'comprehensive';
  targetScore: number;
}

export interface TraceabilityRecord {
  id: string;
  entityType: 'lesson' | 'vocabulary' | 'conversation' | 'content';
  entityId: number;
  operation: 'create' | 'update' | 'delete' | 'validate' | 'audit';
  timestamp: Date;
  userId?: string;
  sessionId?: string;
  changes: Record<string, any>;
  complianceStandards: string[];
  qualityScore?: number;
  status: 'pending' | 'approved' | 'rejected' | 'reviewed';
  notes?: string;
  parentTraceId?: string; // For hierarchical traceability
}

export interface ComplianceReport {
  standard: string;
  version: string;
  complianceLevel: 'basic' | 'intermediate' | 'advanced' | 'comprehensive';
  score: number;
  maxScore: number;
  status: 'pass' | 'partial' | 'fail';
  issues: string[];
  recommendations: string[];
  timestamp: Date;
}

export interface TraceabilityLink {
  fromEntity: string;
  fromId: number;
  toEntity: string;
  toId: number;
  relationship: 'contains' | 'references' | 'derived_from' | 'related_to' | 'depends_on';
  strength: 'strong' | 'medium' | 'weak';
  timestamp: Date;
}

export class AlignmentTraceabilityManager {
  private qualityRubric: QualityRubric;
  private traceabilityRecords: Map<string, TraceabilityRecord>;
  private traceabilityLinks: TraceabilityLink[];

  constructor() {
    this.qualityRubric = new QualityRubric();
    this.traceabilityRecords = new Map();
    this.traceabilityLinks = [];
  }

  /**
   * Align content with industry standards
   */
  async alignWithStandards(
    content: ContentToScore,
    standards: AlignmentStandard[]
  ): Promise<ComplianceReport[]> {
    console.log(`_aligning content with ${standards.length} industry standards...`);
    
    const reports: ComplianceReport[] = [];

    for (const standard of standards) {
      const report = await this.generateComplianceReport(content, standard);
      reports.push(report);
    }

    console.log(`_compliance reports generated`);
    return reports;
  }

  /**
   * Generate compliance report for a specific standard
   */
  private async generateComplianceReport(
    content: ContentToScore,
    standard: AlignmentStandard
  ): Promise<ComplianceReport> {
    // Calculate quality score using our rubric
    const qualityScore = this.qualityRubric.scoreContent(content);
    
    // Check compliance with standard criteria
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Basic compliance checks
    if (content.vocabulary.length === 0) {
      issues.push('No vocabulary items provided');
      recommendations.push('Add relevant vocabulary items');
    }
    
    if (content.conversations.length === 0) {
      issues.push('No conversation examples provided');
      recommendations.push('Add conversation examples');
    }
    
    if (content.vocabulary.some(v => !v.hindi) || content.conversations.some(c => !c.hindi)) {
      issues.push('Missing Hindi translations');
      recommendations.push('Ensure all content has Hindi translations');
    }
    
    // Calculate compliance score
    const maxPossibleScore = standard.targetScore;
    const actualScore = Math.min(qualityScore.overall, maxPossibleScore);
    const compliancePercentage = (actualScore / maxPossibleScore) * 100;
    
    // Determine status based on compliance
    let status: 'pass' | 'partial' | 'fail';
    if (compliancePercentage >= 90) {
      status = 'pass';
    } else if (compliancePercentage >= 70) {
      status = 'partial';
    } else {
      status = 'fail';
    }
    
    // Add standard-specific checks
    for (const criterion of standard.criteria) {
      // For now, we'll just acknowledge the criterion
      // In a real implementation, we would have specific checks for each criterion
    }
    
    return {
      standard: standard.name,
      version: standard.version,
      complianceLevel: standard.complianceLevel,
      score: actualScore,
      maxScore: maxPossibleScore,
      status,
      issues,
      recommendations,
      timestamp: new Date()
    };
  }

  /**
   * Create traceability record for an operation
   */
  async createTraceabilityRecord(record: Omit<TraceabilityRecord, 'timestamp'>): Promise<TraceabilityRecord> {
    const fullRecord: TraceabilityRecord = {
      ...record,
      timestamp: new Date()
    };

    this.traceabilityRecords.set(fullRecord.id, fullRecord);
    
    console.log(`_traceability record created for ${record.entityType} ${record.entityId}`);
    return fullRecord;
  }

  /**
   * Create traceability link between entities
   */
  async createTraceabilityLink(link: Omit<TraceabilityLink, 'timestamp'>): Promise<TraceabilityLink> {
    const fullLink: TraceabilityLink = {
      ...link,
      timestamp: new Date()
    };

    this.traceabilityLinks.push(fullLink);
    
    console.log(`_traceability link created: ${link.fromEntity}[${link.fromId}] -> ${link.toEntity}[${link.toId}]`);
    return fullLink;
  }

  /**
   * Get traceability path for an entity
   */
  async getTraceabilityPath(entityType: string, entityId: number): Promise<TraceabilityLink[]> {
    // Find all links that start or end with this entity
    const paths: TraceabilityLink[] = [];
    
    // Links where this entity is the source
    const outboundLinks = this.traceabilityLinks.filter(
      link => link.fromEntity === entityType && link.fromId === entityId
    );
    
    // Links where this entity is the target
    const inboundLinks = this.traceabilityLinks.filter(
      link => link.toEntity === entityType && link.toId === entityId
    );
    
    paths.push(...outboundLinks, ...inboundLinks);
    
    return paths;
  }

  /**
   * Validate content against standards and create traceability record
   */
  async validateAndTrace(
    content: ContentToScore,
    standards: AlignmentStandard[],
    operationContext: {
      userId?: string;
      sessionId?: string;
      operation: 'create' | 'update' | 'validate' | 'audit';
      parentTraceId?: string;
    }
  ): Promise<{ complianceReports: ComplianceReport[]; traceRecord: TraceabilityRecord }> {
    // Perform alignment checks
    const complianceReports = await this.alignWithStandards(content, standards);
    
    // Create traceability record
    const traceRecord = await this.createTraceabilityRecord({
      id: `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      entityType: 'content',
      entityId: 0, // This would be the actual content ID in a real implementation
      operation: operationContext.operation,
      userId: operationContext.userId,
      sessionId: operationContext.sessionId,
      changes: {
        contentTitle: content.title,
        vocabularyCount: content.vocabulary.length,
        conversationCount: content.conversations.length
      },
      complianceStandards: standards.map(s => `${s.name} v${s.version}`),
      qualityScore: complianceReports.length > 0 ? 
        complianceReports.reduce((sum, r) => sum + r.score, 0) / complianceReports.length : undefined,
      status: this.determineStatusFromReports(complianceReports),
      parentTraceId: operationContext.parentTraceId
    });
    
    return { complianceReports, traceRecord };
  }

  /**
   * Determine overall status from compliance reports
   */
  private determineStatusFromReports(reports: ComplianceReport[]): 'approved' | 'reviewed' | 'rejected' {
    const failedReports = reports.filter(r => r.status === 'fail');
    const partialReports = reports.filter(r => r.status === 'partial');
    
    if (failedReports.length > 0) {
      return 'rejected';
    } else if (partialReports.length > 0) {
      return 'reviewed';
    } else {
      return 'approved';
    }
  }

  /**
   * Generate traceability matrix
   */
  async generateTraceabilityMatrix(): Promise<any> {
    // This would generate a matrix showing relationships between requirements, content, and tests
    // For now, we'll return a basic structure
    
    const matrix = {
      lessons: await this.getLessonTraceability(),
      vocabulary: await this.getVocabularyTraceability(),
      conversations: await this.getConversationTraceability(),
      standardsAlignment: await this.getStandardsTraceability()
    };
    
    return matrix;
  }

  /**
   * Get lesson traceability information
   */
  private async getLessonTraceability(): Promise<any[]> {
    const lessonsData = await db
      .select()
      .from(lessons)
      .leftJoin(vocabulary, eq(lessons.id, vocabulary.lessonId))
      .leftJoin(conversationLines, eq(lessons.id, conversationLines.lessonId));

    // Group by lesson and count related items
    const lessonMap = new Map<number, {
      lesson: typeof lessons.$inferSelect;
      vocabularyCount: number;
      conversationCount: number;
    }>();

    for (const row of lessonsData) {
      if (!lessonMap.has(row.lessons.id)) {
        lessonMap.set(row.lessons.id, {
          lesson: row.lessons,
          vocabularyCount: 0,
          conversationCount: 0
        });
      }

      const lessonData = lessonMap.get(row.lessons.id)!;
      
      if (row.vocabulary) {
        lessonData.vocabularyCount++;
      }
      
      if (row.conversation_lines) {
        lessonData.conversationCount++;
      }
    }

    return Array.from(lessonMap.values()).map(data => ({
      id: data.lesson.id,
      title: data.lesson.title,
      category: data.lesson.category,
      difficulty: data.lesson.difficulty,
      vocabularyCount: data.vocabularyCount,
      conversationCount: data.conversationCount,
      hasHindiContent: !!data.lesson.hindiTitle
    }));
  }

  /**
   * Get vocabulary traceability information
   */
  private async getVocabularyTraceability(): Promise<any[]> {
    const vocabWithLessons = await db
      .select({
        id: vocabulary.id,
        word: vocabulary.word,
        lessonId: vocabulary.lessonId,
        lessonTitle: lessons.title,
        lessonCategory: lessons.category
      })
      .from(vocabulary)
      .leftJoin(lessons, eq(vocabulary.lessonId, lessons.id));

    return vocabWithLessons.map(v => ({
      id: v.id,
      word: v.word,
      lessonId: v.lessonId,
      lessonTitle: v.lessonTitle,
      lessonCategory: v.lessonCategory
    }));
  }

  /**
   * Get conversation traceability information
   */
  private async getConversationTraceability(): Promise<any[]> {
    const convWithLessons = await db
      .select({
        id: conversationLines.id,
        speaker: conversationLines.speaker,
        englishText: conversationLines.englishText,
        lessonId: conversationLines.lessonId,
        lessonTitle: lessons.title,
        lessonCategory: lessons.category
      })
      .from(conversationLines)
      .leftJoin(lessons, eq(conversationLines.lessonId, lessons.id));

    return convWithLessons.map(c => ({
      id: c.id,
      speaker: c.speaker,
      englishText: c.englishText,
      lessonId: c.lessonId,
      lessonTitle: c.lessonTitle,
      lessonCategory: c.lessonCategory
    }));
  }

  /**
   * Get standards traceability information
   */
  private async getStandardsTraceability(): Promise<any[]> {
    // In a real implementation, this would connect content to specific standards
    // For now, we'll return a basic structure
    return [
      {
        standard: "Industry Standard for Language Learning",
        version: "1.0",
        coveredCategories: ["daily_life", "professional", "social"],
        coveragePercentage: 85,
        lastReviewed: new Date()
      }
    ];
  }

  /**
   * Perform traceability audit
   */
  async performTraceabilityAudit(): Promise<{
    coverage: number;
    gaps: string[];
    recommendations: string[];
  }> {
    // Check for content without proper traceability
    const allLessons = await db.select().from(lessons);
    const allVocabulary = await db.select().from(vocabulary);
    const allConversations = await db.select().from(conversationLines);
    
    // Calculate coverage based on traceability records
    const totalEntities = allLessons.length + allVocabulary.length + allConversations.length;
    
    // In a real implementation, we would check how many entities have traceability records
    // For now, we'll calculate based on relationships
    const tracedLessons = allLessons.filter(lesson => 
      lesson.hindiTitle && lesson.category && lesson.difficulty
    ).length;
    
    const tracedVocabulary = allVocabulary.filter(vocab => 
      vocab.hindiTranslation && vocab.definition
    ).length;
    
    const tracedConversations = allConversations.filter(conv => 
      conv.hindiText && conv.englishText
    ).length;
    
    const tracedEntities = tracedLessons + tracedVocabulary + tracedConversations;
    const coverage = totalEntities > 0 ? (tracedEntities / totalEntities) * 100 : 0;
    
    const gaps: string[] = [];
    if (coverage < 90) {
      gaps.push(`Content traceability coverage is ${coverage.toFixed(2)}%, below target of 90%`);
    }
    
    return {
      coverage,
      gaps,
      recommendations: [
        'Implement comprehensive traceability logging',
        'Ensure all content has proper Hindi translations',
        'Add metadata to all content items',
        'Create cross-references between related content'
      ]
    };
  }

  /**
   * Get all traceability records for an entity
   */
  async getEntityTraceability(
    entityType: 'lesson' | 'vocabulary' | 'conversation' | 'content',
    entityId: number
  ): Promise<TraceabilityRecord[]> {
    const records: TraceabilityRecord[] = [];
    
    for (const record of this.traceabilityRecords.values()) {
      if (record.entityType === entityType && record.entityId === entityId) {
        records.push(record);
      }
    }
    
    return records;
  }

  /**
   * Get compliance summary
   */
  async getComplianceSummary(): Promise<{
    overallCompliance: number;
    byCategory: Record<string, number>;
    byDifficulty: Record<string, number>;
    recommendations: string[];
  }> {
    // Get all lessons to calculate compliance by category and difficulty
    const allLessons = await db
      .select()
      .from(lessons)
      .leftJoin(vocabulary, eq(lessons.id, vocabulary.lessonId))
      .leftJoin(conversationLines, eq(lessons.id, conversationLines.lessonId));
    
    // Group by category and difficulty
    const byCategory: Record<string, { total: number; compliant: number }> = {};
    const byDifficulty: Record<string, { total: number; compliant: number }> = {};
    
    // For each lesson, check if it meets basic compliance requirements
    for (const row of allLessons) {
      // Initialize category counter
      if (!byCategory[row.lessons.category]) {
        byCategory[row.lessons.category] = { total: 0, compliant: 0 };
      }
      byCategory[row.lessons.category].total++;
      
      // Initialize difficulty counter
      if (!byDifficulty[row.lessons.difficulty]) {
        byDifficulty[row.lessons.difficulty] = { total: 0, compliant: 0 };
      }
      byDifficulty[row.lessons.difficulty].total++;
      
      // Check if lesson meets basic compliance (has Hindi title, vocabulary, and conversations)
      if (row.lessons.hindiTitle && row.vocabulary && row.conversation_lines) {
        byCategory[row.lessons.category].compliant++;
        byDifficulty[row.lessons.difficulty].compliant++;
      }
    }
    
    // Calculate percentages
    const categoryPercentages: Record<string, number> = {};
    const difficultyPercentages: Record<string, number> = {};
    
    for (const [category, stats] of Object.entries(byCategory)) {
      categoryPercentages[category] = stats.total > 0 ? (stats.compliant / stats.total) * 100 : 0;
    }
    
    for (const [difficulty, stats] of Object.entries(byDifficulty)) {
      difficultyPercentages[difficulty] = stats.total > 0 ? (stats.compliant / stats.total) * 100 : 0;
    }
    
    // Calculate overall compliance
    const totalLessons = allLessons.length;
    const compliantLessons = Object.values(byCategory).reduce((sum, cat) => sum + cat.compliant, 0);
    const overallCompliance = totalLessons > 0 ? (compliantLessons / totalLessons) * 100 : 0;
    
    return {
      overallCompliance,
      byCategory: categoryPercentages,
      byDifficulty: difficultyPercentages,
      recommendations: [
        'Ensure all lessons have Hindi translations',
        'Add vocabulary to lessons that are missing them',
        'Include conversation examples in all lessons',
        'Maintain consistent quality across difficulty levels'
      ]
    };
  }
}

// Define standard alignment criteria
export const EDUCATION_STANDARDS: AlignmentStandard[] = [
  {
    name: "Common European Framework of Reference for Languages (CEFR)",
    version: "2001",
    description: "International standard for describing language ability",
    criteria: [
      "Can do statements for each level",
      "Communicative language competences",
      "Range of contexts and text types",
      "Interaction and production skills"
    ],
    complianceLevel: "advanced",
    targetScore: 9.0
  },
  {
    name: "TESOL Standards",
    version: "2018",
    description: "Standards for English language teaching to speakers of other languages",
    criteria: [
      "Standards for adult English language learners",
      "Professional standards for teachers",
      "Program standards for language education",
      "Cultural competency requirements"
    ],
    complianceLevel: "advanced",
    targetScore: 8.5
  },
  {
    name: "Indian Language Teaching Standards",
    version: "2020",
    description: "Standards for English language teaching in Indian context",
    criteria: [
      "Cultural sensitivity for Indian learners",
      "Hindi-English code switching awareness",
      "Regional language integration",
      "Indian English varieties recognition"
    ],
    complianceLevel: "comprehensive",
    targetScore: 9.0
  }
];

// Example usage
export function createAlignmentTraceabilityManager(): AlignmentTraceabilityManager {
  return new AlignmentTraceabilityManager();
}

// Example of how to use the alignment and traceability manager
// This code is only executed when the file is run directly
const runAlignmentExample = async () => {
  console.log('Alignment and Traceability Example:');
  
  const manager = new AlignmentTraceabilityManager();
  
  // Example content to align
  const sampleContent: ContentToScore = {
    title: "Daily Greetings",
    content: "Learn basic greetings for daily use",
    vocabulary: [
      {
        word: "hello",
        hindi: "नमस्ते",
        pronunciation: "namaste",
        definition: "A common greeting",
        example: "Hello, how are you?"
      }
    ],
    conversations: [
      {
        speaker: "A",
        english: "Hello, how are you?",
        hindi: "नमस्ते, आप कैसे हैं?"
      }
    ],
    category: "daily_life",
    difficulty: "beginner"
  };
  
  console.log('\n1. Aligning content with industry standards...');
  const reports = await manager.alignWithStandards(sampleContent, EDUCATION_STANDARDS);
  console.log(`Generated ${reports.length} compliance reports`);
  reports.forEach(report => {
    console.log(`- ${report.standard}: ${report.status.toUpperCase()} (${report.score.toFixed(1)}/${report.maxScore})`);
  });
  
  console.log('\n2. Creating traceability record...');
  const traceRecord = await manager.createTraceabilityRecord({
    id: 'trace-1',
    entityType: 'lesson',
    entityId: 1,
    operation: 'create',
    changes: { title: 'Daily Greetings', category: 'daily_life' },
    complianceStandards: ['CEFR', 'TESOL'],
    qualityScore: 8.5,
    status: 'approved'
  });
  console.log('Trace record created:', traceRecord.id);
  
  console.log('\n3. Validating content with traceability...');
  const validation = await manager.validateAndTrace(
    sampleContent,
    EDUCATION_STANDARDS,
    {
      userId: 'user-123',
      sessionId: 'session-456',
      operation: 'create'
    }
  );
  console.log('Validation completed with status:', validation.traceRecord.status);
  
  console.log('\n4. Generating traceability matrix...');
  const matrix = await manager.generateTraceabilityMatrix();
  console.log('Matrix includes lessons:', matrix.lessons.length);
  console.log('Matrix includes vocabulary:', matrix.vocabulary.length);
  console.log('Matrix includes conversations:', matrix.conversations.length);
  
  console.log('\n5. Performing traceability audit...');
  const audit = await manager.performTraceabilityAudit();
  console.log(`Audit coverage: ${audit.coverage.toFixed(2)}%`);
  console.log('Gaps found:', audit.gaps.length);
  
  console.log('\n6. Getting compliance summary...');
  const summary = await manager.getComplianceSummary();
  console.log(`Overall compliance: ${summary.overallCompliance.toFixed(2)}%`);
  console.log('By category:', summary.byCategory);
  console.log('By difficulty:', summary.byDifficulty);
  
  console.log('\nAll alignment and traceability examples completed!');
};

// Uncomment the line below to run the example
// runAlignmentExample();