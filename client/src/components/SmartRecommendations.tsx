import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Clock, TrendingUp, Target, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface Recommendation {
  id: string;
  type: 'lesson' | 'practice' | 'review' | 'challenge';
  title: string;
  description: string;
  reason: string;
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  link: string;
  priority: 'high' | 'medium' | 'low';
}

interface SmartRecommendationsProps {
  userLevel: number;
  completedLessons: number;
  weakAreas?: string[];
  learningGoals?: string[];
}

export function SmartRecommendations({ 
  userLevel, 
  completedLessons, 
  weakAreas = [], 
  learningGoals = [] 
}: SmartRecommendationsProps) {
  
  // Smart recommendation algorithm
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Based on user level and progress
    if (completedLessons < 5) {
      recommendations.push({
        id: '1',
        type: 'lesson',
        title: 'Basic Greetings & Introductions',
        description: 'Master essential English greetings for daily conversations',
        reason: 'Perfect for beginners to build confidence',
        estimatedTime: '15 min',
        difficulty: 'Easy',
        xpReward: 50,
        link: '/lesson/1',
        priority: 'high'
      });
    }
    
    // Weak area recommendations
    if (weakAreas.includes('pronunciation')) {
      recommendations.push({
        id: '2',
        type: 'practice',
        title: 'Pronunciation Practice Session',
        description: 'AI-powered pronunciation feedback for common Hindi speaker challenges',
        reason: 'Improve your pronunciation accuracy',
        estimatedTime: '20 min',
        difficulty: 'Medium',
        xpReward: 75,
        link: '/speak',
        priority: 'high'
      });
    }
    
    // Grammar focus
    if (userLevel >= 2 && !weakAreas.includes('grammar')) {
      recommendations.push({
        id: '3',
        type: 'lesson',
        title: 'Present Perfect Tense',
        description: 'Master one of the most useful tenses in English',
        reason: 'Essential for intermediate learners',
        estimatedTime: '25 min',
        difficulty: 'Medium',
        xpReward: 100,
        link: '/lesson/15',
        priority: 'medium'
      });
    }
    
    // Conversation practice
    if (completedLessons >= 10) {
      recommendations.push({
        id: '4',
        type: 'practice',
        title: 'Job Interview Simulation',
        description: 'Practice common interview questions with AI feedback',
        reason: 'High-value skill for career growth',
        estimatedTime: '30 min',
        difficulty: 'Hard',
        xpReward: 150,
        link: '/conversations',
        priority: 'high'
      });
    }
    
    // Review session
    if (completedLessons >= 20) {
      recommendations.push({
        id: '5',
        type: 'review',
        title: 'Weekly Vocabulary Review',
        description: 'Reinforce words you learned this week with spaced repetition',
        reason: 'Strengthen long-term retention',
        estimatedTime: '10 min',
        difficulty: 'Easy',
        xpReward: 40,
        link: '/vocabulary',
        priority: 'medium'
      });
    }
    
    return recommendations.slice(0, 3); // Show top 3 recommendations
  };

  const recommendations = generateRecommendations();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <Target className="h-4 w-4" />;
      case 'practice': return <TrendingUp className="h-4 w-4" />;
      case 'review': return <Brain className="h-4 w-4" />;
      case 'challenge': return <Sparkles className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'practice': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'review': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'challenge': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-200/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-violet-500/10">
          <Brain className="h-5 w-5 text-violet-500" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Smart Recommendations</h3>
          <p className="text-sm text-muted-foreground">Personalized learning path based on your progress</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl bg-white/70 dark:bg-black/20 border border-white/50 hover:border-violet-300/50 transition-all group ${getPriorityBorder(rec.priority)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Badge className={getTypeColor(rec.type)}>
                  {getTypeIcon(rec.type)}
                  <span className="ml-1 capitalize">{rec.type}</span>
                </Badge>
                <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                  {rec.difficulty}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {rec.estimatedTime}
              </div>
            </div>

            <h4 className="font-bold text-foreground mb-2 group-hover:text-violet-600 transition-colors">
              {rec.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mb-1">
                  💡 {rec.reason}
                </p>
                <p className="text-xs text-muted-foreground">
                  +{rec.xpReward} XP reward
                </p>
              </div>
              <Link href={rec.link}>
                <Button size="sm" variant="outline" className="group-hover:bg-violet-500 group-hover:text-white transition-colors">
                  Start
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Learning Insights */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-300/30">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-bold text-violet-700 dark:text-violet-300">AI Insight</span>
        </div>
        <p className="text-sm text-foreground">
          {completedLessons < 10 
            ? "Focus on building vocabulary and basic grammar. You're making great progress!"
            : completedLessons < 50
            ? "Time to practice more conversations! Your foundation is strong."
            : "Consider advanced topics like business English or specialized vocabulary."
          }
        </p>
      </div>
    </Card>
  );
}