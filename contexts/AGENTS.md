# /contexts Directory

**Purpose:** React Context providers for global state

## What This Directory Contains

React Context definitions for sharing state across component tree without prop drilling.

## Patterns

### Context Structure
```typescript
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

## When to Use Context

- Theme/preferences
- Authentication state
- Feature flags
- i18n/localization
- NOT for frequently changing data (use state management library)

## File Naming

- PascalCase: `ThemeContext.tsx`, `AuthContext.tsx`
- Export Provider and hook

## References

- [Root AGENTS.md](/AGENTS.md)
- [React Context Docs](https://react.dev/reference/react/useContext)
