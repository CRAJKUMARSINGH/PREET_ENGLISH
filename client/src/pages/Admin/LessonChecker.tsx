import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Checker() {
    const [jsonInput, setJsonInput] = useState('');
    const [validationResult, setValidationResult] = useState<{ status: 'success' | 'error' | null, message: string }>({ status: null, message: '' });

    const validateJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            // Basic schema check
            if (!parsed.title || !parsed.content) {
                throw new Error("Missing required fields: title, content");
            }
            setValidationResult({ status: 'success', message: 'JSON is valid and follows the PreetEnglish lesson schema!' });
        } catch (e: any) {
            setValidationResult({ status: 'error', message: `Invalid JSON: ${e.message}` });
        }
    };

    return (
        <Layout>
            <main className="container mx-auto px-4 py-12 flex-grow">

                <h1 className="text-3xl font-bold mb-6">Lesson Content Validator</h1>
                <p className="text-muted-foreground mb-8">Paste your lesson JSON below to validate it against the PreetEnglish schema.</p>

                <div className="grid gap-6">
                    <Textarea
                        placeholder='{ "title": "New Lesson", "content": "..." }'
                        className="min-h-[300px] font-mono"
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                    <Button onClick={validateJson} className="w-fit">Validate JSON</Button>

                    {validationResult.status === 'success' && (
                        <Alert className="bg-green-50 border-green-200">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Validation Passed</AlertTitle>
                            <AlertDescription className="text-green-700">{validationResult.message}</AlertDescription>
                        </Alert>
                    )}

                    {validationResult.status === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Validation Failed</AlertTitle>
                            <AlertDescription>{validationResult.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </main>
        </Layout>
    );
}

