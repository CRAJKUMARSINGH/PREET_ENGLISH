import { storage } from "../server/storage";

// Function to create advanced grammar lessons
async function createAdvancedGrammarLessons() {
  console.log("Creating advanced grammar lessons...");
  
  // Conditional Tenses Lesson
  const conditionalLesson = await storage.createLesson({
    title: "Conditional Tenses",
    slug: "conditional-tenses",
    description: "Master conditional tenses in English with detailed Hindi explanations.",
    content: `# Conditional Tenses in English

## Zero Conditional
Structure: If + simple present, simple present
Use: For scientific facts and general truths

Example:
- If you heat water, it boils.
- अगर आप पानी गर्म करते हैं, तो वह उबलता है।

## First Conditional
Structure: If + simple present, will + verb
Use: For real possible situations in the future

Example:
- If it rains, I will stay home.
- अगर बारिश होती है, तो मैं घर पर रहूंगा।

## Second Conditional
Structure: If + simple past, would + verb
Use: For unreal or imaginary situations

Example:
- If I had money, I would travel the world.
- अगर मेरे पास पैसा होता, तो मैं दुनिया का सफर करता।

## Third Conditional
Structure: If + past perfect, would have + past participle
Use: For past situations that did not happen

Example:
- If I had studied harder, I would have passed the exam.
- अगर मैं मेहनत करता, तो मैं परीक्षा पास कर लेता।`,
    hindiTitle: "शर्त संबंधी काल",
    hindiDescription: "अंग्रेजी में शर्त संबंधी काल सीखें और हिंदी में व्याख्या के साथ समझें।",
    difficulty: "Advanced",
    order: 10,
    category: "Grammar",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
  });

  // Add vocabulary for conditional tenses
  const conditionalsVocab = [
    { word: "Conditional", definition: "Relating to a condition or hypothesis", hindiTranslation: "शर्त संबंधी", example: "Conditional tenses are used to express hypothetical situations.", exampleHindi: "काल्पनिक स्थितियों को व्यक्त करने के लिए शर्त संबंधी काल का उपयोग किया जाता है।" },
    { word: "Hypothetical", definition: "Based on a suggested idea; uncertain", hindiTranslation: "काल्पनिक", example: "It's a hypothetical situation.", exampleHindi: "यह एक काल्पनिक स्थिति है।" },
    { word: "Realistic", definition: "Having a practical approach", hindiTranslation: "व्यावहारिक", example: "His plan is quite realistic.", exampleHindi: "उसकी योजना काफी व्यावहारिक है।" },
    { word: "Unreal", definition: "Not real or imaginary", hindiTranslation: "अवास्तविक", example: "This is an unreal situation.", exampleHindi: "यह एक अवास्तविक स्थिति है।" },
    { word: "Situation", definition: "A set of circumstances", hindiTranslation: "परिस्थिति", example: "The situation is under control.", exampleHindi: "परिस्थिति नियंत्रण में है।" },
    { word: "Condition", definition: "A requirement or prerequisite", hindiTranslation: "शर्त", example: "On condition that you help me.", exampleHindi: "इस शर्त पर कि आप मेरी मदद करेंगे।" },
    { word: "Clause", definition: "A group of words containing a subject and predicate", hindiTranslation: "उपवाक्य", example: "An if-clause is used in conditionals.", exampleHindi: "शर्तों में अगर-उपवाक्य का उपयोग किया जाता है।" },
    { word: "Tense", definition: "A form of verb indicating time", hindiTranslation: "काल", example: "Present tense indicates present time.", exampleHindi: "वर्तमान काल वर्तमान समय को इंगित करता है।" },
    { word: "Past perfect", definition: "Had + past participle", hindiTranslation: "पूर्ण भूतकाल", example: "She had gone before I arrived.", exampleHindi: "मैं आने से पहले वह चली गई थी।" },
    { word: "Future possibility", definition: "Likely events in the future", hindiTranslation: "भविष्य की संभावना", example: "There's a future possibility of rain.", exampleHindi: "बारिश की भविष्य की संभावना है।" },
    { word: "Imaginary", definition: "Not real; existing only in imagination", hindiTranslation: "काल्पनिक", example: "These are imaginary fears.", exampleHindi: "ये काल्पनिक डर हैं।" },
    { word: "Fact", definition: "A thing that is known to be true", hindiTranslation: "तथ्य", example: "This is a proven fact.", exampleHindi: "यह एक सिद्ध तथ्य है।" },
    { word: "Truth", definition: "The quality of being true", hindiTranslation: "सच्चाई", example: "Always speak the truth.", exampleHindi: "हमेशा सच बोलें।" },
    { word: "Possibility", definition: "The fact of being possible", hindiTranslation: "संभावना", example: "There's a possibility of promotion.", exampleHindi: "पदोन्नति की संभावना है।" },
    { word: "Probability", definition: "The extent to which something is probable", hindiTranslation: "संभाव्यता", example: "High probability of success.", exampleHindi: "सफलता की उच्च संभाव्यता।" }
  ];

  for (const vocab of conditionalsVocab) {
    await storage.createVocabulary({
      lessonId: conditionalLesson.id,
      word: vocab.word,
      definition: vocab.definition,
      hindiTranslation: vocab.hindiTranslation,
      example: vocab.example,
      exampleHindi: vocab.exampleHindi
    });
  }

  // Create quiz for conditional tenses
  const conditionalQuiz = await storage.createQuiz({
    title: "Conditional Tenses Quiz",
    titleHindi: "शर्त संबंधी काल प्रश्नोत्तरी",
    description: "Test your knowledge of conditional tenses",
    difficulty: "Advanced",
    category: "Grammar",
    passingScore: 70,
    timeLimit: 15,
    order: 10,
    lessonId: conditionalLesson.id
  });

  const conditionalQuestions = [
    {
      questionText: "Which conditional is used for general truths?",
      questionTextHindi: "सामान्य सच्चाइयों के लिए कौन सा शर्त संबंधी काल का उपयोग किया जाता है?",
      questionType: "multiple_choice",
      options: JSON.stringify(["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"]),
      correctAnswer: "Zero Conditional",
      explanation: "Zero conditional is used for general truths and scientific facts.",
      points: 10,
      order: 1
    },
    {
      questionText: "Complete the sentence: If I ______ rich, I would travel the world.",
      questionTextHindi: "वाक्य पूरा करें: अगर मैं ______ अमीर होता, तो मैं दुनिया का सफर करता।",
      questionType: "fill_blank",
      options: JSON.stringify(["am", "was", "were", "will be"]),
      correctAnswer: "were",
      explanation: "Second conditional uses 'were' for all subjects.",
      points: 10,
      order: 2
    },
    {
      questionText: "What is the structure of third conditional?",
      questionTextHindi: "तृतीय शर्त का संरचना क्या है?",
      questionType: "multiple_choice",
      options: JSON.stringify([
        "If + simple present, will + verb",
        "If + simple past, would + verb", 
        "If + past perfect, would have + past participle",
        "If + present continuous, will be + verb+ing"
      ]),
      correctAnswer: "If + past perfect, would have + past participle",
      explanation: "Third conditional is used to talk about past situations that did not happen.",
      points: 10,
      order: 3
    }
  ];

  for (const question of conditionalQuestions) {
    await storage.createQuizQuestion({
      quizId: conditionalQuiz.id,
      questionText: question.questionText,
      questionTextHindi: question.questionTextHindi,
      questionType: question.questionType,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      points: question.points,
      order: question.order
    });
  }

  console.log("Conditional tenses lesson created successfully!");

  // Passive Voice Lesson
  const passiveLesson = await storage.createLesson({
    title: "Passive Voice",
    slug: "passive-voice",
    description: "Learn how to form and use passive voice in English with Hindi explanations.",
    content: `# Passive Voice in English

## Structure
Subject + be + past participle + (by agent)

## When to Use
- When the doer is unknown or unimportant
- To emphasize the receiver of the action
- In formal writing

## Examples

Active: The chef cooks the meal.
Passive: The meal is cooked by the chef.

Active: Someone built this house in 1990.
Passive: This house was built in 1990.

## Hindi Explanation
पैसिव वॉइस का उपयोग तब किया जाता है जब हम एक्शन के बारे में बात करना चाहते हैं लेकिन एक्शन करने वाले के बारे में नहीं।

## Tenses in Passive Voice

Present Simple: am/is/are + past participle
- The letter is written by him.

Past Simple: was/were + past participle
- The letter was written by him.

Present Continuous: am/is/are being + past participle
- The letter is being written by him.

Past Continuous: was/were being + past participle
- The letter was being written by him.

Present Perfect: has/have been + past participle
- The letter has been written by him.`,
    hindiTitle: "अकर्मक वाच्य",
    hindiDescription: "अंग्रेजी में अकर्मक वाच्य का निर्माण और उपयोग सीखें और हिंदी में व्याख्या के साथ समझें।",
    difficulty: "Advanced",
    order: 11,
    category: "Grammar",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
  });

  // Add vocabulary for passive voice
  const passiveVocab = [
    { word: "Passive", definition: "Receiving action rather than performing it", hindiTranslation: "अकर्मक", example: "The passive voice emphasizes the receiver.", exampleHindi: "अकर्मक वाच्य प्रभावित व्यक्ति पर जोर देता है।" },
    { word: "Active", definition: "Performing the action", hindiTranslation: "कर्मक", example: "The active voice emphasizes the doer.", exampleHindi: "कर्मक वाच्य कर्ता पर जोर देता है।" },
    { word: "Agent", definition: "The doer of the action", hindiTranslation: "कर्ता", example: "The agent performs the action.", exampleHindi: "कर्ता कार्य करता है।" },
    { word: "Receiver", definition: "The one who receives the action", hindiTranslation: "प्रभावित व्यक्ति", example: "The receiver gets affected by the action.", exampleHindi: "प्रभावित व्यक्ति कार्य से प्रभावित होता है।" },
    { word: "Tense", definition: "A form of verb indicating time", hindiTranslation: "काल", example: "Different tenses have different passive forms.", exampleHindi: "विभिन्न कालों के अलग-अलग अकर्मक रूप होते हैं।" },
    { word: "Participle", definition: "A verb form used as an adjective", hindiTranslation: "विशेषण", example: "The past participle is used in passive voice.", exampleHindi: "अकर्मक वाच्य में भूतकृदंत उपयोग किया जाता है।" },
    { word: "Structure", definition: "The arrangement of parts", hindiTranslation: "संरचना", example: "Every passive sentence has a specific structure.", exampleHindi: "प्रत्येक अकर्मक वाक्य की एक विशिष्ट संरचना होती है।" },
    { word: "Emphasis", definition: "Special importance placed on something", hindiTranslation: "जोर", example: "Passive voice gives emphasis to the receiver.", exampleHindi: "अकर्मक वाच्य प्रभावित व्यक्ति पर जोर देता है।" },
    { word: "Formal", definition: "Following conventional rules", hindiTranslation: "औपचारिक", example: "Passive voice is common in formal writing.", exampleHindi: "औपचारिक लेखन में अकर्मक वाच्य आम है।" },
    { word: "Unknown", definition: "Not known or familiar", hindiTranslation: "अज्ञात", example: "Use passive when the doer is unknown.", exampleHindi: "कर्ता अज्ञात होने पर अकर्मक का उपयोग करें।" },
    { word: "Importance", definition: "The quality of being significant", hindiTranslation: "महत्व", example: "Sometimes the doer is not important.", exampleHindi: "कभी-कभी कर्ता का महत्व नहीं होता।" },
    { word: "Action", definition: "The fact of doing something", hindiTranslation: "कार्य", example: "Passive voice focuses on the action received.", exampleHindi: "अकर्मक वाच्य प्राप्त कार्य पर ध्यान केंद्रित करता है।" },
    { word: "Writing", definition: "The activity of marking coherent words", hindiTranslation: "लेखन", example: "Academic writing often uses passive voice.", exampleHindi: "शैक्षिक लेखन में अक्सर अकर्मक वाच्य का उपयोग किया जाता है।" },
    { word: "Form", definition: "The particular type of construction of a word", hindiTranslation: "रूप", example: "Each tense has its passive form.", exampleHindi: "प्रत्येक काल का अपना अकर्मक रूप होता है।" },
    { word: "Sentence", definition: "A grammatically complete series of words", hindiTranslation: "वाक्य", example: "A passive sentence has a specific structure.", exampleHindi: "एक अकर्मक वाक्य की एक विशिष्ट संरचना होती है।" }
  ];

  for (const vocab of passiveVocab) {
    await storage.createVocabulary({
      lessonId: passiveLesson.id,
      word: vocab.word,
      definition: vocab.definition,
      hindiTranslation: vocab.hindiTranslation,
      example: vocab.example,
      exampleHindi: vocab.exampleHindi
    });
  }

  console.log("Passive voice lesson created successfully!");

  // Reported Speech Lesson
  const reportedLesson = await storage.createLesson({
    title: "Reported Speech",
    slug: "reported-speech",
    description: "Master reported speech (indirect speech) with Hindi explanations.",
    content: `# Reported Speech in English

## Definition
Reported speech is when we say what someone said without using their exact words.

## Direct vs Indirect Speech

Direct: She said, "I am tired."
Indirect: She said that she was tired.

## Changes in Reported Speech

### Verb Tense Changes
- Present → Past
- Past → Past Perfect
- Will → Would
- Can → Could
- May → Might

### Time Expression Changes
- Today → That day
- Yesterday → The day before
- Tomorrow → The next day
- Now → Then
- Here → There

### Pronoun Changes
- I → He/She
- My → His/Her
- Me → Him/Her

## Examples

Direct: "I live in Mumbai," he said.
Reported: He said that he lived in Mumbai.

Direct: "I will come tomorrow," she said.
Reported: She said that she would come the next day.

## Hindi Explanation
रिपोर्टेड स्पीच में हम किसी के कहे हुए को उद्धरण चिह्नों के बिना बताते हैं। इसमें समय, स्थान और सर्वनामों में परिवर्तन होता है।`,
    hindiTitle: "वर्णित वाचन",
    hindiDescription: "हिंदी स्पष्टीकरण के साथ रिपोर्टेड स्पीच (अप्रत्यक्ष वाचन) का अध्ययन करें।",
    difficulty: "Advanced",
    order: 12,
    category: "Grammar",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
  });

  // Add vocabulary for reported speech
  const reportedVocab = [
    { word: "Reported", definition: "Expressing indirectly what someone said", hindiTranslation: "वर्णित", example: "Reported speech is indirect speech.", exampleHindi: "रिपोर्टेड स्पीच अप्रत्यक्ष वाचन है।" },
    { word: "Direct", definition: "Exact words without change", hindiTranslation: "प्रत्यक्ष", example: "Direct speech uses exact words.", exampleHindi: "प्रत्यक्ष वाचन में सटीक शब्दों का उपयोग होता है।" },
    { word: "Indirect", definition: "Paraphrased version of someone's words", hindiTranslation: "अप्रत्यक्ष", example: "Indirect speech paraphrases the original.", exampleHindi: "अप्रत्यक्ष वाचन मूल का पुनर्कथन करता है।" },
    { word: "Tense", definition: "A form of verb indicating time", hindiTranslation: "काल", example: "Tenses change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में काल बदल जाते हैं।" },
    { word: "Change", definition: "To make different", hindiTranslation: "परिवर्तन", example: "Several changes occur in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में कई परिवर्तन होते हैं।" },
    { word: "Pronoun", definition: "A word replacing a noun", hindiTranslation: "सर्वनाम", example: "Pronouns change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में सर्वनाम बदल जाते हैं।" },
    { word: "Expression", definition: "A word or phrase conveying meaning", hindiTranslation: "अभिव्यक्ति", example: "Time expressions change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में समय अभिव्यक्तियां बदल जाती हैं।" },
    { word: "Verb", definition: "A word expressing action or state", hindiTranslation: "क्रिया", example: "Verbs change tense in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में क्रियाएं काल बदल जाती हैं।" },
    { word: "Quotation", definition: "Words reproduced exactly", hindiTranslation: "उद्धरण", example: "Direct speech uses quotation marks.", exampleHindi: "प्रत्यक्ष वाचन में उद्धरण चिह्नों का उपयोग होता है।" },
    { word: "Narrate", definition: "To tell a story or account", hindiTranslation: "कहना", example: "Reported speech narrates what was said.", exampleHindi: "रिपोर्टेड स्पीच कहा गया बताता है।" },
    { word: "Sequence", definition: "A particular order in which related things follow each other", hindiTranslation: "क्रम", example: "Tense sequence changes in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में काल क्रम बदल जाता है।" },
    { word: "Statement", definition: "A definite or clear expression of something", hindiTranslation: "विवरण", example: "Statements change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में विवरण बदल जाते हैं।" },
    { word: "Question", definition: "A sentence requesting information", hindiTranslation: "प्रश्न", example: "Questions also change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में प्रश्न भी बदल जाते हैं।" },
    { word: "Command", definition: "An instruction or order", hindiTranslation: "आदेश", example: "Commands become to-infinitive in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में आदेश टू-इन्फिनिटिव में बदल जाते हैं।" },
    { word: "Time", definition: "The indefinite continued progress of existence", hindiTranslation: "समय", example: "Time expressions change in reported speech.", exampleHindi: "रिपोर्टेड स्पीच में समय अभिव्यक्तियां बदल जाती हैं।" }
  ];

  for (const vocab of reportedVocab) {
    await storage.createVocabulary({
      lessonId: reportedLesson.id,
      word: vocab.word,
      definition: vocab.definition,
      hindiTranslation: vocab.hindiTranslation,
      example: vocab.example,
      exampleHindi: vocab.exampleHindi
    });
  }

  console.log("Reported speech lesson created successfully!");
}

// Function to create scenario-based conversation modules
async function createScenarioModules() {
  console.log("Creating scenario-based conversation modules...");

  // Job Interview Scenario
  const jobInterviewScenario = await storage.createScenario({
    title: "Job Interview Preparation",
    titleHindi: "नौकरी के साक्षात्कार की तैयारी",
    description: "Practice common job interview questions and answers",
    descriptionHindi: "साक्षात्कार में आने वाले सामान्य प्रश्नों और उत्तरों का अभ्यास करें",
    yourRole: "Job Candidate",
    yourRoleHindi: "नौकरी के उम्मीदवार",
    partnerRole: "HR Manager",
    partnerRoleHindi: "मानव संसाधन प्रबंधक",
    category: "job_interview",
    difficulty: "Advanced",
    dialogues: JSON.stringify([
      { 
        speaker: "HR Manager", 
        english: "Good morning! Welcome to our company. Please have a seat.", 
        hindi: "सुप्रभात! हमारी कंपनी में आपका स्वागत है। कृपया बैठें।",
        emoji: "👔"
      },
      { 
        speaker: "Job Candidate", 
        english: "Thank you, ma'am. I'm excited to be here for the interview.", 
        hindi: "धन्यवाद, मैडम। मैं यहां साक्षात्कार देने के लिए उत्साहित हूं।",
        emoji: "😊"
      },
      { 
        speaker: "HR Manager", 
        english: "Can you tell me about yourself and your experience?", 
        hindi: "क्या आप अपने बारे में और अपने अनुभव के बारे में बता सकते हैं?",
        emoji: "👤"
      },
      { 
        speaker: "Job Candidate", 
        english: "Certainly. I have five years of experience in software development with expertise in React and Node.js.", 
        hindi: "निश्चित रूप से। मेरे पास सॉफ्टवेयर विकास में पांच साल का अनुभव है और मुझे React और Node.js में विशेषज्ञता है।",
        emoji: "💻"
      },
      { 
        speaker: "HR Manager", 
        english: "That's impressive. Why do you want to work for us specifically?", 
        hindi: "यह अद्भुत है। विशेष रूप से हमारे लिए काम क्यों करना चाहते हैं?",
        emoji: "❓"
      },
      { 
        speaker: "Job Candidate", 
        english: "I admire your company's innovative culture and commitment to employee development.", 
        hindi: "मैं आपकी कंपनी की नवाचारी संस्कृति और कर्मचारी विकास के प्रति प्रतिबद्धता की प्रशंसा करता हूं।",
        emoji: "🌟"
      }
    ]),
    tips: JSON.stringify([
      "Research the company beforehand to show genuine interest",
      "Prepare answers for common questions like 'tell me about yourself'",
      "Dress professionally and arrive early",
      "Maintain eye contact and good posture",
      "Ask thoughtful questions about the role and company"
    ]),
    xpReward: 75
  });

  console.log("Job interview scenario created successfully!");

  // Business Meeting Scenario
  const businessMeetingScenario = await storage.createScenario({
    title: "Business Meeting Discussion",
    titleHindi: "व्यापारिक बैठक की चर्चा",
    description: "Practice professional communication in business meetings",
    descriptionHindi: "व्यापारिक बैठकों में व्यावसायिक संवाद का अभ्यास करें",
    yourRole: "Marketing Manager",
    yourRoleHindi: "मार्केटिंग प्रबंधक",
    partnerRole: "Team Members",
    partnerRoleHindi: "टीम के सदस्य",
    category: "business_meeting",
    difficulty: "Advanced",
    dialogues: JSON.stringify([
      { 
        speaker: "Marketing Manager", 
        english: "Good morning everyone. Let's start by reviewing our quarterly sales figures.", 
        hindi: "सुप्रभात सभी। चलिए हम अपने तिमाही बिक्री आंकड़ों की समीक्षा से शुरुआत करें।",
        emoji: "📊"
      },
      { 
        speaker: "Team Member", 
        english: "Our sales increased by 15% compared to last quarter, which is excellent news.", 
        hindi: "हमारी बिक्री पिछली तिमाही की तुलना में 15% बढ़ी, जो शानदार समाचार है।",
        emoji: "📈"
      },
      { 
        speaker: "Marketing Manager", 
        english: "That's great! Now, let's discuss the challenges we faced during this period.", 
        hindi: "यह बहुत अच्छा है! अब, चलिए इस अवधि के दौरान हमारे सामने आए चुनौतियों पर चर्चा करते हैं।",
        emoji: "💭"
      },
      { 
        speaker: "Team Member", 
        english: "We had supply chain issues that delayed product delivery by two weeks.", 
        hindi: "हमारे पास आपूर्ति श्रृंखला में समस्याएं थीं जिससे उत्पाद वितरण में दो सप्ताह की देरी हुई।",
        emoji: "📦"
      },
      { 
        speaker: "Marketing Manager", 
        english: "Thank you for bringing that up. How can we prevent similar issues in the future?", 
        hindi: "इसके बारे में बताने के लिए धन्यवाद। भविष्य में ऐसी समस्याओं को कैसे रोक सकते हैं?",
        emoji: "🤔"
      },
      { 
        speaker: "Team Member", 
        english: "We could diversify our supplier base and establish backup vendors for critical components.", 
        hindi: "हम अपने आपूर्तिकर्ता आधार को विविधता दे सकते हैं और महत्वपूर्ण घटकों के लिए बैकअप विक्रेताओं की स्थापना कर सकते हैं।",
        emoji: "🔧"
      }
    ]),
    tips: JSON.stringify([
      "Start meetings with a clear agenda",
      "Encourage participation from all team members",
      "Address challenges constructively",
      "Propose actionable solutions",
      "Summarize key decisions at the end"
    ]),
    xpReward: 60
  });

  console.log("Business meeting scenario created successfully!");

  // Medical Appointment Scenario
  const medicalScenario = await storage.createScenario({
    title: "Medical Appointment",
    titleHindi: "चिकित्सा नियुक्ति",
    description: "Practice communicating with healthcare professionals",
    descriptionHindi: "स्वास्थ्य सेवा व्यवसायियों के साथ संवाद करने का अभ्यास करें",
    yourRole: "Patient",
    yourRoleHindi: "रोगी",
    partnerRole: "Doctor",
    partnerRoleHindi: "डॉक्टर",
    category: "medical_appointment",
    difficulty: "Intermediate",
    dialogues: JSON.stringify([
      { 
        speaker: "Doctor", 
        english: "Good afternoon. What brings you to see me today?", 
        hindi: "सुसंध्या। आज आप मुझे क्यों देखने आए हैं?",
        emoji: "👩‍⚕️"
      },
      { 
        speaker: "Patient", 
        english: "Hello doctor. I've been experiencing persistent headaches for the past week.", 
        hindi: "नमस्कार डॉक्टर। पिछले एक सप्ताह से मुझे लगातार सिरदर्द हो रहा है।",
        emoji: "🤕"
      },
      { 
        speaker: "Doctor", 
        english: "I see. Can you describe the pain? Is it sharp, dull, or throbbing?", 
        hindi: "समझ गई। क्या आप दर्द का वर्णन कर सकते हैं? क्या यह तेज, कुंद, या धड़कता हुआ है?",
        emoji: "🤔"
      },
      { 
        speaker: "Patient", 
        english: "It's more like a constant pressure behind my eyes, especially in the morning.", 
        hindi: "यह अधिकतर मेरी आंखों के पीछे एक निरंतर दबाव की तरह है, खासकर सुबह में।",
        emoji: "👁️"
      },
      { 
        speaker: "Doctor", 
        english: "How many hours of sleep do you typically get per night?", 
        hindi: "आप आमतौर पर रात में कितने घंटे की नींद लेते हैं?",
        emoji: "😴"
      },
      { 
        speaker: "Patient", 
        english: "Usually only about 5 hours. I work late and have trouble falling asleep.", 
        hindi: "आमतौर पर केवल लगभग 5 घंटे। मैं देर तक काम करता हूं और नींद आने में परेशानी होती है।",
        emoji: "⏰"
      }
    ]),
    tips: JSON.stringify([
      "Be honest and detailed about your symptoms",
      "Mention all medications you're taking",
      "Ask questions if you don't understand something",
      "Bring a list of your concerns",
      "Follow up on prescribed treatments"
    ]),
    xpReward: 45
  });

  console.log("Medical appointment scenario created successfully!");
}

// Function to enhance SRS (Spaced Repetition System) functionality
async function enhanceSRS() {
  console.log("Enhancing SRS functionality...");
  
  // The schema already has vocabularyProgress table for SRS
  // We just need to make sure it's being used effectively
  
  // Add more vocabulary with Hindi translations for SRS practice
  const srsVocabulary = [
    { word: "Perseverance", definition: "Persistence in doing something despite difficulty", hindiTranslation: "दृढ़ता", example: "Success requires perseverance.", exampleHindi: "सफलता के लिए दृढ़ता की आवश्यकता होती है।" },
    { word: "Conscientious", definition: "Wishing to do one's work or duty well and thoroughly", hindiTranslation: "ईमानदार", example: "She is very conscientious about her studies.", exampleHindi: "वह अपनी पढ़ाई के प्रति बहुत ईमानदार है।" },
    { word: "Versatile", definition: "Able to adapt or be adapted to many different functions or activities", hindiTranslation: "बहुमुखी", example: "He is a versatile actor.", exampleHindi: "वह एक बहुमुखी अभिनेता हैं।" },
    { word: "Pragmatic", definition: "Dealing with things sensibly and realistically", hindiTranslation: "व्यावहारिक", example: "We need a pragmatic approach to solve this problem.", exampleHindi: "इस समस्या को हल करने के लिए हमें व्यावहारिक दृष्टिकोण की आवश्यकता है।" },
    { word: "Resilient", definition: "Able to withstand or recover quickly from difficult conditions", hindiTranslation: "लचीला", example: "Children are naturally resilient.", exampleHindi: "बच्चे स्वाभाविक रूप से लचीले होते हैं।" },
    { word: "Integrity", definition: "The quality of being honest and having strong moral principles", hindiTranslation: "ईमानदारी", example: "He is a man of integrity.", exampleHindi: "वह ईमानदारी वाले आदमी हैं।" },
    { word: "Adaptable", definition: "Able to adjust to new conditions", hindiTranslation: "अनुकूलनशील", example: "The adaptable worker fits well in any team.", exampleHindi: "अनुकूलनशील कर्मचारी किसी भी टीम में अच्छी तरह फिट होते हैं।" },
    { word: "Diligent", definition: "Having or showing care and conscientiousness in one's work", hindiTranslation: "लगनशील", example: "She is a diligent student.", exampleHindi: "वह एक लगनशील छात्रा है।" },
    { word: "Proactive", definition: "Creating or controlling a situation by causing something to happen", hindiTranslation: "प्रारंभात्मक", example: "A proactive approach prevents problems.", exampleHindi: "प्रारंभात्मक दृष्टिकोण समस्याओं को रोकता है।" },
    { word: "Empathetic", definition: "Showing understanding and ready comprehension of other peoples' states and emotions", hindiTranslation: "सहानुभूतिपूर्ण", example: "An empathetic teacher connects with students.", exampleHindi: "सहानुभूतिपूर्ण शिक्षक छात्रों से जुड़ते हैं।" }
  ];
  
  // Add these vocabulary items to lesson 1 (Introduction to Greetings) to ensure they're available for SRS
  for (const vocab of srsVocabulary) {
    await storage.createVocabulary({
      lessonId: 1, // Using lesson 1 as base
      word: vocab.word,
      definition: vocab.definition,
      hindiTranslation: vocab.hindiTranslation,
      example: vocab.example,
      exampleHindi: vocab.exampleHindi
    });
  }
  
  console.log("SRS vocabulary enhanced successfully!");
}

// Main function to execute all enhancements
async function main() {
  try {
    console.log("Starting advanced content enhancement process...");
    
    await createAdvancedGrammarLessons();
    await createScenarioModules();
    await enhanceSRS();
    
    console.log("All advanced content enhancements completed successfully!");
    console.log("New content includes:");
    console.log("- 3 advanced grammar lessons (Conditionals, Passive Voice, Reported Speech)");
    console.log("- 3 scenario-based conversation modules (Job Interview, Business Meeting, Medical Appointment)");
    console.log("- Enhanced vocabulary for SRS practice");
    console.log("- Comprehensive quizzes with Hindi translations");
  } catch (error) {
    console.error("Error during content enhancement:", error);
  }
}

// For now, run the main function directly
main();

export { createAdvancedGrammarLessons, createScenarioModules, enhanceSRS };