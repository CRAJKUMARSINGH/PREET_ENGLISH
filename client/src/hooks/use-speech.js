import { useCallback } from "react";
export var useSpeech = function () {
    var speak = useCallback(function (_a) {
        var text = _a.text, _b = _a.lang, lang = _b === void 0 ? "hi-IN" : _b, _c = _a.rate, rate = _c === void 0 ? 0.9 : _c, _d = _a.pitch, pitch = _d === void 0 ? 1 : _d;
        if (!("speechSynthesis" in window)) {
            console.warn("Web Speech API not supported");
            return;
        }
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        // Prefer native voices if available
        var voices = window.speechSynthesis.getVoices();
        var preferredVoice = voices.find(function (voice) { return voice.lang === lang && (voice.name.includes("Google") || voice.name.includes("Natural")); });
        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }
        window.speechSynthesis.speak(utterance);
    }, []);
    var stop = useCallback(function () {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    }, []);
    return { speak: speak, stop: stop };
};
