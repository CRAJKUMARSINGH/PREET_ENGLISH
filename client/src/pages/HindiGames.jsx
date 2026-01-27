import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Shuffle, PenLine, Mic, Award, Star, Target } from "lucide-react";
import { GrammarMatchGame } from "@/components/HindiGames/GrammarMatchGame";
import { WordScramble } from "@/components/HindiGames/WordScramble";
import { FillBlanks } from "@/components/HindiGames/FillBlanks";
import { SpellingBee } from "@/components/HindiGames/SpellingBee";
export default function HindiGames() {
    var _a = useState("match"), activeTab = _a[0], setActiveTab = _a[1];
    return (<Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
            🎮 व्याकरण खेल
          </h1>
          <p className="text-xl text-muted-foreground">
            Grammar Games & Interactive Exercises
          </p>
          <p className="text-green-600 dark:text-green-400 font-hindi">
            खेल-खेल में अंग्रेजी सीखें - मज़ेदार और प्रभावी!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <Gamepad2 className="h-8 w-8 mx-auto text-green-500 mb-2"/>
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">खेल</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto text-purple-500 mb-2"/>
              <div className="text-2xl font-bold text-purple-600">100+</div>
              <div className="text-sm text-muted-foreground">शब्द</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <PenLine className="h-8 w-8 mx-auto text-blue-500 mb-2"/>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-muted-foreground">व्याकरण प्रश्न</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 text-center">
              <Mic className="h-8 w-8 mx-auto text-amber-500 mb-2"/>
              <div className="text-2xl font-bold text-amber-600">30</div>
              <div className="text-sm text-muted-foreground">स्पेलिंग</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Tips */}
        <Card className="border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Star className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1"/>
              <div>
                <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                  खेल के फायदे (Benefits of Games)
                </h3>
                <ul className="text-sm text-emerald-600 dark:text-emerald-400 space-y-1">
                  <li>• मिलान खेल से शब्दावली याद करें</li>
                  <li>• शब्द पहेली से स्पेलिंग सुधारें</li>
                  <li>• रिक्त स्थान से व्याकरण सीखें</li>
                  <li>• स्पेलिंग बी से सुनने की क्षमता बढ़ाएं</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Games Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="match" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4"/>
              <span className="hidden sm:inline">मिलान</span>
            </TabsTrigger>
            <TabsTrigger value="scramble" className="flex items-center gap-2">
              <Shuffle className="h-4 w-4"/>
              <span className="hidden sm:inline">पहेली</span>
            </TabsTrigger>
            <TabsTrigger value="blanks" className="flex items-center gap-2">
              <PenLine className="h-4 w-4"/>
              <span className="hidden sm:inline">रिक्त</span>
            </TabsTrigger>
            <TabsTrigger value="spelling" className="flex items-center gap-2">
              <Mic className="h-4 w-4"/>
              <span className="hidden sm:inline">स्पेलिंग</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="match">
            <GrammarMatchGame />
          </TabsContent>

          <TabsContent value="scramble">
            <WordScramble />
          </TabsContent>

          <TabsContent value="blanks">
            <FillBlanks />
          </TabsContent>

          <TabsContent value="spelling">
            <SpellingBee />
          </TabsContent>
        </Tabs>

        {/* Achievement Section */}
        <Card className="border-2 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-yellow-600"/>
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300">
                उपलब्धियाँ (Achievements)
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-medium">पहला मिलान</div>
                <div className="text-xs text-muted-foreground">First Match</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-medium">5 स्ट्रीक</div>
                <div className="text-xs text-muted-foreground">5 Streak</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">📝</div>
                <div className="font-medium">व्याकरण गुरु</div>
                <div className="text-xs text-muted-foreground">Grammar Guru</div>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl opacity-50">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-medium">स्पेलिंग चैंपियन</div>
                <div className="text-xs text-muted-foreground">Spelling Champion</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>);
}
