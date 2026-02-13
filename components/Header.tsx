import GitHubLink from './GitHubLink';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  emoji?: string;
}

export default function Header({ 
  title = "Buzz Stack",
  subtitle = "Next.js 15 + React 18 + TypeScript + Tailwind CSS",
  emoji = "⚡"
}: HeaderProps) {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-5xl font-bold text-white">
          <span role="img" aria-label="App icon">{emoji}</span> {title}
        </h1>
        <GitHubLink />
      </div>
      <p className="text-xl text-gray-300">
        {subtitle}
      </p>
    </header>
  );
}
