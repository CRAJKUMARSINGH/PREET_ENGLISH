import React, { useState } from "react";
import { useLocation } from "wouter";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";

export default function AuthPageDirect() {
    const [, setLocation] = useLocation();
    const [activeTab, setActiveTab] = useState("register");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleCreateAccount = async () => {
        console.log('🚀 CREATE ACCOUNT CLICKED!');
        console.log('📝 Username:', username);
        console.log('📝 Password:', password);
        
        // Clear any previous messages
        setMessage("");
        
        // Basic validation
        if (!username || username.length < 2) {
            setMessage("❌ Username must be at least 2 characters");
            return;
        }
        
        if (!password || password.length < 6) {
            setMessage("❌ Password must be at least 6 characters");
            return;
        }
        
        setIsLoading(true);
        setMessage("⏳ Creating your account...");
        
        try {
            // Simulate account creation
            console.log('✅ Simulating account creation...');
            
            // Wait 2 seconds to simulate processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create mock user
            const mockUser = {
                id: Date.now(),
                username: username,
                isAdmin: false,
                createdAt: new Date().toISOString()
            };
            
            // Store in localStorage
            localStorage.setItem('preet-english-user', JSON.stringify(mockUser));
            localStorage.setItem('preet-english-auth', 'true');
            
            console.log('✅ User created and stored:', mockUser);
            
            setMessage("🎉 Account created successfully! Redirecting...");
            
            // Redirect to dashboard after 1 second
            setTimeout(() => {
                console.log('🔄 Redirecting to dashboard...');
                setLocation("/dashboard");
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error:', error);
            setMessage("❌ Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async () => {
        console.log('🔐 LOGIN CLICKED!');
        
        setMessage("");
        
        if (!username || !password) {
            setMessage("❌ Please enter both username and password");
            return;
        }
        
        setIsLoading(true);
        setMessage("⏳ Signing you in...");
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const mockUser = {
                id: Date.now(),
                username: username,
                isAdmin: false,
                loginAt: new Date().toISOString()
            };
            
            localStorage.setItem('preet-english-user', JSON.stringify(mockUser));
            localStorage.setItem('preet-english-auth', 'true');
            
            setMessage("✅ Login successful! Redirecting...");
            
            setTimeout(() => {
                setLocation("/dashboard");
            }, 1000);
            
        } catch (error) {
            setMessage("❌ Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <SaraswatiLogo />
                        <h1 className="text-3xl font-bold text-gray-900 mt-4">
                            PREET ENGLISH
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Learn English with Hindi Support
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <div className="flex mb-6">
                            <button
                                onClick={() => {
                                    setActiveTab("login");
                                    setMessage("");
                                }}
                                className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
                                    activeTab === "login"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab("register");
                                    setMessage("");
                                }}
                                className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
                                    activeTab === "register"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    disabled={isLoading}
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
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    disabled={isLoading}
                                />
                            </div>
                            
                            {/* Message Display */}
                            {message && (
                                <div className={`p-3 rounded-lg text-sm ${
                                    message.includes('❌') 
                                        ? 'bg-red-100 text-red-700 border border-red-200'
                                        : message.includes('🎉') || message.includes('✅')
                                        ? 'bg-green-100 text-green-700 border border-green-200'
                                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                                }`}>
                                    {message}
                                </div>
                            )}
                            
                            {/* Action Button */}
                            <button
                                onClick={activeTab === "register" ? handleCreateAccount : handleLogin}
                                disabled={isLoading}
                                className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all transform hover:scale-105 disabled:scale-100 disabled:opacity-70 ${
                                    activeTab === "register"
                                        ? "bg-green-500 hover:bg-green-600 shadow-lg"
                                        : "bg-blue-500 hover:bg-blue-600 shadow-lg"
                                }`}
                            >
                                {isLoading 
                                    ? "⏳ Please wait..." 
                                    : activeTab === "register" 
                                        ? "🚀 Create Account" 
                                        : "🔐 Login"
                                }
                            </button>
                        </div>
                    </div>

                    {/* Quick Test Credentials */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-yellow-800 font-medium mb-2">
                            🧪 Quick Test Credentials:
                        </p>
                        <p className="text-xs text-yellow-700">
                            Username: <code className="bg-yellow-200 px-1 rounded">testuser</code> | 
                            Password: <code className="bg-yellow-200 px-1 rounded">password123</code>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 text-gray-500 text-sm">
                        © 2024 PreetEnglish. Mrs. Premlata Jain Initiative.
                    </div>
                </div>
            </div>
        </div>
    );
}