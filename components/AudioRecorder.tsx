'use client';

import { useState, useRef, useEffect } from 'react';
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '@/types/speech';

interface AudioRecorderProps {
  onSearch: (lyrics: string) => void;
  isSearching: boolean;
  songsLoaded?: number;
}

export default function AudioRecorder({ onSearch, isSearching, songsLoaded = 0 }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setError(`Error: ${event.error}`);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } else {
        setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setError('');
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSearch = () => {
    if (transcript.trim()) {
      onSearch(transcript.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="w-32 h-32 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg transform transition-all hover:scale-105 animate-pulse focus:outline-none focus:ring-4 focus:ring-red-300"
            aria-label="Stop recording lyrics"
            aria-pressed="true"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2" role="img" aria-label="Pause button">⏸️</span>
              <span className="text-sm">Stop</span>
            </div>
          </button>
        ) : (
          <button
            onClick={startRecording}
            disabled={isSearching || !!error || songsLoaded === 0}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-purple-300"
            aria-label="Start recording lyrics"
            aria-pressed="false"
            aria-disabled={isSearching || !!error || songsLoaded === 0}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2" role="img" aria-label="Microphone">🎤</span>
              <span className="text-sm">Record</span>
            </div>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg" role="alert">
          <span className="sr-only">Error:</span>
          {error}
        </div>
      )}

      {transcript && (
        <div className="bg-white/20 rounded-lg p-4">
          <label htmlFor="detected-lyrics" className="block text-white text-sm font-bold mb-2">
            Detected Lyrics:
          </label>
          <div id="detected-lyrics" className="bg-black/30 text-white p-3 rounded min-h-[100px] whitespace-pre-wrap" role="log" aria-live="polite">
            {transcript}
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-300"
            aria-label="Search songs with detected lyrics"
          >
            <span aria-hidden="true">🔍</span> {isSearching ? 'Searching...' : 'Search Songs'}
          </button>
        </div>
      )}

      {!error && !isRecording && !transcript && (
        <p className="text-center text-gray-300 text-sm" aria-live="polite">
          {songsLoaded === 0 ? 'Waiting for songs to load...' : 'Click the microphone to start recording lyrics'}
        </p>
      )}
    </div>
  );
}
