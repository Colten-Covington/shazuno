# /utils Directory

**Purpose:** Pure utility functions and algorithms

## What This Directory Contains

- **similarity.ts** - Word-overlap matching algorithm for search

## Patterns

### Pure Functions
```typescript
/**
 * Calculate similarity between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score 0-1
 */
export function calculateSimilarity(str1: string, str2: string): number {
  // Pure function - no side effects
  // Deterministic - same inputs = same output
}
```

### Characteristics
- No side effects
- No external dependencies
- Easily testable
- Well-documented with JSDoc

### Performance
- Use efficient data structures (Set, Map)
- Optimize for common cases
- Document complexity (O(n), O(1), etc.)

## File Naming

- camelCase: `formatters.ts`, `validators.ts`, `helpers.ts`
- Group related utilities

## References

- [Root AGENTS.md](/AGENTS.md) - Code patterns
