# Animated Border Beam

An animated beam effect that travels along the border of a component. Creates a magical glow effect. From Magic UI.

## Overview

| Field | Value |
|-------|-------|
| Category | react/magic-ui |
| Tech Base | React + TypeScript |
| Source | [Magic UI](https://magicui.design) |
| License | MIT |
| Dependencies | tailwindcss |

## Features

- Animated beam traveling along border
- Customizable colors (gradient from/to)
- Adjustable size, duration, and anchor point
- Works with any container shape
- CSS-only animation

## Code

```tsx
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
      } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        // Mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // Pseudo-element styles for the beam
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}
```

## CSS (add to tailwind.config.js)

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
      },
    },
  },
};
```

## Usage

```tsx
import { BorderBeam } from "@/components/ui/border-beam"

// Basic usage - wrap any container
<div className="relative rounded-xl border p-8 bg-background">
  <BorderBeam />
  <p>Card with animated border beam</p>
</div>

// Custom colors
<div className="relative rounded-xl border p-8">
  <BorderBeam colorFrom="#00ff88" colorTo="#00aaff" />
  <p>Green to blue beam</p>
</div>

// Faster animation
<div className="relative rounded-xl border p-8">
  <BorderBeam duration={8} size={150} />
  <p>Faster, smaller beam</p>
</div>

// Multiple beams with delay
<div className="relative rounded-xl border p-8">
  <BorderBeam />
  <BorderBeam delay={7} />
  <p>Two beams chasing each other</p>
</div>
```

## AI Prompt

> Create an animated border beam component with:
> - Beam that travels along the border of a container
> - Customizable gradient colors (from/to)
> - Adjustable size, speed, and delay
> - Works with rounded corners (inherits border-radius)
> - Pure CSS animation using offset-path
