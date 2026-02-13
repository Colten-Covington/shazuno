'use client';

import { useCallback, useRef } from 'react';

interface TextSearchProps {
  onSearch: (lyrics: string) => void;
  isSearching: boolean;
  songsLoaded: number;
}

function TextSearchComponent({ onSearch, isSearching, songsLoaded }: TextSearchProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const lyrics = textareaRef.current?.value.trim();
    if (lyrics && songsLoaded > 0) {
      onSearch(lyrics);
    }
  }, [songsLoaded, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="lyrics-input" className="block text-white text-sm font-bold mb-2">
          Enter Song Lyrics: <span className="inline-block text-gray-400 text-xs ml-2">(Press Ctrl+Enter to search)</span>
        </label>
        <textarea
          ref={textareaRef}
          id="lyrics-input"
          onKeyDown={handleKeyDown}
          disabled={songsLoaded === 0}
          placeholder={songsLoaded === 0 ? "Loading songs..." : "Type or paste song lyrics here..."}
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Song lyrics input"
        />
      </div>
      <button
        type="submit"
        disabled={isSearching || songsLoaded === 0}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSearching ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Searching...
          </span>
        ) : songsLoaded === 0 ? (
          '⏳ Loading songs...'
        ) : (
          '🔍 Search Songs'
        )}
      </button>
    </form>
  );
}

export default TextSearchComponent;
