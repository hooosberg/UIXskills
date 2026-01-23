# Animated Shiny Text

A beautiful shiny text effect with animated gradient. Perfect for hero sections and call-to-actions. From Magic UI library.

## Overview

| Field | Value |
|-------|-------|
| Category | react/magic-ui |
| Tech Base | React + TypeScript |
| Source | [Magic UI](https://magicui.design) |
| License | MIT |
| Dependencies | tailwindcss |

## Features

- Animated shimmer gradient effect
- Customizable shimmer width
- Works with any text content
- CSS-only animation (no JS runtime)
- Dark mode compatible

## Code

```tsx
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  shimmerWidth?: number;
}

export function ShinyText({
  text,
  className,
  shimmerWidth = 100,
}: ShinyTextProps) {
  return (
    <p
      style={{
        "--shimmer-width": `${shimmerWidth}px`,
      } as React.CSSProperties}
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        // Shimmer effect
        "animate-shimmer bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shimmer-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        // Shimmer gradient
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className
      )}
    >
      {text}
    </p>
  );
}
```

## CSS (add to globals.css)

```css
@keyframes shimmer {
  0%, 90%, 100% {
    background-position: calc(-100% - var(--shimmer-width)) 0;
  }
  30%, 60% {
    background-position: calc(100% + var(--shimmer-width)) 0;
  }
}

.animate-shimmer {
  animation: shimmer 8s infinite;
}
```

## Usage

```tsx
import { ShinyText } from "@/components/ui/shiny-text"

// Basic usage
<ShinyText text="✨ Introducing Magic UI" />

// Custom shimmer width
<ShinyText text="Premium Features" shimmerWidth={150} />

// With custom styling
<ShinyText
  text="New Release"
  className="text-2xl font-bold"
/>
```

## AI Prompt

> Create a shiny text component with:
> - Animated shimmer gradient effect
> - Customizable shimmer width via CSS variable
> - Smooth looping animation
> - Dark mode support
> - Tailwind CSS styling
