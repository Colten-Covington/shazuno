# AGENTS.md

This file provides instructions for AI coding agents working on the Shazuno project.

## Directory-Specific Guidance

Each major directory has its own AGENTS.md file with targeted instructions. The **closest AGENTS.md to the file you're editing takes precedence**:

| Directory | Purpose | AGENTS.md |
|-----------|---------|-----------|
| [/app](app/) | Next.js App Router pages & layouts | [app/AGENTS.md](app/AGENTS.md) |
| [/components](components/) | Reusable React components | [components/AGENTS.md](components/AGENTS.md) |
| [/lib](lib/) | Business logic & API clients | [lib/AGENTS.md](lib/AGENTS.md) |
| [/utils](utils/) | Pure utility functions | [utils/AGENTS.md](utils/AGENTS.md) |
| [/types](types/) | TypeScript type definitions | [types/AGENTS.md](types/AGENTS.md) |
| [/hooks](hooks/) | Custom React hooks | [hooks/AGENTS.md](hooks/AGENTS.md) |
| [/contexts](contexts/) | React Context providers | [contexts/AGENTS.md](contexts/AGENTS.md) |
| [/constants](constants/) | App constants & config | [constants/AGENTS.md](constants/AGENTS.md) |
| [/services](services/) | Service layer & orchestration | [services/AGENTS.md](services/AGENTS.md) |
| [/middleware](middleware/) | Next.js middleware | [middleware/AGENTS.md](middleware/AGENTS.md) |
| [/tests](tests/) | Test files (unit/integration/e2e) | [tests/AGENTS.md](tests/AGENTS.md) |
| [/public](public/) | Static assets | [public/AGENTS.md](public/AGENTS.md) |
| [/docs](docs/) | Project documentation | [docs/AGENTS.md](docs/AGENTS.md) |

**Principle:** Read the directory-specific AGENTS.md for focused guidance on that part of the codebase.

## Project Overview

**Shazuno** is a Shazam-like web application for searching songs from Suno.com using text or voice input.

**Tech Stack:**
- Next.js 15 (App Router)
- React 18 with concurrent features
- TypeScript (strict mode)
- Tailwind CSS 3.4
- pnpm 9.0.0

**Key Features:**
- Voice recognition using Web Speech API
- Text-based search with smart matching
- Real-time progressive loading from Suno API
- WCAG 2.2 AA accessibility compliance

## Build and Test Commands

### Development
```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Testing
```bash
# Currently no automated tests - manual testing required
# Test checklist:
# - Browser: Chrome, Edge, Safari (for voice features)
# - Keyboard navigation (Tab, Enter, Escape)
# - Mobile viewport (responsive design)
# - Screen reader (VoiceOver on macOS, NVDA on Windows)
```

## Project Structure

```
/app              - Next.js App Router (pages and layouts)
/components       - React components (AudioRecorder, TextSearch, SongResults)
/lib              - Business logic (Suno API integration)
/utils            - Utility functions (similarity algorithm)
/types            - TypeScript type definitions
/docs             - Comprehensive documentation
/.github/agents   - Specialized agent definitions
/.github/skills   - Reusable skill modules
```

## Code Style Guidelines

### TypeScript
- ✅ **Strict mode enabled** - No `any` types
- ✅ **Explicit types** for function parameters and returns
- ✅ **Interfaces** for object shapes (prefer over `type`)
- ✅ **Custom types** in `/types` directory
- ❌ Never use `any` type
- ❌ No implicit types

Example:
```typescript
interface ComponentProps {
  title: string;
  onAction: (value: string) => void;
  isLoading?: boolean;
}

export default function Component({ title, onAction, isLoading = false }: ComponentProps) {
  // Implementation
}
```

### React Components
- ✅ **Functional components only** (no class components)
- ✅ **'use client' directive** when using hooks or browser APIs
- ✅ **Hook order:** State → Callbacks → Effects → Render
- ✅ **Default export** for components
- ❌ Don't use class components
- ❌ Don't create functions inside JSX render

Example:
```typescript
'use client';

import { useState, useCallback } from 'react';

export default function Component({ onSearch }: Props) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = useCallback(() => {
    if (query.trim()) onSearch(query);
  }, [query, onSearch]);
  
  return <div>{/* JSX */}</div>;
}
```

### Performance Patterns
- ✅ **useMemo** for expensive calculations
- ✅ **useCallback** for function props
- ✅ **useTransition** for non-blocking updates
- ✅ **useDeferredValue** for responsive input
- ✅ **Map\<string, T\>** for deduplication (not Array + Set)

### Styling (Tailwind CSS)
- ✅ **Utility-first** approach
- ✅ **Mobile-first** responsive design (use `md:` and `lg:`)
- ✅ **Consistent spacing** using Tailwind scale
- ❌ No inline `style` attributes
- ❌ No custom CSS files

Example:
```tsx
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 rounded-lg transition-colors disabled:opacity-50">
  Submit
</button>
```

### Accessibility (WCAG 2.2 AA)
- ✅ **Semantic HTML first** (`<main>`, `<section>`, `<button>`, `<article>`)
- ✅ **ARIA only when needed** (semantic HTML preferred)
- ✅ **Keyboard navigation** for all interactive elements
- ✅ **Focus indicators** with `focus:ring-2`
- ✅ **Screen reader support** (`.sr-only` class for hidden text)
- ❌ Don't use `<div>` for buttons
- ❌ Don't remove focus outlines without replacement

Example:
```tsx
<section aria-labelledby="search-heading">
  <h2 id="search-heading" className="sr-only">Search Songs</h2>
  <label htmlFor="search-input">Search Query</label>
  <input id="search-input" type="text" className="focus:ring-2 focus:ring-blue-500" />
  <button className="focus:ring-2">Search</button>
</section>
```

## Testing Instructions

### Manual Testing Checklist
Before committing code:
- [ ] Run `pnpm lint` - no errors
- [ ] Run `pnpm build` - builds successfully
- [ ] Test in Chrome (primary browser)
- [ ] Test voice recording (requires Chrome/Edge/Safari)
- [ ] Test on mobile viewport (responsive design)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Check browser console for errors
- [ ] Verify focus indicators are visible
- [ ] Test with screen reader (VoiceOver/NVDA) if accessibility-related

### Browser Support
- **Voice Features:** Chrome, Edge, Safari (Web Speech API)
- **Text Search:** All modern browsers
- **Best Experience:** Chrome or Edge

## Commit Message Guidelines

Follow Conventional Commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
feat(search): add fuzzy matching algorithm
fix(audio): handle microphone permission denial
docs(readme): update installation instructions
refactor(suno): extract API logic to lib directory
```

## Pull Request Guidelines

### Before Creating PR
1. **Run checks:** `pnpm lint` and `pnpm build`
2. **Test manually** (see testing checklist above)
3. **Write clear description** explaining what and why
4. **Keep changes focused** - one feature/fix per PR
5. **Update documentation** if needed

### PR Title Format
```
type(scope): description
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested manually
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Accessibility checked
- [ ] Cross-browser tested

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

## Security Considerations

### Critical Rules
- ❌ **Never commit secrets** (API keys, passwords, tokens)
- ❌ **No eval() or Function()** - code injection risk
- ❌ **No dangerouslySetInnerHTML** - XSS vulnerability
- ✅ **Use HTTPS only** for external API calls
- ✅ **Validate user input** (trim, sanitize)
- ✅ **TypeScript strict mode** (compile-time type checking)
- ✅ **React auto-escaping** (prevents XSS by default)

### Dependency Security
```bash
# Check for vulnerabilities
pnpm audit

# Update dependencies
pnpm update
```

## Self-Improvement Protocol 🔄

### **MANDATORY: After Every Task**

Self-improvement is **NOT OPTIONAL** and should **NOT require prompting**.

**After completing ANY task:**

1. ✅ **Verify changes exist** - Run `git status` and `git diff`
2. ✅ **Update documentation** - Minimum: one AGENTS.md file  
3. ✅ **Add real examples** - From actual code changes
4. ✅ **Document learnings** - Patterns and anti-patterns

**Critical Reminder:** Never write commit messages or summaries before verifying changes with `git status`.

### Quick Self-Improvement Checklist

```markdown
- [ ] Ran `git status` - verified changes exist
- [ ] Ran `git diff` - reviewed actual changes
- [ ] Updated relevant AGENTS.md file(s)
- [ ] Added real code examples from codebase
- [ ] Documented any patterns discovered
- [ ] Documented any anti-patterns avoided
- [ ] Build passes successfully
```

### See Full Protocol

For comprehensive guidance: [docs/SELF-IMPROVEMENT.md](docs/SELF-IMPROVEMENT.md)

**Key sections:**
- Verification Protocol (Step 0 - do this FIRST!)
- Common Failure Patterns (learn from past mistakes)
- Post-Task Reflection Template
- Documentation Quality Checklist

## Critical Reminders ⚠️

### Verification First
- **ALWAYS** run `git status` before claiming completion
- **ALWAYS** run `git diff` before writing commit messages
- **ALWAYS** verify new files exist before claiming creation
- **NEVER** write summaries for changes that don't exist

### Self-Improvement Always
- **EVERY task** ends with self-improvement
- **NOT OPTIONAL** - it's part of completing the task
- **MINIMUM**: Update one AGENTS.md + one real example
- **AUTOMATIC** - don't wait to be prompted

### Real Examples Only
- Only use code that actually exists in the codebase
- Reference specific files and line numbers
- Test that all examples work
- No hypothetical or made-up examples

# Project uses pnpm@9.0.0 - specified in package.json
```

### Environment Variables
Currently none required. For future use:
- Store in `.env.local` (not committed)
- Prefix with `NEXT_PUBLIC_` for client-side variables
- Never expose secrets to client

## Common Patterns

### API Integration (lib/suno.ts)
```typescript
export async function fetchData(id: string): Promise<Data | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Use Map for deduplication
const itemsMap = new Map<string, Item>();
items.forEach(item => itemsMap.set(item.id, item));
const uniqueItems = Array.from(itemsMap.values());
```

### State Management (app/page.tsx)
```typescript
// Debounce expensive operations
useEffect(() => {
  const timer = setTimeout(() => {
    performAction(value);
  }, 500);
  return () => clearTimeout(timer);
}, [value]);

// Deferred updates for responsive input
const deferredValue = useDeferredValue(searchQuery);

// Memoized calculations
const results = useMemo(() => {
  return calculateResults(deferredValue, data);
}, [deferredValue, data]);
```

## Specialized Agents

For domain-specific tasks, specialized agents are available in `.github/agents/`:

| Task Type | Agent File | Use When |
|-----------|------------|----------|
| General coding | [coding-agent.md](.github/agents/coding-agent.md) | Features, bugs, improvements |
| Accessibility | [accessibility-agent.md](.github/agents/accessibility-agent.md) | WCAG compliance, ARIA, keyboard nav |
| Refactoring | See [agents/README.md](.github/agents/README.md) | Code quality improvements |
| Documentation | See [agents/README.md](.github/agents/README.md) | Docs creation/updates |
| Testing | See [agents/README.md](.github/agents/README.md) | Test writing (when added) |

**Reusable Skills** in `.github/skills/`:
- [React Patterns](.github/skills/react-patterns.md) - Component design, hooks, performance
- [TypeScript Skills](.github/skills/typescript-skills.md) - Type safety, interfaces
- [Accessibility Skills](.github/skills/accessibility-skills.md) - WCAG, ARIA, keyboard nav
- And more - see [skills/README.md](.github/skills/README.md)

## Documentation

Comprehensive docs in `/docs`:
- [Architecture](docs/ARCHITECTURE.md) - System design and data flow
- [Tech Stack](docs/TECH_STACK.md) - Technology documentation
- [Code Structure](docs/CODE_STRUCTURE.md) - File organization
- [Development](docs/DEVELOPMENT.md) - Setup and workflow
- [Design Patterns](docs/DESIGN_PATTERNS.md) - Coding patterns
- [Best Practices](docs/BEST_PRACTICES.md) - Industry standards
- [Contributing](CONTRIBUTING.md) - Contribution guidelines

## Memory Management for Agents

### With Memory Tooling
If your agent supports memory storage, use it to store:
- Code patterns discovered
- Decisions made
- Context for future sessions
- Learned conventions

### Without Memory Tooling (Fallback)
Create memory files in `.github/agents/memory/`:
```markdown
# Session - YYYY-MM-DD

## Task
Description of work completed

## Decisions Made
1. Decision with reasoning
2. Alternative approaches considered

## Patterns Used
- Pattern names and locations

## Learnings
- What was discovered
- What to remember for next time
```

## Self-Improvement Protocol 🔄

**After completing any task, invest in future productivity:**

### Why Self-Improve?
Every task is an opportunity to make the next task easier. By documenting learnings immediately, we prevent repeating mistakes and build institutional knowledge.

### Quick Self-Improvement Checklist

After completing work:
1. ✅ **Reflect** - What changed? What was learned?
2. ✅ **Document** - Update relevant AGENTS.md with patterns
3. ✅ **Add Examples** - Use real code from your changes
4. ✅ **Mark Anti-Patterns** - Document what NOT to do
5. ✅ **Verify** - Check documentation is accurate

### What to Update

**Always update at minimum:**
- Relevant AGENTS.md file (root or directory)
- Add one real code example
- Document one pattern or anti-pattern

**For significant work, also update:**
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system changes
- [docs/DESIGN_PATTERNS.md](docs/DESIGN_PATTERNS.md) for new patterns
- [docs/BEST_PRACTICES.md](docs/BEST_PRACTICES.md) for standards
- In-code JSDoc comments for complex functions

### Documentation Best Practices

When updating AGENTS.md or docs:
- ✅ **Use real examples** from the codebase (file names, line numbers)
- ✅ **Show comparisons** (✅ correct vs ❌ wrong)
- ✅ **Explain "why"** not just "what"
- ✅ **Add visual indicators** (⚠️ warnings, 💡 tips)
- ✅ **Cross-reference** related documentation
- ✅ **Test examples** - verify code actually works

### Example Pattern Documentation

```markdown
## Pattern Discovered: Hook Initialization

**Problem:** Hooks with useEffect don't trigger on mount without initial values
**Solution:** Pass initial parameters to hooks

**Example:**
✅ Correct: `useSunoSongs(DEFAULT_SUNO_USERNAME)` - loads immediately
❌ Wrong: `useSunoSongs()` - never triggers useEffect

**Why:** Empty string doesn't pass `if (value)` checks in useEffect
```

### Comprehensive Guide

For detailed self-improvement guidance, see:
📚 **[docs/SELF-IMPROVEMENT.md](docs/SELF-IMPROVEMENT.md)** - Complete protocol with templates and examples

**Remember:** You're not just writing code. You're building knowledge for future agents!

## Quick Reference

### File Naming
- Components: PascalCase (`AudioRecorder.tsx`)
- Utils: camelCase (`similarity.ts`)
- Types: camelCase (`speech.d.ts`)

### Import Aliases
- `@/` maps to project root
- Example: `import Component from '@/components/Component'`

### Key Files
- `app/page.tsx` - Main application logic
- `lib/suno.ts` - Suno API integration  
- `utils/similarity.ts` - Search algorithm
- `types/speech.d.ts` - Type definitions

### Need Help?
1. Check [/docs/README.md](docs/README.md) for documentation index
2. Review [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design
3. See [CODE_STRUCTURE.md](docs/CODE_STRUCTURE.md) for file locations
4. Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution process

---

**Last Updated:** 2026-02-13  
**Maintained By:** Shazuno Development Team  
**Agent Format:** Follows [Agentic AI Foundation](https://agents.md) standard
