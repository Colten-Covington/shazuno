'use client';

import { useState } from 'react';
import { DEFAULT_SUNO_USERNAME } from '@/constants';
import { useSunoSongs } from '@/hooks';

export default function UsernameInput() {
  const [sunoUsername, setSunoUsername] = useState(DEFAULT_SUNO_USERNAME);
  
  const { songs: allSongs, isLoading: isLoadingSongs, loadSongs } = useSunoSongs(DEFAULT_SUNO_USERNAME);

  const handleUsernameChange = (newUsername: string) => {
    setSunoUsername(newUsername);
    loadSongs(newUsername);
  };

  return (
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
  );
}
