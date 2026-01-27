
import { db } from "../server/db";
import { lessons, vocabulary } from "@shared/schema";
import { LLMContentGenerator, GenerationOptions } from "./llm-content-generator";
import { ContentTemplates } from "./content-templates";
import fs from "fs";

/**
 * Comprehensive Business English Lesson Generator
 * Generates high-quality, educational content for Hindi speakers learning Business English
 */

// Curated list of essential Business English topics with Hindi translations
const businessTopics = [
    // Meetings
    { title: "I would like to schedule a meeting.", hindi: "मैं एक मीटिंग शेड्यूल करना चाहूंगा।", subcategory: "Meetings", difficulty: "Intermediate" as const },
    { title: "Can we reschedule the meeting?", hindi: "क्या हम मीटिंग को दोबारा शेड्यूल कर सकते हैं?", subcategory: "Meetings", difficulty: "Intermediate" as const },
    { title: "Let's start the meeting.", hindi: "आइए मीटिंग शुरू करें।", subcategory: "Meetings", difficulty: "Beginner" as const },
    { title: "What's on the agenda today?", hindi: "आज की कार्यसूची क्या है?", subcategory: "Meetings", difficulty: "Intermediate" as const },
    { title: "I'd like to add something to the agenda.", hindi: "मैं कार्यसूची में कुछ जोड़ना चाहूंगा।", subcategory: "Meetings", difficulty: "Intermediate" as const },
    { title: "Let's table this discussion for now.", hindi: "फिलहाल इस चर्चा को टाल देते हैं।", subcategory: "Meetings", difficulty: "Advanced" as const },
    { title: "Can everyone see the screen?", hindi: "क्या सभी स्क्रीन देख सकते हैं?", subcategory: "Meetings", difficulty: "Beginner" as const },
    { title: "Let me share my screen.", hindi: "मुझे अपनी स्क्रीन साझा करने दीजिए।", subcategory: "Meetings", difficulty: "Beginner" as const },
    { title: "You're on mute.", hindi: "आप म्यूट पर हैं।", subcategory: "Meetings", difficulty: "Beginner" as const },
    { title: "Please unmute yourself.", hindi: "कृपया अपना माइक चालू करें।", subcategory: "Meetings", difficulty: "Beginner" as const },

    // Emails
    { title: "Please find the attachment below.", hindi: "कृपया नीचे अटैचमेंट देखें।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "I am writing to follow up on our conversation.", hindi: "मैं हमारी बातचीत के बारे में फॉलो अप करने के लिए लिख रहा हूं।", subcategory: "Emails", difficulty: "Intermediate" as const },
    { title: "Thank you for your prompt response.", hindi: "आपकी त्वरित प्रतिक्रिया के लिए धन्यवाद।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "I apologize for the delayed response.", hindi: "देर से जवाब देने के लिए माफी चाहता हूं।", subcategory: "Emails", difficulty: "Intermediate" as const },
    { title: "Could you please clarify this point?", hindi: "क्या आप कृपया इस बिंदु को स्पष्ट कर सकते हैं?", subcategory: "Emails", difficulty: "Intermediate" as const },
    { title: "Please let me know if you have any questions.", hindi: "अगर आपके कोई सवाल हों तो बताएं।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "I look forward to hearing from you.", hindi: "आपकी प्रतिक्रिया की प्रतीक्षा है।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "Best regards.", hindi: "सादर।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "As per our discussion.", hindi: "हमारी चर्चा अनुसार।", subcategory: "Emails", difficulty: "Beginner" as const },
    { title: "For your reference.", hindi: "आपकी जानकारी के लिए।", subcategory: "Emails", difficulty: "Beginner" as const },

    // Telephone
    { title: "This is [Name] speaking.", hindi: "मैं [नाम] बोल रहा हूं।", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "May I speak to [Name]?", hindi: "क्या मैं [नाम] से बात कर सकता हूं?", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "I'm calling regarding your email.", hindi: "मैं आपके ईमेल के संबंध में कॉल कर रहा हूं।", subcategory: "Telephone", difficulty: "Intermediate" as const },
    { title: "Could you hold for a moment?", hindi: "क्या आप एक पल रुक सकते हैं?", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "I'll transfer you to the right department.", hindi: "मैं आपको सही विभाग में ट्रांसफर करता हूं।", subcategory: "Telephone", difficulty: "Intermediate" as const },
    { title: "Can I take a message?", hindi: "क्या मैं संदेश ले सकता हूं?", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "I'll call you back shortly.", hindi: "मैं आपको जल्द वापस कॉल करूंगा।", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "The line is busy.", hindi: "लाइन व्यस्त है।", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "Could you speak a bit louder?", hindi: "क्या आप थोड़ा जोर से बोल सकते हैं?", subcategory: "Telephone", difficulty: "Beginner" as const },
    { title: "I didn't catch that. Could you repeat?", hindi: "मुझे सुनाई नहीं दिया। क्या आप दोहरा सकते हैं?", subcategory: "Telephone", difficulty: "Intermediate" as const },

    // Negotiations
    { title: "We need to reach a compromise.", hindi: "हमें समझौता करना होगा।", subcategory: "Negotiations", difficulty: "Advanced" as const },
    { title: "Let me think about it.", hindi: "मुझे इस पर सोचने दीजिए।", subcategory: "Negotiations", difficulty: "Intermediate" as const },
    { title: "That's not acceptable.", hindi: "यह स्वीकार्य नहीं है।", subcategory: "Negotiations", difficulty: "Intermediate" as const },
    { title: "Can we meet halfway?", hindi: "क्या हम बीच का रास्ता निकाल सकते हैं?", subcategory: "Negotiations", difficulty: "Advanced" as const },
    { title: "What's your best offer?", hindi: "आपका सबसे अच्छा प्रस्ताव क्या है?", subcategory: "Negotiations", difficulty: "Intermediate" as const },
    { title: "We have a deal.", hindi: "सौदा तय।", subcategory: "Negotiations", difficulty: "Beginner" as const },
    { title: "I need to consult with my team.", hindi: "मुझे अपनी टीम से सलाह लेनी होगी।", subcategory: "Negotiations", difficulty: "Intermediate" as const },
    { title: "Let's put this in writing.", hindi: "इसे लिखित में रखते हैं।", subcategory: "Negotiations", difficulty: "Intermediate" as const },
    { title: "The terms are non-negotiable.", hindi: "शर्तें अंतिम हैं।", subcategory: "Negotiations", difficulty: "Advanced" as const },
    { title: "We can be flexible on this point.", hindi: "हम इस बिंदु पर लचीले हो सकते हैं।", subcategory: "Negotiations", difficulty: "Advanced" as const },

    // Presentations
    { title: "Let me give you an overview.", hindi: "मैं आपको सारांश देता हूं।", subcategory: "Presentations", difficulty: "Intermediate" as const },
    { title: "As you can see on this slide.", hindi: "जैसा कि आप इस स्लाइड पर देख सकते हैं।", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "Moving on to the next point.", hindi: "अब अगले बिंदु पर चलते हैं।", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "In conclusion.", hindi: "निष्कर्ष में।", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "Are there any questions?", hindi: "कोई सवाल?", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "Let me elaborate on that.", hindi: "मुझे उस पर विस्तार से बताने दीजिए।", subcategory: "Presentations", difficulty: "Intermediate" as const },
    { title: "The data shows that.", hindi: "डेटा दर्शाता है कि।", subcategory: "Presentations", difficulty: "Intermediate" as const },
    { title: "To summarize.", hindi: "संक्षेप में।", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "Thank you for your attention.", hindi: "आपके ध्यान के लिए धन्यवाद।", subcategory: "Presentations", difficulty: "Beginner" as const },
    { title: "I'll now take questions.", hindi: "अब मैं सवाल लूंगा।", subcategory: "Presentations", difficulty: "Beginner" as const },

    // Project Management
    { title: "We're behind schedule.", hindi: "हम समय सीमा से पीछे हैं।", subcategory: "Project Management", difficulty: "Intermediate" as const },
    { title: "We need to prioritize this task.", hindi: "हमें इस कार्य को प्राथमिकता देनी होगी।", subcategory: "Project Management", difficulty: "Intermediate" as const },
    { title: "What's the deadline?", hindi: "समय सीमा क्या है?", subcategory: "Project Management", difficulty: "Beginner" as const },
    { title: "Let's delegate this task.", hindi: "इस कार्य को बांट दें।", subcategory: "Project Management", difficulty: "Intermediate" as const },
    { title: "We need more resources.", hindi: "हमें और संसाधन चाहिए।", subcategory: "Project Management", difficulty: "Intermediate" as const },
    { title: "The project is on track.", hindi: "प्रोजेक्ट समय पर है।", subcategory: "Project Management", difficulty: "Beginner" as const },
    { title: "We need to reassess the budget.", hindi: "हमें बजट का पुनर्मूल्यांकन करना होगा।", subcategory: "Project Management", difficulty: "Advanced" as const },
    { title: "Let's have a status update.", hindi: "आइए स्थिति की जानकारी लें।", subcategory: "Project Management", difficulty: "Beginner" as const },
    { title: "We've hit a roadblock.", hindi: "हमें एक बाधा का सामना करना पड़ा।", subcategory: "Project Management", difficulty: "Advanced" as const },
    { title: "The milestone has been achieved.", hindi: "माइलस्टोन हासिल हो गया।", subcategory: "Project Management", difficulty: "Intermediate" as const },

    // General Business
    { title: "I appreciate your feedback.", hindi: "आपकी प्रतिक्रिया की सराहना करता हूं।", subcategory: "General", difficulty: "Beginner" as const },
    { title: "Let me get back to you on that.", hindi: "मुझे इस पर वापस आने दीजिए।", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "Could you elaborate on that?", hindi: "क्या आप इस पर विस्तार से बता सकते हैं?", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "I completely agree.", hindi: "मैं पूरी तरह सहमत हूं।", subcategory: "General", difficulty: "Beginner" as const },
    { title: "I see your point, but.", hindi: "मैं आपकी बात समझता हूं, लेकिन।", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "Let's take this offline.", hindi: "इसे अलग से चर्चा करते हैं।", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "We're on the same page.", hindi: "हम एक ही पेज पर हैं।", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "Let's circle back to this later.", hindi: "इस पर बाद में लौटते हैं।", subcategory: "General", difficulty: "Intermediate" as const },
    { title: "Going forward.", hindi: "आगे जाकर।", subcategory: "General", difficulty: "Beginner" as const },
    { title: "At the end of the day.", hindi: "अंत में।", subcategory: "General", difficulty: "Beginner" as const },
];

// Vocabulary database for Business English
const businessVocabulary: Record<string, Array<{ word: string, definition: string, hindi: string, pronunciation: string, example: string }>> = {
    "Meetings": [
        { word: "Agenda", definition: "A list of items to be discussed at a meeting", hindi: "कार्यसूची", pronunciation: "/əˈdʒendə/", example: "Let's review the agenda before we start." },
        { word: "Minutes", definition: "Written record of what was discussed", hindi: "कार्यवृत्त", pronunciation: "/ˈmɪnɪts/", example: "Please send the minutes to everyone." },
        { word: "Action items", definition: "Tasks to be completed after a meeting", hindi: "कार्य सूची", pronunciation: "/ˈækʃən ˈaɪtəmz/", example: "Let's go over the action items." },
        { word: "Stakeholder", definition: "A person with an interest in a project", hindi: "हितधारक", pronunciation: "/ˈsteɪkhəʊldər/", example: "All stakeholders must approve the plan." },
    ],
    "Emails": [
        { word: "Attachment", definition: "A file sent with an email", hindi: "संलग्नक", pronunciation: "/əˈtætʃmənt/", example: "Please see the attachment." },
        { word: "CC (Carbon Copy)", definition: "Sending a copy of email to others", hindi: "प्रतिलिपि", pronunciation: "/ˌsiːˈsiː/", example: "Please CC me on the email." },
        { word: "Forward", definition: "To send a received email to someone else", hindi: "अग्रेषित करना", pronunciation: "/ˈfɔːwəd/", example: "I'll forward you the details." },
        { word: "Subject line", definition: "The title of an email", hindi: "विषय पंक्ति", pronunciation: "/ˈsʌbdʒekt laɪn/", example: "Keep the subject line clear." },
    ],
    "Telephone": [
        { word: "Hold", definition: "To wait on the phone", hindi: "प्रतीक्षा करना", pronunciation: "/həʊld/", example: "Can you hold for a moment?" },
        { word: "Transfer", definition: "To redirect a call", hindi: "स्थानांतरित करना", pronunciation: "/trænsˈfɜː/", example: "I'll transfer you now." },
        { word: "Extension", definition: "Internal phone code", hindi: "विस्तार नंबर", pronunciation: "/ɪkˈstenʃən/", example: "What's your extension?" },
        { word: "Voicemail", definition: "Recorded phone message", hindi: "वॉइसमेल", pronunciation: "/ˈvɔɪsmeɪl/", example: "Please leave a voicemail." },
    ],
    "Negotiations": [
        { word: "Compromise", definition: "Agreement through mutual concession", hindi: "समझौता", pronunciation: "/ˈkɒmprəmaɪz/", example: "We need to find a compromise." },
        { word: "Terms", definition: "Conditions of an agreement", hindi: "शर्तें", pronunciation: "/tɜːmz/", example: "Let's discuss the terms." },
        { word: "Counter-offer", definition: "A response to an initial offer", hindi: "प्रति-प्रस्ताव", pronunciation: "/ˈkaʊntər ˈɒfə/", example: "Here's our counter-offer." },
        { word: "Leverage", definition: "Advantage in negotiation", hindi: "लाभ", pronunciation: "/ˈlevərɪdʒ/", example: "We have leverage in this deal." },
    ],
    "Presentations": [
        { word: "Slide", definition: "A page in a presentation", hindi: "स्लाइड", pronunciation: "/slaɪd/", example: "Let's move to the next slide." },
        { word: "Key takeaway", definition: "Main point to remember", hindi: "मुख्य बिंदु", pronunciation: "/kiː ˈteɪkəweɪ/", example: "The key takeaway is..." },
        { word: "Visual aid", definition: "Chart or image to help explain", hindi: "दृश्य सहायता", pronunciation: "/ˈvɪʒuəl eɪd/", example: "This visual aid shows..." },
        { word: "Q&A", definition: "Question and answer session", hindi: "प्रश्नोत्तर", pronunciation: "/ˌkjuːənˈeɪ/", example: "We'll have Q&A at the end." },
    ],
    "Project Management": [
        { word: "Deadline", definition: "The final date for completion", hindi: "समय सीमा", pronunciation: "/ˈdedlaɪn/", example: "The deadline is Friday." },
        { word: "Milestone", definition: "A significant point in a project", hindi: "मील का पत्थर", pronunciation: "/ˈmaɪlstəʊn/", example: "We've reached a milestone." },
        { word: "Deliverable", definition: "Something to be completed", hindi: "वितरण योग्य", pronunciation: "/dɪˈlɪvərəbl/", example: "What are the deliverables?" },
        { word: "Scope", definition: "The extent of work", hindi: "दायरा", pronunciation: "/skəʊp/", example: "Let's define the scope." },
    ],
    "General": [
        { word: "Synergy", definition: "Combined effect greater than parts", hindi: "तालमेल", pronunciation: "/ˈsɪnədʒi/", example: "Let's create synergy." },
        { word: "Scalable", definition: "Able to grow or expand", hindi: "स्केलेबल", pronunciation: "/ˈskeɪləbl/", example: "The solution must be scalable." },
        { word: "ROI", definition: "Return on Investment", hindi: "निवेश पर लाभ", pronunciation: "/ˌɑːr əʊ ˈaɪ/", example: "What's the ROI?" },
        { word: "KPI", definition: "Key Performance Indicator", hindi: "प्रमुख प्रदर्शन संकेतक", pronunciation: "/ˌkeɪ piː ˈaɪ/", example: "Let's review the KPIs." },
    ],
};

function generateRichContent(topic: typeof businessTopics[0]): string {
    const subcategory = topic.subcategory;
    const vocabList = businessVocabulary[subcategory] || businessVocabulary["General"];

    return `
# ${topic.title}

## 🎯 Learning Objective
Learn to use the phrase "${topic.title}" confidently in professional settings.

---

## 📘 English Explanation

**Phrase:** ${topic.title}

This is a common ${topic.difficulty.toLowerCase()}-level business phrase used in ${subcategory.toLowerCase()} contexts.

### When to Use
${getUsageContext(topic.subcategory)}

### Structure & Grammar
${getGrammarExplanation(topic.title)}

### Example Sentences
${generateExampleSentences(topic.title)}

### Similar Phrases
${getSimilarPhrases(topic.subcategory)}

---

## 📙 हिंदी व्याख्या

**वाक्य:** ${topic.hindi}

### कब उपयोग करें
${getHindiUsageContext(topic.subcategory)}

### उदाहरण
${generateHindiExamples(topic.title, topic.hindi)}

### याद रखें
${getHindiTips(topic.difficulty)}

---

## 💡 Pro Tips

${getProTips(topic.subcategory)}

---

## 📝 Practice Exercise

Try using this phrase in the following scenario:
${getPracticeScenario(topic.subcategory)}
`;
}

function getUsageContext(subcategory: string): string {
    const contexts: Record<string, string> = {
        "Meetings": "Use this phrase during team meetings, video calls, or conference calls when discussing schedules, agendas, or action items.",
        "Emails": "Use this phrase in professional emails to clients, colleagues, or stakeholders. It adds a formal and polite tone to your communication.",
        "Telephone": "Use this phrase during business phone calls. It helps maintain professionalism and clarity in verbal communication.",
        "Negotiations": "Use this phrase during business negotiations, contract discussions, or when reaching agreements with partners or clients.",
        "Presentations": "Use this phrase when delivering presentations, pitches, or training sessions to maintain flow and engage your audience.",
        "Project Management": "Use this phrase in project discussions, status updates, or when coordinating with team members on deliverables.",
        "General": "Use this phrase in various professional situations to sound polished and business-savvy.",
    };
    return contexts[subcategory] || contexts["General"];
}

function getGrammarExplanation(title: string): string {
    if (title.includes("I would like")) {
        return "**Structure:** 'I would like to' + verb (infinitive)\n\n'Would like' is a polite way to express a wish or desire. It's more formal than 'want.'";
    }
    if (title.includes("Could you")) {
        return "**Structure:** 'Could you' + verb (base form) + '?'\n\nThis is a polite request form. 'Could' makes the request softer than 'can.'";
    }
    if (title.includes("Can we")) {
        return "**Structure:** 'Can we' + verb (base form) + '?'\n\nThis is used for suggestions or requests involving both parties.";
    }
    if (title.includes("Let's")) {
        return "**Structure:** 'Let's' + verb (base form)\n\n'Let's' is a contraction of 'let us' and is used to make suggestions.";
    }
    if (title.includes("I'm")) {
        return "**Structure:** 'I'm' + verb(-ing)\n\n'I'm' is a contraction of 'I am' and is used with present continuous tense.";
    }
    return "This phrase follows standard English word order: Subject + Verb + Object/Complement.";
}

function generateExampleSentences(title: string): string {
    return `
1. "${title}"
2. "As discussed earlier, ${title.toLowerCase()}"
3. "I mentioned that ${title.toLowerCase()}"
`;
}

function getSimilarPhrases(subcategory: string): string {
    const similar: Record<string, string> = {
        "Meetings": "- 'Can we set up a call?'\n- 'I'd like to arrange a meeting.'\n- 'Let's sync up on this.'",
        "Emails": "- 'Attached please find...'\n- 'I'm reaching out regarding...'\n- 'As per my previous email...'",
        "Telephone": "- 'I'm returning your call.'\n- 'Is this a good time to talk?'\n- 'I'll get back to you.'",
        "Negotiations": "- 'We're willing to negotiate.'\n- 'Let's discuss the terms.'\n- 'Can we work something out?'",
        "Presentations": "- 'Let me walk you through...'\n- 'I'd like to highlight...'\n- 'Let's dive into the details.'",
        "Project Management": "- 'We need to reprioritize.'\n- 'Let's adjust the timeline.'\n- 'We're making good progress.'",
        "General": "- 'Let me know your thoughts.'\n- 'I'd appreciate your input.'\n- 'Let's touch base soon.'",
    };
    return similar[subcategory] || similar["General"];
}

function getHindiUsageContext(subcategory: string): string {
    const contexts: Record<string, string> = {
        "Meetings": "इस वाक्य का उपयोग टीम मीटिंग, वीडियो कॉल, या कॉन्फ्रेंस कॉल के दौरान करें।",
        "Emails": "इस वाक्य का उपयोग पेशेवर ईमेल में करें। यह आपके संचार को औपचारिक और विनम्र बनाता है।",
        "Telephone": "इस वाक्य का उपयोग बिजनेस फोन कॉल के दौरान करें।",
        "Negotiations": "इस वाक्य का उपयोग व्यापारिक बातचीत या समझौते के दौरान करें।",
        "Presentations": "इस वाक्य का उपयोग प्रस्तुतियां देते समय करें।",
        "Project Management": "इस वाक्य का उपयोग प्रोजेक्ट चर्चाओं में करें।",
        "General": "इस वाक्य का उपयोग विभिन्न पेशेवर स्थितियों में करें।",
    };
    return contexts[subcategory] || contexts["General"];
}

function generateHindiExamples(title: string, hindi: string): string {
    return `
- English: "${title}"
  हिंदी: "${hindi}"
  
- इस वाक्य का प्रयोग करके आप पेशेवर लगेंगे।
`;
}

function getHindiTips(difficulty: string): string {
    if (difficulty === "Beginner") {
        return "यह एक आसान वाक्य है। इसे रोज़ाना अभ्यास करें।";
    }
    if (difficulty === "Intermediate") {
        return "इस वाक्य को अलग-अलग स्थितियों में उपयोग करने का अभ्यास करें।";
    }
    return "यह एक उन्नत वाक्य है। इसका उपयोग तब करें जब आप आत्मविश्वास महसूस करें।";
}

function getProTips(subcategory: string): string {
    const tips: Record<string, string> = {
        "Meetings": "- Always prepare an agenda before meetings\n- Start and end on time\n- Follow up with meeting minutes",
        "Emails": "- Keep emails concise and professional\n- Use clear subject lines\n- Always proofread before sending",
        "Telephone": "- Smile while speaking - it affects your tone\n- Have pen and paper ready\n- Confirm important details in writing",
        "Negotiations": "- Do your research beforehand\n- Listen more than you speak\n- Be prepared to walk away if needed",
        "Presentations": "- Practice your delivery\n- Know your audience\n- Prepare for questions",
        "Project Management": "- Break tasks into smaller chunks\n- Communicate updates regularly\n- Document everything",
        "General": "- Be professional but personable\n- Use active listening\n- Follow up on commitments",
    };
    return tips[subcategory] || tips["General"];
}

function getPracticeScenario(subcategory: string): string {
    const scenarios: Record<string, string> = {
        "Meetings": "Imagine you're a project manager and need to gather your team for a weekly update. Practice scheduling the meeting.",
        "Emails": "Write a professional email to a client following up on a proposal you sent last week.",
        "Telephone": "Role-play a call where you need to speak with someone who isn't available.",
        "Negotiations": "Practice negotiating a project deadline with a demanding client.",
        "Presentations": "Prepare a 2-minute opening for a presentation about your company's services.",
        "Project Management": "Discuss a project status update with your team lead.",
        "General": "Participate in a casual but professional conversation with a new colleague.",
    };
    return scenarios[subcategory] || scenarios["General"];
}

async function generateQualityBusinessLessons() {
    const logFile = "generation_log.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Business Lesson Generation Log\n==============================\n\n");
    log(`Starting at: ${new Date().toISOString()}`);
    log(`Topics to generate: ${businessTopics.length}\n`);

    try {
        // Get current max order
        const allLessons = await db.select().from(lessons);
        const maxOrder = Math.max(...allLessons.map(l => l.order), 0);
        let currentOrder = maxOrder + 1;
        let created = 0;
        let failed = 0;

        log(`Current lesson count: ${allLessons.length}`);
        log(`Starting from order: ${currentOrder}\n`);

        for (const topic of businessTopics) {
            try {
                const content = generateRichContent(topic);
                const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);

                // Check if lesson already exists
                const existing = allLessons.find(l => l.title === topic.title);
                if (existing) {
                    log(`[SKIP] "${topic.title}" already exists (ID: ${existing.id})`);
                    continue;
                }

                const [lesson] = await db.insert(lessons).values({
                    title: topic.title,
                    hindiTitle: topic.hindi,
                    slug: slug,
                    description: `Learn to say "${topic.title}" in business contexts.`,
                    hindiDescription: `व्यापारिक संदर्भों में "${topic.hindi}" कहना सीखें।`,
                    content: content,
                    difficulty: topic.difficulty,
                    category: "Business",
                    order: currentOrder++,
                    emojiTheme: "💼",
                    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
                }).returning();

                // Add vocabulary for this lesson
                const vocabList = businessVocabulary[topic.subcategory] || businessVocabulary["General"];
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
                log(`[OK] Created: "${topic.title}" (ID: ${lesson.id}, Order: ${lesson.order})`);

            } catch (err) {
                failed++;
                log(`[ERROR] Failed to create "${topic.title}": ${err}`);
            }
        }

        // Final count
        const finalLessons = await db.select().from(lessons);

        log(`\n==============================`);
        log(`GENERATION COMPLETE`);
        log(`==============================`);
        log(`Created: ${created} lessons`);
        log(`Skipped: ${businessTopics.length - created - failed} (already exist)`);
        log(`Failed: ${failed}`);
        log(`Total lessons now: ${finalLessons.length}`);
        log(`Finished at: ${new Date().toISOString()}`);

        process.exit(0);
    } catch (error) {
        log(`\n[FATAL ERROR] ${error}`);
        process.exit(1);
    }
}

generateQualityBusinessLessons();
