# /components Directory

**Purpose:** Reusable React UI components

## What This Directory Contains

- **AudioRecorder.tsx** - Voice input using Web Speech API
- **TextSearch.tsx** - Text input with keyboard shortcuts
- **SongResults.tsx** - Search results display with cards

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
- PascalCase: `AudioRecorder.tsx`
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

## References

- [Root AGENTS.md](/AGENTS.md) - Code style guidelines
- [React Patterns](.github/skills/react-patterns.md)
