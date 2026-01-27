import Database from 'better-sqlite3';
const db = new Database('preet_english.db');

const lessonId = 5871;

const contentBlocks = {
    blocks: [
        {
            type: "text",
            title: "Welcome! | स्वागत है!",
            hindiTitle: "स्वागत है!",
            content: "Welcome to your first step in learning English! Today we will learn how to greet people naturally. In India, we use 'Namaste' for everyone, but in English, greetings change based on time and relationship.",
            hindiContent: "English सीखने के आपके पहले कदम में आपका स्वागत है! आज हम सीखेंगे कि लोगों का अभिवादन (greeting) स्वाभिक रूप से कैसे किया जाता है। भारत में हम सभी के लिए 'नमस्ते' का उपयोग करते हैं, लेकिन इंग्लिश में समय और रिश्ते के आधार पर अभिवादन बदल जाते हैं।"
        },
        {
            type: "vocabulary",
            words: [
                { word: "Hello", definition: "A common greeting", translation: "नमस्ते/हेलो (सबसे आम अभिवादन)", example: "Hello! How are you?", exampleHindi: "नमस्ते! आप कैसे हैं?", pronunciation: "हे-लो" },
                { word: "Fine", definition: "Feeling good/okay", translation: "ठीक/बढ़िया (जब सब ठीक हो)", example: "I am fine, thank you.", exampleHindi: "मैं ठीक हूँ, शुक्रिया।", pronunciation: "फा-इन" },
                { word: "Meet", definition: "To see somebody for the first time", translation: "मिलना (पहली बार या दोबारा)", example: "Nice to meet you.", exampleHindi: "आपसे मिलकर अच्छा लगा।", pronunciation: "मी-ट" },
                { word: "Great", definition: "Very good", translation: "बहुत अच्छा/शानदार", example: "I am doing great!", exampleHindi: "मैं बहुत अच्छा कर रहा हूँ!", pronunciation: "ग्रे-ट" },
                { word: "Friend", definition: "Someone you know and like", translation: "दोस्त/मित्र", example: "He is my best friend.", exampleHindi: "वह मेरा सबसे अच्छा दोस्त है।", pronunciation: "फ्रेन्-ड" },
                { word: "Family", definition: "People you are related to", translation: "परिवार", example: "How is your family?", exampleHindi: "आपका परिवार कैसा है?", pronunciation: "फै-मि-ली" },
                { word: "Busy", definition: "Having a lot to do", translation: "व्यस्त (जब काम ज्यादा हो)", example: "I am a bit busy today.", exampleHindi: "मैं आज थोड़ा व्यस्त हूँ।", pronunciation: "बि-ज़ी" },
                { word: "Work", definition: "Job or tasks", translation: "काम/नौकरी", example: "How is work going?", exampleHindi: "काम कैसा चल रहा है?", pronunciation: "व-र्क" },
                { word: "Welcome", definition: "Greeting someone kindly", translation: "स्वागत", example: "You are always welcome here.", exampleHindi: "आपका यहाँ हमेशा स्वागत है।", pronunciation: "वै-ल-कम" },
                { word: "Goodbye", definition: "Used when leaving", translation: "अलविदा/नमस्ते (जाते समय)", example: "Goodbye! See you tomorrow.", exampleHindi: "नमस्ते! कल मिलते हैं।", pronunciation: "गु-ड-बाय" },
                { word: "Morning", definition: "Start of the day", translation: "सुबह", example: "Good morning, teacher!", exampleHindi: "नमस्ते सर/मैडम (सुप्रभात)!", pronunciation: "मो-र-निंग" },
                { word: "Evening", definition: "End of the day", translation: "शाम", example: "Good evening! How was your day?", exampleHindi: "नमस्ते (शुभ संध्या)! आपका दिन कैसा रहा?", pronunciation: "ईव-निंग" }
            ]
        },
        {
            type: "cultural_note",
            title: "Cultural Tip: Simple is Best!",
            hindiTitle: "सांस्कृतिक सुझाव: सादगी ही सबसे अच्छी है!",
            content: "In most parts of India, we are very formal. But in English-speaking countries, even a boss can be greeted with a simple 'Hello' or 'Hi'. However, 'Good morning' is always safe and respectful.",
            hindiContent: "भारत के अधिकांश हिस्सों में, हम बहुत औपचारिक (formal) होते हैं। लेकिन इंग्लिश बोलने वाले देशों में, बॉस का अभिवादन भी 'Hello' या 'Hi' से किया जा सकता है। वैसे 'Good morning' कहना हमेशा सुरक्षित और सम्मानजनक होता है।",
            noteType: "tip"
        },
        {
            type: "text",
            title: "Let's Roleplay | चलो बातचीत करें",
            hindiTitle: "चलो बातचीत करें",
            content: "**Ram**: Hello, Shyam! How are you?\n**Shyam**: I am fine, Ram. How about you?\n**Ram**: I am doing great. How is everything at home?\n**Shyam**: Everything is good. See you later!\n**Ram**: Goodbye!",
            hindiContent: "**राम**: नमस्ते, श्याम! आप कैसे हैं?\n**श्याम**: मैं ठीक हूँ, राम। आप कैसे हैं?\n**राम**: मैं बहुत अच्छा हूँ। घर पर सब कैसा है?\n**श्याम**: सब कुछ बढ़िया है। बाद में मिलते हैं!\n**राम**: नमस्ते (बाय)!"
        },
        {
            type: "quiz",
            question: "What is the best way to say 'आपसे मिलकर अच्छा लगा' in English?",
            questionHindi: "'आपसे मिलकर अच्छा लगा' को इंग्लिश में कहने का सबसे अच्छा तरीका क्या है?",
            options: ["Nice to meet you", "Hello friend", "Goodbye", "I am busy"],
            answer: 0,
            explanation: "'Nice to meet you' is the standard way to express pleasure after meeting someone."
        },
        {
            type: "quiz",
            question: "If someone says 'How is your family?', what is a good reply?",
            questionHindi: "अगर कोई पूछे 'How is your family?', तो सही जवाब क्या होगा?",
            options: ["I am busy", "Everything is good", "Nice to meet you", "Goodbye"],
            answer: 1,
            explanation: "'Everything is good' suggests that your family members are well."
        },
        {
            type: "quiz",
            question: "Which greeting is used specifically in the MORNING?",
            questionHindi: "सुबह के समय कौन सा अभिवादन उपयोग किया जाता है?",
            options: ["Good Afternoon", "Good Evening", "Good Morning", "Goodbye"],
            answer: 2,
            explanation: "'Good Morning' is used from sunrise until noon."
        },
        {
            type: "quiz",
            question: "Fill in the blank: 'I am doing ____, thank you.'",
            questionHindi: "खाली जगह भरें: 'I am doing ____, thank you.'",
            options: ["Busy", "Work", "Great", "Meet"],
            answer: 2,
            explanation: "'Great' indicates that you are feeling very well."
        },
        {
            type: "cultural_note",
            title: "Common Mistake: 'I am fine... and you?'",
            hindiTitle: "सामान्य गलती: 'I am fine... and you?'",
            content: "Many Hindi speakers translate 'और आप?' directly to 'And you?'. While not wrong, it sounds more natural to say 'How about you?' or 'What about you?'.",
            hindiContent: "कई हिंदी भाषी सीधे 'और आप?' का अनुवाद 'And you?' के रूप में करते हैं। हालांकि यह गलत नहीं है, लेकिन 'How about you?' या 'What about you?' कहना अधिक स्वाभाविक लगता है।",
            noteType: "grammar"
        },
        {
            type: "speaking",
            phrase: "Hello, how are you?",
            hindiPhrase: "नमस्ते, आप कैसे हैं?"
        },
        {
            type: "speaking",
            phrase: "Nice to meet you.",
            hindiPhrase: "आपसे मिलकर अच्छा लगा।"
        }
    ]
};

const updatedLesson = {
    title: "Hello, how are you?",
    hindiTitle: "नमस्ते, आप कैसे हैं?",
    description: "Learn essential greetings and how to start a conversation naturally in English.",
    hindiDescription: "इंग्लिश में बुनियादी अभिवादन और बातचीत शुरू करने का तरीका सीखें।",
    content: JSON.stringify(contentBlocks)
};

const updateStmt = db.prepare(`
  UPDATE lessons 
  SET title = ?, hindi_title = ?, description = ?, hindi_description = ?, content = ?
  WHERE id = ?
`);

updateStmt.run(
    updatedLesson.title,
    updatedLesson.hindiTitle,
    updatedLesson.description,
    updatedLesson.hindiDescription,
    updatedLesson.content,
    lessonId
);

console.log(`Lesson ${lessonId} enriched successfully with Grade 9+ content.`);

// Also update vocabulary table for SRS
db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?').run(lessonId);

const insertVocab = db.prepare(`
  INSERT INTO vocabulary (lesson_id, word, definition, example, hindi_translation, hindi_pronunciation, example_hindi)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

contentBlocks.blocks.find(b => b.type === 'vocabulary').words.forEach(w => {
    insertVocab.run(lessonId, w.word, w.definition, w.example, w.translation, w.pronunciation, w.exampleHindi);
});

console.log(`Vocabulary for lesson ${lessonId} updated.`);
