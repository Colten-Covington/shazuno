# /app Directory

**Purpose:** Next.js 15 App Router pages, layouts, and route handlers

## What This Directory Contains

- **page.tsx** - Main application page with search functionality
- **layout.tsx** - Root layout with metadata and global structure  
- **globals.css** - Global styles and Tailwind CSS imports

## Key Patterns

### Client Components
All pages use `'use client'` directive for browser APIs and React hooks:
```typescript
'use client';
import { useState, useEffect } from 'react';
```

### State Management
Centralized in page.tsx using React hooks - no external state library needed.

### Performance
- useDeferredValue for responsive search input
- useTransition for non-blocking updates
- useMemo for expensive calculations

## Creating New Pages

```typescript
// app/new-page/page.tsx
'use client';

export default function NewPage() {
  return <div>Content</div>;
}
```

## Adding API Routes

Create in `app/api/` subdirectory:
```typescript
// app/api/route-name/route.ts
export async function GET(request: Request) {
  return Response.json({ data: 'value' });
}
```

## References

- [Root AGENTS.md](/AGENTS.md) - Project-wide guidelines
- [Next.js App Router Docs](https://nextjs.org/docs/app)
