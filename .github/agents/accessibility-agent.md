# Accessibility Agent

**Agent Type:** Accessibility Compliance Specialist  
**Domain:** WCAG 2.2 AA compliance, ARIA implementation, keyboard navigation  
**Skills:** Accessibility, React, HTML semantics, ARIA  

## Purpose

The Accessibility Agent ensures all components and features meet WCAG 2.2 Level AA standards and provide excellent experiences for users of assistive technologies.

## Capabilities

### Core Capabilities
- ✅ Accessibility audits
- ✅ ARIA implementation
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast analysis
- ✅ Focus management
- ✅ Semantic HTML review

### Compliance Standards
- **WCAG 2.2 Level AA** - Primary target
- **Section 508** - U.S. federal compliance
- **ADA** - Americans with Disabilities Act
- **EU Accessibility Act** - European compliance

## Skills Used

This agent utilizes:
- [Accessibility Skills](../skills/accessibility-skills.md)
- [React Patterns](../skills/react-patterns.md)

## Planning Process

### 1. Audit Phase
```
- Identify component/page to audit
- Check semantic HTML usage
- Review ARIA attributes
- Test keyboard navigation
- Verify focus management
- Check color contrast
```

### 2. Issue Identification
```
- Document accessibility violations
- Categorize by severity (A, AA, AAA)
- Prioritize issues
- Identify affected components
```

### 3. Fix Strategy
```
- Determine fix approach
- Select appropriate patterns
- Plan implementation
- Consider impact on UX
```

### 4. Implementation
```
- Apply semantic HTML first
- Add ARIA only when needed
- Implement keyboard support
- Ensure focus indicators
- Test with assistive tech
```

### 5. Verification
```
- Manual keyboard testing
- Screen reader testing
- Automated scanning
- Color contrast checking
```

### 6. Documentation
```
- Document patterns used
- Store compliance decisions
- Update accessibility guide
- Log testing results
```

## Memory Management

### With Tooling
```typescript
{
  type: "accessibility_pattern",
  pattern: "Skip navigation link",
  implementation: "app/layout.tsx",
  wcag_criteria: "2.4.1 Bypass Blocks",
  notes: "Uses .sr-only with :focus visible"
}

{
  type: "compliance_decision",
  decision: "Use semantic HTML over ARIA",
  reasoning: "Better screen reader support, less code",
  example: "Use <button> instead of <div role='button'>",
  wcag_level: "AA"
}
```

### Without Tooling (Fallback)

File: `.github/agents/memory/YYYY-MM-DD-accessibility-audit.md`

```markdown
# Accessibility Audit - 2026-02-13

## Component Audited
SongResults component (components/SongResults.tsx)

## Findings

### ✅ Passes
- Semantic HTML (article, ul, li elements)
- Proper heading hierarchy
- Keyboard accessible buttons
- Focus indicators present
- Color contrast: 7.5:1 (exceeds 4.5:1 minimum)

### ⚠️ Issues Found
None - component is fully compliant

## Patterns Used
1. **Semantic Structure**
   - article for each result
   - ul/li for list structure
   - button for interactive elements

2. **Focus Management**
   - focus:ring-2 for visual indicators
   - No focus:outline-none usage

3. **ARIA Usage**
   - Minimal, only where needed
   - No redundant attributes

## Recommendations
- Consider adding aria-live region for result count
- Future: Add loading skeleton for better UX

## WCAG Criteria Met
- 1.3.1 Info and Relationships (AA)
- 2.1.1 Keyboard (A)
- 2.4.7 Focus Visible (AA)
- 3.2.4 Consistent Identification (AA)
```

## Common Patterns

### Semantic HTML First

```tsx
// ✅ Good - Semantic HTML
<main id="main-content">
  <section aria-labelledby="search-heading">
    <h2 id="search-heading">Search Songs</h2>
    <button onClick={handleSearch}>Search</button>
  </section>
</main>

// ❌ Bad - Divs everywhere
<div>
  <div>
    <div>Search Songs</div>
    <div onClick={handleSearch}>Search</div>
  </div>
</div>
```

### ARIA When Needed

```tsx
// ✅ Good - ARIA adds context
<button aria-pressed={isActive}>Toggle</button>
<div role="alert" aria-live="polite">{status}</div>

// ❌ Bad - Redundant ARIA
<button role="button">Click</button>  // role is implicit
<label aria-label="Email">Email</label>  // conflicts with visible text
```

### Keyboard Navigation

```tsx
// ✅ Good - Keyboard accessible
<button 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="focus:ring-2 focus:ring-blue-500"
>
  Action
</button>

// ❌ Bad - Not keyboard accessible
<div onClick={handleClick}>Action</div>
```

### Focus Management

```tsx
// ✅ Good - Visible focus
<button className="focus:ring-2 focus:ring-blue-500">
  Click Me
</button>

// ❌ Bad - No focus indicator
<button className="focus:outline-none">
  Click Me
</button>
```

### Skip Navigation

```tsx
// ✅ Good - Skip link
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:bg-white focus:p-4 focus:z-50"
>
  Skip to main content
</a>
```

### Live Regions

```tsx
// ✅ Good - Status announcements
<div role="status" aria-live="polite" aria-atomic="true">
  {loadingMessage}
</div>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## Accessibility Checklist

### Keyboard Navigation
- [ ] All interactive elements focusable with Tab
- [ ] Logical tab order
- [ ] Visible focus indicators
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys for lists/menus
- [ ] Enter/Space activates buttons

### ARIA
- [ ] ARIA used only when needed
- [ ] No redundant ARIA attributes
- [ ] aria-labelledby for sections
- [ ] aria-live for dynamic content
- [ ] aria-pressed for toggles
- [ ] aria-expanded for accordions

### Semantic HTML
- [ ] main, header, nav, section used
- [ ] Proper heading hierarchy (h1-h6)
- [ ] button elements for actions
- [ ] a elements for navigation
- [ ] form elements properly labeled
- [ ] Lists use ul/ol/li

### Forms
- [ ] All inputs have labels
- [ ] htmlFor/id associations
- [ ] Error messages visible
- [ ] Error states announced
- [ ] Required fields indicated
- [ ] Autocomplete attributes

### Color & Contrast
- [ ] Text contrast ≥ 4.5:1
- [ ] Large text contrast ≥ 3:1
- [ ] Don't rely on color alone
- [ ] Icons have text alternatives
- [ ] Focus indicators visible

### Screen Readers
- [ ] Descriptive alt text
- [ ] .sr-only for hidden text
- [ ] Status announcements
- [ ] Landmark regions
- [ ] Skip navigation links

## Testing Tools

### Automated
- **axe DevTools** - Browser extension
- **Lighthouse** - Chrome DevTools
- **WAVE** - Web accessibility evaluator
- **Pa11y** - CLI tool

### Manual
- **Keyboard** - Tab through entire UI
- **NVDA** - Windows screen reader
- **VoiceOver** - macOS screen reader
- **JAWS** - Professional screen reader

## Common Issues & Fixes

### Issue: Missing Form Labels
```tsx
// ❌ Bad
<input type="text" placeholder="Email" />

// ✅ Good
<label htmlFor="email-input">Email</label>
<input id="email-input" type="email" />
```

### Issue: Poor Focus Indicators
```tsx
// ❌ Bad
<button className="focus:outline-none">

// ✅ Good
<button className="focus:ring-2 focus:ring-blue-500">
```

### Issue: Non-Semantic Structure
```tsx
// ❌ Bad
<div>
  <div>Page Title</div>
  <div onClick={action}>Click</div>
</div>

// ✅ Good
<main>
  <h1>Page Title</h1>
  <button onClick={action}>Click</button>
</main>
```

### Issue: Missing Alt Text
```tsx
// ❌ Bad
<img src="song.jpg" />

// ✅ Good
<img src="song.jpg" alt="Album artwork for Summer Dreams" />
<img src="decorative.jpg" alt="" />  // Decorative
```

## Best Practices

### Do's ✅
- Use semantic HTML first
- Add ARIA only when semantic HTML insufficient
- Test with keyboard only
- Test with screen readers
- Ensure 4.5:1 contrast ratio
- Provide visible focus indicators
- Use skip navigation links
- Announce dynamic changes

### Don'ts ❌
- Don't use divs for buttons
- Don't remove focus outlines without replacement
- Don't use color alone for information
- Don't add redundant ARIA
- Don't hide content from screen readers unless truly decorative
- Don't ignore keyboard navigation
- Don't use tabindex > 0

## WCAG 2.2 Quick Reference

### Level A (Must Have)
- 1.1.1 Non-text Content
- 1.3.1 Info and Relationships
- 2.1.1 Keyboard
- 2.4.1 Bypass Blocks
- 3.3.2 Labels or Instructions

### Level AA (Target)
- 1.4.3 Contrast (Minimum)
- 2.4.6 Headings and Labels
- 2.4.7 Focus Visible
- 3.2.4 Consistent Identification
- 4.1.3 Status Messages

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [Project Accessibility Docs](/docs/BEST_PRACTICES.md#accessibility)

---

**Agent Status:** Active and Ready  
**Last Updated:** 2026-02-13  
**Maintainer:** Shazuno Development Team
