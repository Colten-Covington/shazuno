'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAllSunoSongs } from '@/lib/suno';
import type { Song } from '@/types/speech';
import { USERNAME_DEBOUNCE_MS } from '@/constants';

interface UseSunoSongsReturn {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  loadSongs: (username: string) => void;
}

/**
 * Custom hook for loading songs from Suno API
 * Handles loading state, error handling, and progressive updates
 */
export function useSunoSongs(initialUsername?: string): UseSunoSongsReturn {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState(initialUsername || '');

  const loadSongs = useCallback(async (newUsername: string) => {
    const trimmedUsername = newUsername.trim();
    
    if (!trimmedUsername) {
      setSongs([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedSongs = await fetchAllSunoSongs(
        trimmedUsername,
        (progressSongs) => {
          // Update UI with progressive results
          setSongs(progressSongs);
        }
      );

      setSongs(fetchedSongs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading songs';
      setError(errorMessage);
      console.error('Error loading songs:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load songs when username changes (with debounce)
  useEffect(() => {
    if (username) {
      const timer = setTimeout(() => {
        loadSongs(username);
      }, USERNAME_DEBOUNCE_MS);
      
      return () => clearTimeout(timer);
    } else {
      setSongs([]);
      setError(null);
    }
  }, [username, loadSongs]);

  // Public method to change username
  const updateUsername = useCallback((newUsername: string) => {
    setUsername(newUsername);
  }, []);

  return {
    songs,
    isLoading,
    error,
    loadSongs: updateUsername,
  };
}
