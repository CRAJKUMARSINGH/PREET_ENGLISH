// Week 5: OpenAI Provider
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIProvider {
  async generateResponse(prompt: string): Promise<string> {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
    return response.choices[0].message.content || '';
  }

  async generateSpeechFeedback(transcription: string): Promise<any> {
    const prompt = `Analyze this English speech and provide pronunciation feedback: "${transcription}"`;
    const response = await this.generateResponse(prompt);
    return { feedback: response, score: 85 };
  }

  async embedText(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    return response.data[0].embedding;
  }
}
