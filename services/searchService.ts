import { calculateSimilarity } from '@/utils/similarity';
import type { Song } from '@/types/speech';
import { MAX_SEARCH_RESULTS } from '@/constants';

/**
 * Service for song search operations
 * Orchestrates search logic and ranking algorithms
 */
export const searchService = {
  /**
   * Search songs by query text
   * @param query - Search query (lyrics fragment)
   * @param songs - Array of songs to search through
   * @returns Sorted array of matching songs with scores
   */
  searchSongs(query: string, songs: Song[]): Song[] {
    if (!query.trim() || songs.length === 0) {
      return [];
    }

    // Calculate similarity scores for all songs
    const scoredSongs = songs.map((song) => ({
      ...song,
      matchScore: calculateSimilarity(song.lyrics, query),
    }));

    // Filter, sort by score, and limit results
    return scoredSongs
      .filter((song) => song.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, MAX_SEARCH_RESULTS);
  },

  /**
   * Get search statistics
   * @param results - Search results
   * @returns Statistics about the search
   */
  getSearchStats(results: Song[]) {
    if (results.length === 0) {
      return { count: 0, avgScore: 0, topScore: 0 };
    }

    const scores = results.map(r => r.matchScore);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const topScore = Math.max(...scores);

    return {
      count: results.length,
      avgScore: Math.round(avgScore * 100),
      topScore: Math.round(topScore * 100),
    };
  },
};
