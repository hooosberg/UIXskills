# Animated Tabs

Smooth animated tabs with layoutId for seamless indicator transitions. Built with Framer Motion.

## Overview

| Field | Value |
|-------|-------|
| Category | react/framer-motion |
| Tech Base | React + TypeScript |
| Source | [Framer Motion](https://www.framer.com/motion/) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Shared layout animation for tab indicator
- Spring physics for smooth transitions
- No layout shift during animation
- Accessible keyboard navigation
- Works with any tab content

## Code

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Home", "About", "Services", "Contact"];

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 ${
            activeTab === tab
              ? "text-gray-900 dark:text-white"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          }`}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {activeTab === tab && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-20">{tab}</span>
        </button>
      ))}
    </div>
  );
}
```

## Usage

```tsx
import { AnimatedTabs } from "@/components/ui/animated-tabs"

// Basic usage
export function TabsDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <AnimatedTabs />
    </div>
  );
}

// With content panels
export function TabsWithContent() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", content: <HomePanel /> },
    { id: "about", label: "About", content: <AboutPanel /> },
    { id: "contact", label: "Contact", content: <ContactPanel /> },
  ];

  return (
    <div>
      <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
```

## How It Works

The magic is in `layoutId="bubble"`:

1. When `activeTab` changes, the old `motion.span` unmounts and a new one mounts
2. Framer Motion detects they share the same `layoutId`
3. It automatically animates from the old position to the new position
4. The spring physics creates a smooth, bouncy transition

## AI Prompt

> Create animated tabs with:
> - Shared layout animation using Framer Motion layoutId
> - Spring physics for smooth indicator movement
> - Tab indicator that follows the active tab
> - Accessible with keyboard navigation
> - Works with any number of tabs
