import { useState, useRef } from 'react';
import { Layout } from "@/components/Layout";
import { ActivityFeedComponent, ActivityItem } from '@/components/ActivityFeed';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Sparkles, MessageSquare, Share2, Download } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShareCard } from '@/components/ShareCard';
import html2canvas from 'html2canvas';
import { useQuery } from '@tanstack/react-query';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'feed' | 'buddy'>('feed');
  const [showShareModal, setShowShareModal] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const { data: activities = [], isLoading } = useQuery<ActivityItem[]>({
    queryKey: ['/api/activity-feed'],
  });

  const { data: buddies = [] } = useQuery<any[]>({
    queryKey: ['/api/community/buddies'],
  });

  const handleDownload = async () => {
    if (!shareRef.current) return;
    const canvas = await html2canvas(shareRef.current);
    const link = document.createElement('a');
    link.download = 'preet-english-achievement.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Users className="h-8 w-8 text-primary" />
              समुदाय (Community)
            </h1>
            <p className="text-muted-foreground">
              Connect, share, and grow together • साथ मिलकर सीखें और आगे बढ़ें
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 rounded-xl h-12" onClick={() => setShowShareModal(true)}>
              <Share2 className="h-4 w-4" /> Share Progress
            </Button>
            <Button className="md:w-auto w-full gap-2 rounded-xl h-12">
              <Sparkles className="h-4 w-4" />
              New Post
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Main Content (Feed) */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'feed'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Activity Feed
              </button>
              <button
                onClick={() => setActiveTab('buddy')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'buddy'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                Find Study Buddy
              </button>
            </div>

            {activeTab === 'feed' ? (
              isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <ActivityFeedComponent activities={activities} />
              )
            ) : (
              <div className="grid gap-4">
                {/* Study Buddy Live UI */}
                {buddies.length > 0 ? buddies.map((user) => (
                  <div key={user.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{user.username}</h3>
                        <p className="text-sm text-muted-foreground">Looking for: Conversation Practice • Level: Learner</p>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" /> Message
                    </Button>
                  </div>
                )) : (
                  <div className="text-center py-12 opacity-50">No buddies found yet.</div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-lg mb-2">Weekly Challenge 🏆</h3>
              <p className="text-sm text-muted-foreground mb-4">Complete 5 lessons this week to win the "Community Star" badge.</p>
              <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-primary h-full w-3/5" />
              </div>
              <p className="text-xs text-right font-bold text-primary">3/5 Completed</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['#GrammarHelp', '#DailyPractice', '#Vocabulary', '#Pronunciation', '#HindiMovies'].map(tag => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-[450px] p-0 bg-transparent border-none overflow-hidden sm:rounded-3xl">
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="scale-[0.85] origin-top">
              <ShareCard
                ref={shareRef}
                username="Vidyarthi"
                achievement="Weekly Streak"
                type="STREAK"
                value="7 Days"
              />
            </div>
            <Button className="w-full gap-2 h-14 rounded-2xl text-lg font-bold shadow-lg" onClick={handleDownload}>
              <Download className="h-5 w-5" /> Download Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
