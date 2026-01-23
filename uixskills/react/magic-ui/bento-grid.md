# Bento Grid Layout

A modern bento grid layout component for showcasing features or content. Supports different card sizes and hover animations.

## Overview

| Field | Value |
|-------|-------|
| Category | react/magic-ui |
| Tech Base | React + TypeScript |
| Source | [Magic UI](https://magicui.design) |
| License | MIT |
| Dependencies | tailwindcss, lucide-react |

## Features

- Flexible grid layout (like Apple's bento design)
- Cards with different spans (1x1, 2x1, 1x2, 2x2)
- Hover animations with content reveal
- Background slot for custom visuals
- Dark mode support
- Call-to-action buttons

## Code

```tsx
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // Light mode
      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // Dark mode
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
  >
    {/* Background visual */}
    <div>{background}</div>

    {/* Content that moves up on hover */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    {/* CTA that appears on hover */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <a href={href} className="pointer-events-auto">
        <button className="inline-flex items-center justify-center gap-1 rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200">
          {cta}
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </a>
    </div>

    {/* Hover overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
```

## Usage

```tsx
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import {
  FileTextIcon,
  CalendarIcon,
  BellIcon,
  Share2Icon,
  GlobeIcon
} from "lucide-react"

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/features/save",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: CalendarIcon,
    name: "Schedule posts",
    description: "Schedule your posts to go live at the perfect time.",
    href: "/features/schedule",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "/features/notifications",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Connect with your favorite tools and services.",
    href: "/features/integrations",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: GlobeIcon,
    name: "Global CDN",
    description: "Your content is served from the edge.",
    href: "/features/cdn",
    cta: "Learn more",
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/20" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
```

## AI Prompt

> Create a bento grid layout component with:
> - Flexible CSS grid with variable card sizes
> - Cards with icon, title, description
> - Background slot for images or gradients
> - Hover animation: content slides up, CTA appears
> - Dark mode support
> - Smooth transitions with transform-gpu
