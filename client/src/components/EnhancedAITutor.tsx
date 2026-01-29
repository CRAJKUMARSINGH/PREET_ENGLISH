import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Send, Volume2, Sparkles, MessageCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'pronunciation' | 'grammar';
}

interface EnhancedAITutorProps {
  compact?: boolean;
}

export function EnhancedAITutor({ compact = false }: EnhancedAITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Namaste! I\'m Saraswati, your AI English tutor. मैं आपकी अंग्रेजी सीखने में मदद करूंगी। How can I help you today?',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "Great question! Let me help you with that. यह बहुत अच्छा सवाल है।",
        "I can see you're making progress! Keep practicing. आप बहुत अच्छा कर रहे हैं।",
        "Let's work on pronunciation. Try saying this word slowly: 'pronunciation' - प्रोनन्सिएशन।",
        "That's a common grammar mistake. The correct way is... यह एक आम गलती है।",
        "Excellent! Your English is improving. बहुत बढ़िया! आपकी अंग्रेजी सुधर रही है।"
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: Math.random() > 0.7 ? 'pronunciation' : 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'pronunciation':
        return <Volume2 className="h-3 w-3 text-blue-500" />;
      case 'grammar':
        return <Sparkles className="h-3 w-3 text-purple-500" />;
      default:
        return <MessageCircle className="h-3 w-3 text-primary" />;
    }
  };

  if (compact) {
    return (
      <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Saraswati AI</h3>
            <p className="text-xs text-muted-foreground">Your personal tutor</p>
          </div>
        </div>
        <p className="text-sm text-foreground mb-3">
          "Ready to practice English? मैं यहाँ आपकी मदद के लिए हूँ!"
        </p>
        <Button size="sm" className="w-full" onClick={() => window.open('/chat', '_blank')}>
          Start Conversation
        </Button>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-96 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200/50">
      {/* Header */}
      <div className="p-4 border-b border-indigo-200/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm">Saraswati AI Tutor</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30">
          AI Powered
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-white dark:bg-gray-800 border border-indigo-200/50'
              }`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    {getMessageIcon(message.type)}
                    <span className="text-xs font-medium text-muted-foreground">Saraswati</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                {message.role === 'assistant' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-6 px-2 text-xs"
                    onClick={() => speakText(message.content)}
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Listen
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white dark:bg-gray-800 border border-indigo-200/50 p-3 rounded-2xl">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                <span className="text-sm text-muted-foreground">Saraswati is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-indigo-200/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about English... (Hindi में भी पूछ सकते हैं)"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handleVoiceInput}
            disabled={isLoading || isListening}
            className={isListening ? "bg-red-100 border-red-300" : ""}
          >
            <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Powered by advanced AI • Bilingual support • Real-time feedback
        </p>
      </div>
    </Card>
  );
}