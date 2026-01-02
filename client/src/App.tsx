import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import LessonView from "@/pages/LessonView";
import Profile from "@/pages/Profile";
import SpeakingPractice from "@/pages/SpeakingPractice";
import VocabularyPage from "@/pages/VocabularyPage";
import ConversationsPage from "@/pages/ConversationsPage";
import Community from "@/pages/Community";
import Advanced from "@/pages/Advanced";
import HindiLearning from "@/pages/HindiLearning";
import AdvancedHindiLearning from "@/pages/AdvancedHindiLearning";
import HindiMastery from "@/pages/HindiMastery";
import HindiFluency from "@/pages/HindiFluency";
import HindiComplete from "@/pages/HindiComplete";
import HindiStories from "@/pages/HindiStories";
import HindiGames from "@/pages/HindiGames";
import HindiDaily from "@/pages/HindiDaily";
import HindiVocabulary from "@/pages/HindiVocabulary";
import HindiConversation from "@/pages/HindiConversation";
import AllLessons from "@/pages/AllLessons";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lesson/:id" component={LessonView} />
      <Route path="/lessons" component={AllLessons} />
      <Route path="/profile" component={Profile} />
      <Route path="/speak" component={SpeakingPractice} />
      <Route path="/vocabulary" component={VocabularyPage} />
      <Route path="/conversations" component={ConversationsPage} />
      <Route path="/community" component={Community} />
      <Route path="/advanced" component={Advanced} />
      <Route path="/hindi-learning" component={HindiLearning} />
      <Route path="/advanced-hindi" component={AdvancedHindiLearning} />
      <Route path="/hindi-mastery" component={HindiMastery} />
      <Route path="/hindi-fluency" component={HindiFluency} />
      <Route path="/hindi-complete" component={HindiComplete} />
      <Route path="/hindi-stories" component={HindiStories} />
      <Route path="/hindi-games" component={HindiGames} />
      <Route path="/hindi-daily" component={HindiDaily} />
      <Route path="/hindi-vocabulary" component={HindiVocabulary} />
      <Route path="/hindi-conversation" component={HindiConversation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Router />
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
