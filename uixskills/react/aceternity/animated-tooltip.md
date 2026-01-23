# Animated Tooltip

Beautiful animated tooltip that appears on hover with smooth spring animation. Shows user avatars or content with dynamic positioning.

## Overview

| Field | Value |
|-------|-------|
| Category | react/aceternity |
| Tech Base | React + TypeScript |
| Source | [Aceternity UI](https://ui.aceternity.com) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Smooth spring animation on hover
- Mouse-tracking rotation effect
- Stacked avatar display
- Gradient accent lines
- Dynamic positioning
- Support for any content

## Code

```tsx
"use client";

import React, { useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useSpring(0, springConfig);
  const rotate = useSpring(0, springConfig);
  const translateX = useTransform(x, (latest) => latest / 2);

  const handleMouseMove = (event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    const half = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - half);
    rotate.set((event.nativeEvent.offsetX - half) / 10);
  };

  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      {items.map((item) => (
        <div
          className="-mr-4 relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
              }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
            >
              {/* Gradient accent lines */}
              <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />

              {/* Content */}
              <div className="font-bold text-white relative z-30 text-base">
                {item.name}
              </div>
              <div className="text-white text-xs">{item.designation}</div>
            </motion.div>
          )}

          {/* Avatar */}
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};
```

## Usage

```tsx
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Bob Johnson",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Alice Williams",
    designation: "Tech Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export function AnimatedTooltipDemo() {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

// With custom styling
<AnimatedTooltip
  items={people.map(p => ({
    ...p,
    image: p.image + "?grayscale"
  }))}
/>
```

## AI Prompt

> Create an animated tooltip component with:
> - Spring animation on hover (scale, opacity, y position)
> - Mouse-tracking rotation effect
> - Stacked avatar display with overlap
> - Gradient accent lines at bottom
> - Shows name and designation
> - Uses Framer Motion for animations
