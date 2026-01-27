export interface HindiDialogue {
  id: number;
  title: string;
  titleHindi: string;
  scenario: string;
  scenarioHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  participants: string[];
  dialogue: Array<{
    speaker: string;
    english: string;
    hindi: string;
    pronunciation: string;
    emotion?: string;
  }>;
  keyPhrases: Array<{
    phrase: string;
    hindi: string;
    usage: string;
  }>;
  culturalNotes?: string[];
  xpReward: number;
}

export const hindiDialoguesData: HindiDialogue[] = [
  {
    id: 1,
    title: "Ordering Food at a Restaurant",
    titleHindi: "रेस्टोरेंट में खाना ऑर्डर करना",
    scenario: "A customer orders food at a local restaurant",
    scenarioHindi: "एक ग्राहक स्थानीय रेस्टोरेंट में खाना ऑर्डर करता है",
    difficulty: 'beginner',
    category: 'Food & Dining',
    participants: ['Customer', 'Waiter'],
    dialogue: [
      {
        speaker: 'Waiter',
        english: "Good evening! Welcome to our restaurant. How many people?",
        hindi: "शुभ संध्या! हमारे रेस्टोरेंट में आपका स्वागत है। कितने लोग हैं?",
        pronunciation: "gʊd ˈivnɪŋ! ˈwelkəm tu aʊər ˈrestərɑnt. haʊ ˈmeni ˈpipəl?",
        emotion: "friendly"
      },
      {
        speaker: 'Customer',
        english: "Good evening! Table for two, please.",
        hindi: "शुभ संध्या! कृपया दो लोगों के लिए टेबल।",
        pronunciation: "gʊd ˈivnɪŋ! ˈteɪbəl fɔr tu, pliz.",
        emotion: "polite"
      },
      {
        speaker: 'Waiter',
        english: "Right this way, please. Here's your table and the menu.",
        hindi: "कृपया इधर आइए। यह आपकी टेबल और मेन्यू है।",
        pronunciation: "raɪt ðɪs weɪ, pliz. hɪrz jʊər ˈteɪbəl ænd ðə ˈmenju.",
        emotion: "helpful"
      },
      {
        speaker: 'Customer',
        english: "Thank you. Could I have some water, please?",
        hindi: "धन्यवाद। क्या मुझे कुछ पानी मिल सकता है, कृपया?",
        pronunciation: "θæŋk ju. kʊd aɪ hæv sʌm ˈwɔtər, pliz?",
        emotion: "requesting"
      },
      {
        speaker: 'Waiter',
        english: "Of course! Are you ready to order?",
        hindi: "बिल्कुल! क्या आप ऑर्डर करने के लिए तैयार हैं?",
        pronunciation: "ʌv kɔrs! ɑr ju ˈredi tu ˈɔrdər?",
        emotion: "attentive"
      },
      {
        speaker: 'Customer',
        english: "Yes, I'll have the chicken curry and naan bread.",
        hindi: "हाँ, मैं चिकन करी और नान ब्रेड लूंगा।",
        pronunciation: "jes, aɪl hæv ðə ˈtʃɪkən ˈkɜri ænd nɑn bred.",
        emotion: "decisive"
      }
    ],
    keyPhrases: [
      {
        phrase: "Table for two",
        hindi: "दो लोगों के लिए टेबल",
        usage: "Used when requesting a table at a restaurant"
      },
      {
        phrase: "Could I have...",
        hindi: "क्या मुझे... मिल सकता है",
        usage: "Polite way to request something"
      },
      {
        phrase: "I'll have...",
        hindi: "मैं... लूंगा/लूंगी",
        usage: "Used when ordering food or drinks"
      }
    ],
    culturalNotes: [
      "In India, it's common to ask for water immediately after being seated",
      "Naan bread is a popular Indian bread often ordered with curry dishes"
    ],
    xpReward: 60
  },
  {
    id: 2,
    title: "Asking for Directions",
    titleHindi: "दिशा पूछना",
    scenario: "A tourist asks for directions to a famous landmark",
    scenarioHindi: "एक पर्यटक प्रसिद्ध स्थल का रास्ता पूछता है",
    difficulty: 'intermediate',
    category: 'Travel',
    participants: ['Tourist', 'Local Person'],
    dialogue: [
      {
        speaker: 'Tourist',
        english: "Excuse me, could you help me? I'm looking for the Red Fort.",
        hindi: "माफ करिए, क्या आप मेरी मदद कर सकते हैं? मैं लाल किले को खोज रहा हूँ।",
        pronunciation: "ɪkˈskjuz mi, kʊd ju help mi? aɪm ˈlʊkɪŋ fɔr ðə red fɔrt.",
        emotion: "polite"
      },
      {
        speaker: 'Local Person',
        english: "Of course! You're quite close. Go straight for about 500 meters.",
        hindi: "बिल्कुल! आप काफी पास हैं। लगभग 500 मीटर सीधे जाइए।",
        pronunciation: "ʌv kɔrs! jʊr kwaɪt kloʊs. goʊ streɪt fɔr əˈbaʊt faɪv ˈhʌndrəd ˈmitərz.",
        emotion: "helpful"
      },
      {
        speaker: 'Tourist',
        english: "Straight ahead? And then?",
        hindi: "सीधे आगे? और फिर?",
        pronunciation: "streɪt əˈhed? ænd ðen?",
        emotion: "confirming"
      },
      {
        speaker: 'Local Person',
        english: "Then turn right at the traffic light. You'll see a big gate - that's the entrance.",
        hindi: "फिर ट्रैफिक लाइट पर दाएं मुड़िए। आपको एक बड़ा गेट दिखेगा - वह प्रवेश द्वार है।",
        pronunciation: "ðen tɜrn raɪt æt ðə ˈtræfɪk laɪt. jul si ə bɪg geɪt - ðæts ði ˈentrəns.",
        emotion: "instructive"
      },
      {
        speaker: 'Tourist',
        english: "How long will it take to walk there?",
        hindi: "वहाँ पैदल जाने में कितना समय लगेगा?",
        pronunciation: "haʊ lɔŋ wɪl ɪt teɪk tu wɔk ðer?",
        emotion: "curious"
      },
      {
        speaker: 'Local Person',
        english: "About 10 minutes. It's a pleasant walk. Enjoy your visit!",
        hindi: "लगभग 10 मिनट। यह एक सुखद सैर है। अपनी यात्रा का आनंद लें!",
        pronunciation: "əˈbaʊt ten ˈmɪnəts. ɪts ə ˈplezənt wɔk. ɪnˈdʒɔɪ jʊər ˈvɪzət!",
        emotion: "encouraging"
      }
    ],
    keyPhrases: [
      {
        phrase: "Excuse me",
        hindi: "माफ करिए",
        usage: "Polite way to get someone's attention"
      },
      {
        phrase: "I'm looking for...",
        hindi: "मैं... खोज रहा हूँ",
        usage: "Used when asking for directions to a place"
      },
      {
        phrase: "How long will it take?",
        hindi: "कितना समय लगेगा?",
        usage: "Asking about duration or time needed"
      }
    ],
    culturalNotes: [
      "Red Fort (Lal Qila) is a famous historical monument in Delhi",
      "Indians are generally very helpful with directions to tourists"
    ],
    xpReward: 75
  },
  {
    id: 3,
    title: "Job Interview Conversation",
    titleHindi: "नौकरी के साक्षात्कार की बातचीत",
    scenario: "A candidate interviews for a software developer position",
    scenarioHindi: "एक उम्मीदवार सॉफ्टवेयर डेवलपर पद के लिए साक्षात्कार देता है",
    difficulty: 'advanced',
    category: 'Business',
    participants: ['Interviewer', 'Candidate'],
    dialogue: [
      {
        speaker: 'Interviewer',
        english: "Good morning! Please have a seat. Tell me about yourself.",
        hindi: "सुप्रभात! कृपया बैठिए। अपने बारे में बताइए।",
        pronunciation: "gʊd ˈmɔrnɪŋ! pliz hæv ə sit. tel mi əˈbaʊt jʊərˈself.",
        emotion: "professional"
      },
      {
        speaker: 'Candidate',
        english: "Good morning! I'm a software developer with 3 years of experience in web development.",
        hindi: "सुप्रभात! मैं वेब डेवलपमेंट में 3 साल के अनुभव के साथ एक सॉफ्टवेयर डेवलपर हूँ।",
        pronunciation: "gʊd ˈmɔrnɪŋ! aɪm ə ˈsɔftˌwer dɪˈveləpər wɪð θri jɪrz ʌv ɪkˈspɪriəns ɪn web dɪˈveləpmənt.",
        emotion: "confident"
      },
      {
        speaker: 'Interviewer',
        english: "That's impressive. What programming languages are you proficient in?",
        hindi: "यह प्रभावशाली है। आप किन प्रोग्रामिंग भाषाओं में दक्ष हैं?",
        pronunciation: "ðæts ɪmˈpresɪv. wʌt ˈproʊˌgræmɪŋ ˈlæŋgwədʒəz ɑr ju prəˈfɪʃənt ɪn?",
        emotion: "interested"
      },
      {
        speaker: 'Candidate',
        english: "I'm proficient in JavaScript, Python, and React. I also have experience with databases like MongoDB.",
        hindi: "मैं JavaScript, Python, और React में दक्ष हूँ। मेरे पास MongoDB जैसे डेटाबेस का भी अनुभव है।",
        pronunciation: "aɪm prəˈfɪʃənt ɪn ˈdʒɑvəˌskrɪpt, ˈpaɪθɑn, ænd riˈækt. aɪ ˈɔlsoʊ hæv ɪkˈspɪriəns wɪð ˈdeɪtəˌbeɪsəz laɪk ˈmɑŋgoʊˌdibi.",
        emotion: "knowledgeable"
      },
      {
        speaker: 'Interviewer',
        english: "Excellent! Why do you want to work for our company?",
        hindi: "बहुत बढ़िया! आप हमारी कंपनी के लिए क्यों काम करना चाहते हैं?",
        pronunciation: "ˈeksələnt! waɪ du ju wɑnt tu wɜrk fɔr aʊər ˈkʌmpəni?",
        emotion: "evaluating"
      },
      {
        speaker: 'Candidate',
        english: "I admire your company's innovative approach to technology and commitment to employee growth.",
        hindi: "मैं आपकी कंपनी के प्रौद्योगिकी के प्रति नवाचार दृष्टिकोण और कर्मचारी विकास के प्रति प्रतिबद्धता की प्रशंसा करता हूँ।",
        pronunciation: "aɪ ædˈmaɪər jʊər ˈkʌmpəniz ˈɪnəˌveɪtɪv əˈproʊtʃ tu tekˈnɑlədʒi ænd kəˈmɪtmənt tu ɪmˈplɔɪi groʊθ.",
        emotion: "enthusiastic"
      }
    ],
    keyPhrases: [
      {
        phrase: "Tell me about yourself",
        hindi: "अपने बारे में बताइए",
        usage: "Common opening question in interviews"
      },
      {
        phrase: "I'm proficient in...",
        hindi: "मैं... में दक्ष हूँ",
        usage: "Expressing skill level in something"
      },
      {
        phrase: "I admire...",
        hindi: "मैं... की प्रशंसा करता हूँ",
        usage: "Expressing respect or appreciation"
      }
    ],
    culturalNotes: [
      "In Indian job interviews, it's important to show respect and enthusiasm",
      "Technical skills are highly valued in the Indian IT industry"
    ],
    xpReward: 100
  }
];

// Alias for backward compatibility
export const dialogues = hindiDialoguesData;
