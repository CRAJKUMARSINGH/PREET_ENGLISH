import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { auth } from "@/lib/supabase";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";

export default function AuthPageSupabase() {
    const [, setLocation] = useLocation();
    const [activeTab, setActiveTab] = useState("register");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

    // Check if user is already authenticated
    useEffect(() => {
        const checkUser = async () => {
            const user = await auth.getCurrentUser();
            if (user) {
                console.log('✅ User already authenticated:', user);
                setLocation("/dashboard");
            }
        };
        checkUser();
    }, [setLocation]);

    const showMessage = (msg: string, type: "success" | "error" | "info" = "info") => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(""), 5000);
    };

    const handleSignUp = async () => {
        console.log('🚀 SUPABASE SIGNUP STARTED');
        
        if (!email || !password) {
            showMessage("Please enter both email and password", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters", "error");
            return;
        }

        if (!email.includes('@')) {
            showMessage("Please enter a valid email address", "error");
            return;
        }

        setIsLoading(true);
        showMessage("Creating your account...", "info");

        try {
            const result = await auth.signUp(email, password, username || undefined);
            
            if (result.user) {
                console.log('✅ Signup successful:', result.user);
                showMessage("🎉 Account created successfully! Please check your email to verify your account.", "success");
                
                // If email confirmation is disabled, redirect immediately
                if (result.session) {
                    setTimeout(() => {
                        setLocation("/dashboard");
                    }, 2000);
                } else {
                    showMessage("Please check your email and click the verification link to complete signup.", "info");
                }
            }
        } catch (error: any) {
            console.error('❌ Signup failed:', error);
            showMessage(error.message || "Signup failed. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = async () => {
        console.log('🔐 SUPABASE SIGNIN STARTED');
        
        if (!email || !password) {
            showMessage("Please enter both email and password", "error");
            return;
        }

        setIsLoading(true);
        showMessage("Signing you in...", "info");

        try {
            const result = await auth.signIn(email, password);
            
            if (result.user) {
                console.log('✅ Signin successful:', result.user);
                showMessage("Welcome back! Redirecting...", "success");
                
                setTimeout(() => {
                    setLocation("/dashboard");
                }, 1000);
            }
        } catch (error: any) {
            console.error('❌ Signin failed:', error);
            showMessage(error.message || "Login failed. Please check your credentials.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        // For demo purposes, create a test account
        setEmail("demo@preetenglish.com");
        setPassword("demo123456");
        setUsername("demo_user");
        showMessage("Demo credentials loaded. Click 'Create Account' or 'Login' to continue.", "info");
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '30px' }}>
                    <SaraswatiLogo />
                </div>
                
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '10px'
                }}>
                    PREET ENGLISH
                </h1>
                
                <p style={{
                    color: '#666',
                    marginBottom: '30px'
                }}>
                    Learn English with Hindi Support
                </p>

                {/* Tab Navigation */}
                <div style={{ 
                    display: 'flex', 
                    marginBottom: '30px',
                    background: '#f5f5f5',
                    borderRadius: '10px',
                    padding: '5px'
                }}>
                    <button
                        onClick={() => {
                            setActiveTab("login");
                            setMessage("");
                        }}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            background: activeTab === "login" ? '#4CAF50' : 'transparent',
                            color: activeTab === "login" ? 'white' : '#666'
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("register");
                            setMessage("");
                        }}
                        style={{
                            flex: 1,
                            padding: '12px',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            background: activeTab === "register" ? '#2196F3' : 'transparent',
                            color: activeTab === "register" ? 'white' : '#666'
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form Fields */}
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        disabled={isLoading}
                    />
                </div>

                {activeTab === "register" && (
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            color: '#333'
                        }}>
                            Username (optional):
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '2px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            disabled={isLoading}
                        />
                    </div>
                )}
                
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                        color: '#333'
                    }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password (min 6 chars)"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '2px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        disabled={isLoading}
                    />
                </div>
                
                {/* Message Display */}
                {message && (
                    <div style={{
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        background: messageType === 'error' ? '#ffebee' : 
                                   messageType === 'success' ? '#e8f5e8' : '#e3f2fd',
                        color: messageType === 'error' ? '#c62828' : 
                               messageType === 'success' ? '#2e7d32' : '#1565c0',
                        border: `1px solid ${messageType === 'error' ? '#ffcdd2' : 
                                             messageType === 'success' ? '#c8e6c9' : '#bbdefb'}`
                    }}>
                        {message}
                    </div>
                )}
                
                {/* Action Button */}
                <button
                    onClick={activeTab === "register" ? handleSignUp : handleSignIn}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '15px',
                        background: activeTab === "register" ? '#2196F3' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.3s',
                        marginBottom: '15px'
                    }}
                >
                    {isLoading 
                        ? "⏳ Please wait..." 
                        : activeTab === "register" 
                            ? "🚀 Create Account" 
                            : "🔐 Login"
                    }
                </button>

                {/* Demo Button */}
                <button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: '#ff9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        marginBottom: '20px'
                    }}
                >
                    🧪 Load Demo Credentials
                </button>
                
                {/* Info Box */}
                <div style={{
                    background: '#f0f8ff',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #cce7ff',
                    fontSize: '12px',
                    color: '#0066cc'
                }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>
                        🔒 Powered by Supabase Authentication
                    </p>
                    <p style={{ margin: 0 }}>
                        Secure, reliable, and production-ready user management
                    </p>
                </div>
                
                <p style={{
                    marginTop: '20px',
                    fontSize: '12px',
                    color: '#999'
                }}>
                    © 2024 PreetEnglish. Mrs. Premlata Jain Initiative.
                </p>
            </div>
        </div>
    );
}