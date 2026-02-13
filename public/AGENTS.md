# /public Directory

**Purpose:** Static assets served at root path

## What This Directory Contains

Static files served directly by Next.js without processing:

- **images/** - Logos, icons, illustrations
- **fonts/** - Custom font files (if not using next/font)
- **documents/** - PDFs, legal documents
- **favicon.ico** - Site favicon
- **robots.txt** - Search engine instructions
- **sitemap.xml** - Site map for SEO

## File Organization

```
public/
├── images/
│   ├── logo.svg
│   ├── hero.jpg
│   └── icons/
│       ├── twitter.svg
│       └── github.svg
├── fonts/
│   └── custom-font.woff2
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

## Usage in Code

```typescript
// Reference from root path
<img src="/images/logo.svg" alt="Logo" />
<link rel="icon" href="/favicon.ico" />
```

## Best Practices

- Optimize images before adding (use tools like ImageOptim)
- Use WebP format for better compression
- Prefer next/image component for images (optimizes automatically)
- Keep files small and compress when possible
- Use descriptive names: `hero-image.jpg` not `img1.jpg`

## What NOT to Put Here

- Components (use /components)
- Styles (use /app or component co-location)
- Code files (TypeScript, JavaScript)
- Environment-specific configs

## Next.js Image Optimization

Use next/image instead of direct references:
```typescript
import Image from 'next/image';

<Image 
  src="/images/hero.jpg" 
  alt="Hero" 
  width={800} 
  height={600}
/>
```

## References

- [Root AGENTS.md](/AGENTS.md)
- [Next.js Static Files Docs](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
