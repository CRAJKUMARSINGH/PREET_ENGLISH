
import { db } from "../server/db";
import { lessons, vocabulary } from "@shared/schema";
import fs from "fs";

/**
 * Extended Business English Lesson Generator
 * Generates additional high-quality lessons across more topics
 */

// Extended list of Business English topics
const extendedTopics = [
    // Customer Service
    { title: "How may I assist you today?", hindi: "आज मैं आपकी कैसे सहायता कर सकता हूं?", subcategory: "Customer Service", difficulty: "Beginner" as const },
    { title: "I understand your concern.", hindi: "मैं आपकी चिंता समझता हूं।", subcategory: "Customer Service", difficulty: "Intermediate" as const },
    { title: "Let me check that for you.", hindi: "मुझे आपके लिए जांच करने दीजिए।", subcategory: "Customer Service", difficulty: "Beginner" as const },
    { title: "I apologize for the inconvenience.", hindi: "असुविधा के लिए मुझे खेद है।", subcategory: "Customer Service", difficulty: "Intermediate" as const },
    { title: "Is there anything else I can help with?", hindi: "क्या कुछ और है जिसमें मैं मदद कर सकता हूं?", subcategory: "Customer Service", difficulty: "Beginner" as const },
    { title: "I'll escalate this issue to my supervisor.", hindi: "मैं इस मुद्दे को अपने पर्यवेक्षक तक पहुंचाऊंगा।", subcategory: "Customer Service", difficulty: "Advanced" as const },
    { title: "Your feedback is valuable to us.", hindi: "आपकी प्रतिक्रिया हमारे लिए मूल्यवान है।", subcategory: "Customer Service", difficulty: "Intermediate" as const },
    { title: "We're working on resolving this.", hindi: "हम इसे हल करने पर काम कर रहे हैं।", subcategory: "Customer Service", difficulty: "Intermediate" as const },
    { title: "Thank you for your patience.", hindi: "आपके धैर्य के लिए धन्यवाद।", subcategory: "Customer Service", difficulty: "Beginner" as const },
    { title: "I'll follow up with you by email.", hindi: "मैं ईमेल द्वारा आपसे संपर्क करूंगा।", subcategory: "Customer Service", difficulty: "Intermediate" as const },

    // Networking
    { title: "It's a pleasure to meet you.", hindi: "आपसे मिलकर खुशी हुई।", subcategory: "Networking", difficulty: "Beginner" as const },
    { title: "I've heard great things about your company.", hindi: "मैंने आपकी कंपनी के बारे में बहुत अच्छी बातें सुनी हैं।", subcategory: "Networking", difficulty: "Intermediate" as const },
    { title: "Let me introduce myself.", hindi: "मुझे अपना परिचय देने दीजिए।", subcategory: "Networking", difficulty: "Beginner" as const },
    { title: "What brings you to this event?", hindi: "आप इस कार्यक्रम में कैसे आए?", subcategory: "Networking", difficulty: "Intermediate" as const },
    { title: "Here's my business card.", hindi: "यह मेरा बिजनेस कार्ड है।", subcategory: "Networking", difficulty: "Beginner" as const },
    { title: "Let's connect on LinkedIn.", hindi: "चलिए लिंक्डइन पर जुड़ते हैं।", subcategory: "Networking", difficulty: "Beginner" as const },
    { title: "I'd love to learn more about your work.", hindi: "मैं आपके काम के बारे में और जानना चाहूंगा।", subcategory: "Networking", difficulty: "Intermediate" as const },
    { title: "We should catch up over coffee sometime.", hindi: "हमें कभी कॉफी पर मिलना चाहिए।", subcategory: "Networking", difficulty: "Intermediate" as const },
    { title: "It was nice talking to you.", hindi: "आपसे बात करके अच्छा लगा।", subcategory: "Networking", difficulty: "Beginner" as const },
    { title: "I'll send you an email to follow up.", hindi: "मैं आपको फॉलो अप के लिए ईमेल भेजूंगा।", subcategory: "Networking", difficulty: "Intermediate" as const },

    // Performance Reviews
    { title: "You've exceeded expectations this quarter.", hindi: "इस तिमाही आपने उम्मीदों से बढ़कर प्रदर्शन किया है।", subcategory: "Performance", difficulty: "Advanced" as const },
    { title: "I'd like to discuss your career goals.", hindi: "मैं आपके करियर लक्ष्यों पर चर्चा करना चाहूंगा।", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "What areas would you like to improve?", hindi: "आप किन क्षेत्रों में सुधार करना चाहेंगे?", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "Your contributions have been valuable.", hindi: "आपका योगदान मूल्यवान रहा है।", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "Let's set some goals for next quarter.", hindi: "अगली तिमाही के लिए कुछ लक्ष्य निर्धारित करें।", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "I'm impressed with your progress.", hindi: "मैं आपकी प्रगति से प्रभावित हूं।", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "This is an area for development.", hindi: "यह विकास का एक क्षेत्र है।", subcategory: "Performance", difficulty: "Advanced" as const },
    { title: "Your teamwork skills are excellent.", hindi: "आपकी टीमवर्क क्षमताएं उत्कृष्ट हैं।", subcategory: "Performance", difficulty: "Intermediate" as const },
    { title: "I recommend you for promotion.", hindi: "मैं आपकी पदोन्नति की सिफारिश करता हूं।", subcategory: "Performance", difficulty: "Advanced" as const },
    { title: "Let's schedule a follow-up meeting.", hindi: "चलिए फॉलो-अप मीटिंग का समय तय करें।", subcategory: "Performance", difficulty: "Beginner" as const },

    // Job Interviews
    { title: "Tell me about yourself.", hindi: "मुझे अपने बारे में बताइए।", subcategory: "Interviews", difficulty: "Beginner" as const },
    { title: "Why do you want this position?", hindi: "आप यह पद क्यों चाहते हैं?", subcategory: "Interviews", difficulty: "Intermediate" as const },
    { title: "What are your strengths?", hindi: "आपकी खूबियां क्या हैं?", subcategory: "Interviews", difficulty: "Intermediate" as const },
    { title: "Where do you see yourself in five years?", hindi: "आप खुद को पांच साल में कहां देखते हैं?", subcategory: "Interviews", difficulty: "Intermediate" as const },
    { title: "Why should we hire you?", hindi: "हम आपको क्यों नियुक्त करें?", subcategory: "Interviews", difficulty: "Advanced" as const },
    { title: "Do you have any questions for us?", hindi: "क्या आपके पास हमारे लिए कोई सवाल हैं?", subcategory: "Interviews", difficulty: "Beginner" as const },
    { title: "I'm a quick learner.", hindi: "मैं जल्दी सीखता हूं।", subcategory: "Interviews", difficulty: "Beginner" as const },
    { title: "I work well under pressure.", hindi: "मैं दबाव में अच्छा काम करता हूं।", subcategory: "Interviews", difficulty: "Intermediate" as const },
    { title: "I'm passionate about this industry.", hindi: "मैं इस उद्योग के प्रति उत्साही हूं।", subcategory: "Interviews", difficulty: "Intermediate" as const },
    { title: "Thank you for this opportunity.", hindi: "इस अवसर के लिए धन्यवाद।", subcategory: "Interviews", difficulty: "Beginner" as const },

    // Leadership
    { title: "I trust your judgment.", hindi: "मुझे आपके निर्णय पर भरोसा है।", subcategory: "Leadership", difficulty: "Intermediate" as const },
    { title: "Let's brainstorm some ideas.", hindi: "चलिए कुछ विचारों पर मंथन करें।", subcategory: "Leadership", difficulty: "Intermediate" as const },
    { title: "I value your input.", hindi: "मैं आपकी राय का सम्मान करता हूं।", subcategory: "Leadership", difficulty: "Intermediate" as const },
    { title: "Let's work together on this.", hindi: "चलिए इस पर साथ मिलकर काम करें।", subcategory: "Leadership", difficulty: "Beginner" as const },
    { title: "I have full confidence in our team.", hindi: "मुझे हमारी टीम पर पूरा भरोसा है।", subcategory: "Leadership", difficulty: "Intermediate" as const },
    { title: "Let's focus on solutions, not problems.", hindi: "समस्याओं पर नहीं, समाधानों पर ध्यान दें।", subcategory: "Leadership", difficulty: "Advanced" as const },
    { title: "I take responsibility for this.", hindi: "इसकी जिम्मेदारी मेरी है।", subcategory: "Leadership", difficulty: "Advanced" as const },
    { title: "Great job, team!", hindi: "बहुत बढ़िया, टीम!", subcategory: "Leadership", difficulty: "Beginner" as const },
    { title: "Let's celebrate this achievement.", hindi: "चलिए इस उपलब्धि का जश्न मनाएं।", subcategory: "Leadership", difficulty: "Beginner" as const },
    { title: "I'm here to support you.", hindi: "मैं आपका समर्थन करने के लिए यहां हूं।", subcategory: "Leadership", difficulty: "Intermediate" as const },

    // Remote Work
    { title: "Can you hear me clearly?", hindi: "क्या आप मुझे साफ सुन सकते हैं?", subcategory: "Remote Work", difficulty: "Beginner" as const },
    { title: "I'll share my screen now.", hindi: "अब मैं अपनी स्क्रीन साझा करूंगा।", subcategory: "Remote Work", difficulty: "Beginner" as const },
    { title: "The connection seems unstable.", hindi: "कनेक्शन अस्थिर लग रहा है।", subcategory: "Remote Work", difficulty: "Intermediate" as const },
    { title: "Let's switch to a different platform.", hindi: "चलिए अलग प्लेटफॉर्म पर चलते हैं।", subcategory: "Remote Work", difficulty: "Intermediate" as const },
    { title: "I'll send the recording later.", hindi: "मैं रिकॉर्डिंग बाद में भेजूंगा।", subcategory: "Remote Work", difficulty: "Beginner" as const },
    { title: "Please add it to the shared folder.", hindi: "कृपया इसे साझा फ़ोल्डर में जोड़ें।", subcategory: "Remote Work", difficulty: "Beginner" as const },
    { title: "I'm working from home today.", hindi: "आज मैं घर से काम कर रहा हूं।", subcategory: "Remote Work", difficulty: "Beginner" as const },
    { title: "What time zone are you in?", hindi: "आप किस समय क्षेत्र में हैं?", subcategory: "Remote Work", difficulty: "Intermediate" as const },
    { title: "Let's find a time that works for everyone.", hindi: "सबके लिए उपयुक्त समय खोजें।", subcategory: "Remote Work", difficulty: "Intermediate" as const },
    { title: "I'll update the online document.", hindi: "मैं ऑनलाइन दस्तावेज़ अपडेट करूंगा।", subcategory: "Remote Work", difficulty: "Beginner" as const },

    // Finance & Budgeting
    { title: "We need to cut costs.", hindi: "हमें खर्च कम करने होंगे।", subcategory: "Finance", difficulty: "Intermediate" as const },
    { title: "The budget has been approved.", hindi: "बजट मंजूर हो गया है।", subcategory: "Finance", difficulty: "Intermediate" as const },
    { title: "We're over budget this month.", hindi: "इस महीने हम बजट से ऊपर हैं।", subcategory: "Finance", difficulty: "Advanced" as const },
    { title: "Please submit your expense report.", hindi: "कृपया अपनी खर्च रिपोर्ट जमा करें।", subcategory: "Finance", difficulty: "Intermediate" as const },
    { title: "The revenue has increased by 20%.", hindi: "राजस्व में 20% की वृद्धि हुई है।", subcategory: "Finance", difficulty: "Advanced" as const },
    { title: "We need to reduce overhead costs.", hindi: "हमें ऊपरी खर्चों को कम करना होगा।", subcategory: "Finance", difficulty: "Advanced" as const },
    { title: "The quarterly results are positive.", hindi: "तिमाही परिणाम सकारात्मक हैं।", subcategory: "Finance", difficulty: "Intermediate" as const },
    { title: "Let's review the financial projections.", hindi: "वित्तीय अनुमानों की समीक्षा करें।", subcategory: "Finance", difficulty: "Advanced" as const },
    { title: "The investment has paid off.", hindi: "निवेश सफल रहा।", subcategory: "Finance", difficulty: "Intermediate" as const },
    { title: "We need to invoice the client.", hindi: "हमें क्लाइंट को बिल भेजना होगा।", subcategory: "Finance", difficulty: "Intermediate" as const },

    // Sales
    { title: "Would you like a demonstration?", hindi: "क्या आप डेमो देखना चाहेंगे?", subcategory: "Sales", difficulty: "Beginner" as const },
    { title: "This is our best-selling product.", hindi: "यह हमारा सबसे ज्यादा बिकने वाला उत्पाद है।", subcategory: "Sales", difficulty: "Beginner" as const },
    { title: "We offer a 30-day trial period.", hindi: "हम 30 दिन का ट्रायल देते हैं।", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "I can offer you a discount.", hindi: "मैं आपको छूट दे सकता हूं।", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "This solution will save you time.", hindi: "यह समाधान आपका समय बचाएगा।", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "When can you make a decision?", hindi: "आप कब निर्णय ले सकते हैं?", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "I'll send you a proposal.", hindi: "मैं आपको प्रस्ताव भेजूंगा।", subcategory: "Sales", difficulty: "Beginner" as const },
    { title: "What's your budget for this?", hindi: "इसके लिए आपका बजट क्या है?", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "We have excellent customer reviews.", hindi: "हमारी ग्राहक समीक्षाएं बहुत अच्छी हैं।", subcategory: "Sales", difficulty: "Intermediate" as const },
    { title: "Let me show you the features.", hindi: "मुझे आपको फीचर्स दिखाने दीजिए।", subcategory: "Sales", difficulty: "Beginner" as const },

    // Training & Development
    { title: "I'd like to sign up for the workshop.", hindi: "मैं कार्यशाला के लिए पंजीकरण करना चाहूंगा।", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "When is the next training session?", hindi: "अगला प्रशिक्षण सत्र कब है?", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "I'd like to improve my skills.", hindi: "मैं अपने कौशल में सुधार करना चाहूंगा।", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "The training was very helpful.", hindi: "प्रशिक्षण बहुत मददगार था।", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "Can I get a certificate?", hindi: "क्या मुझे प्रमाणपत्र मिल सकता है?", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "I learned a lot from this course.", hindi: "मैंने इस पाठ्यक्रम से बहुत कुछ सीखा।", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "Who is conducting the training?", hindi: "प्रशिक्षण कौन दे रहा है?", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "Is this training mandatory?", hindi: "क्या यह प्रशिक्षण अनिवार्य है?", subcategory: "Training", difficulty: "Intermediate" as const },
    { title: "I need more practice with this.", hindi: "मुझे इसमें और अभ्यास चाहिए।", subcategory: "Training", difficulty: "Beginner" as const },
    { title: "The online course is self-paced.", hindi: "ऑनलाइन कोर्स अपनी गति से है।", subcategory: "Training", difficulty: "Intermediate" as const },
];

// Vocabulary database
const extendedVocabulary: Record<string, Array<{ word: string, definition: string, hindi: string, pronunciation: string, example: string }>> = {
    "Customer Service": [
        { word: "Escalate", definition: "To raise an issue to a higher authority", hindi: "ऊपरी स्तर तक पहुंचाना", pronunciation: "/ˈeskəleɪt/", example: "Let me escalate this to my manager." },
        { word: "Resolution", definition: "A solution to a problem", hindi: "समाधान", pronunciation: "/ˌrezəˈluːʃən/", example: "We found a quick resolution." },
    ],
    "Networking": [
        { word: "Connection", definition: "A professional relationship", hindi: "संपर्क", pronunciation: "/kəˈnekʃən/", example: "Let's stay in connection." },
        { word: "Referral", definition: "A recommendation to someone else", hindi: "संदर्भ", pronunciation: "/rɪˈfɜːrəl/", example: "Can you give me a referral?" },
    ],
    "Performance": [
        { word: "KPI", definition: "Key Performance Indicator", hindi: "प्रमुख प्रदर्शन संकेतक", pronunciation: "/keɪ piː aɪ/", example: "Let's review the KPIs." },
        { word: "Feedback", definition: "Comments about performance", hindi: "प्रतिक्रिया", pronunciation: "/ˈfiːdbæk/", example: "I appreciate your feedback." },
    ],
    "Interviews": [
        { word: "Qualification", definition: "Skills or experience required", hindi: "योग्यता", pronunciation: "/ˌkwɒlɪfɪˈkeɪʃən/", example: "What are the qualifications?" },
        { word: "Resume", definition: "A summary of work experience", hindi: "बायोडाटा", pronunciation: "/ˈrezjumeɪ/", example: "Please send your resume." },
    ],
    "Leadership": [
        { word: "Vision", definition: "A clear idea of future goals", hindi: "दृष्टि", pronunciation: "/ˈvɪʒən/", example: "Our vision is to grow globally." },
        { word: "Strategy", definition: "A plan to achieve goals", hindi: "रणनीति", pronunciation: "/ˈstrætədʒi/", example: "Let's discuss the strategy." },
    ],
    "Remote Work": [
        { word: "Bandwidth", definition: "Capacity for work or internet speed", hindi: "क्षमता", pronunciation: "/ˈbændwɪdθ/", example: "Do you have bandwidth for this?" },
        { word: "Collaboration", definition: "Working together with others", hindi: "सहयोग", pronunciation: "/kəˌlæbəˈreɪʃən/", example: "This requires team collaboration." },
    ],
    "Finance": [
        { word: "Revenue", definition: "Income from sales", hindi: "राजस्व", pronunciation: "/ˈrevənjuː/", example: "Revenue has increased." },
        { word: "Expenditure", definition: "Money spent", hindi: "व्यय", pronunciation: "/ɪkˈspendɪtʃər/", example: "Track all expenditure." },
    ],
    "Sales": [
        { word: "Prospect", definition: "A potential customer", hindi: "संभावित ग्राहक", pronunciation: "/ˈprɒspekt/", example: "This is a good prospect." },
        { word: "Conversion", definition: "Turning leads into customers", hindi: "रूपांतरण", pronunciation: "/kənˈvɜːʃən/", example: "Our conversion rate is high." },
    ],
    "Training": [
        { word: "Curriculum", definition: "Course content plan", hindi: "पाठ्यक्रम", pronunciation: "/kəˈrɪkjʊləm/", example: "The curriculum is comprehensive." },
        { word: "Certification", definition: "Official document of completion", hindi: "प्रमाणन", pronunciation: "/ˌsɜːtɪfɪˈkeɪʃən/", example: "I earned my certification." },
    ],
};

function generateRichContent(topic: { title: string; hindi: string; subcategory: string; difficulty: string }): string {
    return `
# ${topic.title}

## 🎯 Learning Objective
Learn to use the phrase "${topic.title}" confidently in professional ${topic.subcategory.toLowerCase()} contexts.

---

## 📘 English Explanation

**Phrase:** ${topic.title}

This is a common ${topic.difficulty.toLowerCase()}-level business phrase used in ${topic.subcategory.toLowerCase()} situations.

### When to Use
Use this phrase during professional ${topic.subcategory.toLowerCase()} interactions to communicate clearly and professionally.

### Example Sentences
1. "${topic.title}"
2. "I often say, '${topic.title}' in meetings."
3. "A colleague mentioned: '${topic.title}'"

### Tips
- Maintain a professional tone
- Be clear and concise
- Practice with native speakers

---

## 📙 हिंदी व्याख्या

**वाक्य:** ${topic.hindi}

### कब उपयोग करें
पेशेवर ${topic.subcategory.toLowerCase()} स्थितियों में इस वाक्य का उपयोग करें।

### उदाहरण
- English: "${topic.title}"
- Hindi: "${topic.hindi}"

### याद रखें
${topic.difficulty === "Beginner" ? "यह एक आसान वाक्य है। इसे रोज़ाना अभ्यास करें।" : topic.difficulty === "Intermediate" ? "इस वाक्य को अलग-अलग स्थितियों में उपयोग करने का अभ्यास करें।" : "यह एक उन्नत वाक्य है। इसका उपयोग आत्मविश्वास से करें।"}

---

## 💡 Pro Tips
- Practice this phrase aloud daily
- Use it in real conversations when appropriate
- Record yourself and listen for pronunciation

---

## 📝 Practice Exercise
Try using this phrase in a role-play scenario related to ${topic.subcategory.toLowerCase()}.
`;
}

async function generateExtendedLessons() {
    const logFile = "extended_generation_log.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Extended Lesson Generation Log\n===============================\n\n");
    log(`Starting at: ${new Date().toISOString()}`);
    log(`Topics to generate: ${extendedTopics.length}\n`);

    try {
        const allLessons = await db.select().from(lessons);
        const existingTitles = new Set(allLessons.map(l => l.title));
        const maxOrder = Math.max(...allLessons.map(l => l.order), 0);
        let currentOrder = maxOrder + 1;
        let created = 0;
        let skipped = 0;

        log(`Current lesson count: ${allLessons.length}`);
        log(`Starting from order: ${currentOrder}\n`);

        for (const topic of extendedTopics) {
            if (existingTitles.has(topic.title)) {
                log(`[SKIP] "${topic.title}" already exists`);
                skipped++;
                continue;
            }

            try {
                const content = generateRichContent(topic);
                const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);

                const [lesson] = await db.insert(lessons).values({
                    title: topic.title,
                    hindiTitle: topic.hindi,
                    slug: slug,
                    description: `Learn to say "${topic.title}" in ${topic.subcategory.toLowerCase()} contexts.`,
                    hindiDescription: `${topic.subcategory} संदर्भों में "${topic.hindi}" कहना सीखें।`,
                    content: content,
                    difficulty: topic.difficulty,
                    category: "Business",
                    order: currentOrder++,
                    emojiTheme: "💼",
                    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                }).returning();

                // Add vocabulary
                const vocabList = extendedVocabulary[topic.subcategory] || [];
                for (const vocab of vocabList.slice(0, 2)) {
                    await db.insert(vocabulary).values({
                        lessonId: lesson.id,
                        word: vocab.word,
                        definition: vocab.definition,
                        hindiTranslation: vocab.hindi,
                        pronunciation: vocab.pronunciation,
                        example: vocab.example
                    });
                }

                created++;
                log(`[OK] Created: "${topic.title}" (ID: ${lesson.id})`);
            } catch (err) {
                log(`[ERROR] "${topic.title}": ${err}`);
            }
        }

        const finalCount = await db.select().from(lessons);

        log(`\n===============================`);
        log(`GENERATION COMPLETE`);
        log(`===============================`);
        log(`Created: ${created}`);
        log(`Skipped: ${skipped}`);
        log(`Total lessons now: ${finalCount.length}`);
        log(`Finished at: ${new Date().toISOString()}`);

        process.exit(0);
    } catch (error) {
        log(`[FATAL ERROR] ${error}`);
        process.exit(1);
    }
}

generateExtendedLessons();
