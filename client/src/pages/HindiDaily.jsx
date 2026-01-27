import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, Brain, Flame, BookOpen, Target, Award } from "lucide-react";
import { DailyWordCard } from "@/components/HindiDaily/DailyWordCard";
import { PhrasesOfDay } from "@/components/HindiDaily/PhrasesOfDay";
import { VocabularyQuiz } from "@/components/HindiDaily/VocabularyQuiz";
import { LearningStreak } from "@/components/HindiDaily/LearningStreak";
export default function HindiDaily() {
    var _a = useState("word"), activeTab = _a[0], setActiveTab = _a[1];
    return (<Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
            📅 दैनिक अभ्यास
          </h1>
          <p className="text-xl text-muted-foreground">
            Daily Practice & Vocabulary Builder
          </p>
          <p className="text-indigo-600 dark:text-indigo-400 font-hindi">
            हर दिन नए शब्द और वाक्यांश सीखें - रोज़ाना अभ्यास से बनें माहिर!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto text-indigo-500 mb-2"/>
              <div className="text-2xl font-bold text-indigo-600">15</div>
              <div className="text-sm text-muted-foreground">दैनिक शब्द</div>
            </CardContent>
          </Card>
          <Card className="border-teal-200 dark:border-teal-800">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 mx-auto text-teal-500 mb-2"/>
              <div className="text-2xl font-bold text-teal-600">20</div>
              <div className="text-sm text-muted-foreground">वाक्यांश</div>
            </CardContent>
          </Card>
          <Card className="border-rose-200 dark:border-rose-800">
            <CardContent className="p-4 text-center">
              <Brain className="h-8 w-8 mx-auto text-rose-500 mb-2"/>
              <div className="text-2xl font-bold text-rose-600">15</div>
              <div className="text-sm text-muted-foreground">प्रश्नोत्तरी</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 text-center">
              <Flame className="h-8 w-8 mx-auto text-amber-500 mb-2"/>
              <div className="text-2xl font-bold text-amber-600">4</div>
              <div className="text-sm text-muted-foreground">दिन स्ट्रीक</div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Tips */}
        <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1"/>
              <div>
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-1">
                  आज का लक्ष्य (Today's Goal)
                </h3>
                <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• 5 नए शब्द सीखें और याद करें</li>
                  <li>• 3 वाक्यांश अभ्यास करें</li>
                  <li>• 1 प्रश्नोत्तरी पूरी करें</li>
                  <li>• अपनी स्ट्रीक बनाए रखें!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="word" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4"/>
              <span className="hidden sm:inline">शब्द</span>
            </TabsTrigger>
            <TabsTrigger value="phrases" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4"/>
              <span className="hidden sm:inline">वाक्यांश</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="h-4 w-4"/>
              <span className="hidden sm:inline">प्रश्नोत्तरी</span>
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4"/>
              <span className="hidden sm:inline">स्ट्रीक</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="word">
            <DailyWordCard />
          </TabsContent>

          <TabsContent value="phrases">
            <PhrasesOfDay />
          </TabsContent>

          <TabsContent value="quiz">
            <VocabularyQuiz />
          </TabsContent>

          <TabsContent value="streak">
            <LearningStreak />
          </TabsContent>
        </Tabs>

        {/* Motivation Quote */}
        <Card className="border-2 border-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-800 dark:to-purple-800">
          <CardContent className="p-6 text-center">
            <Award className="h-10 w-10 mx-auto text-yellow-500 mb-3"/>
            <blockquote className="text-lg italic text-indigo-700 dark:text-indigo-300">
              "एक भाषा आपको जीवन के लिए एक गलियारे में रखती है। दो भाषाएं हर दरवाजा खोल देती हैं।"
            </blockquote>
            <p className="text-sm text-muted-foreground mt-2">
              "One language sets you in a corridor for life. Two languages open every door along the way."
            </p>
            <p className="text-xs text-muted-foreground mt-1">- Frank Smith</p>
          </CardContent>
        </Card>
      </div>
    </Layout>);
}
