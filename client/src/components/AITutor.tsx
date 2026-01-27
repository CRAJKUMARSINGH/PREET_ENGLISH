import { useState } from "react";
import { Volume2, Mic, Send, Bot, Heart, Sparkles } from "lucide-react";
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
    <div className="glass-card rounded-[2rem] border-white/20 overflow-hidden flex flex-col shadow-xl h-[600px] bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary to-emerald-600 p-6 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight">Arya AI</h2>
            <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online Tutor
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex w-full", message.isUser ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-[1.5rem] p-5 shadow-sm transition-all animate-fade-in-up",
                message.isUser
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-white dark:bg-slate-800 rounded-tl-sm border border-border"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-1">
                  <p className="text-base font-medium leading-relaxed">{message.text}</p>
                  {message.hindiText && (
                    <p className={cn("text-sm", message.isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {message.hindiText}
                    </p>
                  )}
                </div>
                {!message.isUser && (
                  <button
                    onClick={() => speakText(message.text)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors flex-shrink-0"
                  >
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <p className={cn("text-[10px] mt-2 font-bold opacity-60", message.isUser ? "text-right" : "text-left")}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-[1.5rem] p-4 rounded-tl-sm border border-border shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-primary/80 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="flex items-end gap-3 bg-white dark:bg-slate-900 p-2 rounded-[1.5rem] shadow-lg border border-border/50">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Arya anything..."
            className="flex-1 min-h-[50px] max-h-[120px] p-3 bg-transparent border-0 focus:ring-0 resize-none text-base placeholder:text-muted-foreground/70"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="flex gap-2 pb-1 pr-1">
            <button
              onClick={() => alert("Coming Soon!")}
              className="p-3 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            >
              <Mic className="h-5 w-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
          <span>Powered by</span>
          <span className="text-primary flex items-center gap-1">Arya AI <Heart className="h-2 w-2 fill-primary" /></span>
        </div>
      </div>
    </div>
  );
}
