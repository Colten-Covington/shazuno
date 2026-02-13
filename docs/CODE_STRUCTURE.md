# Code Structure Documentation

## Overview

This document provides a detailed breakdown of the codebase structure, explaining the purpose of each file and directory, and how they interact.

## Directory Structure

```
shazuno/
├── .github/                      # GitHub configuration
│   └── copilot-instructions.md  # GitHub Copilot guidelines
├── .vscode/                      # VS Code workspace settings
│   ├── extensions.json          # Recommended extensions
│   └── settings.json            # Workspace settings
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main application page
├── components/                   # React components
│   ├── AudioRecorder.tsx        # Voice recording component
│   ├── SongResults.tsx          # Search results display
│   └── TextSearch.tsx           # Text search input component
├── docs/                         # Project documentation
│   ├── ARCHITECTURE.md          # System architecture
│   ├── CODE_STRUCTURE.md        # This file
│   ├── DEVELOPMENT.md           # Development guide
│   └── TECH_STACK.md            # Technology documentation
├── lib/                          # Business logic layer
│   └── suno.ts                  # Suno API integration
├── types/                        # TypeScript type definitions
│   └── speech.d.ts              # Custom type definitions
├── utils/                        # Utility functions
│   └── similarity.ts            # Search algorithm
├── .gitignore                   # Git ignore rules
├── CONTRIBUTING.md              # Contribution guidelines
├── eslint.config.mjs            # ESLint configuration
├── IMPLEMENTATION.md            # Implementation summary
├── LICENSE                      # MIT License
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml              # Dependency lock file
├── postcss.config.js           # PostCSS configuration
├── README.md                    # Project readme
├── SECURITY.md                  # Security documentation
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## Core Application Files

### `/app` Directory

#### `app/globals.css` (81 lines)
**Purpose:** Global styles and CSS configuration

**Contents:**
- Tailwind CSS imports (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- CSS custom properties for colors (`--background`, `--foreground`)
- Global reset styles
- Screen reader utility class (`.sr-only` and `.sr-only:focus`)
- Base typography and layout styles

**Key Features:**
- Dark mode ready with CSS variables
- Accessibility-first utilities
- Tailwind integration

#### `app/layout.tsx` (40 lines)
**Purpose:** Root layout wrapper for all pages

**Responsibilities:**
- HTML document structure (`<html>`, `<body>`)
- Metadata configuration (title, description, viewport)
- Font loading (Inter font family)
- Global styling application
- Skip navigation link for accessibility

**Key Features:**
- Metadata API for SEO
- Skip to main content link
- Responsive viewport configuration
- Font optimization with Next.js

**Exports:**
- `metadata`: Site metadata object
- `RootLayout`: Default export React component

#### `app/page.tsx` (198 lines)
**Purpose:** Main application page - central orchestrator

**Responsibilities:**
- Global application state management
- Song loading from Suno API
- Search query coordination
- Results calculation and filtering
- Modal management for full lyrics display

**State Management:**
```typescript
- sunoUsername: string          // Current artist username
- allSongs: Song[]             // All fetched songs
- searchResults: Song[]        // Filtered and sorted results
- isLoadingSongs: boolean      // Loading indicator
- searchQuery: string          // User's search query
- activeSong: Song | null      // Currently displayed song in modal
- isPending: boolean           // Transition state for updates
- deferredSearchQuery: string  // Deferred query for performance
```

**Key Features:**
- Debounced username input (500ms)
- Progressive song loading with callbacks
- Deferred search query processing (useDeferredValue)
- Non-blocking UI updates (useTransition)
- Memoized search results calculation
- Modal overlay for full lyrics

**Performance Optimizations:**
- useCallback for stable function references
- useMemo for expensive calculations
- useTransition for non-blocking updates
- useDeferredValue for responsive input

## Component Files

### `/components` Directory

#### `components/AudioRecorder.tsx` (152 lines)
**Purpose:** Voice recording with Web Speech API

**Props:**
```typescript
{
  onSearch: (lyrics: string) => void;
  isSearching: boolean;
  songsLoaded?: number;
}
```

**State:**
- `isRecording`: boolean - Recording status
- `transcript`: string - Transcribed text
- `error`: string - Error messages

**Key Features:**
- Web Speech API integration
- Continuous recording mode
- Interim results display
- Browser compatibility detection
- Visual recording indicator with animation
- Error handling and user feedback
- Cleanup on component unmount

**Browser Support:**
- Chrome/Chromium: Full support
- Edge: Full support
- Safari: Full support
- Firefox: Not supported (graceful fallback)

**Accessibility:**
- ARIA attributes for states
- Keyboard accessible buttons
- Visual and text feedback
- Error announcements

#### `components/SongResults.tsx` (118 lines)
**Purpose:** Display search results with rich metadata

**Props:**
```typescript
{
  results: Song[];
  query: string;
  onLyricsClick: (song: Song) => void;
}
```

**Key Features:**
- Grid layout (1/2/3 columns responsive)
- Match score visualization
- Lyrics excerpt with highlighted matches
- Song artwork display
- Tags display
- Click to view full lyrics
- Semantic HTML (article, ul, li)

**Display Logic:**
- Extracts relevant 40-word excerpt
- Highlights matching query words
- Color-coded match percentages
- Progressive disclosure pattern

**Accessibility:**
- Semantic article elements
- List structure for results
- Clear heading hierarchy
- Keyboard accessible buttons
- Focus indicators

#### `components/TextSearch.tsx` (60 lines)
**Purpose:** Text input for search queries

**Props:**
```typescript
{
  onSearch: (query: string) => void;
  isSearching: boolean;
  songsLoaded?: number;
}
```

**State:**
- `searchText`: string - Current input value

**Key Features:**
- Multi-line textarea input
- Keyboard shortcut (Ctrl/Cmd+Enter)
- Disabled state management
- Character count display
- Clear visual feedback
- Accessible labels and descriptions

**Keyboard Shortcuts:**
- Ctrl+Enter (Windows/Linux): Submit
- Cmd+Enter (macOS): Submit

**Accessibility:**
- Proper label association
- Disabled state communication
- Status updates via aria-live

## Business Logic Files

### `/lib` Directory

#### `lib/suno.ts` (96 lines)
**Purpose:** Suno API integration and data fetching

**Functions:**

1. **`fetchSunoPage(username: string, page: number): Promise<SunoProfile | null>`**
   - Fetches a single page from Suno API
   - Returns parsed JSON or null on error
   - Handles HTTP errors gracefully

2. **`mapClipToSong(clip: SunoClip): Song`**
   - Converts Suno API clip format to internal Song format
   - Extracts lyrics from metadata (prompt or gpt_description_prompt)
   - Provides defaults for missing fields
   - Initializes matchScore to 0

3. **`fetchAllSunoSongs(username: string, onProgress?: Function): Promise<Song[]>`**
   - Orchestrates multi-page fetching
   - Stops after 10 consecutive empty pages
   - Uses Map<string, Song> for automatic deduplication
   - Calls onProgress callback with incremental results
   - Returns deduplicated array of songs

**API Details:**
- Base URL: `https://studio-api.prod.suno.com`
- Endpoint: `/api/profiles/{username}`
- Query params: `clips_sort_by=created_at`, `page={page}`
- Method: GET
- Auth: None required (public profiles)

**Data Flow:**
```
fetchAllSunoSongs()
    ↓
Loop: fetchSunoPage() for each page
    ↓
Parse response clips array
    ↓
mapClipToSong() for each clip
    ↓
Store in Map (auto-dedupe by ID)
    ↓
onProgress() callback with current songs
    ↓
Return final deduplicated array
```

## Utility Files

### `/utils` Directory

#### `utils/similarity.ts` (44 lines)
**Purpose:** Song matching algorithm

**Functions:**

1. **`normalize(str: string): string`** (Internal)
   - Converts to lowercase
   - Trims whitespace
   - Collapses multiple spaces to single space
   - Removes special characters

2. **`calculateSimilarity(str1: string, str2: string): number`** (Exported)
   - Returns similarity score (0 to 1)
   - Implements word-overlap matching
   - Uses Set for O(1) word lookups

**Algorithm:**
```
1. Normalize both strings
2. If empty, return 0
3. If exact substring match, return 1.0 (100%)
4. Count matching words
5. If all words match, return 0.9 (90%)
6. Otherwise return ratio of matched/total words
```

**Performance:**
- Time Complexity: O(n + m) where n = lyrics length, m = query length
- Space Complexity: O(n) for Set storage
- Optimizations: Early returns, Set-based lookups

**Use Cases:**
- Exact lyrics match: "hello world" in "hello world today" → 1.0
- All words present: "world hello" in "hello beautiful world" → 0.9
- Partial match: "hello today" in "hello world" → 0.5 (1/2 words)

## Type Definition Files

### `/types` Directory

#### `types/speech.d.ts` (91 lines)
**Purpose:** Custom TypeScript type definitions

**Defined Types:**

1. **Web Speech API Interfaces:**
   - `SpeechRecognition`: Main recognition interface
   - `SpeechRecognitionEvent`: Result event type
   - `SpeechRecognitionResultList`: Results collection
   - `SpeechRecognitionResult`: Individual result
   - `SpeechRecognitionAlternative`: Recognition alternative
   - `SpeechRecognitionErrorEvent`: Error event type

2. **Application Domain Types:**
   - `Song`: Internal song representation
   - `SunoClip`: Suno API clip structure
   - `SunoProfile`: Suno API profile response

3. **Global Window Extensions:**
   - `Window.SpeechRecognition`: Constructor
   - `Window.webkitSpeechRecognition`: Webkit-prefixed constructor

**Key Interfaces:**

```typescript
interface Song {
  id: string;
  title: string;
  lyrics: string;
  matchScore: number;
  audioUrl?: string;
  imageUrl?: string;
  tags?: string;
}

interface SunoClip {
  id: string;
  title: string;
  audio_url?: string;
  image_url?: string;
  image_large_url?: string;
  metadata?: {
    tags?: string;
    prompt?: string;
    gpt_description_prompt?: string;
  };
  // ... other fields
}
```

## Configuration Files

### `next.config.js`
**Purpose:** Next.js framework configuration

**Configuration:**
- Image optimization: Remote patterns for Suno CDN
- No custom webpack config
- Default build settings

### `tailwind.config.ts`
**Purpose:** Tailwind CSS configuration

**Configuration:**
- Content paths: `/app`, `/components`, `/pages`
- Theme extensions: Custom colors (background, foreground)
- No custom plugins
- Default variants

### `tsconfig.json`
**Purpose:** TypeScript compiler configuration

**Key Settings:**
- Strict mode: Enabled
- Target: ES2017
- Module: ESNext
- Path aliases: `@/*` → project root
- JSX: preserve (Next.js handles it)
- Incremental: true (faster rebuilds)

### `eslint.config.mjs`
**Purpose:** ESLint linter configuration

**Configuration:**
- Flat config format (new ESLint standard)
- Extends: `eslint-config-next`
- Next.js specific rules enabled
- TypeScript support

### `postcss.config.js`
**Purpose:** PostCSS configuration for CSS processing

**Plugins:**
- tailwindcss: Process Tailwind utilities
- autoprefixer: Add vendor prefixes

### `package.json`
**Purpose:** Project metadata and dependencies

**Key Fields:**
- name, version, private
- packageManager: "pnpm@9.0.0"
- scripts: dev, build, start, lint
- dependencies: 3 production packages
- devDependencies: 8 development packages

## Data Flow Diagram

```
User Input (Text/Voice)
        ↓
    app/page.tsx
        ↓
  setSearchQuery()
        ↓
useDeferredValue(query)
        ↓
    useMemo()
        ↓
calculateResults()
        ↓
utils/similarity.ts
calculateSimilarity()
        ↓
Filter & Sort Results
        ↓
useTransition()
        ↓
  setSearchResults()
        ↓
components/SongResults.tsx
        ↓
  Display to User
```

## Component Hierarchy

```
app/layout.tsx (Root)
    └── app/page.tsx (Main)
            ├── Username Input (inline)
            ├── components/TextSearch.tsx
            │       └── components/AudioRecorder.tsx
            └── components/SongResults.tsx
```

## Import Graph

```
app/page.tsx
    ├── @/components/TextSearch
    ├── @/components/SongResults
    ├── @/utils/similarity (calculateSimilarity)
    ├── @/lib/suno (fetchAllSunoSongs)
    └── @/types/speech (Song type)

components/AudioRecorder.tsx
    └── @/types/speech (SpeechRecognition types)

components/SongResults.tsx
    └── @/types/speech (Song type)

lib/suno.ts
    └── @/types/speech (SunoProfile, SunoClip, Song types)

utils/similarity.ts
    └── (no imports - standalone utility)
```

## File Size Summary

| File | Lines | Purpose |
|------|-------|---------|
| app/page.tsx | 198 | Main application logic |
| components/AudioRecorder.tsx | 152 | Voice recording |
| components/SongResults.tsx | 118 | Results display |
| lib/suno.ts | 96 | API integration |
| types/speech.d.ts | 91 | Type definitions |
| app/layout.tsx | 40 | Root layout |
| components/TextSearch.tsx | 60 | Text search input |
| utils/similarity.ts | 44 | Matching algorithm |
| **Total Application Code** | **799** | Core functionality |

## Code Metrics

- **Total TypeScript Files:** 8
- **Total React Components:** 4
- **Total Utility Functions:** 4
- **Total Custom Types:** 9
- **Lines of Code:** ~800 (excluding config)
- **Dependencies:** 3 production, 8 development

## Modification Guidelines

### Adding a New Feature

1. **New Component:**
   - Create in `/components` directory
   - Follow naming convention (PascalCase)
   - Add TypeScript interface for props
   - Import in `app/page.tsx` or parent component

2. **New Utility:**
   - Create in `/utils` directory
   - Follow naming convention (camelCase)
   - Add JSDoc comments
   - Export functions explicitly

3. **New Type:**
   - Add to `/types/speech.d.ts` or create new file
   - Use interface for object shapes
   - Export for reuse

### Modifying Existing Code

1. **Understand the file's purpose** (use this document)
2. **Check import dependencies** (what depends on this file?)
3. **Maintain type safety** (update types if needed)
4. **Follow existing patterns** (consistency is key)
5. **Test thoroughly** (manual testing required)

## Best Practices

1. **Separation of Concerns:**
   - UI components in `/components`
   - Business logic in `/lib`
   - Algorithms in `/utils`
   - Types in `/types`

2. **Type Safety:**
   - No `any` types
   - Explicit interfaces for props
   - Proper type exports

3. **Performance:**
   - Memoization where appropriate
   - Debouncing for expensive operations
   - Progressive loading patterns

4. **Accessibility:**
   - Semantic HTML first
   - ARIA when needed
   - Keyboard support
   - Focus management

5. **Maintainability:**
   - Clear file organization
   - Consistent naming
   - Comprehensive comments
   - Single responsibility principle

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [TECH_STACK.md](./TECH_STACK.md) - Technology details
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines

---

This code structure documentation should be updated whenever significant architectural changes are made to the codebase.
