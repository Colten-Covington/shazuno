'use client';

import { useState, useEffect } from 'react';
import TextSearch from '@/components/TextSearch';
import SongResults from '@/components/SongResults';
import { calculateSimilarity } from '@/utils/similarity';
import type { Song } from '@/types/speech';

export default function Home() {
  const [sunoUsername, setSunoUsername] = useState('beginbot');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const fetchSunoPage = async (username: string, page: number) => {
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
  };

  const calculateResults = (query: string, songs: Song[]) => {
    if (!query.trim() || songs.length === 0) {
      return [] as Song[];
    }

    const scoredSongs = songs.map((song) => ({
      ...song,
      matchScore: calculateSimilarity(song.lyrics, query),
    }));

    return scoredSongs
      .filter((song) => song.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);
  };

  // Load all songs from Suno API when username changes
  useEffect(() => {
    const loadSongs = async () => {
      if (!sunoUsername.trim()) {
        setAllSongs([]);
        setSearchResults([]);
        setSearchQuery('');
        return;
      }

      setIsLoadingSongs(true);
      try {
        const normalizedUsername = sunoUsername.trim().toLowerCase();
        let page = 0;
        let emptyPages = 0;
        let clips: Song[] = [];
        const seenIds = new Set<string>();

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

          const mappedClips = pageClips
            .map((clip: any) => ({
              id: clip.id,
              title: clip.title || 'Untitled',
              lyrics: clip.metadata?.prompt || clip.metadata?.gpt_description_prompt || '',
              audioUrl: clip.audio_url,
              imageUrl: clip.image_large_url || clip.image_url,
              tags: clip.metadata?.tags || '',
              matchScore: 0,
            }))
            .filter((clip: Song) => {
              if (!clip.id || seenIds.has(clip.id)) {
                return false;
              }

              seenIds.add(clip.id);
              return true;
            });

          clips = clips.concat(mappedClips);
          setAllSongs([...clips]);
        }

        setAllSongs(clips);
        if (searchQuery.trim()) {
          setSearchResults(calculateResults(searchQuery, clips));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error loading songs:', error);
        alert('Error loading songs');
      } finally {
        setIsLoadingSongs(false);
      }
    };

    // Debounce the load to avoid too many requests while typing
    const timer = setTimeout(loadSongs, 500);
    return () => clearTimeout(timer);
  }, [sunoUsername]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const results = calculateResults(searchQuery, allSongs);
    setSearchResults(results);
    setIsSearching(false);
  }, [allSongs, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🎵 Shazuno
          </h1>
          <p className="text-xl text-gray-300">
            Shazam-like Song Recognition for Suno.com
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          {/* Username Input */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl">
            <label className="block text-white text-sm font-bold mb-2">
              Suno Username
            </label>
            <input
              type="text"
              value={sunoUsername}
              onChange={(e) => setSunoUsername(e.target.value)}
              placeholder="Enter Suno.com username"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {isLoadingSongs && (
              <p className="text-sm text-gray-400 mt-2">Loading songs...</p>
            )}
            {allSongs.length > 0 && !isLoadingSongs && (
              <p className="text-sm text-green-400 mt-2">
                ✓ Loaded {allSongs.length} song{allSongs.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Search */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl">
            <TextSearch onSearch={handleSearch} isSearching={isSearching} songsLoaded={allSongs.length} />
          </div>

          {/* Results */}
          {searchResults.length > 0 && (
            <SongResults results={searchResults} query={searchQuery} onLyricsClick={setActiveSong} />
          )}
        </div>
      </div>

      {activeSong && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveSong(null)}
        >
          <div
            className="bg-slate-900 text-white rounded-lg w-full max-w-3xl h-[80vh] p-6 shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold">{activeSong.title}</h3>
                <p className="text-sm text-gray-400">Full lyrics</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSong(null)}
                className="text-gray-300 hover:text-white"
                aria-label="Close lyrics modal"
              >
                Close
              </button>
            </div>
            <div className="bg-black/40 rounded-lg p-4 overflow-y-auto whitespace-pre-wrap text-sm text-gray-200">
              {(activeSong.lyrics || '')
                .replace(/\r\n/g, '\n')
                .replace(/\/n/g, '\n')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
