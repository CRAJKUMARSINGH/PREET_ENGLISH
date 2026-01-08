import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ConversationEvaluation {
  score: number;
  feedback: string;
  suggestions: string[];
  grammarCorrections: string[];
  vocabularyTips: string[];
}

export interface PersonalizedLesson {
  title: string;
  content: string;
  hindiContent: string;
  vocabulary: Array<{
    word: string;
    definition: string;
    hindiTranslation: string;
    example: string;
  }>;
  exercises: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export const AIService = {
  async evaluateConversation(
    userMessage: string,
    context: string,
    targetLevel: string = 'Beginner'
  ): Promise<ConversationEvaluation> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an English learning assistant for Hindi speakers. Evaluate student responses and provide constructive feedback. The student is at ${targetLevel} level. Respond in JSON format with score (0-100), feedback, suggestions, grammarCorrections, and vocabularyTips arrays.`,
          },
          {
            role: 'user',
            content: `Context: ${context}\nStudent response: "${userMessage}"\n\nPlease evaluate this response and provide detailed feedback in JSON format.`,
          },
        ],
        temperature: 0.7,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      try {
        return JSON.parse(content);
      } catch {
        // Fallback if JSON parsing fails
        return {
          score: 75,
          feedback: content,
          suggestions: ['Keep practicing!'],
          grammarCorrections: [],
          vocabularyTips: [],
        };
      }
    } catch (error) {
      console.error('AI evaluation error:', error);
      return {
        score: 70,
        feedback: 'Good effort! Keep practicing to improve your English.',
        suggestions: ['Try to use more descriptive words', 'Practice speaking daily'],
        grammarCorrections: [],
        vocabularyTips: [],
      };
    }
  },

  async generatePersonalizedLesson(
    userLevel: string,
    topic: string,
    learningStyle: string = 'visual'
  ): Promise<PersonalizedLesson> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert English teacher creating lessons for Hindi speakers. Create engaging, culturally relevant lessons. Respond in JSON format with title, content, hindiContent, vocabulary array, and exercises array.`,
          },
          {
            role: 'user',
            content: `Create a ${userLevel} level English lesson about "${topic}" for ${learningStyle} learners. Include Hindi translations and cultural context relevant to Indian students.`,
          },
        ],
        temperature: 0.8,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      try {
        return JSON.parse(content);
      } catch {
        // Fallback lesson
        return {
          title: `${topic} - ${userLevel} Level`,
          content: `# ${topic}\n\nThis lesson covers the basics of ${topic}.`,
          hindiContent: `# ${topic}\n\nयह पाठ ${topic} की मूल बातें शामिल करता है।`,
          vocabulary: [
            {
              word: 'example',
              definition: 'A thing characteristic of its kind',
              hindiTranslation: 'उदाहरण',
              example: 'This is an example sentence.',
            },
          ],
          exercises: [
            {
              question: `What is the main topic of this lesson?`,
              options: [topic, 'Grammar', 'Vocabulary', 'Speaking'],
              correctAnswer: topic,
            },
          ],
        };
      }
    } catch (error) {
      console.error('AI lesson generation error:', error);
      return {
        title: `${topic} - ${userLevel} Level`,
        content: `# ${topic}\n\nThis lesson covers the basics of ${topic}.`,
        hindiContent: `# ${topic}\n\nयह पाठ ${topic} की मूल बातें शामिल करता है।`,
        vocabulary: [],
        exercises: [],
      };
    }
  },

  async generateConversationResponse(
    userMessage: string,
    conversationHistory: string[],
    scenario: string = 'general'
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a friendly English conversation partner for Hindi speakers. Keep responses natural, encouraging, and at an appropriate level. Scenario: ${scenario}`,
          },
          {
            role: 'user',
            content: `Conversation history: ${conversationHistory.join('\n')}\nUser: ${userMessage}\n\nPlease respond naturally and help the user practice English.`,
          },
        ],
        temperature: 0.9,
        max_tokens: 150,
      });

      return response.choices[0].message.content || 'I understand. Please continue.';
    } catch (error) {
      console.error('AI conversation error:', error);
      return 'That\'s interesting! Can you tell me more about that?';
    }
  },

  async generatePronunciationFeedback(
    targetPhrase: string,
    userAttempt: string
  ): Promise<{
    accuracy: number;
    feedback: string;
    tips: string[];
  }> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a pronunciation expert helping Hindi speakers improve their English pronunciation. Provide specific, actionable feedback.',
          },
          {
            role: 'user',
            content: `Target phrase: "${targetPhrase}"\nUser attempt: "${userAttempt}"\n\nProvide pronunciation feedback in JSON format with accuracy (0-100), feedback, and tips array.`,
          },
        ],
        temperature: 0.6,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from AI');
      }

      try {
        return JSON.parse(content);
      } catch {
        return {
          accuracy: 80,
          feedback: 'Good pronunciation! Keep practicing.',
          tips: ['Focus on clear vowel sounds', 'Practice word stress patterns'],
        };
      }
    } catch (error) {
      console.error('AI pronunciation error:', error);
      return {
        accuracy: 75,
        feedback: 'Keep practicing your pronunciation!',
        tips: ['Listen to native speakers', 'Record yourself speaking'],
      };
    }
  },
};