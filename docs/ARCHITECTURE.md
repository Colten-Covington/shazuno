# Shazuno Architecture Documentation

## Overview

Shazuno is a client-side web application built with Next.js 15 that enables users to search through Suno.com artist song libraries using text or voice input. The application features a modern React-based architecture with TypeScript, focusing on accessibility, performance, and user experience.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js 15 (App Router)                    │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │         React 18 Client Components              │  │ │
│  │  │  ┌─────────────┐  ┌──────────────┐             │  │ │
│  │  │  │   Page.tsx  │  │  Components  │             │  │ │
│  │  │  │  (Main UI)  │  │  - TextSearch│             │  │ │
│  │  │  │             │  │  - AudioRec  │             │  │ │
│  │  │  │             │  │  - Results   │             │  │ │
│  │  │  └──────┬──────┘  └──────┬───────┘             │  │ │
│  │  │         │                 │                      │  │ │
│  │  │         └────────┬────────┘                      │  │ │
│  │  │                  │                               │  │ │
│  │  │         ┌────────▼────────┐                     │  │ │
│  │  │         │   Lib Layer     │                     │  │ │
│  │  │         │  - suno.ts      │                     │  │ │
│  │  │         │  - similarity   │                     │  │ │
│  │  │         └────────┬────────┘                     │  │ │
│  │  └──────────────────┼──────────────────────────────┘  │ │
│  └────────────────────┼──────────────────────────────────┘ │
│                       │                                     │
│          ┌────────────▼────────────┐                       │
│          │   Web Speech API        │                       │
│          │   (Browser Native)      │                       │
│          └─────────────────────────┘                       │
└───────────────────────┬──────────────────────────────────┘
                        │
                        │ HTTPS Requests
                        │
         ┌──────────────▼──────────────┐
         │    Suno API (External)      │
         │  studio-api.prod.suno.com   │
         └─────────────────────────────┘
```

## Architectural Principles

### 1. Client-Side First Architecture
- **All processing happens in the browser** - No backend server required
- Direct API calls from client to Suno API
- State management using React hooks (useState, useEffect, useMemo)
- Progressive loading with real-time updates

### 2. Component-Based Design
- **Separation of concerns** - Each component has a single responsibility
- Reusable, composable components
- Props-based communication between components
- Type-safe interfaces for all component props

### 3. Performance Optimization
- **React 18 concurrent features**:
  - `useTransition` for non-blocking updates
  - `useDeferredValue` for responsive input handling
  - `useMemo` for expensive calculations
- Progressive loading with callbacks
- Debounced API calls to reduce requests
- Efficient deduplication using Map data structure

### 4. Type Safety
- **Full TypeScript coverage** across all modules
- Strict mode enabled for maximum safety
- Custom type definitions for external APIs (Web Speech API, Suno API)
- No `any` types - all values are properly typed

### 5. Accessibility First
- Semantic HTML elements (main, section, article, ul/li)
- ARIA attributes where appropriate (not redundant)
- Keyboard navigation support
- Screen reader optimizations
- Skip navigation links
- Focus management and visual indicators

## System Components

### 1. Presentation Layer (`/app`)

#### `app/page.tsx` - Main Application Component
**Responsibilities:**
- Central state management for the application
- Orchestrates data flow between components
- Manages username input and song loading
- Coordinates search operations
- Handles modal display for full lyrics

**Key Features:**
- Debounced username changes (500ms delay)
- Progressive song loading with status updates
- Deferred search query processing
- Non-blocking search results updates

**State Management:**
```typescript
- sunoUsername: string           // Current Suno artist username
- allSongs: Song[]              // All loaded songs
- searchResults: Song[]         // Filtered/sorted search results
- isLoadingSongs: boolean       // Loading indicator
- searchQuery: string           // Current search query
- activeSong: Song | null       // Modal content
- isPending: boolean            // Transition state
- deferredSearchQuery: string   // Deferred query for performance
```

#### `app/layout.tsx` - Root Layout
**Responsibilities:**
- HTML document structure
- Global metadata and SEO
- Font loading and global styles
- Skip navigation link for accessibility

### 2. Component Layer (`/components`)

#### `components/TextSearch.tsx`
**Purpose:** Text-based search interface with keyboard shortcuts

**Features:**
- Multi-line textarea input
- Keyboard shortcut (Ctrl/Cmd+Enter)
- Disabled state management
- Accessible labels and descriptions

**Props Interface:**
```typescript
{
  onSearch: (query: string) => void;
  isSearching: boolean;
  songsLoaded?: number;
}
```

#### `components/AudioRecorder.tsx`
**Purpose:** Voice recording using Web Speech API

**Features:**
- Real-time speech-to-text transcription
- Continuous and interim results
- Visual recording indicator with animation
- Browser compatibility detection
- Error handling and user feedback

**Web Speech API Integration:**
- Continuous mode for long recordings
- Interim results for real-time feedback
- Language: en-US
- Automatic stop on recognition end

#### `components/SongResults.tsx`
**Purpose:** Display search results with rich metadata

**Features:**
- Grid layout with cards
- Match score visualization
- Lyrics excerpt with highlighting
- Song artwork display
- Clickable lyrics for modal view
- Semantic HTML (article, ul/li)

**Display Logic:**
- Shows relevant 40-word excerpt from lyrics
- Highlights matching query words
- Color-coded match percentages
- Progressive disclosure of full lyrics

### 3. Business Logic Layer (`/lib`)

#### `lib/suno.ts` - Suno API Integration
**Core Functions:**

1. **`fetchSunoPage(username, page)`**
   - Fetches a single page from Suno API
   - Returns SunoProfile or null on error
   - Handles HTTP errors gracefully

2. **`mapClipToSong(clip)`**
   - Converts Suno API clip to internal Song format
   - Extracts lyrics from metadata (prompt or gpt_description_prompt)
   - Handles missing fields with defaults

3. **`fetchAllSunoSongs(username, onProgress)`**
   - Orchestrates multi-page fetching
   - Stops after 10 consecutive empty pages
   - Uses Map for automatic deduplication
   - Calls onProgress callback with incremental results
   - Returns deduplicated array of songs

**API Endpoint:**
```
GET https://studio-api.prod.suno.com/api/profiles/{username}
  ?clips_sort_by=created_at
  &playlists_sort_by=created_at
  &page={page}
```

### 4. Utility Layer (`/utils`)

#### `utils/similarity.ts` - Song Matching Algorithm
**Algorithm Approach:**

1. **Normalization:**
   - Convert to lowercase
   - Remove special characters
   - Replace multiple whitespace with single space

2. **Matching Strategies:**
   - **Exact substring match:** Score = 1.0 (100%)
   - **All words present:** Score = 0.9 (90%)
   - **Partial word overlap:** Score = (matched words / total query words)

3. **Scoring Logic:**
   ```
   if normalized_lyrics.contains(normalized_query):
       return 1.0
   
   matched = count_matching_words(lyrics_words, query_words)
   ratio = matched / query_words.length
   
   if ratio == 1.0:
       return 0.9  // All words found but not as substring
   
   return ratio  // Partial match percentage
   ```

**Performance Characteristics:**
- O(n) time complexity for normalization
- O(m*n) for word matching where m = query words, n = lyrics words
- Uses Set for O(1) word lookup

### 5. Type Definitions (`/types`)

#### `types/speech.d.ts`
**Provides TypeScript definitions for:**

1. **Web Speech API:**
   - SpeechRecognition interface
   - SpeechRecognitionEvent
   - SpeechRecognitionResult
   - Error event types

2. **Application Domain Types:**
   - Song interface
   - SunoClip interface
   - SunoProfile interface

3. **Global Window Extensions:**
   - SpeechRecognition and webkitSpeechRecognition constructors

## Data Flow

### 1. Initial Load Flow
```
User opens app
    ↓
app/page.tsx renders with default username
    ↓
useEffect triggers on username change
    ↓
Debounce 500ms
    ↓
fetchAllSunoSongs() called
    ↓
Multiple pages fetched in sequence
    ↓
onProgress callback updates UI incrementally
    ↓
Final deduplicated songs stored in state
    ↓
UI shows "Loaded N songs" status
```

### 2. Text Search Flow
```
User types in TextSearch component
    ↓
onChange → setSearchQuery in page.tsx
    ↓
useDeferredValue defers the query (non-blocking)
    ↓
useMemo recalculates results when deferred value changes
    ↓
calculateResults() called with query and all songs
    ↓
calculateSimilarity() for each song
    ↓
Filter (score > 0), sort (highest first), take top 10
    ↓
useTransition updates searchResults (non-blocking)
    ↓
SongResults component re-renders with new results
```

### 3. Voice Search Flow
```
User clicks microphone button
    ↓
AudioRecorder starts Web Speech API
    ↓
recognition.start() called
    ↓
User speaks lyrics
    ↓
Browser processes audio → text
    ↓
onresult event fires with transcript
    ↓
Component updates transcript state (real-time)
    ↓
User stops recording
    ↓
User clicks "Search Songs"
    ↓
onSearch prop called → same flow as text search
```

### 4. Results Display Flow
```
searchResults updated in page.tsx
    ↓
SongResults component receives new results
    ↓
Maps over results array
    ↓
For each song:
  - Calculate excerpt (40 words around matches)
  - Highlight matching words
  - Render card with metadata
    ↓
User clicks "View Lyrics"
    ↓
setActiveSong() called
    ↓
Modal overlay displays full lyrics
```

## State Management Strategy

### React Hooks Pattern
- **No external state library** (Redux, Zustand, etc.)
- All state managed via React hooks
- Props drilling for simple component tree
- Custom hooks for reusable logic could be added

### Current State Architecture:
```typescript
// Global app state in page.tsx
const [sunoUsername, setSunoUsername] = useState('beginbot');
const [allSongs, setAllSongs] = useState<Song[]>([]);
const [searchResults, setSearchResults] = useState<Song[]>([]);
const [isLoadingSongs, setIsLoadingSongs] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
const [activeSong, setActiveSong] = useState<Song | null>(null);

// Performance hooks
const [isPending, startTransition] = useTransition();
const deferredSearchQuery = useDeferredValue(searchQuery);

// Memoized calculations
const calculateResults = useCallback(...);
const memoizedResults = useMemo(...);
```

### State Update Patterns:

1. **Synchronous Updates:**
   - Form inputs (username, search query)
   - UI toggles (modal open/close)
   - Component-local state (recording status, transcript)

2. **Asynchronous Updates:**
   - API data fetching (songs)
   - Progressive loading (onProgress callback)

3. **Deferred Updates:**
   - Search results calculation (useDeferredValue)
   - Non-critical UI updates (useTransition)

## Performance Optimizations

### 1. React 18 Concurrent Features
- **useTransition:** Non-blocking search result updates
- **useDeferredValue:** Keeps input responsive during heavy calculations
- **useMemo:** Prevents unnecessary recalculations of search results

### 2. Data Fetching Optimizations
- Debounced username input (500ms)
- Progressive loading with early results display
- Stop condition (10 empty pages) prevents infinite loops
- Map-based deduplication (O(1) lookups)

### 3. Rendering Optimizations
- useCallback for stable function references
- Conditional rendering for results and loading states
- Lazy modal rendering (only when activeSong is set)

### 4. Algorithm Optimizations
- Set-based word matching (O(1) lookups vs O(n) array searches)
- Short-circuit evaluation (exact match returns early)
- Top 10 results limit (slice prevents rendering thousands)

## Security Considerations

### Input Validation
- No server-side processing = reduced attack surface
- TypeScript type checking at compile time
- URL validation for external resources

### API Security
- HTTPS-only requests to Suno API
- No authentication credentials stored client-side
- CORS handled by browser and Suno API

### XSS Prevention
- React automatic escaping of text content
- No dangerouslySetInnerHTML usage
- User input never evaluated as code

### Content Security
- Next.js security headers (default)
- No eval() or Function() constructor usage
- External images from whitelisted domains only

## Technology Decisions

### Why Next.js 15?
- **App Router:** Modern file-system routing
- **React Server Components:** Future-ready architecture
- **Built-in TypeScript:** First-class TS support
- **Optimizations:** Automatic code splitting, image optimization
- **Developer Experience:** Hot reload, error handling

### Why Client-Side Architecture?
- **Simplicity:** No backend infrastructure needed
- **Cost:** Free to deploy (static hosting)
- **Speed:** Direct API calls, no middleware
- **Limitations Acceptable:** Demo/personal project scope

### Why Tailwind CSS?
- **Utility-First:** Rapid prototyping
- **Consistency:** Design system built-in
- **Performance:** Purged CSS, small bundle
- **Developer Experience:** Autocomplete, documentation

### Why Web Speech API?
- **Native:** No external dependencies
- **Free:** No API costs
- **Real-Time:** Instant transcription
- **Trade-off:** Limited browser support accepted

## Deployment Architecture

### Static Hosting (Current)
```
Developer → Git Push → GitHub
                          ↓
                    Vercel/Netlify
                          ↓
                    Build Process
                          ↓
                     CDN Distribution
                          ↓
                    User's Browser
```

**Advantages:**
- Zero infrastructure cost
- Automatic HTTPS
- Global CDN
- Zero-downtime deploys

**Build Output:**
- Optimized HTML, CSS, JS
- Static assets on CDN
- No server runtime needed

## Conclusion

Shazuno's architecture prioritizes simplicity, type safety, and user experience. The client-side-first approach minimizes complexity while delivering a responsive, accessible application. The modular component structure and clear separation of concerns make the codebase maintainable and extensible for future enhancements.
