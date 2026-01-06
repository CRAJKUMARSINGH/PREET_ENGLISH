import { createContext, ReactNode, useContext } from "react";
import {
    useQuery,
    useMutation,
    UseMutationResult,
    useQueryClient,
} from "@tanstack/react-query";
import { InsertUser, User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { usePerformanceMonitor } from "@/hooks/use-performance";

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    loginMutation: UseMutationResult<User, Error, LoginData>;
    logoutMutation: UseMutationResult<void, Error, void>;
    registerMutation: UseMutationResult<User, Error, InsertUser>;
};

type LoginData = Pick<InsertUser, "username" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { startTimer, endTimer } = usePerformanceMonitor('AuthProvider');

    const {
        data: user,
        error,
        isLoading,
    } = useQuery<User | undefined, Error>({
        queryKey: ["/api/user"],
        queryFn: async () => {
            const timer = startTimer();
            try {
                const res = await fetch("/api/user");
                if (res.status === 401) return undefined;
                if (!res.ok) throw new Error("Failed to fetch user");
                const userData = await res.json();
                endTimer(timer, 'User fetch');
                return userData;
            } catch (error) {
                endTimer(timer, 'User fetch (failed)');
                throw error;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginData) => {
            const timer = startTimer();
            console.log('🔐 Login attempt:', credentials.username);
            
            try {
                // For frontend-only deployment, simulate login
                if (window.location.hostname.includes('netlify.app')) {
                    console.log('🌐 Frontend-only mode: simulating login');
                    // Simulate network delay
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const mockUser = {
                        id: Date.now(),
                        username: credentials.username,
                        isAdmin: false
                    };
                    
                    endTimer(timer, 'Mock login');
                    return mockUser;
                }
                
                // Normal backend login
                const res = await apiRequest("POST", "/api/login", credentials);
                const userData = await res.json();
                endTimer(timer, 'Backend login');
                return userData;
            } catch (error) {
                endTimer(timer, 'Login (failed)');
                throw error;
            }
        },
        onSuccess: (user: User) => {
            queryClient.setQueryData(["/api/user"], user);
            toast({
                title: "Login successful! 🎉",
                description: `Welcome back, ${user.username}!`,
                variant: "default",
            });
        },
        onError: (error: Error) => {
            console.error('❌ Login error:', error);
            toast({
                title: "Login failed",
                description: error.message || "Please check your credentials and try again.",
                variant: "destructive",
            });
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (credentials: InsertUser) => {
            const timer = startTimer();
            console.log('📝 Registration attempt:', credentials.username);
            
            try {
                // For frontend-only deployment, simulate registration
                if (window.location.hostname.includes('netlify.app')) {
                    console.log('🌐 Frontend-only mode: simulating registration');
                    // Simulate network delay
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    const mockUser = {
                        id: Date.now(),
                        username: credentials.username,
                        isAdmin: false
                    };
                    
                    endTimer(timer, 'Mock registration');
                    return mockUser;
                }
                
                // Normal backend registration
                const res = await apiRequest("POST", "/api/register", credentials);
                const userData = await res.json();
                endTimer(timer, 'Backend registration');
                return userData;
            } catch (error) {
                endTimer(timer, 'Registration (failed)');
                throw error;
            }
        },
        onSuccess: (user: User) => {
            queryClient.setQueryData(["/api/user"], user);
            toast({
                title: "Account created successfully! 🎉",
                description: `Welcome to PreetEnglish, ${user.username}! Let's start learning.`,
                variant: "default",
            });
        },
        onError: (error: Error) => {
            console.error('❌ Registration error:', error);
            toast({
                title: "Registration failed",
                description: error.message || "Please try again with different credentials.",
                variant: "destructive",
            });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const timer = startTimer();
            try {
                await apiRequest("POST", "/api/logout");
                endTimer(timer, 'Logout');
            } catch (error) {
                endTimer(timer, 'Logout (failed)');
                // Don't throw error for logout - always clear local state
                console.warn('Logout API failed, clearing local state anyway');
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["/api/user"], null);
            queryClient.clear(); // Clear all cached data on logout
            toast({
                title: "Logged out successfully",
                description: "See you next time!",
                variant: "default",
            });
        },
        onError: (error: Error) => {
            console.error('❌ Logout error:', error);
            // Still clear local state even if API fails
            queryClient.setQueryData(["/api/user"], null);
            toast({
                title: "Logged out",
                description: "Session ended (with some issues)",
                variant: "default",
            });
        },
    });

    return (
        <AuthContext.Provider
            value={{
                user: user ?? null,
                isLoading,
                error,
                loginMutation,
                logoutMutation,
                registerMutation,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}