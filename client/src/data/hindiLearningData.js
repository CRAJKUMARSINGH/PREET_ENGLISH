// Common pronunciation challenges for Hindi speakers
export var pronunciationChallenges = {
    'th_sounds': {
        title: 'TH Sounds (थ/ध)',
        description: 'जीभ को दांतों के बीच रखकर हवा निकालें',
        words: [
            { word: 'think', hindi: 'सोचना', tip: 'जीभ दांतों के बीच, हवा बाहर' },
            { word: 'this', hindi: 'यह', tip: 'जीभ दांतों के बीच, आवाज़ के साथ' },
            { word: 'thank', hindi: 'धन्यवाद', tip: 'think की तरह' },
            { word: 'that', hindi: 'वह', tip: 'this की तरह' },
            { word: 'three', hindi: 'तीन', tip: 'थ्री नहीं, "थ्रू" जैसा' }
        ]
    },
    'v_w_sounds': {
        title: 'V vs W Sounds',
        description: 'V के लिए निचला होंठ ऊपरी दांतों से छुए, W के लिए होंठ गोल करें',
        words: [
            { word: 'very', hindi: 'बहुत', tip: 'निचला होंठ ऊपरी दांतों से छुए' },
            { word: 'water', hindi: 'पानी', tip: 'होंठों को गोल करके "वॉटर" नहीं' },
            { word: 'voice', hindi: 'आवाज़', tip: 'V साउंड - होंठ दांत से छुए' },
            { word: 'work', hindi: 'काम', tip: 'W साउंड - होंठ गोल करें' },
            { word: 'victory', hindi: 'जीत', tip: 'विक्ट्री नहीं, V साउंड से शुरू' }
        ]
    },
    'r_sound': {
        title: 'English R Sound',
        description: 'जीभ को तालू से न छुएं, हिंदी के "र" से बिल्कुल अलग',
        words: [
            { word: 'red', hindi: 'लाल', tip: 'जीभ को कहीं न छुएं, गोल करें' },
            { word: 'right', hindi: 'सही', tip: 'राइट नहीं, R साउंड मुंह के अंदर' },
            { word: 'run', hindi: 'दौड़ना', tip: 'रन नहीं, जीभ तालू से न छुए' },
            { word: 'river', hindi: 'नदी', tip: 'रिवर नहीं, दोनों R अलग तरीके से' },
            { word: 'really', hindi: 'वास्तव में', tip: 'रियली नहीं, R साउंड सॉफ्ट' }
        ]
    }
};
// Common grammar mistakes Hindi speakers make
export var commonGrammarMistakes = [
    {
        category: 'Articles (a, an, the)',
        hindiExplanation: 'हिंदी में articles नहीं होते, इसलिए अंग्रेजी में भूल जाते हैं',
        mistakes: [
            {
                wrong: 'I am going to market.',
                correct: 'I am going to the market.',
                explanation: 'विशिष्ट जगह के लिए "the" का उपयोग करें'
            },
            {
                wrong: 'He is engineer.',
                correct: 'He is an engineer.',
                explanation: 'व्यवसाय के लिए "a/an" का उपयोग करें'
            },
            {
                wrong: 'I have car.',
                correct: 'I have a car.',
                explanation: 'गिनती वाली चीजों के लिए "a/an" जरूरी'
            }
        ]
    },
    {
        category: 'Prepositions (in, on, at)',
        hindiExplanation: 'हिंदी में "में" सभी जगह उपयोग होता है, अंग्रेजी में अलग-अलग prepositions',
        mistakes: [
            {
                wrong: 'I am in the bus.',
                correct: 'I am on the bus.',
                explanation: 'सार्वजनिक परिवहन के लिए "on" का उपयोग'
            },
            {
                wrong: 'I will meet you in 5 o\'clock.',
                correct: 'I will meet you at 5 o\'clock.',
                explanation: 'समय के लिए "at" का उपयोग'
            },
            {
                wrong: 'My birthday is at January.',
                correct: 'My birthday is in January.',
                explanation: 'महीने के लिए "in" का उपयोग'
            }
        ]
    },
    {
        category: 'Present Continuous Overuse',
        hindiExplanation: 'हिंदी में "रहा है" का अधिक उपयोग, अंग्रेजी में हमेशा जरूरी नहीं',
        mistakes: [
            {
                wrong: 'I am having a car.',
                correct: 'I have a car.',
                explanation: 'स्थायी चीजों के लिए simple present का उपयोग'
            },
            {
                wrong: 'I am knowing him.',
                correct: 'I know him.',
                explanation: 'State verbs के साथ continuous tense नहीं'
            },
            {
                wrong: 'I am understanding English.',
                correct: 'I understand English.',
                explanation: 'Mental state के लिए simple present'
            }
        ]
    }
];
// Cultural context for common English phrases
export var culturalContextData = [
    {
        englishPhrase: 'How are you?',
        hindiEquivalent: 'आप कैसे हैं?',
        culturalContext: 'अंग्रेजी में यह सिर्फ अभिवादन है, वास्तविक जानकारी नहीं चाहिए। हिंदी में हम वास्तव में हाल-चाल पूछते हैं।',
        formalUsage: 'How are you doing today, Mr. Smith?',
        informalUsage: 'Hey! How are you?',
        socialContext: 'दोस्तों और परिवार के साथ casual greeting के रूप में उपयोग',
        dosDonts: {
            dos: [
                'संक्षिप्त जवाब दें: "Good", "Fine", "Great"',
                'वापस पूछें: "How about you?"',
                'मुस्कराकर जवाब दें'
            ],
            donts: [
                'अपनी सभी समस्याएं न बताएं',
                'बहुत लंबा जवाब न दें',
                'नकारात्मक बातें न कहें'
            ]
        },
        indianEnglishVariation: 'भारत में "How are you?" का जवाब अक्सर विस्तार से दिया जाता है'
    },
    {
        englishPhrase: 'Thank you',
        hindiEquivalent: 'धन्यवाद',
        culturalContext: 'अंग्रेजी संस्कृति में "Thank you" का बहुत अधिक उपयोग होता है। छोटी-छोटी बातों के लिए भी कहते हैं।',
        formalUsage: 'Thank you very much for your assistance.',
        informalUsage: 'Thanks!',
        businessContext: 'ईमेल और मीटिंग में हमेशा "Thank you" का उपयोग करें',
        dosDonts: {
            dos: [
                'छोटी मदद के लिए भी "Thanks" कहें',
                'ईमेल में "Thank you" से समाप्त करें',
                'सेवा के बाद हमेशा धन्यवाद दें'
            ],
            donts: [
                'धन्यवाद कहना न भूलें',
                'बहुत औपचारिक स्थितियों में सिर्फ "Thanks" न कहें',
                'सार्कास्टिक टोन में न कहें'
            ]
        }
    },
    {
        englishPhrase: 'Excuse me',
        hindiEquivalent: 'माफ करिए / क्षमा करें',
        culturalContext: 'अंग्रेजी में "Excuse me" कई स्थितियों में उपयोग होता है - ध्यान आकर्षित करने, माफी मांगने, या जगह मांगने के लिए।',
        formalUsage: 'Excuse me, could you please help me?',
        informalUsage: 'Excuse me!',
        socialContext: 'भीड़ में जगह बनाने, किसी का ध्यान आकर्षित करने, या छोटी गलती के लिए',
        dosDonts: {
            dos: [
                'किसी के सामने से गुजरते समय कहें',
                'ध्यान आकर्षित करने के लिए उपयोग करें',
                'छींकने या खांसने के बाद कहें'
            ],
            donts: [
                'बड़ी गलती के लिए सिर्फ "Excuse me" न कहें',
                'रूखे टोन में न कहें',
                'बार-बार न दोहराएं'
            ]
        }
    }
];
// Business English for Indian workplace
export var businessEnglishForIndians = [
    {
        situation: 'Email Writing',
        hindiContext: 'ईमेल लेखन',
        commonMistakes: [
            'Subject line में स्पष्टता नहीं',
            '"Dear Sir/Madam" के बजाय "Respected Sir" लिखना',
            '"Do the needful" जैसे भारतीय phrases का उपयोग'
        ],
        correctFormat: {
            subject: 'Clear and specific subject',
            greeting: 'Dear Mr./Ms. [Name]',
            body: 'Professional and concise',
            closing: 'Best regards / Sincerely'
        },
        examples: [
            'Subject: Meeting Request for Project Discussion',
            'Dear Ms. Sharma,',
            'I hope this email finds you well.',
            'Best regards,'
        ]
    },
    {
        situation: 'Phone Conversations',
        hindiContext: 'फोन पर बातचीत',
        commonMistakes: [
            '"Hello, myself [Name]" कहना',
            'बहुत तेज़ या धीरे बोलना',
            'Background noise को ignore करना'
        ],
        correctFormat: {
            greeting: 'Good morning/afternoon, this is [Name]',
            purpose: 'I\'m calling regarding...',
            closing: 'Thank you for your time'
        },
        examples: [
            'Good morning, this is Raj from ABC Company.',
            'I\'m calling regarding the project proposal.',
            'Could we schedule a meeting to discuss this?'
        ]
    }
];
// Daily English phrases for Hindi speakers
export var dailyEnglishPhrases = [
    {
        category: 'Shopping',
        phrases: [
            {
                english: 'How much does this cost?',
                hindi: 'इसकी कीमत क्या है?',
                pronunciation: 'हाउ मच डज़ दिस कॉस्ट?',
                usage: 'दुकान में कीमत पूछने के लिए'
            },
            {
                english: 'Can I get a discount?',
                hindi: 'क्या मुझे छूट मिल सकती है?',
                pronunciation: 'कैन आई गेट अ डिस्काउंट?',
                usage: 'मोल-भाव करने के लिए'
            }
        ]
    },
    {
        category: 'Transportation',
        phrases: [
            {
                english: 'Where is the nearest metro station?',
                hindi: 'सबसे नजदीकी मेट्रो स्टेशन कहाँ है?',
                pronunciation: 'व्हेयर इज़ द नियरेस्ट मेट्रो स्टेशन?',
                usage: 'रास्ता पूछने के लिए'
            },
            {
                english: 'How long will it take?',
                hindi: 'कितना समय लगेगा?',
                pronunciation: 'हाउ लॉन्ग विल इट टेक?',
                usage: 'समय की जानकारी के लिए'
            }
        ]
    },
    {
        category: 'Restaurant',
        phrases: [
            {
                english: 'Can I see the menu, please?',
                hindi: 'क्या मैं मेन्यू देख सकता हूँ?',
                pronunciation: 'कैन आई सी द मेन्यू, प्लीज़?',
                usage: 'रेस्टोरेंट में मेन्यू मांगने के लिए'
            },
            {
                english: 'I would like to order...',
                hindi: 'मैं ऑर्डर करना चाहूंगा...',
                pronunciation: 'आई वुड लाइक टू ऑर्डर...',
                usage: 'खाना ऑर्डर करने के लिए'
            }
        ]
    }
];
// Export all data
export var hindiLearningData = {
    pronunciationChallenges: pronunciationChallenges,
    commonGrammarMistakes: commonGrammarMistakes,
    culturalContextData: culturalContextData,
    businessEnglishForIndians: businessEnglishForIndians,
    dailyEnglishPhrases: dailyEnglishPhrases
};
