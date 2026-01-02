import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  TrendingUp,
  Target,
  Zap,
  RefreshCw,
  Eye,
  Edit3
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GrammarError {
  id: string;
  type: 'article' | 'preposition' | 'tense' | 'subject_verb' | 'word_order' | 'vocabulary';
  position: { start: number; end: number };
  incorrect: string;
  correct: string;
  explanation: string;
  hindiContext: string;
  severity: 'low' | 'medium' | 'high';
}

interface GrammarSuggestion {
  type: 'improvement' | 'style' | 'clarity';
  text: string;
  reason: string;
}

interface WritingAnalysis {
  errors: GrammarError[];
  suggestions: GrammarSuggestion[];
  readabilityScore: number;
  formalityLevel: 'casual' | 'semi-formal' | 'formal';
  wordCount: number;
  complexityScore: number;
}

const grammarRules = {
  articles: {
    title: 'Articles (a, an, the)',
    hindiExplanation: 'हिंदी में articles नहीं होते, इसलिए अंग्रेजी में इनका सही उपयोग सीखना जरूरी है',
    rules: [
      {
        rule: 'Use "a" before consonant sounds',
        example: 'a book, a university (यू sound)',
        hindiTip: 'व्यंजन ध्वनि से पहले "a" का उपयोग करें'
      },
      {
        rule: 'Use "an" before vowel sounds',
        example: 'an apple, an hour (ऑ sound)',
        hindiTip: 'स्वर ध्वनि से पहले "an" का उपयोग करें'
      },
      {
        rule: 'Use "the" for specific things',
        example: 'the book I bought yesterday',
        hindiTip: 'विशिष्ट चीजों के लिए "the" का उपयोग करें'
      }
    ]
  },
  prepositions: {
    title: 'Prepositions (in, on, at)',
    hindiExplanation: 'हिंदी में "में" सभी जगह उपयोग होता है, अंग्रेजी में अलग-अलग prepositions हैं',
    rules: [
      {
        rule: 'Use "in" for enclosed spaces and time periods',
        example: 'in the room, in January, in 2023',
        hindiTip: 'बंद जगह और समय अवधि के लिए "in"'
      },
      {
        rule: 'Use "on" for surfaces and specific days',
        example: 'on the table, on Monday, on 15th August',
        hindiTip: 'सतह और विशिष्ट दिन के लिए "on"'
      },
      {
        rule: 'Use "at" for specific points and times',
        example: 'at the door, at 5 PM, at home',
        hindiTip: 'विशिष्ट बिंदु और समय के लिए "at"'
      }
    ]
  },
  tenses: {
    title: 'Tense Usage',
    hindiExplanation: 'हिंदी speakers अक्सर continuous tense का अधिक उपयोग करते हैं',
    rules: [
      {
        rule: 'Simple Present for habits and facts',
        example: 'I work in IT. (not "I am working in IT")',
        hindiTip: 'आदत और तथ्य के लिए simple present'
      },
      {
        rule: 'Present Continuous for ongoing actions',
        example: 'I am working on a project right now.',
        hindiTip: 'चल रही गतिविधि के लिए continuous'
      },
      {
        rule: 'Present Perfect for completed actions with present relevance',
        example: 'I have finished my work. (अभी पूरा किया है)',
        hindiTip: 'पूर्ण कार्य जो वर्तमान से जुड़ा है'
      }
    ]
  }
};

const sampleTexts = {
  email: `Dear Sir/Madam,

I am writing to inquire about job opportunities in your company. I have completed my engineering degree and I am having 3 years experience in software development. I am very much interested to work with your team.

Please let me know if there is any suitable position available. I am attaching my resume for your reference.

Thanking you,
Regards,
Raj Kumar`,
  
  essay: `Technology is playing very important role in our daily life. In today's world, we are using technology for everything like communication, entertainment, and work. 

Mobile phones has become essential part of our life. We can do many things with mobile like calling, messaging, internet browsing, and taking photos. Social media platforms like Facebook and WhatsApp is helping us to stay connected with friends and family.

However, technology also has some disadvantages. Many people are becoming addicted to their phones and spending less time with real people. This is affecting our social skills and relationships.

In conclusion, technology is good if we use it properly, but we should not become too dependent on it.`,
  
  report: `Project Status Report

The software development project is progressing well. Our team has completed 70% of the work till now. We are facing some challenges in database integration, but we are working to resolve them.

Current Status:
- Frontend development: 90% complete
- Backend development: 60% complete  
- Testing: 40% complete
- Documentation: 30% complete

We are expecting to complete the project by end of this month. The client is satisfied with our progress and they are providing good feedback.

Next steps includes final testing, bug fixing, and deployment preparation.`
};

export function AdvancedGrammarCoach() {
  const [activeTab, setActiveTab] = useState('checker');
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<WritingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState<keyof typeof sampleTexts>('email');

  // Simulate grammar analysis (in production, this would use actual NLP service)
  const analyzeText = async (text: string): Promise<WritingAnalysis> => {
    setIsAnalyzing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const errors: GrammarError[] = [];
    const suggestions: GrammarSuggestion[] = [];
    
    // Detect common Hindi speaker errors
    const commonErrors = [
      {
        pattern: /I am having/gi,
        type: 'tense' as const,
        correct: 'I have',
        explanation: 'Use simple present for possession, not continuous',
        hindiContext: 'स्थायी चीजों के लिए continuous tense का उपयोग नहीं करते'
      },
      {
        pattern: /very much interested/gi,
        type: 'vocabulary' as const,
        correct: 'very interested',
        explanation: '"Very much" is not needed with "interested"',
        hindiContext: '"बहुत ज्यादा" का सीधा अनुवाद न करें'
      },
      {
        pattern: /\bis playing very important role\b/gi,
        type: 'article' as const,
        correct: 'is playing a very important role',
        explanation: 'Need article "a" before "role"',
        hindiContext: 'भूमिका से पहले "a" का उपयोग करें'
      },
      {
        pattern: /Mobile phones has/gi,
        type: 'subject_verb' as const,
        correct: 'Mobile phones have',
        explanation: 'Plural subject needs plural verb',
        hindiContext: 'बहुवचन subject के साथ बहुवचन verb'
      }
    ];
    
    commonErrors.forEach((errorPattern, index) => {
      const regex = new RegExp(errorPattern.pattern.source, errorPattern.pattern.flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        errors.push({
          id: `error_${index}_${match.index}`,
          type: errorPattern.type,
          position: { start: match.index, end: match.index + match[0].length },
          incorrect: match[0],
          correct: errorPattern.correct,
          explanation: errorPattern.explanation,
          hindiContext: errorPattern.hindiContext,
          severity: 'medium'
        });
        
        // Prevent infinite loop for global regex
        if (!errorPattern.pattern.global) break;
      }
    });
    
    // Add some suggestions
    suggestions.push(
      {
        type: 'improvement',
        text: 'Consider using more varied sentence structures',
        reason: 'This will make your writing more engaging and professional'
      },
      {
        type: 'style',
        text: 'Use active voice where possible',
        reason: 'Active voice is generally clearer and more direct'
      }
    );
    
    setIsAnalyzing(false);
    
    return {
      errors,
      suggestions,
      readabilityScore: Math.floor(Math.random() * 30) + 70,
      formalityLevel: text.includes('Dear') ? 'formal' : text.includes('Hi') ? 'casual' : 'semi-formal',
      wordCount: text.split(/\s+/).filter(word => word.length > 0).length,
      complexityScore: Math.floor(Math.random() * 40) + 40
    };
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    const result = await analyzeText(inputText);
    setAnalysis(result);
  };

  const loadSampleText = (sample: keyof typeof sampleTexts) => {
    setInputText(sampleTexts[sample]);
    setSelectedSample(sample);
    setAnalysis(null);
  };

  const applySuggestion = (error: GrammarError) => {
    const newText = inputText.substring(0, error.position.start) + 
                   error.correct + 
                   inputText.substring(error.position.end);
    setInputText(newText);
    setAnalysis(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-950/20';
      case 'low': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  return (
    <div className="advanced-grammar-coach space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-500" />
            Advanced Grammar Coach
            <Badge variant="secondary" className="ml-auto">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checker">Grammar Checker</TabsTrigger>
          <TabsTrigger value="rules">Grammar Rules</TabsTrigger>
          <TabsTrigger value="practice">Practice Exercises</TabsTrigger>
        </TabsList>

        {/* Grammar Checker Tab */}
        <TabsContent value="checker" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Text</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadSampleText('email')}
                    >
                      Sample Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadSampleText('essay')}
                    >
                      Sample Essay
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste your English text here for grammar checking..."
                  className="min-h-[300px] resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Words: {inputText.split(/\s+/).filter(word => word.length > 0).length}
                  </div>
                  
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!inputText.trim() || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Check Grammar
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <div className="space-y-6">
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="stat-item text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysis.errors.length}
                        </div>
                        <div className="text-sm text-muted-foreground">Errors Found</div>
                      </div>
                      
                      <div className="stat-item text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analysis.readabilityScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">Readability</div>
                      </div>
                    </div>

                    {/* Errors List */}
                    {analysis.errors.length > 0 && (
                      <div className="errors-section">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Grammar Errors ({analysis.errors.length})
                        </h4>
                        
                        <div className="space-y-3">
                          {analysis.errors.map((error) => (
                            <div key={error.id} className={cn('error-item p-3 rounded-lg border', getSeverityColor(error.severity))}>
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {error.type.replace('_', ' ')}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => applySuggestion(error)}
                                  className="h-6 px-2 text-xs"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Fix
                                </Button>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Incorrect:</span> "{error.incorrect}"
                                </div>
                                <div>
                                  <span className="font-medium">Correct:</span> "{error.correct}"
                                </div>
                                <div className="text-muted-foreground">
                                  {error.explanation}
                                </div>
                                <div className="text-blue-600 dark:text-blue-400 text-xs">
                                  Hindi में: {error.hindiContext}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {analysis.suggestions.length > 0 && (
                      <div className="suggestions-section">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          Improvement Suggestions
                        </h4>
                        
                        <div className="space-y-2">
                          {analysis.suggestions.map((suggestion, index) => (
                            <div key={index} className="suggestion-item p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                              <div className="text-sm font-medium mb-1">{suggestion.text}</div>
                              <div className="text-xs text-muted-foreground">{suggestion.reason}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Text Statistics */}
                    <div className="stats-section">
                      <h4 className="font-medium mb-3">Text Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Word Count:</span>
                          <span className="ml-2 font-medium">{analysis.wordCount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Formality:</span>
                          <span className="ml-2 font-medium capitalize">{analysis.formalityLevel}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="ml-2 font-medium">{analysis.complexityScore}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Readability:</span>
                          <span className="ml-2 font-medium">{analysis.readabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Ready to Check Grammar</h3>
                    <p className="text-muted-foreground">
                      Enter your text and click "Check Grammar" to get detailed analysis and suggestions.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Grammar Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          <div className="grid gap-6">
            {Object.entries(grammarRules).map(([key, ruleSet]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{ruleSet.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ruleSet.hindiExplanation}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ruleSet.rules.map((rule, index) => (
                      <div key={index} className="rule-item p-4 border rounded-lg">
                        <div className="font-medium mb-2">{rule.rule}</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium">Example:</span> {rule.example}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          <span className="font-medium">Hindi टिप:</span> {rule.hindiTip}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Practice Exercises Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Grammar Practice Exercises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Edit3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Practice Exercises Coming Soon</h3>
                <p className="text-muted-foreground">
                  Interactive grammar exercises specifically designed for Hindi speakers will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}