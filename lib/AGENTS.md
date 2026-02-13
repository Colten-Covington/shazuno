# /lib Directory

**Purpose:** Low-level API clients and external service integrations

## What This Directory Contains

- **suno.ts** - Suno API client with pagination and deduplication

## Architecture Position

**lib/** is the lowest layer - consumed by services, NOT by hooks directly:

```
Component → Hook → Service → Lib → API
                              ↑
                         You are here
```

## Lib vs Service

| Aspect | lib/ | services/ |
|--------|------|-----------|
| **Purpose** | Simple API client | Business logic layer |
| **Caching** | No caching | Yes, with TTL |
| **Error handling** | Basic (return null) | Enhanced (better messages) |
| **State** | Stateless | Can be stateful |
| **Consumed by** | Services | Hooks |
| **Example** | `fetchSunoPage()` | `sunoService.fetchUserSongs()` |

## Real Example from This Codebase

### lib/suno.ts
```typescript
// Low-level API client - no caching, no complex logic
export async function fetchSunoPage(
  username: string, 
  page: number
): Promise<SunoProfile | null> {
  const url = `${SUNO_API_BASE_URL}/api/profiles/${username}?page=${page}`;
  const response = await fetch(url);
  
  if (!response.ok) return null; // Simple error handling
  
  return response.json();
}

export async function fetchAllSunoSongs(
  username: string,
  onProgress?: (songs: Song[]) => void
): Promise<Song[]> {
  // Handles pagination
  // Handles deduplication
  // Calls onProgress for progressive loading
  // NO CACHING - that's the service layer's job
}
```

### How Services Use Lib

```typescript
// services/sunoService.ts wraps lib functions
import { fetchAllSunoSongs } from '@/lib/suno';

export const sunoService = {
  async fetchUserSongs(username: string): Promise<Song[]> {
    // Check cache first
    const cached = this.cache.get(username);
    if (cached) return cached;
    
    // Call lib function
    const songs = await fetchAllSunoSongs(username);
    
    // Cache result
    this.cache.set(username, songs);
    
    return songs;
  }
};
```

## Patterns

### API Client Structure
```typescript
// Null-safe API calls
export async function fetchData(id: string): Promise<Data | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Deduplication Pattern
Use Map for O(1) lookups:
```typescript
const itemsMap = new Map<string, Item>();
items.forEach(item => itemsMap.set(item.id, item));
return Array.from(itemsMap.values());
```

### Progressive Loading
```typescript
export async function fetchAll(
  id: string,
  onProgress?: (items: Item[]) => void
): Promise<Item[]> {
  const allItems = [];
  
  for (let page = 0; page < maxPages; page++) {
    const pageItems = await fetchPage(id, page);
    allItems.push(...pageItems);
    
    // Call progress callback with partial results
    if (onProgress) {
      onProgress([...allItems]);
    }
  }
  
  return allItems;
}
```

### Pagination Pattern
```typescript
export async function fetchAllPages(
  username: string
): Promise<Item[]> {
  let page = 0;
  let emptyPages = 0;
  const items = new Map<string, Item>();
  
  while (emptyPages < MAX_EMPTY_PAGES) {
    const data = await fetchPage(username, page);
    
    if (!data || data.items.length === 0) {
      emptyPages++;
      page++;
      continue;
    }
    
    emptyPages = 0;
    page++;
    
    // Deduplicate with Map
    data.items.forEach(item => items.set(item.id, item));
  }
  
  return Array.from(items.values());
}
```

## Best Practices

### ✅ Do This

- Keep functions pure and simple
- Return null on errors (let service handle)
- Use Map for deduplication
- Provide progress callbacks for long operations
- Use constants from `/constants`
- Document API endpoints

### ❌ Don't Do This

- Add caching (use services/)
- Complex error messages (use services/)
- Call other services
- React hooks (use hooks/)
- Business logic (use services/)

## File Naming

- camelCase: `apiClient.ts`, `dataProcessor.ts`
- Descriptive names for purpose
- Usually named after the external service: `suno.ts`, `spotify.ts`

## References

- [Root AGENTS.md](/AGENTS.md) - API integration patterns
- [services/AGENTS.md](../services/AGENTS.md) - Service layer that consumes lib
- [API Integration Skill](.github/skills/api-integration.md)
