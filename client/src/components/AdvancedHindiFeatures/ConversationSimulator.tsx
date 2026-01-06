import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  TrendingUp,
  Clock,
  Target,
  Award,
  RefreshCw
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  confidence?: number;
  suggestions?: string[];
}

interface ConversationScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  context: string;
  aiPersonality: string;
  expectedDuration: number;
  learningGoals: string[];
}

interface ConversationAnalytics {
  fluency: number;
  vocabulary: number;
  grammar: number;
  confidence: number;
  responseTime: number;
  messagesCount: number;
}

const conversationScenarios: ConversationScenario[] = [
  {
    id: 'job_interview',
    title: 'Job Interview',
    description: 'Practice answering common interview questions with confidence',
    difficulty: 'advanced',
    context: 'You are interviewing for a software developer position at a tech company in Bangalore.',
    aiPersonality: 'Professional HR manager who asks thoughtful questions and provides constructive feedback',
    expectedDuration: 15,
    learningGoals: [
      'Professional communication',
      'Confidence building',
      'Technical vocabulary',
      'Formal language usage'
    ]
  },
  {
    id: 'business_meeting',
    title: 'Business Meeting',
    description: 'Participate in a team meeting and present your ideas clearly',
    difficulty: 'intermediate',
    context: 'You are in a project planning meeting with your team discussing the next quarter goals.',
    aiPersonality: 'Collaborative team lead who encourages participation and asks for opinions',
    expectedDuration: 12,
    learningGoals: [
      'Business vocabulary',
      'Expressing opinions',
      'Active participation',
      'Professional etiquette'
    ]
  },
  {
    id: 'casual_conversation',
    title: 'Casual Chat',
    description: 'Have a friendly conversation about hobbies and interests',
    difficulty: 'beginner',
    context: 'You are chatting with a new colleague during lunch break about weekend plans and hobbies.',
    aiPersonality: 'Friendly colleague who is interested in getting to know you better',
    expectedDuration: 8,
    learningGoals: [
      'Small talk skills',
      'Personal expression',
      'Informal language',
      'Building rapport'
    ]
  },
  {
    id: 'customer_service',
    title: 'Customer Service',
    description: 'Handle customer inquiries and resolve issues professionally',
    difficulty: 'intermediate',
    context: 'You are a customer service representative helping a customer with their product inquiry.',
    aiPersonality: 'Customer with a genuine question who appreciates helpful and clear communication',
    expectedDuration: 10,
    learningGoals: [
      'Problem-solving language',
      'Polite communication',
      'Clear explanations',
      'Professional service'
    ]
  },
  {
    id: 'presentation',
    title: 'Presentation Practice',
    description: 'Present your ideas and handle questions from the audience',
    difficulty: 'advanced',
    context: 'You are presenting a new project proposal to senior management.',
    aiPersonality: 'Engaged audience member who asks relevant questions and seeks clarification',
    expectedDuration: 20,
    learningGoals: [
      'Presentation skills',
      'Persuasive language',
      'Handling questions',
      'Confident delivery'
    ]
  }
];

export function ConversationSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(conversationScenarios[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [analytics, setAnalytics] = useState<ConversationAnalytics>({
    fluency: 0,
    vocabulary: 0,
    grammar: 0,
    confidence: 0,
    responseTime: 0,
    messagesCount: 0
  });
  const [sessionDuration, setSessionDuration] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<Date | null>(null);

  // AI response generation (simulated)
  const generateAIResponse = async (userMessage: string, scenario: ConversationScenario): Promise<Message> => {
    setIsAiTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    let aiResponse = '';
    let suggestions: string[] = [];
    
    // Generate contextual responses based on scenario
    switch (scenario.id) {
      case 'job_interview':
        if (messages.length === 0) {
          aiResponse = "Hello! Thank you for coming in today. I'm excited to learn more about you. Could you start by telling me a bit about yourself and why you're interested in this position?";
          suggestions = [
            "I have X years of experience in...",
            "I'm passionate about technology because...",
            "My background includes..."
          ];
        } else if (userMessage.toLowerCase().includes('experience')) {
          aiResponse = "That's great experience! Can you tell me about a challenging project you worked on and how you overcame the difficulties?";
          suggestions = [
            "One challenging project was...",
            "I faced a difficult situation when...",
            "The biggest challenge I overcame was..."
          ];
        } else {
          aiResponse = "Interesting! What do you think are your greatest strengths, and how would they benefit our team?";
          suggestions = [
            "My greatest strength is...",
            "I believe I can contribute by...",
            "One thing that sets me apart is..."
          ];
        }
        break;
        
      case 'business_meeting':
        if (messages.length === 0) {
          aiResponse = "Good morning everyone! Let's start our quarterly planning meeting. I'd like to hear everyone's thoughts on our priorities for the next quarter. What do you think should be our main focus?";
          suggestions = [
            "I think we should prioritize...",
            "Based on last quarter's results...",
            "My suggestion would be to focus on..."
          ];
        } else {
          aiResponse = "That's a valuable perspective! How do you think we can measure the success of this initiative? What metrics should we track?";
          suggestions = [
            "We could measure success by...",
            "Key metrics might include...",
            "I suggest we track..."
          ];
        }
        break;
        
      case 'casual_conversation':
        if (messages.length === 0) {
          aiResponse = "Hey! How's your day going? I was just thinking about weekend plans. Do you have anything fun planned?";
          suggestions = [
            "My day is going well, thanks!",
            "I'm planning to...",
            "Actually, I was thinking of..."
          ];
        } else {
          aiResponse = "That sounds really interesting! I love hearing about different hobbies. How did you get started with that?";
          suggestions = [
            "I got started when...",
            "It began as...",
            "I've been interested in this since..."
          ];
        }
        break;
        
      default:
        aiResponse = "I understand. Could you tell me more about that?";
        suggestions = [
          "Sure, let me explain...",
          "What I mean is...",
          "To elaborate on that..."
        ];
    }
    
    setIsAiTyping(false);
    
    return {
      id: Date.now().toString(),
      sender: 'ai',
      content: aiResponse,
      timestamp: new Date(),
      suggestions
    };
  };

  // Send message function
  const sendMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: currentMessage,
      timestamp: new Date(),
      confidence: Math.random() * 20 + 80 // Simulate confidence score
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      messagesCount: prev.messagesCount + 1,
      fluency: Math.min(100, prev.fluency + 2),
      vocabulary: Math.min(100, prev.vocabulary + 1.5),
      grammar: Math.min(100, prev.grammar + 1),
      confidence: Math.min(100, prev.confidence + 1.2)
    }));
    
    // Generate AI response
    const aiResponse = await generateAIResponse(currentMessage, selectedScenario);
    setMessages(prev => [...prev, aiResponse]);
  };

  // Start conversation
  const startConversation = async () => {
    setConversationStarted(true);
    startTimeRef.current = new Date();
    setMessages([]);
    
    // AI starts the conversation
    const initialMessage = await generateAIResponse('', selectedScenario);
    setMessages([initialMessage]);
  };

  // Reset conversation
  const resetConversation = () => {
    setConversationStarted(false);
    setMessages([]);
    setCurrentMessage('');
    startTimeRef.current = null;
    setSessionDuration(0);
    setAnalytics({
      fluency: 0,
      vocabulary: 0,
      grammar: 0,
      confidence: 0,
      responseTime: 0,
      messagesCount: 0
    });
  };

  // Update session duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (conversationStarted && startTimeRef.current) {
      interval = setInterval(() => {
        const now = new Date();
        const duration = Math.floor((now.getTime() - startTimeRef.current!.getTime()) / 1000);
        setSessionDuration(duration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [conversationStarted]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="conversation-simulator space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            AI Conversation Simulator
            <Badge variant="secondary" className="ml-auto">
              Interactive Practice
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Choose Scenario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversationScenarios.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant={selectedScenario.id === scenario.id ? "default" : "outline"}
                  className="w-full h-auto p-4 flex flex-col items-start"
                  onClick={() => {
                    setSelectedScenario(scenario);
                    resetConversation();
                  }}
                  disabled={conversationStarted}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-semibold">{scenario.title}</span>
                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-left opacity-80">{scenario.description}</p>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Scenario Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Scenario Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Context:</h4>
                <p className="text-sm text-muted-foreground">{selectedScenario.context}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Learning Goals:</h4>
                <ul className="text-sm space-y-1">
                  {selectedScenario.learningGoals.map((goal, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Target className="w-3 h-3 text-blue-500" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedScenario.expectedDuration} min
                </div>
                <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                  {selectedScenario.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          {conversationStarted && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Live Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Duration:</span>
                  <span className="font-mono">{formatTime(sessionDuration)}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Fluency:</span>
                    <span>{analytics.fluency.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${analytics.fluency}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vocabulary:</span>
                    <span>{analytics.vocabulary.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${analytics.vocabulary}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence:</span>
                    <span>{analytics.confidence.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${analytics.confidence}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Messages: {analytics.messagesCount}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Conversation Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  {selectedScenario.title}
                </CardTitle>
                <div className="flex gap-2">
                  {!conversationStarted ? (
                    <Button onClick={startConversation}>
                      Start Conversation
                    </Button>
                  ) : (
                    <Button onClick={resetConversation} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {conversationStarted ? (
              <>
                {/* Messages Area */}
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3",
                            message.sender === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg p-3",
                              message.sender === 'user'
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.sender === 'user' ? (
                                <User className="w-4 h-4" />
                              ) : (
                                <Bot className="w-4 h-4" />
                              )}
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.confidence && (
                                <Badge variant="secondary" className="text-xs">
                                  {message.confidence.toFixed(0)}% confidence
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm">{message.content}</p>
                            
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs opacity-70 mb-2">Suggested responses:</p>
                                <div className="space-y-1">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="ghost"
                                      size="sm"
                                      className="h-auto p-2 text-xs justify-start"
                                      onClick={() => setCurrentMessage(suggestion)}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isAiTyping && (
                        <div className="flex gap-3 justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4" />
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Input Area */}
                <div className="flex-shrink-0 p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your response..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={isAiTyping}
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!currentMessage.trim() || isAiTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Ready to Practice?</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation to practice your English skills in a realistic scenario.
                  </p>
                  <Button onClick={startConversation} size="lg">
                    Begin Conversation
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


{/* हिंदी सहायता / Hindi Support */}
{/* यह घटक हिंदी भाषी उपयोगकर्ताओं के लिए डिज़ाइन किया गया है */}
{/* This component is designed for Hindi-speaking users */}
export default ConversationSimulator;