
import Database from 'better-sqlite3';
import path from 'path';
import { QualityRubric, QualityScore, ContentToScore } from "./quality-rubric";
import { VocabularyStoplist } from "./vocabulary-stoplist";

// Interfaces (Shared with existing code)
export interface AuditResult {
    id: string;
    type: 'lesson' | 'vocabulary' | 'conversation';
    status: 'pass' | 'fail' | 'warning';
    issues: string[];
    suggestions: string[];
    score?: number;
    timestamp: Date;
}

export interface AuditSummary {
    total: number;
    passed: number;
    failed: number;
    warnings: number;
    results: AuditResult[];
    qualityScore?: number;
}

export class AuditPhaseRaw {
    private db: any;
    private qualityRubric: QualityRubric;
    private stoplist: VocabularyStoplist;
    private results: AuditResult[];

    constructor() {
        const dbPath = path.join(process.cwd(), 'preet_english.db');
        this.db = new Database(dbPath);
        this.qualityRubric = new QualityRubric();
        this.stoplist = new VocabularyStoplist();
        this.results = [];
    }

    async performAudit(): Promise<AuditSummary> {
        console.log('🔍 Starting audit phase (Raw SQL Mode)...');
        this.results = [];

        await this.auditLessons();
        // Audit vocab/conversations is implicit in auditLessons loop for context, 
        // but we can also audit them individually if needed. 
        // For this run, let's do exactly what the original did: 
        // iterate lessons and check their children, THEN check all vocab/convs globally if we want coverage.
        // The original code did: auditLessons, auditVocabulary, auditConversations.

        await this.auditVocabulary();
        await this.auditConversations();

        const summary = this.generateSummary();
        console.log(`✅ Audit completed: ${summary.passed} passed, ${summary.failed} failed, ${summary.warnings} warnings`);
        return summary;
    }

    async auditLessons(): Promise<void> {
        console.log('📝 Auditing lessons...');

        // Get all lessons
        const lessons = this.db.prepare('SELECT * FROM lessons').all();

        for (const lesson of lessons) {
            // Get associated data
            const vocab = this.db.prepare('SELECT * FROM vocabulary WHERE lesson_id = ?').all(lesson.id);
            const convs = this.db.prepare('SELECT * FROM conversation_lines WHERE lesson_id = ?').all(lesson.id);

            // Map keys from snake_case to camelCase for the Rubric
            const lessonObj = {
                ...lesson,
                hindiTitle: lesson.hindi_title,
                hindiDescription: lesson.hindi_description,
                imageUrl: lesson.image_url,
                emojiTheme: lesson.emoji_theme
            };

            const vocabObjs = vocab.map(v => ({
                ...v,
                hindiTranslation: v.hindi_translation,
                hindiPronunciation: v.hindi_pronunciation,
                lessonId: v.lesson_id
            }));

            const convObjs = convs.map(c => ({
                ...c,
                englishText: c.english_text,
                hindiText: c.hindi_text,
                lessonId: c.lesson_id,
                lineOrder: c.line_order
            }));

            const result = this.auditSingleLesson(lessonObj, vocabObjs, convObjs);
            this.results.push(result);
        }
        console.log(`📝 Completed auditing ${lessons.length} lessons`);
    }

    async auditVocabulary(): Promise<void> {
        console.log('📚 Auditing vocabulary (Global scan)...');
        const vocab = this.db.prepare('SELECT * FROM vocabulary').all();
        for (const v of vocab) {
            const vocabObj = {
                ...v,
                hindiTranslation: v.hindi_translation,
                hindiPronunciation: v.hindi_pronunciation,
                lessonId: v.lesson_id
            };
            this.results.push(this.auditSingleVocabulary(vocabObj));
        }
    }

    async auditConversations(): Promise<void> {
        console.log('💬 Auditing conversation lines (Global scan)...');
        const convs = this.db.prepare('SELECT * FROM conversation_lines').all();
        for (const c of convs) {
            const convObj = {
                ...c,
                englishText: c.english_text,
                hindiText: c.hindi_text,
                lessonId: c.lesson_id,
                lineOrder: c.line_order
            };
            this.results.push(this.auditSingleConversation(convObj));
        }
    }


    // --- Logic copied from original AuditPhase ---

    private auditSingleLesson(lesson: any, vocabulary: any[], conversations: any[]): AuditResult {
        const result: AuditResult = {
            id: `lesson-${lesson.id}`,
            type: 'lesson',
            status: 'pass',
            issues: [],
            suggestions: [],
            timestamp: new Date()
        };

        if (!lesson.title || lesson.title.trim().length === 0) result.issues.push('Missing/empty title'), result.status = 'fail';
        if (!lesson.content || lesson.content.trim().length === 0) result.issues.push('Missing/empty content'), result.status = 'fail';
        if (!lesson.category) result.issues.push('Missing category'), result.status = 'fail';
        if (!lesson.difficulty) result.issues.push('Missing difficulty'), result.status = 'fail';

        if (vocabulary.length === 0) {
            result.issues.push('No vocabulary');
            if (result.status === 'pass') result.status = 'warning';
        }

        if (conversations.length === 0) {
            result.issues.push('No conversation lines');
            if (result.status === 'pass') result.status = 'warning';
        }

        if (!lesson.hindiTitle || lesson.hindiTitle.trim().length === 0) {
            result.issues.push('Missing Hindi title');
            if (result.status === 'pass') result.status = 'warning';
        }

        // Quality Score
        const contentToScore: ContentToScore = {
            title: lesson.title,
            content: lesson.content,
            vocabulary: vocabulary.map(v => ({
                word: v.word,
                hindi: v.hindiTranslation || '',
                pronunciation: v.pronunciation || '',
                definition: v.definition,
                example: v.example
            })),
            conversations: conversations.map(c => ({
                speaker: c.speaker,
                english: c.englishText,
                hindi: c.hindiText
            })),
            category: lesson.category,
            difficulty: lesson.difficulty
        };

        const qualityScore = this.qualityRubric.scoreContent(contentToScore);
        result.score = qualityScore.overall;

        if (qualityScore.overall < 7.0) {
            result.issues.push(`Low quality score: ${qualityScore.overall}/10`);
            result.status = 'fail';
        } else if (qualityScore.overall < 9.0) { // Updated to Grade 9 target
            result.suggestions.push(`Quality score < 9.0 (${qualityScore.overall}/10)`);
            if (result.status === 'pass') result.status = 'warning';
        }

        return result;
    }

    private auditSingleVocabulary(vocab: any): AuditResult {
        const result: AuditResult = {
            id: `vocab-${vocab.id}`,
            type: 'vocabulary',
            status: 'pass',
            issues: [],
            suggestions: [],
            timestamp: new Date()
        };
        if (!vocab.word) result.issues.push('Missing word'), result.status = 'fail';
        if (!vocab.definition) result.issues.push('Missing definition'), result.status = 'fail';
        if (!vocab.hindiTranslation) result.issues.push('Missing Hindi Translation'), result.status = 'warning';
        return result;
    }

    private auditSingleConversation(conv: any): AuditResult {
        const result: AuditResult = {
            id: `conv-${conv.id}`,
            type: 'conversation',
            status: 'pass',
            issues: [],
            suggestions: [],
            timestamp: new Date()
        };
        if (!conv.englishText) result.issues.push('Missing English'), result.status = 'fail';
        if (!conv.hindiText) result.issues.push('Missing Hindi'), result.status = 'warning';
        return result;
    }

    private generateSummary(): AuditSummary {
        const total = this.results.length;
        const passed = this.results.filter(r => r.status === 'pass').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;

        const scoredResults = this.results.filter(r => r.score !== undefined);
        let qualityScore: number | undefined;
        if (scoredResults.length > 0) {
            const totalScore = scoredResults.reduce((sum, r) => sum + (r.score || 0), 0);
            qualityScore = totalScore / scoredResults.length;
        }

        return {
            total, passed, failed, warnings, results: this.results, qualityScore
        };
    }
}

export function createAuditPhaseRaw(): AuditPhaseRaw {
    return new AuditPhaseRaw();
}
