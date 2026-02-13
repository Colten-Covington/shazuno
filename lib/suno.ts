import type { SunoProfile, SunoClip, Song } from '@/types/speech';

/**
 * Fetches a page of clips from the Suno API for a given username
 * @param username - The Suno username to fetch clips for
 * @param page - The page number to fetch
 * @returns The API response data or null if the request fails
 */
export async function fetchSunoPage(username: string, page: number): Promise<SunoProfile | null> {
  const url = `https://studio-api.prod.suno.com/api/profiles/${username}?clips_sort_by=created_at&playlists_sort_by=created_at&page=${page}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

/**
 * Converts a Suno API clip to a Song object
 * @param clip - The Suno API clip to convert
 * @returns A Song object
 */
export function mapClipToSong(clip: SunoClip): Song {
  return {
    id: clip.id,
    title: clip.title || 'Untitled',
    lyrics: clip.metadata?.prompt || clip.metadata?.gpt_description_prompt || '',
    audioUrl: clip.audio_url,
    imageUrl: clip.image_large_url || clip.image_url,
    tags: clip.metadata?.tags || '',
    matchScore: 0,
  };
}

/**
 * Fetches all songs from Suno API for a given username
 * Handles pagination and deduplication using a Set
 * @param username - The Suno username to fetch songs for
 * @param onProgress - Optional callback to report progress as songs are loaded
 * @returns An array of unique Song objects
 */
export async function fetchAllSunoSongs(
  username: string,
  onProgress?: (songs: Song[]) => void
): Promise<Song[]> {
  const normalizedUsername = username.trim().toLowerCase();
  let page = 0;
  let emptyPages = 0;
  const songsMap = new Map<string, Song>();

  while (emptyPages < 10) {
    const data = await fetchSunoPage(normalizedUsername, page);

    if (!data || !Object.prototype.hasOwnProperty.call(data, 'clips')) {
      emptyPages += 1;
      page += 1;
      continue;
    }

    const pageClips = Array.isArray(data.clips) ? data.clips : [];

    if (pageClips.length === 0) {
      emptyPages += 1;
      page += 1;
      continue;
    }

    emptyPages = 0;
    page += 1;

    // Add new songs to the Map (automatically handles deduplication by id)
    pageClips.forEach((clip: SunoClip) => {
      if (clip.id && !songsMap.has(clip.id)) {
        songsMap.set(clip.id, mapClipToSong(clip));
      }
    });

    // Report progress with current songs
    if (onProgress) {
      onProgress(Array.from(songsMap.values()));
    }
  }

  return Array.from(songsMap.values());
}
