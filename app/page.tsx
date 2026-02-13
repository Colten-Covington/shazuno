'use client';

import { useState, useEffect, useCallback, useMemo, useTransition, useDeferredValue } from 'react';
import TextSearch from '@/components/TextSearch';
import SongResults from '@/components/SongResults';
import { calculateSimilarity } from '@/utils/similarity';
import { fetchAllSunoSongs } from '@/lib/suno';
import type { Song } from '@/types/speech';

export default function Home() {
  const [sunoUsername, setSunoUsername] = useState('beginbot');
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isLoadingSongs, setIsLoadingSongs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [isPending, startTransition] = useTransition();
  // Defer the search query to keep input responsive
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const calculateResults = useCallback((query: string, songs: Song[]) => {
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
  }, []);

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
        const songs = await fetchAllSunoSongs(
          sunoUsername,
          (progressSongs) => {
            // Update UI with progressive results
            setAllSongs([...progressSongs]);
          }
        );

        setAllSongs(songs);
        if (searchQuery.trim()) {
          setSearchResults(calculateResults(searchQuery, songs));
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

  // Use useDeferredValue instead of debouncing - React handles the timing optimally
  // Memoize results calculation to avoid recalculating unless inputs change
  const memoizedResults = useMemo(() => {
    if (!deferredSearchQuery || allSongs.length === 0) {
      return [];
    }
    return calculateResults(deferredSearchQuery, allSongs);
  }, [deferredSearchQuery, allSongs, calculateResults]);

  // Update results asynchronously with useTransition to prevent blocking input
  useEffect(() => {
    startTransition(() => {
      setSearchResults(memoizedResults);
    });
  }, [memoizedResults, startTransition]);

  const handleSearch = useCallback((query: string) => {
    // Direct update without startTransition - useDeferredValue handles the deferral
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-white">
              <span role="img" aria-label="Musical notes">🎵</span> Shazuno
            </h1>
            <a
              href="https://github.com/Colten-Covington/shazuno"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="View Shazuno project on GitHub"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <p className="text-xl text-gray-300">
            Shazam-like Song Recognition for Suno.com
          </p>
        </header>

        <main id="main-content" className="max-w-2xl mx-auto">
          {/* Username Input */}
          <section className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl" aria-labelledby="username-heading">
            <h2 id="username-heading" className="sr-only">Configure Suno Username</h2>
            <label htmlFor="suno-username-input" className="block text-white text-sm font-bold mb-2">
              Suno Username
            </label>
            <input
              id="suno-username-input"
              type="text"
              value={sunoUsername}
              onChange={(e) => setSunoUsername(e.target.value)}
              placeholder="Enter Suno.com username"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-describedby="username-status"
            />
            <div id="username-status" aria-live="polite" aria-atomic="true">
              {isLoadingSongs && (
                <p className="text-sm text-gray-400 mt-2">Loading songs...</p>
              )}
              {allSongs.length > 0 && !isLoadingSongs && (
                <p className="text-sm text-green-400 mt-2">
                  <span role="img" aria-label="Checkmark">✓</span> Loaded {allSongs.length} song{allSongs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </section>

          {/* Search */}
          <section className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl" aria-labelledby="search-heading">
            <h2 id="search-heading" className="sr-only">Search Songs by Lyrics</h2>
            <TextSearch onSearch={handleSearch} isSearching={isPending} songsLoaded={allSongs.length} />
          </section>

          {/* Results */}
          {searchResults.length > 0 && (
            <SongResults results={searchResults} query={searchQuery} onLyricsClick={setActiveSong} />
          )}
        </main>
      </div>

      {activeSong && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setActiveSong(null)}
        >
          <div
            className="bg-slate-900 text-white rounded-lg w-full max-w-3xl h-[80vh] p-6 shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 id="modal-title" className="text-2xl font-bold">{activeSong.title}</h3>
                <p className="text-sm text-gray-400">Full lyrics</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSong(null)}
                className="text-gray-300 hover:text-white focus:ring-2 focus:ring-white rounded px-3 py-1"
                aria-label="Close lyrics modal"
              >
                <span aria-hidden="true">✕</span> Close
              </button>
            </div>
            <div className="bg-black/40 rounded-lg p-4 overflow-y-auto whitespace-pre-wrap text-sm text-gray-200" role="document" aria-label="Song lyrics content">
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
