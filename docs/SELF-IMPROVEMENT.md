# AI Agent Self-Improvement Guide

## Introduction

This document establishes a **self-improvement protocol** for AI agents working on the Shazuno codebase. After completing any task, agents should take time to reflect, learn, and improve the documentation for future agents.

> **Philosophy:** Every completed task is an opportunity to make the next task easier. By documenting learnings and updating guidance, we create a continuously improving system.

## Why Self-Improvement Matters

### The Problem
Without active documentation maintenance:
- Patterns get forgotten and re-discovered
- Anti-patterns repeat across the codebase
- Context is lost between sessions
- New agents make the same mistakes
- Documentation becomes outdated

### The Solution
Proactive self-improvement:
- ✅ Captures learnings while fresh
- ✅ Documents patterns immediately
- ✅ Prevents future mistakes
- ✅ Builds institutional knowledge
- ✅ Makes future work faster

## When to Self-Improve

### Always After:
- Completing a feature or refactoring
- Fixing a bug (document the root cause)
- Discovering an anti-pattern
- Learning a new pattern or best practice
- Making architectural decisions

### Especially After:
- Multi-file refactorings
- Architecture changes
- Creating new layers or abstractions
- Solving complex problems
- Debugging non-obvious issues

## The Self-Improvement Process

### Step 1: Analyze What Was Done

Ask yourself:
- **What changed?** List files modified and why
- **What was the problem?** Root cause, not just symptoms
- **What was the solution?** High-level approach
- **What alternatives were considered?** Why this approach won

Example from this project:
```
Problem: useSunoSongs hook called lib directly, bypassing service caching
Solution: Refactored to use sunoService which provides 5-minute cache
Impact: Reduced API calls by ~90% for repeated username queries
```

### Step 2: Identify Learnings

Extract generalizable patterns:

#### What Worked Well?
- Architecture patterns that proved valuable
- Code organization that improved clarity
- Performance optimizations that worked
- Debugging techniques that helped

#### What Didn't Work?
- Anti-patterns discovered
- Initial approaches that failed
- Misconceptions corrected
- Code smells identified

#### What Was Learned?
- New patterns or techniques
- Better understanding of existing systems
- Trade-offs and their implications
- Best practices validated

### Step 3: Document the Learnings

Update documentation to preserve insights:

#### 3.1 Update Relevant AGENTS.md Files

**Root AGENTS.md** - Update for project-wide patterns
**Directory AGENTS.md** - Update for area-specific patterns

Add:
- ✅ **Architecture guidance** with diagrams
- ✅ **Real code examples** from the codebase
- ✅ **Comparison tables** (before/after, good/bad)
- ✅ **Anti-patterns** with explanations
- ✅ **Best practices** with rationale

Example from hooks/AGENTS.md:
```markdown
## Architecture Layering ⚠️

**Correct Pattern:**
Hook → Service → Lib → API

**Example from this codebase:**
✅ CORRECT: useSunoSongs uses sunoService (gets caching)
❌ WRONG: useSunoSongs calls fetchAllSunoSongs directly (no caching)
```

#### 3.2 Update Architecture Documentation

**docs/ARCHITECTURE.md** - For system-wide architecture changes
**docs/DESIGN_PATTERNS.md** - For reusable patterns
**docs/BEST_PRACTICES.md** - For coding standards

Add:
- Detailed explanations with diagrams
- Real-world examples from the codebase
- Benefits and trade-offs
- When to use vs when not to use

#### 3.3 Add Code Comments

For complex or non-obvious code:
```typescript
/**
 * Uses sunoService instead of lib directly to enable caching.
 * Service provides 5-minute TTL cache, reducing API calls.
 * See docs/ARCHITECTURE.md for layering details.
 */
const songs = await sunoService.fetchUserSongs(username);
```

### Step 4: Make It Actionable

Good documentation is:

#### ✅ Specific and Concrete
- Use real examples from the codebase
- Show actual code, not abstract concepts
- Reference specific files and line numbers

#### ✅ Comparison-Based
- Show correct vs incorrect side-by-side
- Explain why one is better
- Highlight the consequences of each approach

#### ✅ Searchable
- Use keywords developers will search for
- Add tags or labels
- Cross-reference related documentation

#### ✅ Contextual
- Explain the "why" not just the "what"
- Document the reasoning and trade-offs
- Link to related patterns or decisions

### Step 5: Verify Improvements

Before finishing:
- [ ] Documentation is accurate and up-to-date
- [ ] Examples compile and run
- [ ] Links work correctly
- [ ] New content is discoverable
- [ ] Anti-patterns are clearly marked
- [ ] Future agents can understand the context

## What to Update

### Priority 1: AGENTS.md Files

Update the most relevant AGENTS.md:

**If architectural/cross-cutting:**
- Root `/AGENTS.md` - Project-wide patterns

**If area-specific:**
- Directory AGENTS.md - `/hooks/AGENTS.md`, `/services/AGENTS.md`, etc.

**Content to add:**
```markdown
## New Pattern Discovered

**Problem:** [What was wrong]
**Solution:** [What works better]
**Example:** [Code from this codebase]
**Why:** [Benefits and rationale]
```

### Priority 2: Architecture Docs

**docs/ARCHITECTURE.md** - For system design changes
- Add layer diagrams
- Document data flow
- Explain responsibilities

**docs/CODE_STRUCTURE.md** - For organizational changes
- Update directory structure
- Document module relationships
- Add dependency diagrams

### Priority 3: Pattern Docs

**docs/DESIGN_PATTERNS.md** - For reusable patterns
- Document the pattern
- Show implementation
- List use cases

**docs/BEST_PRACTICES.md** - For coding standards
- Add guidelines
- Show examples
- Explain rationale

### Priority 4: API/Interface Docs

**In-code JSDoc comments** - For complex functions
- Explain parameters and return values
- Document side effects
- Link to related documentation

## Templates and Checklists

### Post-Task Reflection Template

```markdown
## Task: [Brief description]

### What Changed
- File 1: [Change description]
- File 2: [Change description]

### Problem Solved
[Root cause and symptoms]

### Solution Approach
[High-level strategy and why it works]

### Learnings
**Patterns discovered:**
- [Pattern 1]
- [Pattern 2]

**Anti-patterns avoided:**
- [Anti-pattern 1]
- [Anti-pattern 2]

**Best practices validated:**
- [Practice 1]
- [Practice 2]

### Documentation Updates
- [ ] Updated AGENTS.md in [directory]
- [ ] Updated docs/[file].md
- [ ] Added code comments
- [ ] Verified accuracy

### For Future Agents
[What you wish you knew at the start]
```

### AGENTS.md Update Checklist

When updating AGENTS.md:
- [ ] Added real code example from this codebase
- [ ] Showed both correct and incorrect patterns
- [ ] Explained the "why" not just the "what"
- [ ] Added visual indicators (✅❌⚠️)
- [ ] Cross-referenced related documentation
- [ ] Made it searchable with keywords
- [ ] Tested that examples work

### Documentation Quality Checklist

- [ ] **Accurate** - Information is current and correct
- [ ] **Specific** - Uses concrete examples, not abstractions
- [ ] **Actionable** - Provides clear guidance
- [ ] **Discoverable** - Easy to find when needed
- [ ] **Contextual** - Explains reasoning and trade-offs
- [ ] **Verified** - Code examples have been tested

## Real Examples from This Project

### Example 1: Architecture Layering

**What was done:**
Refactored `useSunoSongs` hook to use `sunoService` instead of calling `lib/suno` directly.

**What was learned:**
- Hooks should call services, not lib directly
- Services provide caching and business logic
- Clear layering: lib → services → hooks → components

**How it was documented:**
1. Updated `hooks/AGENTS.md` with architecture diagram
2. Updated `services/AGENTS.md` with caching patterns
3. Updated `lib/AGENTS.md` to clarify low-level purpose
4. Added comprehensive section to `docs/ARCHITECTURE.md`

**Result:**
Future agents now have clear guidance on:
- Where to put caching logic (services)
- How to structure data flow (layered)
- Why this pattern matters (performance)

### Example 2: Hook Initialization

**What was done:**
Fixed bug where `useSunoSongs()` didn't load songs on mount because no initial username was provided.

**What was learned:**
- Hooks with useEffect need initial values to trigger on mount
- Empty string doesn't trigger `if (value)` checks
- Pass initial parameters: `useSunoSongs(DEFAULT_SUNO_USERNAME)`

**How it was documented:**
1. Added "Hook Initialization Best Practice" section to `hooks/AGENTS.md`
2. Showed correct vs incorrect patterns side-by-side
3. Explained the useEffect dependency chain
4. Provided template for data-loading hooks

**Result:**
Future agents won't make the same initialization mistake.

### Example 3: Constants Organization

**What was done:**
Extracted hardcoded values into domain-organized constant modules.

**What was learned:**
- Group constants by domain (api, timing, ui, etc.)
- Use UPPER_SNAKE_CASE naming
- Add JSDoc comments for clarity
- Central export via index.ts

**How it was documented:**
1. Created `constants/AGENTS.md` with patterns
2. Listed all constant modules and their purposes
3. Showed naming conventions
4. Provided usage examples

**Result:**
Future constants follow consistent organization.

## Advanced: Continuous Improvement Loop

### The Cycle

```
┌─────────────────────────────────────────┐
│  1. Complete Task                       │
│     - Write code                        │
│     - Fix bugs                          │
│     - Refactor                          │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  2. Reflect                             │
│     - What changed?                     │
│     - What was learned?                 │
│     - What patterns emerged?            │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  3. Document                            │
│     - Update AGENTS.md                  │
│     - Update architecture docs          │
│     - Add examples                      │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  4. Improve                             │
│     - Make patterns discoverable        │
│     - Add anti-pattern warnings         │
│     - Create templates                  │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│  5. Verify                              │
│     - Check accuracy                    │
│     - Test examples                     │
│     - Ensure discoverability            │
└───────────────┬─────────────────────────┘
                │
                └──────► Next Task (Easier!)
```

### Measuring Improvement

Track these metrics informally:
- **Time to onboard** - How long to understand the codebase?
- **Repeat mistakes** - Are the same errors made again?
- **Documentation usage** - Do agents reference the docs?
- **Context retention** - How much is remembered between sessions?

### Continuous Refinement

Documentation is never "done":
- Update as patterns evolve
- Remove outdated guidance
- Consolidate duplicate information
- Improve clarity based on confusion
- Add more examples as code grows

## Anti-Patterns to Avoid

### ❌ Documenting Too Late
**Problem:** Waiting until "later" to document
**Impact:** Context is lost, details forgotten
**Solution:** Document immediately after completing work

### ❌ Abstract Documentation
**Problem:** Generic examples without real code
**Impact:** Hard to apply to actual situations
**Solution:** Always use examples from the codebase

### ❌ Isolated Documentation
**Problem:** Updates that don't cross-reference
**Impact:** Information silos, hard to discover
**Solution:** Link related documentation together

### ❌ No Anti-Patterns
**Problem:** Only showing the "right way"
**Impact:** Agents repeat mistakes without warnings
**Solution:** Document what NOT to do and why

### ❌ Unverified Examples
**Problem:** Code examples that don't work
**Impact:** Loss of trust, wasted debugging time
**Solution:** Test all code examples

## Quick Reference

### Minimum Self-Improvement

At minimum, after every task:
1. ✅ Identify one learning or pattern
2. ✅ Update one AGENTS.md file
3. ✅ Add one real code example
4. ✅ Verify it's accurate

### Full Self-Improvement

For significant work:
1. ✅ Complete post-task reflection
2. ✅ Update multiple AGENTS.md files
3. ✅ Update architecture documentation
4. ✅ Add multiple examples and anti-patterns
5. ✅ Create templates or checklists
6. ✅ Cross-reference all updates
7. ✅ Verify everything works

### When to Skip

Skip self-improvement only for:
- Trivial changes (typo fixes)
- Changes that don't establish patterns
- Pure deletion without replacement
- Emergency hotfixes (but document later!)

## Conclusion

Self-improvement is not extra work—it's an investment that pays dividends. Every minute spent documenting saves hours for future agents. By consistently applying this protocol, we create a codebase that becomes easier to work with over time, not harder.

**Remember:** You are not just writing code for now. You are writing documentation for future you and future agents. Make it easy for them!

---

## Related Documentation

- [Root AGENTS.md](/AGENTS.md) - Project-wide agent guidance
- [docs/ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [docs/DESIGN_PATTERNS.md](DESIGN_PATTERNS.md) - Reusable patterns
- [docs/BEST_PRACTICES.md](BEST_PRACTICES.md) - Coding standards
- [.github/copilot-instructions.md](../.github/copilot-instructions.md) - AI assistant guidelines
