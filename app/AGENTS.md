# /app Directory

**Purpose:** Next.js 15 App Router pages, layouts, and route handlers

## What This Directory Contains

The App Router uses file-system based routing where folders define routes and special files define UI.

## Next.js 15 App Router Conventions

### Special Files

| File | Purpose | Component Type |
|------|---------|----------------|
| `layout.tsx` | Shared UI wrapping pages | Server (default) |
| `page.tsx` | Route UI, makes route public | Server or Client |
| `loading.tsx` | Loading UI with Suspense | Server |
| `error.tsx` | Error boundary UI | Client (required) |
| `not-found.tsx` | 404 UI | Server or Client |
| `route.ts` | API endpoint | Server |

### Server vs Client Components

**Server Components (default):**
- No `'use client'` directive needed
- Can fetch data directly
- No React hooks
- SEO-friendly

**Client Components:**
- Require `'use client'` directive
- Can use hooks (useState, useEffect, etc.)
- Interactive UI
- Browser APIs

### Current Project Structure

```
app/
├── layout.tsx          # Root layout (Server Component)
├── page.tsx            # Home page (Client Component - uses hooks)
├── globals.css         # Global styles
└── AGENTS.md          # This file
```

## Patterns

### Page Component Pattern

```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render */}</div>;
}

// Client Component (needs interactivity)
'use client';

import { useState } from 'react';

export default function Page() {
  const [state, setState] = useState();
  return <div>{/* interactive UI */}</div>;
}
```

### Layout Pattern

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Dynamic Route Pattern

```typescript
// app/songs/[id]/page.tsx
export default function SongPage({
  params,
}: {
  params: { id: string }
}) {
  return <div>Song: {params.id}</div>;
}
```

### API Route Pattern

```typescript
// app/api/search/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Process request
  return NextResponse.json({ result: 'success' });
}
```

## When to Use Server vs Client

### Use Server Components When:
✅ Fetching data from APIs/databases
✅ SEO-critical content
✅ No interactivity needed
✅ Reducing JavaScript bundle

### Use Client Components When:
✅ Using React hooks
✅ Event handlers (onClick, onChange)
✅ Browser APIs (localStorage, window)
✅ Third-party libraries that use hooks

## Component Composition

```typescript
// ✅ GOOD: Server wraps Client
// app/page.tsx (Server Component - no directive)
import ClientComponent from '@/components/ClientComponent';

export default async function Page() {
  const data = await fetchData(); // Server-side
  return <ClientComponent data={data} />;
}

// components/ClientComponent.tsx
'use client';

export default function ClientComponent({ data }) {
  const [state, setState] = useState();
  // Interactive logic
}
```

## Current Project Patterns

### Home Page (app/page.tsx)
- **Type:** Client Component (`'use client'`)
- **Why:** Uses hooks (useSunoSongs, useSongSearch, useState)
- **Pattern:** State management with custom hooks

```typescript
'use client';

import { useSunoSongs, useSongSearch, useModal } from '@/hooks';

export default function Home() {
  // Client-side hooks
  const { songs, isLoading } = useSunoSongs(DEFAULT_SUNO_USERNAME);
  const { searchResults, setSearchQuery } = useSongSearch(songs);
  
  return (/* Interactive UI */);
}
```

### Root Layout (app/layout.tsx)
- **Type:** Server Component (no hooks)
- **Why:** Just wraps children, no interactivity
- **Pattern:** Metadata and document structure

## Best Practices

✅ **Start with Server Components** - Default to server, add 'use client' only when needed
✅ **Keep client boundary low** - Push 'use client' as deep as possible
✅ **Use proper file names** - layout.tsx, page.tsx, error.tsx (lowercase)
✅ **Type your params** - Always define types for route params
✅ **Collocate related files** - Keep components near their usage

❌ **Don't use 'use client' everywhere** - Increases bundle size
❌ **Avoid mixing concerns** - Separate data fetching from presentation
❌ **Don't fetch in client components** - Use Server Components or Server Actions
❌ **Avoid large client bundles** - Split components, use dynamic imports

## Architecture Layering

```
app/page.tsx (Client Component)
    ↓ uses
hooks/ (React state management)
    ↓ calls
services/ (Business logic + caching)
    ↓ uses
lib/ (API clients)
```

## File Naming Conventions

- **Routes:** lowercase with hyphens: `user-profile/`
- **Dynamic:** brackets: `[id]/`, `[...slug]/`
- **Private:** underscore prefix: `_components/` (not routed)
- **Route groups:** parentheses: `(marketing)/` (not in URL)

## References

- [Root AGENTS.md](/AGENTS.md) - Project-wide guidance
- [Next.js Best Practices](../docs/NEXTJS-BEST-PRACTICES.md) - Detailed Next.js patterns
- [Vercel Features](../docs/VERCEL-FEATURES.md) - Platform-specific features
- [Next.js Docs](https://nextjs.org/docs/app) - Official documentation
