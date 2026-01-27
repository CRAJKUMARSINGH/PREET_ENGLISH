import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BookOpen, 
  Users, 
  Brain, 
  FileText, 
  MessageSquare, 
  TrendingUp,
  RefreshCw,
  Database,
  Zap,
  Activity
} from 'lucide-react';

interface DashboardStats {
  totalLessons: number;
  totalUsers: number;
  totalQuizzes: number;
  totalStories: number;
  totalScenarios: number;
  recentActivity: any[];
}

interface SystemStats {
  cache: {
    lessons: { size: number; hits: number; misses: number };
    userStats: { size: number; hits: number; misses: number };
    vocabulary: { size: number; hits: number; misses: number };
    leaderboard: { size: number; hits: number; misses: number };
  };
  concurrency: {
    database: { activeCount: number; pendingCount: number };
    api: { activeCount: number; pendingCount: number };
    general: { activeCount: number; pendingCount: number };
  };
  memory: {
    rss: number;
    heapUsed: number;
    heapTotal: number;
    external: number;
  };
  uptime: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const [dashboardRes, systemRes] = await Promise.all([
        fetch('/api/admin/dashboard'),
        fetch('/api/admin/system/stats')
      ]);

      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        setStats(dashboardData);
      }

      if (systemRes.ok) {
        const systemData = await systemRes.json();
        setSystemStats(systemData);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();
  };

  const clearCache = async (type: string) => {
    try {
      const response = await fetch('/api/admin/cache/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        await fetchStats(); // Refresh stats after clearing cache
      }
    } catch (err) {
      console.error('Error clearing cache:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getCacheHitRate = (cache: { hits: number; misses: number }) => {
    const total = cache.hits + cache.misses;
    return total > 0 ? Math.round((cache.hits / total) * 100) : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Content Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLessons}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stories</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStories}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scenarios</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalScenarios}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* System Performance */}
      {systemStats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cache Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
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
                <Button size="sm" variant="outline" onClick={() => clearCache('lessons')}>
                  Clear Lessons
                </Button>
                <Button size="sm" variant="outline" onClick={() => clearCache('all')}>
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
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
        </div>
      )}

      {/* Recent Activity */}
      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">{activity.content}</span>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Integration Status */}
      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Features Active:</strong> OpenAI integration is enabled for conversation evaluation, 
          lesson generation, and pronunciation feedback. Rate limiting is active to prevent abuse.
        </AlertDescription>
      </Alert>
    </div>
  );
}