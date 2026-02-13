# Next.js 15 Best Practices

## Introduction

This guide covers Next.js 15 App Router best practices, patterns, and conventions for the Shazuno project. Next.js 15 introduces powerful features like Server Components, Server Actions, and improved routing that fundamentally change how we build React applications.

## Table of Contents

- [App Router Architecture](#app-router-architecture)
- [Server vs Client Components](#server-vs-client-components)
- [Dynamic Routes and Slugs](#dynamic-routes-and-slugs)
- [Data Fetching Strategies](#data-fetching-strategies)
- [Server Actions](#server-actions)
- [Middleware (Routing Proxy)](#middleware-routing-proxy)
- [Image Optimization](#image-optimization)
- [Performance Optimization](#performance-optimization)
- [Error Handling](#error-handling)
- [Metadata and SEO](#metadata-and-seo)

## App Router Architecture

### Directory Structure

The App Router uses file-system based routing where folders define routes:

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (/)
├── globals.css         # Global styles
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── loading.tsx         # Loading UI
│
├── [username]/         # Dynamic route
│   ├── page.tsx        # /[username]
│   └── layout.tsx      # Layout for username pages
│
├── api/                # API routes
│   └── search/
│       └── route.ts    # /api/search endpoint
│
└── (group)/            # Route group (doesn't affect URL)
    ├── layout.tsx      # Shared layout
    └── page.tsx
```

### File Conventions

| File | Purpose | Required |
|------|---------|----------|
| `layout.tsx` | Shared UI for segment and children | ✅ (root) |
| `page.tsx` | Unique UI for route, makes route publicly accessible | ✅ |
| `loading.tsx` | Loading UI with Suspense boundary | ❌ |
| `error.tsx` | Error UI with Error boundary | ❌ |
| `not-found.tsx` | 404 UI when notFound() is called | ❌ |
| `template.tsx` | Re-renders on navigation (vs layout which persists) | ❌ |
| `default.tsx` | Fallback UI for Parallel Routes | ❌ |

### Current Project Structure

```typescript
// app/layout.tsx - Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Skip nav link for accessibility */}
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
```

```typescript
// app/page.tsx - Home page
'use client'; // Client Component (needs hooks/interactivity)

export default function Home() {
  // Component logic
}
```

### Best Practices

✅ **Keep layouts minimal** - Layouts re-render on every route change within their segment
✅ **Use route groups** - Organize related routes without affecting URLs: `(marketing)`, `(app)`
✅ **Collocate components** - Place components near where they're used
✅ **Shared components** - Put reusable components in `/components`

❌ **Don't over-nest** - Too many nested layouts can hurt performance
❌ **Avoid state in layouts** - State persists across routes, can cause unexpected behavior

## Server vs Client Components

### The Fundamental Change

Next.js 15 introduces **Server Components by default**. This is a paradigm shift:

```typescript
// ✅ Server Component (default - no directive needed)
// app/songs/page.tsx
export default async function SongsPage() {
  // Can fetch data directly in component
  const songs = await fetchSongs();
  
  return <div>{/* Render songs */}</div>;
}

// ✅ Client Component (explicit 'use client' directive)
// app/search/page.tsx
'use client';

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  // Interactive client-side logic
}
```

### When to Use Each

#### Use Server Components (Default) When:
- ✅ Fetching data from APIs or databases
- ✅ Accessing backend resources directly
- ✅ Keeping sensitive information on server (API keys)
- ✅ Reducing JavaScript bundle size
- ✅ SEO-critical content

#### Use Client Components ('use client') When:
- ✅ Using React hooks (useState, useEffect, useContext)
- ✅ Handling browser APIs (localStorage, window, navigator)
- ✅ Interactive UI (event handlers, user input)
- ✅ Using browser-only libraries
- ✅ Class components (if migrating legacy code)

### Current Project Examples

**Client Component (app/page.tsx):**
```typescript
'use client'; // Needs hooks and interactivity

import { useState } from 'react';
import { useSunoSongs, useSongSearch } from '@/hooks';

export default function Home() {
  // Uses React hooks for state management
  const [username, setUsername] = useState('beginbot');
  const { songs, isLoading } = useSunoSongs(username);
  
  // Client-side interactivity
  return (
    <div>
      <input 
        onChange={(e) => setUsername(e.target.value)} 
        value={username}
      />
    </div>
  );
}
```

**Server Component (future pattern):**
```typescript
// No 'use client' directive - Server Component
// app/songs/[username]/page.tsx

import { fetchSunoSongs } from '@/lib/suno';

export default async function UserSongsPage({
  params,
}: {
  params: { username: string }
}) {
  // Fetch data directly on server
  const songs = await fetchSunoSongs(params.username);
  
  return (
    <div>
      <h1>Songs by {params.username}</h1>
      {songs.map(song => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}
```

### Best Practices

✅ **Start with Server Components** - Default to server, add 'use client' only when needed
✅ **Keep client boundary low** - Push 'use client' as deep in tree as possible
✅ **Compose server and client** - Server components can import client components
✅ **Split components** - Extract interactive parts into separate client components

❌ **Don't use 'use client' everywhere** - Defeats purpose of Server Components
❌ **Avoid importing server code in client** - Will bundle on client (security risk)
❌ **Don't fetch in client components** - Use Server Components or Server Actions instead

### Component Composition Pattern

```typescript
// ✅ GOOD: Server Component wraps Client Component
// app/page.tsx (Server Component - no directive)
import ClientSearch from '@/components/ClientSearch';

export default async function Page() {
  const initialData = await fetchData(); // Server-side fetch
  
  return (
    <div>
      <ClientSearch initialData={initialData} />
    </div>
  );
}

// components/ClientSearch.tsx
'use client';

import { useState } from 'react';

export default function ClientSearch({ initialData }) {
  const [query, setQuery] = useState('');
  // Client-side interactivity
}
```

## Dynamic Routes and Slugs

### Route Patterns

```typescript
// [slug] - Single dynamic segment
app/songs/[id]/page.tsx         → /songs/123

// [...slug] - Catch-all segment
app/search/[...query]/page.tsx  → /search/rock/songs

// [[...slug]] - Optional catch-all
app/docs/[[...slug]]/page.tsx   → /docs OR /docs/intro OR /docs/api/routes
```

### Accessing Route Parameters

```typescript
// app/songs/[id]/page.tsx
export default function SongPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <div>Song ID: {params.id}</div>;
}

// Usage:
// /songs/abc123 → params.id = "abc123"
// /songs/abc123?view=full → searchParams.view = "full"
```

### Generating Static Params

For static generation at build time:

```typescript
// app/songs/[id]/page.tsx
export async function generateStaticParams() {
  const songs = await fetchAllSongs();
  
  return songs.map((song) => ({
    id: song.id,
  }));
}

export default function SongPage({ params }: { params: { id: string } }) {
  // Page will be pre-rendered for each id
}
```

### Dynamic Metadata

```typescript
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}) {
  const song = await fetchSong(params.id);
  
  return {
    title: song.title,
    description: song.lyrics.slice(0, 160),
  };
}
```

### Best Practices

✅ **Type your params** - Always define types for params and searchParams
✅ **Validate params** - Check for invalid/missing params and handle gracefully
✅ **Use generateStaticParams** - Pre-render common routes at build time
✅ **Handle not found** - Call notFound() for invalid params

❌ **Don't trust params** - Always validate and sanitize user input
❌ **Avoid too many segments** - Keep URLs readable: 2-3 levels max
❌ **Don't use client-side routing for SEO pages** - Use proper dynamic routes

## Data Fetching Strategies

### Server-Side Fetching (Recommended)

```typescript
// ✅ Server Component - Fetch directly
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // Default: cache
  });
  
  const json = await data.json();
  return <div>{/* Use data */}</div>;
}
```

### Caching Strategies

```typescript
// 1. Force cache (default)
fetch(url, { cache: 'force-cache' });

// 2. No cache (always fresh)
fetch(url, { cache: 'no-store' });

// 3. Revalidate after time
fetch(url, { next: { revalidate: 3600 } }); // 1 hour

// 4. Tag-based revalidation
fetch(url, { next: { tags: ['songs'] } });
// Later: revalidateTag('songs');
```

### Parallel Data Fetching

```typescript
// ✅ Fetch in parallel
export default async function Page() {
  const [user, songs, playlists] = await Promise.all([
    fetchUser(),
    fetchSongs(),
    fetchPlaylists(),
  ]);
  
  return <Dashboard user={user} songs={songs} playlists={playlists} />;
}
```

### Streaming with Suspense

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Header /> {/* Renders immediately */}
      
      <Suspense fallback={<Skeleton />}>
        <SlowComponent /> {/* Streams in when ready */}
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch();
  return <div>{data}</div>;
}
```

### Best Practices

✅ **Fetch at component level** - Co-locate data fetching with components
✅ **Use caching** - Leverage built-in request memoization
✅ **Stream long operations** - Use Suspense for better perceived performance
✅ **Handle errors** - Use error boundaries for fetch failures

❌ **Don't fetch in client components** - Use Server Components or Server Actions
❌ **Avoid waterfalls** - Fetch data in parallel when possible
❌ **Don't over-cache** - Balance freshness vs performance

## Server Actions

Server Actions allow server-side mutations from client components:

### Basic Server Action

```typescript
// app/actions.ts
'use server';

export async function createSong(formData: FormData) {
  const title = formData.get('title') as string;
  
  // Server-side logic
  const song = await db.songs.create({ title });
  
  // Revalidate cache
  revalidatePath('/songs');
  
  return { success: true, id: song.id };
}
```

### Using in Client Component

```typescript
// app/create-song/page.tsx
'use client';

import { createSong } from '@/app/actions';
import { useFormStatus } from 'react-dom';

export default function CreateSongForm() {
  return (
    <form action={createSong}>
      <input name="title" required />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Creating...' : 'Create Song'}
    </button>
  );
}
```

### Progressive Enhancement

Server Actions work without JavaScript:

```typescript
<form action={serverAction}>
  {/* Works even if JS fails to load */}
  <input name="query" />
  <button type="submit">Search</button>
</form>
```

### Best Practices

✅ **Use for mutations** - Create, update, delete operations
✅ **Validate input** - Always validate on server
✅ **Return serializable data** - Only JSON-compatible data
✅ **Revalidate caches** - Use revalidatePath/revalidateTag

❌ **Don't use for reads** - Use Server Components instead
❌ **Avoid large payloads** - Keep form data reasonable
❌ **Don't return sensitive data** - Will be visible to client

## Middleware (Routing Proxy)

### Basic Middleware

```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read/modify request
  const response = NextResponse.next();
  
  // Set custom header
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

export const config = {
  matcher: '/api/:path*', // Only run on /api routes
};
```

### Common Patterns

**Authentication:**
```typescript
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

**Custom Headers:**
```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  
  return response;
}
```

**Request Rewriting:**
```typescript
export function middleware(request: NextRequest) {
  // Rewrite /old-path to /new-path
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.rewrite(new URL('/new-path', request.url));
  }
}
```

### Edge Runtime

Middleware runs on Edge Runtime (not Node.js):

✅ **Can use:**
- fetch API
- Headers, Cookies
- URL manipulation
- NextResponse/NextRequest

❌ **Cannot use:**
- Node.js APIs (fs, path, etc.)
- Heavy dependencies
- Database connections (use Edge-compatible SDKs)

### Best Practices

✅ **Keep middleware lightweight** - Runs on every request
✅ **Use matcher config** - Only run on necessary routes
✅ **Handle errors gracefully** - Don't break the entire app
✅ **Use for auth/headers** - Perfect for cross-cutting concerns

❌ **Don't do heavy processing** - Will slow down all requests
❌ **Avoid database calls** - Use Edge-compatible solutions
❌ **Don't use for business logic** - Keep in route handlers/actions

## Image Optimization

### Using next/image

```typescript
import Image from 'next/image';

// ✅ Automatic optimization
<Image
  src="/song-cover.jpg"
  alt="Song cover"
  width={300}
  height={300}
  priority // Load immediately
/>

// ✅ Remote images (requires config)
<Image
  src="https://cdn2.suno.ai/image.jpg"
  alt="Suno artwork"
  width={300}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/..." // Low-res placeholder
/>
```

### Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.suno.ai',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200], // Responsive breakpoints
  },
};
```

### Responsive Images

```typescript
<Image
  src="/hero.jpg"
  alt="Hero"
  fill // Fill parent container
  sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes
  style={{ objectFit: 'cover' }}
/>
```

### Best Practices

✅ **Always use next/image** - Automatic optimization and lazy loading
✅ **Provide width/height** - Prevents layout shift (CLS)
✅ **Use priority for LCP** - For above-fold images
✅ **Configure remote patterns** - Whitelist external domains

❌ **Don't use <img> tags** - Miss out on optimizations
❌ **Avoid inline images** - Use next/image for all images
❌ **Don't skip alt text** - Critical for accessibility

## Performance Optimization

### Code Splitting

```typescript
// ✅ Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't render on server
});

export default function Page() {
  return <HeavyComponent />;
}
```

### Route Segment Config

```typescript
// app/page.tsx
export const dynamic = 'force-dynamic'; // Always dynamic
export const revalidate = 3600; // Revalidate every hour
export const runtime = 'edge'; // Run on Edge Runtime
export const preferredRegion = 'auto'; // Deploy globally
```

### Font Optimization

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Avoid FOIT
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build

# Environment variable for detailed analysis
ANALYZE=true npm run build
```

### Best Practices

✅ **Use dynamic imports** - For large, rarely-used components
✅ **Optimize fonts** - Use next/font for automatic optimization
✅ **Minimize client JS** - Prefer Server Components
✅ **Monitor bundle size** - Keep under budget

❌ **Don't import entire libraries** - Use tree-shakeable imports
❌ **Avoid large dependencies** - Check bundle impact before adding
❌ **Don't client-render everything** - Use server when possible

## Error Handling

### Error Boundaries

```typescript
// app/error.tsx - Catches errors in app directory
'use client'; // Must be client component

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Not Found

```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// In page component:
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const data = await fetchData(params.id);
  
  if (!data) {
    notFound(); // Shows not-found.tsx
  }
  
  return <div>{data}</div>;
}
```

### Global Error

```typescript
// app/global-error.tsx - Catches errors in root layout
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

### Best Practices

✅ **Use error boundaries** - Handle errors gracefully at each level
✅ **Provide recovery** - Offer reset button or alternative actions
✅ **Log errors** - Send to monitoring service (Sentry, etc.)
✅ **Show helpful messages** - Guide users on what to do

❌ **Don't ignore errors** - Always handle potential failures
❌ **Avoid generic messages** - Be specific about what went wrong
❌ **Don't expose internals** - Hide technical details from users

## Metadata and SEO

### Static Metadata

```typescript
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shazuno - Song Recognition for Suno',
  description: 'Shazam-like application for Suno.com songs',
  openGraph: {
    title: 'Shazuno',
    description: 'Find songs by lyrics',
    images: ['/og-image.jpg'],
  },
};
```

### Dynamic Metadata

```typescript
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const song = await fetchSong(params.id);
  
  return {
    title: song.title,
    description: song.lyrics.slice(0, 160),
    openGraph: {
      images: [song.imageUrl],
    },
  };
}
```

### Viewport and Theme

```typescript
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: 'black' },
];
```

### Best Practices

✅ **Set metadata at page level** - Use generateMetadata for dynamic content
✅ **Include Open Graph** - For social media sharing
✅ **Add structured data** - JSON-LD for rich snippets
✅ **Optimize titles** - 50-60 characters, include keywords

❌ **Don't duplicate metadata** - Define once per route
❌ **Avoid missing descriptions** - Critical for SEO
❌ **Don't forget alt text** - Images need descriptions

## Conclusion

Next.js 15 App Router represents a fundamental shift in how we build React applications. Key takeaways:

1. **Server Components by default** - Think server-first, add client interactivity as needed
2. **File-system routing** - Clear conventions for routes, layouts, and special files
3. **Built-in optimizations** - Images, fonts, and code splitting handled automatically
4. **Server Actions** - Progressive enhancement with server-side mutations
5. **Streaming and Suspense** - Better loading states and perceived performance

For detailed Vercel-specific features, see [VERCEL-FEATURES.md](VERCEL-FEATURES.md).

## Related Documentation

- [Architecture](ARCHITECTURE.md) - System architecture and layering
- [Best Practices](BEST_PRACTICES.md) - General coding standards
- [Vercel Features](VERCEL-FEATURES.md) - Platform-specific guidance
- [Next.js Documentation](https://nextjs.org/docs) - Official docs
