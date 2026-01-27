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
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, Users, Brain, FileText, MessageSquare, TrendingUp, RefreshCw, Zap, Activity } from 'lucide-react';
export function AdminDashboard() {
    var _this = this;
    var _a = useState(null), stats = _a[0], setStats = _a[1];
    var _b = useState(null), systemStats = _b[0], setSystemStats = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), refreshing = _d[0], setRefreshing = _d[1];
    var fetchStats = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, dashboardRes, systemRes, dashboardData, systemData, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, 7, 8]);
                    return [4 /*yield*/, Promise.all([
                            fetch('/api/admin/dashboard'),
                            fetch('/api/admin/system/stats')
                        ])];
                case 1:
                    _a = _b.sent(), dashboardRes = _a[0], systemRes = _a[1];
                    if (!dashboardRes.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, dashboardRes.json()];
                case 2:
                    dashboardData = _b.sent();
                    setStats(dashboardData);
                    _b.label = 3;
                case 3:
                    if (!systemRes.ok) return [3 /*break*/, 5];
                    return [4 /*yield*/, systemRes.json()];
                case 4:
                    systemData = _b.sent();
                    setSystemStats(systemData);
                    _b.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _b.sent();
                    console.error('Error fetching dashboard stats:', err_1);
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    setRefreshing(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleRefresh = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRefreshing(true);
                    return [4 /*yield*/, fetchStats()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var clearCache = function (type) { return __awaiter(_this, void 0, void 0, function () {
        var response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/admin/cache/clear', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ type: type }),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, fetchStats()];
                case 2:
                    _a.sent(); // Refresh stats after clearing cache
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    console.error('Error clearing cache:', err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        fetchStats();
    }, []);
    var formatBytes = function (bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0)
            return '0 Bytes';
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };
    var formatUptime = function (seconds) {
        var days = Math.floor(seconds / 86400);
        var hours = Math.floor((seconds % 86400) / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        return "".concat(days, "d ").concat(hours, "h ").concat(minutes, "m");
    };
    var getCacheHitRate = function (cache) {
        var total = cache.hits + cache.misses;
        return total > 0 ? Math.round((cache.hits / total) * 100) : 0;
    };
    if (loading) {
        return (<div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={"w-4 h-4 mr-2 ".concat(refreshing ? 'animate-spin' : '')}/>
          Refresh
        </Button>
      </div>

      {/* Content Stats */}
      {stats && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLessons}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stories</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scenarios</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalScenarios}</div>
            </CardContent>
          </Card>
        </div>)}

      {/* System Performance */}
      {systemStats && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cache Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5"/>
                Cache Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Lessons Cache</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getCacheHitRate(systemStats.cache.lessons)}% hit rate</Badge>
                    <span className="text-sm">{systemStats.cache.lessons.size} items</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">User Stats Cache</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getCacheHitRate(systemStats.cache.userStats)}% hit rate</Badge>
                    <span className="text-sm">{systemStats.cache.userStats.size} items</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Vocabulary Cache</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getCacheHitRate(systemStats.cache.vocabulary)}% hit rate</Badge>
                    <span className="text-sm">{systemStats.cache.vocabulary.size} items</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Leaderboard Cache</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getCacheHitRate(systemStats.cache.leaderboard)}% hit rate</Badge>
                    <span className="text-sm">{systemStats.cache.leaderboard.size} items</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={function () { return clearCache('lessons'); }}>
                  Clear Lessons
                </Button>
                <Button size="sm" variant="outline" onClick={function () { return clearCache('all'); }}>
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5"/>
                System Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Memory Usage</div>
                  <div className="text-lg font-semibold">
                    {formatBytes(systemStats.memory.heapUsed)} / {formatBytes(systemStats.memory.heapTotal)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                  <div className="text-lg font-semibold">{formatUptime(systemStats.uptime)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">DB Connections</div>
                  <div className="text-lg font-semibold">
                    {systemStats.concurrency.database.activeCount} active, {systemStats.concurrency.database.pendingCount} pending
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">API Calls</div>
                  <div className="text-lg font-semibold">
                    {systemStats.concurrency.api.activeCount} active, {systemStats.concurrency.api.pendingCount} pending
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>)}

      {/* Recent Activity */}
      {(stats === null || stats === void 0 ? void 0 : stats.recentActivity) && stats.recentActivity.length > 0 && (<Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5"/>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentActivity.slice(0, 5).map(function (activity, index) { return (<div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{activity.content}</span>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>); })}
            </div>
          </CardContent>
        </Card>)}

      {/* AI Integration Status */}
      <Alert>
        <Zap className="h-4 w-4"/>
        <AlertDescription>
          <strong>AI Features Active:</strong> OpenAI integration is enabled for conversation evaluation, 
          lesson generation, and pronunciation feedback. Rate limiting is active to prevent abuse.
        </AlertDescription>
      </Alert>
    </div>);
}
