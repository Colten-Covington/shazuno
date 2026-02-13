# Vercel Platform Features

## Introduction

This guide covers Vercel-specific features and optimizations for deploying Next.js applications. Vercel provides powerful platform capabilities that enhance performance, scalability, and developer experience.

## Table of Contents

- [Deployment](#deployment)
- [Caching Strategies](#caching-strategies)
- [Edge Functions](#edge-functions)
- [Serverless Functions](#serverless-functions)
- [Image Optimization](#image-optimization)
- [Analytics and Monitoring](#analytics-and-monitoring)
- [Preview Deployments](#preview-deployments)
- [Environment Variables](#environment-variables)
- [Edge Config](#edge-config)
- [Performance Best Practices](#performance-best-practices)

## Deployment

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches
- **Instant rollback**: Revert to any previous deployment

### Build Configuration

```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"] // Washington DC (default)
}
```

### Build Output

```bash
# Vercel automatically detects Next.js and:
# 1. Runs `pnpm build`
# 2. Generates serverless functions for routes
# 3. Optimizes static assets
# 4. Configures CDN distribution
```

### Custom Build Steps

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "vercel-build": "pnpm db:migrate && next build"
  }
}
```

### Best Practices

✅ **Use pnpm** - Faster installs (already configured in this project)
✅ **Minimize build time** - Keep dependencies lean
✅ **Use caching** - Vercel caches node_modules between builds
✅ **Monitor build logs** - Check for warnings and errors

❌ **Don't run tests in build** - Use separate CI step
❌ **Avoid heavy build-time operations** - Can timeout (max 15 min free tier)
❌ **Don't commit .vercel/** - Auto-generated, in .gitignore

## Caching Strategies

### Types of Caching

Vercel provides multiple caching layers:

1. **Static Assets** - Automatic, permanent
2. **API Routes** - Manual control via headers
3. **Pages** - ISR (Incremental Static Regeneration)
4. **Data Cache** - fetch() with Next.js caching

### Static Regeneration (ISR)

```typescript
// Revalidate every hour
export const revalidate = 3600;

export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{/* render */}</div>;
}
```

### On-Demand Revalidation

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Verify secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  // Revalidate specific path
  revalidatePath('/songs');
  
  // Or revalidate by tag
  revalidateTag('songs');
  
  return NextResponse.json({ revalidated: true });
}
```

### Cache Control Headers

```typescript
// app/api/data/route.ts
export async function GET() {
  const data = await fetchData();
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
    },
  });
}
```

**Cache-Control Options:**
- `s-maxage=60` - Cache for 60 seconds
- `stale-while-revalidate=30` - Serve stale for 30s while revalidating
- `public` - Can be cached by CDN
- `private` - User-specific, don't cache
- `no-store` - Don't cache at all

### fetch() Caching

```typescript
// Default: cache forever
await fetch(url);

// No caching
await fetch(url, { cache: 'no-store' });

// Revalidate after 60 seconds
await fetch(url, { next: { revalidate: 60 } });

// Tag-based revalidation
await fetch(url, { next: { tags: ['songs'] } });
```

### Best Practices

✅ **Use ISR for mostly-static** - Content that changes occasionally
✅ **Tag your caches** - Use tags for granular invalidation
✅ **Set appropriate TTLs** - Balance freshness vs performance
✅ **Monitor cache hit rates** - Check Vercel Analytics

❌ **Don't cache user-specific data** - Use `Cache-Control: private`
❌ **Avoid very short TTLs** - Under 1 second defeats caching
❌ **Don't forget to invalidate** - Stale data can confuse users

## Edge Functions

### What are Edge Functions?

Edge Functions run on Vercel's Edge Network (globally distributed):
- **Lower latency** - Run closer to users
- **No cold starts** - Always warm
- **Lightweight runtime** - V8 isolates, not containers

### Using Edge Runtime

```typescript
// app/api/hello/route.ts
export const runtime = 'edge'; // Use Edge Runtime

export async function GET(request: Request) {
  return new Response('Hello from Edge!', {
    headers: {
      'content-type': 'text/plain',
    },
  });
}
```

### Edge Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Runs on Edge automatically
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-edge-processed', 'true');
  
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### Edge vs Serverless

| Feature | Edge | Serverless |
|---------|------|------------|
| **Runtime** | V8 isolates | Node.js |
| **Cold starts** | None | Possible |
| **Execution time** | < 30s | < 60s (free tier) |
| **Memory** | 128MB | Up to 1GB |
| **APIs** | Web APIs only | Full Node.js |
| **Use case** | Simple, fast operations | Complex logic, databases |

### Edge Runtime Limitations

✅ **Can use:**
- fetch API
- Web Crypto API
- URL, Headers, Request, Response
- TextEncoder/Decoder

❌ **Cannot use:**
- Node.js APIs (fs, path, crypto)
- npm packages with Node.js dependencies
- Heavy computation

### Best Practices

✅ **Use Edge for:**
- Authentication/authorization
- A/B testing
- Redirects and rewrites
- Simple API endpoints
- Geographic routing

✅ **Use Serverless for:**
- Database connections
- Complex business logic
- File processing
- Third-party API integrations

❌ **Don't use Edge for:**
- Heavy computation
- Large npm packages
- Node.js-specific operations

## Serverless Functions

### Automatic Function Generation

Next.js API routes become serverless functions:

```typescript
// app/api/search/route.ts
export async function POST(request: Request) {
  const { query } = await request.json();
  
  // Connect to database, call APIs, etc.
  const results = await searchDatabase(query);
  
  return Response.json(results);
}
```

Vercel automatically:
1. Creates serverless function
2. Handles scaling
3. Manages cold starts
4. Provides logging

### Function Configuration

```typescript
// app/api/expensive/route.ts
export const config = {
  maxDuration: 10, // Max execution time (seconds)
  memory: 1024, // MB (pro plan)
};

export async function POST(request: Request) {
  // Long-running operation
}
```

### Duration Limits

| Plan | Max Duration |
|------|--------------|
| **Hobby** | 10 seconds |
| **Pro** | 60 seconds |
| **Enterprise** | 900 seconds |

### Cold Starts

Serverless functions can have cold starts (first invocation):

**Minimize cold starts:**
- Keep dependencies small
- Use Edge Runtime when possible
- Enable function warming (Pro plan)
- Optimize imports

### Best Practices

✅ **Keep functions small** - One responsibility per function
✅ **Minimize dependencies** - Reduces bundle size and cold starts
✅ **Use connection pooling** - For database connections
✅ **Return quickly** - Aim for < 1s response time

❌ **Don't keep state** - Functions are stateless
❌ **Avoid long polling** - Use streaming or webhooks instead
❌ **Don't process large files** - Use streaming or external storage

## Image Optimization

### Automatic Optimization

Vercel automatically optimizes images:
- **Format conversion** - WebP, AVIF for supported browsers
- **Responsive sizing** - Multiple sizes for different devices
- **Quality compression** - Reduces file size
- **Lazy loading** - Only load when visible

### Using next/image

```typescript
import Image from 'next/image';

// Remote images (optimized by Vercel)
<Image
  src="https://cdn2.suno.ai/image.jpg"
  alt="Song artwork"
  width={300}
  height={300}
  quality={80} // 1-100, default 75
  priority={false} // Load immediately or lazy load
/>
```

### Image API

Vercel's Image Optimization API handles:
- Format negotiation (WebP, AVIF)
- Device-specific sizing
- Caching (immutable URLs)
- CDN distribution

### Configuration

```javascript
// next.config.js
module.exports = {
  images: {
    // Allowed remote patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.suno.ai',
        pathname: '/**',
      },
    ],
    
    // Image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Supported formats
    formats: ['image/avif', 'image/webp'],
    
    // Cache duration
    minimumCacheTTL: 60, // seconds
  },
};
```

### Image Limits

| Plan | Source Images | Optimized Images |
|------|---------------|------------------|
| **Hobby** | 1000/month | 1000/month |
| **Pro** | 5000/month | 5000/month |
| **Enterprise** | Custom | Custom |

### Best Practices

✅ **Always use next/image** - Automatic optimization
✅ **Provide dimensions** - Prevents layout shift
✅ **Use priority for LCP** - For above-fold images
✅ **Configure remote patterns** - Whitelist external sources

❌ **Don't use <img>** - Misses all optimizations
❌ **Avoid very large source images** - Resize before uploading
❌ **Don't skip alt text** - Accessibility and SEO

## Analytics and Monitoring

### Web Vitals

Vercel tracks Core Web Vitals automatically:
- **LCP** - Largest Contentful Paint
- **FID** - First Input Delay
- **CLS** - Cumulative Layout Shift

### Speed Insights

Enable in Vercel dashboard:
```typescript
// Automatic tracking, no code changes needed
```

### Real User Monitoring

See actual user performance:
- Geographic distribution
- Device types
- Performance over time
- Slow page identification

### Custom Events

```typescript
// Track custom events
import { track } from '@vercel/analytics';

track('song_searched', {
  query: searchQuery,
  results: resultCount,
});
```

### Log Drain

Forward logs to external services:
- Datadog
- New Relic
- Logtail
- Custom webhook

### Best Practices

✅ **Monitor Web Vitals** - Track performance trends
✅ **Set up alerts** - Get notified of issues
✅ **Use custom events** - Track business metrics
✅ **Review regularly** - Weekly performance check

❌ **Don't ignore warnings** - Performance degradation compounds
❌ **Avoid excessive custom events** - Can hit quota limits
❌ **Don't track PII** - Privacy and compliance issues

## Preview Deployments

### Automatic Previews

Every pull request gets:
- **Unique URL** - `https://[branch]-[repo]-[user].vercel.app`
- **Full environment** - Identical to production
- **Comments on PR** - Direct link to preview
- **Automatic updates** - On every push

### Preview-Specific Config

```typescript
// Different behavior for preview
const apiUrl = process.env.VERCEL_ENV === 'preview'
  ? 'https://staging-api.example.com'
  : 'https://api.example.com';
```

### Environment Detection

```typescript
// Vercel provides these env vars
const isProd = process.env.VERCEL_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';
const isDev = process.env.VERCEL_ENV === 'development';
```

### Best Practices

✅ **Test in preview** - Before merging to main
✅ **Share preview links** - Get stakeholder feedback
✅ **Use for QA** - Test features in isolation
✅ **Check different branches** - Each gets own preview

❌ **Don't use preview for load testing** - Limited resources
❌ **Avoid production data in previews** - Use test/staging data
❌ **Don't share preview links publicly** - Can be indexed

## Environment Variables

### Types of Variables

1. **Production** - Used in production deployments
2. **Preview** - Used in preview deployments
3. **Development** - Used locally

### Adding Variables

```bash
# Via Vercel CLI
vercel env add API_KEY production

# Via Dashboard
# Settings → Environment Variables
```

### System Variables

Vercel provides automatically:
```typescript
VERCEL="1"
VERCEL_ENV="production" | "preview" | "development"
VERCEL_URL="your-app-[hash].vercel.app"
VERCEL_REGION="iad1"
VERCEL_GIT_COMMIT_SHA="abc123"
VERCEL_GIT_COMMIT_REF="main"
```

### Using in Code

```typescript
// Server-side only
const apiKey = process.env.API_KEY;

// Client-side (must be prefixed with NEXT_PUBLIC_)
const publicKey = process.env.NEXT_PUBLIC_API_KEY;
```

### Best Practices

✅ **Use System Variables** - Leverage built-in vars
✅ **Prefix client vars** - NEXT_PUBLIC_ for browser access
✅ **Different values per environment** - Prod vs preview
✅ **Never commit secrets** - Use Vercel dashboard

❌ **Don't expose secrets to client** - No NEXT_PUBLIC_ for secrets
❌ **Avoid hardcoding** - Use environment variables
❌ **Don't share production keys** - Use separate keys per environment

## Edge Config

### What is Edge Config?

Ultra-low latency key-value storage on Edge Network:
- **< 1ms reads** - Globally distributed
- **No cold starts** - Always available
- **Automatic sync** - Updates propagate globally

### Creating Edge Config

```bash
# Via Vercel CLI
vercel edge-config create my-config

# Link to project
vercel env add EDGE_CONFIG production
```

### Using Edge Config

```typescript
import { get } from '@vercel/edge-config';

export async function GET() {
  // Ultra-fast read from edge
  const featureFlags = await get('features');
  
  if (featureFlags?.newSearch) {
    // Use new search algorithm
  }
  
  return Response.json({ features: featureFlags });
}
```

### Use Cases

Perfect for:
- **Feature flags** - Toggle features globally
- **A/B test config** - Experiment settings
- **Redirects** - Dynamic URL rewrites
- **Rate limits** - Per-user quotas
- **Small datasets** - < 512KB

### Best Practices

✅ **Use for config data** - Small, frequently-read values
✅ **Keep size small** - Under 512KB total
✅ **Cache locally** - Reduce read operations
✅ **Use for feature flags** - Perfect use case

❌ **Don't use as database** - Not for large datasets
❌ **Avoid frequent writes** - Optimized for reads
❌ **Don't store secrets** - Use environment variables

## Performance Best Practices

### Optimize Build Time

```json
// next.config.js
module.exports = {
  // Only transpile needed packages
  transpilePackages: ['package-name'],
  
  // Skip type checking in build (use CI instead)
  typescript: {
    ignoreBuildErrors: true, // Only in CI
  },
  
  // Skip linting in build
  eslint: {
    ignoreDuringBuilds: true, // Only in CI
  },
};
```

### Reduce Bundle Size

```typescript
// Use dynamic imports
const Heavy = dynamic(() => import('@/components/Heavy'));

// Tree-shakeable imports
import { specific } from 'library'; // ✅
import * as lib from 'library'; // ❌
```

### Optimize Images

```typescript
// All song artwork
<Image
  src={song.imageUrl}
  alt={song.title}
  width={300}
  height={300}
  sizes="(max-width: 768px) 100vw, 300px"
  quality={75} // Balance quality/size
  placeholder="blur"
  blurDataURL={song.blurHash} // Low-res placeholder
/>
```

### Monitor Performance

```bash
# Check bundle size
npm run build

# Lighthouse score
npm run lighthouse

# Core Web Vitals in Vercel Dashboard
```

### Best Practices

✅ **Monitor bundle size** - Keep under budget
✅ **Use Web Vitals** - Track real user performance
✅ **Optimize images** - Biggest wins usually
✅ **Minimize dependencies** - Audit regularly

❌ **Don't ignore build warnings** - They compound
❌ **Avoid large client bundles** - Prefer Server Components
❌ **Don't skip performance testing** - Test on slow networks

## Vercel-Specific Tips

### 1. Use Edge When Possible
Edge Functions have zero cold starts and lower latency.

### 2. Leverage ISR
Incremental Static Regeneration gives you static speed with dynamic content.

### 3. Monitor Analytics
Vercel Analytics shows real performance issues, not lab tests.

### 4. Use Preview Deployments
Test everything before production, automatically.

### 5. Configure Caching
Proper Cache-Control headers dramatically improve performance.

### 6. Optimize Images
next/image with Vercel's Image Optimization API is powerful.

### 7. Keep Functions Small
Smaller functions = faster cold starts and lower costs.

### 8. Use System Variables
Vercel provides useful env vars automatically.

## Conclusion

Vercel provides powerful features that enhance Next.js applications:

1. **Automatic deployments** - Push to deploy
2. **Global edge network** - Fast everywhere
3. **Built-in optimizations** - Images, caching, etc.
4. **Developer experience** - Previews, analytics, logs
5. **Scalability** - Auto-scaling, no ops needed

The platform handles infrastructure so you can focus on building features.

## Related Documentation

- [Next.js Best Practices](NEXTJS-BEST-PRACTICES.md) - Framework patterns
- [Architecture](ARCHITECTURE.md) - System design
- [Deployment Guide](DEVELOPMENT.md) - How to deploy
- [Vercel Documentation](https://vercel.com/docs) - Official docs
