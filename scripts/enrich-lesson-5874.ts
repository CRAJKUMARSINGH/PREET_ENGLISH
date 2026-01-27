import Database from 'better-sqlite3';
const db = new Database('preet_english.db');

const lessonId = 5874;

const contentBlocks = {
    blocks: [
        {
            type: "text",
            title: "Asking the Way | रास्ता पूछना",
            hindiTitle: "रास्ता पूछना",
            content: "Finding your way in a new city can be stressful. Learning a few simple English phrases can help you reach your destination without any trouble.",
            hindiContent: "नए शहर में रास्ता ढूँढना तनावपूर्ण हो सकता है। इंग्लिश के कुछ आसान वाक्यांश सीखने से आप बिना किसी परेशानी के अपनी मंज़िल तक पहुँच सकते हैं।"
        },
        {
            type: "vocabulary",
            words: [
                { word: "Direction", definition: "Path along which someone moves", translation: "दिशा/रास्ता", example: "Which direction is the market?", exampleHindi: "बाज़ार किस दिशा में है?", pronunciation: "डि-रे-क्शन" },
                { word: "Hospital", definition: "Place for medical treatment", translation: "अस्पताल", example: "The hospital is nearby.", exampleHindi: "अस्पताल पास ही है।", pronunciation: "हॉस्-पि-टल" },
                { word: "Market", definition: "Place for buying and selling", translation: "बाज़ार", example: "The market is very crowded.", exampleHindi: "बाज़ार में बहुत भीड़ है।", pronunciation: "मा-र्केट" },
                { word: "Straight", definition: "Without a curve or bend", translation: "सीधा", example: "Go straight for two miles.", exampleHindi: "दो मील सीधा जाएं।", pronunciation: "स्ट्रे-ट" },
                { word: "Left", definition: "Opposite of right", translation: "बायाँ", example: "Turn left at the next corner.", exampleHindi: "अगले कोने से बाएँ मुड़ें।", pronunciation: "लेफ्-ट" },
                { word: "Right", definition: "Opposite of left", translation: "दायाँ", example: "Take a right turn now.", exampleHindi: "अब दाएँ मुड़ें।", pronunciation: "रा-इट" },
                { word: "Near", definition: "Close to", translation: "पास", example: "Is the bank near here?", exampleHindi: "क्या बैंक यहाँ पास में है?", pronunciation: "नि-यर" },
                { word: "Far", definition: "At a distance", translation: "दूर", example: "My school is very far.", exampleHindi: "मेरा स्कूल बहुत दूर है।", pronunciation: "फा-र" },
                { word: "Address", definition: "Detail of where someone lives", translation: "पता", example: "Please write your address.", exampleHindi: "कृपया अपना पता लिखें।", pronunciation: "अ-ड्रेस" },
                { word: "Map", definition: "Diagram of an area", translation: "मैप/नक्शा", example: "Look at the map.", exampleHindi: "मैप पर देखिए।", pronunciation: "मै-प" },
                { word: "Corner", definition: "Where two roads meet", translation: "कोना", example: "The shop is on the corner.", exampleHindi: "दुकान कोने पर है।", pronunciation: "कॉ-र्नर" },
                { word: "Road", definition: "Wide way for vehicles", translation: "सड़क", example: "This road is very wide.", exampleHindi: "यह सड़क बहुत चौड़ी है।", pronunciation: "रो-ड" }
            ]
        },
        {
            type: "text",
            title: "Navigation Dialogue | रास्ते की बातचीत",
            hindiTitle: "रास्ते की बातचीत",
            content: "**Amit**: Excuse me! Is there a hospital nearby?\\n**Stranger**: Yes, go straight and turn left at the signal.\\n**Amit**: Is it far from here?\\n**Stranger**: No, it is just a 5-minute walk.\\n**Amit**: Thank you so much for your help!",
            hindiContent: "**अमित**: सुनिए! क्या यहाँ कोई पास में अस्पताल है?\\n**अजनबी**: हाँ, सीधा जाएं और सिग्नल से बाएँ मुड़ें।\\n**अमित**: क्या यह यहाँ से दूर है?\\n**अजनबी**: नहीं, यह सिर्फ 5 मिनट पैदल की दूरी पर है।\\n**अमित**: आपकी मदद के लिए बहुत-बहुत शुक्रिया!"
        },
        {
            type: "cultural_note",
            title: "Usage Tip: 'Excuse me!'",
            hindiTitle: "उपयोग सुझाव: 'Excuse me!'",
            content: "Always start your question with 'Excuse me!' when asking a stranger for help. It is the polite way to get someone's attention in English.",
            hindiContent: "किसी अजनबी से मदद माँगते समय हमेशा 'Excuse me!' से शुरुआत करें। इंग्लिश में किसी का ध्यान अपनी ओर खींचने का यह सबसे विनम्र तरीका है।",
            noteType: "tip"
        },
        {
            type: "quiz",
            question: "What is the polite way to get a stranger's attention?",
            questionHindi: "अजनबी का ध्यान खींचने का विनम्र तरीका क्या है?",
            options: ["Hey you!", "Excuse me!", "Listen!", "Stop!"],
            answer: 1,
            explanation: "'Excuse me!' is the standard polite phrase used to approach someone you don't know."
        },
        {
            type: "quiz",
            question: "If you need to go to the LEFT, which direction is it?",
            questionHindi: "यदि आपको बाएँ जाना है, तो वह कौन सी दिशा है?",
            options: ["Right", "Straight", "Left", "Backwards"],
            answer: 2,
            explanation: "'Left' means 'बायाँ' in Hindi."
        },
        {
            type: "quiz",
            question: "What does 'Nearby' mean?",
            questionHindi: "'Nearby' का क्या अर्थ है?",
            options: ["बहुत दूर", "पास ही", "बिल्कुल नहीं", "पता नहीं"],
            answer: 1,
            explanation: "'Nearby' means something is close or at a short distance."
        },
        {
            type: "quiz",
            question: "Which word means 'Road'?",
            questionHindi: "कौन सा शब्द 'सड़क' का अर्थ देता है?",
            options: ["Corner", "Map", "Street", "Hospital"],
            answer: 2,
            explanation: "'Street' or 'Road' are common words for a public way in a city."
        },
        {
            type: "cultural_note",
            title: "Common Indian Mistake: 'Which side?'",
            hindiTitle: "सामान्य भारतीय गलती: 'Which side?'",
            content: "Many Indians ask 'Which side is the bank?'. While understandable, it's more natural to ask 'Where is the bank?' or 'Which direction is the bank?'.",
            hindiContent: "कई भारतीय पूछते हैं 'Which side is the bank?'. हालांकि यह समझ में आता है, लेकिन 'Where is the bank?' या 'Which direction is the bank?' पूछना अधिक स्वाभाविक है।",
            noteType: "tip"
        },
        {
            type: "speaking",
            phrase: "Is there a hospital nearby?",
            hindiPhrase: "क्या यहाँ पास में कोई अस्पताल है?"
        },
        {
            type: "speaking",
            phrase: "Go straight and turn left.",
            hindiPhrase: "सीधा जाएं और बाएँ मुड़ें।"
        }
    ]
};

const updatedLesson = {
    title: "Where is the hospital?",
    hindiTitle: "अस्पताल कहाँ है?",
    description: "Learn how to ask for directions and navigate a new city with confidence.",
    hindiDescription: "रास्ता पूछना और नए शहर में आत्मविश्वास के साथ घूमना सीखें।",
    content: JSON.stringify(contentBlocks)
};

const updateStmt = db.prepare('UPDATE lessons SET title = ?, hindi_title = ?, description = ?, hindi_description = ?, content = ? WHERE id = ?');
updateStmt.run(updatedLesson.title, updatedLesson.hindiTitle, updatedLesson.description, updatedLesson.hindiDescription, updatedLesson.content, lessonId);

db.prepare('DELETE FROM vocabulary WHERE lesson_id = ?').run(lessonId);
const insertVocab = db.prepare('INSERT INTO vocabulary (lesson_id, word, definition, example, hindi_translation, hindi_pronunciation, example_hindi) VALUES (?, ?, ?, ?, ?, ?, ?)');
contentBlocks.blocks.find(b => b.type === 'vocabulary').words.forEach(w => {
    insertVocab.run(lessonId, w.word, w.definition, w.example, w.translation, w.pronunciation, w.exampleHindi);
});

console.log(`Lesson ${lessonId} enriched successfully!`);
