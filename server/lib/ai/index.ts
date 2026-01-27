import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class AIService {
  async generateConversationResponse(
    userMessage: string,
    conversationHistory: string[] = [],
    scenario: string = 'general'
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are Saraswati, a friendly English conversation partner for Hindi speakers learning English. Keep responses natural, encouraging, and at an appropriate level. Scenario: ${scenario}. Always be supportive and provide gentle corrections when needed.`,
          },
          ...conversationHistory.map((msg, index) => ({
            role: index % 2 === 0 ? 'user' as const : 'assistant' as const,
            content: msg,
          })),
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'I apologize, but I could not generate a response at this time.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'I apologize, but I am having trouble responding right now. Please try again later.';
    }
  }

  async generatePronunciationFeedback(
    targetText: string,
    userAttempt: string
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a pronunciation coach for Hindi speakers learning English. Provide encouraging, specific feedback on pronunciation attempts.',
          },
          {
            role: 'user',
            content: `Target text: "${targetText}"\nUser's attempt: "${userAttempt}"\nPlease provide brief, encouraging pronunciation feedback.`,
          },
        ],
        max_tokens: 100,
        temperature: 0.5,
      });

      return response.choices[0]?.message?.content || 'Good effort! Keep practicing.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Good effort! Keep practicing your pronunciation.';
    }
  }

  async generateStory(
    difficulty: 'beginner' | 'intermediate' | 'advanced',
    topic: string = 'daily life',
    length: 'short' | 'medium' | 'long' = 'medium'
  ): Promise<string> {
    const lengthMap = {
      short: '50-100 words',
      medium: '100-200 words',
      long: '200-300 words'
    };

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a creative writing assistant for English learners. Create engaging, culturally appropriate stories for Hindi speakers learning English.`,
          },
          {
            role: 'user',
            content: `Create a ${difficulty} level English story about ${topic}. Length: ${lengthMap[length]}. Make it engaging and include vocabulary appropriate for Hindi speakers learning English.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.8,
      });

      return response.choices[0]?.message?.content || 'Once upon a time, there was a student learning English who worked very hard every day.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return 'Once upon a time, there was a student learning English who worked very hard every day.';
    }
  }
}

export const aiService = new AIService();