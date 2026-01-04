import { useCallback } from "react";

type SpeechOptions = {
    text: string;
    lang?: "hi-IN" | "en-US";
    rate?: number;
    pitch?: number;
};

export const useSpeech = () => {
    const speak = useCallback(({ text, lang = "hi-IN", rate = 0.9, pitch = 1 }: SpeechOptions) => {
        if (!("speechSynthesis" in window)) {
            console.warn("Web Speech API not supported");
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;

        // Prefer native voices if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
            (voice) => voice.lang === lang && (voice.name.includes("Google") || voice.name.includes("Natural"))
        );

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    }, []);

    const stop = useCallback(() => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }, []);

    return { speak, stop };
};
