import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Target, User, BookOpen, Clock, Star } from "lucide-react";
export function PersonalizationEngine() {
    var _a = useState('assessment'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useState(0), currentQuestion = _b[0], setCurrentQuestion = _b[1];
    var _c = useState({
        level: 'intermediate',
        interests: ['business', 'technology'],
        learningStyle: 'visual',
        goals: ['speaking', 'professional']
    }), userProfile = _c[0], setUserProfile = _c[1];
    var assessmentQuestions = [
        {
            question: "What is your current English level?",
            questionHindi: "आपका वर्तमान अंग्रेजी स्तर क्या है?",
            options: [
                { value: 'beginner', label: 'Beginner', labelHindi: 'शुरुआती' },
                { value: 'intermediate', label: 'Intermediate', labelHindi: 'मध्यम' },
                { value: 'advanced', label: 'Advanced', labelHindi: 'उन्नत' }
            ]
        },
        {
            question: "What are your main learning goals?",
            questionHindi: "आपके मुख्य सीखने के लक्ष्य क्या हैं?",
            options: [
                { value: 'speaking', label: 'Speaking Fluency', labelHindi: 'बोलने में प्रवाहता' },
                { value: 'writing', label: 'Writing Skills', labelHindi: 'लेखन कौशल' },
                { value: 'professional', label: 'Professional English', labelHindi: 'व्यावसायिक अंग्रेजी' },
                { value: 'academic', label: 'Academic English', labelHindi: 'शैक्षणिक अंग्रेजी' }
            ]
        }
    ];
    var personalizedRecommendations = [
        {
            title: "Daily Speaking Practice",
            titleHindi: "दैनिक बोलने का अभ्यास",
            description: "15 minutes of conversation practice based on your interests",
            descriptionHindi: "आपकी रुचियों के आधार पर 15 मिनट का वार्तालाप अभ्यास",
            difficulty: "intermediate",
            estimatedTime: "15 min",
            category: "speaking"
        },
        {
            title: "Business Vocabulary Builder",
            titleHindi: "व्यावसायिक शब्दावली निर्माता",
            description: "Learn professional terms for your career growth",
            descriptionHindi: "अपने करियर की वृद्धि के लिए व्यावसायिक शब्द सीखें",
            difficulty: "intermediate",
            estimatedTime: "20 min",
            category: "vocabulary"
        },
        {
            title: "Technology News Reading",
            titleHindi: "प्रौद्योगिकी समाचार पढ़ना",
            description: "Stay updated while improving your reading skills",
            descriptionHindi: "अपने पढ़ने के कौशल में सुधार करते हुए अपडेट रहें",
            difficulty: "advanced",
            estimatedTime: "25 min",
            category: "reading"
        }
    ];
    return (<div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-emerald-500"/>
            Personalization Engine
            <Badge variant="secondary" className="ml-2">AI-Powered</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Get personalized learning recommendations based on your profile and progress
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assessment" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Learning Assessment</h3>
                  <Badge variant="outline">
                    {currentQuestion + 1} of {assessmentQuestions.length}
                  </Badge>
                </div>
                
                <Progress value={(currentQuestion / assessmentQuestions.length) * 100} className="h-2"/>
                
                {assessmentQuestions[currentQuestion] && (<Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-lg">
                            {assessmentQuestions[currentQuestion].question}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {assessmentQuestions[currentQuestion].questionHindi}
                          </p>
                        </div>
                        
                        <div className="grid gap-2">
                          {assessmentQuestions[currentQuestion].options.map(function (option, index) { return (<Button key={index} variant="outline" className="justify-start h-auto p-4" onClick={function () {
                    // Handle answer selection
                    if (currentQuestion < assessmentQuestions.length - 1) {
                        setCurrentQuestion(function (prev) { return prev + 1; });
                    }
                    else {
                        setActiveTab('profile');
                    }
                }}>
                              <div className="text-left">
                                <div className="font-medium">{option.label}</div>
                                <div className="text-sm text-muted-foreground">
                                  {option.labelHindi}
                                </div>
                              </div>
                            </Button>); })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Your Learning Profile</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-emerald-500"/>
                        <span className="font-medium">Current Level</span>
                      </div>
                      <Badge variant="default" className="capitalize">
                        {userProfile.level}
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5 text-blue-500"/>
                        <span className="font-medium">Learning Goals</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.goals.map(function (goal, index) { return (<Badge key={index} variant="secondary" className="capitalize">
                            {goal}
                          </Badge>); })}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-500"/>
                        <span className="font-medium">Interests</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {userProfile.interests.map(function (interest, index) { return (<Badge key={index} variant="outline" className="capitalize">
                            {interest}
                          </Badge>); })}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-5 w-5 text-purple-500"/>
                        <span className="font-medium">Learning Style</span>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {userProfile.learningStyle}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
                
                <Button onClick={function () { return setActiveTab('recommendations'); }} className="w-full">
                  View Personalized Recommendations
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personalized Recommendations</h3>
                <p className="text-muted-foreground">
                  Based on your profile, here are the best learning activities for you:
                </p>
                
                <div className="grid gap-4">
                  {personalizedRecommendations.map(function (rec, index) { return (<Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{rec.title}</h4>
                              <Badge variant={rec.difficulty === 'beginner' ? 'default' :
                rec.difficulty === 'intermediate' ? 'secondary' : 'destructive'} className="text-xs">
                                {rec.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {rec.titleHindi}
                            </p>
                            <p className="text-sm">{rec.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {rec.descriptionHindi}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3"/>
                                {rec.estimatedTime}
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3"/>
                                {rec.category}
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            Start Learning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>); })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>);
}
