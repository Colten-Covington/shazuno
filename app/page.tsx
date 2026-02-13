import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main id="main-content" className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 shadow-2xl border border-white/20">
              <h2 className="text-4xl font-bold text-white mb-6">
                Welcome to Buzz Stack! 🚀
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                A modern, production-ready Next.js boilerplate with best practices baked in.
                Start building your next great idea with confidence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <FeatureCard 
                  icon="⚡"
                  title="Next.js 15"
                  description="Built on the latest Next.js with App Router for optimal performance"
                />
                <FeatureCard 
                  icon="🎨"
                  title="Tailwind CSS"
                  description="Beautiful, responsive UI with utility-first CSS framework"
                />
                <FeatureCard 
                  icon="📘"
                  title="TypeScript"
                  description="Strict TypeScript for type safety and better developer experience"
                />
                <FeatureCard 
                  icon="♿"
                  title="Accessible"
                  description="WCAG 2.2 AA compliant with keyboard navigation and screen reader support"
                />
              </div>
            </div>
          </section>

          {/* Getting Started Section */}
          <section className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🏁 Getting Started</h3>
            <div className="space-y-4 text-gray-200">
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-400 mb-2"># Install dependencies</p>
                <p className="text-green-400">pnpm install</p>
              </div>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <p className="text-gray-400 mb-2"># Start development server</p>
                <p className="text-green-400">pnpm dev</p>
              </div>
              <p className="text-center text-lg mt-6">
                Open <code className="bg-black/40 px-2 py-1 rounded">localhost:3000</code> to see this page!
              </p>
            </div>
          </section>

          {/* Next Steps Section */}
          <section className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">📚 Next Steps</h3>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📝</span>
                <div>
                  <strong className="text-white">Edit this page:</strong> Open <code className="bg-black/40 px-2 py-1 rounded text-sm">app/page.tsx</code> to customize
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <strong className="text-white">Add components:</strong> Create reusable React components in <code className="bg-black/40 px-2 py-1 rounded text-sm">components/</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <strong className="text-white">Build features:</strong> Add hooks in <code className="bg-black/40 px-2 py-1 rounded text-sm">hooks/</code>, services in <code className="bg-black/40 px-2 py-1 rounded text-sm">services/</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <strong className="text-white">Read docs:</strong> Check out <code className="bg-black/40 px-2 py-1 rounded text-sm">AGENTS.md</code> for architecture and best practices
                </div>
              </li>
            </ul>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-gray-400">
          <p>Built with ❤️ using Buzz Stack</p>
        </footer>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
