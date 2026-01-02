/**
 * Audio Service for Text-to-Speech
 * Uses Web Speech API for pronunciation
 */

export class AudioService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isInitialized = false;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initialize();
  }

  private initialize() {
    // Load voices; guard for environments (like tests) where addEventListener may not exist
    const voices = this.synth.getVoices();
    if (voices.length === 0) {
      const synthAny = this.synth as any;
      if (typeof synthAny.addEventListener === 'function') {
        synthAny.addEventListener('voiceschanged', () => {
          this.isInitialized = true;
        });
      } else {
        // Fallback: mark initialized even if we can't subscribe to voice events
        this.isInitialized = true;
      }
    } else {
      this.isInitialized = true;
    }
  }

  /**
   * Speak English text
   */
  speakEnglish(text: string, rate: number = 0.9) {
    this.speak(text, 'en-US', rate);
  }

  /**
   * Speak Hindi text
   */
  speakHindi(text: string, rate: number = 0.9) {
    this.speak(text, 'hi-IN', rate);
  }

  /**
   * Generic speak method
   */
  speak(text: string, lang: string = 'en-US', rate: number = 0.9) {
    // Stop any current speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate; // Slightly slower for learners
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good voice for the language
    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Stop current speech
   */
  stop() {
    // Always request cancel; in some environments `speaking` may not be reliable
    const synthAny = this.synth as any;
    if (typeof synthAny.cancel === 'function') {
      synthAny.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Pause current speech
   */
  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  /**
   * Check if paused
   */
  isPaused(): boolean {
    return this.synth.paused;
  }

  /**
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  /**
   * Get English voices
   */
  getEnglishVoices(): SpeechSynthesisVoice[] {
    return this.getVoices().filter(v => v.lang.startsWith('en'));
  }

  /**
   * Get Hindi voices
   */
  getHindiVoices(): SpeechSynthesisVoice[] {
    return this.getVoices().filter(v => v.lang.startsWith('hi'));
  }
}

// Singleton instance
export const audioService = new AudioService();

// Utility functions for quick access
export const speakEnglish = (text: string) => audioService.speakEnglish(text);
export const speakHindi = (text: string) => audioService.speakHindi(text);
export const stopSpeaking = () => audioService.stop();
