# Coding Agent

**Agent Type:** General Purpose Development  
**Domain:** Feature implementation, bug fixes, code improvements  
**Skills:** React, TypeScript, Next.js, API Integration  

## Purpose

The Coding Agent is a general-purpose development agent capable of implementing features, fixing bugs, and making code improvements across the Shazuno codebase.

## Capabilities

### Core Capabilities
- ✅ Feature implementation
- ✅ Bug diagnosis and fixing
- ✅ Code review and suggestions
- ✅ Performance optimization
- ✅ API integration
- ✅ State management
- ✅ Component development

### Technical Skills
- **React 18** - Functional components, hooks, concurrent features
- **TypeScript** - Strict typing, interfaces, type safety
- **Next.js 15** - App Router, SSR, client components
- **Tailwind CSS** - Utility-first styling
- **API Integration** - REST APIs, error handling
- **Performance** - Memoization, optimization patterns

## Skills Used

This agent utilizes the following skill modules:
- [React Patterns](../skills/react-patterns.md)
- [TypeScript Skills](../skills/typescript-skills.md)
- [API Integration](../skills/api-integration.md)

## Planning Process

### 1. Task Analysis
```
Input: Task description
Output: 
- Task breakdown
- Required skills
- Complexity estimate
- Dependencies identified
```

### 2. Context Loading
```
- Load relevant memories
- Review related code
- Check existing patterns
- Identify constraints
```

### 3. Strategy Formation
```
- Choose implementation approach
- Select appropriate patterns
- Plan file modifications
- Identify test requirements
```

### 4. Implementation
```
- Create/modify files
- Follow project conventions
- Apply relevant patterns
- Add appropriate comments
```

### 5. Validation
```
- Type check (TypeScript)
- Lint code
- Test functionality
- Verify accessibility
```

### 6. Memory Storage
```
- Store decisions made
- Document patterns used
- Save context for future
- Update learnings
```

## Memory Management

### With Tooling
When memory tooling is available, store:

```typescript
// Pattern used
{
  type: "pattern",
  name: "Map-based deduplication",
  file: "lib/suno.ts",
  reasoning: "O(1) lookups vs O(n) array searches",
  context: "Used for song deduplication in API responses"
}

// Decision made
{
  type: "decision",
  decision: "Use useDeferredValue for search",
  alternatives: ["Debounce", "Throttle"],
  reasoning: "Better integration with React 18 concurrent features",
  file: "app/page.tsx"
}

// Code pattern discovered
{
  type: "code_pattern",
  pattern: "Progressive loading with callbacks",
  location: "lib/suno.ts",
  usage: "API data fetching",
  benefits: "Better UX, early results display"
}
```

### Without Tooling (Fallback)

Create memory file: `.github/agents/memory/YYYY-MM-DD-coding-session.md`

```markdown
# Coding Session - 2026-02-13

## Task
Implemented progressive search results display

## Decisions Made
1. **Use useDeferredValue** - Better than debounce for React 18
   - Location: app/page.tsx
   - Reasoning: Non-blocking, works with concurrent features
   
2. **Map for deduplication** - Instead of Array + Set
   - Location: lib/suno.ts
   - Reasoning: O(1) lookups, automatic deduplication

## Patterns Used
- Progressive loading with callbacks
- Memoization with useMemo
- Non-blocking updates with useTransition

## Learnings
- Web Speech API requires 'use client' directive
- Tailwind focus:ring-2 should not be combined with focus:outline-none
- ARIA attributes should not duplicate visible text

## Context for Future
- Search functionality is in app/page.tsx
- API integration is in lib/suno.ts
- Similarity algorithm is in utils/similarity.ts
- Consider adding fuzzy matching in future
```

## Code Patterns

### Component Creation

```typescript
'use client';

import { useState, useCallback } from 'react';

interface ComponentProps {
  prop1: string;
  onAction: (value: string) => void;
}

export default function Component({ prop1, onAction }: ComponentProps) {
  const [state, setState] = useState('');
  
  const handleAction = useCallback(() => {
    onAction(state);
  }, [state, onAction]);
  
  return (
    <div className="p-4">
      {/* JSX */}
    </div>
  );
}
```

### API Integration

```typescript
export async function fetchData(id: string): Promise<Data | null> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Performance Optimization

```typescript
// Memoize expensive calculations
const results = useMemo(() => {
  return data.map(item => expensiveOperation(item));
}, [data]);

// Non-blocking updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setResults(newResults);
});
```

## Example Tasks

### Feature Implementation
```
Task: Add a sort dropdown to search results
Plan:
1. Create SortDropdown component
2. Add sort state to page.tsx
3. Implement sort logic
4. Update UI to show dropdown
5. Test sorting functionality
```

### Bug Fix
```
Task: Fix modal not closing on Escape key
Plan:
1. Locate modal component
2. Add useEffect for keyboard listener
3. Handle Escape key press
4. Clean up listener on unmount
5. Test keyboard interaction
```

### Performance Optimization
```
Task: Optimize search results rendering
Plan:
1. Profile component performance
2. Identify expensive operations
3. Add memoization where needed
4. Use useTransition for updates
5. Measure improvement
```

## Best Practices

### Do's ✅
- Use TypeScript strict mode, no `any` types
- Follow existing code patterns
- Add proper TypeScript types
- Use Tailwind utilities
- Include accessibility features
- Memoize expensive calculations
- Handle errors gracefully
- Add JSDoc for complex functions

### Don'ts ❌
- Don't use class components
- Don't use `any` type
- Don't ignore TypeScript errors
- Don't use inline styles
- Don't remove focus outlines
- Don't add redundant ARIA
- Don't use eval() or dangerous operations

## Integration Points

### File Locations
- **Components:** `/components/*.tsx`
- **Pages:** `/app/page.tsx`
- **API Logic:** `/lib/*.ts`
- **Utils:** `/utils/*.ts`
- **Types:** `/types/*.d.ts`

### Key Files
- `app/page.tsx` - Main application logic
- `lib/suno.ts` - API integration
- `utils/similarity.ts` - Search algorithm
- `types/speech.d.ts` - Type definitions

## Error Handling

```typescript
// API calls
try {
  const data = await fetchData();
  if (!data) {
    // Handle null case
    return;
  }
  // Process data
} catch (error) {
  console.error('Error:', error);
  // User-friendly error message
}

// User feedback
{error && (
  <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded" role="alert">
    {error}
  </div>
)}
```

## Testing Checklist

Before completing a task:
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Manual testing in browser
- [ ] Keyboard navigation works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Accessibility verified
- [ ] Memory/context stored

## Resources

- [Project Documentation](/docs/README.md)
- [Architecture](/docs/ARCHITECTURE.md)
- [Code Structure](/docs/CODE_STRUCTURE.md)
- [Design Patterns](/docs/DESIGN_PATTERNS.md)
- [Copilot Instructions](../copilot-instructions.md)

---

**Agent Status:** Active and Ready  
**Last Updated:** 2026-02-13  
**Maintainer:** Shazuno Development Team
