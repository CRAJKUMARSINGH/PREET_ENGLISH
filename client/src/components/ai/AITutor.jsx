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
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Star, MessageCircle, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
export function AITutor(_a) {
    var _this = this;
    var _b = _a.scenario, scenario = _b === void 0 ? 'general' : _b, _c = _a.context, context = _c === void 0 ? '' : _c, onClose = _a.onClose;
    var _d = useState([
        {
            id: '1',
            type: 'ai',
            content: "Hello! I'm your AI English tutor. I'm here to help you practice English conversation".concat(scenario !== 'general' ? " in a ".concat(scenario, " context") : '', ". Feel free to start a conversation with me!"),
            timestamp: new Date(),
        }
    ]), messages = _d[0], setMessages = _d[1];
    var _e = useState(''), inputMessage = _e[0], setInputMessage = _e[1];
    var _f = useState(false), loading = _f[0], setLoading = _f[1];
    var _g = useState(false), evaluating = _g[0], setEvaluating = _g[1];
    var scrollAreaRef = useRef(null);
    useEffect(function () {
        // Scroll to bottom when new messages are added
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);
    var sendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, conversationHistory, _a, responseRes, evaluationRes, aiResponse, evaluation_1, responseData, aiMessage_1, err_1, errorMessage_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!inputMessage.trim() || loading)
                        return [2 /*return*/];
                    userMessage = {
                        id: Date.now().toString(),
                        type: 'user',
                        content: inputMessage.trim(),
                        timestamp: new Date(),
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [userMessage], false); });
                    setInputMessage('');
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 9]);
                    conversationHistory = messages.map(function (m) { return "".concat(m.type, ": ").concat(m.content); });
                    return [4 /*yield*/, Promise.all([
                            fetch('/api/ai/conversation', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    message: userMessage.content,
                                    history: conversationHistory,
                                    scenario: scenario,
                                }),
                            }),
                            fetch('/api/ai/evaluate-conversation', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    message: userMessage.content,
                                    context: context || scenario,
                                    targetLevel: 'Intermediate', // Could be dynamic based on user level
                                }),
                            })
                        ])];
                case 2:
                    _a = _b.sent(), responseRes = _a[0], evaluationRes = _a[1];
                    aiResponse = 'I understand. Please continue.';
                    evaluation_1 = null;
                    if (!responseRes.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, responseRes.json()];
                case 3:
                    responseData = _b.sent();
                    aiResponse = responseData.response;
                    _b.label = 4;
                case 4:
                    if (!evaluationRes.ok) return [3 /*break*/, 6];
                    return [4 /*yield*/, evaluationRes.json()];
                case 5:
                    evaluation_1 = _b.sent();
                    _b.label = 6;
                case 6:
                    aiMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        type: 'ai',
                        content: aiResponse,
                        timestamp: new Date(),
                    };
                    // Update user message with evaluation
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev.slice(0, -1), true), [
                        __assign(__assign({}, userMessage), { evaluation: evaluation_1 }),
                        aiMessage_1
                    ], false); });
                    return [3 /*break*/, 9];
                case 7:
                    err_1 = _b.sent();
                    console.error('AI conversation error:', err_1);
                    errorMessage_1 = {
                        id: (Date.now() + 1).toString(),
                        type: 'ai',
                        content: 'I apologize, but I encountered an error. Please try again.',
                        timestamp: new Date(),
                    };
                    setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [errorMessage_1], false); });
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    var getScoreColor = function (score) {
        if (score >= 80)
            return 'text-green-600';
        if (score >= 60)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    var getScoreBadgeVariant = function (score) {
        if (score >= 80)
            return 'default';
        if (score >= 60)
            return 'secondary';
        return 'destructive';
    };
    return (<Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600"/>
            AI English Tutor
            {scenario !== 'general' && (<Badge variant="outline">{scenario}</Badge>)}
          </CardTitle>
          {onClose && (<Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>)}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(function (message) { return (<div key={message.id} className="space-y-2">
                <div className={"flex ".concat(message.type === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={"max-w-[80%] rounded-lg p-3 ".concat(message.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-900')}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'user' ? (<User className="h-4 w-4"/>) : (<Bot className="h-4 w-4"/>)}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>

                {/* Evaluation for user messages */}
                {message.type === 'user' && message.evaluation && (<div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getScoreBadgeVariant(message.evaluation.score)}>
                        <Star className="h-3 w-3 mr-1"/>
                        {message.evaluation.score}/100
                      </Badge>
                      <span className="text-xs text-muted-foreground">AI Evaluation</span>
                    </div>

                    {message.evaluation.feedback && (<Alert>
                        <MessageCircle className="h-4 w-4"/>
                        <AlertDescription className="text-sm">
                          {message.evaluation.feedback}
                        </AlertDescription>
                      </Alert>)}

                    {message.evaluation.suggestions.length > 0 && (<Alert>
                        <Lightbulb className="h-4 w-4"/>
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Suggestions:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.suggestions.map(function (suggestion, i) { return (<li key={i}>{suggestion}</li>); })}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>)}

                    {message.evaluation.grammarCorrections.length > 0 && (<Alert>
                        <CheckCircle className="h-4 w-4"/>
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Grammar:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.grammarCorrections.map(function (correction, i) { return (<li key={i}>{correction}</li>); })}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>)}

                    {message.evaluation.vocabularyTips.length > 0 && (<Alert>
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Vocabulary Tips:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.vocabularyTips.map(function (tip, i) { return (<li key={i}>{tip}</li>); })}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>)}
                  </div>)}
              </div>); })}

            {loading && (<div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4"/>
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>)}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input value={inputMessage} onChange={function (e) { return setInputMessage(e.target.value); }} onKeyPress={handleKeyPress} placeholder="Type your message in English..." disabled={loading} className="flex-1"/>
            <Button onClick={sendMessage} disabled={loading || !inputMessage.trim()} size="sm">
              {loading ? (<Loader2 className="h-4 w-4 animate-spin"/>) : (<Send className="h-4 w-4"/>)}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Your messages will be evaluated by AI for feedback
          </p>
        </div>
      </CardContent>
    </Card>);
}
