import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ChartData {
    date: string;
    xp: number;
    lessons: number;
}

interface CategoryData {
    name: string;
    value: number;
    color: string;
}

interface ProgressChartsProps {
    activityData?: ChartData[];
    categoryData?: CategoryData[];
}

const COLORS = ['#8b5cf6', '#ea580c', '#10b981', '#3b82f6', '#f59e0b'];

// Default data for demo
const defaultActivityData: ChartData[] = [
    { date: 'Mon', xp: 120, lessons: 3 },
    { date: 'Tue', xp: 180, lessons: 4 },
    { date: 'Wed', xp: 90, lessons: 2 },
    { date: 'Thu', xp: 200, lessons: 5 },
    { date: 'Fri', xp: 150, lessons: 3 },
    { date: 'Sat', xp: 220, lessons: 6 },
    { date: 'Sun', xp: 100, lessons: 2 },
];

const defaultCategoryData: CategoryData[] = [
    { name: 'Grammar', value: 35, color: '#8b5cf6' },
    { name: 'Vocabulary', value: 25, color: '#ea580c' },
    { name: 'Speaking', value: 20, color: '#10b981' },
    { name: 'Listening', value: 15, color: '#3b82f6' },
    { name: 'Writing', value: 5, color: '#f59e0b' },
];

export function ProgressCharts({ activityData = defaultActivityData, categoryData = defaultCategoryData }: ProgressChartsProps) {
    return (
        <div className="grid md:grid-cols-2 gap-6 w-full">
            {/* Activity Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Card className="h-[400px] border-none shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-700 dark:text-slate-200">
                            📈 Activity History (XP)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="xp"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Mastery/Category Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="h-[400px] border-none shadow-lg bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-700 dark:text-slate-200">
                            🎯 Learning Focus
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
