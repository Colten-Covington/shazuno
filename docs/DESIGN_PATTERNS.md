# Design Patterns and Best Practices

## Overview

This document describes the design patterns, coding conventions, and best practices used throughout the Shazuno codebase. Following these patterns ensures consistency, maintainability, and code quality.

## React Patterns

### 1. Functional Components with Hooks

**Pattern:**
```typescript
'use client';

import { useState, useCallback, useEffect } from 'react';

interface ComponentProps {
  prop1: string;
  onAction: (value: string) => void;
}

export default function Component({ prop1, onAction }: ComponentProps) {
  // 1. State hooks
  const [state, setState] = useState('');
  
  // 2. Memoized callbacks
  const handleAction = useCallback(() => {
    onAction(state);
  }, [state, onAction]);
  
  // 3. Effects
  useEffect(() => {
    // Side effect
    return () => {
      // Cleanup
    };
  }, []);
  
  // 4. Render
  return <div>{/* JSX */}</div>;
}
```

**Why:**
- Functional components are simpler and more concise
- Hooks provide better code reuse
- Easier to test and reason about
- Better performance with React 18 concurrent features

### 2. Props Interface Pattern

**Pattern:**
```typescript
interface ComponentNameProps {
  // Required props
  title: string;
  data: Data[];
  
  // Optional props
  subtitle?: string;
  
  // Callbacks
  onAction: (value: string) => void;
  
  // Props with defaults (document in JSDoc)
  maxItems?: number;  // Default: 10
}

export default function ComponentName({ 
  title, 
  data, 
  subtitle,
  onAction,
  maxItems = 10 
}: ComponentNameProps) {
  // ...
}
```

**Why:**
- Type safety for props
- Self-documenting code
- IDE autocomplete support
- Compile-time error checking

### 3. Performance Optimization Pattern

**Pattern:**
```typescript
import { useMemo, useCallback, useTransition, useDeferredValue } from 'react';

export default function Component({ data, query }) {
  // Defer non-urgent updates
  const deferredQuery = useDeferredValue(query);
  
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);
  
  // Stabilize callbacks
  const handleAction = useCallback((value: string) => {
    // Action
  }, []);
  
  // Non-blocking updates
  const [isPending, startTransition] = useTransition();
  
  const updateResults = () => {
    startTransition(() => {
      setResults(newResults);
    });
  };
  
  return <div>{/* JSX */}</div>;
}
```

**Why:**
- Prevents unnecessary re-renders
- Keeps UI responsive during heavy operations
- Better perceived performance
- Utilizes React 18 concurrent features

### 4. Debouncing Pattern

**Pattern:**
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    performExpensiveOperation(value);
  }, 500);
  
  return () => clearTimeout(timer);
}, [value]);
```

**Why:**
- Reduces API calls and expensive operations
- Improves performance
- Better user experience (wait for user to finish typing)

**Use Cases:**
- API calls on input change
- Search queries
- Auto-save functionality

## TypeScript Patterns

### 1. Strict Type Safety

**Pattern:**
```typescript
// ✅ DO: Explicit types
function processData(data: string[]): ProcessedData {
  return data.map(item => ({ value: item }));
}

// ✅ DO: Interface for object shapes
interface User {
  id: string;
  name: string;
  email?: string;
}

// ❌ DON'T: Use 'any'
function processData(data: any) {
  return data.map(item => item);
}
```

**Why:**
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Safer refactoring

### 2. Type Inference

**Pattern:**
```typescript
// Let TypeScript infer obvious types
const songs = data.map(clip => mapClipToSong(clip));

// Be explicit for function signatures
function mapClipToSong(clip: SunoClip): Song {
  return {
    id: clip.id,
    title: clip.title || 'Untitled',
    // ...
  };
}
```

**Why:**
- Less verbose code
- Still type-safe
- Explicit where it matters (function boundaries)

### 3. Custom Type Definitions

**Pattern:**
```typescript
// types/speech.d.ts
export interface Song {
  id: string;
  title: string;
  lyrics: string;
  matchScore: number;
}

// Usage
import type { Song } from '@/types/speech';

function processSongs(songs: Song[]): Song[] {
  // ...
}
```

**Why:**
- Centralized type definitions
- Reusable across the codebase
- Single source of truth
- Easy to update

## State Management Patterns

### 1. Lifting State Up

**Pattern:**
```typescript
// Parent component manages shared state
export default function Parent() {
  const [sharedState, setSharedState] = useState('');
  
  return (
    <>
      <Child1 value={sharedState} onChange={setSharedState} />
      <Child2 value={sharedState} />
    </>
  );
}

// Children receive state via props
function Child1({ value, onChange }: Props) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}
```

**Why:**
- Single source of truth
- Predictable data flow
- Easier to debug
- Simple for small apps (no Redux needed)

### 2. Progressive Loading with Callbacks

**Pattern:**
```typescript
// In lib/suno.ts
export async function fetchAllSunoSongs(
  username: string,
  onProgress?: (songs: Song[]) => void
): Promise<Song[]> {
  const songsMap = new Map<string, Song>();
  
  while (hasMorePages) {
    const newSongs = await fetchPage(page);
    
    newSongs.forEach(song => {
      songsMap.set(song.id, song);
    });
    
    // Report progress
    if (onProgress) {
      onProgress(Array.from(songsMap.values()));
    }
    
    page++;
  }
  
  return Array.from(songsMap.values());
}

// Usage in component
useEffect(() => {
  fetchAllSunoSongs(username, (progressSongs) => {
    // Update UI with partial results
    setAllSongs(progressSongs);
  });
}, [username]);
```

**Why:**
- Better user experience (see results immediately)
- Progressive enhancement
- Handles slow connections gracefully

## Data Structure Patterns

### 1. Map for Deduplication

**Pattern:**
```typescript
// ✅ DO: Use Map for automatic deduplication
const songsMap = new Map<string, Song>();

clips.forEach(clip => {
  songsMap.set(clip.id, mapClipToSong(clip));  // Overwrites duplicates
});

const uniqueSongs = Array.from(songsMap.values());

// ❌ DON'T: Use Array + Set (less efficient)
const songs: Song[] = [];
const seenIds = new Set<string>();

clips.forEach(clip => {
  if (!seenIds.has(clip.id)) {
    seenIds.add(clip.id);
    songs.push(mapClipToSong(clip));
  }
});
```

**Why:**
- O(1) lookups vs O(n)
- Automatic deduplication
- More concise code
- Better performance

### 2. Set for Word Matching

**Pattern:**
```typescript
// Use Set for fast lookups
const lyricsWords = new Set(lyrics.split(/\s+/));
const queryWords = query.split(/\s+/);

let matchCount = 0;
for (const word of queryWords) {
  if (lyricsWords.has(word)) {  // O(1) lookup
    matchCount++;
  }
}
```

**Why:**
- O(1) lookup time
- Better performance than Array.includes() which is O(n)
- Ideal for membership testing

## API Integration Patterns

### 1. Null-Safe API Calls

**Pattern:**
```typescript
export async function fetchData(id: string): Promise<Data | null> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return null;  // Handle errors gracefully
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;  // Handle exceptions
  }
}

// Usage
const data = await fetchData(id);
if (data) {
  // Process data
} else {
  // Handle error case
}
```

**Why:**
- Graceful error handling
- No uncaught exceptions
- Explicit error states
- Easier to handle in UI

### 2. Progressive Pagination

**Pattern:**
```typescript
export async function fetchAllPages(username: string): Promise<Item[]> {
  let page = 0;
  let emptyPages = 0;
  const MAX_EMPTY = 10;
  const items = new Map<string, Item>();
  
  while (emptyPages < MAX_EMPTY) {
    const data = await fetchPage(username, page);
    
    if (!data || data.items.length === 0) {
      emptyPages++;
      page++;
      continue;
    }
    
    emptyPages = 0;  // Reset counter
    page++;
    
    data.items.forEach(item => items.set(item.id, item));
  }
  
  return Array.from(items.values());
}
```

**Why:**
- Stops after reasonable number of empty pages
- Allows gaps in pagination
- Prevents infinite loops
- Handles sparse data

## UI/UX Patterns

### 1. Glassmorphism Effect

**Pattern:**
```tsx
<div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
  {/* Content */}
</div>
```

**Why:**
- Modern aesthetic
- Good contrast without being harsh
- Works well with gradient backgrounds

### 2. Loading States

**Pattern:**
```tsx
{isLoading ? (
  <div className="text-gray-400">Loading...</div>
) : data.length > 0 ? (
  <Results data={data} />
) : (
  <div className="text-gray-400">No results found</div>
)}
```

**Why:**
- Clear feedback to users
- Prevents confusion
- Better UX

### 3. Progressive Disclosure

**Pattern:**
```tsx
// Show excerpt in list
<div className="line-clamp-3">{lyrics}</div>

// Full content in modal
{showModal && (
  <Modal>
    <div>{fullLyrics}</div>
  </Modal>
)}
```

**Why:**
- Reduces cognitive load
- Cleaner interface
- Users can drill down when interested

## Accessibility Patterns

### 1. Semantic HTML First

**Pattern:**
```tsx
// ✅ DO: Use semantic elements
<main id="main-content">
  <section aria-labelledby="search-heading">
    <h2 id="search-heading">Search</h2>
    {/* Content */}
  </section>
</main>

// ❌ DON'T: Use divs for everything
<div>
  <div>
    <div>Search</div>
    {/* Content */}
  </div>
</div>
```

**Why:**
- Better screen reader support
- Semantic meaning
- SEO benefits
- Keyboard navigation

### 2. ARIA When Needed

**Pattern:**
```tsx
// Only add ARIA when semantic HTML isn't enough
<button aria-pressed={isActive}>Toggle</button>

// Don't add redundant ARIA
<button role="button">  {/* ❌ Button role is implicit */}
  Click
</button>
```

**Why:**
- Semantic HTML preferred
- ARIA adds context when needed
- Avoid redundancy

### 3. Focus Management

**Pattern:**
```tsx
<button className="focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Click Me
</button>

// Screen reader only text
<span className="sr-only">Click to submit search</span>
```

**Why:**
- Keyboard accessibility
- Visual feedback for focus
- Screen reader context

## Styling Patterns

### 1. Utility-First with Tailwind

**Pattern:**
```tsx
// Compose utilities for complex styles
<div className="
  flex items-center justify-between gap-4 
  p-6 
  bg-white/10 backdrop-blur-lg 
  rounded-lg shadow-lg
  hover:bg-white/20 
  transition-colors duration-200
">
  {/* Content */}
</div>
```

**Why:**
- Rapid development
- Consistent design system
- No context switching
- Automatic purging (small CSS bundle)

### 2. Responsive Design

**Pattern:**
```tsx
// Mobile-first responsive
<div className="
  grid 
  grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4
">
  {/* Items */}
</div>
```

**Why:**
- Mobile-first approach
- Better performance on mobile
- Progressive enhancement

### 3. State Variants

**Pattern:**
```tsx
<button className="
  bg-blue-500 
  hover:bg-blue-600 
  focus:ring-2 focus:ring-blue-300 
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-all
">
  Submit
</button>
```

**Why:**
- Clear visual feedback
- Accessible states
- Smooth transitions

## Error Handling Patterns

### 1. Graceful Degradation

**Pattern:**
```typescript
// Try browser API, fallback if unavailable
const SpeechRecognition = 
  window.SpeechRecognition || 
  window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  setError('Speech recognition not supported. Please use text input.');
  return;
}
```

**Why:**
- Works on more browsers
- Clear error messages
- User not left confused

### 2. User-Friendly Error Messages

**Pattern:**
```tsx
{error && (
  <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded" role="alert">
    <strong>Error:</strong> {error}
  </div>
)}
```

**Why:**
- Clear feedback
- Non-technical language
- Visible but not intrusive

## Testing Patterns

### 1. Type-Safe Props

**Pattern:**
```typescript
// Types ensure components are tested with valid props
interface Props {
  required: string;
  optional?: number;
}

// TypeScript enforces this at compile time
<Component required="test" />  // ✅ Valid
<Component />  // ❌ Error: missing required prop
```

**Why:**
- Compile-time validation
- Catches errors before runtime
- Self-documenting tests

## Performance Patterns

### 1. Memoization Strategy

**Pattern:**
```typescript
// Expensive calculation
const results = useMemo(() => {
  return songs
    .map(song => ({ ...song, score: calculateScore(song, query) }))
    .filter(song => song.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}, [songs, query]);

// Stable callback reference
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);
```

**When to Use:**
- Expensive calculations
- Complex transformations
- Callbacks passed as props

**When to Skip:**
- Simple operations
- Primitives and simple objects
- No noticeable performance impact

## Security Patterns

### 1. No Dangerous Operations

**Pattern:**
```typescript
// ✅ DO: Let React handle escaping
<div>{userInput}</div>

// ❌ DON'T: Use dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ DON'T: Use eval
eval(userCode);  // Never do this
```

**Why:**
- Prevents XSS attacks
- React escapes by default
- No code injection vulnerabilities

### 2. Input Validation

**Pattern:**
```typescript
function processUsername(username: string): string {
  // Validate and sanitize
  return username
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '');
}
```

**Why:**
- Prevents injection attacks
- Ensures data quality
- Handles edge cases

## Documentation Patterns

### 1. JSDoc for Complex Functions

**Pattern:**
```typescript
/**
 * Calculates similarity between lyrics and query using word overlap
 * @param lyrics - The song lyrics to search in
 * @param query - The search query from user
 * @returns Similarity score from 0 (no match) to 1 (perfect match)
 * 
 * @example
 * calculateSimilarity('hello world', 'hello') // Returns 1.0
 * calculateSimilarity('hello world', 'world hello') // Returns 0.9
 */
export function calculateSimilarity(lyrics: string, query: string): number {
  // Implementation
}
```

**Why:**
- IDE tooltips
- Self-documenting
- Examples help users
- Type information

### 2. Component Documentation

**Pattern:**
```typescript
/**
 * Audio recorder component for voice input using Web Speech API
 * 
 * @component
 * @example
 * <AudioRecorder 
 *   onSearch={handleSearch} 
 *   isSearching={false}
 *   songsLoaded={10}
 * />
 */
export default function AudioRecorder({ onSearch, isSearching, songsLoaded }: Props) {
  // Implementation
}
```

## Best Practices Summary

1. **Type Safety:** Use TypeScript strictly, no `any` types
2. **Performance:** Memoize expensive calculations, use concurrent features
3. **Accessibility:** Semantic HTML first, ARIA when needed
4. **Error Handling:** Graceful degradation, user-friendly messages
5. **State Management:** Lift state up, single source of truth
6. **Data Structures:** Use Map for deduplication, Set for lookups
7. **Styling:** Tailwind utilities, responsive design
8. **Code Organization:** Clear separation of concerns
9. **Documentation:** JSDoc for complex functions
10. **Security:** No eval, no dangerouslySetInnerHTML

---

Following these patterns ensures the codebase remains consistent, maintainable, and high-quality as it evolves.
