# Agent Configuration System

This directory contains specialized agent definitions for AI coding assistants working on the Shazuno project.

## 📋 Standard AGENTS.md Format

This project follows the **[Agentic AI Foundation](https://agents.md)** standard format:

- **[/AGENTS.md](/AGENTS.md)** (root) - Main agent instructions following industry standard
- **/.github/agents/** (this directory) - Specialized agents for domain-specific tasks
- **/.github/skills/** - Reusable knowledge modules

### Hierarchy

```
AGENTS.md (root - general instructions, closest file wins)
    ↓
.github/agents/README.md (specialized agent registry)
    ↓
.github/agents/{agent}.md (domain-specific agents)
    ↓
.github/skills/{skill}.md (reusable knowledge)
```

**Note:** The closest AGENTS.md to an edited file takes precedence. For this project, root AGENTS.md provides general guidance, and specialized agents in this directory provide domain expertise.

## Overview

The agent system provides:
- **Standard format** following Agentic AI Foundation guidelines
- **Specialized agents** for different types of tasks
- **Reusable skills** that agents can utilize
- **Memory management** for context retention
- **Planning capabilities** for complex tasks

## Directory Structure

```
.github/
├── agents/
│   ├── README.md (this file)
│   ├── coding-agent.md          # General purpose coding agent
│   ├── refactoring-agent.md     # Code refactoring specialist
│   ├── documentation-agent.md   # Documentation expert
│   ├── testing-agent.md         # Testing specialist
│   ├── accessibility-agent.md   # Accessibility compliance expert
│   └── memory/                  # Fallback memory storage
├── skills/
│   ├── README.md
│   ├── react-patterns.md        # React best practices
│   ├── typescript-skills.md     # TypeScript expertise
│   ├── accessibility-skills.md  # A11y implementation
│   ├── testing-skills.md        # Testing strategies
│   └── api-integration.md       # API integration patterns
└── copilot-instructions.md      # Main Copilot configuration
```

## Agent Types

### 1. Coding Agent (coding-agent.md)
**Purpose:** General-purpose development tasks
**Capabilities:**
- Feature implementation
- Bug fixes
- Code review
- Performance optimization

### 2. Refactoring Agent (refactoring-agent.md)
**Purpose:** Code quality and maintainability improvements
**Capabilities:**
- Code restructuring
- Pattern extraction
- Technical debt reduction
- Performance improvements

### 3. Documentation Agent (documentation-agent.md)
**Purpose:** Creating and maintaining documentation
**Capabilities:**
- Architecture documentation
- API documentation
- Code comments
- User guides

### 4. Testing Agent (testing-agent.md)
**Purpose:** Test creation and maintenance
**Capabilities:**
- Unit test writing
- Integration tests
- E2E tests
- Test coverage analysis

### 5. Accessibility Agent (accessibility-agent.md)
**Purpose:** WCAG 2.2 AA compliance
**Capabilities:**
- Accessibility audits
- ARIA implementation
- Keyboard navigation
- Screen reader support

## Using Agents

### For IDE Integrations

Agents can be referenced in your IDE configuration:

**VS Code (settings.json):**
```json
{
  "github.copilot.chat.agentConfig": {
    "agents": [
      ".github/agents/coding-agent.md",
      ".github/agents/refactoring-agent.md"
    ]
  }
}
```

### For CLI/API Integrations

```bash
# Example: Using an agent for a specific task
copilot-agent --agent .github/agents/testing-agent.md \
              --task "Add unit tests for similarity.ts"
```

### In Chat/Prompts

Reference agents directly:
```
@coding-agent: Implement a new search filter feature
@accessibility-agent: Review the modal component for WCAG compliance
@documentation-agent: Document the new API endpoint
```

## Memory Management

### With Tooling Support
Agents with memory tooling should:
1. **Store facts** about code patterns discovered
2. **Remember decisions** made during implementation
3. **Track context** across multiple sessions
4. **Build knowledge** about the codebase over time

### Without Tooling (Fallback)
When memory tooling is unavailable, agents should:
1. **Dump context** to a markdown file in `.github/agents/memory/`
2. **Document decisions** in code comments
3. **Create summary files** after major tasks
4. **Update agent definitions** with learned patterns

### Memory Storage Locations

**With Tooling:**
- Stored in agent's memory system
- Accessible across sessions
- Queryable and searchable

**Without Tooling (Fallback):**
```
.github/agents/memory/
├── YYYY-MM-DD-session-summary.md     # Daily session summaries
├── learned-patterns.md                # Discovered patterns
├── decisions.md                       # Architectural decisions
└── context-{task-id}.md              # Task-specific context
```

## Planning Capabilities

All agents support:

### 1. Task Analysis
- Break down complex tasks into subtasks
- Identify dependencies
- Estimate complexity

### 2. Strategy Formation
- Choose appropriate patterns
- Select relevant skills
- Plan implementation steps

### 3. Progress Tracking
- Monitor task completion
- Adjust strategy as needed
- Report progress regularly

### 4. Context Retention
- Remember previous decisions
- Build on prior work
- Maintain consistency

## Agent Planning Process

```
1. Receive Task
   ↓
2. Load Context & Memories
   ↓
3. Analyze Requirements
   ↓
4. Select Relevant Skills
   ↓
5. Create Implementation Plan
   ↓
6. Execute with Progress Updates
   ↓
7. Store Learnings & Context
   ↓
8. Report Completion
```

## Skills System

Skills are reusable knowledge modules that agents can utilize. See `.github/skills/README.md` for details.

### Available Skills
- **React Patterns** - Component design, hooks, performance
- **TypeScript Skills** - Type safety, interfaces, generics
- **Accessibility Skills** - WCAG compliance, ARIA, keyboard nav
- **Testing Skills** - Test strategies, mocking, coverage
- **API Integration** - REST APIs, error handling, caching

## Best Practices

### For Agent Users
1. **Choose the right agent** for the task type
2. **Provide clear context** in your prompts
3. **Reference specific skills** when needed
4. **Review agent output** before committing
5. **Store learnings** for future sessions

### For Agent Developers
1. **Keep agents focused** on specific domains
2. **Document capabilities** clearly
3. **Define skill dependencies** explicitly
4. **Implement memory fallbacks** for all agents
5. **Test agent behavior** with real tasks

## Integration with Standard Format

This project uses a hybrid approach:

1. **[/AGENTS.md](/AGENTS.md)** - Standard format for all agents (following Agentic AI Foundation)
2. **[copilot-instructions.md](../copilot-instructions.md)** - GitHub Copilot-specific configuration
3. **[.github/agents/](.)** - Specialized domain agents (this directory)
4. **[.github/skills/](../skills/)** - Reusable knowledge modules

**When to use what:**
- **General coding:** Start with root AGENTS.md
- **Specialized tasks:** Reference specific agent in this directory
- **Learning patterns:** Load relevant skills from skills/ directory

**Hierarchy:**
```
AGENTS.md (root - standard format, general instructions)
    ↓
copilot-instructions.md (Copilot-specific configuration)
    ↓
agents/README.md (specialized agent registry - this file)
    ↓
agents/{agent}.md (domain-specific specialized agents)
    ↓
skills/*.md (reusable knowledge modules)
```

## Examples

### Example 1: Adding a New Feature
```
1. User: "Add a dark mode toggle"
2. Agent: @coding-agent selected
3. Skills loaded: react-patterns, typescript-skills
4. Plan created:
   - Add state management for theme
   - Create toggle component
   - Update global styles
   - Test theme switching
5. Implementation with progress tracking
6. Context stored for future theme-related work
```

### Example 2: Accessibility Audit
```
1. User: "Review accessibility of search form"
2. Agent: @accessibility-agent selected
3. Skills loaded: accessibility-skills, react-patterns
4. Plan created:
   - Audit keyboard navigation
   - Check ARIA attributes
   - Test with screen reader
   - Generate report
5. Findings documented
6. Fixes implemented
7. Learnings stored
```

## Troubleshooting

### Agent Not Found
- Verify the agent file exists in `.github/agents/`
- Check file name matches the reference
- Ensure markdown formatting is valid

### Skills Not Loading
- Verify skill files exist in `.github/skills/`
- Check skill references in agent definition
- Validate skill file structure

### Memory Not Persisting
- Check if memory tooling is available
- Verify fallback memory directory exists
- Review memory file permissions

## Contributing

When adding new agents:
1. Create agent definition in `.github/agents/`
2. Document capabilities and skills
3. Define memory management approach
4. Add examples of usage
5. Update this README

When adding new skills:
1. Create skill definition in `.github/skills/`
2. Document use cases
3. Provide code examples
4. Link from relevant agents
5. Update skills README

## References

- [Copilot Instructions](../copilot-instructions.md)
- [Skills Documentation](../skills/README.md)
- [Project Documentation](/docs/README.md)
- [Contributing Guidelines](/CONTRIBUTING.md)

---

**Remember:** Agents are tools to assist development. Always review generated code, ensure it meets project standards, and test thoroughly before committing.
