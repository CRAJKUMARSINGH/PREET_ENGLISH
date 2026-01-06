import { GeneratedContent } from "./llm-content-generator";

/**
 * Markdown Composer for Hindi-First Content
 * Composes final Markdown content with Hindi as the primary language
 */

export interface MarkdownCompositionOptions {
  includeVocabulary: boolean;
  includeConversations: boolean;
  includeCulturalNotes: boolean;
  includeGrammarPoints: boolean;
  includeExercises: boolean;
  format: 'standard' | 'enhanced' | 'minimal';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export class MarkdownComposer {
  /**
   * Compose Markdown content from validated JSON data
   */
  compose(content: GeneratedContent, options?: Partial<MarkdownCompositionOptions>): string {
    const opts: MarkdownCompositionOptions = {
      includeVocabulary: true,
      includeConversations: true,
      includeCulturalNotes: true,
      includeGrammarPoints: false,
      includeExercises: false,
      format: 'standard',
      difficulty: 'beginner',
      ...options
    };

    let markdown = '';

    // Title with Hindi first
    markdown += `# ${content.title}\n\n`;
    
    // Main content with Hindi first
    markdown += `${content.content}\n\n`;
    
    // Add estimated time
    markdown += `> 🕐 अनुमानित समय: ${content.metadata.estimatedTime} मिनट / Estimated time: ${content.metadata.estimatedTime} minutes\n\n`;

    // Cultural notes section
    if (opts.includeCulturalNotes && content.metadata.culturalNotes.length > 0) {
      markdown += "## सांस्कृतिक टिप्पणियाँ / Cultural Notes\n\n";
      for (const note of content.metadata.culturalNotes) {
        markdown += `- ${note}\n`;
      }
      markdown += "\n";
    }

    // Vocabulary section with Hindi first
    if (opts.includeVocabulary && content.vocabulary.length > 0) {
      markdown += "## शब्दावली / Vocabulary\n\n";
      
      for (const vocab of content.vocabulary) {
        markdown += `### ${vocab.hindi} (${vocab.word})\n`;
        markdown += `- **उच्चारण / Pronunciation**: ${vocab.pronunciation}\n`;
        markdown += `- **परिभाषा / Definition**: ${vocab.definition}\n`;
        markdown += `- **उदाहरण / Example**: ${vocab.exampleHindi} / ${vocab.example}\n\n`;
      }
    }

    // Grammar points section
    if (opts.includeGrammarPoints) {
      markdown += "## व्याकरण बिंदु / Grammar Point\n\n";
      markdown += "> यहाँ व्याकरण नियम और स्पष्टीकरण होगा / Grammar rules and explanations will be here\n\n";
    }

    // Conversations section with Hindi first
    if (opts.includeConversations && content.conversations.length > 0) {
      markdown += "## बातचीत / Conversation\n\n";
      
      for (const conv of content.conversations) {
        markdown += `**${conv.speaker}**: ${conv.hindi} / ${conv.english}\n\n`;
      }
    }

    // Exercises section
    if (opts.includeExercises) {
      markdown += "## अभ्यास / Exercises\n\n";
      markdown += "> यहाँ अभ्यास प्रश्न और गतिविधियाँ होंगी / Exercise questions and activities will be here\n\n";
    }

    // Target words section
    if (content.metadata.targetWords.length > 0) {
      markdown += "## लक्ष्य शब्द / Target Words\n\n";
      markdown += content.metadata.targetWords.join(', ') + "\n\n";
    }

    // Footer with difficulty level
    markdown += `---\n\n`;
    markdown += `**कठिनाई स्तर / Difficulty Level**: ${content.metadata.difficulty}\n`;
    markdown += `**श्रेणी / Category**: ${content.metadata.category}\n`;

    return markdown;
  }

  /**
   * Compose enhanced Markdown with additional features
   */
  composeEnhanced(content: GeneratedContent): string {
    let markdown = '';

    // Title with emoji based on category
    const categoryEmoji = this.getCategoryEmoji(content.metadata.category);
    markdown += `# ${categoryEmoji} ${content.title}\n\n`;
    
    // Main content with Hindi first
    markdown += `${content.content}\n\n`;
    
    // Stats panel
    markdown += "## 📊 सारांश / Summary\n\n";
    markdown += `- **शब्द संख्या / Vocabulary Count**: ${content.vocabulary.length}\n`;
    markdown += `- **बातचीत पंक्तियाँ / Conversation Lines**: ${content.conversations.length}\n`;
    markdown += `- **अनुमानित समय / Estimated Time**: ${content.metadata.estimatedTime} मिनट / minutes\n\n`;

    // Cultural notes with enhanced formatting
    if (content.metadata.culturalNotes.length > 0) {
      markdown += "## 🌏 सांस्कृतिक जानकारी / Cultural Insights\n\n";
      for (const note of content.metadata.culturalNotes) {
        markdown += `- 📌 ${note}\n`;
      }
      markdown += "\n";
    }

    // Vocabulary with enhanced formatting
    if (content.vocabulary.length > 0) {
      markdown += "## 📚 शब्दावली / Vocabulary\n\n";
      
      for (const vocab of content.vocabulary) {
        markdown += `### ${vocab.hindi} <span dir="ltr">(${vocab.word})</span>\n`;
        markdown += `- 🗣️ **उच्चारण / Pronunciation**: <span dir="ltr">${vocab.pronunciation}</span>\n`;
        markdown += `- 📖 **परिभाषा / Definition**: ${vocab.definition}\n`;
        markdown += `- 💬 **उदाहरण / Example**: ${vocab.exampleHindi} / <span dir="ltr">${vocab.example}</span>\n\n`;
      }
    }

    // Grammar points
    markdown += "## 📖 व्याकरण बिंदु / Grammar Point\n\n";
    markdown += "> इस पाठ में आप सीखेंगे कि कैसे ... / In this lesson, you will learn how to ...\n\n";

    // Conversations with enhanced formatting
    if (content.conversations.length > 0) {
      markdown += "## 💬 बातचीत / Conversation\n\n";
      
      for (const conv of content.conversations) {
        markdown += `**${conv.speaker}**: ${conv.hindi}\n`;
        markdown += `<span dir="ltr">*${conv.english}*</span>\n\n`;
      }
    }

    // Interactive exercises
    markdown += "## 🎯 अभ्यास / Practice Exercises\n\n";
    markdown += "### 1. अर्थ मिलान / Matching Exercise\n";
    markdown += "मिलान करें / Match the following:\n\n";
    
    for (let i = 0; i < Math.min(3, content.vocabulary.length); i++) {
      const vocab = content.vocabulary[i];
      markdown += `- ${vocab.hindi} - _______________\n`;
    }
    markdown += "\n";
    
    markdown += "### 2. वाक्य बनाएँ / Sentence Building\n";
    markdown += "निम्नलिखित शब्दों का उपयोग करके वाक्य बनाएँ / Create sentences using the following words:\n\n";
    
    for (let i = 0; i < Math.min(3, content.vocabulary.length); i++) {
      markdown += `- ${content.vocabulary[i].hindi} / ${content.vocabulary[i].word}\n`;
    }
    markdown += "\n";

    // Target words
    if (content.metadata.targetWords.length > 0) {
      markdown += "## 🎯 लक्ष्य शब्द / Target Words\n\n";
      markdown += "इन शब्दों पर ध्यान केंद्रित करें / Focus on these words:\n\n";
      for (const word of content.metadata.targetWords) {
        markdown += `- ${word}\n`;
      }
      markdown += "\n";
    }

    // Footer with metadata
    markdown += "---\n\n";
    markdown += `<div align="center">\n\n`;
    markdown += `**कठिनाई स्तर / Difficulty**: ${this.getDifficultyBadge(content.metadata.difficulty)}  ` + 
               `**श्रेणी / Category**: ${content.metadata.category}  ` +
               `**अनुमानित समय / Time**: ${content.metadata.estimatedTime}min\n\n`;
    markdown += `</div>\n`;

    return markdown;
  }

  /**
   * Compose minimal Markdown (for previews or summaries)
   */
  composeMinimal(content: GeneratedContent): string {
    let markdown = `# ${content.title}\n\n`;
    markdown += `${content.content}\n\n`;
    
    if (content.vocabulary.length > 0) {
      markdown += "### शब्दावली / Vocabulary\n";
      const sampleVocab = content.vocabulary.slice(0, 3);
      for (const vocab of sampleVocab) {
        markdown += `- ${vocab.hindi} (${vocab.word})\n`;
      }
      if (content.vocabulary.length > 3) {
        markdown += `- ... और ${content.vocabulary.length - 3} अधिक / ... and ${content.vocabulary.length - 3} more\n`;
      }
      markdown += "\n";
    }
    
    markdown += `**कठिनाई / Difficulty**: ${content.metadata.difficulty} | **श्रेणी / Category**: ${content.metadata.category}\n`;
    
    return markdown;
  }

  /**
   * Get appropriate emoji for category
   */
  private getCategoryEmoji(category: string): string {
    const emojiMap: Record<string, string> = {
      'daily_life': '🏠',
      'social': '👥',
      'professional': '💼',
      'travel': '✈️',
      'food': '🍽️',
      'health': '🏥',
      'education': '🎓',
      'technology': '💻',
      'environment': '🌍',
      'culture': '🎭',
      'sports': '⚽',
      'entertainment': '🎬',
      'business': '💰',
      'interview_practice': '🗣️'
    };

    return emojiMap[category] || '📚';
  }

  /**
   * Get difficulty badge
   */
  private getDifficultyBadge(difficulty: string): string {
    const badgeMap: Record<string, string> = {
      'beginner': '🟢 शुरुआत / Beginner',
      'intermediate': '🟡 मध्यम / Intermediate',
      'advanced': '🔴 उन्नत / Advanced'
    };

    return badgeMap[difficulty] || '⚪ सामान्य / General';
  }

  /**
   * Validate the generated markdown
   */
  validateMarkdown(markdown: string): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];

    // Check for basic markdown structure
    if (!markdown.includes('# ')) {
      issues.push('Missing title header');
    }

    // Check for Hindi content
    const hasHindi = /[\u0900-\u097F]/.test(markdown);
    if (!hasHindi) {
      issues.push('No Hindi content detected');
    }

    // Check for English content
    const hasEnglish = /[a-zA-Z]/.test(markdown);
    if (!hasEnglish) {
      issues.push('No English content detected');
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  /**
   * Compose content in different formats
   */
  composeWithFormat(content: GeneratedContent, format: 'standard' | 'enhanced' | 'minimal'): string {
    switch (format) {
      case 'enhanced':
        return this.composeEnhanced(content);
      case 'minimal':
        return this.composeMinimal(content);
      case 'standard':
      default:
        return this.compose(content);
    }
  }

  /**
   * Generate multiple format versions of the same content
   */
  generateMultipleFormats(content: GeneratedContent): Record<string, string> {
    return {
      standard: this.compose(content),
      enhanced: this.composeEnhanced(content),
      minimal: this.composeMinimal(content)
    };
  }

  /**
   * Compose content with custom template
   */
  composeWithTemplate(content: GeneratedContent, template: string): string {
    // Replace placeholders in template with actual content
    return template
      .replace(/\{\{title}}/g, content.title)
      .replace(/\{\{content}}/g, content.content)
      .replace(/\{\{category}}/g, content.metadata.category)
      .replace(/\{\{difficulty}}/g, content.metadata.difficulty)
      .replace(/\{\{estimatedTime}}/g, content.metadata.estimatedTime.toString())
      .replace(/\{\{vocabulary}}/g, this.formatVocabulary(content.vocabulary))
      .replace(/\{\{conversations}}/g, this.formatConversations(content.conversations))
      .replace(/\{\{culturalNotes}}/g, content.metadata.culturalNotes.join('\n- '));
  }

  /**
   * Format vocabulary for template insertion
   */
  private formatVocabulary(vocab: GeneratedContent['vocabulary']): string {
    return vocab.map(v => `${v.hindi} (${v.word}): ${v.definition}`).join('\n');
  }

  /**
   * Format conversations for template insertion
   */
  private formatConversations(conv: GeneratedContent['conversations']): string {
    return conv.map(c => `${c.speaker}: ${c.hindi} / ${c.english}`).join('\n');
  }
}

// Example usage
export function createMarkdownComposer(): MarkdownComposer {
  return new MarkdownComposer();
}

// Example of how to use the markdown composer
if (require.main === module) {
  const composer = new MarkdownComposer();
  
  // Create sample content
  const sampleContent: GeneratedContent = {
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
  };

  // Compose in different formats
  console.log('=== Standard Format ===');
  const standard = composer.compose(sampleContent);
  console.log(standard);

  console.log('\n=== Enhanced Format ===');
  const enhanced = composer.composeEnhanced(sampleContent);
  console.log(enhanced);

  console.log('\n=== Minimal Format ===');
  const minimal = composer.composeMinimal(sampleContent);
  console.log(minimal);

  // Validate the markdown
  const validation = composer.validateMarkdown(enhanced);
  console.log('\nValidation:', validation);
}