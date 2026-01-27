import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SaraswatiLogo } from "@/components/SaraswatiMascot";
import { CheckCircle } from "lucide-react";
var formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function AuthPage() {
    var _a = useAuth(), user = _a.user, loginMutation = _a.loginMutation, registerMutation = _a.registerMutation;
    var _b = useLocation(), setLocation = _b[1];
    var _c = useState(false), registrationSuccess = _c[0], setRegistrationSuccess = _c[1];
    useEffect(function () {
        // Only redirect for login, not for registration
        // Registration will show success message and user can click to proceed
        if (user && !registrationSuccess) {
            setLocation("/vocabulary");
        }
    }, [user, setLocation, registrationSuccess]);
    return (<div className="min-h-screen grid lg:grid-cols-2">
            {/* Hero Section */}
            <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 opacity-90"/>
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20"/>

                <div className="relative z-10">
                    <SaraswatiLogo />
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-4xl font-bold mb-6 font-display">
                        Start Your English Journey Today
                    </h1>
                    <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                        Join thousands of Hindi speakers learning English with confidence.
                        Practice speaking, build vocabulary, and master conversation with AI support.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">1625+</h3>
                            <p className="text-sm text-purple-200">Free Lessons</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-1">Free</h3>
                            <p className="text-sm text-purple-200">AI Tutor Access</p>
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
                                    <AuthForm mode="login" mutation={loginMutation} setRegistrationSuccess={setRegistrationSuccess}/>
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
                                    {registrationSuccess ? (<div className="text-center py-8">
                                            <div className="flex justify-center mb-4">
                                                <CheckCircle className="h-12 w-12 text-green-500"/>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Created Successfully!</h3>
                                            <p className="text-gray-600 mb-6">
                                                Your account has been created successfully. You can now start learning English.
                                            </p>
                                            <Button onClick={function () { return setLocation("/vocabulary"); }} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                                                Start Learning
                                            </Button>
                                        </div>) : (<AuthForm mode="register" mutation={registerMutation} setRegistrationSuccess={setRegistrationSuccess}/>)}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>);
}
function AuthForm(_a) {
    var mode = _a.mode, mutation = _a.mutation, setRegistrationSuccess = _a.setRegistrationSuccess;
    var form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    function onSubmit(values) {
        console.log('Form submitted:', mode, values);
        mutation.mutate(values, {
            onSuccess: function () {
                if (mode === "register") {
                    setRegistrationSuccess(true);
                }
            }
        });
    }
    return (<Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="username" render={function (_a) {
            var field = _a.field;
            return (<FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="student123" {...field} autoComplete="username"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>);
        }}/>
                <FormField control={form.control} name="password" render={function (_a) {
            var field = _a.field;
            return (<FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} autoComplete={mode === "login" ? "current-password" : "new-password"}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>);
        }}/>
                {mutation.error && (<div className="text-sm text-red-600 bg-red-50 p-4 rounded-md">
                        {mutation.error.message}
                    </div>)}
                <Button type="submit" className="w-full font-bold" disabled={mutation.isPending}>
                    {mutation.isPending
            ? "Please wait..."
            : mode === "login"
                ? "Login"
                : "Create Account"}
                </Button>
            </form>
        </Form>);
}
