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
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, sendMessage, isLoading } = useChatStream();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ErrorBoundary>
            <Layout>
                {/* Hindi Support */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Saraswati AI Tutor
                    </h2>
                    <p className="text-sm text-muted-foreground">Practice English with a friendly guide. / एक दोस्त के साथ अंग्रेजी का अभ्यास करें।</p>
                </div>

                <div className="flex h-[calc(100vh-12rem)] max-h-[700px] bg-white dark:bg-black/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 overflow-hidden shadow-2xl relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

                    <div className="flex-1 flex flex-col relative z-10">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-fade-in-up">
                                    <div className="mb-6 relative">
                                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                        <img src="/saraswati.jpg" alt="Saraswati" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl relative z-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Namaste! How can I help?</h3>
                                    <p className="text-muted-foreground max-w-sm mb-8">
                                        I can explain grammar, translate words, or just chat with you in Hinglish.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                                        <button onClick={() => sendMessage("Translate 'Success' to Hindi")} className="p-3 bg-secondary/50 hover:bg-secondary rounded-xl text-sm font-medium transition-colors text-left">
                                            🤔 Translate "Success"
                                        </button>
                                        <button onClick={() => sendMessage("How to introduce myself?")} className="p-3 bg-secondary/50 hover:bg-secondary rounded-xl text-sm font-medium transition-colors text-left">
                                            👋 How to introduce myself?
                                        </button>
                                        <button onClick={() => sendMessage("Correct this: I goes to market")} className="p-3 bg-secondary/50 hover:bg-secondary rounded-xl text-sm font-medium transition-colors text-left">
                                            📝 Correct: "I goes to market"
                                        </button>
                                        <button onClick={() => sendMessage("Tell me a story in English")} className="p-3 bg-secondary/50 hover:bg-secondary rounded-xl text-sm font-medium transition-colors text-left">
                                            📖 Tell me a story
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={cn("flex gap-4 animate-in fade-in slide-in-from-bottom-2", msg.sender === 'user' ? "flex-row-reverse" : "flex-row")}>
                                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2", msg.sender === 'user' ? "bg-indigo-100 border-indigo-200" : "bg-orange-100 border-orange-200")}>
                                                {msg.sender === 'user' ? <User className="w-6 h-6 text-indigo-600" /> : <img src="/saraswati.jpg" className="w-full h-full rounded-full object-cover" />}
                                            </div>
                                            <div className={cn("max-w-[80%] p-4 rounded-2xl shadow-sm",
                                                msg.sender === 'user'
                                                    ? "bg-indigo-600 text-white rounded-tr-sm"
                                                    : "bg-white dark:bg-slate-800 border border-border rounded-tl-sm"
                                            )}>
                                                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                                <span className="text-[10px] opacity-70 mt-2 block">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-orange-100 border-orange-200 border-2 flex items-center justify-center shrink-0 p-0.5">
                                                <img src="/saraswati.jpg" className="w-full h-full rounded-full object-cover" />
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 border border-border p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></span>
                                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (input.trim()) {
                                        sendMessage(input);
                                        setInput("");
                                    }
                                }}
                                className="flex gap-2 relative"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message... / अपना संदेश टाइप करें..."
                                    className="flex-1 h-12 rounded-xl pl-4 pr-12 bg-white/80 dark:bg-slate-900/80 border-0 shadow-inner focus-visible:ring-1 focus-visible:ring-primary"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                    <Send className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </ErrorBoundary>
    );
}