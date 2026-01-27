import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";

export default function AuthPageSimple() {
    const { user, loginMutation, registerMutation } = useAuth();
    const [, setLocation] = useLocation();
    const [activeTab, setActiveTab] = useState("register");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('✅ User authenticated, redirecting to dashboard:', user);
            setLocation("/dashboard");
        }
    }, [user, setLocation]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('🚀 FORM SUBMIT:', activeTab, { username, password });
        
        if (!username || username.length < 2) {
            alert('Username must be at least 2 characters');
            return;
        }
        
        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        if (isSubmitting) {
            console.log('⚠️ Already submitting');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const mutation = activeTab === "login" ? loginMutation : registerMutation;
            console.log('📝 Calling mutation for:', activeTab);
            await mutation.mutateAsync({ username, password });
            console.log('✅ Success!');
        } catch (error) {
            console.error('❌ Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Hero Section */}
            <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-90" />
                
                <div className="relative z-10">
                    <SaraswatiLogo />
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-4xl font-bold mb-6 font-display">
                        Start Your English Journey Today
                    </h1>
                    <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                        Join thousands of Hindi speakers learning English with confidence.
                        Practice speaking, build vocabulary, and master conversation with AI support.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">1625+</h3>
                            <p className="text-sm text-purple-200">Free Lessons</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">Free</h3>
                            <p className="text-sm text-purple-200">AI Tutor Access</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-purple-200">
                    © 2024 PreetEnglish. Mrs. Premlata Jain Initiative.
                </div>
            </div>

            {/* Auth Form Section */}
            <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                <div className="w-full max-w-md space-y-6">
                    <div className="lg:hidden flex justify-center mb-8">
                        <SaraswatiLogo />
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === "login"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === "register"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {activeTab === "login" ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {activeTab === "login" 
                                    ? "Sign in to continue your learning progress"
                                    : "Start your free learning journey today"
                                }
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="student123"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                    minLength={2}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    required
                                    minLength={6}
                                />
                            </div>
                            
                            {(loginMutation.error || registerMutation.error) && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    {loginMutation.error?.message || registerMutation.error?.message}
                                </div>
                            )}
                            
                            <Button
                                type="submit"
                                className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white py-3"
                                disabled={isSubmitting || loginMutation.isPending || registerMutation.isPending}
                            >
                                {isSubmitting || loginMutation.isPending || registerMutation.isPending
                                    ? "Please wait..."
                                    : activeTab === "login"
                                        ? "Login"
                                        : "Create Account"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}