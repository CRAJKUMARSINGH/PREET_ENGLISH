import Database from 'better-sqlite3';
const db = new Database('preet_english.db');

const lessonId = 5875;

const contentBlocks = {
    blocks: [
        {
            type: "text",
            title: "Market Talk | बाज़ार की बातें",
            hindiTitle: "बाज़ार की बातें",
            content: "Shopping is not just about buying things; it's about communicating your needs and getting the best value for your money. Let's learn how to shop like a pro in English!",
            hindiContent: "खरीदारी सिर्फ चीज़ें खरीदने के बारे में नहीं है; यह अपनी ज़रूरतों को बताने और अपने पैसों का सही मूल्य पाने के बारे में है। चलिए सीखते हैं कि इंग्लिश में एक प्रो की तरह खरीदारी कैसे करें!"
        },
        {
            type: "vocabulary",
            words: [
                { word: "Price", definition: "Amount of money for which something is sold", translation: "दाम/कीमत", example: "What is the price?", exampleHindi: "कीमत क्या है?", pronunciation: "प्रा-इस" },
                { word: "Cost", definition: "Requirement of payment", translation: "लागत/दाम", example: "It costs ten dollars.", exampleHindi: "इसकी कीमत दस डॉलर है।", pronunciation: "कॉस्-ट" },
                { word: "Cheap", definition: "Low in price", translation: "सस्ता", example: "This market is very cheap.", exampleHindi: "यह बाज़ार बहुत सस्ता है।", pronunciation: "ची-प" },
                { word: "Expensive", definition: "Costing a lot of money", translation: "महँगा", example: "Gold is very expensive.", exampleHindi: "सोना बहुत महँगा है।", pronunciation: "एक्स-पेन्-सिव" },
                { word: "Discount", definition: "A deduction from the usual price", translation: "छूट", example: "Can I get a discount?", exampleHindi: "क्या मुझे छूट मिल सकती है?", pronunciation: "डिस्-का-उन्ट" },
                { word: "Bargain", definition: "Negotiate the price", translation: "मोल-भाव करना", example: "I like to bargain for a good price.", exampleHindi: "मुझे अच्छे दाम के लिए मोल-भाव करना पसंद है।", pronunciation: "बा-र्गेन" },
                { word: "Buy", definition: "To obtain in exchange for payment", translation: "खरीदना", example: "I want to buy these shoes.", exampleHindi: "मैं ये जूते खरीदना चाहता हूँ।", pronunciation: "बा-य" },
                { word: "Quality", definition: "Standard of something", translation: "गुणवत्ता", example: "Check the quality before buying.", exampleHindi: "खरीदने से पहले क्वालिटी चेक करें।", pronunciation: "क्वा-लिटी" },
                { word: "Change", definition: "Lower denomination of money", translation: "खुले पैसे", example: "Do you have change for 100?", exampleHindi: "क्या आपके पास 100 के खुले पैसे हैं?", pronunciation: "चेन्-ज" },
                { word: "Receipt", definition: "Proof of purchase", translation: "रसीद", example: "Keep your receipt safe.", exampleHindi: "अपनी रसीद सुरक्षित रखें।", pronunciation: "र-सीट" },
                { word: "Size", definition: "Dimensions of something", translation: "साइज/आकार", example: "This size is too small.", exampleHindi: "यह साइज बहुत छोटा है।", pronunciation: "सा-इज़" },
                { word: "Color", definition: "Appearance of something", translation: "रंग", example: "I like the blue color.", exampleHindi: "मुझे नीला रंग पसंद है।", pronunciation: "क-लर" }
            ]
        },
        {
            type: "text",
            title: "Negotiation | मोल-भाव",
            hindiTitle: "मोल-भाव",
            content: "**Sita**: How much is this dress?\\n**Shopkeeper**: It is 1000 rupees.\\n**Sita**: That is very expensive! Can you give a discount?\\n**Shopkeeper**: Okay, for you, I can do 800 rupees.\\n**Sita**: That sounds fair. I will buy it.",
            hindiContent: "**सीता**: यह ड्रेस कितने की है?\\n**दुकानदार**: यह 1000 रुपये की है।\\n**सीता**: यह तो बहुत महँगी है! क्या आप कुछ छूट दे सकते हैं?\\n**दुकानदार**: ठीक है, आपके लिए, मैं इसे 800 रुपये में दे दूँगा।\\n**सीता**: यह सही लग रहा है। मैं इसे खरीद लूँगी।"
        },
        {
            type: "cultural_note",
            title: "Cultural Tip: Haggling",
            hindiTitle: "सांस्कृतिक सुझाव: मोल-भाव (Haggling)",
            content: "In many Western countries, prices in stores are fixed. But in local markets, especially in India, 'Haggling' or 'Bargaining' is expected and social. Use phrases like 'Is that your best price?' to start.",
            hindiContent: "कई पश्चिमी देशों में, दुकानों में दाम तय (fixed) होते हैं। लेकिन स्थानीय बाजारों में, खासकर भारत में, 'मोल-भाव' (haggling) की उम्मीद की जाती है। शुरुआत करने के लिए 'Is that your best price?' जैसे वाक्यांशों का उपयोग करें।",
            noteType: "tip"
        },
        {
            type: "quiz",
            question: "What do you call something that costs very little money?",
            questionHindi: "जिसका दाम बहुत कम हो, उसे आप क्या कहते हैं?",
            options: ["Expensive", "Cheap", "Quality", "Receipt"],
            answer: 1,
            explanation: "'Cheap' means at low price."
        },
        {
            type: "quiz",
            question: "Which phrase is used to ask for a lower price?",
            questionHindi: "कम दाम माँगने के लिए किस वाक्यांश का उपयोग किया जाता है?",
            options: ["How much is it?", "Can I get a discount?", "I will buy it", "Where is the shop?"],
            answer: 1,
            explanation: "'Can I get a discount?' is the standard way to politely ask for a reduction in price."
        },
        {
            type: "quiz",
            question: "If a dress is too much money, it is ____.",
            questionHindi: "यदि कोई ड्रेस बहुत अधिक पैसों की है, तो वह ____ है।",
            options: ["Cheap", "Expensive", "Small", "Blue"],
            answer: 1,
            explanation: "'Expensive' means costing a lot of money."
        },
        {
            type: "quiz",
            question: "What is 'Change' in a shop?",
            questionHindi: "दुकान में 'Change' का क्या मतलब है?",
            options: ["नए कपड़े", "खुले पैसे (छोटे नोट)", "दुकान बदलना", "रसीद"],
            answer: 1,
            explanation: "In a financial context, 'Change' refers to money returned after a payment or coins of lower value."
        },
        {
            type: "cultural_note",
            title: "Common Indian Mistake: 'Fixed rate?'",
            hindiTitle: "सामान्य भारतीय गलती: 'Fixed rate?'",
            content: "Many Indians ask 'Is it fixed rate?'. A more natural way to ask is 'Is the price fixed?' or 'Are your prices negotiable?'.",
            hindiContent: "कई भारतीय पूछते हैं 'Is it fixed rate?'. पूछने का अधिक स्वाभाविक तरीका है 'Is the price fixed?' या 'Are your prices negotiable?'.",
            noteType: "grammar"
        },
        {
            type: "speaking",
            phrase: "How much is this?",
            hindiPhrase: "यह कितने का है?"
        },
        {
            type: "speaking",
            phrase: "Can you give me a discount?",
            hindiPhrase: "क्या आप मुझे कुछ छूट दे सकते हैं?"
        }
    ]
};

const updatedLesson = {
    title: "How much is this?",
    hindiTitle: "यह कितने का है?",
    description: "Learn how to handle shopping trips and negotiate prices in English with natural ease.",
    hindiDescription: "इंग्लिश में खरीदारी और मोल-भाव को स्वाभाविक रूप से संभालना सीखें।",
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
