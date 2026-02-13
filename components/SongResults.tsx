'use client';

import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';
import type { Song } from '@/types/speech';
import { LYRICS_SNIPPET_WINDOW_SIZE } from '@/constants';

function normalizeWord(word: string): string {
  return word.toLowerCase().replace(/[^\w]/g, '');
}

function renderHighlightedToken(
  word: string,
  index: number,
  querySet: Set<string>
) {
  const match = word.match(/^(\W*)(\w+)(\W*)$/);

  if (!match) {
    return <span key={`${word}-${index}`}>{word} </span>;
  }

  const [, leading, core, trailing] = match;
  const normalized = normalizeWord(core);
  const isMatch = normalized && querySet.has(normalized);

  return (
    <span key={`${word}-${index}`}>
      {leading}
      <span className={isMatch ? 'bg-yellow-400/40 text-yellow-100 px-1 rounded' : undefined}>
        {core}
      </span>
      {trailing}{' '}
    </span>
  );
}

function getSnippetWords(lyrics: string, query: string, windowSize: number) {
  const words = lyrics.split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return { words: [], start: 0, end: 0 };
  }

  const queryWords = query
    .split(/\s+/)
    .map((word) => normalizeWord(word))
    .filter(Boolean);

  if (queryWords.length === 0) {
    return { words, start: 0, end: Math.min(windowSize, words.length) };
  }

  let bestScore = -1;
  let bestStart = 0;

  for (let i = 0; i <= words.length - windowSize; i++) {
    const windowWords = words.slice(i, i + windowSize);
    const normalizedWindow = windowWords.map((w) => normalizeWord(w));
    const score = queryWords.reduce((sum, qWord) => {
      return sum + (normalizedWindow.includes(qWord) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }

  return { words, start: bestStart, end: Math.min(bestStart + windowSize, words.length) };
}

interface SongResultItemProps {
  song: Song;
  query: string;
  onLyricsClick: (song: Song) => void;
}

const SongResultItem = memo(function SongResultItem({ song, query, onLyricsClick }: SongResultItemProps) {
  const snippetData = useMemo(() => getSnippetWords(song.lyrics, query, LYRICS_SNIPPET_WINDOW_SIZE), [song.lyrics, query]);
  
  const querySet = useMemo(() => 
    new Set(
      query
        .split(/\s+/)
        .map((word) => normalizeWord(word))
        .filter(Boolean)
    ), 
    [query]
  );

  const handleClick = useCallback(() => {
    onLyricsClick(song);
  }, [song, onLyricsClick]);

  return (
    <article
      className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-all"
      aria-label={`Song result: ${song.title}`}
    >
      <div className="flex items-start gap-4">
        {song.imageUrl && (
          <Image
            src={song.imageUrl}
            alt={`Album artwork for ${song.title}`}
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            sizes="80px"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            {song.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-green-300 font-semibold">
              {Math.round(song.matchScore * 100)}% Match
            </span>
            <span className="text-gray-400" aria-hidden="true">•</span>
            <span className="text-sm text-gray-300">ID: {song.id}</span>
          </div>

          {song.tags && (
            <ul className="flex flex-wrap gap-2 mb-3" aria-label="Song tags">
              {song.tags.split(',').map((tag, index) => (
                <li
                  key={index}
                  className="inline-block bg-purple-500/70 text-white text-xs px-2 py-1 rounded-full"
                >
                  {tag.trim()}
                </li>
              ))}
            </ul>
          )}
          
          {song.lyrics && (
            <button
              type="button"
              onClick={handleClick}
              className="bg-black/30 rounded p-3 mt-2 text-left w-full hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <p className="text-sm text-gray-300">
                {(() => {
                  const { words, start, end } = snippetData;
                  const snippet = words.slice(start, end);
                  const hasLeading = start > 0;
                  const hasTrailing = end < words.length;

                  return (
                    <>
                      {hasLeading && <span className="text-gray-500" aria-hidden="true">... </span>}
                      {snippet.map((word, index) => renderHighlightedToken(word, index, querySet))}
                      {hasTrailing && <span className="text-gray-500" aria-hidden="true">...</span>}
                    </>
                  );
                })()}
              </p>
              <p className="text-xs text-gray-400 mt-2">Click to view full lyrics</p>
            </button>
          )}
          
          {song.audioUrl && (
            <audio controls className="w-full mt-3" aria-label={`Audio player for ${song.title}`}>
              <source src={song.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>
    </article>
  );
});

interface SongResultsProps {
  results: Song[];
  query: string;
  onLyricsClick: (song: Song) => void;
}

const SongResults = memo(function SongResults({ results, query, onLyricsClick }: SongResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <section className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl" aria-labelledby="results-heading">
      <h2 id="results-heading" className="text-2xl font-bold text-white mb-4">
        <span role="img" aria-label="Musical notes">🎵</span> Found {results.length} {results.length === 1 ? 'Match' : 'Matches'}
      </h2>
      
      <div className="space-y-4" role="feed" aria-busy="false">
        {results.map((song) => (
          <SongResultItem key={song.id} song={song} query={query} onLyricsClick={onLyricsClick} />
        ))}
      </div>
    </section>
  );
});

export default SongResults;
