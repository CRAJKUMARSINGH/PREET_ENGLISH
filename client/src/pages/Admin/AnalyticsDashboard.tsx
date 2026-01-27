
import { useState, useEffect } from "react";
import { analytics } from "@/lib/analytics";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Users,
    BookOpen,
    Zap,
    MessageSquare,
    Video,
    TrendingUp,
    Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState(analytics.getLiveStats());

    // Auto-refresh stats to simulate "Live" dashboard
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(analytics.getLiveStats());
        }, 2000); // 2 seconds refresh

        return () => clearInterval(interval);
    }, []);

    const cards = [
        {
            title: "Active Users",
            value: stats.activeUsers.toLocaleString(),
            change: "+12.5% (Last 1h)",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Lessons Completed",
            value: stats.lessonsCompleted.toLocaleString(),
            change: "+85 today",
            icon: BookOpen,
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Total XP Earned",
            value: stats.totalXPEarned.toLocaleString(),
            change: "Level Up!",
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            title: "AI Chat Msg",
            value: stats.aiChatMessages.toLocaleString(),
            change: "+24% vs yesterday",
            icon: MessageSquare,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Activity className="h-8 w-8 text-primary" />
                            Launch Control Center
                        </h1>
                        <p className="text-muted-foreground">Real-time performance metrics for Celebrity Launch</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-green-500/50 text-green-500 animate-pulse bg-green-500/10">
                            ● System Healthy
                        </Badge>
                        <Badge variant="secondary">
                            v2.6.0-release
                        </Badge>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, i) => (
                        <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {card.title}
                                </CardTitle>
                                <div className={`p-2 rounded-full ${card.bg}`}>
                                    <card.icon className={`h-4 w-4 ${card.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                    {card.change}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Big Chart Area Placeholder */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>User Growth (Last 24h)</CardTitle>
                            <CardDescription>Real-time organic traffic from launch campaign</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-border m-4">
                            <div className="text-center text-muted-foreground">
                                <Activity className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Chart Visualization Loading...</p>
                                <p className="text-xs opacity-70">Using simulated socket data stream</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Feature Usage</CardTitle>
                            <CardDescription>Top engaged modules</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span>Native Videos</span>
                                    </div>
                                    <span className="font-bold">42%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[42%]" />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                        <span>AI Chat</span>
                                    </div>
                                    <span className="font-bold">35%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[35%]" />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span>Speaking Practice</span>
                                    </div>
                                    <span className="font-bold">23%</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[23%]" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
