import { ContentTemplates, TemplateData } from "./content-templates";
import { VocabularyStoplist } from "./vocabulary-stoplist";
import { QualityRubric, ContentToScore } from "./quality-rubric";

/**
 * LLM-driven Hindi Metadata and Content Generator with Guardrails
 * Generates culturally appropriate and linguistically accurate content using LLMs
 */

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'custom';
  apiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
}

export interface GeneratedContent {
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
    translation: string;
  }>;
  metadata: {
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // in minutes
    targetWords: string[];
    culturalNotes: string[];
  };
}

export interface GenerationOptions {
  topic: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  wordCount?: number;
  includeVocabulary?: boolean;
  includeConversations?: boolean;
  targetWords?: string[];
  culturalSensitivity?: boolean;
  excludeStopWords?: boolean;
}

export class LLMContentGenerator {
  private config: LLMConfig;
  private templates: ContentTemplates;
  private stoplist: VocabularyStoplist;
  private qualityRubric: QualityRubric;
  private mockResponses: Map<string, any>;

  constructor(config?: Partial<LLMConfig>) {
    this.config = {
      provider: 'custom',
      apiKey: process.env.OPENAI_API_KEY || 'mock-key',
      model: 'gpt-3.5-turbo',
      maxTokens: 2048,
      temperature: 0.7,
      timeout: 30000,
      ...config
    };
    
    this.templates = new ContentTemplates();
    this.stoplist = new VocabularyStoplist();
    this.qualityRubric = new QualityRubric();
    
    // Initialize mock responses for demonstration
    this.mockResponses = new Map();
    this.initializeMockResponses();
  }

  private initializeMockResponses(): void {
    // Mock responses for different categories and difficulties
    this.mockResponses.set('daily_life_beginner_introductions', {
      title: 'परिचय / Introductions',
      content: 'इस पाठ में हम लोगों से परिचय कराना सीखेंगे। / In this lesson, we will learn how to introduce ourselves and others.',
      vocabulary: [
        {
          word: 'hello',
          hindi: 'नमस्ते',
          pronunciation: 'nam-stay',
          definition: 'A common greeting',
          example: 'Hello, how are you?',
          exampleHindi: 'नमस्ते, आप कैसे हैं?'
        },
        {
          word: 'name',
          hindi: 'नाम',
          pronunciation: 'naam',
          definition: 'The word used to identify a person',
          example: 'What is your name?',
          exampleHindi: 'आपका नाम क्या है?'
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
          english: 'I am fine, thank you. What is your name?',
          hindi: 'मैं ठीक हूँ, धन्यवाद। आपका नाम क्या है?',
          translation: 'I am fine, thank you. What is your name?'
        }
      ],
      metadata: {
        category: 'daily_life',
        difficulty: 'beginner',
        estimatedTime: 10,
        targetWords: ['hello', 'name', 'introduce'],
        culturalNotes: ['Use "aap" for respectful address', 'Namaste is a traditional greeting']
      }
    });
    
    this.mockResponses.set('professional_intermediate_meeting', {
      title: 'बैठक / Meeting',
      content: 'इस पाठ में हम कार्यालय बैठकों में उपयोग होने वाली भाषा सीखेंगे। / In this lesson, we will learn language used in office meetings.',
      vocabulary: [
        {
          word: 'meeting',
          hindi: 'बैठक',
          pronunciation: 'mee-ting',
          definition: 'An assembly of people for a particular purpose',
          example: 'We have a meeting at 3 PM.',
          exampleHindi: 'हमारी 3 बजे बैठक है।'
        },
        {
          word: 'agenda',
          hindi: 'कार्यसूची',
          pronunciation: 'a-jen-da',
          definition: 'A list of items to be discussed at a meeting',
          example: 'Please follow the agenda.',
          exampleHindi: 'कृपया कार्यसूची का पालन करें।'
        }
      ],
      conversations: [
        {
          speaker: 'A',
          english: 'Let\'s start the meeting. Please open the agenda.',
          hindi: 'चलिए बैठक शुरू करते हैं। कृपया कार्यसूची खोलें।',
          translation: 'Let\'s start the meeting. Please open the agenda.'
        },
        {
          speaker: 'B',
          english: 'The first item on the agenda is the budget review.',
          hindi: 'कार्यसूची का पहला आइटम बजट समीक्षा है।',
          translation: 'The first item on the agenda is the budget review.'
        }
      ],
      metadata: {
        category: 'professional',
        difficulty: 'intermediate',
        estimatedTime: 15,
        targetWords: ['meeting', 'agenda', 'review', 'budget'],
        culturalNotes: ['Use formal language in professional settings', 'Respect hierarchy in meetings']
      }
    });
  }

  /**
   * Generate content using LLM with guardrails
   */
  async generateContent(options: GenerationOptions): Promise<GeneratedContent> {
    console.log(`🚀 Generating content: ${options.topic} in ${options.category} at ${options.difficulty} level`);
    
    // Apply guardrails before generation
    this.validateOptions(options);
    
    // For this implementation, we'll use mock responses
    // In a real implementation, this would call an actual LLM API
    const mockKey = `${options.category}_${options.difficulty}_${options.topic.replace(/\s+/g, '_')}`;
    let response = this.mockResponses.get(mockKey);
    
    if (!response) {
      // Generate a default response if mock doesn't exist
      response = this.generateDefaultResponse(options);
    }
    
    // Apply post-generation guardrails
    const processedContent = await this.applyGuardrails(response, options);
    
    console.log(`✅ Content generation completed for: ${options.topic}`);
    return processedContent;
  }

  /**
   * Validate generation options against guardrails
   */
  private validateOptions(options: GenerationOptions): void {
    // Validate category
    if (!this.templates.isValidCategory(options.category)) {
      throw new Error(`Invalid category: ${options.category}. Valid categories are: ${this.templates.getCategories().join(', ')}`);
    }

    // Validate difficulty
    if (!['beginner', 'intermediate', 'advanced'].includes(options.difficulty)) {
      throw new Error(`Invalid difficulty: ${options.difficulty}. Must be 'beginner', 'intermediate', or 'advanced'`);
    }

    // Validate topic
    if (!options.topic || options.topic.trim().length === 0) {
      throw new Error('Topic cannot be empty');
    }

    // Check for potentially inappropriate content
    if (this.containsInappropriateContent(options.topic)) {
      throw new Error('Topic contains potentially inappropriate content');
    }
  }

  /**
   * Check if content contains inappropriate elements
   */
  private containsInappropriateContent(text: string): boolean {
    const inappropriatePatterns = [
      /violence/i,
      /hate/i,
      /discriminat/i,
      /explicit/i,
      /inappropriate/i
    ];

    return inappropriatePatterns.some(pattern => pattern.test(text));
  }

  /**
   * Generate a default response when mock doesn't exist
   */
  private generateDefaultResponse(options: GenerationOptions): GeneratedContent {
    return {
      title: `${options.topic} - ${options.category} (${options.difficulty})`,
      content: `इस पाठ में हम ${options.topic} के बारे में सीखेंगे। / In this lesson, we will learn about ${options.topic}.`,
      vocabulary: [
        {
          word: 'example',
          hindi: 'उदाहरण',
          pronunciation: 'udaharan',
          definition: 'A representative form or pattern',
          example: 'This is an example sentence.',
          exampleHindi: 'यह एक उदाहरण वाक्य है।'
        }
      ],
      conversations: [
        {
          speaker: 'A',
          english: 'Let\'s learn about this topic.',
          hindi: 'चलिए इस विषय के बारे में सीखते हैं।',
          translation: 'Let\'s learn about this topic.'
        },
        {
          speaker: 'B',
          english: 'Yes, it\'s very interesting.',
          hindi: 'हां, यह बहुत दिलचस्प है।',
          translation: 'Yes, it\'s very interesting.'
        }
      ],
      metadata: {
        category: options.category,
        difficulty: options.difficulty,
        estimatedTime: options.difficulty === 'beginner' ? 10 : options.difficulty === 'intermediate' ? 15 : 20,
        targetWords: options.targetWords || [options.topic.split(' ')[0]],
        culturalNotes: []
      }
    };
  }

  /**
   * Apply post-generation guardrails to content
   */
  private async applyGuardrails(content: GeneratedContent, options: GenerationOptions): Promise<GeneratedContent> {
    let processedContent = { ...content };

    // Apply stoplist filtering if requested
    if (options.excludeStopWords) {
      processedContent = this.filterStopWords(processedContent, options);
    }

    // Validate content quality
    const qualityCheck = await this.validateQuality(processedContent);
    if (!qualityCheck.passed) {
      console.warn('⚠️ Quality issues detected:', qualityCheck.issues);
      // In a real implementation, we might regenerate or enhance the content here
    }

    // Apply cultural sensitivity if requested
    if (options.culturalSensitivity) {
      processedContent = this.applyCulturalSensitivity(processedContent);
    }

    // Ensure Hindi content is properly formatted
    processedContent = this.validateHindiContent(processedContent);

    return processedContent;
  }

  /**
   * Filter out stop words from generated content
   */
  private filterStopWords(content: GeneratedContent, options: GenerationOptions): GeneratedContent {
    const filteredContent = { ...content };
    
    // Filter vocabulary
    filteredContent.vocabulary = content.vocabulary.filter(vocab => 
      !this.stoplist.shouldExclude(vocab.word, options.category, options.difficulty)
    );
    
    return filteredContent;
  }

  /**
   * Validate content quality using the rubric
   */
  private async validateQuality(content: GeneratedContent): Promise<{ passed: boolean; issues: string[] }> {
    const contentToScore: ContentToScore = {
      title: content.title,
      content: content.content,
      vocabulary: content.vocabulary.map(v => ({
        word: v.word,
        hindi: v.hindi,
        pronunciation: v.pronunciation,
        definition: v.definition,
        example: v.example
      })),
      conversations: content.conversations.map(c => ({
        speaker: c.speaker,
        english: c.english,
        hindi: c.hindi
      })),
      category: content.metadata.category,
      difficulty: content.metadata.difficulty
    };

    const score = this.qualityRubric.scoreContent(contentToScore);
    const issues: string[] = [];

    if (score.overall < 7.0) {
      issues.push(`Low quality score: ${score.overall}/10`);
    }

    // Check for other quality issues
    if (content.vocabulary.length === 0) {
      issues.push('No vocabulary items generated');
    }

    if (content.conversations.length === 0) {
      issues.push('No conversation items generated');
    }

    return {
      passed: issues.length === 0 && score.overall >= 7.0,
      issues
    };
  }

  /**
   * Apply cultural sensitivity to content
   */
  private applyCulturalSensitivity(content: GeneratedContent): GeneratedContent {
    const updatedContent = { ...content };
    
    // Add cultural notes based on category
    const culturalNotes = this.generateCulturalNotes(content.metadata.category);
    updatedContent.metadata.culturalNotes = [
      ...content.metadata.culturalNotes,
      ...culturalNotes
    ];

    return updatedContent;
  }

  /**
   * Generate cultural notes based on category
   */
  private generateCulturalNotes(category: string): string[] {
    const notesMap: Record<string, string[]> = {
      'professional': [
        'Use formal language in professional settings',
        'Respect hierarchy and seniority',
        'Address colleagues respectfully'
      ],
      'social': [
        'Use appropriate greetings based on time of day',
        'Respect personal space and cultural norms',
        'Use polite expressions in conversations'
      ],
      'daily_life': [
        'Use respectful address forms ("aap" vs "tum")',
        'Understand cultural context of expressions',
        'Be aware of religious and cultural sensitivities'
      ],
      'travel': [
        'Respect local customs and traditions',
        'Understand regional differences',
        'Be polite and patient with locals'
      ],
      'food': [
        'Understand dietary restrictions and preferences',
        'Respect religious food practices',
        'Use appropriate dining etiquette'
      ],
      'health': [
        'Be respectful when discussing health issues',
        'Use appropriate medical terminology',
        'Respect privacy and confidentiality'
      ],
      'education': [
        'Show respect to teachers and elders',
        'Understand academic hierarchies',
        'Use appropriate formal language'
      ],
      'technology': [
        'Use appropriate technical terminology',
        'Be clear and precise in technical communication',
        'Respect intellectual property and privacy'
      ]
    };

    return notesMap[category] || [];
  }

  /**
   * Validate Hindi content formatting
   */
  private validateHindiContent(content: GeneratedContent): GeneratedContent {
    const updatedContent = { ...content };
    
    // Ensure Hindi text is properly formatted (basic validation)
    updatedContent.vocabulary = content.vocabulary.map(vocab => ({
      ...vocab,
      hindi: this.sanitizeHindiText(vocab.hindi),
      exampleHindi: this.sanitizeHindiText(vocab.exampleHindi)
    }));
    
    updatedContent.conversations = content.conversations.map(conv => ({
      ...conv,
      hindi: this.sanitizeHindiText(conv.hindi)
    }));
    
    updatedContent.content = this.sanitizeHindiText(content.content);
    
    return updatedContent;
  }

  /**
   * Sanitize Hindi text (basic implementation)
   */
  private sanitizeHindiText(text: string): string {
    // Basic sanitization: ensure Devanagari script is properly used
    // In a real implementation, this would include more sophisticated validation
    return text;
  }

  /**
   * Batch generate multiple content pieces
   */
  async batchGenerate(optionsList: GenerationOptions[]): Promise<GeneratedContent[]> {
    console.log(`🔄 Batch generating content for ${optionsList.length} topics...`);
    
    const results: GeneratedContent[] = [];
    for (const options of optionsList) {
      try {
        const content = await this.generateContent(options);
        results.push(content);
        console.log(`✅ Generated: ${options.topic}`);
      } catch (error) {
        console.error(`❌ Failed to generate content for ${options.topic}:`, error);
        // In a real implementation, we might want to continue with other items
        throw error;
      }
    }
    
    console.log(`✅ Batch generation completed for ${results.length} topics`);
    return results;
  }

  /**
   * Enhance existing content with additional vocabulary or conversations
   */
  async enhanceContent(
    existingContent: GeneratedContent, 
    enhancements: { addVocabulary?: number; addConversations?: number }
  ): Promise<GeneratedContent> {
    console.log(`🎨 Enhancing content: ${existingContent.title}`);
    
    const enhancedContent = { ...existingContent };
    
    if (enhancements.addVocabulary) {
      const additionalVocab = await this.generateAdditionalVocabulary(
        existingContent.metadata.category,
        existingContent.metadata.difficulty,
        enhancements.addVocabulary
      );
      enhancedContent.vocabulary = [...existingContent.vocabulary, ...additionalVocab];
    }
    
    if (enhancements.addConversations) {
      const additionalConv = await this.generateAdditionalConversations(
        existingContent.metadata.category,
        existingContent.metadata.difficulty,
        enhancements.addConversations
      );
      enhancedContent.conversations = [...existingContent.conversations, ...additionalConv];
    }
    
    return enhancedContent;
  }

  /**
   * Generate additional vocabulary for content
   */
  private async generateAdditionalVocabulary(
    category: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    count: number
  ): Promise<GeneratedContent['vocabulary']> {
    // In a real implementation, this would call an LLM to generate additional vocabulary
    // For now, return mock vocabulary
    const mockVocab: GeneratedContent['vocabulary'] = [];
    
    for (let i = 0; i < count; i++) {
      mockVocab.push({
        word: `additional-word-${i + 1}`,
        hindi: `अतिरिक्त-शब्द-${i + 1}`,
        pronunciation: `ad-ditional-word-${i + 1}`,
        definition: `Additional vocabulary word for ${category}`,
        example: `This is example ${i + 1} for the additional word.`,
        exampleHindi: `यह अतिरिक्त शब्द के लिए उदाहरण ${i + 1} है।`
      });
    }
    
    return mockVocab;
  }

  /**
   * Generate additional conversations for content
   */
  private async generateAdditionalConversations(
    category: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    count: number
  ): Promise<GeneratedContent['conversations']> {
    // In a real implementation, this would call an LLM to generate additional conversations
    // For now, return mock conversations
    const mockConv: GeneratedContent['conversations'] = [];
    
    for (let i = 0; i < count; i++) {
      mockConv.push({
        speaker: i % 2 === 0 ? 'A' : 'B',
        english: `Additional conversation line ${i + 1} in English.`,
        hindi: `अतिरिक्त बातचीत पंक्ति ${i + 1} हिंदी में।`,
        translation: `Additional conversation line ${i + 1} in English.`
      });
    }
    
    return mockConv;
  }

  /**
   * Set a custom mock response for testing
   */
  setMockResponse(key: string, response: any): void {
    this.mockResponses.set(key, response);
  }
}

// Example usage
export function createLLMContentGenerator(config?: Partial<LLMConfig>): LLMContentGenerator {
  return new LLMContentGenerator(config);
}

// Example of how to use the LLM content generator
// This code is only executed when the file is run directly
const runLLMContentGeneratorExample = async () => {
  const generator = new LLMContentGenerator();
  
  try {
    // Generate content for daily life introductions
    const content = await generator.generateContent({
      topic: 'introductions',
      category: 'daily_life',
      difficulty: 'beginner',
      excludeStopWords: true,
      culturalSensitivity: true
    });
    
    console.log('Generated content:', JSON.stringify(content, null, 2));
    
    // Batch generate multiple topics
    const batchContent = await generator.batchGenerate([
      {
        topic: 'meeting',
        category: 'professional',
        difficulty: 'intermediate'
      },
      {
        topic: 'ordering food',
        category: 'food',
        difficulty: 'beginner'
      }
    ]);
    
    console.log(`Generated ${batchContent.length} batch items`);
    
    // Enhance existing content
    const enhancedContent = await generator.enhanceContent(content, {
      addVocabulary: 2,
      addConversations: 1
    });
    
    console.log('Enhanced content vocabulary count:', enhancedContent.vocabulary.length);
  } catch (error) {
    console.error('Error generating content:', error);
  }
};

// Uncomment the line below to run the example
// runLLMContentGeneratorExample();