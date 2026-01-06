/**
 * Speech Recognition Service
 * Provides speech-to-text functionality for pronunciation practice
 */

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class SpeechRecognitionService {
  private recognition: any;
  private isListening: boolean = false;

  constructor() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
  }

  isSupported(): boolean {
    return !!this.recognition;
  }

  async startListening(
    onResult: (result: SpeechRecognitionResult) => void,
    onError?: (error: string) => void
  ): Promise<void> {
    if (!this.recognition) {
      onError?.('Speech recognition not supported in this browser');
      return;
    }

    if (this.isListening) {
      return;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const confidence = result[0].confidence;
      const isFinal = result.isFinal;

      onResult({
        transcript,
        confidence,
        isFinal,
      });
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError?.('Failed to start speech recognition');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  /**
   * Compare spoken text with expected text
   * Returns a score from 0-100
   */
  calculateAccuracy(spoken: string, expected: string): number {
    const spokenWords = spoken.toLowerCase().trim().split(/\s+/);
    const expectedWords = expected.toLowerCase().trim().split(/\s+/);

    if (expectedWords.length === 0) return 0;

    let matches = 0;
    const maxLength = Math.max(spokenWords.length, expectedWords.length);

    for (let i = 0; i < maxLength; i++) {
      if (spokenWords[i] === expectedWords[i]) {
        matches++;
      }
    }

    return Math.round((matches / expectedWords.length) * 100);
  }

  /**
   * Get pronunciation feedback
   */
  getFeedback(accuracy: number): {
    message: string;
    emoji: string;
    color: string;
  } {
    if (accuracy >= 90) {
      return {
        message: 'Excellent! Perfect pronunciation! 🎉',
        emoji: '🌟',
        color: 'text-green-600',
      };
    } else if (accuracy >= 75) {
      return {
        message: 'Great job! Very good pronunciation! 👍',
        emoji: '😊',
        color: 'text-blue-600',
      };
    } else if (accuracy >= 60) {
      return {
        message: 'Good effort! Keep practicing! 💪',
        emoji: '🙂',
        color: 'text-yellow-600',
      };
    } else {
      return {
        message: 'Keep trying! Practice makes perfect! 📚',
        emoji: '😌',
        color: 'text-orange-600',
      };
    }
  }
}

export const speechRecognition = new SpeechRecognitionService();
