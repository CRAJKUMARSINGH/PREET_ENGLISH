import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, Zap, TrendingUp, Target } from 'lucide-react';
// Import Hindi Complete components
import { QuickRevision } from '@/components/HindiComplete/QuickRevision';
import { ProgressDashboard } from '@/components/HindiComplete/ProgressDashboard';
export default function HindiComplete() {
    var _a = useState('dashboard'), activeTab = _a[0], setActiveTab = _a[1];
    return (<div className="hindi-complete container mx-auto px-4 py-8">
      {/* Header */}
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          🇮🇳 Hindi Complete - Your Learning Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Hindi speakers के लिए complete learning dashboard। अपनी progress देखें, 
          quick revision करें, और अपने goals track करें!
        </p>
        <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
          📊 Complete Overview
        </Badge>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards grid md:grid-cols-2 gap-4 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={function () { return setActiveTab('dashboard'); }}>
          <CardContent className="pt-6 text-center">
            <LayoutDashboard className="w-12 h-12 mx-auto mb-3 text-blue-500"/>
            <h3 className="font-semibold mb-2">Progress Dashboard</h3>
            <p className="text-sm text-muted-foreground">Track all your learning progress</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={function () { return setActiveTab('revision'); }}>
          <CardContent className="pt-6 text-center">
            <Zap className="w-12 h-12 mx-auto mb-3 text-yellow-500"/>
            <h3 className="font-semibold mb-2">Quick Revision</h3>
            <p className="text-sm text-muted-foreground">Test your knowledge with quick quizzes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="revision">Quick Revision</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5"/>
                Hindi Complete Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="intro">
                <p className="text-muted-foreground mb-4">
                  यह आपका complete learning hub है। यहां आप अपनी सारी progress देख सकते हैं 
                  और quick revision कर सकते हैं।
                </p>
              </div>

              <div className="features-grid grid md:grid-cols-2 gap-6">
                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500"/>
                    Progress Dashboard
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Overall progress tracking</li>
                    <li>• Skill-wise breakdown</li>
                    <li>• Achievement badges</li>
                    <li>• Weekly activity chart</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-500"/>
                    Quick Revision
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Grammar quizzes</li>
                    <li>• Hindi explanations</li>
                    <li>• Instant feedback</li>
                    <li>• Score tracking</li>
                  </ul>
                </div>
              </div>

              <div className="cta bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  🎯 Your Learning Journey
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Track your progress, celebrate achievements, and keep improving every day!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <ProgressDashboard />
        </TabsContent>

        {/* Quick Revision Tab */}
        <TabsContent value="revision">
          <QuickRevision />
        </TabsContent>
      </Tabs>
    </div>);
}
