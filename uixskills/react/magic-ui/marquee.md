# Marquee / Infinite Scroll

An infinite scrolling component that can be used for testimonials, logos, or any repeating content. Supports horizontal and vertical directions.

## Overview

| Field | Value |
|-------|-------|
| Category | react/magic-ui |
| Tech Base | React + TypeScript |
| Source | [Magic UI](https://magicui.design) |
| License | MIT |
| Dependencies | tailwindcss |

## Features

- Infinite scroll animation
- Horizontal and vertical directions
- Pause on hover option
- Reverse direction support
- Customizable speed via CSS variable
- Seamless loop (no visible seam)

## Code

```tsx
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
```

## CSS (add to tailwind.config.js)

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
};
```

## Usage

```tsx
import { Marquee } from "@/components/ui/marquee"

// Logo carousel
const logos = [
  { name: "Vercel", src: "/logos/vercel.svg" },
  { name: "Next.js", src: "/logos/nextjs.svg" },
  { name: "React", src: "/logos/react.svg" },
  // ... more logos
];

<Marquee pauseOnHover className="[--duration:20s]">
  {logos.map((logo) => (
    <img
      key={logo.name}
      src={logo.src}
      alt={logo.name}
      className="h-12 w-auto"
    />
  ))}
</Marquee>

// Testimonials (vertical)
<Marquee vertical pauseOnHover className="h-[400px] [--duration:30s]">
  {testimonials.map((t) => (
    <TestimonialCard key={t.id} {...t} />
  ))}
</Marquee>

// Reverse direction
<Marquee reverse className="[--duration:25s]">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</Marquee>

// Two rows going opposite directions
<div className="space-y-4">
  <Marquee>{/* Row 1 */}</Marquee>
  <Marquee reverse>{/* Row 2 */}</Marquee>
</div>
```

## AI Prompt

> Create an infinite marquee/scroll component with:
> - Seamless infinite loop animation
> - Horizontal and vertical scroll options
> - Pause on hover functionality
> - Reverse direction support
> - Customizable speed via CSS variable
> - Works with any child content
