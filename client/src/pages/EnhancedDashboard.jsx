import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { AITutor } from "@/components/AITutor";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { PersonalizedLearningPath } from "@/components/PersonalizedLearningPath";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { ProgressCharts } from "@/components/ProgressCharts";
import { XPAnimation } from "@/components/XPAnimation";
// import { LeagueSystem } from "@/components/gamification/LeagueSystem";
// import { GemEconomy } from "@/components/gamification/GemEconomy";
// import { PronunciationChecker } from "@/components/pronunciation/PronunciationChecker";
// import { NativeSpeakerChat } from "@/components/social/NativeSpeakerChat";
// import { BilingualReading } from "@/components/reading/BilingualReading";
// import { AdvancedSRS } from "@/components/learning/AdvancedSRS";
// import { MultimodalAITutor } from "@/components/ai/MultimodalAITutor";
// import { ListeningComprehensionExercise } from "@/components/exercises/ListeningComprehensionExercise";
// import { ImageAssociationExercise } from "@/components/exercises/ImageAssociationExercise";
// import { RolePlayExercise } from "@/components/exercises/RolePlayExercise";
// import { DictationExercise } from "@/components/exercises/DictationExercise";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Mic, Target, Award, TrendingUp, Sparkles, BookOpen, Users, MessageCircle, Trophy, Gem, Volume2, Globe, Languages, Clock, Headphones, Image, Keyboard, Camera } from "lucide-react";
export default function EnhancedDashboard() {
    var user = useAuth().user;
    var _a = useState(false), showXP = _a[0], setShowXP = _a[1];
    var currentXP = useState(1250)[0];
    var totalLessons = useState(45)[0];
    var completedLessons = useState(32)[0];
    var _b = useState(false), showNativeSpeakerChat = _b[0], setShowNativeSpeakerChat = _b[1];
    var triggerXPAnimation = function () {
        setShowXP(true);
        setTimeout(function () { return setShowXP(false); }, 3000);
    };
    if (!user) {
        return (<Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to access the dashboard</h2>
            <Button onClick={function () { return window.location.href = '/auth'; }}>
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>);
    }
    return (<Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome back, {user.username}! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            आपका अंग्रेजी सीखने का सफर जारी है • Your English learning journey continues
          </p>
          
          {/* XP Display */}
          <div className="flex items-center justify-center gap-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold">
              ⭐ {currentXP} XP
            </div>
            <Button onClick={triggerXPAnimation} variant="outline" size="sm">
              <Sparkles className="w-4 h-4 mr-2"/>
              Test XP Animation
            </Button>
          </div>
        </div>

        {/* XP Animation */}
        {showXP && <XPAnimation xpGained={50}/>}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-16 text-xs overflow-x-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1 min-w-fit">
              <TrendingUp className="w-3 h-3"/>
              Overview
            </TabsTrigger>
            <TabsTrigger value="multimodal-ai" className="flex items-center gap-1 min-w-fit">
              <Camera className="w-3 h-3"/>
              AI Tutor+
            </TabsTrigger>
            <TabsTrigger value="leagues" className="flex items-center gap-1 min-w-fit">
              <Trophy className="w-3 h-3"/>
              Leagues
            </TabsTrigger>
            <TabsTrigger value="gems" className="flex items-center gap-1 min-w-fit">
              <Gem className="w-3 h-3"/>
              Gems
            </TabsTrigger>
            <TabsTrigger value="pronunciation" className="flex items-center gap-1 min-w-fit">
              <Volume2 className="w-3 h-3"/>
              Pronunciation
            </TabsTrigger>
            <TabsTrigger value="native-chat" className="flex items-center gap-1 min-w-fit">
              <Globe className="w-3 h-3"/>
              Native Chat
            </TabsTrigger>
            <TabsTrigger value="bilingual-reading" className="flex items-center gap-1 min-w-fit">
              <Languages className="w-3 h-3"/>
              Reading
            </TabsTrigger>
            <TabsTrigger value="spaced-repetition" className="flex items-center gap-1 min-w-fit">
              <Clock className="w-3 h-3"/>
              SRS
            </TabsTrigger>
            <TabsTrigger value="listening" className="flex items-center gap-1 min-w-fit">
              <Headphones className="w-3 h-3"/>
              Listening
            </TabsTrigger>
            <TabsTrigger value="image-association" className="flex items-center gap-1 min-w-fit">
              <Image className="w-3 h-3"/>
              Images
            </TabsTrigger>
            <TabsTrigger value="role-play" className="flex items-center gap-1 min-w-fit">
              <Users className="w-3 h-3"/>
              Role Play
            </TabsTrigger>
            <TabsTrigger value="dictation" className="flex items-center gap-1 min-w-fit">
              <Keyboard className="w-3 h-3"/>
              Dictation
            </TabsTrigger>
            <TabsTrigger value="ai-tutor" className="flex items-center gap-1 min-w-fit">
              <Brain className="w-3 h-3"/>
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-1 min-w-fit">
              <Mic className="w-3 h-3"/>
              Voice
            </TabsTrigger>
            <TabsTrigger value="learning-path" className="flex items-center gap-1 min-w-fit">
              <Target className="w-3 h-3"/>
              Path
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-1 min-w-fit">
              <Award className="w-3 h-3"/>
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600"/>
                    Lessons Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{completedLessons}/{totalLessons}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((completedLessons / totalLessons) * 100)}% Complete
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-600"/>
                    Total XP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{currentXP}</div>
                  <p className="text-xs text-muted-foreground">Keep learning to earn more!</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600"/>
                    Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">7 days</div>
                  <p className="text-xs text-muted-foreground">Great consistency! 🔥</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-orange-600"/>
                    AI Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <p className="text-xs text-muted-foreground">Chat with Arya AI Tutor</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Charts */}
            <ProgressCharts />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>🚀 Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={function () { return window.location.href = '/lessons'; }} className="h-20 flex flex-col gap-2">
                    <BookOpen className="w-6 h-6"/>
                    Continue Learning
                  </Button>
                  <Button onClick={function () { return window.location.href = '/speaking'; }} variant="outline" className="h-20 flex flex-col gap-2">
                    <Mic className="w-6 h-6"/>
                    Speaking Practice
                  </Button>
                  <Button onClick={function () { return window.location.href = '/vocabulary'; }} variant="outline" className="h-20 flex flex-col gap-2">
                    <Brain className="w-6 h-6"/>
                    Vocabulary
                  </Button>
                  <Button onClick={function () { return window.location.href = '/stories'; }} variant="outline" className="h-20 flex flex-col gap-2">
                    <BookOpen className="w-6 h-6"/>
                    Hindi Stories
                  </Button>
                </div>
                
                {/* New Advanced Features */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-center">🚀 Advanced Learning Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={function () {
            var tab = document.querySelector('[value="multimodal-ai"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-purple-200 hover:bg-purple-50">
                      <Camera className="w-6 h-6 text-purple-600"/>
                      Multimodal AI
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="listening"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-indigo-200 hover:bg-indigo-50">
                      <Headphones className="w-6 h-6 text-indigo-600"/>
                      Listening
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="image-association"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-pink-200 hover:bg-pink-50">
                      <Image className="w-6 h-6 text-pink-600"/>
                      Image Games
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="role-play"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-teal-200 hover:bg-teal-50">
                      <Users className="w-6 h-6 text-teal-600"/>
                      Role Play
                    </Button>
                  </div>
                </div>

                {/* Hindi-Focused Features */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-center">🇮🇳 Hindi Speaker Specials</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={function () {
            var tab = document.querySelector('[value="pronunciation"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-blue-200 hover:bg-blue-50">
                      <Volume2 className="w-6 h-6 text-blue-600"/>
                      Pronunciation Check
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="native-chat"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-green-200 hover:bg-green-50">
                      <Globe className="w-6 h-6 text-green-600"/>
                      Native Chat
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="bilingual-reading"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-purple-200 hover:bg-purple-50">
                      <Languages className="w-6 h-6 text-purple-600"/>
                      Bilingual Reading
                    </Button>
                    <Button onClick={function () {
            var tab = document.querySelector('[value="dictation"]');
            tab === null || tab === void 0 ? void 0 : tab.click();
        }} variant="outline" className="h-20 flex flex-col gap-2 border-orange-200 hover:bg-orange-50">
                      <Keyboard className="w-6 h-6 text-orange-600"/>
                      Dictation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leagues Tab */}
          {/* <TabsContent value="leagues">
          <LeagueSystem />
        </TabsContent> */}

          {/* Gems Tab */}
          {/* <TabsContent value="gems">
          <GemEconomy />
        </TabsContent> */}

          {/* Pronunciation Tab */}
          {/* <TabsContent value="pronunciation">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎯 Pronunciation Practice</h2>
              <p className="text-muted-foreground">
                Master English pronunciation with real-time feedback and Hindi speaker-specific guidance
              </p>
            </div>
            
            <PronunciationChecker
              targetText="Hello, how are you today?"
              hindiTranslation="नमस्ते, आज आप कैसे हैं?"
              difficulty="beginner"
              onComplete={(analysis) => {
                console.log('Pronunciation analysis:', analysis);
                // Handle completion - could update user progress, show achievements, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Native Speaker Chat Tab */}
          {/* <TabsContent value="native-chat">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🌍 Chat with Native Speakers</h2>
              <p className="text-muted-foreground">
                Practice real conversations with verified native English speakers from around the world
              </p>
            </div>
            
            <NativeSpeakerChat
              onClose={() => {
                // Handle chat close - could return to overview or show completion message
                console.log('Native speaker chat closed');
              }}
            />
          </div>
        </TabsContent> */}

          {/* Bilingual Reading Tab */}
          {/* <TabsContent value="bilingual-reading">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">📚 Bilingual Reading</h2>
              <p className="text-muted-foreground">
                Read stories side-by-side in English and Hindi with synchronized audio and vocabulary support
              </p>
            </div>
            
            <BilingualReading
              onComplete={(comprehensionScore) => {
                console.log('Reading comprehension score:', comprehensionScore);
                // Handle completion - could update reading progress, unlock new stories, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Spaced Repetition System Tab */}
          {/* <TabsContent value="spaced-repetition">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🧠 Spaced Repetition System</h2>
              <p className="text-muted-foreground">
                Scientifically optimized vocabulary review system for maximum retention and learning efficiency
              </p>
            </div>
            
            <AdvancedSRS
              onComplete={(session) => {
                console.log('SRS session completed:', session);
                // Handle session completion - could update statistics, show achievements, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Multimodal AI Tutor Tab */}
          <TabsContent value="multimodal-ai">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">🤖 Advanced Multimodal AI Tutor</h2>
                <p className="text-muted-foreground">
                  Experience next-generation AI tutoring with voice, video, gesture recognition, and multiple AI personalities
                </p>
              </div>
              
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-2">Coming Soon!</h3>
                  <p className="text-muted-foreground">
                    Advanced Multimodal AI Tutor with 5 personalities, emotion recognition, and gesture detection.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Listening Comprehension Tab */}
          {/* <TabsContent value="listening">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎧 Listening Comprehension</h2>
              <p className="text-muted-foreground">
                Improve your listening skills with authentic audio content and comprehension exercises
              </p>
            </div>
            
            <ListeningComprehensionExercise
              onComplete={(score, timeSpent) => {
                console.log('Listening exercise completed:', { score, timeSpent });
                // Handle completion - could update progress, show achievements, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Image Association Tab */}
          {/* <TabsContent value="image-association">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🖼️ Image Association Games</h2>
              <p className="text-muted-foreground">
                Learn vocabulary through visual association with interactive image-based exercises
              </p>
            </div>
            
            <ImageAssociationExercise
              category="all"
              difficulty="intermediate"
              onComplete={(score, timeSpent) => {
                console.log('Image association completed:', { score, timeSpent });
                // Handle completion - could update vocabulary progress, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Role Play Tab */}
          {/* <TabsContent value="role-play">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🎭 Interactive Role Play</h2>
              <p className="text-muted-foreground">
                Practice real-world conversations through immersive role-playing scenarios
              </p>
            </div>
            
            <RolePlayExercise
              onComplete={(performance) => {
                console.log('Role play completed:', performance);
                // Handle completion - could update conversation skills, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* Dictation Tab */}
          {/* <TabsContent value="dictation">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">✍️ Dictation Practice</h2>
              <p className="text-muted-foreground">
                Improve your listening and spelling skills with guided dictation exercises
              </p>
            </div>
            
            <DictationExercise
              onComplete={(results) => {
                console.log('Dictation completed:', results);
                // Handle completion - could update spelling/listening progress, etc.
              }}
            />
          </div>
        </TabsContent> */}

          {/* AI Tutor Tab */}
          <TabsContent value="ai-tutor">
            <AITutor />
          </TabsContent>

          {/* Voice Assistant Tab */}
          <TabsContent value="voice">
            <VoiceAssistant />
          </TabsContent>

          {/* Learning Path Tab */}
          <TabsContent value="learning-path">
            <PersonalizedLearningPath />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <ProgressCharts />
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">🏆 Your Achievements</h2>
                <p className="text-muted-foreground">
                  Download certificates for your completed learning milestones
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <CertificateGenerator userName={user.username} level="Beginner" lessonsCompleted={completedLessons} completionDate={new Date().toLocaleDateString()}/>
                
                {completedLessons >= 25 && (<CertificateGenerator userName={user.username} level="Intermediate" lessonsCompleted={completedLessons} completionDate={new Date().toLocaleDateString()}/>)}
                
                {completedLessons >= 40 && (<CertificateGenerator userName={user.username} level="Advanced" lessonsCompleted={completedLessons} completionDate={new Date().toLocaleDateString()}/>)}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            💝 Prepared on initiative of <strong>Mrs. Premlata Jain</strong>, AAO, PWD Udaipur
          </p>
        </div>
      </div>
    </Layout>);
}
