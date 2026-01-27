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
import React, { useState } from "react";
import { useLocation } from "wouter";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";
export default function AuthPageDirect() {
    var _this = this;
    var _a = useLocation(), setLocation = _a[1];
    var _b = useState("register"), activeTab = _b[0], setActiveTab = _b[1];
    var _c = useState(""), username = _c[0], setUsername = _c[1];
    var _d = useState(""), password = _d[0], setPassword = _d[1];
    var _e = useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState(""), message = _f[0], setMessage = _f[1];
    var handleCreateAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var mockUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 CREATE ACCOUNT CLICKED!');
                    console.log('📝 Username:', username);
                    console.log('📝 Password:', password);
                    // Clear any previous messages
                    setMessage("");
                    // Basic validation
                    if (!username || username.length < 2) {
                        setMessage("❌ Username must be at least 2 characters");
                        return [2 /*return*/];
                    }
                    if (!password || password.length < 6) {
                        setMessage("❌ Password must be at least 6 characters");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    setMessage("⏳ Creating your account...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // Simulate account creation
                    console.log('✅ Simulating account creation...');
                    // Wait 2 seconds to simulate processing
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 2:
                    // Wait 2 seconds to simulate processing
                    _a.sent();
                    mockUser = {
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
                    setTimeout(function () {
                        console.log('🔄 Redirecting to dashboard...');
                        setLocation("/dashboard");
                    }, 1000);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('❌ Error:', error_1);
                    setMessage("❌ Something went wrong. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleLogin = function () { return __awaiter(_this, void 0, void 0, function () {
        var mockUser, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🔐 LOGIN CLICKED!');
                    setMessage("");
                    if (!username || !password) {
                        setMessage("❌ Please enter both username and password");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    setMessage("⏳ Signing you in...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 2:
                    _a.sent();
                    mockUser = {
                        id: Date.now(),
                        username: username,
                        isAdmin: false,
                        loginAt: new Date().toISOString()
                    };
                    localStorage.setItem('preet-english-user', JSON.stringify(mockUser));
                    localStorage.setItem('preet-english-auth', 'true');
                    setMessage("✅ Login successful! Redirecting...");
                    setTimeout(function () {
                        setLocation("/dashboard");
                    }, 1000);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    setMessage("❌ Login failed. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                            <button onClick={function () {
            setActiveTab("login");
            setMessage("");
        }} className={"flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ".concat(activeTab === "login"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
                                Login
                            </button>
                            <button onClick={function () {
            setActiveTab("register");
            setMessage("");
        }} className={"flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ".concat(activeTab === "register"
            ? "bg-green-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200")}>
                                Sign Up
                            </button>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input type="text" value={username} onChange={function (e) { return setUsername(e.target.value); }} placeholder="Enter your username" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" disabled={isLoading}/>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" disabled={isLoading}/>
                            </div>
                            
                            {/* Message Display */}
                            {message && (<div className={"p-3 rounded-lg text-sm ".concat(message.includes('❌')
                ? 'bg-red-100 text-red-700 border border-red-200'
                : message.includes('🎉') || message.includes('✅')
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-blue-100 text-blue-700 border border-blue-200')}>
                                    {message}
                                </div>)}
                            
                            {/* Action Button */}
                            <button onClick={activeTab === "register" ? handleCreateAccount : handleLogin} disabled={isLoading} className={"w-full py-4 px-6 rounded-lg font-bold text-white transition-all transform hover:scale-105 disabled:scale-100 disabled:opacity-70 ".concat(activeTab === "register"
            ? "bg-green-500 hover:bg-green-600 shadow-lg"
            : "bg-blue-500 hover:bg-blue-600 shadow-lg")}>
                                {isLoading
            ? "⏳ Please wait..."
            : activeTab === "register"
                ? "🚀 Create Account"
                : "🔐 Login"}
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
        </div>);
}
