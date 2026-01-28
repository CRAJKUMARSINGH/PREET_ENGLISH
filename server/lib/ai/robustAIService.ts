import OpenAI from 'openai';
import { CircuitBreaker } from '../../middleware/monitoring.js';
import logger from '../../logger.js';

interface AIServiceConfig {
  maxRetries: number;
  timeout: number;
  circuitBreakerOptions: {
    failureThreshold: number;
    resetTimeout: number;
    monitoringPeriod: number;
  };
}

class RobustAIService {
  private openai: OpenAI;
  private circuitBreaker: CircuitBreaker;
  private config: AIServiceConfig;
  private requestQueue: Array<() => Promise<any>> = [];
  private isProcessingQueue = false;

  constructor() {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      circuitBreakerOptions: {
        failureThreshold: 5,
        resetTimeout: 60000,
        monitoringPeriod: 300000
      }
    };

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: this.config.timeout,
    });

    this.circuitBreaker = new CircuitBreaker(this.config.circuitBreakerOptions);
  }

  async generateStory(prompt: string, options: {
    maxTokens?: number;
    temperature?: number;
    hindiContext?: boolean;
  } = {}): Promise<string> {
    const operation = async () => {
      const systemPrompt = options.hindiContext 
        ? "You are Saraswati, an AI tutor helping Hindi speakers learn English. Generate engaging stories that include both English and Hindi context for better understanding."
        : "Generate an engaging English learning story.";

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: options.maxTokens || 500,
        temperature: options.temperature || 0.7,
      });

      return response.choices[0]?.message?.content || '';
    };

    return this.executeWithResilience('generateStory', operation);
  }

  async provideFeedback(userText: string, expectedText: string): Promise<{
    score: number;
    feedback: string;
    improvements: string[];
  }> {
    const operation = async () => {
      const prompt = `
        Compare the user's English text with the expected text and provide feedback:
        
        Expected: "${expectedText}"
        User said: "${userText}"
        
        Provide a JSON response with:
        - score (0-100)
        - feedback (encouraging message)
        - improvements (array of specific suggestions)
      `;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful English tutor. Provide constructive feedback in JSON format." },
          { role: "user", content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const content = response.choices[0]?.message?.content || '{}';
      return JSON.parse(content);
    };

    return this.executeWithResilience('provideFeedback', operation);
  }

  async translateToHindi(englishText: string): Promise<string> {
    const operation = async () => {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Translate the following English text to Hindi. Provide only the translation." },
          { role: "user", content: englishText }
        ],
        max_tokens: 200,
        temperature: 0.1,
      });

      return response.choices[0]?.message?.content || '';
    };

    return this.executeWithResilience('translateToHindi', operation);
  }

  private async executeWithResilience<T>(operationName: string, operation: () => Promise<T>): Promise<T> {
    const startTime = Date.now();
    
    try {
      const result = await this.circuitBreaker.execute(async () => {
        return await this.retryOperation(operation);
      });
      
      const duration = Date.now() - startTime;
      logger.info(`AI operation success: ${operationName}`, { duration });
      
      return result;
    } catch (error: any) {
      const duration = Date.now() - startTime;
      logger.error(`AI operation failed: ${operationName}`, { error: error.message, duration });
      
      // Return fallback response
      return this.getFallbackResponse(operationName, error);
    }
  }

  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        logger.warn(`AI operation attempt ${attempt} failed`, { error: error.message });
        
        if (attempt < this.config.maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Exponential backoff, max 10s
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  private getFallbackResponse(operationName: string, error: Error): any {
    logger.warn(`Using fallback response for ${operationName}`, { error: error.message });
    
    switch (operationName) {
      case 'generateStory':
        return "I'm sorry, I'm having trouble generating a story right now. Please try again later.";
      
      case 'provideFeedback':
        return {
          score: 75,
          feedback: "Great effort! Keep practicing to improve your English skills.",
          improvements: ["Continue practicing regularly", "Focus on pronunciation", "Try reading more English content"]
        };
      
      case 'translateToHindi':
        return "अनुवाद सेवा अस्थायी रूप से अनुपलब्ध है। कृपया बाद में पुनः प्रयास करें।";
      
      default:
        return null;
    }
  }

  getHealthStatus() {
    return {
      circuitBreaker: this.circuitBreaker.getMetrics(),
      queueLength: this.requestQueue.length,
      isProcessingQueue: this.isProcessingQueue
    };
  }
}

export default new RobustAIService();