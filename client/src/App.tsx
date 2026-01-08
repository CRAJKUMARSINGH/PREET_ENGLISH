import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { SupabaseAuthProvider } from "@/hooks/use-supabase-auth";
import { Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load components for better performance
const NewLanding = lazy(() => import("@/pages/NewLanding"));
const AuthPage = lazy(() => import("@/pages/AuthPageSupabase"));
const Home = lazy(() => import("@/pages/Home"));
const AllLessons = lazy(() => import("@/pages/AllLessons"));
const VocabularyPage = lazy(() => import("@/pages/VocabularyPage"));
const SpeakingPractice = lazy(() => import("@/pages/SpeakingPractice"));
const HindiStories = lazy(() => import("@/pages/HindiStories"));
const Chat = lazy(() => import("@/pages/Chat"));
const Profile = lazy(() => import("@/pages/Profile"));
const Admin = lazy(() => import("@/pages/Admin"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Memoized route component for better performance
const AppRoutes = React.memo(() => (
  <Switch>
    <Route path="/" component={NewLanding} />
    <Route path="/auth" component={AuthPage} />
    <Route path="/dashboard" component={Home} />
    <Route path="/lessons" component={AllLessons} />
    <Route path="/vocabulary" component={VocabularyPage} />
    <Route path="/speaking" component={SpeakingPractice} />
    <Route path="/listening" component={HindiStories} />
    <Route path="/stories" component={HindiStories} />
    <Route path="/chat" component={Chat} />
    <Route path="/progress" component={Profile} />
    <Route path="/admin" component={Admin} />
    <Route>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    </Route>
  </Switch>
));

AppRoutes.displayName = 'AppRoutes';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <SupabaseAuthProvider>
            <AuthProvider>
              <ErrorBoundary>
                <div className="min-h-screen bg-background">
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppRoutes />
                  </Suspense>
                  <Toaster />
                </div>
              </ErrorBoundary>
            </AuthProvider>
          </SupabaseAuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;