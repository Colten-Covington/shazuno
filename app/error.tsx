'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-lg p-8 text-center">
        <div className="text-6xl mb-4" role="img" aria-label="Error">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-300 mb-6">
          An error occurred while loading the page. Please try again.
        </p>
        {error.message && (
          <p className="text-sm text-gray-400 mb-6 font-mono bg-black/30 p-3 rounded">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
