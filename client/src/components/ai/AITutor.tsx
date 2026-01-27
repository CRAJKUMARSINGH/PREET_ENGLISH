import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Star, 
  MessageCircle,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  evaluation?: {
    score: number;
    feedback: string;
    suggestions: string[];
    grammarCorrections: string[];
    vocabularyTips: string[];
  };
}

interface AITutorProps {
  scenario?: string;
  context?: string;
  onClose?: () => void;
}

export function AITutor({ scenario = 'general', context = '', onClose }: AITutorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI English tutor. I'm here to help you practice English conversation${scenario !== 'general' ? ` in a ${scenario} context` : ''}. Feel free to start a conversation with me!`,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Get AI response
      const conversationHistory = messages.map(m => `${m.type}: ${m.content}`);
      
      const [responseRes, evaluationRes] = await Promise.all([
        fetch('/api/ai/conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage.content,
            history: conversationHistory,
            scenario,
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
      ]);

      let aiResponse = 'I understand. Please continue.';
      let evaluation = null;

      if (responseRes.ok) {
        const responseData = await responseRes.json();
        aiResponse = responseData.response;
      }

      if (evaluationRes.ok) {
        evaluation = await evaluationRes.json();
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      // Update user message with evaluation
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...userMessage, evaluation },
        aiMessage
      ]);

    } catch (err) {
      console.error('AI conversation error:', err);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI English Tutor
            {scenario !== 'general' && (
              <Badge variant="outline">{scenario}</Badge>
            )}
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>

                {/* Evaluation for user messages */}
                {message.type === 'user' && message.evaluation && (
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getScoreBadgeVariant(message.evaluation.score)}>
                        <Star className="h-3 w-3 mr-1" />
                        {message.evaluation.score}/100
                      </Badge>
                      <span className="text-xs text-muted-foreground">AI Evaluation</span>
                    </div>

                    {message.evaluation.feedback && (
                      <Alert>
                        <MessageCircle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {message.evaluation.feedback}
                        </AlertDescription>
                      </Alert>
                    )}

                    {message.evaluation.suggestions.length > 0 && (
                      <Alert>
                        <Lightbulb className="h-4 w-4" />
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Suggestions:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.suggestions.map((suggestion, i) => (
                                <li key={i}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    {message.evaluation.grammarCorrections.length > 0 && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Grammar:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.grammarCorrections.map((correction, i) => (
                                <li key={i}>{correction}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    {message.evaluation.vocabularyTips.length > 0 && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="text-sm">
                            <strong>Vocabulary Tips:</strong>
                            <ul className="list-disc pl-4 mt-1">
                              {message.evaluation.vocabularyTips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message in English..."
              disabled={loading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={loading || !inputMessage.trim()}
              size="sm"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Your messages will be evaluated by AI for feedback
          </p>
        </div>
      </CardContent>
    </Card>
  );
}