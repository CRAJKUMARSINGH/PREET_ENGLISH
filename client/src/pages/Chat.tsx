import React from "react";
import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useChatStream, useConversations, useCreateConversation } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Chat() {
    const { data: conversations } = useConversations();
    const createConversation = useCreateConversation();
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (conversations && conversations.length > 0 && !activeId) {
            setActiveId(conversations[0].id);
        }
    }, [conversations, activeId]);

    const handleNewChat = () => {
        createConversation.mutate("New Chat", {
            onSuccess: (newConv) => setActiveId(newConv.id)
        });
    };

    return (
    <ErrorBoundary>
      <Layout>
      
              {/* Hindi Support */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold">प्रीत AI चैट / Preet AI Chat</h2>
                <p className="text-muted-foreground">हिंदी में सवाल पूछें / Ask questions in Hindi</p>
              </div>
            <div className="flex h-[calc(100vh-8rem)] bg-background/50 backdrop-blur-sm rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl mt-4">
                {activeId ? (
                    <ChatInterface conversationId={activeId} key={activeId} />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 animate-pulse shadow-inner">
                            <Bot className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Chat with Preet AI</h2>
                        <p className="text-muted-foreground mb-8 text-lg max-w-md">Your personal AI English tutor is ready to help you practice! Ask anything or just say hello.</p>
                        <Button onClick={handleNewChat} size="lg" className="rounded-2xl px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            Start Practicing Now
                        </Button>
                    </div>
                )}
            </div>
              </Layout>
    </ErrorBoundary>
  );
}

function ChatInterface({ conversationId }: { conversationId: string }) {
    const { messages, isStreaming, currentStream, sendMessage } = useChatStream(conversationId);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, currentStream]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-400 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
                        <Bot className="w-7 h-7" />
                    </div>
                    <div>
                        <h2 className="font-extrabold text-xl tracking-tight">Preet AI Tutor</h2>
                        <p className="text-xs text-primary font-bold flex items-center gap-1.5 uppercase tracking-widest">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(28,231,131,0.8)]" />
                            Online & Ready
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-xs font-bold text-primary">Advanced AI Active</span>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth no-scrollbar">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                        <Bot className="h-16 w-16 text-muted-foreground" />
                        <p className="text-lg font-medium">Say "Namaste" or "Hello" to start practicing your English!</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500",
                            msg.sender === "user" ? "flex-row-reverse" : ""
                        )}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md",
                            msg.sender === "user" ? "bg-white/10 text-primary border border-white/10" : "bg-primary text-white border border-primary/20 shadow-primary/20"
                        )}>
                            {msg.sender === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                        </div>

                        <div className={cn(
                            "p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm max-w-[80%]",
                            msg.sender === "user"
                                ? "bg-secondary/40 text-foreground rounded-tr-none border border-white/5"
                                : "bg-primary/10 text-foreground rounded-tl-none border border-primary/20"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isStreaming && (
                    <div className="flex gap-4 animate-in fade-in duration-300">
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 border border-primary/20 shadow-lg shadow-primary/20">
                            <Bot className="w-6 h-6" />
                        </div>
                        <div className="p-5 rounded-2xl rounded-tl-none bg-primary/10 text-foreground text-[15px] leading-relaxed shadow-sm border border-primary/20 max-w-[80%]">
                            {currentStream}
                            <span className="inline-block w-2 h-5 ml-1 align-middle bg-primary animate-pulse rounded-full" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10">
                <form onSubmit={handleSubmit} className="flex gap-3 relative max-w-4xl mx-auto">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Practice speaking with Preet AI..."
                        className="rounded-[1.5rem] pr-16 pl-8 py-7 border-2 border-white/10 bg-background/50 focus-visible:ring-primary/20 focus-visible:border-primary text-lg shadow-inner"
                        disabled={isStreaming}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isStreaming}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </form>
                <p className="text-[10px] text-center text-muted-foreground mt-4 font-bold uppercase tracking-widest opacity-50">
                    Powered by GPT-4o • Real-time Feedback Active
                </p>
            </div>
        </div>
    );
}
