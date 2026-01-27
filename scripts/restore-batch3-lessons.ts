
/**
 * RESTORE BATCH 3 BUSINESS LESSONS
 * Restores ~100 business English lessons using direct SQLite access.
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || 'preet_english.db').replace('file:', '');
const db = new Database(dbPath);

const moreLessons = [
    // Marketing
    { title: "Let's launch the campaign.", hindi: "चलिए अभियान शुरू करें।", subcategory: "Marketing", difficulty: "Intermediate" },
    { title: "We need to increase brand awareness.", hindi: "हमें ब्रांड जागरूकता बढ़ानी होगी।", subcategory: "Marketing", difficulty: "Advanced" },
    { title: "The target audience is millennials.", hindi: "लक्षित दर्शक मिलेनियल्स हैं।", subcategory: "Marketing", difficulty: "Intermediate" },
    { title: "Let's analyze the market trends.", hindi: "बाजार के रुझानों का विश्लेषण करें।", subcategory: "Marketing", difficulty: "Advanced" },
    { title: "The social media engagement is growing.", hindi: "सोशल मीडिया जुड़ाव बढ़ रहा है।", subcategory: "Marketing", difficulty: "Intermediate" },
    { title: "We should A/B test this.", hindi: "हमें इसका A/B परीक्षण करना चाहिए।", subcategory: "Marketing", difficulty: "Advanced" },
    { title: "The conversion rate needs improvement.", hindi: "रूपांतरण दर में सुधार चाहिए।", subcategory: "Marketing", difficulty: "Advanced" },
    { title: "Let's optimize the landing page.", hindi: "लैंडिंग पेज को ऑप्टिमाइज़ करें।", subcategory: "Marketing", difficulty: "Intermediate" },
    { title: "We're running a promotional offer.", hindi: "हम प्रमोशनल ऑफर चला रहे हैं।", subcategory: "Marketing", difficulty: "Beginner" },
    { title: "The campaign was successful.", hindi: "अभियान सफल रहा।", subcategory: "Marketing", difficulty: "Beginner" },

    // HR
    { title: "We're hiring for this position.", hindi: "हम इस पद के लिए भर्ती कर रहे हैं।", subcategory: "HR", difficulty: "Beginner" },
    { title: "Please submit your leave request.", hindi: "कृपया अपना छुट्टी अनुरोध जमा करें।", subcategory: "HR", difficulty: "Beginner" },
    { title: "The onboarding process takes two weeks.", hindi: "ऑनबोर्डिंग प्रक्रिया में दो सप्ताह लगते हैं।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "Your benefits package includes health insurance.", hindi: "आपके लाभ पैकेज में स्वास्थ्य बीमा शामिल है।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "The annual review is coming up.", hindi: "वार्षिक समीक्षा आ रही है।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "We have a strict code of conduct.", hindi: "हमारा सख्त आचार संहिता है।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "Employee satisfaction is our priority.", hindi: "कर्मचारी संतुष्टि हमारी प्राथमिकता है।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "The probation period is three months.", hindi: "परिवीक्षा अवधि तीन महीने है।", subcategory: "HR", difficulty: "Intermediate" },
    { title: "We offer flexible working hours.", hindi: "हम लचीले काम के घंटे देते हैं।", subcategory: "HR", difficulty: "Beginner" },
    { title: "The team building event is next week.", hindi: "टीम बिल्डिंग इवेंट अगले सप्ताह है।", subcategory: "HR", difficulty: "Beginner" },

    // IT & Tech
    { title: "The system is down.", hindi: "सिस्टम डाउन है।", subcategory: "IT", difficulty: "Beginner" },
    { title: "Have you tried restarting it?", hindi: "क्या आपने इसे रीस्टार्ट करके देखा?", subcategory: "IT", difficulty: "Beginner" },
    { title: "I'll raise a support ticket.", hindi: "मैं सपोर्ट टिकट बनाऊंगा।", subcategory: "IT", difficulty: "Beginner" },
    { title: "The software needs an update.", hindi: "सॉफ्टवेयर को अपडेट चाहिए।", subcategory: "IT", difficulty: "Beginner" },
    { title: "We're migrating to the cloud.", hindi: "हम क्लाउड पर माइग्रेट कर रहे हैं।", subcategory: "IT", difficulty: "Advanced" },
    { title: "Data security is critical.", hindi: "डेटा सुरक्षा महत्वपूर्ण है।", subcategory: "IT", difficulty: "Intermediate" },
    { title: "The backup was successful.", hindi: "बैकअप सफल रहा।", subcategory: "IT", difficulty: "Beginner" },
    { title: "We need to reset your password.", hindi: "हमें आपका पासवर्ड रीसेट करना होगा।", subcategory: "IT", difficulty: "Beginner" },
    { title: "The API is not responding.", hindi: "API जवाब नहीं दे रहा।", subcategory: "IT", difficulty: "Intermediate" },
    { title: "Let's deploy the new version.", hindi: "नया वर्जन डिप्लॉय करें।", subcategory: "IT", difficulty: "Advanced" },

    // Legal
    { title: "Please review the contract.", hindi: "कृपया अनुबंध की समीक्षा करें।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "The terms and conditions apply.", hindi: "नियम और शर्तें लागू हैं।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "We need legal approval.", hindi: "हमें कानूनी मंजूरी चाहिए।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "This is confidential information.", hindi: "यह गोपनीय जानकारी है।", subcategory: "Legal", difficulty: "Beginner" },
    { title: "Please sign the NDA.", hindi: "कृपया NDA पर हस्ताक्षर करें।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "The agreement expires next month.", hindi: "समझौता अगले महीने समाप्त होता है।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "We're in compliance with regulations.", hindi: "हम नियमों का पालन कर रहे हैं।", subcategory: "Legal", difficulty: "Advanced" },
    { title: "I'll consult with our legal team.", hindi: "मैं कानूनी टीम से सलाह लूंगा।", subcategory: "Legal", difficulty: "Intermediate" },
    { title: "This clause needs clarification.", hindi: "इस खंड में स्पष्टता चाहिए।", subcategory: "Legal", difficulty: "Advanced" },
    { title: "The intellectual property is protected.", hindi: "बौद्धिक संपदा सुरक्षित है।", subcategory: "Legal", difficulty: "Advanced" },

    // Operations
    { title: "We need to streamline the process.", hindi: "हमें प्रक्रिया को सुव्यवस्थित करना होगा।", subcategory: "Operations", difficulty: "Advanced" },
    { title: "The shipment has been dispatched.", hindi: "शिपमेंट भेज दी गई है।", subcategory: "Operations", difficulty: "Beginner" },
    { title: "Quality control is essential.", hindi: "गुणवत्ता नियंत्रण आवश्यक है।", subcategory: "Operations", difficulty: "Intermediate" },
    { title: "The inventory levels are low.", hindi: "इन्वेंट्री स्तर कम है।", subcategory: "Operations", difficulty: "Intermediate" },
    { title: "We need to optimize the supply chain.", hindi: "सप्लाई चेन को ऑप्टिमाइज़ करना होगा।", subcategory: "Operations", difficulty: "Advanced" },
    { title: "The order has been processed.", hindi: "ऑर्डर प्रोसेस हो गया है।", subcategory: "Operations", difficulty: "Beginner" },
    { title: "We're scaling up production.", hindi: "हम उत्पादन बढ़ा रहे हैं।", subcategory: "Operations", difficulty: "Intermediate" },
    { title: "The delivery is scheduled for tomorrow.", hindi: "डिलीवरी कल के लिए निर्धारित है।", subcategory: "Operations", difficulty: "Beginner" },
    { title: "We need to reduce lead time.", hindi: "लीड टाइम कम करना होगा।", subcategory: "Operations", difficulty: "Advanced" },
    { title: "The warehouse is at full capacity.", hindi: "गोदाम पूर्ण क्षमता पर है।", subcategory: "Operations", difficulty: "Intermediate" },

    // Client Relations
    { title: "The client is happy with our service.", hindi: "क्लाइंट हमारी सेवा से खुश है।", subcategory: "Client Relations", difficulty: "Beginner" },
    { title: "We value your partnership.", hindi: "हम आपकी साझेदारी को महत्व देते हैं।", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "Let's schedule a client review.", hindi: "क्लाइंट समीक्षा का समय निर्धारित करें।", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "We'd like to renew the contract.", hindi: "हम अनुबंध नवीनीकृत करना चाहेंगे।", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "Thank you for choosing us.", hindi: "हमें चुनने के लिए धन्यवाद।", subcategory: "Client Relations", difficulty: "Beginner" },
    { title: "We're committed to your success.", hindi: "हम आपकी सफलता के प्रति प्रतिबद्ध हैं।", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "How can we serve you better?", hindi: "हम आपकी बेहतर सेवा कैसे कर सकते हैं?", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "We appreciate your loyalty.", hindi: "हम आपकी वफादारी की सराहना करते हैं।", subcategory: "Client Relations", difficulty: "Intermediate" },
    { title: "Your satisfaction is our goal.", hindi: "आपकी संतुष्टि हमारा लक्ष्य है।", subcategory: "Client Relations", difficulty: "Beginner" },
    { title: "We look forward to working with you.", hindi: "हम आपके साथ काम करने के लिए उत्सुक हैं।", subcategory: "Client Relations", difficulty: "Beginner" },

    // Problem Solving
    { title: "We need to identify the root cause.", hindi: "हमें मूल कारण पहचानना होगा।", subcategory: "Problem Solving", difficulty: "Advanced" },
    { title: "Let's think outside the box.", hindi: "नए तरीके से सोचें।", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "What are the possible solutions?", hindi: "संभव समाधान क्या हैं?", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "Let's break this down into smaller tasks.", hindi: "इसे छोटे कार्यों में बांटें।", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "We should explore all options.", hindi: "हमें सभी विकल्पों का पता लगाना चाहिए।", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "This requires a strategic approach.", hindi: "इसमें रणनीतिक दृष्टिकोण चाहिए।", subcategory: "Problem Solving", difficulty: "Advanced" },
    { title: "Let's prioritize the issues.", hindi: "मुद्दों को प्राथमिकता दें।", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "We found a workaround.", hindi: "हमें एक वैकल्पिक समाधान मिला।", subcategory: "Problem Solving", difficulty: "Intermediate" },
    { title: "The issue has been resolved.", hindi: "समस्या हल हो गई है।", subcategory: "Problem Solving", difficulty: "Beginner" },
    { title: "Let's prevent this from happening again.", hindi: "इसे दोबारा होने से रोकें।", subcategory: "Problem Solving", difficulty: "Intermediate" },

    // Time Management
    { title: "I have a tight schedule.", hindi: "मेरा शेड्यूल बहुत व्यस्त है।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "Let me check my calendar.", hindi: "मुझे अपना कैलेंडर देखने दीजिए।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "Can we push this to next week?", hindi: "क्या हम इसे अगले सप्ताह कर सकते हैं?", subcategory: "Time Management", difficulty: "Intermediate" },
    { title: "I'll make time for this.", hindi: "मैं इसके लिए समय निकालूंगा।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "This is urgent.", hindi: "यह जरूरी है।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "The deadline is approaching.", hindi: "समय सीमा नजदीक आ रही है।", subcategory: "Time Management", difficulty: "Intermediate" },
    { title: "I need more time to complete this.", hindi: "मुझे इसे पूरा करने के लिए और समय चाहिए।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "Let's wrap up this meeting.", hindi: "चलिए मीटिंग खत्म करें।", subcategory: "Time Management", difficulty: "Beginner" },
    { title: "We're running out of time.", hindi: "हमारा समय खत्म हो रहा है।", subcategory: "Time Management", difficulty: "Intermediate" },
    { title: "I'll get back to you by end of day.", hindi: "मैं दिन के अंत तक जवाब दूंगा।", subcategory: "Time Management", difficulty: "Beginner" },
];

const moreVocabulary: Record<string, Array<{ word: string, definition: string, hindi: string, pronunciation: string, example: string }>> = {
    "Marketing": [
        { word: "Campaign", definition: "A planned series of marketing activities", hindi: "अभियान", pronunciation: "/kæmˈpeɪn/", example: "The campaign launches next week." },
        { word: "Engagement", definition: "Interaction with content or brand", hindi: "जुड़ाव", pronunciation: "/ɪnˈɡeɪdʒmənt/", example: "Social media engagement is high." },
    ],
    "HR": [
        { word: "Onboarding", definition: "Process of integrating new employees", hindi: "प्रवेश प्रक्रिया", pronunciation: "/ˈɒnbɔːdɪŋ/", example: "Onboarding takes two weeks." },
        { word: "Benefits", definition: "Additional compensation beyond salary", hindi: "लाभ", pronunciation: "/ˈbenɪfɪts/", example: "The benefits package is excellent." },
    ],
    "IT": [
        { word: "Deploy", definition: "To release software to production", hindi: "तैनात करना", pronunciation: "/dɪˈplɔɪ/", example: "Let's deploy the update." },
        { word: "Migrate", definition: "To move data or systems", hindi: "माइग्रेट करना", pronunciation: "/maɪˈɡreɪt/", example: "We're migrating to cloud." },
    ],
    "Legal": [
        { word: "Compliance", definition: "Following rules and regulations", hindi: "अनुपालन", pronunciation: "/kəmˈplaɪəns/", example: "We ensure compliance." },
        { word: "Clause", definition: "A section of a contract", hindi: "खंड", pronunciation: "/klɔːz/", example: "Review this clause carefully." },
    ],
    "Operations": [
        { word: "Inventory", definition: "Stock of goods", hindi: "सूची", pronunciation: "/ˈɪnvəntri/", example: "Check the inventory levels." },
        { word: "Logistics", definition: "Management of product flow", hindi: "लॉजिस्टिक्स", pronunciation: "/ləˈdʒɪstɪks/", example: "Logistics handles shipping." },
    ],
    "Client Relations": [
        { word: "Retention", definition: "Keeping existing customers", hindi: "प्रतिधारण", pronunciation: "/rɪˈtenʃən/", example: "Focus on client retention." },
        { word: "Partnership", definition: "Business relationship", hindi: "साझेदारी", pronunciation: "/ˈpɑːtnəʃɪp/", example: "We value this partnership." },
    ],
    "Problem Solving": [
        { word: "Workaround", definition: "A temporary solution", hindi: "वैकल्पिक समाधान", pronunciation: "/ˈwɜːkəraʊnd/", example: "Here's a workaround." },
        { word: "Root cause", definition: "The main reason for a problem", hindi: "मूल कारण", pronunciation: "/ruːt kɔːz/", example: "Find the root cause." },
    ],
    "Time Management": [
        { word: "Deadline", definition: "Final date for completion", hindi: "समय सीमा", pronunciation: "/ˈdedlaɪn/", example: "The deadline is Friday." },
        { word: "Priority", definition: "Something more important", hindi: "प्राथमिकता", pronunciation: "/praɪˈɒrɪti/", example: "This is a priority." },
    ],
};

function generateContent(topic: { title: string; hindi: string; subcategory: string; difficulty: string }): string {
    return JSON.stringify({
        blocks: [
            {
                type: "markdown",
                content: `
# ${topic.title}

## 🎯 Learning Objective
Learn to use "${topic.title}" in professional ${topic.subcategory} contexts.

---

## 📘 English Explanation

**Phrase:** ${topic.title}

A ${topic.difficulty.toLowerCase()}-level business phrase for ${topic.subcategory} situations.

### When to Use
Use this in professional ${topic.subcategory.toLowerCase()} settings.

### Example Sentences
1. "${topic.title}"
2. "In our meeting: '${topic.title}'"

### Tips
- Be clear and professional
- Use appropriate tone

---

## 📙 हिंदी व्याख्या

**वाक्य:** ${topic.hindi}

### कब उपयोग करें
${topic.subcategory} संदर्भों में इस वाक्य का उपयोग करें।

### याद रखें
${topic.difficulty === "Beginner" ? "आसान वाक्य - रोज़ाना अभ्यास करें।" : topic.difficulty === "Intermediate" ? "मध्यम स्तर - अलग-अलग स्थितियों में प्रयोग करें।" : "उन्नत वाक्य - आत्मविश्वास से बोलें।"}

---

## 💡 Practice
Role-play using this phrase in a ${topic.subcategory.toLowerCase()} scenario.
`
            }
        ]
    });
}

async function restoreBatch3() {
    console.log('=== RESTORING BATCH 3 (BUSINESS LESSONS) ===\n');

    const insertLessonStmt = db.prepare(`
        INSERT INTO lessons (title, hindi_title, slug, description, hindi_description, content, category, difficulty, "order", image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertVocabStmt = db.prepare(`
        INSERT INTO vocabulary (lesson_id, word, definition, hindi_translation, example, pronunciation)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    // Get max order
    const maxOrderStmt = db.prepare('SELECT MAX("order") as maxOrder FROM lessons');
    const result = maxOrderStmt.get() as { maxOrder: number };
    let currentOrder = (result.maxOrder || 1000) + 1;

    let added = 0;

    for (const topic of moreLessons) {
        try {
            const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
            const content = generateContent(topic);

            const res = insertLessonStmt.run(
                topic.title,
                topic.hindi,
                slug,
                `Learn: "${topic.title}" in ${topic.subcategory} contexts.`,
                `${topic.subcategory} में "${topic.hindi}" सीखें।`,
                content,
                "Business", // Category
                topic.difficulty,
                currentOrder++,
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
            );

            const lessonId = res.lastInsertRowid;

            const vocabList = moreVocabulary[topic.subcategory] || [];
            for (const vocab of vocabList.slice(0, 2)) {
                insertVocabStmt.run(
                    lessonId,
                    vocab.word,
                    vocab.definition,
                    vocab.hindi,
                    vocab.example,
                    vocab.pronunciation
                );
            }

            console.log(`✅ Restored: ${topic.title}`);
            added++;

        } catch (err: any) {
            if (err.message.includes('UNIQUE')) {
                console.log(`⏭️ Skipped (Exists): ${topic.title}`);
            } else {
                console.error(`❌ Error: ${topic.title}`, err.message);
            }
        }
    }

    console.log(`\n=== BATCH 3 COMPLETE: ${added} lessons processed ===`);
}

restoreBatch3();
