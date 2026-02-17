
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

// Saraswati Persona System Prompt
const SYSTEM_PROMPT = `
You are 'Saraswati', a kind, patient, and wise English tutor for Hindi speakers.
Your goal is to help users learn English using a mix of Hindi and English (Hinglish).

Guidelines:
1. Always be encouraging and polite. Use emojis like 🙏, 📚, ✨.
2. If the user speaks Hindi, reply in Hinglish (English words with Hindi grammar explanation or vice versa).
3. Correct their grammar gently if they make mistakes.
4. Keep responses concise (under 3 sentences) unless asked for an explanation.
5. Your persona: You are digital avatar of Goddess Saraswati's wisdom, but modern and friendly.

Example Interaction:
User: "I want learn English."
Saraswati: "Namaste! 🙏 I would love to help. You should say 'I want *to* learn English'. Let's practice! What is your hobby?"
`;

// Fallback Rule-Based Responses (when AI is down/quota exceeded)
const FALLBACK_PATTERNS = [
    {
        regex: /hello|hi|namaste|hey/i,
        response: "Namaste! 🙏 I am Saraswati. I am here to help you learn English. How can I help you today?"
    },
    {
        regex: /how are you/i,
        response: "I am excellent, thank you! 🌟 And how are you feeling today? (Try saying: 'I am doing well!')"
    },
    {
        regex: /learn|teach|english/i,
        response: "Learning English is a wonderful journey! 📚 We can start with daily vocabulary or conversation practice. Which one do you prefer?"
    },
    {
        regex: /thank/i,
        response: "You are most welcome! ✨ Keep practicing, and you will become fluent very soon."
    },
    {
        regex: /bye|goodbye/i,
        response: "Goodbye! 👋 Phir milenge! Keep practicing your English!"
    }
];

const DEFAULT_FALLBACK = "That is interesting! 🌸 I am currently operating in 'Offline Mode' so my responses are limited, but please try practicing a lesson from the Dashboard to improve your skills!";

export class ChatService {
    private openai: OpenAI | null = null;

    constructor() {
        if (process.env.OPENAI_API_KEY) {
            this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        } else {
            console.warn("⚠️ ChatService: No OPENAI_API_KEY found. Using fallback mode.");
        }
    }

    async generateResponse(userMessage: string): Promise<string> {
        // Validate input
        if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
            return "Namaste! 🙏 Please send me a message so I can help you learn English.";
        }

        // 1. Try OpenAI if available
        if (this.openai) {
            try {
                const completion = await this.openai.chat.completions.create({
                    model: "gpt-4o-mini", // Fast & cheap
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: userMessage.trim() }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                });
                
                const content = completion.choices[0]?.message?.content;
                if (content && content.trim().length > 0) {
                    return content;
                }
                // Fall through to fallback if content is empty
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error("❌ OpenAI Error:", errorMessage);
                // Fall through to fallback
            }
        }

        // 2. Fallback Logic (Regex) with error handling
        try {
            for (const pattern of FALLBACK_PATTERNS) {
                if (pattern.regex && pattern.regex.test(userMessage)) {
                    return pattern.response || DEFAULT_FALLBACK;
                }
            }
        } catch (error: unknown) {
            console.error("❌ Fallback pattern matching error:", error);
            // Continue to default fallback
        }

        return DEFAULT_FALLBACK;
    }
}

export const chatService = new ChatService();
