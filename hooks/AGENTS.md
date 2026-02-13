# /hooks Directory

**Purpose:** Custom React hooks for reusable stateful logic

## What This Directory Contains

Custom hooks that encapsulate reusable React logic. Currently includes:

- **useModal.ts** - Generic modal state management hook

Add your custom hooks here as you build features.

## Architecture Layering ⚠️

**Correct Pattern:**
```
Hook → Service → Lib → API
```

Hooks should call services (which provide caching, error handling, business logic), not lib directly.

**Example pattern:**
```typescript
// ✅ CORRECT: Hook uses service layer
import { myService } from '@/services';

export function useMyData(id: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    // Service provides caching, validation, error handling
    myService.getData(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);
  
  return { data, loading };
}
```

**Anti-pattern:**
```typescript
// ❌ WRONG: Hook bypasses service layer
import { fetchData } from '@/lib/api';

export function useMyData(id: string) {
  // Missing caching, error handling from service layer
  const data = await fetchData(id);
}
```

## Hook Initialization Best Practice

**Hooks with useEffect need initial values to trigger on mount:**

```typescript
// ✅ CORRECT: Pass initial value
export function useSunoSongs(initialUsername?: string) {
  const [username, setUsername] = useState(initialUsername || '');
  
  useEffect(() => {
    if (username) {
      // This runs on mount if initialUsername provided
      loadData(username);
    }
  }, [username]);
}

// Usage
const hook = useSunoSongs('beginbot'); // Loads immediately
```

```typescript
// ❌ WRONG: No initial value
export function useSunoSongs() {
  const [username, setUsername] = useState(''); // Empty!
  
  useEffect(() => {
    if (username) {
      // This never runs on mount
      loadData(username);
    }
  }, [username]);
}

// Usage
const hook = useSunoSongs(); // Nothing loads
```

## Patterns

### Hook Structure
```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { someService } from '@/services'; // Use services, not lib!

interface UseCustomHookReturn {
  data: Type[];
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useCustomHook(initialValue?: string): UseCustomHookReturn {
  const [data, setData] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(initialValue || '');
  
  const loadData = useCallback(async (val: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call service, not lib!
      const result = await someService.fetchData(val);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (value) {
      loadData(value);
    }
  }, [value, loadData]);
  
  return { data, isLoading, error, refresh: () => loadData(value) };
}
```

### Common Hooks in This Project

- **useSpeechRecognition** - Web Speech API wrapper
- **useSunoSongs** - Song loading with service layer caching
- **useSongSearch** - Search with deferred values
- **useModal** - Generic modal state management

### Common Hooks to Create

- **useDebounce** - Debounce value changes
- **useLocalStorage** - Persist state to localStorage
- **useMediaQuery** - Responsive breakpoint detection
- **useFetch** - Data fetching with loading/error states
- **useForm** - Form state management

## Naming Convention

- Prefix with `use`: `useAuth.ts`, `useTheme.ts`
- One hook per file
- Export as named export

## References

- [Root AGENTS.md](/AGENTS.md)
- [services/AGENTS.md](../services/AGENTS.md) - Service layer guidance
- [React Patterns](.github/skills/react-patterns.md)
