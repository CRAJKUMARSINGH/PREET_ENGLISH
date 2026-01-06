import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, HelpCircle, Pencil, Puzzle, Star, Award } from "lucide-react";
import { StoryReader } from "@/components/HindiStories/StoryReader";
import { ComprehensionQuiz } from "@/components/HindiStories/ComprehensionQuiz";
import { DictationPractice } from "@/components/HindiStories/DictationPractice";
import { SentenceBuilder } from "@/components/HindiStories/SentenceBuilder";

export default function HindiStories() {
  const [activeTab, setActiveTab] = useState("stories");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            📚 कहानियाँ और पढ़ना
          </h1>
          <p className="text-xl text-muted-foreground">
            Stories & Reading Comprehension
          </p>
          <p className="text-orange-600 dark:text-orange-400 font-hindi">
            हिंदी अनुवाद के साथ अंग्रेजी कहानियाँ पढ़ें और समझें
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold text-orange-600">100</div>
              <div className="text-sm text-muted-foreground">कहानियाँ</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <HelpCircle className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-muted-foreground">प्रश्न</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <Pencil className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-muted-foreground">श्रुतलेख</div>
            </CardContent>
          </Card>
          <Card className="border-teal-200 dark:border-teal-800">
            <CardContent className="p-4 text-center">
              <Puzzle className="h-8 w-8 mx-auto text-teal-500 mb-2" />
              <div className="text-2xl font-bold text-teal-600">8</div>
              <div className="text-sm text-muted-foreground">वाक्य</div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Tips */}
        <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Star className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-1">
                  सीखने की टिप्स (Learning Tips)
                </h3>
                <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                  <li>• पहले कहानी पढ़ें, फिर हिंदी अनुवाद देखें</li>
                  <li>• नए शब्दों को नोट करें और उनका अभ्यास करें</li>
                  <li>• श्रुतलेख से सुनने और लिखने की क्षमता बढ़ाएं</li>
                  <li>• वाक्य बनाने से व्याकरण समझ में आएगा</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">कहानियाँ</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">प्रश्नोत्तरी</span>
            </TabsTrigger>
            <TabsTrigger value="dictation" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              <span className="hidden sm:inline">श्रुतलेख</span>
            </TabsTrigger>
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Puzzle className="h-4 w-4" />
              <span className="hidden sm:inline">वाक्य</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <StoryReader />
          </TabsContent>

          <TabsContent value="quiz">
            <ComprehensionQuiz />
          </TabsContent>

          <TabsContent value="dictation">
            <DictationPractice />
          </TabsContent>

          <TabsContent value="builder">
            <SentenceBuilder />
          </TabsContent>
        </Tabs>

        {/* Achievement Section */}
        <Card className="border-2 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <Award className="h-6 w-6" />
              उपलब्धियाँ (Achievements)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-3xl mb-2">📖</div>
                <div className="font-medium">पहली कहानी</div>
                <div className="text-xs text-muted-foreground">First Story</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-medium">100% सही</div>
                <div className="text-xs text-muted-foreground">Perfect Quiz</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">✍️</div>
                <div className="font-medium">श्रुतलेख मास्टर</div>
                <div className="text-xs text-muted-foreground">Dictation Master</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">🧩</div>
                <div className="font-medium">वाक्य निर्माता</div>
                <div className="text-xs text-muted-foreground">Sentence Builder</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
