# /components Directory

**Purpose:** Reusable React UI components

## What This Directory Contains

Reusable React components for your application UI. Currently includes:

- **Header.tsx** - Configurable app header with title and subtitle
- **GitHubLink.tsx** - Configurable GitHub repository link

Add your own components here as you build features.

## Component Patterns

### Structure
```typescript
'use client';

import { useState, useCallback } from 'react';

interface ComponentProps {
  prop: string;
  onAction: (value: string) => void;
}

export default function Component({ prop, onAction }: ComponentProps) {
  const [state, setState] = useState('');
  
  const handleAction = useCallback(() => {
    onAction(state);
  }, [state, onAction]);
  
  return <div className="p-4">{/* JSX */}</div>;
}
```

### Naming Convention
- PascalCase: `MyComponent.tsx`
- Default export for components
- Named exports for utilities/types

### Styling
- Tailwind CSS utilities only
- No inline styles
- Mobile-first responsive design

## Accessibility Requirements

- Semantic HTML first (`<button>`, `<section>`, `<article>`)
- ARIA only when semantic HTML insufficient
- Keyboard navigation support
- Focus indicators with `focus:ring-2`

## When to Use 'use client'

Only add `'use client'` when your component:
- Uses React hooks (useState, useEffect, etc.)
- Uses browser APIs (window, document, localStorage)
- Handles user interactions (onClick, onChange)
- Uses Context consumers

Keep Server Components by default for better performance.

## References

- [Root AGENTS.md](/AGENTS.md) - Code style guidelines
- [Next.js Components](https://nextjs.org/docs/app/building-your-application/rendering)
