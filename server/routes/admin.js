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
import { requireAdmin } from '../middleware/sessionSecurity';
import { getAllAIUsage } from '../services/openai';
export function registerAdminRoutes(app) {
    var _this = this;
    // Admin-only endpoint to monitor AI costs and usage
    app.get('/api/admin/ai-usage', requireAdmin, function (req, res) {
        try {
            var allStats = getAllAIUsage();
            var totalCost = allStats.reduce(function (sum, s) { return sum + s.estimatedCost; }, 0);
            var totalTokens = allStats.reduce(function (sum, s) { return sum + s.totalTokens; }, 0);
            var totalRequests = allStats.reduce(function (sum, s) { return sum + s.requestCount; }, 0);
            res.json({
                summary: {
                    totalCost: "$".concat(totalCost.toFixed(2)),
                    totalTokens: totalTokens,
                    totalRequests: totalRequests,
                    activeUsers: allStats.length,
                },
                users: allStats,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Error fetching AI usage stats:', error);
            res.status(500).json({ message: 'Failed to fetch AI usage statistics' });
        }
    });
    // Admin endpoint to get system health
    app.get('/api/admin/system-health', requireAdmin, function (req, res) {
        try {
            var memoryUsage = process.memoryUsage();
            var uptime = process.uptime();
            res.json({
                status: 'healthy',
                uptime: "".concat(Math.floor(uptime / 3600), "h ").concat(Math.floor((uptime % 3600) / 60), "m"),
                memory: {
                    used: "".concat(Math.round(memoryUsage.heapUsed / 1024 / 1024), "MB"),
                    total: "".concat(Math.round(memoryUsage.heapTotal / 1024 / 1024), "MB"),
                },
                environment: process.env.NODE_ENV || 'development',
                nodeVersion: process.version,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Error fetching system health:', error);
            res.status(500).json({ message: 'Failed to fetch system health' });
        }
    });
    // Admin endpoint to get user statistics
    app.get('/api/admin/user-stats', requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // This would integrate with your existing storage system
                // For now, return placeholder data
                res.json({
                    totalUsers: 0,
                    activeUsers: 0,
                    newUsersToday: 0,
                    lessonsCompleted: 0,
                    averageSessionTime: '0 minutes',
                    timestamp: new Date().toISOString(),
                });
            }
            catch (error) {
                console.error('Error fetching user stats:', error);
                res.status(500).json({ message: 'Failed to fetch user statistics' });
            }
            return [2 /*return*/];
        });
    }); });
    // Admin endpoint to manage feature flags
    app.get('/api/admin/feature-flags', requireAdmin, function (req, res) {
        try {
            var featureFlags = {
                aiVideoCall: true,
                pronunciationFeedback: true,
                storyGenerator: true,
                gamification: true,
                hindiTranslations: true,
                voicerooms: false, // Experimental
                bilingualReader: true,
            };
            res.json({
                flags: featureFlags,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Error fetching feature flags:', error);
            res.status(500).json({ message: 'Failed to fetch feature flags' });
        }
    });
    // Admin endpoint to update feature flags
    app.post('/api/admin/feature-flags', requireAdmin, function (req, res) {
        try {
            var _a = req.body, flagName = _a.flagName, enabled = _a.enabled;
            if (!flagName || typeof enabled !== 'boolean') {
                return res.status(400).json({ message: 'Invalid flag name or enabled value' });
            }
            // This would update feature flags in your database/config
            // For now, return success response
            res.json({
                message: "Feature flag '".concat(flagName, "' ").concat(enabled ? 'enabled' : 'disabled'),
                flagName: flagName,
                enabled: enabled,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error('Error updating feature flag:', error);
            res.status(500).json({ message: 'Failed to update feature flag' });
        }
    });
}
