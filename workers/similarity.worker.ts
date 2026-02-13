import { calculateSimilarity } from '@/utils/similarity';
import type { Song } from '@/types/speech';

interface CalculateResultsMessage {
  type: 'calculate';
  query: string;
  songs: Song[];
}

interface CalculateResultsResponse {
  type: 'results';
  results: Song[];
}

self.onmessage = (event: MessageEvent<CalculateResultsMessage>) => {
  if (event.data.type === 'calculate') {
    const { query, songs } = event.data;

    if (!query.trim() || songs.length === 0) {
      self.postMessage({ type: 'results', results: [] });
      return;
    }

    const scoredSongs = songs.map((song) => ({
      ...song,
      matchScore: calculateSimilarity(song.lyrics, query),
    }));

    const results = scoredSongs
      .filter((song) => song.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    const response: CalculateResultsResponse = {
      type: 'results',
      results,
    };

    self.postMessage(response);
  }
};
