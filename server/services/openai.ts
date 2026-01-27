import OpenAI from 'openai';

// Validate API key on startup
if (!process.env.OPENAI_API_KEY) {
  console.error('ERROR: OPENAI_API_KEY not set in environment variables');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000,  // 30 seconds
});

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
  // Check user's daily quota
  const stats = getUserStats(userId);
  
  // Enforce daily limits
  if (stats.totalTokens > DAILY_LIMITS.TOKEN_LIMIT) {
    throw new Error('Daily AI usage limit reached. Please try again tomorrow.');
  }
  
  if (stats.requestCount > DAILY_LIMITS.REQUEST_LIMIT) {
    throw new Error('Too many AI requests today. Please try again tomorrow.');
  }
  
  if (stats.estimatedCost > DAILY_LIMITS.COST_LIMIT) {
    throw new Error('Daily AI cost limit reached. Please try again tomorrow.');
  }
  
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You are Saraswati, a helpful Hindi-English bilingual tutor for PREET_ENGLISH. Provide encouraging, culturally sensitive feedback in both English and Hindi. Keep responses concise and actionable.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });
    
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
      
      // Log high-cost requests
      if (cost > 0.10) {
        console.warn(`High-cost OpenAI request: $${cost.toFixed(4)} for user ${userId}`);
      }
    }
    
    return response.choices[0]?.message?.content || '';
    
  } catch (error: any) {
    if (error.status === 429) {
      throw new Error('OpenAI rate limit reached. Please try again shortly.');
    }
    if (error.status === 401) {
      console.error('Invalid OpenAI API key');
      throw new Error('AI service configuration error');
    }
    if (error.status === 400) {
      throw new Error('Invalid request to AI service');
    }
    console.error('OpenAI API error:', error);
    throw new Error('AI service temporarily unavailable');
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
  
  return generateFeedback(userId, prompt, 400, 'gpt-3.5-turbo');
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

// Reset daily quotas (called by cron job)
export function resetDailyQuotas(): void {
  usageStats.clear();
  console.log('Daily AI usage quotas reset');
}

// Set up daily reset at midnight
setInterval(() => {
  resetDailyQuotas();
}, 24 * 60 * 60 * 1000);