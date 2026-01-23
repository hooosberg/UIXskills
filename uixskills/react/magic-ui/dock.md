# Dock / macOS Dock

A macOS-style dock component with smooth hover magnification animation. Perfect for navigation or quick actions.

## Overview

| Field | Value |
|-------|-------|
| Category | react/magic-ui |
| Tech Base | React + TypeScript |
| Source | [Magic UI](https://magicui.design) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- macOS-style magnification on hover
- Smooth spring animations
- Works with any icon or content
- Responsive and accessible
- Glass morphism background
- Customizable via variants

## Code

```tsx
"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const dockVariants = cva(
  "mx-auto flex h-[58px] w-max gap-2 rounded-2xl border p-2 dark:border-neutral-800 border-neutral-300 bg-white/80 dark:bg-black/80 backdrop-blur-lg"
);

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  children: React.ReactNode;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants(), className)}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { mouseX })
            : child
        )}
      </motion.div>
    );
  }
);
Dock.displayName = "Dock";

export interface DockIconProps {
  mouseX?: any;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const DockIcon = ({ mouseX, className, children, ...props }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
```

## Usage

```tsx
import { Dock, DockIcon } from "@/components/ui/dock"
import {
  Home,
  Search,
  Mail,
  Calendar,
  Settings,
  Music,
  Camera
} from "lucide-react"

export function DockDemo() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <Dock>
        <DockIcon onClick={() => console.log("Home")}>
          <Home className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Search")}>
          <Search className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Mail")}>
          <Mail className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Calendar")}>
          <Calendar className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Music")}>
          <Music className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Camera")}>
          <Camera className="h-6 w-6" />
        </DockIcon>
        <DockIcon onClick={() => console.log("Settings")}>
          <Settings className="h-6 w-6" />
        </DockIcon>
      </Dock>
    </div>
  );
}

// With custom styling
<Dock className="bg-black/90 border-white/20">
  <DockIcon className="bg-white/10">
    <Home className="h-6 w-6 text-white" />
  </DockIcon>
</Dock>
```

## AI Prompt

> Create a macOS-style dock component with:
> - Mouse-based magnification effect
> - Smooth spring animations using Framer Motion
> - Icons that grow when mouse approaches
> - Glass morphism background
> - Works with any icon content
> - Customizable via class-variance-authority
