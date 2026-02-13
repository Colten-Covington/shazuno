'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import TextSearch from '@/components/TextSearch';
import SongResults from '@/components/SongResults';
import type { Song } from '@/types/speech';
import { DEFAULT_SUNO_USERNAME } from '@/constants';
import { useSunoSongs, useSongSearch, useModal } from '@/hooks';

// Dynamic import for AudioRecorder (not used on initial render)
const AudioRecorder = dynamic(() => import('@/components/AudioRecorder'), {
  loading: () => (
    <div className="h-12 bg-white/10 rounded-lg animate-pulse" />
  ),
  ssr: false,
});

export default function Home() {
  const [sunoUsername, setSunoUsername] = useState(DEFAULT_SUNO_USERNAME);
  
  // Use custom hooks for song management and search
  const { songs: allSongs, isLoading: isLoadingSongs, loadSongs } = useSunoSongs(DEFAULT_SUNO_USERNAME);
  const { searchQuery, searchResults, isPending, setSearchQuery } = useSongSearch(allSongs);
  const lyricsModal = useModal<Song>();

  // Load songs when username changes
  const handleUsernameChange = (newUsername: string) => {
    setSunoUsername(newUsername);
    loadSongs(newUsername);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

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
              onChange={(e) => handleUsernameChange(e.target.value)}
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
            <TextSearch onSearch={setSearchQuery} isSearching={isPending} songsLoaded={allSongs.length} />
          </section>

          {/* Results */}
          {searchResults.length > 0 && (
            <SongResults results={searchResults} query={searchQuery} onLyricsClick={lyricsModal.open} />
          )}
        </main>
      </div>

      {lyricsModal.isOpen && lyricsModal.data && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={lyricsModal.close}
        >
          <div
            className="bg-slate-900 text-white rounded-lg w-full max-w-3xl h-[80vh] p-6 shadow-2xl flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 id="modal-title" className="text-2xl font-bold">{lyricsModal.data.title}</h3>
                <p className="text-sm text-gray-400">Full lyrics</p>
              </div>
              <button
                type="button"
                onClick={lyricsModal.close}
                className="text-gray-300 hover:text-white focus:ring-2 focus:ring-white rounded px-3 py-1"
              >
                <span aria-hidden="true">✕</span> Close
              </button>
            </div>
            <div className="bg-black/40 rounded-lg p-4 overflow-y-auto whitespace-pre-wrap text-sm text-gray-200" role="document">
              {(lyricsModal.data.lyrics || '')
                .replace(/\r\n/g, '\n')
                .replace(/\/n/g, '\n')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
