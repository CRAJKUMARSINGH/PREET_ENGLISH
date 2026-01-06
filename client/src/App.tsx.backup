import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Lazy Load Pages - Enhanced with D1's superior pages
const NewLanding = lazy(() => import("@/pages/NewLanding")); // D1's superior landing
const Home = lazy(() => import("@/pages/Home")); // D1's enhanced home
const ModernHome = lazy(() => import("@/pages/ModernHome")); // Keep main app's modern home as alternative
const LessonView = lazy(() => import("@/pages/LessonView"));
const Profile = lazy(() => import("@/pages/Profile"));
const SpeakingPractice = lazy(() => import("@/pages/SpeakingPractice"));
const VocabularyPage = lazy(() => import("@/pages/VocabularyPage"));
const ConversationsPage = lazy(() => import("@/pages/ConversationsPage"));
const Community = lazy(() => import("@/pages/Community"));
const Advanced = lazy(() => import("@/pages/Advanced"));
const HindiLearning = lazy(() => import("@/pages/HindiLearning"));
const AdvancedHindiLearning = lazy(() => import("@/pages/AdvancedHindiLearning"));
const HindiMastery = lazy(() => import("@/pages/HindiMastery"));
const HindiFluency = lazy(() => import("@/pages/HindiFluency"));
const HindiComplete = lazy(() => import("@/pages/HindiComplete"));
const StoryList = lazy(() => import("@/pages/StoryList"));
const StoryView = lazy(() => import("@/pages/StoryView"));
const HindiGames = lazy(() => import("@/pages/HindiGames"));
const HindiDaily = lazy(() => import("@/pages/HindiDaily"));
const HindiVocabulary = lazy(() => import("@/pages/HindiVocabulary"));
const HindiConversation = lazy(() => import("@/pages/HindiConversation"));
const AllLessons = lazy(() => import("@/pages/AllLessons"));
const NotFound = lazy(() => import("@/pages/not-found"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const DailyReview = lazy(() => import("@/pages/DailyReview"));
const HelpCenter = lazy(() => import("@/pages/HelpCenter"));
const UpgradeToPro = lazy(() => import("@/pages/UpgradeToPro"));
const Leaderboard = lazy(() => import("@/pages/Leaderboard"));
const HindiStories = lazy(() => import("@/pages/HindiStories"));
const Chat = lazy(() => import("@/pages/Chat")); // D1's chat feature

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Landing & Main - D1's superior landing */}
      <Route path="/" component={NewLanding} />
      <Route path="/dashboard" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/modern-home" component={ModernHome} /> {/* Keep main app's modern home as alternative */}
      
      {/* Authentication */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Core Learning */}
      <ProtectedRoute path="/lessons" component={AllLessons} />
      <ProtectedRoute path="/lesson/:id" component={LessonView} />
      <ProtectedRoute path="/review" component={DailyReview} />
      
      {/* Hindi Learning Modules - D1's enhanced structure */}
      <ProtectedRoute path="/vocabulary" component={HindiVocabulary} />
      <ProtectedRoute path="/conversation" component={HindiConversation} />
      <ProtectedRoute path="/stories" component={HindiStories} />
      <ProtectedRoute path="/games" component={HindiGames} />
      <ProtectedRoute path="/daily" component={HindiDaily} />
      <ProtectedRoute path="/fluency" component={HindiFluency} />
      <ProtectedRoute path="/hindi-fluency" component={HindiFluency} />
      <ProtectedRoute path="/mastery" component={HindiMastery} />
      <ProtectedRoute path="/hindi-mastery" component={HindiMastery} />
      <ProtectedRoute path="/hindi-complete" component={HindiComplete} />
      
      {/* Advanced Features */}
      <ProtectedRoute path="/advanced" component={AdvancedHindiLearning} />
      <ProtectedRoute path="/speaking" component={SpeakingPractice} />
      <ProtectedRoute path="/speak" component={SpeakingPractice} /> {/* Keep main app route */}
      <ProtectedRoute path="/chat" component={Chat} />
      
      {/* User Features */}
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/community" component={Community} />
      <ProtectedRoute path="/leaderboard" component={Leaderboard} />
      
      {/* Support & Premium */}
      <ProtectedRoute path="/support" component={HelpCenter} />
      <ProtectedRoute path="/pro" component={UpgradeToPro} />
      
      {/* Legacy routes - maintain compatibility */}
      <ProtectedRoute path="/hindi-learning" component={HindiLearning} />
      <ProtectedRoute path="/advanced-hindi" component={AdvancedHindiLearning} />
      <ProtectedRoute path="/hindi-stories" component={StoryList} />
      <ProtectedRoute path="/story/:id" component={StoryView} />
      <ProtectedRoute path="/hindi-games" component={HindiGames} />
      <ProtectedRoute path="/hindi-daily" component={HindiDaily} />
      <ProtectedRoute path="/hindi-vocabulary" component={HindiVocabulary} />
      <ProtectedRoute path="/hindi-conversation" component={HindiConversation} />
      <ProtectedRoute path="/conversations" component={ConversationsPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Toaster />
                <Router />
              </Suspense>
            </ErrorBoundary>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
