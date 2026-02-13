# /middleware Directory

**Purpose:** Next.js middleware for request/response processing

## What This Directory Contains

Edge middleware that runs before requests are completed.

## Patterns

### Middleware Structure
```typescript
// middleware.ts (root) or middleware/auth.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
```

## Common Use Cases

- Authentication/authorization
- Redirects (A/B testing, i18n)
- Rate limiting
- Custom headers
- Request logging
- Feature flags

## File Organization

```
middleware/
├── auth.ts        # Authentication middleware
├── rateLimit.ts   # Rate limiting
└── logger.ts      # Request logging
```

## Performance Notes

- Runs on Edge runtime (limited APIs)
- Keep lightweight and fast
- No filesystem access
- Limited Node.js APIs

## References

- [Root AGENTS.md](/AGENTS.md)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
