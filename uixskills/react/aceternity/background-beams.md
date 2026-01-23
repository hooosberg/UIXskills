# Background Beams

Animated background beams that create a dynamic, tech-inspired visual effect. Perfect for hero sections and landing pages.

## Overview

| Field | Value |
|-------|-------|
| Category | react/aceternity |
| Tech Base | React + TypeScript |
| Source | [Aceternity UI](https://ui.aceternity.com) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Animated SVG path beams
- Gradient color transitions
- Random timing for organic feel
- Infinite loop animation
- Dark mode optimized
- Low performance impact

## Code

```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
    "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
    "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
  ];

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full pointer-events-none absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, idx) => (
          <motion.path
            key={`path-${idx}`}
            d={path}
            stroke={`url(#linearGradient-${idx})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {paths.map((_, idx) => (
            <motion.linearGradient
              key={`gradient-${idx}`}
              id={`linearGradient-${idx}`}
              initial={{
                x1: "0%",
                x2: "0%",
                y1: "0%",
                y2: "0%",
              }}
              animate={{
                x1: ["0%", "100%"],
                x2: ["0%", "95%"],
                y1: ["0%", "100%"],
                y2: ["0%", `${93 + Math.random() * 8}%`],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                ease: "easeInOut",
                repeat: Infinity,
                delay: Math.random() * 10,
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
};

export default BackgroundBeams;
```

## Usage

```tsx
import { BackgroundBeams } from "@/components/ui/background-beams"

// Basic hero section
export function HeroSection() {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business.
        </p>
        <input
          type="text"
          placeholder="hi@example.com"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 mt-4 bg-neutral-950 placeholder:text-neutral-700 px-4 py-2"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}

// With custom colors (modify the gradient stops in the component)
<BackgroundBeams className="opacity-50" />
```

## AI Prompt

> Create animated background beams with:
> - Multiple SVG curved paths
> - Animated gradient that travels along paths
> - Random timing for organic movement
> - Cyan to purple color scheme
> - Infinite loop animation
> - Uses Framer Motion for gradient animation
