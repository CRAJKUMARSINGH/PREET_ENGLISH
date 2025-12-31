import { useState } from 'react';
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<'positive' | 'negative' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim() && !rating) return;

    // Store feedback locally (can be sent to server later)
    const feedbackData = {
      rating,
      feedback,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    };

    const existingFeedback = JSON.parse(localStorage.getItem('user_feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('user_feedback', JSON.stringify(existingFeedback));

    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedback('');
      setRating(null);
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Send Feedback"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Feedback Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Send Feedback</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {!submitted ? (
              <>
                {/* Rating */}
                <div>
                  <p className="text-sm font-medium mb-2">How is your experience?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRating('positive')}
                      className={cn(
                        'flex-1 p-3 rounded-lg border-2 transition-all',
                        rating === 'positive'
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-green-300'
                      )}
                    >
                      <ThumbsUp className={cn(
                        'h-6 w-6 mx-auto',
                        rating === 'positive' ? 'text-green-600' : 'text-muted-foreground'
                      )} />
                      <p className="text-xs mt-1">Good</p>
                    </button>
                    <button
                      onClick={() => setRating('negative')}
                      className={cn(
                        'flex-1 p-3 rounded-lg border-2 transition-all',
                        rating === 'negative'
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-red-300'
                      )}
                    >
                      <ThumbsDown className={cn(
                        'h-6 w-6 mx-auto',
                        rating === 'negative' ? 'text-red-600' : 'text-muted-foreground'
                      )} />
                      <p className="text-xs mt-1">Bad</p>
                    </button>
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <p className="text-sm font-medium mb-2">Tell us more (optional)</p>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What can we improve? Any suggestions?"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={!feedback.trim() && !rating}
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your feedback helps us improve! 🙏
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">🎉</div>
                <h4 className="font-semibold text-lg mb-2">Thank You!</h4>
                <p className="text-sm text-muted-foreground">
                  Your feedback has been received.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
