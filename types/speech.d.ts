// Type definitions for Web Speech API
export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

export interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

export interface Song {
  id: string;
  title: string;
  lyrics: string;
  matchScore: number;
  audioUrl?: string;
  imageUrl?: string;
  tags?: string;
}

// Suno API response types
export interface SunoClip {
  id: string;
  title: string;
  audio_url?: string;
  image_url?: string;
  image_large_url?: string;
  video_url?: string;
  status?: string;
  metadata?: {
    tags?: string;
    prompt?: string;
    gpt_description_prompt?: string;
    [key: string]: any;
  };
  created_at?: string;
  duration?: number;
  [key: string]: any;
}

export interface SunoProfile {
  id?: string;
  username?: string;
  display_name?: string;
  clips?: SunoClip[];
  [key: string]: any;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export {};
