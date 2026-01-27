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
var Home = lazy(function () { return import("@/pages/Home"); });
var LessonView = lazy(function () { return import("@/pages/LessonView"); });
var Profile = lazy(function () { return import("@/pages/Profile"); });
var SpeakingPractice = lazy(function () { return import("@/pages/SpeakingPractice"); });
var Community = lazy(function () { return import("@/pages/Community"); });
var Advanced = lazy(function () { return import("@/pages/Advanced"); });
// Hindi Learning Components (grouped for better caching)
var HindiLearning = lazy(function () { return import("@/pages/HindiLearning"); });
var AdvancedHindiLearning = lazy(function () { return import("@/pages/AdvancedHindiLearning"); });
var HindiMastery = lazy(function () { return import("@/pages/HindiMastery"); });
var HindiFluency = lazy(function () { return import("@/pages/HindiFluency"); });
var HindiComplete = lazy(function () { return import("@/pages/HindiComplete"); });
var HindiStories = lazy(function () { return import("@/pages/HindiStories"); });
var HindiGames = lazy(function () { return import("@/pages/HindiGames"); });
var HindiDaily = lazy(function () { return import("@/pages/HindiDaily"); });
var HindiVocabulary = lazy(function () { return import("@/pages/HindiVocabulary"); });
var HindiConversation = lazy(function () { return import("@/pages/HindiConversation"); });
// Core Pages
var AllLessons = lazy(function () { return import("@/pages/AllLessons"); });
var Landing = lazy(function () { return import("@/pages/Landing"); });
var Chat = lazy(function () { return import("@/pages/Chat"); });
// Admin & Labs (loaded on demand)
var LessonChecker = lazy(function () { return import("@/pages/Admin/LessonChecker"); });
var LiteDashboard = lazy(function () { return import("@/pages/LiteDashboard"); });
var ExperimentalLabs = lazy(function () { return import("@/pages/Labs/ExperimentalLabs"); });
var Voicerooms = lazy(function () { return import("@/pages/Labs/Voicerooms"); });
var BilingualReader = lazy(function () { return import("@/pages/Labs/BilingualReader"); });
var StoryGenerator = lazy(function () { return import("@/pages/Labs/StoryGenerator"); });
var VocabularyReview = lazy(function () { return import("@/pages/Labs/VocabularyReview"); });
var NativeSpeakerVideos = lazy(function () { return import("@/pages/Labs/NativeSpeakerVideos"); });
var AIVideoCall = lazy(function () { return import("@/pages/Labs/AIVideoCall"); });
var MimicEngineDemo = lazy(function () { return import("@/pages/Labs/MimicEngineDemo"); });
// Legal & Auth (minimal priority)
var PrivacyPage = lazy(function () { return import("@/pages/Legal/PrivacyPage").then(function (m) { return ({ default: m.PrivacyPage }); }); });
var TermsPage = lazy(function () { return import("@/pages/Legal/TermsPage").then(function (m) { return ({ default: m.TermsPage }); }); });
var NotFound = lazy(function () { return import("@/pages/not-found"); });
var AuthPage = lazy(function () { return import("@/pages/AuthPage"); });
var AnalyticsDashboard = lazy(function () { return import("@/pages/Admin/AnalyticsDashboard"); });
function LoadingFallback() {
    return (<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto"/>
        <p className="text-sm text-muted-foreground">Loading PREET_ENGLISH...</p>
      </div>
    </div>);
}
function Router() {
    var location = useLocation()[0];
    useEffect(function () {
        // Performance monitoring for page views
        var startTime = performance.now();
        logEvent("page_view", {
            manual_path: location,
            timestamp: Date.now()
        });
        // Measure page load time
        var measurePageLoad = function () {
            var loadTime = performance.now() - startTime;
            logEvent("page_load_time", {
                path: location,
                loadTime: Math.round(loadTime)
            });
        };
        // Measure after component mounts
        setTimeout(measurePageLoad, 100);
    }, [location]);
    return (<Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route path="/" component={Landing}/>
        <Route path="/auth" component={AuthPage}/>
        <Route path="/dashboard" component={Home}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/lesson/:id" component={LessonView}/>
        <Route path="/lessons" component={AllLessons}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/speak" component={SpeakingPractice}/>
        <Route path="/vocabulary" component={HindiVocabulary}/>
        <Route path="/conversations" component={HindiConversation}/>
        <Route path="/hindi-learning" component={HindiLearning}/>
        <Route path="/hindi-stories" component={HindiStories}/>
        <Route path="/hindi-games" component={HindiGames}/>
        <Route path="/hindi-daily" component={HindiDaily}/>
        <Route path="/hindi-mastery" component={HindiMastery}/>
        <Route path="/hindi-fluency" component={HindiFluency}/>
        <Route path="/advanced-hindi" component={AdvancedHindiLearning}/>
        <Route path="/hindi-vocabulary" component={HindiVocabulary}/>
        <Route path="/hindi-conversation" component={HindiConversation}/>
        <Route path="/admin/checker" component={LessonChecker}/>
        <Route path="/admin/analytics" component={AnalyticsDashboard}/>
        <Route path="/lite" component={LiteDashboard}/>
        <Route path="/labs" component={ExperimentalLabs}/>
        <Route path="/labs/voicerooms" component={Voicerooms}/>
        <Route path="/labs/reader" component={BilingualReader}/>
        <Route path="/labs/stories" component={StoryGenerator}/>
        <Route path="/labs/srs" component={VocabularyReview}/>
        <Route path="/labs/videos" component={NativeSpeakerVideos}/>
        <Route path="/labs/video-call" component={AIVideoCall}/>
        <Route path="/labs/mimic-engine" component={MimicEngineDemo}/>
        {/* Legal Pages */}
        <Route path="/legal/privacy" component={PrivacyPage}/>
        <Route path="/legal/terms" component={TermsPage}/>
        <Route component={NotFound}/>
      </Switch>
    </Suspense>);
}
function App() {
    useEffect(function () {
        // Initialize analytics and performance monitoring
        initAnalytics();
        initPerformanceMonitoring();
        // Preload critical resources for English learning
        var preloadCriticalResources = function () {
            // Preload common audio phrases
            import("@/lib/audioService").then(function (_a) {
                var preloadCommonPhrases = _a.preloadCommonPhrases, COMMON_LEARNING_PHRASES = _a.COMMON_LEARNING_PHRASES;
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
            import('web-vitals').then(function (_a) {
                var getCLS = _a.getCLS, getFID = _a.getFID, getFCP = _a.getFCP, getLCP = _a.getLCP, getTTFB = _a.getTTFB;
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }
    }, []);
    return (<ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <CookieConsent />
          </TooltipProvider>
        </AuthProvider>
        {/* Tanner Linsley's DevTools for State Inspection */}
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ErrorBoundary>);
}
export default App;
