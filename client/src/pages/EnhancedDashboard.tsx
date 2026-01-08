import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { AITutor } from "@/components/AITutor";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { PersonalizedLearningPath } from "@/components/PersonalizedLearningPath";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { ProgressCharts } from "@/components/ProgressCharts";
import { XPAnimation } from "@/components/XPAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Mic, 
  Target, 
  Award, 
  TrendingUp, 
  Sparkles,
  BookOpen,
  Users,
  MessageCircle
} from "lucide-react";

export default function EnhancedDashboard() {
  const { user } = useAuth();
  const [showXP, setShowXP] = useState(false);
  const [currentXP] = useState(1250);
  const [totalLessons] = useState(45);
  const [completedLessons] = useState(32);

  const triggerXPAnimation = () => {
    setShowXP(true);
    setTimeout(() => setShowXP(false), 3000);
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in to access the dashboard</h2>
            <Button onClick={() => window.location.href = '/auth'}>
              Go to Login
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
              <Sparkles className="w-4 h-4 mr-2" />
              Test XP Animation
            </Button>
          </div>
        </div>

        {/* XP Animation */}
        {showXP && <XPAnimation xpGained={50} />}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-tutor" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Voice Assistant
            </TabsTrigger>
            <TabsTrigger value="learning-path" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Learning Path
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
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
                    <BookOpen className="w-4 h-4 text-blue-600" />
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
                    <Sparkles className="w-4 h-4 text-green-600" />
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
                    <Users className="w-4 h-4 text-purple-600" />
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
                    <MessageCircle className="w-4 h-4 text-orange-600" />
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
                  <Button 
                    onClick={() => window.location.href = '/lessons'} 
                    className="h-20 flex flex-col gap-2"
                  >
                    <BookOpen className="w-6 h-6" />
                    Continue Learning
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/speaking'} 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                  >
                    <Mic className="w-6 h-6" />
                    Speaking Practice
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/vocabulary'} 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                  >
                    <Brain className="w-6 h-6" />
                    Vocabulary
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/stories'} 
                    variant="outline" 
                    className="h-20 flex flex-col gap-2"
                  >
                    <BookOpen className="w-6 h-6" />
                    Hindi Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                <CertificateGenerator
                  userName={user.username}
                  level="Beginner"
                  lessonsCompleted={completedLessons}
                  completionDate={new Date().toLocaleDateString()}
                />
                
                {completedLessons >= 25 && (
                  <CertificateGenerator
                    userName={user.username}
                    level="Intermediate"
                    lessonsCompleted={completedLessons}
                    completionDate={new Date().toLocaleDateString()}
                  />
                )}
                
                {completedLessons >= 40 && (
                  <CertificateGenerator
                    userName={user.username}
                    level="Advanced"
                    lessonsCompleted={completedLessons}
                    completionDate={new Date().toLocaleDateString()}
                  />
                )}
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
    </Layout>
  );
}