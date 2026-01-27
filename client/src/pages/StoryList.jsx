import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, ArrowRight, Star, Clock } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
export default function StoryList() {
    var _a = useQuery({
        queryKey: ["/api/stories"],
    }), stories = _a.data, isLoading = _a.isLoading;
    return (<Layout>
            <div className="space-y-8">
                <header>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <BookMarked className="h-6 w-6 text-primary"/>
                        </div>
                        <h1 className="text-3xl font-bold">Hindi Stories • हिंदी कहानियां</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Improve your reading skills with interactive parallel-text stories.
                    </p>
                </header>

                {isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(function (i) { return (<div key={i} className="h-64 rounded-3xl bg-slate-100 animate-pulse"/>); })}
                    </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stories === null || stories === void 0 ? void 0 : stories.map(function (story) { return (<Link key={story.id} href={"/story/".concat(story.id)}>
                                <Card className="group cursor-pointer overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img src={story.imageUrl || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"} alt={story.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white", story.difficulty === "Beginner" ? "bg-green-500" :
                    story.difficulty === "Intermediate" ? "bg-amber-500" : "bg-red-500")}>
                                                {story.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                            {story.title}
                                        </h3>
                                        <p className="text-sm font-hindi text-slate-500 mb-4 line-clamp-1">
                                            {story.titleHindi}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6">
                                            {story.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-amber-500"/> {story.category}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3"/> 5 min read
                                                </span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                                                Read <ArrowRight className="h-4 w-4 ml-1"/>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>); })}

                        {(!stories || stories.length === 0) && (<div className="col-span-full py-20 text-center space-y-4 bg-slate-50 rounded-3xl border-2 border-dashed">
                                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto shadow-sm flex items-center justify-center">
                                    <BookMarked className="h-8 w-8 text-slate-300"/>
                                </div>
                                <p className="text-slate-500 font-medium italic">New stories are arriving soon from the Himalayas! 🏔️</p>
                            </div>)}
                    </div>)}
            </div>
        </Layout>);
}
