var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User, TrendingUp, Clock, Target, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";
var conversationScenarios = [
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
    var _this = this;
    var _a = useState(conversationScenarios[0]), selectedScenario = _a[0], setSelectedScenario = _a[1];
    var _b = useState([]), messages = _b[0], setMessages = _b[1];
    var _c = useState(''), currentMessage = _c[0], setCurrentMessage = _c[1];
    var _d = useState(false), isRecording = _d[0], setIsRecording = _d[1];
    var _e = useState(false), isAiTyping = _e[0], setIsAiTyping = _e[1];
    var _f = useState(false), conversationStarted = _f[0], setConversationStarted = _f[1];
    var _g = useState({
        fluency: 0,
        vocabulary: 0,
        grammar: 0,
        confidence: 0,
        responseTime: 0,
        messagesCount: 0
    }), analytics = _g[0], setAnalytics = _g[1];
    var _h = useState(0), sessionDuration = _h[0], setSessionDuration = _h[1];
    var messagesEndRef = useRef(null);
    var startTimeRef = useRef(null);
    // AI response generation (simulated)
    var generateAIResponse = function (userMessage, scenario) { return __awaiter(_this, void 0, void 0, function () {
        var aiResponse, suggestions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsAiTyping(true);
                    // Simulate AI thinking time
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500 + Math.random() * 1000); })];
                case 1:
                    // Simulate AI thinking time
                    _a.sent();
                    aiResponse = '';
                    suggestions = [];
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
                            }
                            else if (userMessage.toLowerCase().includes('experience')) {
                                aiResponse = "That's great experience! Can you tell me about a challenging project you worked on and how you overcame the difficulties?";
                                suggestions = [
                                    "One challenging project was...",
                                    "I faced a difficult situation when...",
                                    "The biggest challenge I overcame was..."
                                ];
                            }
                            else {
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
                            }
                            else {
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
                            }
                            else {
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
                    return [2 /*return*/, {
                            id: Date.now().toString(),
                            sender: 'ai',
                            content: aiResponse,
                            timestamp: new Date(),
                            suggestions: suggestions
                        }];
            }
        });
    }); };
    // Send message function
    var sendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, aiResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!currentMessage.trim())
                        return [2 /*return*/];
                    userMessage = {
                        id: Date.now().toString(),
                        sender: 'user',
                        content: currentMessage,
                        timestamp: new Date(),
                        confidence: Math.random() * 20 + 80 // Simulate confidence score
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    setCurrentMessage('');
                    // Update analytics
                    setAnalytics(function (prev) { return (__assign(__assign({}, prev), { messagesCount: prev.messagesCount + 1, fluency: Math.min(100, prev.fluency + 2), vocabulary: Math.min(100, prev.vocabulary + 1.5), grammar: Math.min(100, prev.grammar + 1), confidence: Math.min(100, prev.confidence + 1.2) })); });
                    return [4 /*yield*/, generateAIResponse(currentMessage, selectedScenario)];
                case 1:
                    aiResponse = _a.sent();
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [aiResponse], false); });
                    return [2 /*return*/];
            }
        });
    }); };
    // Start conversation
    var startConversation = function () { return __awaiter(_this, void 0, void 0, function () {
        var initialMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setConversationStarted(true);
                    startTimeRef.current = new Date();
                    setMessages([]);
                    return [4 /*yield*/, generateAIResponse('', selectedScenario)];
                case 1:
                    initialMessage = _a.sent();
                    setMessages([initialMessage]);
                    return [2 /*return*/];
            }
        });
    }); };
    // Reset conversation
    var resetConversation = function () {
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
    useEffect(function () {
        var interval;
        if (conversationStarted && startTimeRef.current) {
            interval = setInterval(function () {
                var now = new Date();
                var duration = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000);
                setSessionDuration(duration);
            }, 1000);
        }
        return function () { return clearInterval(interval); };
    }, [conversationStarted]);
    // Auto-scroll to bottom
    useEffect(function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };
    return (<div className="conversation-simulator space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-500"/>
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
              {conversationScenarios.map(function (scenario) { return (<Button key={scenario.id} variant={selectedScenario.id === scenario.id ? "default" : "outline"} className="w-full h-auto p-4 flex flex-col items-start" onClick={function () {
                setSelectedScenario(scenario);
                resetConversation();
            }} disabled={conversationStarted}>
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-semibold">{scenario.title}</span>
                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-left opacity-80">{scenario.description}</p>
                </Button>); })}
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
                  {selectedScenario.learningGoals.map(function (goal, index) { return (<li key={index} className="flex items-center gap-2">
                      <Target className="w-3 h-3 text-blue-500"/>
                      {goal}
                    </li>); })}
                </ul>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4"/>
                  {selectedScenario.expectedDuration} min
                </div>
                <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                  {selectedScenario.difficulty}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          {conversationStarted && (<Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5"/>
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
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: "".concat(analytics.fluency, "%") }}/>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vocabulary:</span>
                    <span>{analytics.vocabulary.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: "".concat(analytics.vocabulary, "%") }}/>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Confidence:</span>
                    <span>{analytics.confidence.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: "".concat(analytics.confidence, "%") }}/>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Messages: {analytics.messagesCount}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Conversation Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-500"/>
                  {selectedScenario.title}
                </CardTitle>
                <div className="flex gap-2">
                  {!conversationStarted ? (<Button onClick={startConversation}>
                      Start Conversation
                    </Button>) : (<Button onClick={resetConversation} variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2"/>
                      Reset
                    </Button>)}
                </div>
              </div>
            </CardHeader>

            {conversationStarted ? (<>
                {/* Messages Area */}
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      {messages.map(function (message) { return (<div key={message.id} className={cn("flex gap-3", message.sender === 'user' ? "justify-end" : "justify-start")}>
                          <div className={cn("max-w-[80%] rounded-lg p-3", message.sender === 'user'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800")}>
                            <div className="flex items-center gap-2 mb-1">
                              {message.sender === 'user' ? (<User className="w-4 h-4"/>) : (<Bot className="w-4 h-4"/>)}
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                              {message.confidence && (<Badge variant="secondary" className="text-xs">
                                  {message.confidence.toFixed(0)}% confidence
                                </Badge>)}
                            </div>
                            <p className="text-sm">{message.content}</p>
                            
                            {message.suggestions && message.suggestions.length > 0 && (<div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-xs opacity-70 mb-2">Suggested responses:</p>
                                <div className="space-y-1">
                                  {message.suggestions.map(function (suggestion, index) { return (<Button key={index} variant="ghost" size="sm" className="h-auto p-2 text-xs justify-start" onClick={function () { return setCurrentMessage(suggestion); }}>
                                      {suggestion}
                                    </Button>); })}
                                </div>
                              </div>)}
                          </div>
                        </div>); })}
                      
                      {isAiTyping && (<div className="flex gap-3 justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4"/>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}/>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                              </div>
                            </div>
                          </div>
                        </div>)}
                      
                      <div ref={messagesEndRef}/>
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Input Area */}
                <div className="flex-shrink-0 p-4 border-t">
                  <div className="flex gap-2">
                    <Input value={currentMessage} onChange={function (e) { return setCurrentMessage(e.target.value); }} placeholder="Type your response..." onKeyPress={function (e) { return e.key === 'Enter' && sendMessage(); }} disabled={isAiTyping}/>
                    <Button onClick={sendMessage} disabled={!currentMessage.trim() || isAiTyping}>
                      <Send className="w-4 h-4"/>
                    </Button>
                  </div>
                </div>
              </>) : (<CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400"/>
                  <h3 className="text-lg font-medium mb-2">Ready to Practice?</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a conversation to practice your English skills in a realistic scenario.
                  </p>
                  <Button onClick={startConversation} size="lg">
                    Begin Conversation
                  </Button>
                </div>
              </CardContent>)}
          </Card>
        </div>
      </div>
    </div>);
}
{ /* हिंदी सहायता / Hindi Support */ }
{ /* यह घटक हिंदी भाषी उपयोगकर्ताओं के लिए डिज़ाइन किया गया है */ }
{ /* This component is designed for Hindi-speaking users */ }
export default ConversationSimulator;
