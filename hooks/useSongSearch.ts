'use client';

import { useState, useCallback, useMemo, useEffect, useTransition, useDeferredValue } from 'react';
import { calculateSimilarity } from '@/utils/similarity';
import type { Song } from '@/types/speech';
import { MAX_SEARCH_RESULTS } from '@/constants';

interface UseSongSearchReturn {
  searchQuery: string;
  searchResults: Song[];
  isPending: boolean;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

/**
 * Custom hook for searching songs by lyrics
 * Handles search state, deferred updates, and result calculation
 */
export function useSongSearch(songs: Song[]): UseSongSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isPending, startTransition] = useTransition();
  
  // Defer the search query to keep input responsive
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const calculateResults = useCallback((query: string, availableSongs: Song[]) => {
    if (!query.trim() || availableSongs.length === 0) {
      return [] as Song[];
    }

    const scoredSongs = availableSongs.map((song) => ({
      ...song,
      matchScore: calculateSimilarity(song.lyrics, query),
    }));

    return scoredSongs
      .filter((song) => song.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, MAX_SEARCH_RESULTS);
  }, []);

  // Memoize results calculation to avoid recalculating unless inputs change
  const memoizedResults = useMemo(() => {
    if (!deferredSearchQuery || songs.length === 0) {
      return [];
    }
    return calculateResults(deferredSearchQuery, songs);
  }, [deferredSearchQuery, songs, calculateResults]);

  // Update results asynchronously with useTransition to prevent blocking input
  useEffect(() => {
    startTransition(() => {
      setSearchResults(memoizedResults);
    });
  }, [memoizedResults]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  return {
    searchQuery,
    searchResults,
    isPending,
    setSearchQuery,
    clearSearch,
  };
}
