# /types Directory

**Purpose:** TypeScript type definitions and interfaces

## What This Directory Contains

- **speech.d.ts** - Web Speech API types and Song/Suno API interfaces

## Patterns

### Interface Definitions
```typescript
// Object shapes
export interface ComponentProps {
  title: string;
  optional?: number;
}

// API responses
export interface ApiResponse {
  id: string;
  data: DataType;
  metadata?: Record<string, unknown>;
}
```

### Type Exports
```typescript
// Export for reuse
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Union types
export type Result = SuccessResult | ErrorResult;
```

### Global Augmentations
```typescript
declare global {
  interface Window {
    customProperty: CustomType;
  }
}

export {};  // Make it a module
```

## File Naming

- camelCase with .d.ts extension: `api.d.ts`, `models.d.ts`
- Group related types

## Best Practices

- Prefer `interface` over `type` for object shapes
- Export all public types
- Document complex types with comments
- No `any` types - use `unknown` if needed

## References

- [Root AGENTS.md](/AGENTS.md) - TypeScript guidelines
- [TypeScript Skills](.github/skills/typescript-skills.md)
