import { useState } from "react";
import { Volume2, Mic, Send, Bot, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  hindiText?: string;
  isUser: boolean;
  timestamp: Date;
}

// AI Tutor responses in Hindi-English style
const aiResponses = [
  { en: "That's great! Keep practicing.", hi: "बहुत अच्छा! अभ्यास जारी रखें।" },
  { en: "Good try! Let me help you improve.", hi: "अच्छा प्रयास! मैं आपकी मदद करता हूं।" },
  { en: "Excellent pronunciation!", hi: "उत्कृष्ट उच्चारण!" },
  { en: "Try saying it more slowly.", hi: "इसे धीरे-धीरे बोलने की कोशिश करें।" },
  { en: "You're making good progress!", hi: "आप अच्छी प्रगति कर रहे हैं!" },
  { en: "Let's practice this sentence together.", hi: "आइए इस वाक्य का एक साथ अभ्यास करें।" },
  { en: "Can you repeat that?", hi: "क्या आप दोहरा सकते हैं?" },
  { en: "Perfect! You're learning fast.", hi: "बिल्कुल सही! आप तेजी से सीख रहे हैं।" },
];

export function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Arya, your AI English tutor. How can I help you today?",
      hindiText: "नमस्ते! मैं आर्या हूं, आपका AI अंग्रेजी ट्यूटर। आज मैं आपकी कैसे मदद कर सकता हूं?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse.en,
        hindiText: randomResponse.hi,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Arya - AI Tutor</h2>
            <p className="text-indigo-100 text-sm">आर्या - AI ट्यूटर • Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex", message.isUser ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl p-3",
                message.isUser
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-slate-100 dark:bg-slate-800 rounded-bl-sm"
              )}
            >
              <div className="flex items-start gap-2">
                {!message.isUser && (
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-1 rounded-full">
                    <Bot className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  {message.hindiText && (
                    <p className="text-xs mt-1 opacity-70">{message.hindiText}</p>
                  )}
                </div>
                {!message.isUser && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                  >
                    <Volume2 className="h-4 w-4 text-slate-500" />
                  </button>
                )}
              </div>
              <p className="text-xs opacity-50 mt-1 text-right">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-3 rounded-bl-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-indigo-600" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message... / अपना संदेश लिखें..."
            className="flex-1 min-h-[50px] max-h-[100px] p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <button
              onClick={() => alert("🎤 माइक्रोफोन जल्द आ रहा है!")}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Mic className="h-5 w-5 text-slate-500" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 pb-3 text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
          <p className="text-xs">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-3 w-3 text-red-500 fill-red-500" />
        </div>
      </div>
    </div>
  );
}
