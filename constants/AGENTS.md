# /constants Directory

**Purpose:** Application constants and configuration values

## What This Directory Contains

Immutable values used throughout the application.

## Patterns

### Constant Definitions
```typescript
// constants/api.ts
export const API_BASE_URL = 'https://api.example.com';
export const API_TIMEOUT = 5000;
export const MAX_RETRIES = 3;

// constants/ui.ts
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// constants/validation.ts
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MAX_LENGTH = 50;
```

### Enums and Types
```typescript
export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  danger: '#ef4444',
} as const;

export type Color = typeof COLORS[keyof typeof COLORS];
```

## Naming Convention

- UPPER_SNAKE_CASE for primitive constants
- PascalCase for objects/enums
- Group by domain: `api.ts`, `routes.ts`, `validation.ts`

## Best Practices

- Use `as const` for type narrowing
- Document magic numbers
- Prefer constants over hardcoded values
- Export everything that might be reused

## References

- [Root AGENTS.md](/AGENTS.md)
