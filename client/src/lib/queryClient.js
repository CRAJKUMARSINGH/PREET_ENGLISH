var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { QueryClient } from "@tanstack/react-query";
// Note: Persistence packages will be installed separately
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// Tanner Linsley's TanStack Query Optimization with Persistence - PREET_ENGLISH App
export var queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes - longer for learning progress
            gcTime: 1000 * 60 * 30, // 30 minutes - keep lesson data longer
            retry: function (failureCount, error) {
                // Don't retry on 4xx errors (client errors)
                if ((error === null || error === void 0 ? void 0 : error.status) >= 400 && (error === null || error === void 0 ? void 0 : error.status) < 500) {
                    return false;
                }
                return failureCount < 1; // Reduce retries to improve perceived performance
            },
            refetchOnWindowFocus: false, // Disable to prevent jank during lessons
            refetchOnReconnect: true,
            refetchOnMount: false, // Prevent unnecessary refetches
            structuralSharing: true, // Enable structural sharing for better performance
            _defaulted: true,
        },
        mutations: {
            retry: 0, // Mutations shouldn't auto-retry in most cases
            gcTime: 1000 * 60 * 5, // Clean up mutation cache after 5 minutes
        },
    },
});
// Create a client-side persister
var localStoragePersister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    key: "PREET_ENGLISH_CACHE",
    serialize: JSON.stringify,
    deserialize: JSON.parse,
});
// Enable persistence only in the browser
if (typeof window !== 'undefined') {
    persistQueryClient({
        queryClient: queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        buster: "v2.1.0", // Update when breaking changes occur
    });
}
// API request helper with better error handling and caching
export function apiRequest(method_1, endpoint_1, body_1) {
    return __awaiter(this, arguments, void 0, function (method, endpoint, body, options) {
        var url, config, response, errorText, error_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = endpoint.startsWith('http') ? endpoint : "".concat(window.location.origin).concat(endpoint);
                    config = __assign({ method: method, headers: __assign({ 'Content-Type': 'application/json' }, options.headers) }, options);
                    if (body && method !== 'GET') {
                        config.body = JSON.stringify(body);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, fetch(url, config)];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorText = _a.sent();
                    throw new Error("HTTP ".concat(response.status, ": ").concat(errorText || response.statusText));
                case 4: return [2 /*return*/, response];
                case 5:
                    error_1 = _a.sent();
                    console.error("API request failed: ".concat(method, " ").concat(endpoint), error_1);
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Prefetch helper for better performance
export function prefetchQuery(queryKey, queryFn) {
    queryClient.prefetchQuery({
        queryKey: queryKey,
        queryFn: queryFn,
        staleTime: 5 * 60 * 1000,
    });
}
export default queryClient;
