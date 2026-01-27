import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  BookOpen, 
  Mic, 
  Target,
  Flame,
  TrendingUp
} from 'lucide-react';

// Import Hindi Fluency components
import { DailyPracticeDashboard } from '@/components/HindiFluency/DailyPracticeDashboard';
import { FlashcardSystem } from '@/components/HindiFluency/FlashcardSystem';
import { SpeakingConfidenceTracker } from '@/components/HindiFluency/SpeakingConfidenceTracker';

export default function HindiFluency() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="hindi-fluency container mx-auto px-4 py-8">
      {/* Header */}
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          🇮🇳 Hindi Fluency - Daily Practice
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Hindi speakers के लिए daily practice system। Streak बनाए रखें, 
          flashcards से सीखें, और speaking confidence बढ़ाएं!
        </p>
        <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
          🔥 Build Your Streak
        </Badge>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards grid md:grid-cols-3 gap-4 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('dashboard')}>
          <CardContent className="pt-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-orange-500" />
            <h3 className="font-semibold mb-2">Daily Practice</h3>
            <p className="text-sm text-muted-foreground">Track goals and maintain streaks</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('flashcards')}>
          <CardContent className="pt-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold mb-2">Flashcards</h3>
            <p className="text-sm text-muted-foreground">Learn vocabulary with spaced repetition</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('confidence')}>
          <CardContent className="pt-6 text-center">
            <Mic className="w-12 h-12 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold mb-2">Speaking Confidence</h3>
            <p className="text-sm text-muted-foreground">Track and build speaking confidence</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dashboard">Daily Practice</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="confidence">Confidence</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Hindi Fluency Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="intro">
                <p className="text-muted-foreground mb-4">
                  यह program आपको daily practice की आदत बनाने में मदद करेगा। 
                  Regular practice से ही fluency आती है!
                </p>
              </div>

              <div className="features-grid grid md:grid-cols-3 gap-6">
                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Daily Practice
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Daily goals tracking</li>
                    <li>• Streak maintenance</li>
                    <li>• XP and level system</li>
                    <li>• Quick practice sessions</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Flashcard System
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Professional vocabulary</li>
                    <li>• Hindi meanings and pronunciation</li>
                    <li>• Spaced repetition</li>
                    <li>• Progress tracking</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    Confidence Tracker
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Speaking confidence levels</li>
                    <li>• Daily speaking challenges</li>
                    <li>• Milestone achievements</li>
                    <li>• Area-wise progress</li>
                  </ul>
                </div>
              </div>

              <div className="cta bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  🔥 Start Your Streak Today!
                </h3>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Consistency is key to fluency. Practice daily and watch your English improve!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Daily Practice Tab */}
        <TabsContent value="dashboard">
          <DailyPracticeDashboard />
        </TabsContent>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards">
          <FlashcardSystem />
        </TabsContent>

        {/* Confidence Tab */}
        <TabsContent value="confidence">
          <SpeakingConfidenceTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}