import { AudioService } from '@/lib/audioService';

describe('AudioService', () => {
  let audioService: AudioService;

  beforeEach(() => {
    audioService = new AudioService();
    jest.clearAllMocks();
  });

  it('speaks English text', () => {
    audioService.speakEnglish('Hello');
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('speaks Hindi text', () => {
    audioService.speakHindi('नमस्ते');
    expect(window.speechSynthesis.speak).toHaveBeenCalled();
  });

  it('stops current speech', () => {
    audioService.speak('Test');
    audioService.stop();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });

  it('checks if speaking', () => {
    const isSpeaking = audioService.isSpeaking();
    expect(typeof isSpeaking).toBe('boolean');
  });

  it('gets available voices', () => {
    const voices = audioService.getVoices();
    expect(Array.isArray(voices)).toBe(true);
  });
});
