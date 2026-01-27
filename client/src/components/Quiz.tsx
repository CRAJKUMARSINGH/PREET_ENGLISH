import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { QuizQuestion, QuizAttempt } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSpeech } from "@/hooks/use-speech";
import { FillBlank } from "./quiz-types/FillBlank";
import { Rearrange } from "./quiz-types/Rearrange";
import { Match } from "./quiz-types/Match";


interface QuizProps {
    quizId: number;
    onComplete?: (score: number, passed: boolean) => void;
}

export function Quiz({ quizId, onComplete }: QuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [answers, setAnswers] = useState<{ questionId: number, answerIndex: number, correct: boolean }[]>([]);

    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { speak } = useSpeech();

    // Fetch Questions
    const { data: questions, isLoading, error } = useQuery<QuizQuestion[], Error>({
        queryKey: ['quiz', quizId, 'questions'],
        queryFn: async () => {
            // Direct fetch using expanded path
            const res = await fetch(`/api/quizzes/${quizId}/questions`);
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to load quiz");
            }
            return res.json();
        },
    });

    // Submit Attempt Mutation
    const submitAttemptMutation = useMutation({
        mutationFn: async (data: { score: number, passed: boolean, answers: any[] }) => {
            const res = await fetch(`/api/quizzes/${quizId}/attempts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to submit quiz");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId, 'attempts'] });
            queryClient.invalidateQueries({ queryKey: ['user', 'stats'] }); // Update XP
        },
    });

    if (isLoading) {
        return <div className="p-8 text-center">Loading quiz...</div>;
    }

    if (error) {
        return (
            <Card className="text-center p-6 bg-white dark:bg-slate-900 shadow-md">
                <CardHeader>
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Error Loading Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">{error.message}</p>
                    <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['quiz', quizId, 'questions'] })}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                    No questions available for this quiz.
                </CardContent>
            </Card>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    // Parse options
    const options: string[] = typeof currentQuestion.options === 'string'
        ? JSON.parse(currentQuestion.options)
        : (currentQuestion.options || []);

    // Find correct index
    const correctOptionIndex = options.findIndex(opt => opt === currentQuestion.correctAnswer.toString());

    const handleCreateAttempt = (finalScore: number, passed: boolean) => {
        submitAttemptMutation.mutate({
            score: finalScore,
            passed,
            answers
        });
        if (onComplete) {
            onComplete(finalScore, passed);
        }
    };

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;

        // Use derived correctOptionIndex
        const correct = selectedOption === correctOptionIndex;
        if (correct) {
            setScore(score + 1);
            speak({ text: "Correct!", lang: "en-US" });
        } else {
            speak({ text: "Incorrect", lang: "en-US" });
        }

        setAnswers([...answers, {
            questionId: currentQuestion.id,
            answerIndex: selectedOption,
            correct
        }]);

        setShowExplanation(true);
    };

    const handleNext = () => {
        setSelectedOption(null);
        setShowExplanation(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsCompleted(true);
            const passed = (score / questions.length) >= 0.7; // 70% passing
            handleCreateAttempt(score, passed);
        }
    };

    if (isCompleted) {
        const passed = (score / questions.length) >= 0.7;
        return (
            <Card className="text-center p-6 bg-white dark:bg-slate-900 shadow-md">
                <CardHeader>
                    <div className="mx-auto mb-4">
                        {passed ? (
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        ) : (
                            <XCircle className="w-16 h-16 text-red-500" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {passed ? "Quiz Completed!" : "Keep Practicing"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-bold mb-2">
                        Score: {score} / {questions.length}
                    </p>
                    <p className="text-muted-foreground">
                        {passed ? "Great job! You've mastered this lesson." : "Review the material and try again."}
                    </p>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setAnswers([]);
                        setIsCompleted(false);
                        setShowExplanation(false);
                        setSelectedOption(null);
                    }} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Retry Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>Score: {score}</span>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{currentQuestion.questionText}</h3>
                        {currentQuestion.explanation && (
                            <p className="text-lg text-muted-foreground">{currentQuestion.explanation}</p>
                        )}
                    </div>

                    {/* Dynamic Question Render */}
                    {(() => {
                        switch (currentQuestion.questionType) {
                            case 'fill_blank': {
                                const parsedOptions = typeof currentQuestion.options === 'string'
                                    ? JSON.parse(currentQuestion.options)
                                    : currentQuestion.options || [];
                                return (
                                    <FillBlank
                                        question={currentQuestion.questionText}
                                        options={parsedOptions}
                                        onAnswer={(ans: any) => !showExplanation && setSelectedOption(ans)}
                                        selectedAnswer={selectedOption as unknown as string}
                                        disabled={showExplanation}
                                    />
                                );
                            }
                            case 'rearrange': {
                                const parsedOptions = typeof currentQuestion.options === 'string'
                                    ? JSON.parse(currentQuestion.options)
                                    : currentQuestion.options || [];
                                return (
                                    <Rearrange
                                        options={parsedOptions}
                                        onAnswer={(ans: any) => !showExplanation && setSelectedOption(ans)}
                                        disabled={showExplanation}
                                    />
                                );
                            }
                            case 'match': {
                                const parsedOptions = typeof currentQuestion.options === 'string'
                                    ? JSON.parse(currentQuestion.options)
                                    : currentQuestion.options || [];
                                const pairs = JSON.parse(currentQuestion.correctAnswer);
                                return (
                                    <Match
                                        pairs={pairs}
                                        options={parsedOptions}
                                        onAnswer={(ans: any) => !showExplanation && setSelectedOption(ans)}
                                        disabled={showExplanation}
                                    />
                                );
                            }
                            default: // 'mcq', 'true_false'
                                const optionsList = typeof currentQuestion.options === 'string'
                                    ? JSON.parse(currentQuestion.options)
                                    : (currentQuestion.options || []);

                                return (
                                    <RadioGroup value={selectedOption?.toString()} onValueChange={(val) => !showExplanation && setSelectedOption(Number(val))}>
                                        <div className="grid gap-3">
                                            {optionsList.map((option: string, index: number) => {
                                                let itemClass = "flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors";
                                                if (showExplanation) {
                                                    // This logic needs to adapt for text-based answers vs index-based
                                                    // For MCQ, we kept index.
                                                    if (index === correctOptionIndex) {
                                                        itemClass += " bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
                                                    } else if (index === Number(selectedOption) && index !== correctOptionIndex) {
                                                        itemClass += " bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
                                                    } else {
                                                        itemClass += " opacity-50";
                                                    }
                                                } else if (Number(selectedOption) === index) {
                                                    itemClass += " border-primary bg-primary/5";
                                                }

                                                return (
                                                    <div key={index} className={itemClass} onClick={() => !showExplanation && setSelectedOption(index)}>
                                                        <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                                                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer font-medium text-base">
                                                            {option}
                                                        </Label>
                                                        {showExplanation && index === correctOptionIndex && (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                        )}
                                                        {showExplanation && Number(selectedOption) === index && index !== correctOptionIndex && (
                                                            <XCircle className="w-5 h-5 text-red-500" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </RadioGroup>
                                );
                        }
                    })()}
                </div>
                {showExplanation && (
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 font-semibold mb-1">
                            <AlertCircle className="w-4 h-4 text-blue-500" />
                            Explanation
                        </div>
                        {/* Schema has 'explanation'. Treating as primary explanation */}
                        <p className="text-sm">{currentQuestion.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="justify-end bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl border-t border-slate-100 dark:border-slate-800">
                {!showExplanation ? (
                    <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                        Check Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <>Next Question <ArrowRight className="ml-2 w-4 h-4" /></>
                        ) : (
                            "Finish Quiz"
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}