import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Settings,
  User,
  BookOpen,
  Mic,
  PenTool,
  Eye,
  Ear,
  Users,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningProfile {
  id: string;
  name: string;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  goals: string[];
  weakAreas: string[];
  strongAreas: string[];
  preferredPace: 'slow' | 'medium' | 'fast';
  dailyTimeCommitment: number; // minutes
  motivationFactors: string[];
  hindiProficiency: 'native' | 'fluent' | 'intermediate';
  englishUseCase: 'academic' | 'professional' | 'personal' | 'mixed';
}

interface PersonalizedRecommendation {
  type: 'lesson' | 'practice' | 'review' | 'challenge';
  title: string;
  description: string;
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  priority: 'high' | 'medium' | 'low';
  reason: string;
  hindiContext: string;
}

interface LearningAnalytics {
  totalStudyTime: number;
  lessonsCompleted: number;
  averageAccuracy: number;
  improvementRate: number;
  consistencyScore: number;
  strongestSkill: string;
  weakestSkill: string;
  predictedTimeToGoal: number; // days
}

const learningStyleQuestions = [
  {
    id: 'visual_preference',
    question: 'आप कैसे बेहतर सीखते हैं?',
    options: [
      { value: 'visual', label: 'चित्र, डायग्राम और रंगों से', icon: Eye },
      { value: 'auditory', label: 'सुनकर और बोलकर', icon: Ear },
      { value: 'kinesthetic', label: 'करके और अभ्यास से', icon: PenTool },
      { value: 'mixed', label: 'सभी तरीकों से', icon: Brain }
    ]
  },
  {
    id: 'goal_priority',
    question: 'आपका मुख्य लक्ष्य क्या है?',
    options: [
      { value: 'speaking', label: 'बोलचाल में सुधार', icon: Mic },
      { value: 'writing', label: 'लेखन कौशल', icon: PenTool },
      { value: 'professional', label: 'व्यावसायिक अंग्रेजी', icon: Briefcase },
      { value: 'academic', label: 'शैक्षणिक अंग्रेजी', icon: GraduationCap }
    ]
  },
  {
    id: 'time_commitment',
    question: 'आप रोज कितना समय दे सकते हैं?',
    options: [
      { value: '15', label: '15 मिनट', icon: Clock },
      { value: '30', label: '30 मिनट', icon: Clock },
      { value: '60', label: '1 घंटा', icon: Clock },
      { value: '120', label: '2+ घंटे', icon: Clock }
    ]
  }
];

const skillAreas = [
  { id: 'pronunciation', name: 'Pronunciation', hindi: 'उच्चारण', icon: Mic },
  { id: 'grammar', name: 'Grammar', hindi: 'व्याकरण', icon: BookOpen },
  { id: 'vocabulary', name: 'Vocabulary', hindi: 'शब्दावली', icon: Brain },
  { id: 'listening', name: 'Listening', hindi: 'सुनना', icon: Ear },
  { id: 'speaking', name: 'Speaking', hindi: 'बोलना', icon: Users },
  { id: 'writing', name: 'Writing', hindi: 'लेखन', icon: PenTool }
];

export function PersonalizationEngine() {
  const [activeTab, setActiveTab] = useState('assessment');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([]);
  const [analytics, setAnalytics] = useState<LearningAnalytics>({
    totalStudyTime: 1250, // minutes
    lessonsCompleted: 45,
    averageAccuracy: 78,
    improvementRate: 15,
    consistencyScore: 85,
    strongestSkill: 'vocabulary',
    weakestSkill: 'pronunciation',
    predictedTimeToGoal: 45
  });
  const [skillRatings, setSkillRatings] = useState<Record<string, number>>({
    pronunciation: 60,
    grammar: 75,
    vocabulary: 80,
    listening: 70,
    speaking: 55,
    writing: 65
  });

  // Generate personalized recommendations based on profile
  const generateRecommendations = (userProfile: LearningProfile): PersonalizedRecommendation[] => {
    const recs: PersonalizedRecommendation[] = [];
    
    // Based on weak areas
    userProfile.weakAreas.forEach(area => {
      if (area === 'pronunciation') {
        recs.push({
          type: 'practice',
          title: 'TH Sound Mastery',
          description: 'Focus on the most challenging sound for Hindi speakers',
          estimatedTime: 15,
          difficulty: 'medium',
          priority: 'high',
          reason: 'Identified as your weak area in assessment',
          hindiContext: 'हिंदी भाषियों के लिए सबसे कठिन ध्वनि का अभ्यास'
        });
      }
      
      if (area === 'grammar') {
        recs.push({
          type: 'lesson',
          title: 'Articles for Hindi Speakers',
          description: 'Master a, an, the usage with Hindi context',
          estimatedTime: 20,
          difficulty: 'medium',
          priority: 'high',
          reason: 'Grammar identified as improvement area',
          hindiContext: 'हिंदी संदर्भ में articles का सही उपयोग'
        });
      }
    });
    
    // Based on learning style
    if (userProfile.learningStyle === 'visual') {
      recs.push({
        type: 'lesson',
        title: 'Visual Grammar Guide',
        description: 'Learn grammar through diagrams and visual aids',
        estimatedTime: 25,
        difficulty: 'easy',
        priority: 'medium',
        reason: 'Matches your visual learning preference',
        hindiContext: 'चित्रों के माध्यम से व्याकरण सीखें'
      });
    }
    
    if (userProfile.learningStyle === 'auditory') {
      recs.push({
        type: 'practice',
        title: 'Listening Comprehension',
        description: 'Audio-based exercises for better understanding',
        estimatedTime: 30,
        difficulty: 'medium',
        priority: 'medium',
        reason: 'Perfect for your auditory learning style',
        hindiContext: 'सुनकर समझने का अभ्यास'
      });
    }
    
    // Based on goals
    if (userProfile.goals.includes('professional')) {
      recs.push({
        type: 'lesson',
        title: 'Business Email Writing',
        description: 'Professional communication for Indian workplace',
        estimatedTime: 35,
        difficulty: 'hard',
        priority: 'high',
        reason: 'Aligns with your professional goals',
        hindiContext: 'भारतीय कार्यक्षेत्र के लिए व्यावसायिक संवाद'
      });
    }
    
    return recs;
  };

  // Handle assessment completion
  const completeAssessment = () => {
    const newProfile: LearningProfile = {
      id: 'user_profile_1',
      name: 'Your Learning Profile',
      currentLevel: 'intermediate',
      learningStyle: answers.visual_preference as any || 'mixed',
      goals: [answers.goal_priority || 'speaking'],
      weakAreas: Object.entries(skillRatings)
        .filter(([_, rating]) => rating < 70)
        .map(([skill, _]) => skill),
      strongAreas: Object.entries(skillRatings)
        .filter(([_, rating]) => rating >= 80)
        .map(([skill, _]) => skill),
      preferredPace: 'medium',
      dailyTimeCommitment: parseInt(answers.time_commitment) || 30,
      motivationFactors: ['career_growth', 'confidence'],
      hindiProficiency: 'native',
      englishUseCase: answers.goal_priority as any || 'mixed'
    };
    
    setProfile(newProfile);
    const recs = generateRecommendations(newProfile);
    setRecommendations(recs);
    setActiveTab('dashboard');
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextQuestion = () => {
    if (currentQuestion < learningStyleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="personalization-engine space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" />
            Personalized Learning Engine
            <Badge variant="secondary" className="ml-auto">
              AI-Powered
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Learning Style Assessment</span>
                <Badge variant="outline">
                  {currentQuestion + 1} / {learningStyleQuestions.length}
                </Badge>
              </CardTitle>
              <Progress value={((currentQuestion + 1) / learningStyleQuestions.length) * 100} />
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestion < learningStyleQuestions.length && (
                <div className="question-section">
                  <h3 className="text-lg font-medium mb-4">
                    {learningStyleQuestions[currentQuestion].question}
                  </h3>
                  
                  <RadioGroup
                    value={answers[learningStyleQuestions[currentQuestion].id] || ''}
                    onValueChange={(value) => handleAnswerChange(learningStyleQuestions[currentQuestion].id, value)}
                  >
                    <div className="grid gap-3">
                      {learningStyleQuestions[currentQuestion].options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer flex-1">
                            <option.icon className="w-5 h-5 text-muted-foreground" />
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Skill Self-Assessment */}
              {currentQuestion === learningStyleQuestions.length && (
                <div className="skill-assessment">
                  <h3 className="text-lg font-medium mb-4">
                    अपने कौशल का मूल्यांकन करें (Rate Your Skills)
                  </h3>
                  
                  <div className="space-y-4">
                    {skillAreas.map((skill) => (
                      <div key={skill.id} className="skill-item">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <skill.icon className="w-4 h-4" />
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">({skill.hindi})</span>
                          </div>
                          <span className="text-sm font-medium">{skillRatings[skill.id]}%</span>
                        </div>
                        <Slider
                          value={[skillRatings[skill.id]]}
                          onValueChange={(value) => setSkillRatings(prev => ({ ...prev, [skill.id]: value[0] }))}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                
                <Button
                  onClick={nextQuestion}
                  disabled={!answers[learningStyleQuestions[currentQuestion]?.id] && currentQuestion < learningStyleQuestions.length}
                >
                  {currentQuestion === learningStyleQuestions.length ? 'Complete Assessment' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {profile && (
            <>
              {/* Profile Overview */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Learning Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="profile-item">
                      <span className="text-sm text-muted-foreground">Level:</span>
                      <Badge className="ml-2 capitalize">{profile.currentLevel}</Badge>
                    </div>
                    <div className="profile-item">
                      <span className="text-sm text-muted-foreground">Style:</span>
                      <Badge variant="outline" className="ml-2 capitalize">{profile.learningStyle}</Badge>
                    </div>
                    <div className="profile-item">
                      <span className="text-sm text-muted-foreground">Daily Time:</span>
                      <span className="ml-2 font-medium">{profile.dailyTimeCommitment} min</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Strong Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.strongAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Focus Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.weakAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skill Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillAreas.map((skill) => (
                      <div key={skill.id} className="skill-progress">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <skill.icon className="w-4 h-4" />
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">({skill.hindi})</span>
                          </div>
                          <span className="text-sm font-medium">{skillRatings[skill.id]}%</span>
                        </div>
                        <Progress value={skillRatings[skill.id]} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-card p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{rec.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{rec.hindiContext}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority}
                          </Badge>
                          <Badge className={getDifficultyColor(rec.difficulty)}>
                            {rec.difficulty}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {rec.estimatedTime} min
                          </span>
                          <span className="capitalize">{rec.type}</span>
                        </div>
                        
                        <Button size="sm">
                          Start Learning
                        </Button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                        <strong>Why recommended:</strong> {rec.reason}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Complete Assessment First</h3>
                  <p className="text-muted-foreground">
                    Complete the learning assessment to get personalized recommendations.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{Math.floor(analytics.totalStudyTime / 60)}h</div>
                  <div className="text-sm text-muted-foreground">Total Study Time</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{analytics.lessonsCompleted}</div>
                  <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">{analytics.averageAccuracy}%</div>
                  <div className="text-sm text-muted-foreground">Average Accuracy</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">{analytics.predictedTimeToGoal}</div>
                  <div className="text-sm text-muted-foreground">Days to Goal</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="insight-item">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Consistency Score</span>
                    <span className="text-sm">{analytics.consistencyScore}%</span>
                  </div>
                  <Progress value={analytics.consistencyScore} />
                </div>

                <div className="insight-item">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Improvement Rate</span>
                    <span className="text-sm">+{analytics.improvementRate}%</span>
                  </div>
                  <Progress value={analytics.improvementRate * 5} />
                </div>

                <div className="strengths-weaknesses">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-green-600">Strongest Skill:</span>
                    <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      {analytics.strongestSkill}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-orange-600">Focus Area:</span>
                    <Badge className="ml-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                      {analytics.weakestSkill}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${analytics.averageAccuracy}, 100`}
                        className="text-blue-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{analytics.averageAccuracy}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Overall Progress Towards Fluency
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}