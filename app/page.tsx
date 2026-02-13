import Header from '@/components/Header';
import UsernameInput from '@/components/UsernameInput';
import SearchSection from '@/components/SearchSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main id="main-content" className="max-w-2xl mx-auto">
          <UsernameInput />
          <SearchSection />
        </main>
      </div>
    </div>
  );
}
