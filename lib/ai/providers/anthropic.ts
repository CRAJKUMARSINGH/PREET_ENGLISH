// Week 5: Anthropic Provider (Claude)
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export class AnthropicProvider {
  async generateResponse(prompt: string): Promise<string> {
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });
    return message.content[0].type === 'text' ? message.content[0].text : '';
  }

  async generateSpeechFeedback(transcription: string): Promise<any> {
    const prompt = `Analyze this English speech: "${transcription}"`;
    const response = await this.generateResponse(prompt);
    return { feedback: response, score: 88 };
  }
}
