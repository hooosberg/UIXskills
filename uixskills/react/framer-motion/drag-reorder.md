# Drag to Reorder List

Draggable list items that can be reordered with smooth animations. Uses Reorder from Framer Motion.

## Overview

| Field | Value |
|-------|-------|
| Category | react/framer-motion |
| Tech Base | React + TypeScript |
| Source | [Framer Motion](https://www.framer.com/motion/) |
| License | MIT |
| Dependencies | framer-motion, lucide-react, tailwindcss |

## Features

- Drag handle for precise control
- Smooth reorder animation
- Keyboard accessible
- Works with any item content
- Axis constraint (vertical/horizontal)

## Code

```tsx
"use client";

import { useState } from "react";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GripVertical } from "lucide-react";

interface Item {
  id: string;
  text: string;
}

export function ReorderList() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", text: "First item" },
    { id: "2", text: "Second item" },
    { id: "3", text: "Third item" },
    { id: "4", text: "Fourth item" },
  ]);

  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={setItems}
      className="space-y-2"
    >
      {items.map((item) => (
        <ReorderItem key={item.id} item={item} />
      ))}
    </Reorder.Group>
  );
}

function ReorderItem({ item }: { item: Item }) {
  const dragControls = useDragControls();
  const y = useMotionValue(0);

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border cursor-grab active:cursor-grabbing dark:bg-gray-800 dark:border-gray-700"
    >
      <button
        onPointerDown={(e) => dragControls.start(e)}
        className="touch-none p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </button>
      <span className="flex-1">{item.text}</span>
    </Reorder.Item>
  );
}
```

## Usage

```tsx
import { ReorderList } from "@/components/ui/reorder-list"

// Basic usage
export function ReorderDemo() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Drag to reorder</h2>
      <ReorderList />
    </div>
  );
}

// With custom items
export function TaskList() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Complete project", priority: "high" },
    { id: "2", title: "Review code", priority: "medium" },
    { id: "3", title: "Write tests", priority: "low" },
  ]);

  return (
    <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
      {tasks.map((task) => (
        <Reorder.Item
          key={task.id}
          value={task}
          className="flex items-center gap-3 p-4 mb-2 bg-white rounded-lg shadow"
        >
          <GripVertical className="cursor-grab" />
          <span className="flex-1">{task.title}</span>
          <span className={`px-2 py-1 text-xs rounded ${
            task.priority === 'high' ? 'bg-red-100 text-red-800' :
            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {task.priority}
          </span>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

// Horizontal reorder
<Reorder.Group axis="x" values={items} onReorder={setItems} className="flex gap-2">
  {items.map((item) => (
    <Reorder.Item key={item.id} value={item} className="p-4 bg-white rounded">
      {item.text}
    </Reorder.Item>
  ))}
</Reorder.Group>
```

## AI Prompt

> Create a drag-to-reorder list with:
> - Drag handle for controlled dragging
> - Smooth animation during reorder
> - Uses Framer Motion Reorder component
> - Works with any list item content
> - Supports vertical or horizontal axis
