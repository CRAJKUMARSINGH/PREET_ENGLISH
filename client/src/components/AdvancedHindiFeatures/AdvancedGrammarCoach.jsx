import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, BookOpen, Brain, Target } from "lucide-react";
// Sample grammar rules and corrections
var grammarRules = {
    articles: {
        title: "Articles (a, an, the)",
        titleHindi: "आर्टिकल्स (a, an, the)",
        rules: [
            {
                rule: "Use 'a' before consonant sounds",
                ruleHindi: "व्यंजन ध्वनि से पहले 'a' का प्रयोग करें",
                example: "a book, a university",
                exampleHindi: "एक किताब, एक विश्वविद्यालय"
            },
            {
                rule: "Use 'an' before vowel sounds",
                ruleHindi: "स्वर ध्वनि से पहले 'an' का प्रयोग करें",
                example: "an apple, an hour",
                exampleHindi: "एक सेब, एक घंटा"
            }
        ]
    }
};
var commonMistakes = [
    {
        incorrect: "I am going to school since morning",
        correct: "I have been going to school since morning",
        explanation: "Use present perfect continuous for actions that started in the past and continue",
        explanationHindi: "भूतकाल में शुरू होकर अभी तक जारी कार्यों के लिए present perfect continuous का प्रयोग करें"
    }
];
// Mock AI grammar checker
var checkGrammar = function (text) {
    var issues = [];
    if (text.includes("more prettier")) {
        issues.push({
            type: "error",
            message: "Incorrect comparative form",
            messageHindi: "गलत तुलनात्मक रूप",
            suggestion: "Use 'prettier' instead of 'more prettier'",
            suggestionHindi: "'more prettier' के बजाय 'prettier' का प्रयोग करें"
        });
    }
    return issues;
};
var sampleTexts = {
    beginner: "Hello, my name is Raj. I am student in Delhi. I like to play cricket and watch movies.",
    intermediate: "I am working in IT company since last two years. The work is challenging but I am enjoying it very much.",
    advanced: "Despite of the economic challenges, the company has managed to maintain its growth trajectory."
};
export function AdvancedGrammarCoach() {
    var _a = useState('checker'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useState(''), inputText = _b[0], setInputText = _b[1];
    var _c = useState(null), analysis = _c[0], setAnalysis = _c[1];
    var _d = useState(false), isAnalyzing = _d[0], setIsAnalyzing = _d[1];
    var _e = useState('beginner'), selectedSample = _e[0], setSelectedSample = _e[1];
    var handleAnalyze = function () {
        setIsAnalyzing(true);
        var issues = checkGrammar(inputText);
        var score = Math.max(0, 100 - (issues.length * 10));
        setAnalysis({
            issues: issues,
            score: score,
            improvements: ["Consider using more varied sentence structures", "Check for subject-verb agreement"]
        });
        setTimeout(function () { return setIsAnalyzing(false); }, 1000);
    };
    var loadSample = function (sample) {
        setInputText(sampleTexts[sample]);
        setSelectedSample(sample);
    };
    return (<div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-emerald-500"/>
            Advanced Grammar Coach
            <Badge variant="secondary" className="ml-2">AI-Powered</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Get intelligent grammar suggestions and writing improvements
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="checker">Grammar Checker</TabsTrigger>
              <TabsTrigger value="rules">Grammar Rules</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="checker" className="space-y-4">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={function () { return loadSample('beginner'); }}>
                    Beginner Sample
                  </Button>
                  <Button variant="outline" size="sm" onClick={function () { return loadSample('intermediate'); }}>
                    Intermediate Sample
                  </Button>
                  <Button variant="outline" size="sm" onClick={function () { return loadSample('advanced'); }}>
                    Advanced Sample
                  </Button>
                </div>
                
                <Textarea value={inputText} onChange={function (e) { return setInputText(e.target.value); }} placeholder="Type or paste your English text here for grammar checking..." className="min-h-[300px] resize-none"/>
                
                <Button onClick={handleAnalyze} disabled={!inputText.trim() || isAnalyzing} className="w-full">
                  {isAnalyzing ? "Analyzing..." : "Check Grammar"}
                </Button>
                
                {analysis && (<Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5"/>
                        Analysis Results
                        <Badge variant={analysis.score >= 80 ? "default" : "destructive"}>
                          Score: {analysis.score}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {analysis.issues.length > 0 ? (<div className="space-y-3">
                          {analysis.issues.map(function (issue, index) { return (<div key={index} className="p-3 border rounded-lg">
                              <div className="flex items-start gap-2">
                                {issue.type === 'error' ? (<XCircle className="h-5 w-5 text-red-500 mt-0.5"/>) : (<AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5"/>)}
                                <div className="flex-1">
                                  <p className="font-medium">{issue.message}</p>
                                  <p className="text-sm text-muted-foreground">{issue.messageHindi}</p>
                                  <p className="text-sm text-emerald-600 mt-1">{issue.suggestion}</p>
                                  <p className="text-xs text-emerald-500">{issue.suggestionHindi}</p>
                                </div>
                              </div>
                            </div>); })}
                        </div>) : (<div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5"/>
                          <span>No grammar issues found!</span>
                        </div>)}
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-4">
              <div className="grid gap-4">
                {Object.entries(grammarRules).map(function (_a) {
            var key = _a[0], rule = _a[1];
            return (<Card key={key}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500"/>
                        {rule.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{rule.titleHindi}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {rule.rules.map(function (r, index) { return (<div key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <p className="font-medium">{r.rule}</p>
                            <p className="text-sm text-muted-foreground">{r.ruleHindi}</p>
                            <div className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                Example: {r.example}
                              </p>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                {r.exampleHindi}
                              </p>
                            </div>
                          </div>); })}
                      </div>
                    </CardContent>
                  </Card>);
        })}
              </div>
            </TabsContent>
            
            <TabsContent value="mistakes" className="space-y-4">
              <div className="grid gap-4">
                {commonMistakes.map(function (mistake, index) { return (<Card key={index}>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="font-medium text-red-700 dark:text-red-300">
                            ❌ Incorrect: {mistake.incorrect}
                          </p>
                        </div>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="font-medium text-green-700 dark:text-green-300">
                            ✅ Correct: {mistake.correct}
                          </p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Explanation: {mistake.explanation}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            {mistake.explanationHindi}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>); })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>);
}
