var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
export function RatingDialog(_a) {
    var _this = this;
    var isOpen = _a.isOpen, onClose = _a.onClose, contentType = _a.contentType, contentId = _a.contentId, contentTitle = _a.contentTitle;
    var _b = useState(0), rating = _b[0], setRating = _b[1];
    var _c = useState(""), review = _c[0], setReview = _c[1];
    var _d = useState(false), isSubmitted = _d[0], setIsSubmitted = _d[1];
    var toast = useToast().toast;
    var queryClient = useQueryClient();
    var mutation = useMutation({
        mutationFn: function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/content-ratings", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                contentType: contentType,
                                contentId: contentId,
                                rating: rating,
                                review: review
                            }),
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok)
                            throw new Error("Failed to submit rating");
                        return [2 /*return*/, res.json()];
                }
            });
        }); },
        onSuccess: function () {
            setIsSubmitted(true);
            queryClient.invalidateQueries({ queryKey: ["/api/content-ratings", contentType, contentId] });
            queryClient.invalidateQueries({ queryKey: ["/api/activity-feed"] });
            setTimeout(function () {
                onClose();
                setIsSubmitted(false);
                setRating(0);
                setReview("");
            }, 2000);
        },
        onError: function () {
            toast({
                title: "Error",
                description: "Could not submit your feedback. Please try again.",
                variant: "destructive",
            });
        }
    });
    return (<Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-3xl">
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (<motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="space-y-6 py-4">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center">
                                    How was "{contentTitle}"?
                                </DialogTitle>
                                <DialogDescription className="text-center">
                                    आपका अनुभव कैसा रहा? आपका फीडबैक हमें बेहतर बनाने में मदद करता है।
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map(function (star) { return (<motion.button key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={function () { return setRating(star); }} className="p-1 focus:outline-none">
                                        <Star className={"h-10 w-10 transition-colors ".concat(star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300")}/>
                                    </motion.button>); })}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Any comments? (Optional) • कोई टिप्पणी?
                                </label>
                                <Textarea placeholder="Tell us what you liked or what could be better..." value={review} onChange={function (e) { return setReview(e.target.value); }} className="rounded-xl border-slate-200 focus:ring-primary h-24"/>
                            </div>

                            <DialogFooter>
                                <Button onClick={function () { return mutation.mutate(); }} disabled={rating === 0 || mutation.isPending} className="w-full rounded-xl py-6 font-bold text-lg flex gap-2">
                                    {mutation.isPending ? "Submitting..." : (<>
                                            <Send className="h-5 w-5"/>
                                            Submit Feedback • फीडबैक भेजें
                                        </>)}
                                </Button>
                            </DialogFooter>
                        </motion.div>) : (<motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle2 className="h-16 w-16 text-green-600"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Thank You! धन्यवाद!</h3>
                                <p className="text-slate-600">Your feedback has been saved. +5 XP</p>
                            </div>
                        </motion.div>)}
                </AnimatePresence>
            </DialogContent>
        </Dialog>);
}
