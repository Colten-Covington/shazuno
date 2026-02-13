# React Patterns Skill

## Overview

This skill provides React 18 patterns and best practices used in the Shazuno project, focusing on functional components, hooks, performance optimization, and modern React patterns.

## Core Concepts

### 1. Functional Components
All components are functional, using hooks for state and side effects.

### 2. TypeScript Integration
Every component has strict TypeScript types with interfaces for props.

### 3. Performance First
Use concurrent features, memoization, and optimization patterns.

### 4. Accessibility
Components must be keyboard accessible and screen reader friendly.

## Patterns

### Pattern 1: Component Structure

```typescript
'use client';  // Only when using hooks or browser APIs

import { useState, useCallback, useEffect } from 'react';

interface ComponentProps {
  // Required props
  title: string;
  onAction: (value: string) => void;
  
  // Optional props
  subtitle?: string;
  isLoading?: boolean;
}

export default function Component({ 
  title, 
  onAction, 
  subtitle,
  isLoading = false 
}: ComponentProps) {
  // 1. State hooks
  const [value, setValue] = useState('');
  
  // 2. Memoized callbacks
  const handleSubmit = useCallback(() => {
    if (value.trim()) {
      onAction(value);
    }
  }, [value, onAction]);
  
  // 3. Effects
  useEffect(() => {
    // Side effect
    return () => {
      // Cleanup
    };
  }, []);
  
  // 4. Render
  return (
    <div className="p-4">
      {/* JSX */}
    </div>
  );
}
```

### Pattern 2: Performance Optimization

```typescript
import { useMemo, useCallback, useTransition, useDeferredValue } from 'react';

export default function SearchResults({ songs, query }) {
  // Defer non-urgent updates
  const deferredQuery = useDeferredValue(query);
  
  // Memoize expensive calculations
  const results = useMemo(() => {
    return songs
      .map(song => ({
        ...song,
        score: calculateSimilarity(song.lyrics, deferredQuery)
      }))
      .filter(song => song.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [songs, deferredQuery]);
  
  // Non-blocking state updates
  const [isPending, startTransition] = useTransition();
  
  const updateFilters = (newFilter) => {
    startTransition(() => {
      setFilter(newFilter);
    });
  };
  
  return <ResultsList results={results} isPending={isPending} />;
}
```

### Pattern 3: Event Handling

```typescript
export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');
  
  // Memoized handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  }, [query, onSearch]);
  
  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e as any);
    }
  }, [handleSubmit]);
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}
```

### Pattern 4: Debouncing

```typescript
export default function AutoSave({ value, onSave }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onSave(value);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value, onSave]);
  
  return null;
}
```

### Pattern 5: Conditional Rendering

```typescript
export default function DataDisplay({ data, isLoading, error }) {
  // Loading state
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-red-500/20 p-4 rounded" role="alert">
        {error}
      </div>
    );
  }
  
  // Empty state
  if (!data || data.length === 0) {
    return <div className="text-gray-400">No results found</div>;
  }
  
  // Success state
  return (
    <div className="grid gap-4">
      {data.map(item => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
```

### Pattern 6: Modal Management

```typescript
export default function Page() {
  const [activeModal, setActiveModal] = useState<Item | null>(null);
  
  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    
    if (activeModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [activeModal]);
  
  return (
    <>
      <button onClick={() => setActiveModal(item)}>
        View Details
      </button>
      
      {activeModal && (
        <Modal
          item={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
```

### Pattern 7: Form State Management

```typescript
interface FormState {
  username: string;
  email: string;
  password: string;
}

export default function Form() {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    email: '',
    password: ''
  });
  
  const handleChange = useCallback((field: keyof FormState) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };
  }, []);
  
  return (
    <form>
      <input value={formData.username} onChange={handleChange('username')} />
      <input value={formData.email} onChange={handleChange('email')} />
      <input value={formData.password} onChange={handleChange('password')} />
    </form>
  );
}
```

## Best Practices

### Do's ✅

1. **Use 'use client' directive** when needed
   - Browser APIs (window, localStorage)
   - React hooks
   - Event handlers

2. **Memoize appropriately**
   - Expensive calculations with useMemo
   - Callback functions with useCallback
   - Don't over-memoize simple operations

3. **Handle cleanup**
   - Return cleanup functions from useEffect
   - Clear timers and intervals
   - Remove event listeners

4. **Use concurrent features**
   - useTransition for non-blocking updates
   - useDeferredValue for responsive input
   - Suspense boundaries for loading states

5. **Type everything**
   - Define interfaces for props
   - Type state variables
   - Type event handlers

### Don'ts ❌

1. **Don't use class components**
   ```typescript
   // ❌ Bad
   class Component extends React.Component { }
   
   // ✅ Good
   function Component() { }
   ```

2. **Don't mutate state directly**
   ```typescript
   // ❌ Bad
   state.items.push(newItem);
   
   // ✅ Good
   setState(prev => [...prev, newItem]);
   ```

3. **Don't create functions in render**
   ```typescript
   // ❌ Bad
   <button onClick={() => handleClick(id)}>
   
   // ✅ Good
   const handleClick = useCallback(() => action(id), [id]);
   <button onClick={handleClick}>
   ```

4. **Don't use indexes as keys**
   ```typescript
   // ❌ Bad
   {items.map((item, i) => <div key={i}>{item}</div>)}
   
   // ✅ Good
   {items.map(item => <div key={item.id}>{item}</div>)}
   ```

5. **Don't forget dependency arrays**
   ```typescript
   // ❌ Bad - missing dependencies
   useEffect(() => {
     doSomething(value);
   }, []);
   
   // ✅ Good
   useEffect(() => {
     doSomething(value);
   }, [value]);
   ```

## Common Pitfalls

### Pitfall 1: Stale Closures
```typescript
// ❌ Problem
const [count, setCount] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    console.log(count);  // Always logs 0
  }, 1000);
  return () => clearInterval(interval);
}, []);

// ✅ Solution
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1);  // Use functional update
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### Pitfall 2: Unnecessary Re-renders
```typescript
// ❌ Problem - new object every render
<Child config={{ theme: 'dark' }} />

// ✅ Solution - memoize object
const config = useMemo(() => ({ theme: 'dark' }), []);
<Child config={config} />
```

### Pitfall 3: Missing Cleanup
```typescript
// ❌ Problem - memory leak
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ Solution - cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);
```

## Examples

### Example 1: Search Component with Debounce

```typescript
'use client';

import { useState, useEffect, useMemo } from 'react';

interface SearchProps {
  data: Item[];
  onResults: (results: Item[]) => void;
}

export default function Search({ data, onResults }: SearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Memoize search results
  const results = useMemo(() => {
    if (!debouncedQuery) return data;
    
    return data.filter(item =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [data, debouncedQuery]);
  
  // Notify parent of results
  useEffect(() => {
    onResults(results);
  }, [results, onResults]);
  
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
      className="w-full px-4 py-2 rounded-lg"
    />
  );
}
```

### Example 2: Progressive Loading

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ProgressiveList() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    fetchItems((progressItems) => {
      // Update UI with partial results
      setItems(progressItems);
    }).then(finalItems => {
      setItems(finalItems);
      setIsLoading(false);
    });
  }, []);
  
  return (
    <div>
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
      {isLoading && <div>Loading more...</div>}
    </div>
  );
}
```

## Resources

- [React Documentation](https://react.dev/)
- [React 18 Features](https://react.dev/blog/2022/03/29/react-v18)
- [Hooks API Reference](https://react.dev/reference/react/hooks)
- [Project Documentation](/docs/README.md)

---

**Skill Status:** Active  
**Last Updated:** 2026-02-13
