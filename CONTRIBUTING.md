# Contributing to Buzz Stack

Thank you for your interest in contributing to Buzz Stack! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or trolling
- Publishing others' private information
- Any conduct inappropriate in a professional setting

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- pnpm 9.0.0+ installed
- Git configured with your GitHub account
- A code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/shazuno.git
   cd shazuno
   ```
3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/Colten-Covington/shazuno.git
   ```
4. **Install dependencies:**
   ```bash
   pnpm install
   ```
5. **Start development server:**
   ```bash
   pnpm dev
   ```

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

#### 🐛 Bug Reports
- Found a bug? Open an issue with detailed steps to reproduce
- Include browser version, OS, and screenshots if applicable

#### ✨ Feature Requests
- Have an idea? Open an issue to discuss it first
- Explain the use case and expected behavior
- Be open to feedback and discussion

#### 📝 Documentation
- Improve existing documentation
- Add examples and tutorials
- Fix typos and clarify confusing sections

#### 💻 Code Contributions
- Fix bugs
- Implement new features
- Improve performance
- Refactor code for better maintainability

#### 🎨 Design Improvements
- Enhance UI/UX
- Improve accessibility
- Create mockups for new features

## Development Process

### 1. Pick an Issue

- Browse [open issues](https://github.com/Colten-Covington/shazuno/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it

### 2. Create a Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

- Write clean, readable code
- Follow existing code style and patterns
- Add comments for complex logic
- Keep commits atomic and focused

### 4. Test Your Changes

```bash
# Lint your code
pnpm lint

# Build to ensure no errors
pnpm build

# Test manually
pnpm dev
```

**Manual Testing Checklist:**
- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] Responsive on mobile and desktop
- [ ] Accessible (keyboard navigation works)
- [ ] Works in Chrome, Edge, and Safari
- [ ] No TypeScript errors
- [ ] Build succeeds

### 5. Commit Your Changes

Follow conventional commit format:

```bash
git commit -m "feat(search): add fuzzy matching support"
git commit -m "fix(audio): handle microphone permission denial"
git commit -m "docs: update installation instructions"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit for review

## Coding Standards

### TypeScript Guidelines

**Type Safety:**
```typescript
// ✅ DO: Use explicit types
function calculateScore(lyrics: string, query: string): number {
  return 0.85;
}

// ❌ DON'T: Use 'any'
function calculateScore(lyrics: any, query: any) {
  return 0.85;
}
```

**Interfaces:**
```typescript
// ✅ DO: Define interfaces for props
interface SearchProps {
  query: string;
  onSearch: (results: Song[]) => void;
  isLoading?: boolean;
}

// ❌ DON'T: Use inline types
function Search(props: { query: string; onSearch: Function }) { }
```

### React Guidelines

**Component Structure:**
```typescript
'use client';  // Only if needed

import { useState, useCallback } from 'react';

interface Props {
  // Props definition
}

export default function Component({ prop1, prop2 }: Props) {
  // 1. Hooks
  const [state, setState] = useState();
  
  // 2. Callbacks
  const handleAction = useCallback(() => {
    // ...
  }, []);
  
  // 3. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

**Hooks Rules:**
```typescript
// ✅ DO: Use hooks at top level
function Component() {
  const [state, setState] = useState();
  const value = useMemo(() => calculate(), []);
  // ...
}

// ❌ DON'T: Use hooks conditionally
function Component() {
  if (condition) {
    const [state, setState] = useState();  // ❌
  }
}
```

### Tailwind CSS Guidelines

**Utility Classes:**
```tsx
// ✅ DO: Use Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-white/10 rounded-lg">

// ❌ DON'T: Use inline styles
<div style={{ display: 'flex', padding: '1.5rem' }}>
```

**Responsive Design:**
```tsx
// ✅ DO: Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ✅ DO: Use Tailwind's breakpoints
// sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
```

### Accessibility Guidelines

**Semantic HTML:**
```tsx
// ✅ DO: Use semantic elements
<main>
  <section aria-labelledby="heading">
    <h2 id="heading">Title</h2>
  </section>
</main>

// ❌ DON'T: Overuse divs
<div>
  <div>
    <div>Title</div>
  </div>
</div>
```

**ARIA Attributes:**
```tsx
// ✅ DO: Use ARIA when semantic HTML isn't enough
<button aria-pressed={isActive}>Toggle</button>
<div role="alert" aria-live="polite">{message}</div>

// ❌ DON'T: Use redundant ARIA
<button role="button">Click</button>  // button role is implicit
```

**Keyboard Navigation:**
```tsx
// ✅ DO: Support keyboard interaction
<button onClick={handleClick} className="focus:ring-2">

// ✅ DO: Provide focus indicators
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### File Organization

**Component Files:**
```
components/
├── ComponentName.tsx      # Main component
└── ComponentName.test.tsx # Tests (future)
```

**Naming Conventions:**
- **Components:** PascalCase (`AudioRecorder.tsx`)
- **Utilities:** camelCase (`similarity.ts`)
- **Types:** camelCase (`speech.d.ts`)
- **Constants:** UPPER_SNAKE_CASE

### Code Documentation

**Function Comments:**
```typescript
/**
 * Calculates similarity between two strings
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @returns Similarity score between 0 and 1
 */
export function calculateSimilarity(str1: string, str2: string): number {
  // Implementation
}
```

**Complex Logic:**
```typescript
// Explain non-obvious code
// Stops after 10 consecutive empty pages to avoid infinite loops
// while still allowing gaps in pagination
if (emptyPages >= MAX_CONSECUTIVE_EMPTY_PAGES) {
  break;
}
```

## Pull Request Process

### Before Submitting

1. **Sync with upstream:**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Run checks:**
   ```bash
   pnpm lint      # No ESLint errors
   pnpm build     # Build succeeds
   ```

3. **Test thoroughly:**
   - Manual testing in browser
   - Check responsive design
   - Test accessibility
   - Verify no console errors

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

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated checks** run on PR
2. **Maintainer reviews** code
3. **Feedback addressed** by contributor
4. **Approval** from maintainer
5. **Merge** into main branch

### After Merge

- Delete your branch locally and on GitHub
- Update your fork's main branch
- Celebrate your contribution! 🎉

## Issue Guidelines

### Reporting Bugs

**Use this template:**

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 0.1.0]

**Additional context**
Any other relevant information.
```

### Requesting Features

**Use this template:**

```markdown
**Feature Description**
Clear description of the feature.

**Use Case**
Why is this feature needed?

**Proposed Solution**
How you think it should work.

**Alternatives**
Other solutions you've considered.

**Additional Context**
Mockups, examples, etc.
```

## Community

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** Questions and general discussion
- **Pull Requests:** Code contributions and reviews

### Getting Help

- Check existing documentation in `/docs`
- Search closed issues for similar problems
- Ask in GitHub Discussions
- Be specific and provide context

### Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for significant contributions
- Project README (for major features)

## Best Practices

### Do's ✅

- Follow existing code style and patterns
- Write clear commit messages
- Test your changes thoroughly
- Keep PRs focused and atomic
- Respond to review feedback promptly
- Be patient and respectful
- Ask questions if unclear

### Don'ts ❌

- Don't make unrelated changes in one PR
- Don't ignore CI failures
- Don't submit untested code
- Don't force push after review starts
- Don't take criticism personally
- Don't work on claimed issues without asking

## License

By contributing to Shazuno, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, please:
1. Check this document first
2. Look through existing issues and PRs
3. Ask in GitHub Discussions
4. Create an issue if needed

---

**Thank you for contributing to Shazuno! Your efforts help make this project better for everyone. 🙏**
