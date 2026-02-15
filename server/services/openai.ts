import OpenAI from 'openai';
import { logger } from '../lib/logger';

// Enhanced initialization with fallback mode
let openai: OpenAI | null = null;
let isAIConfigured = false;

// Initialize OpenAI with graceful fallback
function initializeOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'fallback-mode' || apiKey.length < 10) {
    logger.warn('OpenAI API key not configured - running in FALLBACK MODE');
    logger.warn('AI features will use pre-generated content');
    logger.warn('Get API key from: https://platform.openai.com/api-keys');
    isAIConfigured = false;
    return;
  }

  try {
    openai = new OpenAI({
      apiKey,
      maxRetries: 3,
      timeout: 30000,  // 30 seconds
    });
    isAIConfigured = true;
    logger.info('OpenAI service initialized successfully');

    // Test the connection
    testOpenAIConnection();
  } catch (error) {
    logger.error('Failed to initialize OpenAI service:', error);
    logger.warn('Falling back to pre-generated content');
    isAIConfigured = false;
  }
}

// Test OpenAI connection
async function testOpenAIConnection() {
  if (!openai || !isAIConfigured) return;

  try {
    await openai.models.list();
    logger.info('OpenAI connection test successful');
  } catch (error) {
    logger.error('OpenAI connection test failed:', error);
    isAIConfigured = false;
  }
}

// Initialize on startup
initializeOpenAI();

// Fallback content library
const FALLBACK_CONTENT = {
  pronunciation_feedback: [
    "Great effort! Focus on clear pronunciation of vowel sounds. Practice: 'a' as in 'apple', 'e' as in 'elephant'. अच्छी कोशिश! स्वर ध्वनियों पर ध्यान दें।",
    "Good pronunciation! Try to speak a bit slower for clarity. Remember: each syllable should be clear. बहुत अच्छा! थोड़ा धीरे बोलने की कोशिश करें।",
    "Excellent! Your pronunciation is improving. Keep practicing daily for best results. बेहतरीन! आपका उच्चारण सुधर रहा है।"
  ],

  stories: {
    beginner: [
      "Raj goes to the market every morning. He buys fresh vegetables and fruits. The shopkeeper is very friendly. Raj practices English while shopping. 'How much for these apples?' he asks. The shopkeeper smiles and answers in English. राज रोज़ सुबह बाज़ार जाता है और अंग्रेजी का अभ्यास करता है।",

      "Priya loves reading books. She has a small library at home. Every evening, she reads English stories. Her favorite book is about friendship. Reading helps her learn new words daily. पिया को किताबें पढ़ना पसंद है और वह रोज़ नए शब्द सीखती है।"
    ],

    intermediate: [
      "The annual school festival was approaching. Students were preparing various cultural programs. Amit decided to participate in the English debate competition. He practiced speaking confidently in front of the mirror. His topic was 'Technology in Education'. स्कूल का वार्षिक उत्सव आ रहा था और अमित अंग्रेजी वाद-विवाद प्रतियोगिता में भाग लेने की तैयारी कर रहा था।",

      "Maya started her new job at an international company. On her first day, she had to introduce herself in English to her colleagues. She was nervous but remembered her practice sessions. 'Hello everyone, I'm Maya and I'm excited to work with this team,' she said confidently. माया ने अंतर्राष्ट्रीय कंपनी में नई नौकरी शुरू की और आत्मविश्वास से अपना परिचय दिया।"
    ],

    advanced: [
      "The entrepreneurship summit brought together innovators from across India. Speakers discussed the challenges of building startups in tier-2 cities. The keynote emphasized the importance of English communication in global markets. Participants engaged in networking sessions, sharing ideas about sustainable business models. उद्यमिता शिखर सम्मेलन में भारत भर के नवाचारियों ने भाग लिया और वैश्विक बाज़ारों में अंग्रेजी संचार के महत्व पर चर्चा की।"
    ]
  },

  conversation_scenarios: {
    'restaurant': "Waiter: Good evening! Welcome to our restaurant. Customer: Thank you. Could I see the menu, please? Waiter: Of course! Here's our menu. What would you like to drink? Customer: I'll have a mango lassi, please. Key phrases: 'Could I see...', 'I'll have...', 'Thank you'. वेटर और ग्राहक के बीच बातचीत।",

    'shopping': "Shopkeeper: How can I help you today? Customer: I'm looking for a cotton shirt. Shopkeeper: What size do you need? Customer: Medium size, please. Do you have it in blue? Key phrases: 'I'm looking for...', 'What size...', 'Do you have...'. खरीदारी के दौरान बातचीत।",

    'office': "Colleague: Good morning! How was your weekend? You: It was great! I visited my family. How about you? Colleague: I went to a movie with friends. You: That sounds fun! Which movie did you watch? Key phrases: 'How was...', 'How about you...', 'That sounds...'. ऑफिस में सहकर्मियों के साथ बातचीत।"
  }
};

// Get random fallback content
function getRandomFallback<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Enhanced caching for AI responses
class AIResponseCache {
  private cache = new Map<string, { response: string; timestamp: number; cost: number }>();
  private readonly CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours for AI responses

  getCacheKey(prompt: string, model: string, maxTokens: number): string {
    return `ai:${model}:${maxTokens}:${Buffer.from(prompt).toString('base64').slice(0, 50)}`;
  }

  get(key: string): string | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.response;
  }

  set(key: string, response: string, cost: number): void {
    this.cache.set(key, {
      response,
      timestamp: Date.now(),
      cost
    });

    // Cleanup old entries if cache gets too large
    if (this.cache.size > 1000) {
      const entries = Array.from(this.cache.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

      // Remove oldest 200 entries
      for (let i = 0; i < 200; i++) {
        this.cache.delete(entries[i][0]);
      }
    }
  }

  getCacheStats() {
    const entries = Array.from(this.cache.values());
    return {
      size: this.cache.size,
      totalCost: entries.reduce((sum, entry) => sum + entry.cost, 0),
      oldestEntry: entries.length > 0 ? Math.min(...entries.map(e => e.timestamp)) : null
    };
  }
}

const aiCache = new AIResponseCache();

// Cost tracking interface
interface UsageStats {
  totalTokens: number;
  estimatedCost: number;
  requestCount: number;
  lastReset: Date;
}

const usageStats: Map<number, UsageStats> = new Map();

// Pricing (approximate, update regularly - as of Jan 2026)
const PRICING = {
  'gpt-4-turbo': { input: 0.01, output: 0.03 },  // per 1K tokens
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },  // per 1K tokens
  'whisper': 0.006,  // per minute
};

// Daily limits for cost control
const DAILY_LIMITS = {
  TOKEN_LIMIT: 50000,  // ~$1.50/day per user
  REQUEST_LIMIT: 100,   // Max requests per day
  COST_LIMIT: 2.00,     // Max $2/day per user
};

export async function generateFeedback(
  userId: number,
  prompt: string,
  maxTokens: number = 500,
  model: 'gpt-4-turbo' | 'gpt-3.5-turbo' = 'gpt-3.5-turbo'
): Promise<string> {
  // If AI not configured, return fallback content
  if (!isAIConfigured || !openai) {
    logger.debug(`Fallback mode: returning pre-generated content for user ${userId}`);
    return getRandomFallback(FALLBACK_CONTENT.pronunciation_feedback);
  }

  // Check cache first
  const cacheKey = aiCache.getCacheKey(prompt, model, maxTokens);
  const cachedResponse = aiCache.get(cacheKey);
  if (cachedResponse) {
    logger.debug(`Cache hit for user ${userId}, saved API call`);
    return cachedResponse;
  }

  // Check user's daily quota
  const stats = getUserStats(userId);

  // Enforce daily limits
  if (stats.totalTokens > DAILY_LIMITS.TOKEN_LIMIT) {
    logger.info(`Daily token limit reached for user ${userId}, using fallback`);
    return getRandomFallback(FALLBACK_CONTENT.pronunciation_feedback) + ' (Daily AI limit reached)';
  }

  if (stats.requestCount > DAILY_LIMITS.REQUEST_LIMIT) {
    logger.info(`Request limit reached for user ${userId}, using fallback`);
    return getRandomFallback(FALLBACK_CONTENT.pronunciation_feedback) + ' (Daily request limit reached)';
  }

  if (stats.estimatedCost > DAILY_LIMITS.COST_LIMIT) {
    logger.info(`Cost limit reached for user ${userId}, using fallback`);
    return getRandomFallback(FALLBACK_CONTENT.pronunciation_feedback) + ' (Daily cost limit reached)';
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are Saraswati, a helpful Hindi-English bilingual tutor for PREET_ENGLISH. Provide encouraging, culturally sensitive feedback in both English and Hindi. Keep responses concise and actionable. Use simple English that Hindi speakers can understand easily.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content || '';

    // Track usage
    const usage = response.usage;
    if (usage) {
      const cost =
        (usage.prompt_tokens / 1000) * PRICING[model].input +
        (usage.completion_tokens / 1000) * PRICING[model].output;

      stats.totalTokens += usage.total_tokens;
      stats.estimatedCost += cost;
      stats.requestCount += 1;
      usageStats.set(userId, stats);

      // Cache the response
      aiCache.set(cacheKey, content, cost);

      // Log high-cost requests
      if (cost > 0.10) {
        logger.warn(`High-cost OpenAI request: $${cost.toFixed(4)} for user ${userId}`);
      }
    }

    return content;

  } catch (error: any) {
    logger.error(`OpenAI API error for user ${userId}: ${error.message}`);

    // Return fallback content on any error
    let fallbackMessage = getRandomFallback(FALLBACK_CONTENT.pronunciation_feedback);

    if (error.status === 429) {
      fallbackMessage += ' (AI service busy - using backup content)';
    } else if (error.status === 401) {
      logger.error('Invalid OpenAI API key');
      fallbackMessage += ' (AI service configuration issue)';
    } else {
      fallbackMessage += ' (AI service temporarily unavailable)';
    }

    return fallbackMessage;
  }
}

// Generate pronunciation feedback
export async function generatePronunciationFeedback(
  userId: number,
  text: string,
  userAttempt: string
): Promise<string> {
  const prompt = `
    Original text: "${text}"
    User's pronunciation attempt: "${userAttempt}"
    
    Provide brief, encouraging pronunciation feedback in both English and Hindi. 
    Focus on specific sounds that need improvement and give practical tips.
    Keep it under 100 words total.
  `;

  return generateFeedback(userId, prompt, 200, 'gpt-3.5-turbo');
}

// Generate story for lessons
export async function generateStory(
  userId: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  topic?: string,
  length: 'short' | 'medium' | 'long' = 'medium'
): Promise<string> {
  // If AI not configured, return fallback content
  if (!isAIConfigured || !openai) {
    logger.debug(`Fallback mode: returning pre-generated story for user ${userId}`);
    const stories = FALLBACK_CONTENT.stories[difficulty] || FALLBACK_CONTENT.stories.beginner;
    return getRandomFallback(stories);
  }

  const lengthMap = {
    short: '50-100 words',
    medium: '100-200 words',
    long: '200-300 words'
  };

  const prompt = `
    Create a ${difficulty} level English story (${lengthMap[length]}) ${topic ? `about ${topic}` : ''}.
    Include:
    1. Simple, clear English suitable for Hindi speakers
    2. Cultural context relevant to India
    3. 5-8 vocabulary words that would be useful for Hindi speakers learning English
    4. A brief Hindi summary at the end
    
    Make it engaging and educational for PREET_ENGLISH learners.
  `;

  try {
    return await generateFeedback(userId, prompt, 400, 'gpt-3.5-turbo');
  } catch (error) {
    logger.debug(`Story generation failed for user ${userId}, using fallback`);
    const stories = FALLBACK_CONTENT.stories[difficulty] || FALLBACK_CONTENT.stories.beginner;
    return getRandomFallback(stories) + ' (Generated from our story library)';
  }
}

// Generate conversation practice scenarios
export async function generateConversationScenario(
  userId: number,
  scenario: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): Promise<string> {
  // If AI not configured, return fallback content
  if (!isAIConfigured || !openai) {
    logger.debug(`Fallback mode: returning pre-generated conversation for user ${userId}`);
    const fallbackKey = scenario.toLowerCase();
    return FALLBACK_CONTENT.conversation_scenarios[fallbackKey] ||
      FALLBACK_CONTENT.conversation_scenarios['restaurant'];
  }

  const prompt = `
    Create a realistic English conversation scenario for "${scenario}" at ${difficulty} level.
    
    Requirements:
    1. Include 2-3 people in the conversation
    2. Use vocabulary appropriate for Hindi speakers learning English
    3. Include cultural context relevant to India
    4. Provide Hindi translations for difficult phrases
    5. Add pronunciation tips for challenging words
    6. Keep it practical and useful for real-life situations
    
    Format: Present as a dialogue with speaker names, followed by key vocabulary and tips.
  `;

  try {
    return await generateFeedback(userId, prompt, 600, 'gpt-3.5-turbo');
  } catch (error) {
    logger.debug(`Conversation generation failed for user ${userId}, using fallback`);
    const fallbackKey = scenario.toLowerCase();
    return (FALLBACK_CONTENT.conversation_scenarios[fallbackKey] ||
      FALLBACK_CONTENT.conversation_scenarios['restaurant']) +
      ' (From our conversation library)';
  }
}

// Add health check endpoint
export async function checkAIServiceHealth(): Promise<{
  status: 'healthy' | 'degraded' | 'error';
  configured: boolean;
  message: string;
  fallbackMode: boolean;
}> {
  if (!isAIConfigured || !openai) {
    return {
      status: 'degraded',
      configured: false,
      message: 'Running in fallback mode - using pre-generated content',
      fallbackMode: true
    };
  }

  try {
    // Simple test call
    await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5,
    });

    return {
      status: 'healthy',
      configured: true,
      message: 'OpenAI API working correctly',
      fallbackMode: false
    };
  } catch (error: any) {
    return {
      status: 'error',
      configured: true,
      message: `OpenAI API error: ${error.message}`,
      fallbackMode: false
    };
  }
}

// Helper function to get user stats
function getUserStats(userId: number): UsageStats {
  const existing = usageStats.get(userId);
  const now = new Date();

  // Reset if it's a new day
  if (existing && existing.lastReset.toDateString() !== now.toDateString()) {
    const reset = { totalTokens: 0, estimatedCost: 0, requestCount: 0, lastReset: now };
    usageStats.set(userId, reset);
    return reset;
  }

  return existing || { totalTokens: 0, estimatedCost: 0, requestCount: 0, lastReset: now };
}

// Export usage stats for monitoring
export function getUserAIUsage(userId: number): UsageStats {
  return getUserStats(userId);
}

// Get all usage stats (admin only)
export function getAllAIUsage(): Array<{ userId: number } & UsageStats> {
  return Array.from(usageStats.entries()).map(([userId, stats]) => ({
    userId,
    ...stats,
  }));
}

// Get cache statistics (admin only)
export function getAICacheStats() {
  return aiCache.getCacheStats();
}

// Reset daily quotas (called by cron job)
export function resetDailyQuotas(): void {
  usageStats.clear();
  logger.info('Daily AI usage quotas reset');
}

// Set up daily reset at midnight
// Set up daily reset at midnight
let resetInterval: NodeJS.Timeout | null = null;

export function initDailyQuotaReset() {
  if (resetInterval) return;

  resetInterval = setInterval(() => {
    resetDailyQuotas();
  }, 24 * 60 * 60 * 1000);

  // Clean up on process exit
  process.on('SIGTERM', () => {
    if (resetInterval) clearInterval(resetInterval);
  });
}

// Initialize quota reset
initDailyQuotaReset();