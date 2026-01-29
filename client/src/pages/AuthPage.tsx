import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";
import { CheckCircle, Sparkles, Users, Trophy, BookOpen, Mic, Globe } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AuthPage() {
    const { user, loginMutation, registerMutation } = useAuth();
    const [, setLocation] = useLocation();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);
    
    const features = [
        { icon: BookOpen, title: "1625+ Interactive Lessons", desc: "Structured curriculum from beginner to advanced" },
        { icon: Mic, title: "AI Speaking Practice", desc: "Real-time pronunciation feedback with Saraswati AI" },
        { icon: Globe, title: "Cultural Context", desc: "Learn English with Indian cultural references" },
        { icon: Trophy, title: "Gamified Learning", desc: "Earn XP, maintain streaks, compete with friends" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        // Only redirect for login, not for registration
        // Registration will show success message and user can click to proceed
        if (user && !registrationSuccess) {
            setLocation("/dashboard");
        }
    }, [user, setLocation, registrationSuccess]);

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Enhanced Hero Section */}
            <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-purple-700/90 to-pink-600/90" />
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20" />
                
                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/20 rounded-full blur-lg animate-bounce" />

                <div className="relative z-10">
                    <SaraswatiLogo />
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest"
                    >
                        <Sparkles className="h-3 w-3" />
                        <span>AI-Powered Learning</span>
                    </motion.div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold mb-6 font-display leading-tight"
                    >
                        Transform Your English Journey Today
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg text-purple-100 mb-8 leading-relaxed"
                    >
                        Join thousands of Hindi speakers mastering English with confidence.
                        Practice speaking, build vocabulary, and master conversation with AI support.
                    </motion.p>

                    {/* Dynamic Feature Showcase */}
                    <motion.div 
                        key={currentFeature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                                <features[currentFeature].icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{features[currentFeature].title}</h3>
                                <p className="text-sm text-purple-200">{features[currentFeature].desc}</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">1625+</h3>
                            <p className="text-sm text-purple-200">Free Lessons</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">24/7</h3>
                            <p className="text-sm text-purple-200">AI Tutor Access</p>
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <img
                                    key={i}
                                    src={`https://i.pravatar.cc/40?img=${i + 20}`}
                                    alt="user"
                                    className="w-8 h-8 rounded-full border-2 border-white/30"
                                />
                            ))}
                        </div>
                        <div>
                            <div className="flex text-yellow-400 text-xs">
                                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                            </div>
                            <p className="text-xs text-purple-200">Trusted by 10,000+ learners</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-purple-200">
                    © 2024 PreetEnglish. Mrs. Premlata Jain Initiative.
                </div>
            </div>

            {/* Auth Form Section */}
            <div className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
                <div className="w-full max-w-md space-y-6">
                    <div className="lg:hidden flex justify-center mb-8">
                        <SaraswatiLogo />
                    </div>

                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Welcome Back</CardTitle>
                                    <CardDescription>
                                        Sign in to continue your learning progress
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <AuthForm
                                        mode="login"
                                        mutation={loginMutation}
                                        setRegistrationSuccess={setRegistrationSuccess}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create Account</CardTitle>
                                    <CardDescription>
                                        Start your free learning journey today
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {registrationSuccess ? (
                                        <div className="text-center py-8">
                                            <div className="flex justify-center mb-4">
                                                <CheckCircle className="h-12 w-12 text-green-500" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Created Successfully!</h3>
                                            <p className="text-gray-600 mb-6">
                                                Your account has been created successfully. You can now start learning English.
                                            </p>
                                            <Button 
                                                onClick={() => setLocation("/vocabulary")}
                                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                                            >
                                                Start Learning
                                            </Button>
                                        </div>
                                    ) : (
                                        <AuthForm
                                            mode="register"
                                            mutation={registerMutation}
                                            setRegistrationSuccess={setRegistrationSuccess}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

function AuthForm({
    mode,
    mutation,
    setRegistrationSuccess,
}: {
    mode: "login" | "register";
    mutation: any;
    setRegistrationSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('Form submitted:', mode, values);
        mutation.mutate(values, {
            onSuccess: () => {
                if (mode === "register") {
                    setRegistrationSuccess(true);
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="student123" 
                                    {...field}
                                    autoComplete="username"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    {...field}
                                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {mutation.error && (
                    <div className="text-sm text-red-600 bg-red-50 p-4 rounded-md">
                        {mutation.error.message}
                    </div>
                )}
                <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending
                        ? "Please wait..."
                        : mode === "login"
                            ? "Login"
                            : "Create Account"}
                </Button>
            </form>
        </Form>
    );
}
