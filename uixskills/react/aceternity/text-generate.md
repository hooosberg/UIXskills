# Text Generate Effect

Text that generates word by word with a staggered fade-in animation effect. Great for hero headings and impactful statements.

## Overview

| Field | Value |
|-------|-------|
| Category | react/aceternity |
| Tech Base | React + TypeScript |
| Source | [Aceternity UI](https://ui.aceternity.com) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Word-by-word reveal animation
- Staggered timing for natural feel
- Customizable duration and delay
- Filter blur effect during reveal
- Works with any text content
- Accessible (text is always in DOM)

## Code

```tsx
"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [scope, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="dark:text-white text-black opacity-0"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
```

## Usage

```tsx
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

// Basic usage
export function TextGenerateDemo() {
  const words = "Generating text with beautiful animations one word at a time";

  return <TextGenerateEffect words={words} />;
}

// Hero section
export function HeroWithTextGenerate() {
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <TextGenerateEffect
        words="Build beautiful websites with modern components"
        className="text-4xl md:text-6xl lg:text-7xl text-center"
      />
    </div>
  );
}

// Without blur effect
<TextGenerateEffect
  words="Clean fade-in animation"
  filter={false}
/>

// Faster animation
<TextGenerateEffect
  words="Quick reveal effect"
  duration={0.3}
/>

// With custom styling
<TextGenerateEffect
  words="Custom styled text"
  className="text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
/>
```

## Variants

### Character by Character

```tsx
export const TextGenerateEffectChars = ({ words }: { words: string }) => {
  const [scope, animate] = useAnimate();
  const characters = words.split("");

  useEffect(() => {
    animate(
      "span",
      { opacity: 1 },
      { duration: 0.1, delay: stagger(0.03) }
    );
  }, []);

  return (
    <motion.div ref={scope} className="inline-block">
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          className="opacity-0 inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};
```

## AI Prompt

> Create a text generation effect component with:
> - Word-by-word reveal animation
> - Staggered timing using Framer Motion
> - Optional blur filter during reveal
> - Customizable duration
> - Accessible with text always in DOM
> - Works with any text string
