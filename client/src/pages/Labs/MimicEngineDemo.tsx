/**
 * Mimic Engine Demo Page
 * Showcases the viral "Contextual Shadowing" feature
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MimicEngine } from '@/components/MimicEngine';
import { Trophy, Star, Target, Zap, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const DEMO_PHRASES = {
  beginner: [
    "Hello, how are you?",
    "My name is Sarah.",
    "I am learning English.",
    "Thank you very much.",
    "Have a nice day!"
  ],
  intermediate: [
    "Could you please help me with this?",
    "I would like to make a reservation.",
    "The weather is beautiful today.",
    "I'm looking forward to meeting you.",
    "Let me think about it for a moment."
  ],
  advanced: [
    "I appreciate your consideration of this matter.",
    "The implementation of this strategy requires careful planning.",
    "Despite the challenges, we managed to achieve our objectives.",
    "The correlation between these variables is quite significant.",
    "I would be delighted to discuss this opportunity further."
  ]
};

export default function MimicEngineDemo() {
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedPhrase, setSelectedPhrase] = useState(DEMO_PHRASES.beginner[0]);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedLevel(level);
    setSelectedPhrase(DEMO_PHRASES[level][0]);
  };

  const handleScoreUpdate = (score: number) => {
    setTotalScore(prev => prev + score);
    setAttempts(prev => prev + 1);
  };

  const averageScore = attempts > 0 ? Math.round(totalScore / attempts) : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            The Mimic Engine
          </h1>
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        
        <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
          Revolutionary AI-powered pronunciation training with real-time waveform feedback. 
          The feature that makes PREET_ENGLISH go viral! 🚀
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="secondary" className="px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Real-time Feedback
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            Precision Scoring
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Instant Results
          </Badge>
          <Badge variant="secondary" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            Social Sharing
          </Badge>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      {attempts > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{averageScore}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{attempts}</div>
              <div className="text-sm text-muted-foreground">Total Attempts</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.max(...(attempts > 0 ? [totalScore / attempts] : [0]))}%</div>
              <div className="text-sm text-muted-foreground">Best Score</div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Demo Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phrase Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedLevel} onValueChange={handleLevelChange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedLevel} className="mt-4">
                  <div className="space-y-2">
                    {DEMO_PHRASES[selectedLevel].map((phrase, index) => (
                      <Button
                        key={index}
                        variant={phrase === selectedPhrase ? "default" : "outline"}
                        className="w-full text-left justify-start h-auto p-3"
                        onClick={() => setSelectedPhrase(phrase)}
                      >
                        <div className="text-sm">{phrase}</div>
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">1</div>
                <div className="text-sm">Listen to the native speaker pronunciation</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold">2</div>
                <div className="text-sm">Record yourself speaking the same phrase</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center font-bold">3</div>
                <div className="text-sm">Get real-time waveform comparison and scoring</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500 text-white text-xs flex items-center justify-center font-bold">4</div>
                <div className="text-sm">Share your pronunciation score with friends!</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mimic Engine Component */}
        <div className="lg:col-span-2">
          <MimicEngine
            targetPhrase={selectedPhrase}
            targetLanguage="en-US"
            difficulty={selectedLevel}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
      </div>

      {/* Features Showcase */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Why The Mimic Engine is Revolutionary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">Precision Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms analyze your pronunciation with 95% accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Feedback</h3>
              <p className="text-sm text-muted-foreground">
                Instant visual feedback with waveform comparison technology
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">Social Learning</h3>
              <p className="text-sm text-muted-foreground">
                Share your scores and challenge friends to beat your pronunciation
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvement over time with detailed analytics
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-16 p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-4">Ready to Perfect Your Pronunciation?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of learners who are already improving their English pronunciation with The Mimic Engine. 
          Start your journey to confident English speaking today!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            Start Learning Now
          </Button>
          <Button size="lg" variant="outline">
            View More Features
          </Button>
        </div>
      </motion.div>
    </div>
  );
}