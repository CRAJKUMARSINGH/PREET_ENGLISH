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
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";
export default function AuthPageSimple() {
    var _this = this;
    var _a, _b;
    var _c = useAuth(), user = _c.user, loginMutation = _c.loginMutation, registerMutation = _c.registerMutation;
    var _d = useLocation(), setLocation = _d[1];
    var _e = useState("register"), activeTab = _e[0], setActiveTab = _e[1];
    var _f = useState(""), username = _f[0], setUsername = _f[1];
    var _g = useState(""), password = _g[0], setPassword = _g[1];
    var _h = useState(false), isSubmitting = _h[0], setIsSubmitting = _h[1];
    useEffect(function () {
        if (user) {
            console.log('✅ User authenticated, redirecting to dashboard:', user);
            setLocation("/dashboard");
        }
    }, [user, setLocation]);
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var mutation, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    console.log('🚀 FORM SUBMIT:', activeTab, { username: username, password: password });
                    if (!username || username.length < 2) {
                        alert('Username must be at least 2 characters');
                        return [2 /*return*/];
                    }
                    if (!password || password.length < 6) {
                        alert('Password must be at least 6 characters');
                        return [2 /*return*/];
                    }
                    if (isSubmitting) {
                        console.log('⚠️ Already submitting');
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    mutation = activeTab === "login" ? loginMutation : registerMutation;
                    console.log('📝 Calling mutation for:', activeTab);
                    return [4 /*yield*/, mutation.mutateAsync({ username: username, password: password })];
                case 2:
                    _a.sent();
                    console.log('✅ Success!');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('❌ Error:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen grid lg:grid-cols-2">
            {/* Hero Section */}
            <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-90"/>
                
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
                        <button onClick={function () { return setActiveTab("login"); }} className={"flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ".concat(activeTab === "login"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900")}>
                            Login
                        </button>
                        <button onClick={function () { return setActiveTab("register"); }} className={"flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ".concat(activeTab === "register"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-600 hover:text-gray-900")}>
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
            : "Start your free learning journey today"}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>
                                <input type="text" value={username} onChange={function (e) { return setUsername(e.target.value); }} placeholder="student123" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required minLength={2}/>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <input type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }} placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" required minLength={6}/>
                            </div>
                            
                            {(loginMutation.error || registerMutation.error) && (<div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                                    {((_a = loginMutation.error) === null || _a === void 0 ? void 0 : _a.message) || ((_b = registerMutation.error) === null || _b === void 0 ? void 0 : _b.message)}
                                </div>)}
                            
                            <Button type="submit" className="w-full font-bold bg-emerald-600 hover:bg-emerald-700 text-white py-3" disabled={isSubmitting || loginMutation.isPending || registerMutation.isPending}>
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
        </div>);
}
