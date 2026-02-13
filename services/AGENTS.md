# /services Directory

**Purpose:** Service layer for complex business logic and external integrations

## What This Directory Contains

Service classes/modules that orchestrate multiple operations or wrap external APIs.

## Patterns

### Service Structure
```typescript
// services/analytics.ts
export class AnalyticsService {
  private static instance: AnalyticsService;
  
  private constructor() {}
  
  static getInstance(): AnalyticsService {
    if (!this.instance) {
      this.instance = new AnalyticsService();
    }
    return this.instance;
  }
  
  trackEvent(name: string, properties?: Record<string, unknown>): void {
    // Implementation
  }
}

// Or functional approach
export const analyticsService = {
  trackEvent: (name: string, properties?: Record<string, unknown>) => {
    // Implementation
  },
};
```

### Common Services

- **auth.ts** - Authentication logic
- **storage.ts** - localStorage/sessionStorage wrapper
- **notification.ts** - Toast/notification system
- **validation.ts** - Complex validation logic
- **cache.ts** - Caching strategies

## Service vs Lib

- **lib/** - Simple API clients, direct external calls
- **services/** - Complex business logic, orchestration, state management

## File Naming

- camelCase: `authService.ts`, `storageService.ts`
- Descriptive of functionality

## References

- [Root AGENTS.md](/AGENTS.md)
- [lib/AGENTS.md](../lib/AGENTS.md) - For simpler API clients
