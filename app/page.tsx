'use client';

import { useState } from 'react';
import AudioRecorder from '@/components/AudioRecorder';
import TextSearch from '@/components/TextSearch';
import SongResults from '@/components/SongResults';
import type { Song } from '@/types/speech';

export default function Home() {
  const [searchMode, setSearchMode] = useState<'microphone' | 'text'>('text');
  const [sunoUsername, setSunoUsername] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!sunoUsername.trim()) {
      alert('Please enter a Suno username to search');
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          username: sunoUsername,
        }),
      });

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for songs');
    } finally {
      setIsSearching(false);
    }
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
          </div>

          {/* Search Mode Toggle */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setSearchMode('text')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  searchMode === 'text'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                📝 Text Search
              </button>
              <button
                onClick={() => setSearchMode('microphone')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  searchMode === 'microphone'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                🎤 Microphone
              </button>
            </div>

            {searchMode === 'text' ? (
              <TextSearch onSearch={handleSearch} isSearching={isSearching} />
            ) : (
              <AudioRecorder onSearch={handleSearch} isSearching={isSearching} />
            )}
          </div>

          {/* Results */}
          {searchResults.length > 0 && (
            <SongResults results={searchResults} />
          )}
        </div>
      </div>
    </div>
  );
}
