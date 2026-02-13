import GitHubLink from './GitHubLink';

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-5xl font-bold text-white">
          <span role="img" aria-label="Musical notes">🎵</span> Shazuno
        </h1>
        <GitHubLink />
      </div>
      <p className="text-xl text-gray-300">
        Shazam-like Song Recognition for Suno.com
      </p>
    </header>
  );
}
