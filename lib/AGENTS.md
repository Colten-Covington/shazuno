# /lib Directory

**Purpose:** Business logic, API clients, and external service integrations

## What This Directory Contains

- **suno.ts** - Suno API client with pagination and deduplication

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
  // Fetch pages and call onProgress with partial results
}
```

## File Naming

- camelCase: `apiClient.ts`, `dataProcessor.ts`
- Descriptive names for purpose

## References

- [Root AGENTS.md](/AGENTS.md) - API integration patterns
- [API Integration Skill](.github/skills/api-integration.md)
