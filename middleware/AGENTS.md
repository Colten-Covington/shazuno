# /middleware Directory

**Purpose:** Next.js middleware for request interception and routing proxy

## What is Middleware?

Middleware runs **before a request is completed**, allowing you to:
- Modify request/response headers
- Redirect or rewrite URLs
- Check authentication
- Implement A/B testing
- Add custom logic to routing

## Middleware in Next.js 15

### Location and Naming

```
middleware.ts       # Root level (runs on all routes)
middleware/         # Directory for organization (optional)
```

### Basic Structure

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read request properties
  const url = request.nextUrl;
  const headers = request.headers;
  const cookies = request.cookies;
  
  // Create response
  const response = NextResponse.next();
  
  // Modify response
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// Configure which routes run middleware
export const config = {
  matcher: [
    '/api/:path*',           // All API routes
    '/((?!_next/static|_next/image|favicon.ico).*)' // Exclude static files
  ],
};
```

## Common Patterns

### Authentication Check

```typescript
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

### Custom Headers

```typescript
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  return response;
}
```

### URL Rewriting

```typescript
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Rewrite /old-path to /new-path
  if (url.pathname === '/old-path') {
    url.pathname = '/new-path';
    return NextResponse.rewrite(url);
  }
  
  // Redirect (changes browser URL)
  if (url.pathname === '/redirect-me') {
    return NextResponse.redirect(new URL('/new-location', request.url));
  }
  
  return NextResponse.next();
}
```

### Geographic Routing

```typescript
export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US';
  
  // Route to country-specific page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(
      new URL(`/${country.toLowerCase()}`, request.url)
    );
  }
  
  return NextResponse.next();
}
```

### A/B Testing

```typescript
export function middleware(request: NextRequest) {
  const bucket = request.cookies.get('bucket');
  
  if (!bucket) {
    // Assign random bucket
    const newBucket = Math.random() > 0.5 ? 'a' : 'b';
    const response = NextResponse.next();
    response.cookies.set('bucket', newBucket);
    return response;
  }
  
  // Route based on bucket
  if (request.nextUrl.pathname === '/feature') {
    return NextResponse.rewrite(
      new URL(`/feature-${bucket.value}`, request.url)
    );
  }
  
  return NextResponse.next();
}
```

### Rate Limiting

```typescript
const rateLimit = new Map<string, number[]>();

export function middleware(request: NextRequest) {
  const ip = request.ip || 'anonymous';
  const now = Date.now();
  const requests = rateLimit.get(ip) || [];
  
  // Keep only requests from last minute
  const recentRequests = requests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 60) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }
  
  rateLimit.set(ip, [...recentRequests, now]);
  return NextResponse.next();
}
```

## Edge Runtime

Middleware runs on **Edge Runtime** (not Node.js), which has limitations:

### ✅ Can Use

- `fetch` API
- `Headers`, `Request`, `Response`
- `URL`, `URLSearchParams`
- `crypto` (Web Crypto API)
- `TextEncoder`, `TextDecoder`
- `NextRequest`, `NextResponse`

### ❌ Cannot Use

- Node.js APIs (`fs`, `path`, `crypto` module)
- Heavy npm packages
- Database connections (use Edge-compatible clients)
- Long-running operations (>30s timeout)

## Matcher Configuration

### Basic Matchers

```typescript
export const config = {
  matcher: '/api/:path*', // All /api routes
};
```

### Multiple Matchers

```typescript
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/((?!_next|static).*)', // Complex regex
  ],
};
```

### Excluding Paths

```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## Request/Response Properties

### NextRequest

```typescript
export function middleware(request: NextRequest) {
  // URL information
  request.url              // Full URL
  request.nextUrl          // Parsed URL object
  request.nextUrl.pathname // '/path'
  request.nextUrl.search   // '?query=value'
  
  // Headers
  request.headers.get('user-agent')
  
  // Cookies
  request.cookies.get('name')
  request.cookies.getAll()
  
  // Geographic info (Vercel)
  request.geo?.country   // 'US'
  request.geo?.city      // 'San Francisco'
  request.geo?.region    // 'CA'
  
  // IP address
  request.ip             // '192.168.1.1'
}
```

### NextResponse

```typescript
// Continue to next middleware/route
NextResponse.next();

// Redirect (changes browser URL)
NextResponse.redirect(new URL('/login', request.url));

// Rewrite (internal, URL stays same)
NextResponse.rewrite(new URL('/internal-path', request.url));

// Custom response
new NextResponse('Content', {
  status: 200,
  headers: { 'Content-Type': 'text/plain' },
});

// JSON response
NextResponse.json({ data: 'value' });
```

## Best Practices

✅ **Keep middleware lightweight** - Runs on every matching request
✅ **Use matcher config** - Only run on necessary routes
✅ **Handle errors gracefully** - Don't break entire app
✅ **Use for cross-cutting concerns** - Auth, headers, redirects
✅ **Test thoroughly** - Affects all requests

❌ **Don't do heavy processing** - Slows down all requests
❌ **Avoid database calls** - Use Edge-compatible solutions
❌ **Don't use for business logic** - Keep in route handlers
❌ **Avoid complex regex** - Can impact performance
❌ **Don't forget to test** - Easy to break routing

## Current Project Status

**Status:** Middleware directory exists but no middleware.ts file yet

**Future use cases for this project:**
- Rate limiting for Suno API requests
- Custom CORS headers
- Request logging
- Geographic routing for different regions

## Creating Middleware

```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Your logic here
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
```

## Debugging Middleware

```typescript
export function middleware(request: NextRequest) {
  console.log('Middleware:', request.nextUrl.pathname);
  console.log('Headers:', Object.fromEntries(request.headers));
  
  const response = NextResponse.next();
  console.log('Response headers:', Object.fromEntries(response.headers));
  
  return response;
}
```

## Performance Considerations

- **Middleware runs on every request** - Keep it fast
- **Edge Runtime limits** - 30s timeout, 128MB memory
- **No cold starts on Edge** - But still add latency
- **Avoid external API calls** - Increases request time
- **Use caching** - Cache computations when possible

## Security Considerations

✅ **Validate inputs** - Don't trust request data
✅ **Set security headers** - CSP, X-Frame-Options, etc.
✅ **Rate limit** - Prevent abuse
✅ **Check authentication** - Before allowing access

❌ **Don't expose secrets** - Never log sensitive data
❌ **Avoid open redirects** - Validate redirect URLs
❌ **Don't trust headers** - Headers can be spoofed

## References

- [Root AGENTS.md](/AGENTS.md) - Project-wide guidance
- [Next.js Best Practices](../docs/NEXTJS-BEST-PRACTICES.md) - Middleware patterns
- [Vercel Features](../docs/VERCEL-FEATURES.md) - Edge Runtime details
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware) - Official documentation
