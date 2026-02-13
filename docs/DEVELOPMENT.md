# Development Guide

## Getting Started

### Prerequisites

- **Node.js:** 18.0.0 or higher (20.x LTS recommended)
- **pnpm:** 9.0.0 or higher
- **Git:** Latest version
- **Browser:** Chrome, Edge, or Safari (for voice features)
- **Code Editor:** VS Code recommended

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Colten-Covington/shazuno.git
   cd shazuno
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

```
shazuno/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── AudioRecorder.tsx  # Voice recording component
│   ├── SongResults.tsx    # Search results display
│   └── TextSearch.tsx     # Text search input
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # Architecture documentation
│   ├── TECH_STACK.md      # Technology documentation
│   └── DEVELOPMENT.md     # This file
├── lib/                   # Business logic
│   └── suno.ts           # Suno API integration
├── types/                 # TypeScript definitions
│   └── speech.d.ts       # Custom type definitions
├── utils/                 # Utility functions
│   └── similarity.ts     # Search algorithm
├── .gitignore            # Git ignore rules
├── eslint.config.mjs     # ESLint configuration
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies and scripts
├── pnpm-lock.yaml        # Dependency lock file
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project readme
```

## Development Workflow

### Daily Development

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and test:**
   ```bash
   pnpm dev  # Development server with hot reload
   ```

4. **Lint your code:**
   ```bash
   pnpm lint
   ```

5. **Build to verify:**
   ```bash
   pnpm build
   ```

### Available Scripts

```bash
pnpm dev      # Start development server (port 3000)
pnpm build    # Create production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Code Style Guidelines

#### TypeScript

**DO:**
```typescript
// Use explicit types for function parameters
function calculateScore(lyrics: string, query: string): number {
  // ...
}

// Use interfaces for object shapes
interface SongProps {
  title: string;
  lyrics: string;
  matchScore: number;
}

// Use type inference for obvious cases
const songs = data.map(clip => mapClipToSong(clip));
```

**DON'T:**
```typescript
// Avoid 'any' type
function process(data: any) { }  // ❌

// Avoid implicit any
function process(data) { }  // ❌

// Don't use var
var x = 5;  // ❌ Use const or let
```

#### React Components

**DO:**
```typescript
// Use functional components
export default function MyComponent({ title }: { title: string }) {
  // ...
}

// Use hooks for state
const [count, setCount] = useState(0);

// Use useCallback for handlers passed as props
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);

// Use 'use client' directive when needed
'use client';
```

**DON'T:**
```typescript
// Don't use class components
class MyComponent extends React.Component { }  // ❌

// Don't create functions inside JSX
<button onClick={() => handleClick()}>  // ❌ (unless unavoidable)
```

#### Tailwind CSS

**DO:**
```tsx
// Use utility classes
<div className="flex items-center gap-4 p-6 bg-white/10 rounded-lg">

// Use responsive modifiers
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Use state modifiers
<button className="hover:bg-blue-600 focus:ring-2">
```

**DON'T:**
```tsx
// Don't use inline styles (unless necessary)
<div style={{ padding: '1rem' }}>  // ❌

// Don't create custom CSS files (use Tailwind utilities)
import './custom.css';  // ❌ (unless global styles)
```

#### File Naming

- **Components:** PascalCase - `AudioRecorder.tsx`
- **Utilities:** camelCase - `similarity.ts`
- **Types:** camelCase - `speech.d.ts`
- **Config:** lowercase with dots - `next.config.js`

### Git Workflow

#### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(search): add fuzzy matching algorithm"
git commit -m "fix(audio): handle microphone permission denial"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(suno): extract API logic to lib directory"
```

#### Branch Naming

```
feature/short-description   # New features
fix/short-description       # Bug fixes
refactor/short-description  # Code refactoring
docs/short-description      # Documentation
```

#### Pull Request Process

1. **Create branch from main**
2. **Make changes and commit**
3. **Push to GitHub**
4. **Create Pull Request with description**
5. **Request review from maintainer**
6. **Address review feedback**
7. **Merge after approval**

## Component Development

### Creating a New Component

1. **Create file in `/components`:**
   ```typescript
   // components/MyComponent.tsx
   'use client';  // If using hooks or browser APIs
   
   import { useState } from 'react';
   
   interface MyComponentProps {
     title: string;
     onAction: (value: string) => void;
   }
   
   export default function MyComponent({ title, onAction }: MyComponentProps) {
     const [value, setValue] = useState('');
     
     return (
       <div className="p-4 bg-white/10 rounded-lg">
         <h2 className="text-xl font-bold">{title}</h2>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Import in parent component:**
   ```typescript
   import MyComponent from '@/components/MyComponent';
   ```

3. **Use the component:**
   ```tsx
   <MyComponent title="Hello" onAction={handleAction} />
   ```

### Component Patterns

#### State Management
```typescript
// Local state
const [state, setState] = useState(initialValue);

// Computed values
const computed = useMemo(() => {
  return expensiveCalculation(state);
}, [state]);

// Side effects
useEffect(() => {
  // Effect code
  return () => {
    // Cleanup
  };
}, [dependencies]);

// Callbacks
const callback = useCallback((arg) => {
  // Function code
}, [dependencies]);
```

#### Props Pattern
```typescript
// Define props interface
interface Props {
  // Required props
  title: string;
  onAction: () => void;
  
  // Optional props
  subtitle?: string;
  isLoading?: boolean;
  
  // Props with defaults
  maxResults?: number;  // Default: 10
}

// Use with defaults
export default function Component({ 
  title, 
  onAction, 
  subtitle, 
  isLoading = false,
  maxResults = 10 
}: Props) {
  // ...
}
```

#### Accessibility Pattern
```tsx
<button
  onClick={handleClick}
  disabled={isDisabled}
  aria-label="Search songs"  // When no visible text
  aria-pressed={isActive}     // For toggle buttons
  aria-disabled={isDisabled}  // For disabled state
  className="focus:ring-2"    // Focus indicator
>
  Search
</button>

<section aria-labelledby="heading-id">
  <h2 id="heading-id">Section Title</h2>
  {/* Content */}
</section>

<div role="alert" aria-live="polite">
  {statusMessage}
</div>
```

## Testing Strategy

### Manual Testing Checklist

**Before committing:**
- [ ] Run `pnpm lint` - no errors
- [ ] Run `pnpm build` - builds successfully
- [ ] Test text search functionality
- [ ] Test voice recording (Chrome/Edge)
- [ ] Test on mobile viewport
- [ ] Check browser console for errors
- [ ] Verify accessibility (keyboard navigation)

**Browser Testing:**
- Chrome (primary)
- Edge (voice features)
- Safari (voice features)
- Firefox (text features only)

### Unit Testing (Future)

When adding tests, use this structure:

```typescript
// __tests__/similarity.test.ts
import { calculateSimilarity } from '@/utils/similarity';

describe('calculateSimilarity', () => {
  it('returns 1.0 for exact matches', () => {
    expect(calculateSimilarity('hello world', 'hello world')).toBe(1.0);
  });
  
  it('returns 0.9 for all words present', () => {
    const result = calculateSimilarity('hello beautiful world', 'world hello');
    expect(result).toBe(0.9);
  });
});
```

## Debugging

### Development Tools

**React DevTools:**
- Install browser extension
- Inspect component tree
- View props and state
- Profile performance

**Browser DevTools:**
- Console: Check for errors/warnings
- Network: Monitor API calls
- Application: Check local storage
- Performance: Profile rendering

### Common Issues

**Issue: Voice recording not working**
- Solution: Use Chrome or Edge, check microphone permissions

**Issue: Songs not loading**
- Solution: Check network tab, verify username exists on Suno.com

**Issue: TypeScript errors**
- Solution: Run `pnpm install` to update types

**Issue: Build fails**
- Solution: Check for ESLint errors, fix TypeScript errors

### Debugging Tips

```typescript
// Add console logs (remove before committing)
console.log('Debug:', variable);

// Use React DevTools to inspect state

// Check Network tab for API calls

// Use TypeScript to catch type errors early
```

## Performance Optimization

### Best Practices

1. **Use React.memo for expensive components:**
   ```typescript
   export default React.memo(MyComponent);
   ```

2. **Memoize calculations:**
   ```typescript
   const result = useMemo(() => calculate(data), [data]);
   ```

3. **Debounce expensive operations:**
   ```typescript
   useEffect(() => {
     const timer = setTimeout(() => {
       expensiveOperation();
     }, 500);
     return () => clearTimeout(timer);
   }, [dependency]);
   ```

4. **Use code splitting for large components:**
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

### Performance Monitoring

```bash
# Build and analyze bundle
pnpm build

# Check bundle size in output
# First Load JS should be < 100kB
```

## Accessibility

### Requirements

- **WCAG 2.1 Level AA** compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators visible
- Semantic HTML elements
- ARIA attributes when needed

### Testing

```bash
# Manual keyboard testing
- Tab: Navigate forward
- Shift+Tab: Navigate backward
- Enter/Space: Activate buttons
- Esc: Close modals

# Screen reader testing
- macOS: VoiceOver (Cmd+F5)
- Windows: NVDA (free)
```

### Common Patterns

```tsx
// Skip navigation
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to content
</a>

// Semantic HTML
<main id="main-content">
  <section aria-labelledby="heading">
    <h2 id="heading">Title</h2>
  </section>
</main>

// Form labels
<label htmlFor="input-id">Label</label>
<input id="input-id" type="text" />

// Live regions
<div role="alert" aria-live="polite">
  {statusMessage}
</div>
```

## Security

### Best Practices

1. **No secrets in code** - Use environment variables
2. **Validate user input** - Check types and ranges
3. **Use HTTPS only** - For external API calls
4. **Keep dependencies updated** - Run `pnpm audit`
5. **No eval() or Function()** - Avoid dynamic code execution
6. **Sanitize output** - React does this automatically

### Security Checklist

- [ ] No hardcoded API keys or secrets
- [ ] All external requests use HTTPS
- [ ] User input is validated
- [ ] Dependencies are up to date
- [ ] No XSS vulnerabilities
- [ ] CORS is properly configured

## Deployment

### Production Build

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start

# Check build output
# Should see optimized bundles and routes
```

### Vercel Deployment

1. **Connect repository to Vercel**
2. **Configure build settings:**
   - Framework: Next.js
   - Build command: `pnpm build`
   - Output directory: `.next`
   - Install command: `pnpm install`

3. **Deploy:**
   - Automatic on push to main
   - Preview deployments for PRs

### Environment Variables

Currently none required. For future use:

```bash
# .env.local (not committed)
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Troubleshooting

### Common Problems

**Problem:** pnpm command not found
```bash
# Solution: Install pnpm globally
npm install -g pnpm@9.0.0
```

**Problem:** Port 3000 already in use
```bash
# Solution: Use different port
pnpm dev -p 3001
```

**Problem:** Module not found
```bash
# Solution: Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Problem:** TypeScript errors after update
```bash
# Solution: Clear Next.js cache
rm -rf .next
pnpm dev
```

## Getting Help

- **Documentation:** Check `/docs` folder
- **Issues:** GitHub Issues for bug reports
- **Discussions:** GitHub Discussions for questions
- **Code:** Read existing code for patterns

## Next Steps

1. **Read [ARCHITECTURE.md](./ARCHITECTURE.md)** - Understand system design
2. **Read [TECH_STACK.md](./TECH_STACK.md)** - Learn about technologies
3. **Read [CONTRIBUTING.md](../CONTRIBUTING.md)** - Contribution guidelines
4. **Start coding!** - Pick an issue or feature to work on

---

**Happy coding! 🚀**
