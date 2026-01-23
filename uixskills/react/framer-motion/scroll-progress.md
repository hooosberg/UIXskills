# Scroll Progress Indicator

A progress bar that fills as you scroll down the page. Uses useScroll from Framer Motion.

## Overview

| Field | Value |
|-------|-------|
| Category | react/framer-motion |
| Tech Base | React + TypeScript |
| Source | [Framer Motion](https://www.framer.com/motion/) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Tracks scroll position of page or container
- Smooth spring physics
- Customizable appearance
- Fixed position for visibility
- Low performance impact

## Code

```tsx
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}
```

## Usage

```tsx
import { ScrollProgress } from "@/components/ui/scroll-progress"

// Add to layout - tracks entire page
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

// Or add to specific page
export function ArticlePage() {
  return (
    <>
      <ScrollProgress />
      <article className="prose max-w-2xl mx-auto py-16">
        <h1>Long Article Title</h1>
        <p>Content that requires scrolling...</p>
        {/* More content */}
      </article>
    </>
  );
}
```

## Variants

### Container Scroll Progress

```tsx
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ContainerScrollProgress() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="relative">
      <motion.div
        className="sticky top-0 h-1 bg-blue-500 origin-left z-10"
        style={{ scaleX }}
      />
      <div
        ref={containerRef}
        className="h-96 overflow-y-scroll"
      >
        {/* Scrollable content */}
      </div>
    </div>
  );
}
```

### Circular Progress

```tsx
export function CircularScrollProgress() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <svg width="60" height="60" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            pathLength,
            rotate: -90,
            transformOrigin: "center",
          }}
        />
      </svg>
    </div>
  );
}
```

### With Percentage Text

```tsx
export function ScrollProgressWithText() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-black text-white px-3 py-1 rounded-full text-sm">
      {progress}%
    </div>
  );
}
```

## AI Prompt

> Create a scroll progress indicator with:
> - Tracks scroll position using Framer Motion useScroll
> - Smooth spring animation with useSpring
> - Fixed position at top of viewport
> - Gradient or solid color bar
> - Can track page or specific container
