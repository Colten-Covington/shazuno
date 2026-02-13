export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-14 w-64 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-10 w-32 bg-white/10 rounded-lg animate-pulse" />
          </div>
          <div className="h-6 w-96 mx-auto bg-white/10 rounded animate-pulse" />
        </header>

        <main className="max-w-2xl mx-auto">
          {/* Username Input Skeleton */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
            <div className="h-6 w-32 bg-white/20 rounded mb-3 animate-pulse" />
            <div className="h-12 w-full bg-white/20 rounded animate-pulse" />
          </div>

          {/* Search Box Skeleton */}
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-8">
            <div className="h-6 w-48 bg-white/20 rounded mb-3 animate-pulse" />
            <div className="h-12 w-full bg-white/20 rounded mb-4 animate-pulse" />
            <div className="h-12 w-full bg-white/20 rounded animate-pulse" />
          </div>

          {/* Results Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/20 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-3/4 bg-white/20 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/20 rounded animate-pulse" />
                    <div className="h-20 w-full bg-white/20 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
