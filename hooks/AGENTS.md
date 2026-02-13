# /hooks Directory

**Purpose:** Custom React hooks for reusable stateful logic

## What This Directory Contains

Custom hooks that encapsulate reusable React logic.

## Patterns

### Hook Structure
```typescript
'use client';

import { useState, useEffect } from 'react';

export function useCustomHook(param: string) {
  const [state, setState] = useState<Type>(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [param]);
  
  return { state, setState };
}
```

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

## Example: useDebounce

```typescript
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}
```

## References

- [Root AGENTS.md](/AGENTS.md)
- [React Patterns](.github/skills/react-patterns.md)
