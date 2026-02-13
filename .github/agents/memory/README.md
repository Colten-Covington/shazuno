# Agent Memory Storage

This directory stores context and learnings when agent memory tooling is unavailable.

## Purpose

When agents work without built-in memory tooling, they dump context, decisions, and learnings to markdown files here for future reference.

## File Structure

```
memory/
├── README.md (this file)
├── YYYY-MM-DD-{agent}-session.md    # Daily session summaries
├── learned-patterns.md               # Discovered code patterns
├── decisions.md                      # Architectural decisions
└── context-{task-id}.md             # Task-specific context
```

## Memory File Template

### Session Summary Template

```markdown
# {Agent} Session - YYYY-MM-DD

## Task
Brief description of the task

## Decisions Made
1. **Decision Title** - [File: path/to/file.ts]
   - Reasoning: Why this approach was chosen
   - Alternatives: What else was considered
   - Impact: What this affects

2. **Decision Title** - [File: path/to/file.ts]
   - Reasoning: ...
   - Alternatives: ...
   - Impact: ...

## Patterns Used
- **Pattern Name** - Location: file.ts:123-145
  - Description: What this pattern does
  - Benefits: Why we use it
  - When to use: Appropriate scenarios

## Code Changes
- [File path]: What was changed and why
- [File path]: What was changed and why

## Learnings
- Discovered that X works better than Y
- Found that Z pattern improves performance
- Learned constraint: A requires B

## Context for Future
- Search functionality is in app/page.tsx
- API integration is in lib/suno.ts
- Important relationships between components
- Known issues or technical debt

## Follow-up Tasks
- [ ] Task that should be done later
- [ ] Improvement to consider
```

### Learned Patterns Template

```markdown
# Learned Patterns

Last Updated: YYYY-MM-DD

## Performance Patterns

### Map-Based Deduplication
- **Location:** lib/suno.ts:59-86
- **Pattern:** Use Map<string, T> instead of Array + Set
- **Benefit:** O(1) lookups vs O(n) array searches
- **When to use:** Deduplicating items by unique ID

### Deferred Search Updates
- **Location:** app/page.tsx:19
- **Pattern:** useDeferredValue for search queries
- **Benefit:** Keeps input responsive during heavy calculations
- **When to use:** Real-time search or filtering

## Component Patterns

### Progressive Loading
- **Location:** lib/suno.ts:50-92
- **Pattern:** Callback-based progressive updates
- **Benefit:** Shows partial results immediately
- **When to use:** Long-running data fetching

## Accessibility Patterns

### Skip Navigation
- **Location:** app/layout.tsx:17-23
- **Pattern:** .sr-only with :focus visible styles
- **Benefit:** WCAG 2.4.1 compliance, keyboard navigation
- **When to use:** All multi-section pages
```

### Decisions Log Template

```markdown
# Architectural Decisions

## Decision Log

### 2026-02-13: Use useDeferredValue for Search
**Context:** Search query input needed to stay responsive while processing large datasets

**Decision:** Implement useDeferredValue instead of manual debouncing

**Alternatives Considered:**
1. Manual debounce with setTimeout
2. Throttle with lodash
3. useTransition alone

**Reasoning:**
- Better integration with React 18 concurrent features
- Automatic optimization by React
- Less boilerplate than manual debouncing

**Files Changed:**
- app/page.tsx:19 - Added useDeferredValue
- app/page.tsx:78-83 - Updated memoization logic

**Impact:**
- Search input remains responsive under load
- Results update smoothly without blocking

### 2026-02-13: Map for Deduplication
**Context:** Suno API returns duplicate songs across pages

**Decision:** Use Map<string, Song> for automatic deduplication

**Alternatives Considered:**
1. Array + Set pattern (original implementation)
2. Filter with indexOf
3. Lodash uniqBy

**Reasoning:**
- O(1) lookups vs O(n) for array operations
- Automatic deduplication by key
- Less code, more efficient

**Files Changed:**
- lib/suno.ts:59-86 - Implemented Map pattern

**Impact:**
- Better performance with large datasets
- Cleaner, more maintainable code
```

## Usage Guidelines

### When to Create Memory Files

**With Memory Tooling:** Don't use these files - use the agent's built-in memory system

**Without Memory Tooling:** Create memory files when:
- Completing a significant task
- Making architectural decisions
- Discovering new patterns
- Learning project-specific conventions
- Finishing a coding session

### File Naming Convention

- **Session summaries:** `YYYY-MM-DD-{agent-name}-session.md`
  - Example: `2026-02-13-coding-agent-session.md`
  
- **Task context:** `context-{task-id-or-description}.md`
  - Example: `context-search-optimization.md`
  
- **Persistent logs:** Use standard names
  - `learned-patterns.md`
  - `decisions.md`

### Best Practices

1. **Be specific** - Include file paths and line numbers
2. **Explain why** - Document reasoning, not just what changed
3. **Think future** - Write for an agent reading this later
4. **Stay current** - Update patterns as they evolve
5. **Link context** - Reference related files and decisions

### Reading Memory Files

Agents should:
1. Check for relevant memory files before starting tasks
2. Read learned-patterns.md for established patterns
3. Review decisions.md for architectural context
4. Look for session summaries from similar past work
5. Update or create new memory files when learning

## Example Memory File

See [TEMPLATE-session-summary.md](TEMPLATE-session-summary.md) for a complete example.

## Integration with Agent System

Memory files complement the agent system:

```
AGENTS.md (root) - General instructions
    ↓
.github/agents/{agent}.md - Specialized agent
    ↓
.github/skills/{skill}.md - Reusable knowledge
    ↓
.github/agents/memory/ - Session-specific context (fallback)
```

Memory files are the **fallback** when tooling isn't available. They help maintain continuity across agent sessions.

## Maintenance

- Review memory files monthly
- Archive old sessions (move to `archive/` subdirectory)
- Keep learned-patterns.md and decisions.md up to date
- Remove outdated or incorrect information
- Consolidate redundant entries

---

**Note:** This is a fallback system. If your agent has built-in memory tooling (like the store_memory tool), use that instead for better searchability and persistence.
