import { fetchAllSunoSongs, fetchSunoPage } from '@/lib/suno';
import type { Song } from '@/types/speech';

/**
 * Service for Suno API operations
 * Provides caching, error handling, and orchestration for Suno API calls
 */
export const sunoService = {
  // Simple in-memory cache
  cache: new Map<string, { songs: Song[]; timestamp: number }>(),
  cacheTimeout: 5 * 60 * 1000, // 5 minutes

  /**
   * Fetch all songs for a username with caching
   * @param username - Suno username
   * @param onProgress - Optional callback for progressive updates
   * @returns Array of songs
   */
  async fetchUserSongs(
    username: string,
    onProgress?: (songs: Song[]) => void
  ): Promise<Song[]> {
    const normalizedUsername = username.trim().toLowerCase();
    
    if (!normalizedUsername) {
      return [];
    }

    // Check cache
    const cached = this.cache.get(normalizedUsername);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.songs;
    }

    // Fetch from API
    try {
      const songs = await fetchAllSunoSongs(normalizedUsername, onProgress);
      
      // Update cache
      this.cache.set(normalizedUsername, {
        songs,
        timestamp: Date.now(),
      });

      return songs;
    } catch (error) {
      console.error('Error fetching user songs:', error);
      throw new Error('Failed to load songs. Please try again.');
    }
  },

  /**
   * Clear cache for a specific user or all users
   * @param username - Optional username to clear, or undefined to clear all
   */
  clearCache(username?: string): void {
    if (username) {
      this.cache.delete(username.trim().toLowerCase());
    } else {
      this.cache.clear();
    }
  },

  /**
   * Check if username exists and has songs
   * @param username - Suno username to validate
   * @returns Boolean indicating if user has songs
   */
  async validateUsername(username: string): Promise<boolean> {
    try {
      const data = await fetchSunoPage(username.trim().toLowerCase(), 0);
      return data !== null && !!data.clips && data.clips.length > 0;
    } catch {
      return false;
    }
  },

  /**
   * Get cache statistics
   * @returns Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      usernames: Array.from(this.cache.keys()),
    };
  },
};
