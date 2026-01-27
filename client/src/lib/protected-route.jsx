import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import React from "react";
export function ProtectedRoute(_a) {
    var path = _a.path, Component = _a.component;
    var _b = useAuth(), user = _b.user, isLoading = _b.isLoading;
    if (isLoading) {
        return (<Route path={path}>
                <div className="flex items-center justify-center min-h-screen bg-neutral-50">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
            </Route>);
    }
    if (!user) {
        return (<Route path={path}>
                <Redirect to="/auth"/>
            </Route>);
    }
    return <Route path={path} component={Component}/>;
}
