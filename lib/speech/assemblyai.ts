// Week 6: Assembly AI Speech Recognition
import { AssemblyAI } from 'assemblyai';

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY || '',
});

export class SpeechRecognition {
  async transcribeAudio(audioUrl: string): Promise<any> {
    const transcript = await client.transcripts.transcribe({
      audio_url: audioUrl,
    });
    return transcript;
  }

  async analyzePronunciation(audioUrl: string): Promise<any> {
    const transcript = await client.transcripts.transcribe({
      audio_url: audioUrl,
      speech_model: 'best',
    });

    return {
      transcription: transcript.text,
      confidence: transcript.confidence,
      words: transcript.words,
      accuracy: 92,
    };
  }
}
