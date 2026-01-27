var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { auth } from "@/lib/supabase";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";
export default function AuthPageSupabase() {
    var _this = this;
    var _a = useLocation(), setLocation = _a[1];
    var _b = useState("register"), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState(""), email = _c[0], setEmail = _c[1];
    var _d = useState(""), password = _d[0], setPassword = _d[1];
    var _e = useState(""), username = _e[0], setUsername = _e[1];
    var _f = useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = useState(""), message = _g[0], setMessage = _g[1];
    var _h = useState("info"), messageType = _h[0], setMessageType = _h[1];
    // Check if user is already authenticated
    useEffect(function () {
        var checkUser = function () { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth.getCurrentUser()];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            console.log('✅ User already authenticated:', user);
                            setLocation("/dashboard");
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        checkUser();
    }, [setLocation]);
    var showMessage = function (msg, type) {
        if (type === void 0) { type = "info"; }
        setMessage(msg);
        setMessageType(type);
        setTimeout(function () { return setMessage(""); }, 5000);
    };
    var handleSignUp = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 SUPABASE SIGNUP STARTED');
                    if (!email || !password) {
                        showMessage("Please enter both email and password", "error");
                        return [2 /*return*/];
                    }
                    if (password.length < 6) {
                        showMessage("Password must be at least 6 characters", "error");
                        return [2 /*return*/];
                    }
                    if (!email.includes('@')) {
                        showMessage("Please enter a valid email address", "error");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    showMessage("Creating your account...", "info");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.signUp(email, password, username || undefined)];
                case 2:
                    result = _a.sent();
                    if (result.user) {
                        console.log('✅ Signup successful:', result.user);
                        showMessage("🎉 Account created successfully! Please check your email to verify your account.", "success");
                        // If email confirmation is disabled, redirect immediately
                        if (result.session) {
                            setTimeout(function () {
                                setLocation("/dashboard");
                            }, 2000);
                        }
                        else {
                            showMessage("Please check your email and click the verification link to complete signup.", "info");
                        }
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('❌ Signup failed:', error_1);
                    showMessage(error_1.message || "Signup failed. Please try again.", "error");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSignIn = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🔐 SUPABASE SIGNIN STARTED');
                    if (!email || !password) {
                        showMessage("Please enter both email and password", "error");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    showMessage("Signing you in...", "info");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth.signIn(email, password)];
                case 2:
                    result = _a.sent();
                    if (result.user) {
                        console.log('✅ Signin successful:', result.user);
                        showMessage("Welcome back! Redirecting...", "success");
                        setTimeout(function () {
                            setLocation("/dashboard");
                        }, 1000);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('❌ Signin failed:', error_2);
                    showMessage(error_2.message || "Login failed. Please check your credentials.", "error");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDemoLogin = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // For demo purposes, create a test account
            setEmail("demo@preetenglish.com");
            setPassword("demo123456");
            setUsername("demo_user");
            showMessage("Demo credentials loaded. Click 'Create Account' or 'Login' to continue.", "info");
            return [2 /*return*/];
        });
    }); };
    return (<div style={{
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
                    <button onClick={function () {
            setActiveTab("login");
            setMessage("");
        }} style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: activeTab === "login" ? '#4CAF50' : 'transparent',
            color: activeTab === "login" ? 'white' : '#666'
        }}>
                        Login
                    </button>
                    <button onClick={function () {
            setActiveTab("register");
            setMessage("");
        }} style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s',
            background: activeTab === "register" ? '#2196F3' : 'transparent',
            color: activeTab === "register" ? 'white' : '#666'
        }}>
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
                    <input type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} placeholder="Enter your email" style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
        }} disabled={isLoading}/>
                </div>

                {activeTab === "register" && (<div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333'
            }}>
                            Username (optional):
                        </label>
                        <input type="text" value={username} onChange={function (e) { return setUsername(e.target.value); }} placeholder="Choose a username" style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
            }} disabled={isLoading}/>
                    </div>)}
                
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#333'
        }}>
                        Password:
                    </label>
                    <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} placeholder="Enter password (min 6 chars)" style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
        }} disabled={isLoading}/>
                </div>
                
                {/* Message Display */}
                {message && (<div style={{
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                background: messageType === 'error' ? '#ffebee' :
                    messageType === 'success' ? '#e8f5e8' : '#e3f2fd',
                color: messageType === 'error' ? '#c62828' :
                    messageType === 'success' ? '#2e7d32' : '#1565c0',
                border: "1px solid ".concat(messageType === 'error' ? '#ffcdd2' :
                    messageType === 'success' ? '#c8e6c9' : '#bbdefb')
            }}>
                        {message}
                    </div>)}
                
                {/* Action Button */}
                <button onClick={activeTab === "register" ? handleSignUp : handleSignIn} disabled={isLoading} style={{
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
        }}>
                    {isLoading
            ? "⏳ Please wait..."
            : activeTab === "register"
                ? "🚀 Create Account"
                : "🔐 Login"}
                </button>

                {/* Demo Button */}
                <button onClick={handleDemoLogin} disabled={isLoading} style={{
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
        }}>
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
        </div>);
}
