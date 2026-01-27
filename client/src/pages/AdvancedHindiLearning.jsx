import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageCircle, BookOpen, Settings, Zap, Target, TrendingUp, Award, Sparkles } from 'lucide-react';
// Import advanced components
import { AIPronunciationTrainer } from '@/components/AdvancedHindiFeatures/AIPronunciationTrainer';
import { ConversationSimulator } from '@/components/AdvancedHindiFeatures/ConversationSimulator';
import { AdvancedGrammarCoach } from '@/components/AdvancedHindiFeatures/AdvancedGrammarCoach';
import { PersonalizationEngine } from '@/components/AdvancedHindiFeatures/PersonalizationEngine';
export default function AdvancedHindiLearning() {
    var _a = useState('overview'), activeTab = _a[0], setActiveTab = _a[1];
    return (<div className="advanced-hindi-learning container mx-auto px-4 py-8">
      {/* Header */}
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-purple-500"/>
          🇮🇳 Advanced Hindi Learning System
          <Sparkles className="w-10 h-10 text-purple-500"/>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          AI-powered advanced features specifically designed for Hindi mother tongue speakers. 
          Take your English learning to the next level with personalized coaching, conversation practice, and intelligent feedback.
        </p>
        <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
          🤖 Powered by Artificial Intelligence
        </Badge>
      </div>

      {/* Feature Overview Cards */}
      <div className="feature-overview grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="feature-card hover:shadow-lg transition-shadow cursor-pointer" onClick={function () { return setActiveTab('pronunciation'); }}>
          <CardContent className="pt-6 text-center">
            <Brain className="w-12 h-12 mx-auto mb-3 text-purple-500"/>
            <h3 className="font-semibold mb-2">AI Pronunciation Trainer</h3>
            <p className="text-sm text-muted-foreground">Advanced speech analysis with real-time feedback</p>
          </CardContent>
        </Card>

        <Card className="feature-card hover:shadow-lg transition-shadow cursor-pointer" onClick={function () { return setActiveTab('conversation'); }}>
          <CardContent className="pt-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-blue-500"/>
            <h3 className="font-semibold mb-2">Conversation Simulator</h3>
            <p className="text-sm text-muted-foreground">Practice real-world scenarios with AI partner</p>
          </CardContent>
        </Card>

        <Card className="feature-card hover:shadow-lg transition-shadow cursor-pointer" onClick={function () { return setActiveTab('grammar'); }}>
          <CardContent className="pt-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-green-500"/>
            <h3 className="font-semibold mb-2">Grammar Coach</h3>
            <p className="text-sm text-muted-foreground">Real-time grammar correction and improvement</p>
          </CardContent>
        </Card>

        <Card className="feature-card hover:shadow-lg transition-shadow cursor-pointer" onClick={function () { return setActiveTab('personalization'); }}>
          <CardContent className="pt-6 text-center">
            <Settings className="w-12 h-12 mx-auto mb-3 text-orange-500"/>
            <h3 className="font-semibold mb-2">Personalization Engine</h3>
            <p className="text-sm text-muted-foreground">Adaptive learning tailored to your needs</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Target className="w-4 h-4"/>
            Overview
          </TabsTrigger>
          <TabsTrigger value="pronunciation" className="flex items-center gap-1">
            <Brain className="w-4 h-4"/>
            AI Trainer
          </TabsTrigger>
          <TabsTrigger value="conversation" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4"/>
            Conversation
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4"/>
            Grammar
          </TabsTrigger>
          <TabsTrigger value="personalization" className="flex items-center gap-1">
            <Settings className="w-4 h-4"/>
            Personal
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="overview-section">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🚀 Next-Level English Learning for Hindi Speakers
            </h2>
            
            {/* Benefits Grid */}
            <div className="benefits-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="benefit-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-yellow-500"/>
                    AI-Powered Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Real-time pronunciation analysis</li>
                    <li>• Intelligent conversation partner</li>
                    <li>• Personalized learning paths</li>
                    <li>• Advanced grammar correction</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="benefit-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-blue-500"/>
                    Hindi-Specific Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Addresses Hindi speaker challenges</li>
                    <li>• Cultural context integration</li>
                    <li>• Hindi-English comparison</li>
                    <li>• Indian workplace scenarios</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="benefit-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5 text-green-500"/>
                    Measurable Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Detailed analytics dashboard</li>
                    <li>• Skill-wise progress tracking</li>
                    <li>• Improvement predictions</li>
                    <li>• Achievement milestones</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Feature Highlights */}
            <div className="feature-highlights space-y-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                🌟 Advanced Features Overview
              </h3>

              <div className="features-list space-y-4">
                <Card className="feature-highlight">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="feature-icon bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                        <Brain className="w-6 h-6 text-purple-600"/>
                      </div>
                      <div className="feature-content flex-1">
                        <h4 className="font-semibold mb-2">AI Pronunciation Trainer</h4>
                        <p className="text-muted-foreground mb-3">
                          Advanced speech recognition technology analyzes your pronunciation in real-time, 
                          providing detailed feedback on phonemes, stress patterns, and intonation specifically 
                          tailored for Hindi speakers.
                        </p>
                        <div className="feature-tags flex flex-wrap gap-2">
                          <Badge variant="secondary">Real-time Analysis</Badge>
                          <Badge variant="secondary">Phoneme Scoring</Badge>
                          <Badge variant="secondary">Hindi Context</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="feature-highlight">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="feature-icon bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                        <MessageCircle className="w-6 h-6 text-blue-600"/>
                      </div>
                      <div className="feature-content flex-1">
                        <h4 className="font-semibold mb-2">Conversation Simulator</h4>
                        <p className="text-muted-foreground mb-3">
                          Practice real-world conversations with an AI partner that adapts to your responses. 
                          Scenarios include job interviews, business meetings, casual conversations, and more, 
                          all designed for Indian contexts.
                        </p>
                        <div className="feature-tags flex flex-wrap gap-2">
                          <Badge variant="secondary">Interactive AI</Badge>
                          <Badge variant="secondary">Real Scenarios</Badge>
                          <Badge variant="secondary">Performance Analytics</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="feature-highlight">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="feature-icon bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                        <BookOpen className="w-6 h-6 text-green-600"/>
                      </div>
                      <div className="feature-content flex-1">
                        <h4 className="font-semibold mb-2">Advanced Grammar Coach</h4>
                        <p className="text-muted-foreground mb-3">
                          Real-time grammar checking with context-aware suggestions. Identifies common mistakes 
                          Hindi speakers make and provides explanations with Hindi context for better understanding.
                        </p>
                        <div className="feature-tags flex flex-wrap gap-2">
                          <Badge variant="secondary">Real-time Correction</Badge>
                          <Badge variant="secondary">Context Aware</Badge>
                          <Badge variant="secondary">Hindi Explanations</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="feature-highlight">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="feature-icon bg-orange-100 dark:bg-orange-900/20 p-3 rounded-lg">
                        <Settings className="w-6 h-6 text-orange-600"/>
                      </div>
                      <div className="feature-content flex-1">
                        <h4 className="font-semibold mb-2">Personalization Engine</h4>
                        <p className="text-muted-foreground mb-3">
                          AI-powered personalization that adapts to your learning style, pace, and goals. 
                          Provides customized recommendations and adjusts difficulty based on your progress 
                          and performance patterns.
                        </p>
                        <div className="feature-tags flex flex-wrap gap-2">
                          <Badge variant="secondary">Adaptive Learning</Badge>
                          <Badge variant="secondary">Custom Recommendations</Badge>
                          <Badge variant="secondary">Progress Prediction</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Getting Started */}
            <Card className="getting-started mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500"/>
                  Ready to Start Your Advanced Learning Journey?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Begin with the Personalization Engine to create your custom learning profile, 
                  then explore each advanced feature to accelerate your English learning progress.
                </p>
                <div className="flex gap-3">
                  <Button onClick={function () { return setActiveTab('personalization'); }} size="lg">
                    Start Assessment
                  </Button>
                  <Button onClick={function () { return setActiveTab('pronunciation'); }} variant="outline" size="lg">
                    Try AI Trainer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Pronunciation Trainer Tab */}
        <TabsContent value="pronunciation" className="space-y-6">
          <AIPronunciationTrainer />
        </TabsContent>

        {/* Conversation Simulator Tab */}
        <TabsContent value="conversation" className="space-y-6">
          <ConversationSimulator />
        </TabsContent>

        {/* Advanced Grammar Coach Tab */}
        <TabsContent value="grammar" className="space-y-6">
          <AdvancedGrammarCoach />
        </TabsContent>

        {/* Personalization Engine Tab */}
        <TabsContent value="personalization" className="space-y-6">
          <PersonalizationEngine />
        </TabsContent>
      </Tabs>
    </div>);
}
