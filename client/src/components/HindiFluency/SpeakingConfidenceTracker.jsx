var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mic, TrendingUp, Target, Award, CheckCircle, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
var confidenceLevels = [
    {
        area: 'Basic Conversations',
        areaHindi: 'बुनियादी बातचीत',
        level: 75,
        target: 90,
        tips: ['Practice greetings daily', 'Use simple sentences', 'Don\'t worry about mistakes']
    },
    {
        area: 'Professional Communication',
        areaHindi: 'व्यावसायिक संवाद',
        level: 55,
        target: 80,
        tips: ['Learn business vocabulary', 'Practice email phrases', 'Watch business presentations']
    },
    {
        area: 'Pronunciation',
        areaHindi: 'उच्चारण',
        level: 60,
        target: 85,
        tips: ['Focus on TH sounds', 'Practice V vs W', 'Record and listen to yourself']
    },
    {
        area: 'Public Speaking',
        areaHindi: 'सार्वजनिक बोलना',
        level: 40,
        target: 70,
        tips: ['Start with small groups', 'Prepare and practice', 'Focus on key points']
    }
];
var dailyChallenges = [
    {
        id: '1',
        title: 'Introduce Yourself',
        titleHindi: 'अपना परिचय दें',
        description: 'Record a 30-second self-introduction in English',
        difficulty: 'easy',
        xpReward: 20,
        isCompleted: true
    },
    {
        id: '2',
        title: 'Describe Your Day',
        titleHindi: 'अपने दिन का वर्णन करें',
        description: 'Speak for 1 minute about what you did today',
        difficulty: 'medium',
        xpReward: 30,
        isCompleted: false
    },
    {
        id: '3',
        title: 'Express an Opinion',
        titleHindi: 'अपनी राय व्यक्त करें',
        description: 'Share your opinion on a topic for 2 minutes',
        difficulty: 'hard',
        xpReward: 50,
        isCompleted: false
    }
];
var milestones = [
    { level: 25, title: 'Beginner Speaker', titleHindi: 'शुरुआती वक्ता', icon: '🌱' },
    { level: 50, title: 'Confident Communicator', titleHindi: 'आत्मविश्वासी संवादक', icon: '💪' },
    { level: 75, title: 'Fluent Speaker', titleHindi: 'धाराप्रवाह वक्ता', icon: '🌟' },
    { level: 100, title: 'Master Orator', titleHindi: 'मास्टर वक्ता', icon: '👑' }
];
export function SpeakingConfidenceTracker() {
    var _a = useState(confidenceLevels), confidenceData = _a[0], setConfidenceData = _a[1];
    var _b = useState(dailyChallenges), challenges = _b[0], setChallenges = _b[1];
    var _c = useState(58), overallConfidence = _c[0], setOverallConfidence = _c[1];
    var currentMilestone = milestones.filter(function (m) { return m.level <= overallConfidence; }).pop();
    var nextMilestone = milestones.find(function (m) { return m.level > overallConfidence; });
    var completeChallenge = function (challengeId) {
        setChallenges(function (prev) { return prev.map(function (c) {
            if (c.id === challengeId && !c.isCompleted) {
                setOverallConfidence(function (prev) { return Math.min(100, prev + 2); });
                return __assign(__assign({}, c), { isCompleted: true });
            }
            return c;
        }); });
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (<div className="speaking-confidence-tracker space-y-6">
      {/* Overall Confidence */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Speaking Confidence</h2>
              <p className="opacity-90">बोलने का आत्मविश्वास - Track your progress!</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">{overallConfidence}%</div>
              <div className="text-sm opacity-90">Overall Level</div>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={overallConfidence} className="h-3 bg-white/20"/>
          </div>
          
          {currentMilestone && (<div className="mt-4 flex items-center gap-2">
              <span className="text-2xl">{currentMilestone.icon}</span>
              <span>{currentMilestone.title}</span>
              <span className="opacity-80">({currentMilestone.titleHindi})</span>
            </div>)}
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500"/>
            Milestones
            <span className="text-sm font-normal text-muted-foreground">
              (उपलब्धियां)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {milestones.map(function (milestone, index) {
            var isAchieved = overallConfidence >= milestone.level;
            var isCurrent = (currentMilestone === null || currentMilestone === void 0 ? void 0 : currentMilestone.level) === milestone.level;
            return (<div key={milestone.level} className={cn("flex flex-col items-center p-3 rounded-lg", isAchieved ? "bg-green-50 dark:bg-green-950/20" : "bg-gray-50 dark:bg-gray-800", isCurrent && "ring-2 ring-purple-500")}>
                  <span className={cn("text-3xl", !isAchieved && "opacity-40")}>
                    {milestone.icon}
                  </span>
                  <span className="text-xs font-medium mt-1">{milestone.title}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">{milestone.titleHindi}</span>
                  <span className="text-xs text-muted-foreground">{milestone.level}%</span>
                </div>);
        })}
          </div>
          
          {nextMilestone && (<div className="mt-4 text-center text-sm text-muted-foreground">
              <Zap className="w-4 h-4 inline mr-1 text-yellow-500"/>
              {nextMilestone.level - overallConfidence}% more to reach {nextMilestone.title}!
            </div>)}
        </CardContent>
      </Card>

      {/* Confidence by Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500"/>
            Confidence by Area
            <span className="text-sm font-normal text-muted-foreground">
              (क्षेत्र के अनुसार आत्मविश्वास)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {confidenceData.map(function (area) { return (<div key={area.area} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{area.area}</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 ml-2">
                    ({area.areaHindi})
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-bold">{area.level}%</span>
                  <span className="text-muted-foreground"> / {area.target}%</span>
                </div>
              </div>
              
              <div className="relative">
                <Progress value={area.level} className="h-3"/>
                <div className="absolute top-0 h-3 w-0.5 bg-green-500" style={{ left: "".concat(area.target, "%") }}/>
              </div>
              
              <div className="text-xs text-muted-foreground">
                💡 Tip: {area.tips[0]}
              </div>
            </div>); })}
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500"/>
            Daily Speaking Challenges
            <span className="text-sm font-normal text-muted-foreground">
              (दैनिक बोलने की चुनौतियां)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map(function (challenge) { return (<div key={challenge.id} className={cn("flex items-center justify-between p-4 rounded-lg border", challenge.isCompleted
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                : "bg-gray-50 dark:bg-gray-800")}>
              <div className="flex items-center gap-3">
                <Mic className={cn("w-8 h-8", challenge.isCompleted ? "text-green-500" : "text-gray-400")}/>
                <div>
                  <div className="font-medium">{challenge.title}</div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">{challenge.titleHindi}</div>
                  <div className="text-xs text-muted-foreground">{challenge.description}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">+{challenge.xpReward} XP</div>
                </div>
                
                {challenge.isCompleted ? (<CheckCircle className="w-6 h-6 text-green-500"/>) : (<Button size="sm" onClick={function () { return completeChallenge(challenge.id); }}>
                    Start
                  </Button>)}
              </div>
            </div>); })}
        </CardContent>
      </Card>

      {/* Motivation Quote */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <CardContent className="p-6 text-center">
          <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500"/>
          <p className="text-lg font-medium mb-2">
            "The more you speak, the more confident you become!"
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            "जितना ज्यादा बोलोगे, उतना ज्यादा आत्मविश्वास बढ़ेगा!"
          </p>
        </CardContent>
      </Card>
    </div>);
}
