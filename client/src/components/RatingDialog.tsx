import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface RatingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    contentType: 'LESSON' | 'STORY';
    contentId: number;
    contentTitle: string;
}

export function RatingDialog({ isOpen, onClose, contentType, contentId, contentTitle }: RatingDialogProps) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch("/api/content-ratings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contentType,
                    contentId,
                    rating,
                    review
                }),
            });
            if (!res.ok) throw new Error("Failed to submit rating");
            return res.json();
        },
        onSuccess: () => {
            setIsSubmitted(true);
            queryClient.invalidateQueries({ queryKey: ["/api/content-ratings", contentType, contentId] });
            queryClient.invalidateQueries({ queryKey: ["/api/activity-feed"] });

            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setRating(0);
                setReview("");
            }, 2000);
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Could not submit your feedback. Please try again.",
                variant: "destructive",
            });
        }
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="space-y-6 py-4"
                        >
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center">
                                    How was "{contentTitle}"?
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    आपका अनुभव कैसा रहा? आपका फीडबैक हमें बेहतर बनाने में मदद करता है।
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className="p-1 focus:outline-none"
                                    >
                                        <Star
                                            className={`h-10 w-10 transition-colors ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                                }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Any comments? (Optional) • कोई टिप्पणी?
                                </label>
                                <Textarea
                                    placeholder="Tell us what you liked or what could be better..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="rounded-xl border-slate-200 focus:ring-primary h-24"
                                />
                            </div>

                            <DialogFooter>
                                <Button
                                    onClick={() => mutation.mutate()}
                                    disabled={rating === 0 || mutation.isPending}
                                    className="w-full rounded-xl py-6 font-bold text-lg flex gap-2"
                                >
                                    {mutation.isPending ? "Submitting..." : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Submit Feedback • फीडबैक भेजें
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle2 className="h-16 w-16 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Thank You! धन्यवाद!</h3>
                                <p className="text-slate-600">Your feedback has been saved. +5 XP</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
