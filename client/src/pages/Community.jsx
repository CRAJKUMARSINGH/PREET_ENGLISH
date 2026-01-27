var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState, useRef } from 'react';
import { Layout } from "@/components/Layout";
import { ActivityFeedComponent } from '@/components/ActivityFeed';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Sparkles, MessageSquare, Share2, Download } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ShareCard } from '@/components/ShareCard';
import html2canvas from 'html2canvas';
import { useQuery } from '@tanstack/react-query';
export default function Community() {
    var _this = this;
    var _a = useState('feed'), activeTab = _a[0], setActiveTab = _a[1];
    var _b = useState(false), showShareModal = _b[0], setShowShareModal = _b[1];
    var shareRef = useRef(null);
    var _c = useQuery({
        queryKey: ['/api/activity-feed'],
    }), _d = _c.data, activities = _d === void 0 ? [] : _d, isLoading = _c.isLoading;
    var _e = useQuery({
        queryKey: ['/api/community/buddies'],
    }).data, buddies = _e === void 0 ? [] : _e;
    var handleDownload = function () { return __awaiter(_this, void 0, void 0, function () {
        var canvas, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!shareRef.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, html2canvas(shareRef.current)];
                case 1:
                    canvas = _a.sent();
                    link = document.createElement('a');
                    link.download = 'preet-english-achievement.png';
                    link.href = canvas.toDataURL();
                    link.click();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Users className="h-8 w-8 text-primary"/>
              समुदाय (Community)
            </h1>
            <p className="text-muted-foreground">
              Connect, share, and grow together • साथ मिलकर सीखें और आगे बढ़ें
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 rounded-xl h-12" onClick={function () { return setShowShareModal(true); }}>
              <Share2 className="h-4 w-4"/> Share Progress
            </Button>
            <Button className="md:w-auto w-full gap-2 rounded-xl h-12">
              <Sparkles className="h-4 w-4"/>
              New Post
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Main Content (Feed) */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button onClick={function () { return setActiveTab('feed'); }} className={"px-4 py-2 rounded-lg text-sm font-medium transition-all ".concat(activeTab === 'feed'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground')}>
                Activity Feed
              </button>
              <button onClick={function () { return setActiveTab('buddy'); }} className={"px-4 py-2 rounded-lg text-sm font-medium transition-all ".concat(activeTab === 'buddy'
            ? 'bg-white text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground')}>
                Find Study Buddy
              </button>
            </div>

            {activeTab === 'feed' ? (isLoading ? (<div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>) : (<ActivityFeedComponent activities={activities}/>)) : (<div className="grid gap-4">
                {/* Study Buddy Live UI */}
                {buddies.length > 0 ? buddies.map(function (user) { return (<div key={user.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border shadow-sm flex items-center justify-between">
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
                      <MessageSquare className="h-4 w-4"/> Message
                    </Button>
                  </div>); }) : (<div className="text-center py-12 opacity-50">No buddies found yet.</div>)}
              </div>)}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-bold text-lg mb-2">Weekly Challenge 🏆</h3>
              <p className="text-sm text-muted-foreground mb-4">Complete 5 lessons this week to win the "Community Star" badge.</p>
              <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden mb-2">
                <div className="bg-primary h-full w-3/5"/>
              </div>
              <p className="text-xs text-right font-bold text-primary">3/5 Completed</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['#GrammarHelp', '#DailyPractice', '#Vocabulary', '#Pronunciation', '#HindiMovies'].map(function (tag) { return (<Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {tag}
                  </Badge>); })}
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
              <ShareCard ref={shareRef} username="Vidyarthi" achievement="Weekly Streak" type="STREAK" value="7 Days"/>
            </div>
            <Button className="w-full gap-2 h-14 rounded-2xl text-lg font-bold shadow-lg" onClick={handleDownload}>
              <Download className="h-5 w-5"/> Download Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>);
}
