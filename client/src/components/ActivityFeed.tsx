import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, BookOpen, Star, Flame, MessageCircle, Heart, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface ActivityItem {
    id: number;
    userId: number;
    type: string;
    referenceId?: number;
    content: string;
    createdAt: string;
    user: {
        username: string;
        avatar?: string;
    };
}

interface ActivityFeedProps {
    activities: ActivityItem[];
}

export function ActivityFeedComponent({ activities }: ActivityFeedProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'ACHIEVEMENT': return <Trophy className="h-4 w-4 text-yellow-500" />;
            case 'LESSON_COMPLETE': return <BookOpen className="h-4 w-4 text-blue-500" />;
            case 'STORY_COMPLETE': return <Star className="h-4 w-4 text-purple-500" />;
            case 'GOAL_MET': return <Flame className="h-4 w-4 text-orange-500" />;
            case 'RATING': return <StarHalf className="h-4 w-4 text-pink-500" />;
            default: return <Star className="h-4 w-4 text-slate-500" />;
        }
    };

    return (
        <div className="space-y-4">
            {activities.length === 0 && (
                <div className="text-center py-12 bg-white/30 dark:bg-slate-900/30 rounded-3xl border border-dashed">
                    <p className="text-muted-foreground">No recent activity. Be the first to share!</p>
                </div>
            )}
            {[...activities].reverse().map((item) => (
                <Card key={item.id} className="p-4 border-none shadow-sm bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 transition-colors">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={item.user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold">
                                {item.user.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.user.username}</span>
                                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-primary/20 text-primary bg-primary/5">
                                        Learner
                                    </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                                    {getIcon(item.type)}
                                </div>
                                <p className="leading-relaxed">
                                    {item.content}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors group">
                                    <Heart className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                                    Like
                                </button>
                                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-500 transition-colors">
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
