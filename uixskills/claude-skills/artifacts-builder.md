# Artifacts Builder Skill

Build complex Claude.ai HTML artifacts using React, Tailwind CSS, and shadcn/ui components.

## Overview

| Field | Value |
|-------|-------|
| Category | claude-skills |
| Tech Base | Claude Code |
| Source | [Anthropic](https://github.com/anthropics) |
| License | MIT |
| Dependencies | Claude Code CLI |

## Purpose

This skill enables Claude Code to generate rich, interactive HTML artifacts that can be rendered in Claude.ai's artifact viewer.

## Installation

```bash
mkdir -p ~/.claude/skills/artifacts-builder

cat > ~/.claude/skills/artifacts-builder/SKILL.md << 'EOF'
# Artifacts Builder

When creating artifacts for Claude.ai, follow these guidelines:

## Available Technologies

- React 18 (imported via CDN)
- Tailwind CSS (imported via CDN)
- Lucide React icons
- Recharts for data visualization

## Structure

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18",
        "react-dom/client": "https://esm.sh/react-dom@18/client",
        "lucide-react": "https://esm.sh/lucide-react"
      }
    }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module">
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { Icon } from 'lucide-react';

    function App() {
      return <div className="p-4">Your content</div>;
    }

    createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>
```

## Best Practices

1. Keep artifacts self-contained
2. Use Tailwind for all styling
3. Include error boundaries
4. Make components responsive
5. Add loading states for async operations
EOF
```

## Features

- **Self-contained HTML**: Everything in one file
- **CDN imports**: No build step required
- **React 18**: Full React capabilities
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Beautiful icon library
- **Recharts**: Data visualization

## Example Artifact

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18",
        "react-dom/client": "https://esm.sh/react-dom@18/client",
        "lucide-react": "https://esm.sh/lucide-react"
      }
    }
  </script>
</head>
<body class="bg-gray-100 min-h-screen">
  <div id="root"></div>
  <script type="module">
    import React, { useState } from 'react';
    import { createRoot } from 'react-dom/client';
    import { Plus, Minus } from 'lucide-react';

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-8">Counter: {count}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCount(c => c - 1)}
              className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <Minus />
            </button>
            <button
              onClick={() => setCount(c => c + 1)}
              className="p-4 bg-green-500 text-white rounded-full hover:bg-green-600"
            >
              <Plus />
            </button>
          </div>
        </div>
      );
    }

    createRoot(document.getElementById('root')).render(<Counter />);
  </script>
</body>
</html>
```

## AI Prompt

> Create a Claude Code skill for building HTML artifacts with:
> - Self-contained React + Tailwind setup
> - CDN imports (no build step)
> - Lucide icons support
> - Best practices for artifact structure
