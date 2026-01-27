import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CookieConsent } from "@/components/CookieConsent";
import { AuthProvider } from "@/hooks/use-auth";
import { lazy, Suspense, useEffect } from "react";
import { Loader2 } from "lucide-react";
import "./i18n"; // Initialize i18n
import { initAnalytics, logEvent } from "./lib/analytics";
import { initPerformanceMonitoring } from "./lib/performanceMonitoring";

// Lazy load pages with better chunking for English learning app
const Home = lazy(() => import("@/pages/Home"));
const LessonView = lazy(() => import("@/pages/LessonView"));
const Profile = lazy(() => import("@/pages/Profile"));
const SpeakingPractice = lazy(() => import("@/pages/SpeakingPractice"));
const Community = lazy(() => import("@/pages/Community"));
const Advanced = lazy(() => import("@/pages/Advanced"));

// Hindi Learning Components (grouped for better caching)
const HindiLearning = lazy(() => import("@/pages/HindiLearning"));
const AdvancedHindiLearning = lazy(() => import("@/pages/AdvancedHindiLearning"));
const HindiMastery = lazy(() => import("@/pages/HindiMastery"));
const HindiFluency = lazy(() => import("@/pages/HindiFluency"));
const HindiComplete = lazy(() => import("@/pages/HindiComplete"));
const HindiStories = lazy(() => import("@/pages/HindiStories"));
const HindiGames = lazy(() => import("@/pages/HindiGames"));
const HindiDaily = lazy(() => import("@/pages/HindiDaily"));
const HindiVocabulary = lazy(() => import("@/pages/HindiVocabulary"));
const HindiConversation = lazy(() => import("@/pages/HindiConversation"));

// Core Pages
const AllLessons = lazy(() => import("@/pages/AllLessons"));
const Landing = lazy(() => import("@/pages/Landing"));
const Chat = lazy(() => import("@/pages/Chat"));

// Admin & Labs (loaded on demand)
const LessonChecker = lazy(() => import("@/pages/Admin/LessonChecker"));
const LiteDashboard = lazy(() => import("@/pages/LiteDashboard"));
const ExperimentalLabs = lazy(() => import("@/pages/Labs/ExperimentalLabs"));
const Voicerooms = lazy(() => import("@/pages/Labs/Voicerooms"));
const BilingualReader = lazy(() => import("@/pages/Labs/BilingualReader"));
const StoryGenerator = lazy(() => import("@/pages/Labs/StoryGenerator"));
const VocabularyReview = lazy(() => import("@/pages/Labs/VocabularyReview"));
const NativeSpeakerVideos = lazy(() => import("@/pages/Labs/NativeSpeakerVideos"));
const AIVideoCall = lazy(() => import("@/pages/Labs/AIVideoCall"));
const MimicEngineDemo = lazy(() => import("@/pages/Labs/MimicEngineDemo"));

// Legal & Auth (minimal priority)
const PrivacyPage = lazy(() => import("@/pages/Legal/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("@/pages/Legal/TermsPage").then(m => ({ default: m.TermsPage })));
const NotFound = lazy(() => import("@/pages/not-found"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const AnalyticsDashboard = lazy(() => import("@/pages/Admin/AnalyticsDashboard"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Loading PREET_ENGLISH...</p>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Performance monitoring for page views
    const startTime = performance.now();

    logEvent("page_view", {
      manual_path: location,
      timestamp: Date.now()
    });

    // Measure page load time
    const measurePageLoad = () => {
      const loadTime = performance.now() - startTime;
      logEvent("page_load_time", {
        path: location,
        loadTime: Math.round(loadTime)
      });
    };

    // Measure after component mounts
    setTimeout(measurePageLoad, 100);
  }, [location]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/dashboard" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/lesson/:id" component={LessonView} />
        <Route path="/lessons" component={AllLessons} />
        <Route path="/profile" component={Profile} />
        <Route path="/speak" component={SpeakingPractice} />
        <Route path="/vocabulary" component={HindiVocabulary} />
        <Route path="/conversations" component={HindiConversation} />
        <Route path="/hindi-learning" component={HindiLearning} />
        <Route path="/hindi-stories" component={HindiStories} />
        <Route path="/hindi-games" component={HindiGames} />
        <Route path="/hindi-daily" component={HindiDaily} />
        <Route path="/hindi-mastery" component={HindiMastery} />
        <Route path="/hindi-fluency" component={HindiFluency} />
        <Route path="/advanced-hindi" component={AdvancedHindiLearning} />
        <Route path="/hindi-vocabulary" component={HindiVocabulary} />
        <Route path="/hindi-conversation" component={HindiConversation} />
        <Route path="/admin/checker" component={LessonChecker} />
        <Route path="/admin/analytics" component={AnalyticsDashboard} />
        <Route path="/lite" component={LiteDashboard} />
        <Route path="/labs" component={ExperimentalLabs} />
        <Route path="/labs/voicerooms" component={Voicerooms} />
        <Route path="/labs/reader" component={BilingualReader} />
        <Route path="/labs/stories" component={StoryGenerator} />
        <Route path="/labs/srs" component={VocabularyReview} />
        <Route path="/labs/videos" component={NativeSpeakerVideos} />
        <Route path="/labs/video-call" component={AIVideoCall} />
        <Route path="/labs/mimic-engine" component={MimicEngineDemo} />
        {/* Legal Pages */}
        <Route path="/legal/privacy" component={PrivacyPage} />
        <Route path="/legal/terms" component={TermsPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Initialize analytics and performance monitoring
    initAnalytics();
    initPerformanceMonitoring();

    // Preload critical resources for English learning
    const preloadCriticalResources = () => {
      // Preload common audio phrases
      import("@/lib/audioService").then(({ preloadCommonPhrases, COMMON_LEARNING_PHRASES }) => {
        preloadCommonPhrases(COMMON_LEARNING_PHRASES);
      });

      // Preload grammar engine for immediate feedback
      import("@/lib/grammarLogic");

      // Preload language utilities
      import("@/lib/languageUtils");
    };

    // Delay preloading to not block initial render
    setTimeout(preloadCriticalResources, 2000);

    // Web Vitals monitoring
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </TooltipProvider>
        </AuthProvider>
        {/* Tanner Linsley's DevTools for State Inspection */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
