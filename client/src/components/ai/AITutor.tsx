import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ModernInput from '../ui/ModernInput';
import ModernBadge from '../ui/ModernBadge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  context?: string;
}

interface AITutorProps {
  className?: string;
  onLearningPathUpdate?: (suggestions: string[]) => void;
}

const AITutor: React.FC<AITutorProps> = ({ className, onLearningPathUpdate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI English tutor. I\'m here to help you learn English in a way that\'s perfect for Hindi speakers. What would you like to practice today?',
      timestamp: new Date(),
      context: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Help me with pronunciation',
    'Explain English grammar',
    'Practice conversation',
    'Common mistakes for Hindi speakers'
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Context-aware responses based on common Hindi speaker needs
    if (lowerMessage.includes('pronunciation') || lowerMessage.includes('pronounce')) {
      setCurrentTopic('pronunciation');
      return `Great question about pronunciation! As a Hindi speaker, you might find these sounds challenging:

**TH sounds**: 
- "Think" (थिंक) - Put your tongue between your teeth
- "This" (दिस) - Same position but voice it

**V vs W sounds**:
- "Very" (वेरी) - Touch your bottom lip with top teeth
- "Water" (वाटर) - Round your lips like saying "ऊ"

Would you like me to explain any specific sound? Try saying these words and I'll help you improve!`;
    }
    
    if (lowerMessage.includes('grammar') || lowerMessage.includes('tense')) {
      setCurrentTopic('grammar');
      return `Grammar can be tricky when coming from Hindi! Here are key differences:

**Articles (a, an, the)**:
- Hindi doesn't have articles, but English needs them
- "I am student" ❌ → "I am a student" ✅
- "Student is intelligent" ❌ → "The student is intelligent" ✅

**Present Continuous Overuse**:
- Hindi speakers often overuse "-ing" forms
- "I am knowing" ❌ → "I know" ✅
- "I am having a car" ❌ → "I have a car" ✅

What specific grammar topic would you like to practice?`;
    }
    
    if (lowerMessage.includes('conversation') || lowerMessage.includes('speak')) {
      setCurrentTopic('conversation');
      return `Let's practice conversation! Here's a common scenario:

**At a Restaurant:**
- Waiter: "What would you like to order?"
- You: "I would like..." (not "I want...")
- Waiter: "Anything to drink?"
- You: "Could I have..." (polite form)

**Tips for Hindi speakers:**
- Use "Could I..." instead of "I want"
- Say "Excuse me" to get attention (not "Listen")
- "Thank you" after receiving anything

Try responding to this: "Good evening! Table for how many people?"`;
    }
    
    if (lowerMessage.includes('mistake') || lowerMessage.includes('error')) {
      setCurrentTopic('mistakes');
      return `Here are the most common mistakes Hindi speakers make:

**1. Word Order:**
- "My name Raj is" ❌ → "My name is Raj" ✅
- "I yesterday went" ❌ → "I went yesterday" ✅

**2. Prepositions:**
- "I am going to school by foot" ❌ → "I am going to school on foot" ✅
- "I live in Delhi from 5 years" ❌ → "I have lived in Delhi for 5 years" ✅

**3. Plurals:**
- "I have two book" ❌ → "I have two books" ✅
- "Many people is coming" ❌ → "Many people are coming" ✅

Which of these would you like to practice more?`;
    }
    
    if (lowerMessage.includes('business') || lowerMessage.includes('office') || lowerMessage.includes('work')) {
      setCurrentTopic('business');
      return `Business English for Indian professionals:

**Email Writing:**
- Start: "Dear Mr./Ms. [Name]" (not "Respected Sir")
- End: "Best regards" or "Kind regards" (not "Thanking you")

**Phone Calls:**
- "This is [Name] speaking" (not "I am [Name] here")
- "Could you please hold?" (not "Please wait")

**Meetings:**
- "I'd like to suggest..." (not "I am having one suggestion")
- "Let's schedule a follow-up" (not "We will do follow-up")

What business situation would you like to practice?`;
    }
    
    // Default response with personalized suggestions
    const responses = [
      `That's a great question! As someone learning English from Hindi, I understand this can be challenging. Let me break it down for you...`,
      `I see what you're asking about. This is actually a common area where Hindi speakers need extra practice. Here's what I recommend...`,
      `Excellent! This topic is very important for Hindi speakers. Let me explain it in a way that connects to what you already know...`,
      `Good question! Many of my Hindi-speaking students ask about this. The key difference from Hindi is...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + 
           `\n\nBased on your question, I think you might also benefit from practicing:\n• Pronunciation drills\n• Grammar exercises\n• Conversation practice\n\nWhat would you like to focus on next?`;
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        context: currentTopic || 'general'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update learning path suggestions
      const newSuggestions = [
        'Practice pronunciation exercises',
        'Try grammar quizzes',
        'Role-play conversations',
        'Review common mistakes'
      ];
      setSuggestions(newSuggestions);
      onLearningPathUpdate?.(newSuggestions);
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I\'m having trouble responding right now. Please try asking your question again.',
        timestamp: new Date(),
        context: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/❌/g, '<span style="color: #ef4444;">❌</span>')
      .replace(/✅/g, '<span style="color: #10b981;">✅</span>')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
      ));
  };
  
  return (
    <ModernCard variant="glass" className={cn('flex flex-col h-96', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-lg">
            🤖
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              AI English Tutor
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Specialized for Hindi speakers
            </p>
          </div>
        </div>
        
        {currentTopic && (
          <ModernBadge variant="primary" size="sm">
            {currentTopic}
          </ModernBadge>
        )}
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] p-3 rounded-lg text-sm',
                message.type === 'user'
                  ? 'bg-primary-500 text-white rounded-br-none'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none'
              )}
            >
              <div className="space-y-1">
                {formatMessage(message.content)}
              </div>
              <div className={cn(
                'text-xs mt-2 opacity-70',
                message.type === 'user' ? 'text-primary-100' : 'text-neutral-500'
              )}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg rounded-bl-none">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <ModernInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about English learning..."
            className="flex-1"
            disabled={isTyping}
          />
          <ModernButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            icon="📤"
            variant="primary"
          >
            Send
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  );
};

export default AITutor;