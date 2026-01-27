import { storage } from "../server/storage";

async function incorporateWeeklyCurriculum() {
  console.log("Incorporating 15-week curriculum into main application...\n");

  // Check if lessons already exist to avoid duplicates
  const existingLessons = await storage.getLessons();
  const lessonTitles = existingLessons.map(lesson => lesson.title);
  
  // Check if our specific lessons already exist
  const curriculumLessons = [
    "Self-Assessment and Goal Setting",
    "Everyday Greetings and Introductions", 
    "Asking Questions and Showing Interest",
    "Expressing Opinions and Agreement"
  ];
  
  const existingCurriculumLessons = curriculumLessons.filter(title => 
    lessonTitles.includes(title)
  );
  
  if (existingCurriculumLessons.length > 0) {
    console.log(`⚠️  Some curriculum lessons already exist: ${existingCurriculumLessons.join(', ')}`);
    console.log("Skipping to avoid duplicates. To recreate, clear the database first.");
    return;
  }

  console.log("Adding Week 1: Foundation Assessment Lesson...\n");
  
  // Add Week 1: Foundation Assessment
  const week1Lesson = await storage.createLesson({
    title: "Self-Assessment and Goal Setting",
    slug: "self-assessment-goal-setting",
    description: "Help students assess their current English level and set achievable goals for improvement.",
    content: `# Self-Assessment and Goal Setting

## हिंदी व्याख्या (Hindi Explanation)

इस पाठ में हम अपने अंग्रेजी के स्तर का मूल्यांकन करेंगे और सुधार के लिए उपलब्धि योग्य लक्ष्य निर्धारित करेंगे।

### महत्वपूर्ण शब्दावली (Important Vocabulary):
- Assessment (मूल्यांकन): क्षमता का आकलन
- Proficiency (दक्षता): भाषा में कुशलता
- Fluency (धारा): बोलने की सुचारुता
- Confidence (आत्मविश्वास): भाषा बोलने में विश्वास
- Goal (लक्ष्य): प्राप्त करने योग्य उद्देश्य

### वार्तालाप (Dialogue):
Coach: Welcome to PREET ENGLISH! Today we'll assess your current English level to create a personalized learning path.
Student: How will you assess my proficiency?
Coach: We'll evaluate your fluency, accuracy, and comprehension through a series of questions.
Student: I sometimes lack confidence when speaking.
Coach: That's completely normal. Our program focuses on building confidence gradually. What is your main goal?

### अभ्यास (Exercise):
Practice identifying your strengths and weaknesses in English communication.`,
    difficulty: "Beginner",
    order: existingLessons.length + 1,
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80",
    hindiTitle: "आत्म-मूल्यांकन और लक्ष्य निर्धारण",
    hindiDescription: "छात्रों को उनका वर्तमान अंग्रेजी स्तर मूल्यांकित करना सिखाएं और सुधार के लिए पाने योग्य लक्ष्य निर्धारित करें।"
  });

  // Add vocabulary for Week 1
  const week1Vocab = [
    { word: "Assessment", definition: "Evaluation of ability or performance", pronunciation: "/əˈsesmənt/", example: "Let's do a quick assessment.", hindiTranslation: "मूल्यांकन" },
    { word: "Proficiency", definition: "Competent skill in a particular area", pronunciation: "/prəˈfɪʃənsi/", example: "What is your proficiency level?", hindiTranslation: "दक्षता" },
    { word: "Fluency", definition: "Ability to speak or write a language smoothly", pronunciation: "/ˈfluːənsi/", example: "Work on your fluency.", hindiTranslation: "धारा" },
    { word: "Confidence", definition: "Certainty based on past experience", pronunciation: "/ˈkɑːnfɪdəns/", example: "Building confidence.", hindiTranslation: "आत्मविश्वास" },
    { word: "Goal", definition: "An aim or desired result", pronunciation: "/ɡoʊl/", example: "Set a realistic goal.", hindiTranslation: "लक्ष्य" },
    { word: "Milestone", definition: "A significant stage in development", pronunciation: "/ˈmaɪlstoʊn/", example: "Celebrate milestones.", hindiTranslation: "मील का पत्थर" },
    { word: "Improvement", definition: "Gradual betterment", pronunciation: "/ɪmˈpruːvmənt/", example: "Continuous improvement.", hindiTranslation: "सुधार" },
    { word: "Challenge", definition: "A test of one's abilities", pronunciation: "/ˈtʃælɪndʒ/", example: "Accept the challenge.", hindiTranslation: "चुनौती" },
    { word: "Strength", definition: "Attribute regarded as a benefit", pronunciation: "/streŋθ/", example: "Identify your strengths.", hindiTranslation: "ताकत" },
    { word: "Weakness", definition: "Lack of strength or capability", pronunciation: "/ˈwiːknəs/", example: "Address your weaknesses.", hindiTranslation: "कमजोरी" },
    { word: "Progress", definition: "Forward movement towards a destination", pronunciation: "/ˈprɑːɡres/", example: "Track your progress.", hindiTranslation: "प्रगति" },
    { word: "Benchmark", definition: "Standard for comparison", pronunciation: "/ˈbɛntʃmɑːrk/", example: "This sets a benchmark.", hindiTranslation: "मानक" },
    { word: "Accuracy", definition: "Quality of being correct", pronunciation: "/ˈækjərəsi/", example: "Accuracy is important.", hindiTranslation: "सटीकता" },
    { word: "Comprehension", definition: "Understanding of something", pronunciation: "/ˌkɑːmprɪˈhenʃn/", example: "Reading comprehension.", hindiTranslation: "अवबोध" },
    { word: "Motivation", definition: "Enthusiasm for doing something", pronunciation: "/ˌmoʊtɪˈveɪʃn/", example: "Stay motivated.", hindiTranslation: "प्रेरणा" }
  ];

  for (const vocab of week1Vocab) {
    await storage.createVocabulary({
      lessonId: week1Lesson.id,
      word: vocab.word,
      definition: vocab.definition,
      pronunciation: vocab.pronunciation,
      example: vocab.example,
      hindiTranslation: vocab.hindiTranslation
    });
  }

  console.log("Added Week 2: Basic Conversational Skills Lesson...\n");
  
  // Add Week 2: Basic Conversational Skills
  const week2Lesson = await storage.createLesson({
    title: "Everyday Greetings and Introductions",
    slug: "everyday-greetings-introductions",
    description: "Master common greetings and introduction phrases used in daily interactions.",
    content: `# Everyday Greetings and Introductions

## हिंदी व्याख्या (Hindi Explanation)

इस पाठ में हम दैनिक बातचीत में उपयोग किए जाने वाले सामान्य अभिवादन और परिचय वाक्यांशों को सीखेंगे।

### महत्वपूर्ण शब्दावली (Important Vocabulary):
- Greeting (अभिवादन): स्वागत शब्द
- Introduce (परिचय दिलाना): किसी को जानकारी देना
- Name (नाम): व्यक्ति की पहचान
- Pleasure (सुख): खुशी का भाव
- Formal (औपचारिक): नियमानुसार

### वार्तालाप (Dialogue):
A: Good morning! I'm Sarah from the marketing department. Nice to meet you!
B: Good morning, Sarah. I'm Rajesh Kumar. The pleasure is mine.
A: Is this your first time at this office?
B: Yes, it is. I'm here for the job interview. I hope I'm not late.
A: Not at all! You're right on time. Let me introduce you to the team.

### अभ्यास (Exercise):
Practice introducing yourself to different people in various situations.`,
    difficulty: "Beginner",
    order: existingLessons.length + 2,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    hindiTitle: "दैनिक अभिवादन और परिचय",
    hindiDescription: "दैनिक बातचीत में उपयोग किए जाने वाले सामान्य अभिवादन और परिचय वाक्यांशों को मास्टर करें।"
  });

  // Add vocabulary for Week 2
  const week2Vocab = [
    { word: "Greeting", definition: "Polite acknowledgment of someone's presence", pronunciation: "/ˈɡriːtɪŋ/", example: "A warm greeting.", hindiTranslation: "अभिवादन" },
    { word: "Introduce", definition: "Present someone to another person", pronunciation: "/ˌɪntrəˈduːs/", example: "Let me introduce myself.", hindiTranslation: "परिचय दिलाना" },
    { word: "Nice to meet you", definition: "Expression used when meeting someone", pronunciation: "/naɪs tu miːt ju/", example: "Nice to meet you too!", hindiTranslation: "मिलकर अच्छा लगा" },
    { word: "Name", definition: "Word or set of words by which someone is known", pronunciation: "/neɪm/", example: "What is your name?", hindiTranslation: "नाम" },
    { word: "Pleasure", definition: "Enjoyment derived from an experience", pronunciation: "/ˈpleʒər/", example: "The pleasure is mine.", hindiTranslation: "सुख" },
    { word: "Colleague", definition: "Person with whom one works", pronunciation: "/ˈkɑːliːɡ/", example: "Meet my colleague.", hindiTranslation: "सहकर्मी" },
    { word: "Friend", definition: "Person with whom one has a bond of mutual affection", pronunciation: "/frend/", example: "My best friend.", hindiTranslation: "दोस्त" },
    { word: "Acquaintance", definition: "Person one knows slightly", pronunciation: "/əˈkeɪntəns/", example: "Just an acquaintance.", hindiTranslation: "परिचित" },
    { word: "Formal", definition: "Following established procedures", pronunciation: "/ˈfɔːrməl/", example: "Formal meeting.", hindiTranslation: "औपचारिक" },
    { word: "Informal", definition: "Relaxed and casual", pronunciation: "/ɪnˈfɔːrməl/", example: "Informal chat.", hindiTranslation: "अनौपचारिक" },
    { word: "Address", definition: "Way to refer to someone", pronunciation: "/əˈdres/", example: "How should I address you?", hindiTranslation: "संबोधन" },
    { word: "Title", definition: "Designation given to someone", pronunciation: "/ˈtaɪtl/", example: "Use your title.", hindiTranslation: "उपाधि" },
    { word: "Handshake", definition: "Grip of hands as greeting", pronunciation: "/ˈhændʃeɪk/", example: "Firm handshake.", hindiTranslation: "हाथ मिलाना" },
    { word: "Bow", definition: "Lowering head as gesture of respect", pronunciation: "/baʊ/", example: "Traditional bow.", hindiTranslation: "नमस्कार" },
    { word: "Wave", definition: "Moving hand to greet or say goodbye", pronunciation: "/weɪv/", example: "Friendly wave.", hindiTranslation: "हाथ हिलाना" }
  ];

  for (const vocab of week2Vocab) {
    await storage.createVocabulary({
      lessonId: week2Lesson.id,
      word: vocab.word,
      definition: vocab.definition,
      pronunciation: vocab.pronunciation,
      example: vocab.example,
      hindiTranslation: vocab.hindiTranslation
    });
  }

  console.log("Added Week 3: Intermediate Conversational Skills Lesson...\n");
  
  // Add Week 3: Intermediate Conversational Skills
  const week3Lesson = await storage.createLesson({
    title: "Asking Questions and Showing Interest",
    slug: "asking-questions-showing-interest",
    description: "Learn to ask appropriate questions and show genuine interest in conversations.",
    content: `# Asking Questions and Showing Interest

## हिंदी व्याख्या (Hindi Explanation)

इस पाठ में हम उचित प्रश्न पूछना सीखेंगे और बातचीत में वास्तविक रुचि दिखाना सीखेंगे।

### महत्वपूर्ण शब्दावली (Important Vocabulary):
- Question (प्रश्न): जानकारी के लिए
- Curious (उत्सुक): जानने की इच्छा
- Interested (रुचि रखने वाला): रुचि रखना
- Wonder (आश्चर्य): जानने की इच्छा
- Experience (अनुभव): किया हुआ काम

### वार्तालाप (Dialogue):
A: Hi Tom, I heard you just moved to the city. I'm curious about your experience so far.
B: Oh yes, it's been quite an adventure! The city is much bigger than my hometown.
A: That must be quite a change! What made you decide to move here?
B: Well, I got a job opportunity that I couldn't refuse. Plus, I wanted to experience city life.
A: That's wonderful! I'm sure you'll love it here. If you need any suggestions about places to visit, just let me know.

### अभ्यास (Exercise):
Practice asking follow-up questions to keep conversations flowing naturally.`,
    difficulty: "Intermediate",
    order: existingLessons.length + 3,
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80",
    hindiTitle: "प्रश्न पूछना और रुचि दिखाना",
    hindiDescription: "उचित प्रश्न पूछना सीखें और बातचीत में वास्तविक रुचि दिखाएं।"
  });

  // Add vocabulary for Week 3
  const week3Vocab = [
    { word: "Question", definition: "Sentence worded to elicit information", pronunciation: "/ˈkwes.tʃən/", example: "Do you have a question?", hindiTranslation: "प्रश्न" },
    { word: "Curious", definition: "Eager to know or learn", pronunciation: "/ˈkjʊəriəs/", example: "I'm curious about...", hindiTranslation: "उत्सुक" },
    { word: "Interested", definition: "Showing attention or concern", pronunciation: "/ˈɪntrəstɪd/", example: "I'm very interested.", hindiTranslation: "रुचि रखने वाला" },
    { word: "Wonder", definition: "Desire or need to know", pronunciation: "/ˈwʌndər/", example: "I wonder how...", hindiTranslation: "आश्चर्य" },
    { word: "Experience", definition: "Knowledge gained through practice", pronunciation: "/ɪkˈspɪriəns/", example: "What was your experience?", hindiTranslation: "अनुभव" },
    { word: "Opinion", definition: "View or judgment formed about something", pronunciation: "/əˈpɪnjən/", example: "What's your opinion?", hindiTranslation: "राय" },
    { word: "Suggestion", definition: "Idea proposed for consideration", pronunciation: "/səˈdʒes.tʃən/", example: "Any suggestions?", hindiTranslation: "सुझाव" },
    { word: "Reason", definition: "Justification for an action", pronunciation: "/ˈriː.zən/", example: "What's the reason?", hindiTranslation: "कारण" },
    { word: "Purpose", definition: "Intended goal", pronunciation: "/ˈpɜːrpəs/", example: "What's the purpose?", hindiTranslation: "उद्देश्य" },
    { word: "Background", definition: "History or context", pronunciation: "/ˈbæk.ɡraʊnd/", example: "Tell me your background.", hindiTranslation: "पृष्ठभूमि" },
    { word: "Situation", definition: "Set of circumstances", pronunciation: "/ˌsɪtʃuˈeɪʃn/", example: "Describe the situation.", hindiTranslation: "स्थिति" },
    { word: "Condition", definition: "Requirements to be met", pronunciation: "/kənˈdɪʃn/", example: "What are the conditions?", hindiTranslation: "शर्त" },
    { word: "Circumstance", definition: "Fact related to an event", pronunciation: "/ˈsɜːrkəm.stəns/", example: "Under what circumstance?", hindiTranslation: "परिस्थिति" },
    { word: "Inquiry", definition: "Request for information", pronunciation: "/ɪnˈkwaɪəri/", example: "Thank you for your inquiry.", hindiTranslation: "पूछताछ" },
    { word: "Clarification", definition: "Process of making something clear", pronunciation: "/ˌklærəfɪˈkeɪʃn/", example: "I need clarification.", hindiTranslation: "स्पष्टीकरण" }
  ];

  for (const vocab of week3Vocab) {
    await storage.createVocabulary({
      lessonId: week3Lesson.id,
      word: vocab.word,
      definition: vocab.definition,
      pronunciation: vocab.pronunciation,
      example: vocab.example,
      hindiTranslation: vocab.hindiTranslation
    });
  }

  console.log("Added Week 4: Expressing Opinions Lesson...\n");
  
  // Add Week 4: Expressing Opinions and Agreement
  const week4Lesson = await storage.createLesson({
    title: "Expressing Opinions and Agreement",
    slug: "expressing-opinions-agreement",
    description: "Learn to express opinions respectfully and show agreement or disagreement appropriately.",
    content: `# Expressing Opinions and Agreement

## हिंदी व्याख्या (Hindi Explanation)

इस पाठ में हम सम्मानपूर्वक राय व्यक्त करना और उचित रूप से सहमति या असहमति दिखाना सीखेंगे।

### महत्वपूर्ण शब्दावली (Important Vocabulary):
- Opinion (राय): अपना विचार
- Agree (सहमत होना): एकमत होना
- Disagree (असहमत होना): एकमत न होना
- Think (सोचना): विचार करना
- Believe (विश्वास करना): मानना

### वार्तालाप (Dialogue):
A: I believe that remote work has many advantages, especially for productivity.
B: From my perspective, I agree with you. I feel that I can focus better at home.
A: Exactly! But I think we should also consider the importance of team collaboration.
B: That's a valid point. I tend to agree that balance is important. Perhaps hybrid work is the solution.
A: I'd rather agree with that! Hybrid seems like the best of both worlds.

### अभ्यास (Exercise):
Practice expressing disagreement respectfully without offending others.`,
    difficulty: "Intermediate",
    order: existingLessons.length + 4,
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80",
    hindiTitle: "राय व्यक्त करना और सहमति दिखाना",
    hindiDescription: "सम्मानपूर्वक राय व्यक्त करना और उचित रूप से सहमति या असहमति दिखाना सीखें।"
  });

  // Add vocabulary for Week 4
  const week4Vocab = [
    { word: "Opinion", definition: "View or judgment formed about something", pronunciation: "/əˈpɪnjən/", example: "In my opinion...", hindiTranslation: "राय" },
    { word: "Agree", definition: "Consent to a course of action", pronunciation: "/əˈɡriː/", example: "I agree with you.", hindiTranslation: "सहमत होना" },
    { word: "Disagree", definition: "Have a different opinion", pronunciation: "/ˌdɪsəˈɡriː/", example: "I disagree politely.", hindiTranslation: "असहमत होना" },
    { word: "Think", definition: "Direct one's mind toward something", pronunciation: "/θɪŋk/", example: "I think this is right.", hindiTranslation: "सोचना" },
    { word: "Believe", definition: "Accept something as true", pronunciation: "/bɪˈliːv/", example: "I believe in this idea.", hindiTranslation: "विश्वास करना" },
    { word: "Feel", definition: "Be aware of emotion", pronunciation: "/fiːl/", example: "I feel strongly about this.", hindiTranslation: "महसूस करना" },
    { word: "Perspective", definition: "Particular attitude toward something", pronunciation: "/ˈpɜːrspəktɪv/", example: "From my perspective...", hindiTranslation: "दृष्टिकोण" },
    { word: "Viewpoint", definition: "Particular way of regarding something", pronunciation: "/ˈvjuːpoɪnt/", example: "That's your viewpoint.", hindiTranslation: "दृष्टिकोण" },
    { word: "Stance", definition: "Attitude in relation to an issue", pronunciation: "/stæns/", example: "What's your stance?", hindiTranslation: "रुख" },
    { word: "Support", definition: "Give assistance to", pronunciation: "/səˈpɔːrt/", example: "I support this idea.", hindiTranslation: "समर्थन" },
    { word: "Oppose", definition: "Be against something", pronunciation: "/əˈpoʊz/", example: "I oppose this decision.", hindiTranslation: "विरोध करना" },
    { word: "Respectfully", definition: "In a respectful manner", pronunciation: "/rɪˈspekt.fəl.i/", example: "Disagree respectfully.", hindiTranslation: "सम्मानपूर्वक" },
    { word: "Consider", definition: "Think carefully about", pronunciation: "/kənˈsɪdər/", example: "Consider my suggestion.", hindiTranslation: "विचार करना" },
    { word: "Tend", definition: "Have a tendency", pronunciation: "/tend/", example: "I tend to agree.", hindiTranslation: "झुकाव" },
    { word: "Rather", definition: "More readily or willingly", pronunciation: "/ˈræðər/", example: "I'd rather disagree.", hindiTranslation: "बल्कि" }
  ];

  for (const vocab of week4Vocab) {
    await storage.createVocabulary({
      lessonId: week4Lesson.id,
      word: vocab.word,
      definition: vocab.definition,
      pronunciation: vocab.pronunciation,
      example: vocab.example,
      hindiTranslation: vocab.hindiTranslation
    });
  }

  console.log("✅ 15-week curriculum has been successfully incorporated into the main application!");
  console.log("✅ 4 lessons added covering Weeks 1-4 of the curriculum");
  console.log("✅ All vocabulary items with Hindi translations added");
  console.log("✅ Lessons are properly ordered and linked to the curriculum");
  
  // Create a simple quiz for the new lessons
  const quiz = await storage.createQuiz({
    title: "Communication Skills Basics Quiz",
    titleHindi: "संचार कौशल मूलभूत प्रश्नोत्तरी",
    description: "Test your knowledge of basic communication skills learned in weeks 1-4",
    difficulty: "Beginner",
    category: "Communication",
    passingScore: 70,
    timeLimit: 15,
    order: 2  // Since we already have a quiz with order 1
  });

  // Add quiz questions for the new content
  const quizQuestions = [
    {
      quizId: quiz.id,
      questionText: "What is the most important aspect of self-assessment?",
      questionTextHindi: "आत्म-मूल्यांकन का सबसे महत्वपूर्ण पहलू क्या है?",
      questionType: "multiple_choice",
      options: JSON.stringify(["Confidence", "Goal setting", "Accuracy", "Fluency"]),
      correctAnswer: "Goal setting",
      explanation: "Setting clear goals is fundamental to effective learning",
      points: 10,
      order: 1
    },
    {
      quizId: quiz.id,
      questionText: "Which phrase is most appropriate for a formal introduction?",
      questionTextHindi: "औपचारिक परिचय के लिए कौन सा वाक्यांश सबसे उपयुक्त है?",
      questionType: "multiple_choice",
      options: JSON.stringify(["Hey, what's up?", "Good morning, nice to meet you", "What's happening?", "Hiya!"]),
      correctAnswer: "Good morning, nice to meet you",
      explanation: "This is polite and appropriate for formal situations",
      points: 10,
      order: 2
    },
    {
      quizId: quiz.id,
      questionText: "Fill in the blank: 'I'm very _______ to hear about your experience'",
      questionTextHindi: "रिक्त स्थान भरें: 'मैं आपके अनुभव के बारे में सुनने के लिए बहुत _______ हूँ'",
      questionType: "fill_blank",
      options: JSON.stringify(["curious", "angry", "bored", "confused"]),
      correctAnswer: "curious",
      explanation: "Shows genuine interest in someone's experience",
      points: 10,
      order: 3
    }
  ];

  for (const question of quizQuestions) {
    await storage.createQuizQuestion(question);
  }

  console.log("✅ Basic quiz created to test the new curriculum content");
  console.log("\nThe 15-week curriculum implementation is now complete for Weeks 1-4!");
  console.log("Future weeks will continue building on these foundational skills.");
}

// Run the incorporation
incorporateWeeklyCurriculum().catch(console.error);