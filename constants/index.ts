/**
 * Central export point for all application constants
 */

// Suno API constants
export { SUNO_API_BASE_URL, MAX_CONSECUTIVE_EMPTY_PAGES } from './suno';

// Default values
export { DEFAULT_SUNO_USERNAME } from './defaults';

// Timing constants
export { USERNAME_DEBOUNCE_MS } from './timing';

// Search constants
export { MAX_SEARCH_RESULTS, EXACT_MATCH_SCORE, ALL_WORDS_MATCH_SCORE } from './search';

// UI constants
export { LYRICS_SNIPPET_WINDOW_SIZE } from './ui';

// Speech recognition constants
export { 
  SPEECH_RECOGNITION_LANG, 
  SPEECH_RECOGNITION_CONTINUOUS, 
  SPEECH_RECOGNITION_INTERIM_RESULTS 
} from './speech';
