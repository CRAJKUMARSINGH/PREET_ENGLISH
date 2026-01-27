import Database from 'better-sqlite3';
const db = new Database('preet_english.db');

const lessonId = 5873;
console.log(`Starting enrichment for Lesson ${lessonId}...`);

try {
    const contentBlocks = {
        blocks: [
            {
                type: "text",
                title: "First Impression | पहला प्रभाव",
                hindiTitle: "पहला प्रभाव",
                content: "When heading into an interview, your introduction is everything. It's not just about your name, but also about your background and confidence.",
                hindiContent: "इंटरव्यू में जाते समय, आपका परिचय (introduction) ही सब कुछ होता है। यह सिर्फ आपके नाम के बारे में नहीं है, बल्कि आपकी पृष्ठभूमि और आत्मविश्वास के बारे में भी है।"
            },
            {
                type: "vocabulary",
                words: [
                    { word: "Introduce", definition: "Make someone known by name", translation: "परिचय देना", example: "Let me introduce myself.", exampleHindi: "मुझे अपना परिचय देने दें।", pronunciation: "इन-ट्रो-ड्यूस" },
                    { word: "Experience", definition: "Skill gained from doing", translation: "अनुभव", example: "I have two years of experience.", exampleHindi: "मेरे पास दो साल का अनुभव है।", pronunciation: "एक्स-पी-रिएन्स" },
                    { word: "Education", definition: "A system of learning", translation: "शिक्षा", example: "Education is the key to success.", exampleHindi: "शिक्षा सफलता की कुंजी है।", pronunciation: "ए-जु-के-शन" },
                    { word: "Skills", definition: "Ability to do something well", translation: "कौशल/हुनर", example: "Computer skills are very important.", exampleHindi: "कंप्यूटर का हुनर बहुत महत्वपूर्ण है।", pronunciation: "स्कि-ल्स" },
                    { word: "Strengths", definition: "A good or beneficial quality", translation: "ताकत/मजबूत पक्ष", example: "My strength is my hard work.", exampleHindi: "मेरी कड़ी मेहनत मेरी ताकत है।", pronunciation: "स्ट्रेंग्-थ्स" },
                    { word: "Weakness", definition: "A quality or feature regarded as a disadvantage", translation: "कमजोरी", example: "Don't focus on your weakness.", exampleHindi: "अपनी कमजोरी पर ध्यान न दें।", pronunciation: "वीक-नेस" },
                    { word: "Team", definition: "A group of people working together", translation: "टीम", example: "I am a good team player.", exampleHindi: "मैं टीम में अच्छा काम करता हूँ।", pronunciation: "टी-म" },
                    { word: "Goal", definition: "Something that you are trying to achieve", translation: "लक्ष्य", example: "My goal is to learn English in 3 months.", exampleHindi: "मेरा लक्ष्य 3 महीने में इंग्लिश सीखना है।", pronunciation: "गो-ल" },
                    { word: "Graduate", definition: "Completed a degree", translation: "स्नातक", example: "I am a B.A. graduate.", exampleHindi: "मैं बी.ए. स्नातक हूँ।", pronunciation: "ग्रे-जु-एट" },
                    { word: "Position", definition: "A job or post", translation: "पद", example: "This position is perfect for me.", exampleHindi: "यह पद मेरे लिए एकदम सही है।", pronunciation: "पो-जि-शन" },
                    { word: "Confident", definition: "Feeling or showing self-assurance", translation: "आत्मविश्वासी", example: "Be confident during the interview.", exampleHindi: "इंटरव्यू के दौरान आत्मविश्वासी रहें।", pronunciation: "कॉन-फि-डेन्ट" },
                    { word: "Project", definition: "A piece of planned work", translation: "प्रोजेक्ट", example: "I am working on a new project.", exampleHindi: "मैं एक नए प्रोजेक्ट पर काम कर रहा हूँ।", pronunciation: "प्रो-जे-क्ट" }
                ]
            },
            {
                type: "text",
                title: "Simple Introduction | साधारण परिचय",
                hindiTitle: "साधारण परिचय",
                content: "**Interviewer**: Hello! Please introduce yourself.\\n**Candidate**: Hello Sir! My name is Rahul. I am from Udaipur. I am a Commerce graduate. I have one year of experience in accounting.\\n**Interviewer**: Why do you want this job?\\n**Candidate**: I want to grow my career in a good company like yours.",
                hindiContent: "**इंटरव्यूअर**: नमस्ते! कृपया अपना परिचय दें।\\n**उम्मीदवार**: नमस्ते सर! मेरा नाम राहुल है। मैं उदयपुर से हूँ। मैंने कॉमर्स में ग्रेजुएशन किया है। मेरे पास अकाउंटिंग (accounting) में एक साल का अनुभव है।\\n**इंटरव्यूअर**: आप यह नौकरी क्यों चाहते हैं?\\n**उम्मीदवार**: मैं आपकी जैसी अच्छी कंपनी में अपना करियर आगे बढ़ाना चाहता हूँ।"
            },
            {
                type: "cultural_note",
                title: "Usage Tip: 'I am from...'",
                hindiTitle: "उपयोग सुझाव: 'I am from...'",
                content: "Instead of saying 'I stay in [City]', use 'I am from [City]' during introductions. 'I am from' sounds more professional and refers to your background.",
                hindiContent: "परिचय के दौरान 'I stay in [City]' कहने के बजाय, 'I am from [City]' का उपयोग करें। 'I am from' अधिक प्रोफेशनल (professional) लगता है और आपकी पृष्ठभूमि के बारे में बताता है।",
                noteType: "tip"
            },
            {
                type: "quiz",
                question: "Which of these is a professional way to start an introduction?",
                questionHindi: "परिचय शुरू करने का प्रोफेशनल तरीका कौन सा है?",
                options: ["Hello, my name is...", "Hey, I am...", "What's up, I'm...", "Me is..."],
                answer: 0,
                explanation: "'Hello, my name is...' is the most polite and professional way to introduce yourself."
            },
            {
                type: "quiz",
                question: "If you have finished your college degree, you are a ____.",
                questionHindi: "यदि आपने अपनी कॉलेज की डिग्री पूरी कर ली है, तो आप एक ____ हैं।",
                options: ["Student", "Graduate", "Teacher", "Worker"],
                answer: 1,
                explanation: "A person who has completed their degree is called a 'Graduate'."
            },
            {
                type: "quiz",
                question: "What does 'Experience' mean in a job context?",
                questionHindi: "नौकरी के संदर्भ में 'Experience' का क्या अर्थ है?",
                options: ["आपका नाम", "आपकी उम्र", "आपका पिछला काम और हुनर", "आपका भविष्य"],
                answer: 2,
                explanation: "'Experience' refers to the skills and knowledge you gained from previous jobs."
            },
            {
                type: "quiz",
                question: "Correct the sentence: 'Me is from Bihar.'",
                questionHindi: "वाक्य सही करें: 'Me is from Bihar.'",
                options: ["I am from Bihar", "I is from Bihar", "Me are from Bihar", "Bihar from me"],
                answer: 0,
                explanation: "'I' is the correct subject pronoun, and 'am' is the matching helping verb."
            },
            {
                type: "cultural_note",
                title: "Common Indian Mistake: 'Myself Rahul'",
                hindiTitle: "सामान्य भारतीय गलती: 'Myself Rahul'",
                content: "Never start an introduction with 'Myself [Name]'. It is grammatically incorrect. Always use 'I am [Name]' or 'My name is [Name]'.",
                hindiContent: "कभी भी 'Myself [Name]' के साथ परिचय शुरू न करें। यह व्याकरण (grammar) की दृष्टि से गलत है। हमेशा 'I am [Name]' या 'My name is [Name]' का उपयोग करें।",
                noteType: "grammar"
            },
            {
                type: "speaking",
                phrase: "Hello, my name is Rahul.",
                hindiPhrase: "नमस्ते, मेरा नाम राहुल है।"
            },
            {
                type: "speaking",
                phrase: "I am from Rajasthan.",
                hindiPhrase: "मैं राजस्थान से हूँ।"
            }
        ]
    };

    const updatedLesson = {
        title: "Introduce Yourself",
        hindiTitle: "अपना परिचय दें",
        description: "Learn how to present yourself professionally in interviews and new social settings.",
        hindiDescription: "इंटरव्यू और नई सामाजिक परिस्थितियों में खुद को प्रोफेशनल तरीके से पेश करना सीखें।",
        content: JSON.stringify(contentBlocks)
    };

    console.log("Updating lesson record...");
    const updateStmt = db.prepare('UPDATE lessons SET title = ?, hindi_title = ?, description = ?, hindi_description = ?, content = ? WHERE id = ?');
    updateStmt.run(updatedLesson.title, updatedLesson.hindiTitle, updatedLesson.description, updatedLesson.hindiDescription, updatedLesson.content, lessonId);

    console.log("Updating vocabulary record...");
    db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?').run(lessonId);
    const insertVocab = db.prepare('INSERT INTO vocabulary (lesson_id, word, definition, example, hindi_translation, hindi_pronunciation, example_hindi) VALUES (?, ?, ?, ?, ?, ?, ?)');

    const vocabBlock = contentBlocks.blocks.find(b => b.type === 'vocabulary');
    if (vocabBlock && vocabBlock.words) {
        vocabBlock.words.forEach(w => {
            insertVocab.run(lessonId, w.word, w.definition, w.example, w.translation, w.pronunciation, w.exampleHindi);
        });
    }

    console.log(`Lesson ${lessonId} enriched successfully!`);
} catch (error) {
    console.error("FAILED to enrich lesson:", error);
    process.exit(1);
}
