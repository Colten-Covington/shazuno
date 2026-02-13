'use client';

import TextSearch from '@/components/TextSearch';
import SongResults from '@/components/SongResults';
import type { Song } from '@/types/speech';
import { useSunoSongs, useSongSearch, useModal } from '@/hooks';
import { DEFAULT_SUNO_USERNAME } from '@/constants';
import LyricsModal from '@/components/LyricsModal';

export default function SearchSection() {
  const { songs: allSongs } = useSunoSongs(DEFAULT_SUNO_USERNAME);
  const { searchQuery, searchResults, isPending, setSearchQuery } = useSongSearch(allSongs);
  const lyricsModal = useModal<Song>();

  return (
    <>
      {/* Search */}
      <section className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-6 shadow-xl" aria-labelledby="search-heading">
        <h2 id="search-heading" className="sr-only">Search Songs by Lyrics</h2>
        <TextSearch onSearch={setSearchQuery} isSearching={isPending} songsLoaded={allSongs.length} />
      </section>

      {/* Results */}
      {searchResults.length > 0 && (
        <SongResults results={searchResults} query={searchQuery} onLyricsClick={lyricsModal.open} />
      )}

      {/* Modal */}
      {lyricsModal.isOpen && lyricsModal.data && (
        <LyricsModal song={lyricsModal.data} onClose={lyricsModal.close} />
      )}
    </>
  );
}
