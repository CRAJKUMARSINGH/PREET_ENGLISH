import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const commands = [
    { command: 'start lesson', action: 'Start a new lesson' },
    { command: 'take quiz', action: 'Begin a quiz' },
    { command: 'show progress', action: 'View your progress' },
    { command: 'practice speaking', action: 'Start speaking practice' },
    { command: 'help', action: 'Get help' },
  ];

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening...');
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCommand(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setTranscript('Error occurred. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  const processCommand = (text: string) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('lesson')) {
      setResponse('Starting a new lesson for you!');
      speak('Starting a new lesson for you!');
    } else if (lowerText.includes('quiz')) {
      setResponse('Let\'s take a quiz!');
      speak('Let\'s take a quiz!');
    } else if (lowerText.includes('progress')) {
      setResponse('Showing your progress dashboard.');
      speak('Showing your progress dashboard.');
    } else if (lowerText.includes('speaking')) {
      setResponse('Opening speaking practice.');
      speak('Opening speaking practice.');
    } else if (lowerText.includes('help')) {
      setResponse('I can help you start lessons, take quizzes, check progress, and more!');
      speak('I can help you start lessons, take quizzes, check progress, and more!');
    } else {
      setResponse('I didn\'t understand that. Try saying "help" to see what I can do.');
      speak('I didn\'t understand that. Try saying help to see what I can do.');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  return (
    <div className="space-y-6">
      {/* Voice Assistant Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            आवाज सहायक (Voice Assistant)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Use voice commands to navigate and learn. Just click the microphone and speak!
          </p>

          {/* Microphone Button */}
          <div className="flex justify-center">
            <Button
              onClick={isListening ? stopListening : startListening}
              size="lg"
              className={`w-24 h-24 rounded-full ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isListening ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </Button>
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground mb-1">You said:</p>
              <p className="font-medium">{transcript}</p>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-2">
                <Volume2 className={`w-5 h-5 text-purple-600 ${isSpeaking ? 'animate-pulse' : ''}`} />
                <div>
                  <p className="text-sm text-purple-900 dark:text-purple-100 font-medium">
                    {response}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Commands */}
      <Card>
        <CardHeader>
          <CardTitle>उपलब्ध आदेश (Available Commands)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {commands.map((cmd, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="font-mono text-sm text-purple-600 dark:text-purple-400">
                  "{cmd.command}"
                </span>
                <span className="text-sm text-muted-foreground">{cmd.action}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <strong>Tips:</strong> Speak clearly and wait for the response. You can use voice commands in English or Hindi!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
