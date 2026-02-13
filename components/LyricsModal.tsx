'use client';

import type { Song } from '@/types/speech';

interface LyricsModalProps {
  song: Song;
  onClose: () => void;
}

export default function LyricsModal({ song, onClose }: LyricsModalProps) {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 text-white rounded-lg w-full max-w-3xl h-[80vh] p-6 shadow-2xl flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 id="modal-title" className="text-2xl font-bold">{song.title}</h3>
            <p className="text-sm text-gray-400">Full lyrics</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white focus:ring-2 focus:ring-white rounded px-3 py-1"
          >
            <span aria-hidden="true">✕</span> Close
          </button>
        </div>
        <div className="bg-black/40 rounded-lg p-4 overflow-y-auto whitespace-pre-wrap text-sm text-gray-200" role="document">
          {(song.lyrics || '')
            .replace(/\r\n/g, '\n')
            .replace(/\/n/g, '\n')}
        </div>
      </div>
    </div>
  );
}
