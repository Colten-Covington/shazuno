'use client';

import Image from 'next/image';
import type { Song } from '@/types/speech';

interface SongResultsProps {
  results: Song[];
}

export default function SongResults({ results }: SongResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        🎵 Found {results.length} {results.length === 1 ? 'Match' : 'Matches'}
      </h2>
      
      <div className="space-y-4">
        {results.map((song) => (
          <div
            key={song.id}
            className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-all"
          >
            <div className="flex items-start gap-4">
              {song.imageUrl && (
                <Image
                  src={song.imageUrl}
                  alt={song.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {song.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-green-300 font-semibold">
                    {Math.round(song.matchScore * 100)}% Match
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-300">ID: {song.id}</span>
                </div>
                
                {song.lyrics && (
                  <div className="bg-black/30 rounded p-3 mt-2">
                    <p className="text-sm text-gray-300 line-clamp-3">
                      {song.lyrics}
                    </p>
                  </div>
                )}
                
                {song.audioUrl && (
                  <audio controls className="w-full mt-3">
                    <source src={song.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
