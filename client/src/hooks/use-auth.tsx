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

    const {
        data: user,
        error,
        isLoading,
    } = useQuery<User | undefined, Error>({
        queryKey: ["/api/user"],
        queryFn: async () => {
            try {
                // First check localStorage for persisted user
                const storedUser = localStorage.getItem('preet-english-user');
                if (storedUser) {
                    console.log('👤 Found stored user:', JSON.parse(storedUser));
                    return JSON.parse(storedUser);
                }
                
                // Try to fetch from API
                const res = await fetch("/api/user", {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                
                if (res.status === 401) return undefined;
                if (!res.ok) {
                    console.warn(`API user fetch failed: ${res.status} ${res.statusText}`);
                    return undefined;
                }
                
                const userData = await res.json();
                return userData;
            } catch (error) {
                // Don't throw error, just return undefined for unauthenticated state
                console.log('ℹ️ No user session found or network error:', error);
                return undefined;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginData) => {
            console.log('🔐 Login attempt:', credentials.username);
            
            try {
                // For production deployment, try API first
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `Login failed: ${response.status}`);
                }

                const userData = await response.json();
                console.log('✅ Login successful:', userData);
                return userData;
                
            } catch (error) {
                console.error('❌ Login API failed:', error);
                
                // Fallback to mock authentication for frontend-only deployment
                if (error instanceof TypeError && error.message.includes('fetch')) {
                    console.log('🌐 Network error, using mock authentication');
                    
                    toast({
                        title: "Demo Mode",
                        description: "Using demo authentication (API unavailable)",
                        variant: "default",
                    });
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const mockUser = {
                        id: Date.now(),
                        username: credentials.username,
                        isAdmin: credentials.username === 'admin'
                    };
                    
                    return mockUser;
                }
                
                throw error;
            }
        },
        onSuccess: (user: User) => {
            console.log('🎉 Login successful!', user);
            queryClient.setQueryData(["/api/user"], user);
            
            // Store user in localStorage for persistence
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            
            toast({
                title: "Welcome back! 🎉",
                description: `Successfully signed in as ${user.username}!`,
                variant: "default",
            });
            
            // Force redirect after a short delay
            setTimeout(() => {
                console.log('🔄 Forcing redirect to dashboard...');
                window.location.href = '/dashboard';
            }, 1000);
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
            console.log('📝 Registration attempt:', credentials.username);
            
            try {
                // Try API registration first
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `Registration failed: ${response.status}`);
                }

                const userData = await response.json();
                console.log('✅ Registration successful:', userData);
                return userData;
                
            } catch (error) {
                console.error('❌ Registration API failed:', error);
                
                // Fallback to mock authentication for frontend-only deployment
                if (error instanceof TypeError && error.message.includes('fetch')) {
                    console.log('🌐 Network error, using mock registration');
                    
                    toast({
                        title: "Demo Mode",
                        description: "Using demo registration (API unavailable)",
                        variant: "default",
                    });
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    const mockUser = {
                        id: Date.now(),
                        username: credentials.username,
                        isAdmin: false
                    };
                    
                    return mockUser;
                }
                
                throw error;
            }
        },
        onSuccess: (user: User) => {
            console.log('🎉 Registration successful!', user);
            queryClient.setQueryData(["/api/user"], user);
            
            // Store user in localStorage for persistence
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            
            toast({
                title: "🎉 Welcome to PreetEnglish!",
                description: `Account created successfully! Welcome, ${user.username}! Let's start learning English together.`,
                variant: "default",
            });
            
            // Force redirect after a short delay
            setTimeout(() => {
                console.log('🔄 Forcing redirect to dashboard...');
                window.location.href = '/dashboard';
            }, 1000);
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
            try {
                await apiRequest("POST", "/api/logout");
            } catch (error) {
                // Don't throw error for logout - always clear local state
                console.warn('Logout API failed, clearing local state anyway');
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["/api/user"], null);
            queryClient.clear(); // Clear all cached data on logout
            
            // Clear localStorage
            localStorage.removeItem('preet-english-user');
            
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
            localStorage.removeItem('preet-english-user');
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