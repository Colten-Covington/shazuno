# Skills Library

This directory contains reusable skill modules that agents can utilize when performing tasks. Skills encapsulate domain-specific knowledge, patterns, and best practices.

## Overview

Skills are knowledge modules that provide:
- **Domain expertise** in specific areas
- **Code patterns** and examples
- **Best practices** and anti-patterns
- **Reference documentation**

## Available Skills

### 1. React Patterns (react-patterns.md)
**Domain:** React component development  
**Topics:**
- Functional components and hooks
- State management patterns
- Performance optimization
- Component composition
- Event handling
- Side effects management

### 2. TypeScript Skills (typescript-skills.md)
**Domain:** TypeScript type safety  
**Topics:**
- Type definitions and interfaces
- Strict mode practices
- Generic types
- Type guards
- Utility types
- Type inference

### 3. Accessibility Skills (accessibility-skills.md)
**Domain:** WCAG compliance  
**Topics:**
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast

### 4. Testing Skills (testing-skills.md)
**Domain:** Test writing and strategy  
**Topics:**
- Unit testing
- Component testing
- Integration testing
- Test patterns
- Mocking strategies
- Coverage analysis

### 5. API Integration (api-integration.md)
**Domain:** External API consumption  
**Topics:**
- REST API patterns
- Error handling
- Data fetching
- Caching strategies
- Request optimization
- Type-safe API calls

## Skill Structure

Each skill file contains:

```markdown
# Skill Name

## Overview
Brief description of the skill domain

## Core Concepts
Key principles and patterns

## Patterns
Concrete code examples

## Best Practices
Do's and don'ts

## Common Pitfalls
Anti-patterns to avoid

## Examples
Real-world usage examples

## Resources
Additional learning materials
```

## Using Skills

### In Agent Definitions

Agents reference skills they can utilize:

```markdown
# My Agent

## Skills Used
- [React Patterns](../skills/react-patterns.md)
- [TypeScript Skills](../skills/typescript-skills.md)
```

### In Practice

When an agent receives a task:
1. **Identifies relevant skills** based on task type
2. **Loads skill knowledge** into context
3. **Applies patterns** from skills
4. **Follows best practices** defined in skills

### Example Flow

```
Task: "Add a search filter component"
    ↓
Agent: Coding Agent
    ↓
Skills Loaded:
  - React Patterns (component creation)
  - TypeScript Skills (type definitions)
  - Accessibility Skills (keyboard support)
    ↓
Implementation:
  - Creates component using React patterns
  - Adds TypeScript interfaces
  - Ensures accessibility
```

## Skill Dependencies

Some skills build on others:

```
React Patterns
    ↑
Accessibility Skills (uses React patterns)
    ↑
Testing Skills (tests React components)
```

## Creating New Skills

To add a new skill:

1. **Create skill file** in `.github/skills/`
2. **Follow the standard structure**
3. **Include code examples**
4. **Document best practices**
5. **Add to this README**
6. **Link from relevant agents**

### Template

```markdown
# Skill Name

## Overview
What this skill covers and why it's important

## Core Concepts
### Concept 1
Explanation

### Concept 2
Explanation

## Patterns

### Pattern 1: Name
\`\`\`typescript
// Code example
\`\`\`

### Pattern 2: Name
\`\`\`typescript
// Code example
\`\`\`

## Best Practices

### Do's ✅
- Practice 1
- Practice 2

### Don'ts ❌
- Anti-pattern 1
- Anti-pattern 2

## Common Pitfalls
- Pitfall 1 and how to avoid it
- Pitfall 2 and how to avoid it

## Examples

### Example 1: Use Case
Description and code

### Example 2: Use Case
Description and code

## Resources
- Link to official docs
- Link to project docs
- External learning resources
```

## Skill Maintenance

### Updating Skills
- Keep patterns current with latest practices
- Add new patterns as they're discovered
- Update examples when APIs change
- Remove deprecated patterns

### Version Control
- Skills evolve with the project
- Document significant changes in git commits
- Reference specific commits for historical patterns

## Skill Quality Guidelines

Good skills should:
- ✅ Be focused on a specific domain
- ✅ Include practical code examples
- ✅ Show both do's and don'ts
- ✅ Reference project-specific patterns
- ✅ Link to relevant documentation
- ✅ Be regularly updated

Poor skills:
- ❌ Cover too many unrelated topics
- ❌ Lack concrete examples
- ❌ Only describe theory
- ❌ Ignore project conventions
- ❌ Contain outdated information

## Integration with Agents

### Agent-Skill Mapping

| Agent | Primary Skills | Secondary Skills |
|-------|---------------|------------------|
| Coding Agent | React, TypeScript, API Integration | Testing, Accessibility |
| Accessibility Agent | Accessibility | React |
| Testing Agent | Testing | React, TypeScript |
| Documentation Agent | (All for reference) | - |
| Refactoring Agent | React, TypeScript | Testing |

## Skill Evolution

As the project grows:
1. **New skills emerge** from repeated patterns
2. **Existing skills expand** with new patterns
3. **Skills may split** when too broad
4. **Skills may merge** when overlapping

## Best Practices for Skill Usage

### For Agents
1. **Load only relevant skills** for the task
2. **Apply patterns consistently** across the codebase
3. **Adapt patterns** to specific context
4. **Reference skills** in memory/documentation

### For Developers
1. **Review skills** before starting tasks
2. **Contribute patterns** as you discover them
3. **Update skills** when practices change
4. **Request new skills** for emerging needs

## Resources

- [Agent Definitions](../agents/README.md)
- [Project Documentation](/docs/README.md)
- [Contributing Guidelines](/CONTRIBUTING.md)
- [Copilot Instructions](../copilot-instructions.md)

---

**Skill Library Status:** Active  
**Last Updated:** 2026-02-13  
**Maintainer:** Shazuno Development Team
