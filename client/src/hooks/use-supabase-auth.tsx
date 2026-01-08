import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { auth } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

export const SupabaseAuthContext = createContext<AuthContextType | null>(null);

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await auth.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            console.log('✅ User signed in:', session?.user?.email);
            break;
          case 'SIGNED_OUT':
            console.log('👋 User signed out');
            break;
          case 'TOKEN_REFRESHED':
            console.log('🔄 Token refreshed');
            break;
          case 'USER_UPDATED':
            console.log('👤 User updated');
            break;
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SupabaseAuthContext.Provider
      value={{
        user,
        session,
        loading,
        signOut,
      }}
    >
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return context;
}