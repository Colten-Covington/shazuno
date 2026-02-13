# /services Directory

**Purpose:** Service layer for complex business logic and external integrations

## What This Directory Contains

Service classes/modules that orchestrate multiple operations or wrap external APIs with:
- **Caching** - Reduce API calls
- **Error handling** - Better error messages
- **Business logic** - Orchestration and validation
- **State management** - Stateful operations

## Architecture Layering ⚠️

Services sit between hooks and lib:

```
Component → Hook → Service → Lib → API
```

## Service vs Lib vs Hook

| Layer | Purpose | Examples | Contains |
|-------|---------|----------|----------|
| **lib/** | Simple API clients | `fetchSunoPage()` | Fetch calls, data mapping |
| **services/** | Business logic | `sunoService.fetchUserSongs()` | Caching, validation, orchestration |
| **hooks/** | React state | `useSunoSongs()` | useState, useEffect, loading states |

## Real Example from This Codebase

### lib/suno.ts (Low-level API client)
```typescript
// Simple fetch, no caching, no complex logic
export async function fetchAllSunoSongs(
  username: string,
  onProgress?: (songs: Song[]) => void
): Promise<Song[]> {
  // Paginate through API, return songs
  // No caching, no validation
}
```

### services/sunoService.ts (Business logic with caching)
```typescript
export const sunoService = {
  cache: new Map<string, { songs: Song[]; timestamp: number }>(),
  cacheTimeout: 5 * 60 * 1000, // 5 minutes

  async fetchUserSongs(
    username: string,
    onProgress?: (songs: Song[]) => void
  ): Promise<Song[]> {
    // Check cache first
    const cached = this.cache.get(username);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.songs; // Return cached, no API call!
    }

    // Call lib function
    const songs = await fetchAllSunoSongs(username, onProgress);
    
    // Update cache
    this.cache.set(username, { songs, timestamp: Date.now() });
    
    return songs;
  },

  clearCache(username?: string): void {
    // Cache management
  }
};
```

### hooks/useSunoSongs.ts (React integration)
```typescript
export function useSunoSongs(initialUsername?: string) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadSongs = useCallback(async (username: string) => {
    setIsLoading(true);
    try {
      // Call service, not lib!
      const fetchedSongs = await sunoService.fetchUserSongs(username);
      setSongs(fetchedSongs);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { songs, isLoading, loadSongs };
}
```

## Patterns

### Service Structure (Functional Approach)
```typescript
// services/dataService.ts
export const dataService = {
  // In-memory cache
  cache: new Map<string, { data: Type[]; timestamp: number }>(),
  cacheTimeout: 5 * 60 * 1000, // 5 minutes

  async fetchData(
    id: string,
    onProgress?: (data: Type[]) => void
  ): Promise<Type[]> {
    // Check cache
    const cached = this.cache.get(id);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // Fetch from lib
    const data = await libFunction(id, onProgress);
    
    // Update cache
    this.cache.set(id, { data, timestamp: Date.now() });
    
    return data;
  },

  clearCache(id?: string): void {
    if (id) {
      this.cache.delete(id);
    } else {
      this.cache.clear();
    }
  },

  async validate(id: string): Promise<boolean> {
    // Business logic
  }
};
```

### Service Structure (Class Approach)
```typescript
// services/analyticsService.ts
export class AnalyticsService {
  private static instance: AnalyticsService;
  
  private constructor() {}
  
  static getInstance(): AnalyticsService {
    if (!this.instance) {
      this.instance = new AnalyticsService();
    }
    return this.instance;
  }
  
  trackEvent(name: string, properties?: Record<string, unknown>): void {
    // Implementation
  }
}
```

### Caching Pattern

```typescript
export const cacheService = {
  cache: new Map<string, { data: any; timestamp: number }>(),
  
  get<T>(key: string, ttl: number = 300000): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  },
  
  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
};
```

## Common Services

- **sunoService.ts** - Suno API with caching (5min TTL)
- **searchService.ts** - Search orchestration and statistics
- **auth.ts** - Authentication logic
- **storage.ts** - localStorage/sessionStorage wrapper
- **notification.ts** - Toast/notification system
- **validation.ts** - Complex validation logic

## When to Use Services

✅ **Use services when you need:**
- Caching
- Complex error handling
- Business rules and validation
- Orchestration of multiple lib functions
- Stateful operations (not React state)

❌ **Don't use services for:**
- Simple fetch wrapper (use lib/)
- React state management (use hooks/)
- Pure utility functions (use utils/)

## File Naming

- camelCase: `authService.ts`, `storageService.ts`
- Descriptive of functionality
- Suffix with `Service` for clarity

## References

- [Root AGENTS.md](/AGENTS.md)
- [lib/AGENTS.md](../lib/AGENTS.md) - For simpler API clients
- [hooks/AGENTS.md](../hooks/AGENTS.md) - For React integration
