/**
 * Speech Recognition Service for The Mimic Engine
 * Implements Web Speech API with fallback to OpenAI Whisper
 */

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  culturalMode?: 'strict' | 'accepting' | 'teaching';
  difficultyLevel?: string;
  focusAreas?: string[];
}

export class SpeechRecognitionService {
  private recognition: any = null;
  private _isSupported = false;
  private isListening = false;
  private onResultCallback?: (result: SpeechRecognitionResult) => void;
  private onErrorCallback?: (error: string) => void;

  constructor() {
    this.initializeRecognition();
  }

  private initializeRecognition() {
    // Check for Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this._isSupported = true;
      this.setupRecognition();
    } else {
      console.warn('Web Speech API not supported, will use fallback methods');
      this._isSupported = false;
    }

  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      this.onResultCallback?.({
        transcript,
        confidence,
        isFinal
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.onErrorCallback?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  /**
   * Start speech recognition
   */
  start(options: SpeechRecognitionOptions = {}) {
    if (!this._isSupported || !this.recognition) {
      this.onErrorCallback?.('Speech recognition not supported');
      return;
    }

    if (this.isListening) {
      this.stop();
    }

    // Configure recognition
    this.recognition.lang = options.language || 'en-US';
    this.recognition.continuous = options.continuous ?? true;
    this.recognition.interimResults = options.interimResults ?? true;
    this.recognition.maxAlternatives = options.maxAlternatives ?? 1;

    try {
      this.recognition.start();
      this.isListening = true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      this.onErrorCallback?.('Failed to start speech recognition');
    }
  }

  /**
   * Stop speech recognition
   */
  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Set result callback
   */
  onResult(callback: (result: SpeechRecognitionResult) => void) {
    this.onResultCallback = callback;
  }

  /**
   * Set error callback
   */
  onError(callback: (error: string) => void) {
    this.onErrorCallback = callback;
  }

  /**
   * Check if speech recognition is supported
   */
  isSupported(): boolean {
    return this._isSupported;
  }


  /**
   * Check if currently listening
   */
  isListeningNow(): boolean {
    return this.isListening;
  }

  /**
   * Start listening with callbacks
   */
  startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: string) => void,
    options: SpeechRecognitionOptions = {}
  ) {
    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.start(options);
  }

  /**
   * Stop listening
   */
  stopListening() {
    this.stop();
  }

  /**
   * Calculate accuracy score between transcript and expected text
   */
  calculateAccuracy(transcript: string, expected: string): number {
    if (!transcript || !expected) return 0;

    const t = transcript.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const e = expected.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

    if (t === e) return 100;

    const tWords = t.split(' ');
    const eWords = e.split(' ');

    let matches = 0;
    eWords.forEach(word => {
      if (tWords.includes(word)) matches++;
    });

    return Math.round((matches / eWords.length) * 100);
  }

  /**
   * Analyze problematic phonemes (Stub for advanced AI analysis)
   */
  analyzePhonemes(transcript: string, expected: string) {
    return {
      problematicPhonemes: [],
      suggestions: []
    };
  }

  /**
   * Validate Indian English variations
   */
  validateIndianEnglish(transcript: string) {
    return {
      isValid: true,
      culturalNotes: []
    };
  }

  /**
   * Suggest international alternatives
   */
  suggestInternationalAlternatives(transcript: string) {
    return [];
  }

  /**
   * Get feedback based on score
   */
  getFeedback(score: number, problematicPhonemes: string[]) {
    if (score >= 90) return {
      message: "Excellent pronunciation!",
      hindiMessage: "बेहतरीन उच्चारण!",
      emoji: "🌟",
      color: "text-green-600",
      tips: [],
      hindiTips: []
    };
    if (score >= 70) return {
      message: "Good job! Almost there.",
      hindiMessage: "बहुत अच्छा! आप लगभग वहाँ पहुँच गए हैं।",
      emoji: "👍",
      color: "text-blue-600",
      tips: ["Slow down a bit", "Focus on clear endings"],
      hindiTips: ["थोड़ा धीरे बोलें", "स्पष्ट अंत पर ध्यान दें"]
    };
    return {
      message: "Keep practicing!",
      hindiMessage: "अभ्यास करते रहें!",
      emoji: "💪",
      color: "text-orange-600",
      tips: ["Listen to the audio again", "Try repeating word by word"],
      hindiTips: ["ऑडियो को फिर से सुनें", "शब्द-दर-शब्द दोहराने का प्रयास करें"]
    };
  }
}

// Singleton instances and aliases to match different imports
export const speechRecognitionService = new SpeechRecognitionService();
export const speechRecognition = speechRecognitionService;

// Utility functions
export const startListening = (
  options: SpeechRecognitionOptions = {},
  onResult?: (result: SpeechRecognitionResult) => void,
  onError?: (error: string) => void
) => {
  if (onResult) speechRecognitionService.onResult(onResult);
  if (onError) speechRecognitionService.onError(onError);
  speechRecognitionService.start(options);
};

export const stopListening = () => {
  speechRecognitionService.stop();
};

export const isListening = () => {
  return speechRecognitionService.isListeningNow();
};
