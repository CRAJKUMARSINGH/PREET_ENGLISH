/**
 * Hindi-First Content Templates by Category
 * Templates for generating culturally appropriate and linguistically accurate content
 */

export interface TemplateData {
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  content: string;
  vocabulary: Array<{
    word: string;
    hindi: string;
    pronunciation: string;
    definition: string;
    example: string;
    exampleHindi: string;
  }>;
  conversations: Array<{
    speaker: 'A' | 'B' | 'C' | 'D';
    english: string;
    hindi: string;
    translation: string; // English translation of Hindi text
  }>;
}

export interface CategoryTemplate {
  category: string;
  name: string;
  description: string;
  targetAudience: string;
  difficultyLevels: {
    beginner: {
      structure: string;
      contentFocus: string[];
      vocabularyCount: number;
      conversationCount: number;
    };
    intermediate: {
      structure: string;
      contentFocus: string[];
      vocabularyCount: number;
      conversationCount: number;
    };
    advanced: {
      structure: string;
      contentFocus: string[];
      vocabularyCount: number;
      conversationCount: number;
    };
  };
  template: (data: { title: string; topic: string }) => TemplateData;
}

export class ContentTemplates {
  private templates: Map<string, CategoryTemplate>;

  constructor() {
    this.templates = new Map();
    this.initializeTemplates();
  }

  private initializeTemplates(): void {
    // Daily Life category template
    this.templates.set('daily_life', {
      category: 'daily_life',
      name: 'दैनिक जीवन / Daily Life',
      description: 'सामान्य दैनिक गतिविधियों और बातचीत के लिए शब्दावली और वार्तालाप / Vocabulary and conversations for common daily activities and interactions',
      targetAudience: 'Hindi speakers learning basic English for daily use',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic greetings', 'introductions', 'common phrases'],
          vocabularyCount: 5,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['detailed descriptions', 'daily routines', 'basic questions'],
          vocabularyCount: 8,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['complex discussions', 'opinions', 'detailed explanations'],
          vocabularyCount: 12,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'daily_life',
        difficulty: 'beginner', // This will be set dynamically
        title: data.title,
        content: `इस पाठ में हम ${data.topic} के बारे में सीखेंगे। / In this lesson, we will learn about ${data.topic}.`,
        vocabulary: [
          {
            word: 'hello',
            hindi: 'नमस्ते',
            pronunciation: 'nam-stay',
            definition: 'A common greeting',
            example: 'Hello, how are you?',
            exampleHindi: 'नमस्ते, आप कैसे हैं?'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'Hello, how are you?',
            hindi: 'नमस्ते, आप कैसे हैं?',
            translation: 'Hello, how are you?'
          },
          {
            speaker: 'B',
            english: 'I am fine, thank you.',
            hindi: 'मैं ठीक हूँ, धन्यवाद।',
            translation: 'I am fine, thank you.'
          }
        ]
      })
    });

    // Social category template
    this.templates.set('social', {
      category: 'social',
      name: 'सामाजिक / Social',
      description: 'सामाजिक बातचीत, परिचय और सामाजिक अन्य प्रकार की बातचीत के लिए / For social conversations, introductions, and social interactions',
      targetAudience: 'Learners who want to engage in social conversations',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['introductions', 'basic social phrases', 'polite expressions'],
          vocabularyCount: 6,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['detailed introductions', 'asking questions', 'social etiquette'],
          vocabularyCount: 9,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['complex social interactions', 'debates', 'discussions'],
          vocabularyCount: 13,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'social',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम सामाजिक बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about social conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'introduce',
            hindi: 'परिचय कराना',
            pronunciation: 'in-tro-dyooce',
            definition: 'To present someone to another person',
            example: 'Let me introduce my friend.',
            exampleHindi: 'मुझे अपने दोस्त का परिचय करा दें।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'Let me introduce my friend.',
            hindi: 'मुझे अपने दोस्त का परिचय करा दें।',
            translation: 'Let me introduce my friend.'
          },
          {
            speaker: 'B',
            english: 'Nice to meet you.',
            hindi: 'मिलकर अच्छा लगा।',
            translation: 'Nice to meet you.'
          }
        ]
      })
    });

    // Professional category template
    this.templates.set('professional', {
      category: 'professional',
      name: 'व्यावसायिक / Professional',
      description: 'कार्यालय, व्यापार और व्यावसायिक संदर्भों के लिए भाषा / Language for office, business, and professional contexts',
      targetAudience: 'Professionals who need English for workplace communication',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic office phrases', 'job titles', 'simple instructions'],
          vocabularyCount: 7,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['meetings', 'email phrases', 'workplace interactions'],
          vocabularyCount: 10,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['presentations', 'negotiations', 'complex business discussions'],
          vocabularyCount: 15,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'professional',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम व्यावसायिक बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about professional conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'meeting',
            hindi: 'बैठक',
            pronunciation: 'mee-ting',
            definition: 'An assembly of people for a particular purpose',
            example: 'We have a meeting at 3 PM.',
            exampleHindi: 'हमारी 3 बजे बैठक है।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'Do we have a meeting today?',
            hindi: 'क्या आज हमारी बैठक है?',
            translation: 'Do we have a meeting today?'
          },
          {
            speaker: 'B',
            english: 'Yes, at 3 PM in conference room.',
            hindi: 'हां, सम्मेलन कक्ष में दोपहर 3 बजे।',
            translation: 'Yes, at 3 PM in conference room.'
          }
        ]
      })
    });

    // Travel category template
    this.templates.set('travel', {
      category: 'travel',
      name: 'यात्रा / Travel',
      description: 'यात्रा, नेविगेशन और यात्रा से संबंधित स्थितियों के लिए भाषा / Language for travel, navigation, and travel-related situations',
      targetAudience: 'Travelers and tourists who need travel-related English',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic directions', 'transportation', 'simple requests'],
          vocabularyCount: 8,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['detailed directions', 'booking', 'travel problems'],
          vocabularyCount: 11,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['complex travel plans', 'complaints', 'negotiations'],
          vocabularyCount: 16,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'travel',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम यात्रा से संबंधित बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about travel-related conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'ticket',
            hindi: 'टिकट',
            pronunciation: 'tik-it',
            definition: 'A piece of paper giving the holder a right to enter or travel',
            example: 'Can I see your ticket please?',
            exampleHindi: 'क्या मैं आपका टिकट देख सकता हूँ कृपया?'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'Where is the ticket counter?',
            hindi: 'टिकट काउंटर कहाँ है?',
            translation: 'Where is the ticket counter?'
          },
          {
            speaker: 'B',
            english: 'It\'s on the second floor.',
            hindi: 'यह दूसरी मंजिल पर है।',
            translation: 'It\'s on the second floor.'
          }
        ]
      })
    });

    // Food category template
    this.templates.set('food', {
      category: 'food',
      name: 'भोजन / Food',
      description: 'भोजन, रेस्तरां और खाने-पीने से संबंधित भाषा / Language for food, restaurants, and eating/drinking situations',
      targetAudience: 'People who want to order food and talk about food in English',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic food items', 'ordering', 'preferences'],
          vocabularyCount: 9,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['detailed descriptions', 'dietary needs', 'compliments/complaints'],
          vocabularyCount: 12,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['cooking techniques', 'cultural differences', 'reviews'],
          vocabularyCount: 17,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'food',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम भोजन से संबंधित बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about food-related conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'restaurant',
            hindi: 'रेस्तरां',
            pronunciation: 'res-ta-ront',
            definition: 'A place where people pay to sit and eat meals',
            example: 'Let\'s go to an Italian restaurant.',
            exampleHindi: 'चलिए एक इटलियन रेस्तरां में जाते हैं।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'What would you like to eat?',
            hindi: 'आप क्या खाना चाहेंगे?',
            translation: 'What would you like to eat?'
          },
          {
            speaker: 'B',
            english: 'I would like a pizza, please.',
            hindi: 'मुझे पिज्जा चाहिए, कृपया।',
            translation: 'I would like a pizza, please.'
          }
        ]
      })
    });

    // Health category template
    this.templates.set('health', {
      category: 'health',
      name: 'स्वास्थ्य / Health',
      description: 'चिकित्सा, स्वास्थ्य और चिकित्सा सेटिंग्स के लिए भाषा / Language for medical, health, and healthcare settings',
      targetAudience: 'People who need English for medical appointments and health discussions',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic symptoms', 'body parts', 'simple requests'],
          vocabularyCount: 10,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['detailed symptoms', 'medical history', 'prescriptions'],
          vocabularyCount: 13,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['complex conditions', 'medical procedures', 'healthcare systems'],
          vocabularyCount: 18,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'health',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम स्वास्थ्य से संबंधित बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about health-related conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'doctor',
            hindi: 'डॉक्टर',
            pronunciation: 'dock-tor',
            definition: 'A person qualified to practice medicine',
            example: 'I need to see a doctor.',
            exampleHindi: 'मुझे डॉक्टर से मिलने की जरूरत है।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'I don\'t feel well.',
            hindi: 'मुझे अच्छा नहीं लग रहा है।',
            translation: 'I don\'t feel well.'
          },
          {
            speaker: 'B',
            english: 'You should see a doctor.',
            hindi: 'आपको डॉक्टर से मिलना चाहिए।',
            translation: 'You should see a doctor.'
          }
        ]
      })
    });

    // Education category template
    this.templates.set('education', {
      category: 'education',
      name: 'शिक्षा / Education',
      description: 'शैक्षिक संदर्भ, स्कूल और शिक्षा से संबंधित भाषा / Language for educational contexts, schools, and educational topics',
      targetAudience: 'Students and educators who need English for academic purposes',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic school items', 'classroom language', 'simple questions'],
          vocabularyCount: 11,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['academic discussions', 'assignments', 'examinations'],
          vocabularyCount: 14,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['research', 'academic writing', 'complex discussions'],
          vocabularyCount: 19,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'education',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम शैक्षिक बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about educational conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'school',
            hindi: 'स्कूल',
            pronunciation: 'skool',
            definition: 'An institution for educating children',
            example: 'I go to school every day.',
            exampleHindi: 'मैं हर रोज स्कूल जाता हूँ।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'What is your school like?',
            hindi: 'आपका स्कूल कैसा है?',
            translation: 'What is your school like?'
          },
          {
            speaker: 'B',
            english: 'It\'s very big and beautiful.',
            hindi: 'यह बहुत बड़ा और सुंदर है।',
            translation: 'It\'s very big and beautiful.'
          }
        ]
      })
    });

    // Technology category template
    this.templates.set('technology', {
      category: 'technology',
      name: 'प्रौद्योगिकी / Technology',
      description: 'प्रौद्योगिकी, कंप्यूटर और डिजिटल संदर्भों के लिए भाषा / Language for technology, computers, and digital contexts',
      targetAudience: 'Tech professionals and users who need technology-related English',
      difficultyLevels: {
        beginner: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['basic tech terms', 'simple operations', 'common devices'],
          vocabularyCount: 12,
          conversationCount: 2
        },
        intermediate: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## बातचीत / Conversation\n{conversation}',
          contentFocus: ['software', 'troubleshooting', 'technical support'],
          vocabularyCount: 15,
          conversationCount: 3
        },
        advanced: {
          structure: '# {title}\n\n{content}\n\n## शब्दावली / Vocabulary\n{vocabulary}\n\n## व्याकरण बिंदु / Grammar Point\n{grammar}\n\n## विस्तृत बातचीत / Extended Conversation\n{conversation}\n\n## अभ्यास / Practice\n{exercises}',
          contentFocus: ['programming', 'complex systems', 'technical documentation'],
          vocabularyCount: 20,
          conversationCount: 4
        }
      },
      template: (data) => ({
        category: 'technology',
        difficulty: 'beginner',
        title: data.title,
        content: `इस पाठ में हम प्रौद्योगिकी से संबंधित बातचीत के बारे में सीखेंगे। / In this lesson, we will learn about technology-related conversations regarding ${data.topic}.`,
        vocabulary: [
          {
            word: 'computer',
            hindi: 'कंप्यूटर',
            pronunciation: 'com-pyoo-ter',
            definition: 'An electronic device for storing and processing data',
            example: 'I use a computer every day.',
            exampleHindi: 'मैं हर रोज कंप्यूटर का उपयोग करता हूँ।'
          }
        ],
        conversations: [
          {
            speaker: 'A',
            english: 'How do I turn on the computer?',
            hindi: 'कंप्यूटर कैसे चालू करें?',
            translation: 'How do I turn on the computer?'
          },
          {
            speaker: 'B',
            english: 'Press the power button.',
            hindi: 'पावर बटन दबाएं।',
            translation: 'Press the power button.'
          }
        ]
      })
    });
  }

  /**
   * Get a template by category
   */
  public getTemplate(category: string): CategoryTemplate | undefined {
    return this.templates.get(category);
  }

  /**
   * Generate content based on a template
   */
  public generateContent(category: string, topic: string, difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): TemplateData | null {
    const template = this.getTemplate(category);
    if (!template) {
      return null;
    }

    const data = template.template({ title: `${template.name}: ${topic}`, topic });
    data.difficulty = difficulty;

    // Adjust vocabulary and conversation counts based on difficulty
    const diffSettings = template.difficultyLevels[difficulty];
    // In a real implementation, we would generate appropriate content based on these settings
    // For now, we'll just return the base template with difficulty set

    return data;
  }

  /**
   * Get all available categories
   */
  public getCategories(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * Get template structure for a specific category and difficulty
   */
  public getStructure(category: string, difficulty: 'beginner' | 'intermediate' | 'advanced'): string | null {
    const template = this.getTemplate(category);
    if (!template) {
      return null;
    }

    return template.difficultyLevels[difficulty].structure;
  }

  /**
   * Validate if a category is supported
   */
  public isValidCategory(category: string): boolean {
    return this.templates.has(category);
  }
}

// Example usage
export function createContentTemplates(): ContentTemplates {
  return new ContentTemplates();
}

// Example of how to use the content templates
// This code is only executed when the file is run directly
const runContentTemplatesExample = () => {
  const templates = new ContentTemplates();
  
  console.log('Available categories:', templates.getCategories());
  
  // Generate content for daily life
  const content = templates.generateContent('daily_life', 'introductions', 'beginner');
  console.log('Generated content:', content);
  
  // Get structure for professional category
  const structure = templates.getStructure('professional', 'intermediate');
  console.log('Professional intermediate structure:', structure);
};

// Uncomment the line below to run the example
// runContentTemplatesExample();