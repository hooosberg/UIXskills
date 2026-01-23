# UIX Skills Library

> A curated collection of UI/UX skills for AI-assisted development. Compatible with [skills.sh](https://skills.sh) format.

## Installation

```bash
# Using npx (recommended)
npx uixskills add hooosberg/UIXskills

# Or copy the MD file directly
curl -O https://raw.githubusercontent.com/hooosberg/UIXskills/main/uixskills/react/shadcn/button.md
```

## Directory Structure

```
uixskills/
├── react/
│   ├── shadcn/          # shadcn/ui components
│   ├── magic-ui/        # Magic UI animations
│   ├── aceternity/      # Aceternity UI effects
│   └── framer-motion/   # Framer Motion patterns
├── swiftui/             # iOS/macOS components
├── claude-skills/       # Claude Code AI skills
└── INDEX.md             # Master index
```

## Skill Format

Each skill follows the standard MD format:

```markdown
# Skill Title

Brief description of what this skill does.

## Overview

| Field | Value |
|-------|-------|
| Category | react/shadcn |
| Tech Base | React + TypeScript |
| Dependencies | package1, package2 |

## Code

\`\`\`tsx
// Component code here
\`\`\`

## Usage

\`\`\`tsx
// Usage examples
\`\`\`

## AI Prompt

> Prompt for AI to generate similar components
```

## Categories

| Category | Count | Description |
|----------|-------|-------------|
| react/shadcn | 5 | shadcn/ui components |
| react/magic-ui | 5 | Magic UI animations |
| react/aceternity | 5 | Aceternity effects |
| react/framer-motion | 4 | Framer Motion patterns |
| swiftui | 3 | iOS/macOS native |
| claude-skills | 5 | AI coding skills |

## Contributing

1. Create a new MD file in the appropriate category
2. Follow the skill format above
3. Submit a pull request

## License

MIT License
