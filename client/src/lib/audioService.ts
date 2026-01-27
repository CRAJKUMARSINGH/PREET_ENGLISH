/**
 * Audio Service for Text-to-Speech with Adaptive Loading
 * Uses Web Speech API for pronunciation with performance optimizations
 * Implements Addy Osmani's adaptive loading patterns
 */

// Network quality detection
function getNetworkQuality(): 'slow' | 'fast' {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return 'fast'; // Default to fast if no connection info
  
  // Consider 3G and below as slow
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
    return 'slow';
  }
  
  return 'fast';
}

// Audio cache for performance
const audioCache = new Map<string, HTMLAudioElement>();

export class AudioService {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isInitialized = false;
  private networkQuality: 'slow' | 'fast' = 'fast';
  private preloadedAudio = new Set<string>();

  constructor() {
    this.synth = window.speechSynthesis;
    this.networkQuality = getNetworkQuality();
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

    // Listen for network changes
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', () => {
        this.networkQuality = getNetworkQuality();
      });
    }
  }

  /**
   * Preload common audio for better performance
   */
  preloadCommonAudio(phrases: string[]) {
    if (this.networkQuality === 'slow') return; // Skip preloading on slow connections
    
    phrases.forEach(phrase => {
      if (!this.preloadedAudio.has(phrase)) {
        // Create utterance for preloading
        const utterance = new SpeechSynthesisUtterance(phrase);
        utterance.volume = 0; // Silent preload
        this.synth.speak(utterance);
        this.preloadedAudio.add(phrase);
      }
    });
  }

  /**
   * Speak English text with adaptive quality
   */
  speakEnglish(text: string, rate: number = 0.9) {
    // Adjust rate based on network quality for better experience
    const adaptiveRate = this.networkQuality === 'slow' ? rate * 0.8 : rate;
    this.speak(text, 'en-US', adaptiveRate);
  }

  /**
   * Speak Hindi text with adaptive quality
   */
  speakHindi(text: string, rate: number = 0.9) {
    // Adjust rate based on network quality for better experience
    const adaptiveRate = this.networkQuality === 'slow' ? rate * 0.8 : rate;
    this.speak(text, 'hi-IN', adaptiveRate);
  }

  /**
   * Generic speak method with performance optimizations
   */
  speak(text: string, lang: string = 'en-US', rate: number = 0.9) {
    // Stop any current speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good voice for the language
    const voices = this.synth.getVoices();
    const voice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    // Add performance monitoring
    const startTime = performance.now();
    utterance.onstart = () => {
      const loadTime = performance.now() - startTime;
      console.debug(`Audio started in ${loadTime.toFixed(2)}ms`);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Play audio file with adaptive loading
   */
  async playAudioFile(url: string, options: { preload?: boolean } = {}) {
    try {
      let audio = audioCache.get(url);
      
      if (!audio) {
        audio = new Audio();
        
        // Adaptive loading based on network quality
        if (this.networkQuality === 'slow') {
          audio.preload = 'none'; // Don't preload on slow connections
        } else {
          audio.preload = options.preload ? 'auto' : 'metadata';
        }
        
        audio.src = url;
        audioCache.set(url, audio);
      }

      // Play with error handling
      await audio.play();
      
    } catch (error) {
      console.error('Audio playback failed:', error);
      // Fallback to speech synthesis
      this.speakEnglish('Audio not available');
    }
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

  /**
   * Get network quality for adaptive features
   */
  getNetworkQuality(): 'slow' | 'fast' {
    return this.networkQuality;
  }

  /**
   * Clear audio cache to free memory
   */
  clearCache() {
    audioCache.clear();
    this.preloadedAudio.clear();
  }
}

// Singleton instance
export const audioService = new AudioService();

// Utility functions for quick access
export const speakEnglish = (text: string) => audioService.speakEnglish(text);
export const speakHindi = (text: string) => audioService.speakHindi(text);
export const stopSpeaking = () => audioService.stop();
export const preloadCommonPhrases = (phrases: string[]) => audioService.preloadCommonAudio(phrases);

// Common English learning phrases to preload
export const COMMON_LEARNING_PHRASES = [
  "Correct!",
  "Try again",
  "Well done!",
  "Next question",
  "Great job!",
  "Perfect pronunciation!",
  "Listen carefully",
  "Repeat after me"
];

// Auto-preload common phrases on fast connections
if (audioService.getNetworkQuality() === 'fast') {
  setTimeout(() => {
    preloadCommonPhrases(COMMON_LEARNING_PHRASES);
  }, 2000); // Delay to not block initial load
}
