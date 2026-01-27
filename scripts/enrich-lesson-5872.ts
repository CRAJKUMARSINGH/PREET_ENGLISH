import Database from 'better-sqlite3';
const db = new Database('preet_english.db');

const lessonId = 5872;

const contentBlocks = {
    blocks: [
        {
            type: "text",
            title: "Daily Work | रोज़ाना का काम",
            hindiTitle: "रोज़ाना का काम",
            content: "Talking about work is an essential part of any conversation. Whether you are a farmer, a student, or an officer, knowing how to describe your work politely is very important.",
            hindiContent: "काम के बारे में बात करना किसी भी बातचीत का एक ज़रुरी हिस्सा है। चाहे आप किसान हों, छात्र हों या अधिकारी, अपने काम को विनम्रता से बताना आना बहुत महत्वपूर्ण है।"
        },
        {
            type: "vocabulary",
            words: [
                { word: "Job", definition: "Regular work for pay", translation: "नौकरी/काम", example: "I have a new job.", exampleHindi: "मेरी एक नई नौकरी है।", pronunciation: "जॉ-ब" },
                { word: "Business", definition: "Activity of making money", translation: "व्यापार/धंधा", example: "My father has a small business.", exampleHindi: "मेरे पिता का एक छोटा सा धंधा है।", pronunciation: "बिज़-नेस" },
                { word: "Farmer", definition: "A person who owns or manages a farm", translation: "किसान", example: "Farmers work very hard.", exampleHindi: "किसान बहुत कड़ी मेहनत करते हैं।", pronunciation: "फा-र्मर" },
                { word: "Shopkeeper", definition: "Someone who owns a shop", translation: "दुकानदार", example: "He is a very honest shopkeeper.", exampleHindi: "वह बहुत ईमानदार दुकानदार है।", pronunciation: "शॉ-प-कीपर" },
                { word: "Office", definition: "Place of work", translation: "दफ्तर/ऑफिस", example: "I go to the office at 9 AM.", exampleHindi: "मैं सुबह 9 बजे ऑफिस जाता हूँ।", pronunciation: "ऑ-फिस" },
                { word: "Salary", definition: "Fixed regular payment", translation: "तनख्वाह/पगार", example: "The salary is paid every month.", exampleHindi: "तनख्वाह हर महीने दी जाती है।", pronunciation: "सै-ल-री" },
                { word: "Company", definition: "Commerical business", translation: "कंपनी", example: "I work for a large company.", exampleHindi: "मैं एक बड़ी कंपनी में काम करता हूँ।", pronunciation: "कम-पनी" },
                { word: "Daily", definition: "Happening every day", translation: "रोज़ाना", example: "I travel daily to my work.", exampleHindi: "मैं रोज़ाना अपने काम पर जाता हूँ।", pronunciation: "डे-ली" },
                { word: "Hard work", definition: "Effort and determination", translation: "कड़ी मेहनत", example: "Success needs hard work.", exampleHindi: "सफलता के लिए कड़ी मेहनत चाहिए।", pronunciation: "हा-र्ड व-र्क" },
                { word: "Easy", definition: "Not difficult", translation: "आसान", example: "This task is very easy.", exampleHindi: "यह काम बहुत आसान है।", pronunciation: "ई-ज़ी" },
                { word: "Difficult", definition: "Hard to do", translation: "कठिन", example: "English is not difficult to learn.", exampleHindi: "इंग्लिश सीखना कठिन नहीं है।", pronunciation: "डि-फि-कल्ट" },
                { word: "Goal", definition: "The object of ambition", translation: "लक्ष्य/मकसद", example: "My goal is to speak English well.", exampleHindi: "मेरा लक्ष्य अच्छी इंग्लिश बोलना है।", pronunciation: "गो-ल" }
            ]
        },
        {
            type: "text",
            title: "Talk About Work | काम की बात",
            hindiTitle: "काम की बात",
            content: "**Deepak**: Hi Suresh! What do you do?\n**Suresh**: I work in a bank. And you?\n**Deepak**: I am a software engineer. My office is in Jaipur.\n**Suresh**: That is great! Do you like your job?\n**Deepak**: Yes, I love my work. It is very interesting.",
            hindiContent: "**दीपक**: नमस्ते सुरेश! आप क्या करते हैं?\n**सुरेश**: मैं एक बैंक में काम करता हूँ। और आप?\n**दीपक**: मैं एक सॉफ्टवेयर इंजीनियर हूँ। मेरा ऑफिस जयपुर में है।\n**सुरेश**: यह तो बहुत अच्छा है! क्या आपको अपनी नौकरी पसंद है?\n**दीपक**: हाँ, मुझे अपना काम बहुत पसंद है। यह बहुत दिलचस्प है।"
        },
        {
            type: "cultural_note",
            title: "Usage Tip: 'I am a [Job]'",
            hindiTitle: "उपयोग सुझाव: 'I am a [Job]'",
            content: "When saying what you do, always use 'a' or 'an' before the job title. For example: 'I am A teacher' or 'I am AN engineer'. Using only 'I am teacher' is a common mistake.",
            hindiContent: "जब आप अपना काम बताते हैं, तो हमेशा जॉब से पहले 'a' या 'an' का उपयोग करें। जैसे: 'I am A teacher' या 'I am AN engineer'। सिर्फ 'I am teacher' कहना एक सामान्य गलती है।",
            noteType: "grammar"
        },
        {
            type: "quiz",
            question: "Which of these is the correct way to say 'मैं एक छात्र हूँ'?",
            questionHindi: "इनमें से 'मैं एक छात्र हूँ' कहने का सही तरीका कौन सा है?",
            options: ["I am student", "I am a student", "I student", "Me student"],
            answer: 1,
            explanation: "You must always use 'a' or 'an' before your job title or role in English."
        },
        {
            type: "quiz",
            question: "What does 'What do you do?' mean?",
            questionHindi: "'What do you do?' का क्या मतलब है?",
            options: ["आप अभी क्या कर रहे हैं?", "आपका पेशा (काम) क्या है?", "आप कहाँ जा रहे हैं?", "आप कैसे हैं?"],
            answer: 1,
            explanation: "'What do you do?' is a standard way to ask about someone's job/profession."
        },
        {
            type: "quiz",
            question: "If someone works on a farm, they are a ____.",
            questionHindi: "यदि कोई खेत में काम करता है, तो वह एक ____ है।",
            options: ["Shopkeeper", "Farmer", "Engineer", "Doctor"],
            answer: 1,
            explanation: "A person who works on or manages a farm is called a 'Farmer'."
        },
        {
            type: "quiz",
            question: "Is 'English is difficult' correct?",
            questionHindi: "क्या 'English is difficult' सही है?",
            options: ["Yes", "No, it should be 'English difficult'", "No, it should be 'English is easy'", "Yes, but 'English are difficult' is better"],
            answer: 0,
            explanation: "'Difficult' is an adjective, and 'is' is the correct helping verb for singular subjects like 'English'."
        },
        {
            type: "cultural_note",
            title: "Common Indian Mistake: 'I am doing business'",
            hindiTitle: "सामान्य भारतीय गलती: 'I am doing business'",
            content: "Many Indians say 'I am doing business'. While understandable, a more natural way to say it is 'I have a business' or 'I run a business'.",
            hindiContent: "कई भारतीय कहते हैं 'I am doing business'। हालांकि यह समझ में आता है, लेकिन 'I have a business' या 'I run a business' कहना अधिक स्वाभाविक लगता है।",
            noteType: "tip"
        },
        {
            type: "speaking",
            phrase: "I work in a bank.",
            hindiPhrase: "मैं एक बैंक में काम करता हूँ।"
        },
        {
            type: "speaking",
            phrase: "What do you do?",
            hindiPhrase: "आप क्या करते हैं?"
        }
    ]
};

const updatedLesson = {
    title: "What do you do?",
    hindiTitle: "आप क्या काम करते हैं?",
    description: "Learn how to discuss your profession and daily work tasks in natural English.",
    hindiDescription: "अपनी नौकरी और रोज़ाना के काम के बारे में इंग्लिश में बात करना सीखें।",
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
