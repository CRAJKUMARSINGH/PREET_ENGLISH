
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'sqlite.db');
const db = new Database(dbPath);

console.log('Connected to database at', dbPath);

try {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Existing tables:', tables.map((t: any) => t.name).join(', '));
} catch (e) {
    console.error('Failed to list tables:', e);
}

function readDataFile(filename) {
    const filePath = path.join(process.cwd(), 'client/src/data', filename);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return null;
    }
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Remove imports
    content = content.replace(/import .*? from .*?;/g, '');

    // 2. Remove interfaces and types
    content = content.replace(/export interface .*? \{[\s\S]*?\}/g, '');
    content = content.replace(/export type .*? = .*?;/g, '');

    // 3. Remove "as const"
    content = content.replace(/ as const/g, '');

    // 4. Extract the array/object
    // Look for "export const name = [" or "export const name: Type[] = ["
    // We want the content inside the brackets/braces.
    // Actually, finding the start of the array is easier.

    // Remove everything before the first `[` or `{` after "export const"
    // But be careful about which variable.

    // Generic regex to match "export const variableName ... = "
    const match = content.match(/export const \w+(?:\s*:\s*[^=]+)?\s*=\s*/);
    if (!match) {
        console.error(`Could not find export in ${filename}`);
        return null;
    }

    let jsonPart = content.substring(match.index + match[0].length);
    // Remove trailing semicolon if present
    jsonPart = jsonPart.trim().replace(/;$/, '');

    // Eval is dangerous but necessary here to parse JS objects with unquoted keys
    try {
        // Use Function to avoid local scope pollution, but we need standalone object
        const data = eval('(' + jsonPart + ')');
        return data;
    } catch (e) {
        console.error(`Error parsing data from ${filename}:`, e);
        return null;
    }
}

function migrateCommonPhrases() {
    console.log('Migrating Common Phrases...');
    const data = readDataFile('hindiCommonPhrasesData.ts');
    if (!data) return;

    // Group by category
    const categories = {};
    for (const phrase of data) {
        if (!categories[phrase.category]) {
            categories[phrase.category] = [];
        }
        categories[phrase.category].push(phrase);
    }

    const insertLesson = db.prepare(`
        INSERT INTO lessons (title, slug, description, content, difficulty, "order", category, hindi_title, hindi_description)
        VALUES (@title, @slug, @description, @content, @difficulty, @order, @category, @hindiTitle, @hindiDescription)
    `);

    const insertVocab = db.prepare(`
        INSERT INTO vocabulary (lesson_id, word, pronunciation, definition, example, hindi_translation, example_hindi, usage_hindi)
        VALUES (@lessonId, @word, @pronunciation, @definition, @example, @hindiTranslation, @exampleHindi, @usageHindi)
    `);

    let order = 1000;
    for (const [category, phrases] of Object.entries(categories)) {
        const slug = 'common-phrases-' + category.toLowerCase().replace(/\s+/g, '-');

        // Check if lesson exists
        let lesson = db.prepare('SELECT id FROM lessons WHERE slug = ?').get(slug);
        let lessonId;

        if (!lesson) {
            const info = insertLesson.run({
                title: `Common Phrases: ${category}`,
                slug: slug,
                description: `Essential Hindi phrases for ${category}`,
                content: 'List of common phrases.',
                difficulty: 'Beginner',
                order: order++,
                category: 'Common Phrases',
                hindiTitle: category, // Approximation
                hindiDescription: 'महत्वपूर्ण वाक्यांश'
            });
            lessonId = info.lastInsertRowid;
        } else {
            lessonId = lesson.id;
        }

        for (const phrase of phrases) {
            // Check if word exists in this lesson
            const exists = db.prepare('SELECT id FROM vocabulary WHERE lesson_id = ? AND word = ?').get(lessonId, phrase.english);
            if (!exists) {
                insertVocab.run({
                    lessonId: lessonId,
                    word: phrase.english,
                    pronunciation: phrase.pronunciation,
                    definition: phrase.usage || phrase.english, // Fallback
                    example: phrase.example || '',
                    hindiTranslation: phrase.hindi,
                    exampleHindi: phrase.exampleHindi || '',
                    usageHindi: phrase.usageHindi || ''
                });
            }
        }
    }
    console.log('Common Phrases migrated.');
}

function migrateRolePlay() {
    console.log('Migrating Role Play Scenarios...');
    const data = readDataFile('hindiRolePlayData.ts');
    if (!data) return;

    const insertScenario = db.prepare(`
        INSERT INTO scenarios (title, title_hindi, description, description_hindi, your_role, your_role_hindi, partner_role, partner_role_hindi, category, difficulty, dialogues, tips, xp_reward)
        VALUES (@title, @titleHindi, @description, @descriptionHindi, @yourRole, @yourRoleHindi, @partnerRole, @partnerRoleHindi, @category, @difficulty, @dialogues, @tips, @xpReward)
    `);

    for (const item of data) {
        const exists = db.prepare('SELECT id FROM scenarios WHERE title = ?').get(item.title);
        if (!exists) {
            insertScenario.run({
                title: item.title,
                titleHindi: item.titleHindi,
                description: item.situation,
                descriptionHindi: item.situationHindi,
                yourRole: item.yourRole,
                yourRoleHindi: item.yourRoleHindi,
                partnerRole: item.partnerRole,
                partnerRoleHindi: item.partnerRoleHindi,
                category: item.category,
                difficulty: item.difficulty,
                dialogues: JSON.stringify(item.exchanges),
                tips: JSON.stringify([]), // No tips in root object, implies extracted from exchanges? No, schema has tips. Data exchanges have hints.
                xpReward: 30
            });
        }
    }
    console.log('Role Play Scenarios migrated.');
}

function migrateDialogues() {
    console.log('Migrating Dialogues as Lessons...');
    const data = readDataFile('hindiDialoguesData.ts');
    if (!data) return;

    const insertLesson = db.prepare(`
        INSERT INTO lessons (title, slug, description, content, difficulty, "order", category, hindi_title, hindi_description)
        VALUES (@title, @slug, @description, @content, @difficulty, @order, @category, @hindiTitle, @hindiDescription)
    `);

    const insertLine = db.prepare(`
        INSERT INTO conversation_lines (lesson_id, speaker, english_text, hindi_text, pronunciation, line_order)
        VALUES (@lessonId, @speaker, @englishText, @hindiText, @pronunciation, @lineOrder)
    `);

    let order = 2000;
    for (const item of data) {
        const slug = 'dialogue-' + item.id + '-' + item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        let lesson = db.prepare('SELECT id FROM lessons WHERE slug = ?').get(slug);
        let lessonId;

        if (!lesson) {
            const info = insertLesson.run({
                title: item.title,
                slug: slug,
                description: item.scenario,
                content: 'Dialogue practice.',
                difficulty: item.difficulty || 'Beginner',
                order: order++,
                category: 'Conversation',
                hindiTitle: item.titleHindi,
                hindiDescription: item.scenarioHindi
            });
            lessonId = info.lastInsertRowid;
        } else {
            lessonId = lesson.id;
        }

        let lineIdx = 0;
        for (const line of item.lines) {
            // Check if line exists (checking roughly)
            const exists = db.prepare('SELECT id FROM conversation_lines WHERE lesson_id = ? AND line_order = ?').get(lessonId, lineIdx);
            if (!exists) {
                insertLine.run({
                    lessonId: lessonId,
                    speaker: line.speaker,
                    englishText: line.english,
                    hindiText: line.hindi,
                    pronunciation: line.pronunciation || '',
                    lineOrder: lineIdx
                });
            }
            lineIdx++;
        }
    }
    console.log('Dialogues migrated.');
}

function migrateStories() {
    console.log('Migrating Stories...');
    const data = readDataFile('hindiStoriesData.ts');
    if (!data) return;

    const insertStory = db.prepare(`
        INSERT INTO stories (title, title_hindi, description, description_hindi, content, difficulty, category, "order", vocabulary, xp_reward)
        VALUES (@title, @titleHindi, @description, @descriptionHindi, @content, @difficulty, @category, @order, @vocabulary, @xpReward)
    `);

    for (const item of data) {
        const exists = db.prepare('SELECT id FROM stories WHERE title = ?').get(item.title);
        if (!exists) {
            insertStory.run({
                title: item.title,
                titleHindi: item.titleHindi || '',
                description: 'Read the story', // Data might not have description
                descriptionHindi: 'कहानी पढ़ें',
                content: JSON.stringify(item.paragraphs),
                difficulty: item.level || 'Beginner',
                category: item.category || 'Story',
                order: item.id || 0,
                vocabulary: JSON.stringify(item.vocabulary || []),
                xpReward: 50
            });
        }
    }
    console.log('Stories migrated.');
}

function migrateListening() {
    console.log('Migrating Listening Lessons...');
    const data = readDataFile('hindiListeningData.ts');
    if (!data) return;

    const insertListening = db.prepare(`
        INSERT INTO listenings (title, title_hindi, description, description_hindi, difficulty, category, audio_text, audio_text_hindi, questions, vocabulary, "order")
        VALUES (@title, @titleHindi, @description, @descriptionHindi, @difficulty, @category, @audioText, @audioTextHindi, @questions, @vocabulary, @order)
    `);

    for (const item of data) {
        const exists = db.prepare('SELECT id FROM listenings WHERE title = ?').get(item.title);
        if (!exists) {
            insertListening.run({
                title: item.title,
                titleHindi: item.titleHindi,
                description: item.description,
                descriptionHindi: item.descriptionHindi,
                difficulty: item.difficulty,
                category: item.category,
                audioText: item.audioText || '',
                audioTextHindi: item.audioTextHindi || '',
                questions: JSON.stringify(item.questions || []),
                vocabulary: JSON.stringify(item.vocabulary || []),
                order: item.id
            });
        }
    }
    console.log('Listening Lessons migrated.');
}

function migrateSpeaking() {
    console.log('Migrating Speaking Topics...');
    const data = readDataFile('speakingTopics.ts');
    if (!data) return;

    const insertSpeaking = db.prepare(`
        INSERT INTO speaking_topics (title, hindi_title, difficulty, emoji, category, hindi_thoughts, sentence_frames, model_answer, free_prompt, confidence_tip, "order")
        VALUES (@title, @hindiTitle, @difficulty, @emoji, @category, @hindiThoughts, @sentenceFrames, @modelAnswer, @freePrompt, @confidenceTip, @order)
    `);

    for (const item of data) {
        const exists = db.prepare('SELECT id FROM speaking_topics WHERE title = ?').get(item.title);
        if (!exists) {
            insertSpeaking.run({
                title: item.title,
                hindiTitle: item.hindiTitle,
                difficulty: item.difficulty,
                emoji: item.emoji || '',
                category: item.category,
                hindiThoughts: JSON.stringify(item.hindiThoughts || []),
                sentenceFrames: JSON.stringify(item.sentenceFrames || []),
                modelAnswer: item.modelAnswer,
                freePrompt: item.freePrompt,
                confidenceTip: item.confidenceTip,
                order: item.id
            });
        }
    }
    console.log('Speaking Topics migrated.');
}

function run() {
    try {
        db.exec('BEGIN TRANSACTION');
        migrateCommonPhrases();
        migrateRolePlay();
        migrateDialogues();
        migrateStories();
        migrateListening();
        migrateSpeaking();
        db.exec('COMMIT');
        console.log('Migration completed successfully.');
    } catch (err: any) {
        console.error('Migration failed:', err);
        if (err.code === 'SQLITE_ERROR') {
            console.error('SQL Error Code:', err.code);
            console.error('SQL Message:', err.message);
            // console.error('SQL Stack:', err.stack); 
        }
        db.exec('ROLLBACK');
    } finally {
        db.close();
    }
}

run();
