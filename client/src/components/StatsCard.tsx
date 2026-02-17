import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: string;
        isUp: boolean;
    };
    color?: string;
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    color = "text-primary",
    className
}: StatsCardProps) {
    return (
        <Card className={cn("overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 group bg-card/50 backdrop-blur-sm", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                        <h3 className="text-3xl font-black mt-2 tracking-tight">{value}</h3>
                    </div>
                    <div className={cn("p-4 rounded-2xl bg-muted/50 group-hover:bg-primary/10 transition-colors shadow-inner", color)}>
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
                {(description || trend) && (
                    <div className="mt-4 flex items-center text-xs font-semibold">
                        {trend && (
                            <span className={cn("mr-2 px-2 py-0.5 rounded-full", trend.isUp ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10")}>
                                {trend.value}
                            </span>
                        )}
                        <span className="text-muted-foreground/80">{description}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
