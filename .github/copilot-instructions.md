# GitHub Copilot Instructions for Shazuno

This file provides context and guidelines for GitHub Copilot when working on the Shazuno codebase.

## Project Overview

Shazuno is a Shazam-like web application for searching songs from Suno.com using text or voice input. It's built with Next.js 15, React 18, TypeScript, and Tailwind CSS, following modern web development best practices with a focus on accessibility and performance.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 18 with hooks
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Package Manager:** pnpm 9.0.0
- **Voice Recognition:** Web Speech API (browser native)
- **External API:** Suno API (https://studio-api.prod.suno.com)

## Project Structure

```
/app         - Next.js App Router pages and layouts
/components  - Reusable React components
/lib         - Business logic and API integration
/utils       - Utility functions (algorithms, helpers)
/types       - TypeScript type definitions
/docs        - Comprehensive documentation
```

## Code Style Guidelines

### TypeScript

- **Always use explicit types** - Never use `any`
- **Strict mode enabled** - Follow all TypeScript strict rules
- **Interfaces over types** - Prefer `interface` for object shapes
- **Type inference** - Let TypeScript infer obvious types
- **Custom types** - Define types in `/types` directory for reusability

Example:
```typescript
// ✅ Good
interface SongProps {
  title: string;
  lyrics: string;
  matchScore: number;
}

function processSong(song: SongProps): string {
  return song.title;
}

// ❌ Avoid
function processSong(song: any) {
  return song.title;
}
```

### React Components

- **Functional components only** - No class components
- **'use client' directive** - Add when using hooks or browser APIs
- **Props interfaces** - Always define typed interfaces for props
- **Hooks organization** - State → Callbacks → Effects → Render
- **Component exports** - Use default export for components

Example:
```typescript
'use client';

import { useState, useCallback } from 'react';

interface Props {
  title: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBox({ title, onSearch, isLoading = false }: Props) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      onSearch(query);
    }
  }, [query, onSearch]);
  
  return (
    <div className="p-4">
      {/* Component JSX */}
    </div>
  );
}
```

### Tailwind CSS

- **Utility-first approach** - Use Tailwind utilities instead of custom CSS
- **No inline styles** - Avoid `style` prop unless absolutely necessary
- **Responsive design** - Mobile-first with `md:` and `lg:` breakpoints
- **State variants** - Use `hover:`, `focus:`, `disabled:` modifiers
- **Consistent spacing** - Use Tailwind's spacing scale (p-4, gap-2, etc.)

Example:
```tsx
<button
  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg transition-colors disabled:opacity-50"
  disabled={isLoading}
>
  Search
</button>
```

### Performance Patterns

- **useMemo** - Memoize expensive calculations
- **useCallback** - Stabilize function references
- **useTransition** - Non-blocking state updates
- **useDeferredValue** - Defer non-urgent updates
- **Map for deduplication** - Use `Map<string, T>` instead of `Array + Set`

Example:
```typescript
// Memoize expensive calculations
const results = useMemo(() => {
  return songs.map(song => ({
    ...song,
    score: calculateSimilarity(song.lyrics, query)
  })).filter(song => song.score > 0);
}, [songs, query]);

// Non-blocking updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setResults(newResults);
});
```

### Accessibility Patterns

- **Semantic HTML** - Use `<main>`, `<section>`, `<article>`, `<button>` appropriately
- **ARIA when needed** - Only add ARIA attributes when semantic HTML isn't enough
- **Keyboard support** - Ensure all interactive elements are keyboard accessible
- **Focus indicators** - Always include `focus:ring-2` or similar
- **Screen readers** - Use `sr-only` class for screen-reader-only text
- **Labels and descriptions** - Associate labels with inputs using `htmlFor`/`id`

Example:
```tsx
<section aria-labelledby="search-heading">
  <h2 id="search-heading" className="sr-only">Search Songs</h2>
  
  <label htmlFor="search-input" className="block text-sm font-medium">
    Search Query
  </label>
  <input
    id="search-input"
    type="text"
    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
  
  <button className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2">
    Search
  </button>
</section>
```

## Naming Conventions

- **Components:** PascalCase - `AudioRecorder.tsx`, `SongResults.tsx`
- **Utilities:** camelCase - `similarity.ts`, `suno.ts`
- **Functions:** camelCase - `calculateSimilarity()`, `fetchAllSunoSongs()`
- **Constants:** UPPER_SNAKE_CASE - `MAX_RESULTS`, `DEFAULT_USERNAME`
- **Interfaces:** PascalCase - `SongProps`, `SearchOptions`
- **Types:** PascalCase - `Song`, `SunoClip`

## Common Patterns in This Codebase

### API Integration Pattern (lib/suno.ts)

```typescript
// Fetch with error handling
export async function fetchSunoPage(username: string, page: number): Promise<SunoProfile | null> {
  const url = `https://studio-api.prod.suno.com/api/profiles/${username}?page=${page}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    return null;  // Handle errors gracefully
  }
  
  return response.json();
}

// Use Map for deduplication
const songsMap = new Map<string, Song>();
clips.forEach(clip => {
  songsMap.set(clip.id, mapClipToSong(clip));
});
return Array.from(songsMap.values());
```

### Search Algorithm Pattern (utils/similarity.ts)

```typescript
// Normalize, then compare
function normalize(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s]/g, '');
}

// Word-based matching with Set for O(1) lookup
const lyricsWords = new Set(lyrics.split(/\s+/));
const queryWords = query.split(/\s+/);
let matchingWords = 0;
for (const word of queryWords) {
  if (lyricsWords.has(word)) {
    matchingWords++;
  }
}
```

### State Management Pattern (app/page.tsx)

```typescript
// Debounced API calls
useEffect(() => {
  const timer = setTimeout(() => {
    fetchSongs(username);
  }, 500);
  return () => clearTimeout(timer);
}, [username]);

// Deferred search query
const deferredQuery = useDeferredValue(searchQuery);

// Memoized results
const results = useMemo(() => {
  return calculateResults(deferredQuery, allSongs);
}, [deferredQuery, allSongs]);
```

## Best Practices

### Do's ✅

- Use TypeScript strict mode - no `any` types
- Add `'use client'` directive when using hooks or browser APIs
- Use semantic HTML over ARIA attributes when possible
- Memoize expensive calculations with useMemo
- Use useCallback for functions passed as props
- Handle errors gracefully (return null, show user feedback)
- Add loading states for async operations
- Use Tailwind utilities instead of custom CSS
- Follow mobile-first responsive design
- Support keyboard navigation
- Add focus indicators to interactive elements
- Document complex algorithms with comments
- Use Map for deduplication instead of Array + Set
- Debounce expensive operations (API calls, search)

### Don'ts ❌

- Don't use class components
- Don't use `any` type
- Don't use inline styles (use Tailwind)
- Don't use `var` (use `const` or `let`)
- Don't ignore TypeScript errors
- Don't add ARIA attributes redundantly
- Don't remove focus outlines without custom focus styles
- Don't use `dangerouslySetInnerHTML`
- Don't use `eval()` or `Function()` constructor
- Don't hardcode values that should be configurable
- Don't create custom CSS files (use Tailwind utilities)
- Don't use `focus:outline-none` without custom focus styles

## File Templates

### New Component Template

```typescript
'use client';

import { useState } from 'react';

interface ComponentNameProps {
  // Define props
}

export default function ComponentName({ /* props */ }: ComponentNameProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleAction = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="p-4">
      {/* JSX */}
    </div>
  );
}
```

### New Utility Function Template

```typescript
/**
 * Brief description of what this function does
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 */
export function functionName(param1: Type1, param2: Type2): ReturnType {
  // Implementation
  return result;
}
```

## Dependencies

### Current Dependencies (Keep These)

```json
{
  "next": "^15.0.8",
  "react": "^18.3.0",
  "react-dom": "^18.3.0"
}
```

### Dev Dependencies (Keep These)

```json
{
  "@types/node": "^20.0.0",
  "@types/react": "^18.3.0",
  "@types/react-dom": "^18.3.0",
  "autoprefixer": "^10.4.20",
  "eslint": "^8.57.0",
  "eslint-config-next": "^16.1.6",
  "postcss": "^8.4.47",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.0.0"
}
```

### When Adding New Dependencies

1. Check if native browser APIs can be used instead
2. Verify the package is actively maintained
3. Check for security vulnerabilities
4. Prefer smaller packages over large ones
5. Use pnpm to add: `pnpm add package-name`

## Common Tasks

### Adding a New Feature

1. Create new component in `/components` if UI-related
2. Add business logic to `/lib` if API-related
3. Add utility functions to `/utils` if algorithmic
4. Update types in `/types` if new data structures
5. Follow TypeScript strict mode
6. Add proper accessibility attributes
7. Test with keyboard navigation
8. Verify responsive design

### Fixing a Bug

1. Identify the root cause
2. Write minimal fix (don't refactor unrelated code)
3. Ensure fix doesn't break existing functionality
4. Test in multiple browsers if UI-related
5. Check for TypeScript errors
6. Run `pnpm lint` and `pnpm build`

### Improving Performance

1. Use React DevTools Profiler
2. Memoize with useMemo/useCallback where appropriate
3. Use concurrent features (useTransition, useDeferredValue)
4. Implement debouncing for expensive operations
5. Use Map for deduplication (O(1) vs O(n))
6. Code split large components with dynamic imports

## Testing

### Manual Testing Checklist

- [ ] Run `pnpm lint` - no errors
- [ ] Run `pnpm build` - builds successfully  
- [ ] Test in Chrome (primary browser)
- [ ] Test voice recording (needs Chrome/Edge/Safari)
- [ ] Test on mobile viewport (responsive design)
- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Check browser console for errors
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (VoiceOver/NVDA)

## Documentation

When making significant changes:

1. Update relevant documentation in `/docs`
2. Update README.md if user-facing changes
3. Add JSDoc comments for complex functions
4. Update type definitions if data structures change
5. Document architectural decisions in code comments

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Questions?

For questions or clarifications:
1. Check documentation in `/docs` directory
2. Look at existing code for patterns
3. Review closed PRs for similar implementations
4. Ask in code review comments

---

**Remember:** This is a learning project focused on clean code, accessibility, and modern React patterns. Prioritize code quality, type safety, and user experience in all contributions.
