import React, { useState } from 'react';
import { BookOpen, Brain, Target, Users, Zap, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function LiteDashboard() {
    var _a = useState({
        lessons: 45,
        vocabulary: 320,
        scenarios: 12,
        users: 1250
    }), stats = _a[0], setStats = _a[1];
    return (<div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <div className="flex items-center space-x-2">
                    <Zap className="w-8 h-8 text-blue-600"/>
                    <h1 className="text-3xl font-bold text-gray-900">PreetEnglish Lite Mode</h1>
                </div>
                <p className="text-gray-600 mt-2">A minimalist, high-performance learning experience.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Lessons</CardTitle>
                        <BookOpen className="w-4 h-4 text-blue-200"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.lessons}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-green-100">Vocabulary</CardTitle>
                        <Brain className="w-4 h-4 text-green-200"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.vocabulary}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-purple-100">Scenarios</CardTitle>
                        <Target className="w-4 h-4 text-purple-200"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.scenarios}</div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-orange-100">Active Users</CardTitle>
                        <Users className="w-4 h-4 text-orange-200"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.users.toLocaleString()}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
            { icon: Zap, title: "Interactive Lessons", desc: "Engaging content with quizzes", color: "from-yellow-400 to-orange-500" },
            { icon: Trophy, title: "Progress Tracking", desc: "Monitor your learning journey", color: "from-blue-400 to-indigo-500" },
            { icon: Brain, title: "AI-Powered", desc: "Smart learning recommendations", color: "from-purple-400 to-pink-500" },
            { icon: Users, title: "Community", desc: "Learn with others", color: "from-green-400 to-teal-500" },
            { icon: TrendingUp, title: "Analytics", desc: "Detailed progress insights", color: "from-red-400 to-pink-500" },
            { icon: BookOpen, title: "Rich Content", desc: "Comprehensive learning materials", color: "from-indigo-400 to-purple-500" }
        ].map(function (feature, index) { return (<Card key={index} className={"bg-gradient-to-r ".concat(feature.color, " text-white border-none transform transition hover:scale-105 cursor-pointer")}>
                        <CardContent className="pt-6">
                            <feature.icon className="w-12 h-12 mb-4"/>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-white/80">{feature.desc}</p>
                        </CardContent>
                    </Card>); })}
            </div>
        </div>);
}
