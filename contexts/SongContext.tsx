'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Song } from '@/types/speech';
import { useSunoSongs } from '@/hooks/useSunoSongs';
import { useSongSearch } from '@/hooks/useSongSearch';
import { DEFAULT_SUNO_USERNAME } from '@/constants';

interface SongContextType {
  // Song library state
  username: string;
  songs: Song[];
  isLoadingSongs: boolean;
  songsError: string | null;
  setUsername: (username: string) => void;
  
  // Search state
  searchQuery: string;
  searchResults: Song[];
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

/**
 * Provider component for song-related state
 * Manages both song library and search functionality
 */
export function SongProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(DEFAULT_SUNO_USERNAME);
  
  // Use custom hooks for song loading and searching
  const { songs, isLoading: isLoadingSongs, error: songsError, loadSongs } = useSunoSongs();
  const { searchQuery, searchResults, isPending: isSearching, setSearchQuery: setSearchQueryInternal, clearSearch } = useSongSearch(songs);

  // Update username and trigger song loading
  const handleSetUsername = useCallback((newUsername: string) => {
    setUsername(newUsername);
    loadSongs(newUsername);
  }, [loadSongs]);

  const value: SongContextType = {
    username,
    songs,
    isLoadingSongs,
    songsError,
    setUsername: handleSetUsername,
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery: setSearchQueryInternal,
    clearSearch,
  };

  return (
    <SongContext.Provider value={value}>
      {children}
    </SongContext.Provider>
  );
}

/**
 * Hook to access song context
 * Must be used within SongProvider
 */
export function useSongContext() {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error('useSongContext must be used within SongProvider');
  }
  return context;
}
