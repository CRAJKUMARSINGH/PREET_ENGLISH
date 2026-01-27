import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { HindiStory } from '@/data/hindiStoriesData';

interface HindiStoryCardProps {
  story: HindiStory;
  onRead?: (storyId: number) => void;
  showAnimation?: boolean;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function HindiStoryCard({ story, onRead, showAnimation = false }: HindiStoryCardProps) {
  const { t, i18n } = useTranslation();
  
  const title = i18n.language === 'hi' ? story.titleHindi : story.title;
  const description = i18n.language === 'hi' ? story.descriptionHindi : story.description;

  return (
    <motion.div
      initial={showAnimation ? { opacity: 0, y: 20 } : false}
      animate={showAnimation ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
            {story.imageUrl && (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center gap-2 mb-3">
            <Badge className={difficultyColors[story.difficulty]}>
              {t(story.difficulty)}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {story.category}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{story.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>+{story.xpReward} XP</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{story.vocabulary.length} words</span>
            </div>
          </div>

          {/* Vocabulary Preview */}
          <div className="mb-4">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              {t('key_vocabulary')}:
            </div>
            <div className="flex flex-wrap gap-1">
              {story.vocabulary.slice(0, 3).map((word, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                  {word.word}
                </Badge>
              ))}
              {story.vocabulary.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  +{story.vocabulary.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Button 
            onClick={() => onRead?.(story.id)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            size="sm"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            {t('start_reading', 'Start Reading')}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}