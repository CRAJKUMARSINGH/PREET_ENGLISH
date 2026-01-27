import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  Wand2, 
  BookOpen, 
  Loader2, 
  Download,
  Eye,
  Sparkles,
  Globe,
  Brain
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface GeneratedLesson {
  title: string;
  content: string;
  hindiContent: string;
  vocabulary: Array<{
    word: string;
    definition: string;
    hindiTranslation: string;
    example: string;
  }>;
  exercises: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

export function LessonGenerator() {
  const [topic, setTopic] = useState('');
  const [userLevel, setUserLevel] = useState('Beginner');
  const [learningStyle, setLearningStyle] = useState('visual');
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const generateLesson = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userLevel,
          topic: topic.trim(),
          learningStyle,
        }),
      });

      if (response.ok) {
        const lesson = await response.json();
        setGeneratedLesson(lesson);
        setShowPreview(true);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate lesson');
      }
    } catch (err: any) {
      console.error('Lesson generation error:', err);
      alert(err.message || 'Failed to generate lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadLesson = () => {
    if (!generatedLesson) return;

    const lessonData = {
      ...generatedLesson,
      generatedAt: new Date().toISOString(),
      parameters: { topic, userLevel, learningStyle }
    };

    const blob = new Blob([JSON.stringify(lessonData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-lesson-${topic.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      generateLesson();
    }
  };

  return (
    <div className="space-y-6">
      {/* Generator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600" />
            AI Lesson Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Restaurant Ordering, Job Interview"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <select
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
                disabled={loading}
                className="w-full p-2 border rounded-md"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Learning Style</label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                disabled={loading}
                className="w-full p-2 border rounded-md"
              >
                <option value="visual">Visual</option>
                <option value="auditory">Auditory</option>
                <option value="kinesthetic">Kinesthetic</option>
                <option value="reading">Reading/Writing</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={generateLesson} 
            disabled={loading || !topic.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Lesson...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Lesson
              </>
            )}
          </Button>

          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              AI will create a personalized lesson with English content, Hindi translations, 
              vocabulary, and exercises tailored to your specified level and learning style.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Generated Lesson Preview */}
      {generatedLesson && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Generated Lesson: {generatedLesson.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadLesson}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{userLevel}</Badge>
              <Badge variant="outline">{learningStyle}</Badge>
              <Badge variant="outline">{topic}</Badge>
            </div>
          </CardHeader>

          {showPreview && (
            <CardContent className="space-y-6">
              {/* English Content */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  English Content
                </h3>
                <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
                  <ReactMarkdown>{generatedLesson.content}</ReactMarkdown>
                </div>
              </div>

              {/* Hindi Content */}
              {generatedLesson.hindiContent && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Hindi Content (हिंदी सामग्री)
                  </h3>
                  <div className="prose prose-sm max-w-none bg-blue-50 p-4 rounded-lg">
                    <ReactMarkdown>{generatedLesson.hindiContent}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Vocabulary */}
              {generatedLesson.vocabulary && generatedLesson.vocabulary.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Vocabulary</h3>
                  <div className="grid gap-3">
                    {generatedLesson.vocabulary.map((vocab, index) => (
                      <Card key={index} className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-600">{vocab.word}</span>
                            {vocab.hindiTranslation && (
                              <Badge variant="outline">{vocab.hindiTranslation}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{vocab.definition}</p>
                          {vocab.example && (
                            <p className="text-sm italic">Example: {vocab.example}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercises */}
              {generatedLesson.exercises && generatedLesson.exercises.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Practice Exercises</h3>
                  <div className="space-y-4">
                    {generatedLesson.exercises.map((exercise, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-3">
                          <p className="font-medium">
                            {index + 1}. {exercise.question}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {exercise.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 border rounded text-sm ${
                                  option === exercise.correctAnswer
                                    ? 'bg-green-100 border-green-300'
                                    : 'bg-gray-50'
                                }`}
                              >
                                {String.fromCharCode(65 + optionIndex)}. {option}
                                {option === exercise.correctAnswer && (
                                  <span className="ml-2 text-green-600">✓</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}