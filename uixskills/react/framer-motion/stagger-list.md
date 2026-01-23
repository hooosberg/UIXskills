# Stagger Animation List

List items that animate in with staggered delay. Great for revealing content progressively.

## Overview

| Field | Value |
|-------|-------|
| Category | react/framer-motion |
| Tech Base | React + TypeScript |
| Source | [Framer Motion](https://www.framer.com/motion/) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Staggered entrance animation
- Parent controls child timing
- Customizable delay between items
- Works with any list content
- Easy variant-based API

## Code

```tsx
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StaggerList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-2"
    >
      {items.map((text, i) => (
        <motion.li
          key={i}
          variants={item}
          className="p-4 bg-white rounded-lg shadow-sm border dark:bg-gray-800 dark:border-gray-700"
        >
          {text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## Usage

```tsx
import { StaggerList } from "@/components/ui/stagger-list"

// Basic usage
export function StaggerDemo() {
  const items = [
    "First item appears",
    "Second item follows",
    "Third item comes next",
    "Fourth item is last",
  ];

  return <StaggerList items={items} />;
}

// With custom content
export function StaggerCards() {
  const cards = [
    { title: "Feature 1", desc: "Description for feature 1" },
    { title: "Feature 2", desc: "Description for feature 2" },
    { title: "Feature 3", desc: "Description for feature 3" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-4"
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          variants={item}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <h3 className="font-bold">{card.title}</h3>
          <p className="text-gray-600">{card.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Stagger on scroll (with whileInView)
export function StaggerOnScroll() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* children with item variants */}
    </motion.div>
  );
}
```

## Variants

### Fade from different directions

```tsx
// From left
const itemFromLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

// From right
const itemFromRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

// Scale up
const itemScale = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

// Rotate in
const itemRotate = {
  hidden: { opacity: 0, rotate: -10 },
  show: { opacity: 1, rotate: 0 },
};
```

## AI Prompt

> Create a staggered list animation with:
> - Parent container that orchestrates timing
> - Children that animate in sequence
> - Customizable stagger delay
> - Uses Framer Motion variants API
> - Works with any list content
