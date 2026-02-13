# Technology Stack Documentation

## Overview

Shazuno is built with a modern, lightweight technology stack focused on developer experience, performance, and type safety. This document provides detailed information about each technology used, version requirements, and best practices.

## Core Framework

### Next.js 15.0.8+
**Website:** https://nextjs.org/  
**Documentation:** https://nextjs.org/docs  
**Why we use it:**
- Modern App Router with file-system based routing
- Built-in TypeScript support with zero configuration
- Automatic code splitting and optimization
- Server and client component architecture
- Excellent developer experience with Fast Refresh
- Production-ready with minimal configuration

**Key Features Used:**
- App Router (`/app` directory)
- Client Components (`'use client'` directive)
- Metadata API for SEO
- Image optimization (Next.js Image component)
- Built-in CSS support

**Configuration:**
- File: `next.config.js`
- Remote image patterns configured for Suno CDN
- No custom webpack configuration needed

**Best Practices:**
- Use `'use client'` directive only when necessary (browser APIs, hooks)
- Leverage App Router for better performance
- Follow Next.js file naming conventions
- Use dynamic imports for code splitting when needed

**Learn More:**
- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [App Router Documentation](https://nextjs.org/docs/app)
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading)

---

## Runtime & Language

### React 18.3.0
**Website:** https://react.dev/  
**Documentation:** https://react.dev/reference/react  
**Why we use it:**
- Industry-standard UI library
- Concurrent features for better UX
- Hooks-based API for cleaner code
- Large ecosystem of tools and libraries
- Excellent TypeScript support

**Key Features Used:**
- Functional components with hooks
- `useState` for local state management
- `useEffect` for side effects
- `useCallback` for memoized functions
- `useMemo` for expensive calculations
- `useTransition` for non-blocking updates
- `useDeferredValue` for deferred rendering
- `useRef` for DOM references and mutable values

**Concurrent Features:**
```typescript
// Non-blocking state updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchResults(newResults);
});

// Deferred value for responsive input
const deferredQuery = useDeferredValue(searchQuery);
```

**Best Practices:**
- Prefer functional components over class components
- Use hooks for state and side effects
- Memoize expensive calculations with useMemo
- Stabilize function references with useCallback
- Use concurrent features for better perceived performance

**Learn More:**
- [React 18 Release Notes](https://react.dev/blog/2022/03/29/react-v18)
- [Hooks API Reference](https://react.dev/reference/react/hooks)
- [Concurrent Features](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react)

### TypeScript 5.0.0+
**Website:** https://www.typescriptlang.org/  
**Documentation:** https://www.typescriptlang.org/docs/  
**Why we use it:**
- Static type checking catches errors at compile time
- Excellent IDE support with IntelliSense
- Self-documenting code through type annotations
- Refactoring safety
- Better code maintainability

**Configuration:**
- File: `tsconfig.json`
- Strict mode enabled
- Target: ES2017
- Module: ESNext
- Path aliases: `@/*` maps to project root

**Type Safety Practices:**
- No `any` types - always use proper typing
- Custom type definitions in `/types` directory
- Strict null checks enabled
- Proper interface definitions for all props
- Type guards for runtime checks

**Custom Types:**
```typescript
// types/speech.d.ts
- Web Speech API interfaces
- Song and Suno API types
- Global window extensions
```

**Best Practices:**
- Define interfaces for all component props
- Use type inference where obvious
- Create custom types for external APIs
- Avoid type assertions unless necessary
- Use discriminated unions for complex types

**Learn More:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

---

## Styling

### Tailwind CSS 3.4.0
**Website:** https://tailwindcss.com/  
**Documentation:** https://tailwindcss.com/docs  
**Why we use it:**
- Utility-first approach for rapid development
- Built-in design system (spacing, colors, typography)
- Automatic CSS purging for minimal bundle size
- Excellent IDE support with IntelliSense
- Responsive design with mobile-first approach

**Configuration:**
- File: `tailwind.config.ts`
- Content paths configured for all components
- Custom color extensions for background/foreground
- PostCSS integration via `postcss.config.js`

**Common Patterns Used:**
```tsx
// Glassmorphism effect
className="bg-white/10 backdrop-blur-lg"

// Gradient backgrounds
className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"

// Hover and focus states
className="hover:bg-white/20 focus:ring-2 focus:ring-purple-500"

// Responsive design
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Animations
className="transition-all hover:scale-105 animate-pulse"
```

**Accessibility Utilities:**
- `sr-only` for screen reader only text
- `focus:ring` for keyboard focus indicators
- Semantic color choices for states

**Best Practices:**
- Use Tailwind's spacing scale consistently
- Leverage utility classes over custom CSS
- Use `@apply` sparingly (prefer utilities)
- Follow mobile-first responsive design
- Extract repeated patterns to components

**Learn More:**
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)

### PostCSS 8.4.47
**Website:** https://postcss.org/  
**Why we use it:**
- Required for Tailwind CSS processing
- Autoprefixer for browser compatibility
- CSS transformations and optimizations

**Configuration:**
```javascript
// postcss.config.js
{
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### Autoprefixer 10.4.20
**Why we use it:**
- Automatic vendor prefixes for CSS
- Ensures cross-browser compatibility
- Based on Can I Use database

---

## Package Management

### pnpm 9.0.0
**Website:** https://pnpm.io/  
**Documentation:** https://pnpm.io/motivation  
**Why we use it:**
- Faster than npm and yarn
- Disk space efficient (content-addressable store)
- Strict dependency resolution
- Better security (no phantom dependencies)

**Package Manager Field:**
```json
{
  "packageManager": "pnpm@9.0.0"
}
```

**Common Commands:**
```bash
pnpm install         # Install dependencies
pnpm dev            # Start development server
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # Run ESLint
```

**Best Practices:**
- Always use pnpm for consistency
- Commit pnpm-lock.yaml to git
- Use exact versions in package.json where critical
- Run `pnpm audit` regularly for security

**Learn More:**
- [pnpm vs npm benchmark](https://pnpm.io/benchmarks)
- [Workspaces](https://pnpm.io/workspaces)
- [CLI Commands](https://pnpm.io/cli/add)

---

## Code Quality

### ESLint 8.57.0
**Website:** https://eslint.org/  
**Documentation:** https://eslint.org/docs/latest/  
**Why we use it:**
- Catches bugs and code smells
- Enforces consistent code style
- Configurable rules
- Integrates with IDEs

**Configuration:**
- File: `eslint.config.mjs` (Flat config format)
- Extends: `eslint-config-next@16.1.6`
- Next.js specific rules enabled

**Running ESLint:**
```bash
pnpm lint           # Check for issues
pnpm lint --fix     # Auto-fix issues
```

**Best Practices:**
- Fix ESLint errors before committing
- Don't disable rules without good reason
- Use `// eslint-disable-next-line` sparingly
- Keep configuration minimal and extend presets

**Learn More:**
- [ESLint Rules](https://eslint.org/docs/latest/rules/)
- [Next.js ESLint](https://nextjs.org/docs/app/building-your-application/configuring/eslint)
- [Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

---

## Browser APIs

### Web Speech API
**Documentation:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API  
**Why we use it:**
- Native browser speech recognition
- No external dependencies or API costs
- Real-time transcription
- Good accuracy for supported browsers

**Browser Support:**
- ✅ Chrome/Chromium (full support)
- ✅ Edge (full support)
- ✅ Safari (full support)
- ❌ Firefox (not supported)

**Implementation:**
```typescript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
```

**Custom Type Definitions:**
- Location: `types/speech.d.ts`
- Provides TypeScript types for Speech API
- Extends Window interface

**Best Practices:**
- Check browser support before initializing
- Handle errors gracefully
- Provide text input fallback
- Use continuous mode for longer recordings
- Clean up recognition on component unmount

**Learn More:**
- [MDN Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Using the Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)
- [Browser Compatibility](https://caniuse.com/speech-recognition)

---

## External APIs

### Suno API
**Endpoint:** `https://studio-api.prod.suno.com`  
**Type:** Public REST API  
**Authentication:** None required (public profile data)

**API Usage:**
```typescript
// Fetch user's songs
GET /api/profiles/{username}
  ?clips_sort_by=created_at
  &playlists_sort_by=created_at
  &page={page}

// Response: SunoProfile with clips array
```

**Rate Limiting:**
- No official limits documented
- Implemented client-side debouncing (500ms)
- Stop after 10 consecutive empty pages

**Data Structure:**
```typescript
interface SunoClip {
  id: string;
  title: string;
  audio_url?: string;
  image_url?: string;
  image_large_url?: string;
  metadata?: {
    tags?: string;
    prompt?: string;
    gpt_description_prompt?: string;
  };
}
```

**Best Practices:**
- Handle null/undefined fields gracefully
- Deduplicate clips by ID
- Progressive loading with callbacks
- Error handling for network failures

**Integration:**
- Implementation: `lib/suno.ts`
- Utility functions for fetching and mapping
- Client-side only (no proxy needed)

---

## Development Tools

### Node.js 18.0.0+
**Required Version:** 18.0.0 or higher  
**Recommended:** 20.x LTS  
**Why:** Next.js 15 requires Node.js 18+

### Git
**Version Control:** GitHub  
**Repository:** https://github.com/Colten-Covington/shazuno

### IDE Recommendations

**VS Code Extensions:**
- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Prettier (optional)
- GitHub Copilot (optional)

**VS Code Settings:**
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Build & Deployment

### Build Process
```bash
pnpm build          # Creates .next/ directory
pnpm start          # Serves production build
```

**Build Output:**
- Optimized JavaScript bundles
- Static HTML pages
- CSS files (purged Tailwind)
- Image optimizations
- Server components (if used)

### Deployment Platforms

**Recommended: Vercel**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics included

**Also Compatible:**
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted Node.js

**Environment Variables:**
None required for current implementation (client-side only).

---

## Dependencies Summary

### Production Dependencies
```json
{
  "next": "^15.0.8",          // Core framework
  "react": "^18.3.0",         // UI library
  "react-dom": "^18.3.0"      // React DOM renderer
}
```

### Development Dependencies
```json
{
  "@types/node": "^20.0.0",           // Node.js types
  "@types/react": "^18.3.0",          // React types
  "@types/react-dom": "^18.3.0",      // React DOM types
  "autoprefixer": "^10.4.20",         // CSS autoprefixer
  "eslint": "^8.57.0",                // Linter
  "eslint-config-next": "^16.1.6",    // Next.js ESLint config
  "postcss": "^8.4.47",               // CSS processor
  "tailwindcss": "^3.4.0",            // Utility CSS
  "typescript": "^5.0.0"              // TypeScript compiler
}
```

**Total Dependencies:** 3 production, 8 development  
**Bundle Size:** ~95 kB (gzipped first load JS)

---

## Security & Maintenance

### Security Practices
- Regular dependency updates
- `pnpm audit` for vulnerability scanning
- No hardcoded secrets
- HTTPS only for external requests
- TypeScript for type safety

### Update Strategy
1. **Weekly:** Check for security updates
2. **Monthly:** Update dependencies
3. **Quarterly:** Review and update major versions
4. **Always:** Test before deploying

### Compatibility Matrix

| Dependency | Current | Min Version | Max Tested |
|-----------|---------|-------------|------------|
| Node.js | 20.x | 18.0.0 | 22.x |
| Next.js | 15.0.8 | 15.0.8 | 15.x |
| React | 18.3.0 | 18.3.0 | 18.x |
| TypeScript | 5.x | 5.0.0 | 5.x |
| Tailwind | 3.4.0 | 3.4.0 | 3.x |

---

## Learning Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Best Practices
- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

### Community Resources
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [React Patterns](https://reactpatterns.com/)
- [Tailwind Components](https://tailwindui.com/)

---

## Migration & Upgrade Guides

### Upgrading Next.js
1. Check [Next.js Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
2. Review breaking changes in release notes
3. Update `package.json` versions
4. Run `pnpm install`
5. Test thoroughly before deploying

### Upgrading React
1. Check [React Release Notes](https://react.dev/blog)
2. Review new features and deprecations
3. Update React and React DOM together
4. Test concurrent features compatibility

### Upgrading TypeScript
1. Check [TypeScript Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
2. Review breaking changes
3. Update `tsconfig.json` if needed
4. Fix type errors that arise

---

## Future Considerations

### Potential Additions
- **State Management:** Zustand or Redux (if app grows)
- **Testing:** Jest, React Testing Library, Playwright
- **API Layer:** tRPC or GraphQL (if backend added)
- **Database:** PostgreSQL or MongoDB (for persistence)
- **Authentication:** NextAuth.js (for user accounts)
- **Analytics:** Vercel Analytics or Google Analytics
- **Error Tracking:** Sentry
- **Form Handling:** React Hook Form
- **Validation:** Zod or Yup

### Not Currently Needed
- Backend framework (client-side is sufficient)
- State management library (React hooks work well)
- Component library (custom components with Tailwind)
- Testing framework (simple app, manual testing sufficient)

---

## Conclusion

This technology stack was carefully chosen to balance developer experience, performance, and maintainability. The minimal dependency approach keeps the bundle size small and reduces maintenance burden while still providing a modern, type-safe development experience.

For questions about any technology, refer to the official documentation linked in each section.
