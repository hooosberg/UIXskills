# Hero Parallax

A stunning hero section with parallax scrolling effect. Products/images move at different speeds creating depth. From Aceternity UI.

## Overview

| Field | Value |
|-------|-------|
| Category | react/aceternity |
| Tech Base | React + TypeScript |
| Source | [Aceternity UI](https://ui.aceternity.com) |
| License | MIT |
| Dependencies | framer-motion, tailwindcss |

## Features

- Scroll-driven parallax animation
- Multiple rows moving in different directions
- 3D perspective rotation on scroll
- Product cards with hover effects
- Smooth spring physics
- Responsive design

## Code

```tsx
"use client";

import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HeroParallax = ({
  products,
}: {
  products: { title: string; link: string; thumbnail: string }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
}: {
  product: { title: string; link: string; thumbnail: string };
  translate: any;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none rounded-lg transition-opacity" />
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white text-xl font-bold transition-opacity">
        {product.title}
      </h2>
    </motion.div>
  );
};

export default HeroParallax;
```

## Usage

```tsx
import { HeroParallax } from "@/components/ui/hero-parallax"

const products = [
  { title: "Moonbeam", link: "#", thumbnail: "/images/p1.jpg" },
  { title: "Cursor", link: "#", thumbnail: "/images/p2.jpg" },
  { title: "Rogue", link: "#", thumbnail: "/images/p3.jpg" },
  { title: "Editorially", link: "#", thumbnail: "/images/p4.jpg" },
  { title: "Editrix AI", link: "#", thumbnail: "/images/p5.jpg" },
  { title: "Pixel Perfect", link: "#", thumbnail: "/images/p6.jpg" },
  { title: "Algochurn", link: "#", thumbnail: "/images/p7.jpg" },
  { title: "Aceternity UI", link: "#", thumbnail: "/images/p8.jpg" },
  { title: "Tailwind Master Kit", link: "#", thumbnail: "/images/p9.jpg" },
  { title: "SmartBridge", link: "#", thumbnail: "/images/p10.jpg" },
  { title: "Renderwork Studio", link: "#", thumbnail: "/images/p11.jpg" },
  { title: "Creme Digital", link: "#", thumbnail: "/images/p12.jpg" },
  { title: "Golden Bells Academy", link: "#", thumbnail: "/images/p13.jpg" },
  { title: "Invoker Labs", link: "#", thumbnail: "/images/p14.jpg" },
  { title: "E Free Invoice", link: "#", thumbnail: "/images/p15.jpg" },
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
```

## AI Prompt

> Create a hero parallax section with:
> - Scroll-driven 3D rotation and translation
> - Multiple rows of cards moving in opposite directions
> - Spring physics for smooth animations
> - Product cards with hover effects
> - Header text that stays in place
> - Uses Framer Motion useScroll and useTransform
