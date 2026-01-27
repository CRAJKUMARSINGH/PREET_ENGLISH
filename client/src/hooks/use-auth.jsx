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
import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
export var AuthContext = createContext(null);
export function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var toast = useToast().toast;
    var queryClient = useQueryClient();
    var _b = useQuery({
        queryKey: ["/api/user"],
        queryFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var storedUser, res, userData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        storedUser = localStorage.getItem('preet-english-user');
                        if (storedUser) {
                            console.log('👤 Found stored user:', JSON.parse(storedUser));
                            return [2 /*return*/, JSON.parse(storedUser)];
                        }
                        return [4 /*yield*/, fetch("/api/user", {
                                credentials: 'include',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })];
                    case 1:
                        res = _a.sent();
                        if (res.status === 401)
                            return [2 /*return*/, undefined];
                        if (!res.ok) {
                            console.warn("API user fetch failed: ".concat(res.status, " ").concat(res.statusText));
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        userData = _a.sent();
                        return [2 /*return*/, userData];
                    case 3:
                        error_1 = _a.sent();
                        // Don't throw error, just return undefined for unauthenticated state
                        console.log('ℹ️ No user session found or network error:', error_1);
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    }), user = _b.data, error = _b.error, isLoading = _b.isLoading;
    var loginMutation = useMutation({
        mutationFn: function (credentials) { return __awaiter(_this, void 0, void 0, function () {
            var response, errorText, userData, error_2, mockUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('🔐 Login attempt:', credentials.username);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 9]);
                        return [4 /*yield*/, fetch('/api/login', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify(credentials),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        errorText = _a.sent();
                        throw new Error(errorText || "Login failed: ".concat(response.status));
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        userData = _a.sent();
                        console.log('✅ Login successful:', userData);
                        return [2 /*return*/, userData];
                    case 6:
                        error_2 = _a.sent();
                        console.error('❌ Login API failed:', error_2);
                        if (!(error_2 instanceof TypeError && error_2.message.includes('fetch'))) return [3 /*break*/, 8];
                        console.log('🌐 Network error, using mock authentication');
                        toast({
                            title: "Demo Mode",
                            description: "Using demo authentication (API unavailable)",
                            variant: "default",
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 7:
                        _a.sent();
                        mockUser = {
                            id: Date.now(),
                            username: credentials.username,
                            isAdmin: credentials.username === 'admin'
                        };
                        return [2 /*return*/, mockUser];
                    case 8: throw error_2;
                    case 9: return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function (user) {
            console.log('🎉 Login successful!', user);
            queryClient.setQueryData(["/api/user"], user);
            // Store user in localStorage for persistence
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            toast({
                title: "Welcome back! 🎉",
                description: "Successfully signed in as ".concat(user.username, "!"),
                variant: "default",
            });
            // Force redirect after a short delay
            setTimeout(function () {
                console.log('🔄 Forcing redirect to dashboard...');
                window.location.href = '/dashboard';
            }, 1000);
        },
        onError: function (error) {
            console.error('❌ Login error:', error);
            toast({
                title: "Login failed",
                description: error.message || "Please check your credentials and try again.",
                variant: "destructive",
            });
        },
    });
    var registerMutation = useMutation({
        mutationFn: function (credentials) { return __awaiter(_this, void 0, void 0, function () {
            var response, errorText, userData, error_3, mockUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('📝 Registration attempt:', credentials.username);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 9]);
                        return [4 /*yield*/, fetch('/api/register', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include',
                                body: JSON.stringify(credentials),
                            })];
                    case 2:
                        response = _a.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.text()];
                    case 3:
                        errorText = _a.sent();
                        throw new Error(errorText || "Registration failed: ".concat(response.status));
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        userData = _a.sent();
                        console.log('✅ Registration successful:', userData);
                        return [2 /*return*/, userData];
                    case 6:
                        error_3 = _a.sent();
                        console.error('❌ Registration API failed:', error_3);
                        if (!(error_3 instanceof TypeError && error_3.message.includes('fetch'))) return [3 /*break*/, 8];
                        console.log('🌐 Network error, using mock registration');
                        toast({
                            title: "Demo Mode",
                            description: "Using demo registration (API unavailable)",
                            variant: "default",
                        });
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                    case 7:
                        _a.sent();
                        mockUser = {
                            id: Date.now(),
                            username: credentials.username,
                            isAdmin: false
                        };
                        return [2 /*return*/, mockUser];
                    case 8: throw error_3;
                    case 9: return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function (user) {
            console.log('🎉 Registration successful!', user);
            queryClient.setQueryData(["/api/user"], user);
            // Store user in localStorage for persistence
            localStorage.setItem('preet-english-user', JSON.stringify(user));
            toast({
                title: "🎉 Welcome to PreetEnglish!",
                description: "Account created successfully! Welcome, ".concat(user.username, "! Let's start learning English together."),
                variant: "default",
            });
            // Force redirect after a short delay
            setTimeout(function () {
                console.log('🔄 Forcing redirect to dashboard...');
                window.location.href = '/dashboard';
            }, 1000);
        },
        onError: function (error) {
            console.error('❌ Registration error:', error);
            toast({
                title: "Registration failed",
                description: error.message || "Please try again with different credentials.",
                variant: "destructive",
            });
        },
    });
    var logoutMutation = useMutation({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, apiRequest("POST", "/api/logout")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        // Don't throw error for logout - always clear local state
                        console.warn('Logout API failed, clearing local state anyway');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        onSuccess: function () {
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
        onError: function (error) {
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
    return (<AuthContext.Provider value={{
            user: user !== null && user !== void 0 ? user : null,
            isLoading: isLoading,
            error: error,
            loginMutation: loginMutation,
            logoutMutation: logoutMutation,
            registerMutation: registerMutation,
        }}>
            {children}
        </AuthContext.Provider>);
}
export function useAuth() {
    var context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
