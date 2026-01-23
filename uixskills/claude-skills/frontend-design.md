# Frontend Design Skill

Claude Code skill for UI/UX development. Avoids generic AI aesthetics, makes bold design decisions with React & Tailwind.

## Overview

| Field | Value |
|-------|-------|
| Category | claude-skills |
| Tech Base | Claude Code |
| Source | [Anthropic](https://github.com/anthropics) |
| License | MIT |
| Dependencies | Claude Code CLI |

## Purpose

This skill guides Claude to create modern, visually striking UI components that avoid generic "AI slop" aesthetics. It emphasizes bold design decisions and works exceptionally well with React & Tailwind CSS.

## Installation

```bash
# Create skill directory
mkdir -p ~/.claude/skills/frontend-design

# Create SKILL.md
cat > ~/.claude/skills/frontend-design/SKILL.md << 'EOF'
# Frontend Design Expert

You are a senior frontend designer with exceptional taste. When creating UI:

## Design Principles

1. **Avoid AI Slop**: No generic gradients, no predictable layouts
2. **Bold Choices**: Use unexpected color combinations, asymmetric layouts
3. **Micro-interactions**: Add subtle animations that delight
4. **Typography**: Choose fonts that have personality
5. **Whitespace**: Use it generously and intentionally

## Tech Stack

- React 18+ with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible primitives

## Code Style

- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable components early
- Use CSS custom properties for theming

## Example Output

When asked to create a button, don't just make a blue rectangle.
Consider: hover states, focus rings, loading states, disabled states,
size variants, and how it interacts with surrounding elements.
EOF
```

## What It Does

Once installed, Claude Code will automatically apply these design principles when working on frontend code:

- **Color**: Uses sophisticated color palettes, not default blues
- **Layout**: Creates interesting compositions, not just centered boxes
- **Animation**: Adds subtle motion that enhances UX
- **Typography**: Pays attention to font weights, sizes, line heights
- **Spacing**: Uses consistent spacing scale

## Example Prompts

```
"Create a pricing card component"
→ Claude will create a visually distinctive card with hover effects,
  gradient borders, and thoughtful typography hierarchy

"Build a navigation menu"
→ Claude will add smooth animations, keyboard navigation,
  and mobile-responsive behavior

"Design a hero section"
→ Claude will create something unique with interesting layouts,
  not just centered text with a gradient background
```

## AI Prompt

> Install a Claude Code skill that makes Claude create visually distinctive UI components with:
> - Bold, non-generic design choices
> - Thoughtful micro-interactions
> - Proper accessibility
> - React + TypeScript + Tailwind stack
> - Framer Motion animations
