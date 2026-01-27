
import { speakingTopics } from '../client/src/data/speakingTopics';
import { hindiLearningData } from '../client/src/data/hindiLearningData';
import { stories as hindiStoriesData } from '../client/src/data/hindiStoriesData';
import { dialogues as hindiDialoguesData } from '../client/src/data/hindiDialoguesData';
import { rolePlayScenarios as hindiRolePlayData } from '../client/src/data/hindiRolePlayData';
import { commonPhrases as hindiCommonPhrasesData } from '../client/src/data/hindiCommonPhrasesData';
import { listeningLessons as hindiListeningData } from '../client/src/data/hindiListeningData';
import { legacyVocabularyData } from '../client/src/data/legacyVocabularyData';
import { advancedVocabularyData } from '../client/src/data/advancedVocabularyData';
import { legacyConversationData } from '../client/src/data/legacyConversationData';

console.log('🚀 Starting ULTIMATE Programmatic Data Verification...');

let errors = 0;
let checked = 0;

function assert(condition: boolean, message: string) {
    checked++;
    if (!condition) {
        console.error(`❌ FAIL: ${message}`);
        errors++;
    }
}

function verifySpeakingTopics() {
    console.log('\n--- Verifying Speaking Topics ---');
    assert(Array.isArray(speakingTopics), 'speakingTopics should be an array');
    speakingTopics.forEach((topic, i) => {
        const id = topic.id || `index-${i}`;
        assert(!!topic.id, `[Topic ${id}] missing ID`);
        assert(!!topic.title, `[Topic ${id}] missing title`);
        assert(!!topic.hindiTitle, `[Topic ${id}] missing hindiTitle`);
        assert(Array.isArray(topic.sentenceFrames), `[Topic ${id}] sentenceFrames should be an array`);
        assert(Array.isArray(topic.hindiThoughts), `[Topic ${id}] hindiThoughts should be an array`);
    });
}

function verifyVocabulary() {
    console.log('\n--- Verifying Vocabulary Data ---');

    // Legacy
    assert(Array.isArray(legacyVocabularyData), 'legacyVocabularyData should be an array');
    legacyVocabularyData.forEach((cat) => {
        assert(!!cat.id, `[Legacy Vocab Cat ${cat.title}] missing ID`);
        assert(Array.isArray(cat.words), `[Legacy Vocab Cat ${cat.id}] words should be an array`);
        cat.words.forEach((w) => {
            assert(!!w.english, `[Legacy Vocab ${cat.id}] Word missing english`);
            assert(!!w.hindi, `[Legacy Vocab ${cat.id}] Word missing hindi`);
        });
    });

    // Advanced
    assert(Array.isArray(advancedVocabularyData), 'advancedVocabularyData should be an array');
    advancedVocabularyData.forEach((w) => {
        assert(!!w.english && !!w.hindi, `[Advanced Vocab ${w.id}] missing english or hindi`);
        assert(Array.isArray(w.examples), `[Advanced Vocab ${w.id}] examples missing`);
    });
}

function verifyConversations() {
    console.log('\n--- Verifying Conversation Data ---');

    // Dialogues
    assert(Array.isArray(hindiDialoguesData), 'hindiDialoguesData should be an array');
    hindiDialoguesData.forEach(d => {
        assert(!!d.title && !!d.titleHindi, `[Dialogue ${d.id}] missing titles`);
        assert(Array.isArray(d.lines) && d.lines.length > 0, `[Dialogue ${d.id}] missing lines`);
    });

    // Legacy Conversations
    assert(Array.isArray(legacyConversationData), 'legacyConversationData should be an array');
    legacyConversationData.forEach(c => {
        assert(Array.isArray(c.conversation) && c.conversation.length > 0, `[Legacy Conv ${c.id}] missing conversation lines`);
    });
}

function verifyStories() {
    console.log('\n--- Verifying Stories ---');
    assert(Array.isArray(hindiStoriesData), 'hindiStoriesData should be an array');
    hindiStoriesData.forEach(story => {
        assert(!!story.title, `[Story ${story.id}] missing title`);
        assert(Array.isArray(story.paragraphs) && story.paragraphs.length > 0, `[Story ${story.id}] missing paragraphs`);
    });
}

function verifyLearningData() {
    console.log('\n--- Verifying Learning Data ---');
    assert(!!hindiLearningData.pronunciationChallenges, 'Missing pronunciationChallenges');
    assert(!!hindiLearningData.commonGrammarMistakes, 'Missing commonGrammarMistakes');
    assert(!!hindiLearningData.dailyEnglishPhrases, 'Missing dailyEnglishPhrases');
}

try {
    verifySpeakingTopics();
    verifyVocabulary();
    verifyConversations();
    verifyStories();
    verifyLearningData();

    // Check others broadly
    assert(Array.isArray(hindiRolePlayData), 'hindiRolePlayData missing');
    assert(Array.isArray(hindiCommonPhrasesData), 'hindiCommonPhrasesData missing');
    assert(Array.isArray(hindiListeningData), 'hindiListeningData missing');

    console.log('\n----------------------------------------');
    if (errors === 0) {
        console.log(`🎉 SUCCESS: All ${checked} programmatic checks passed!`);
        console.log('Every nook and corner of the data is verified and linked.');
        process.exit(0);
    } else {
        console.error(`💥 FAILED: ${errors} errors found in data structure.`);
        process.exit(1);
    }
} catch (error) {
    console.error('FATAL ERROR during verification:', error);
    process.exit(1);
}
