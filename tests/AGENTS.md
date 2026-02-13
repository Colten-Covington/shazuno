# /tests Directory

**Purpose:** Test files for unit, integration, and E2E testing

## What This Directory Contains

Test suites organized by type and scope.

## Structure

```
tests/
├── unit/              # Unit tests
│   ├── utils/         # Test utils
│   ├── lib/           # Test lib functions
│   └── components/    # Test components
├── integration/       # Integration tests
│   ├── api/          # API integration tests
│   └── flows/        # User flow tests
└── e2e/              # End-to-end tests
    ├── auth.spec.ts
    └── search.spec.ts
```

## Patterns

### Unit Test (Jest + React Testing Library)
```typescript
// tests/unit/utils/similarity.test.ts
import { calculateSimilarity } from '@/utils/similarity';

describe('calculateSimilarity', () => {
  it('returns 1.0 for exact matches', () => {
    expect(calculateSimilarity('hello', 'hello')).toBe(1.0);
  });
  
  it('returns 0 for no matches', () => {
    expect(calculateSimilarity('hello', 'world')).toBe(0);
  });
});
```

### Component Test
```typescript
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/Button';

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2E Test (Playwright)
```typescript
// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('search functionality', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="search-input"]', 'query');
  await page.click('[data-testid="search-button"]');
  
  await expect(page.locator('[data-testid="results"]')).toBeVisible();
});
```

## File Naming

- `*.test.ts` or `*.spec.ts` for unit tests
- `*.integration.test.ts` for integration tests
- `*.spec.ts` for E2E tests

## Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

## References

- [Root AGENTS.md](/AGENTS.md)
- [Testing Skills](.github/skills/testing-skills.md)
