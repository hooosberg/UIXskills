# Toast Notifications (Sonner)

An opinionated toast component for React. Beautiful by default, easy to use, and highly customizable. Created by Emil Kowalski.

## Overview

| Field | Value |
|-------|-------|
| Category | react/shadcn |
| Tech Base | React + TypeScript |
| Source | [sonner](https://github.com/emilkowalski/sonner) |
| License | MIT |
| Dependencies | sonner |

## Features

- Multiple toast types: success, error, info, warning, loading
- Promise support for async operations
- Action buttons within toasts
- Stacking and auto-dismiss
- Customizable position and duration
- Smooth enter/exit animations
- Dark mode support

## Code

```tsx
"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
```

## Usage

```tsx
import { toast } from "sonner"

// Basic toast
toast("Event has been created")

// With description
toast("Event has been created", {
  description: "Sunday, December 03, 2023 at 9:00 AM",
})

// Success toast
toast.success("Successfully saved!")

// Error toast
toast.error("Something went wrong")

// Warning toast
toast.warning("Please check your input")

// Info toast
toast.info("New update available")

// Loading toast
toast.loading("Loading...")

// Promise toast
toast.promise(saveSettings(), {
  loading: 'Saving...',
  success: 'Settings saved!',
  error: 'Could not save.',
})

// With action button
toast("Event created", {
  action: {
    label: "Undo",
    onClick: () => console.log("Undo"),
  },
})

// With cancel button
toast("Delete this item?", {
  cancel: {
    label: "Cancel",
    onClick: () => console.log("Cancelled"),
  },
  action: {
    label: "Delete",
    onClick: () => deleteItem(),
  },
})

// Custom duration
toast("This will stay longer", {
  duration: 10000, // 10 seconds
})

// Dismiss programmatically
const toastId = toast("Loading...")
// Later...
toast.dismiss(toastId)
```

## Configuration

```tsx
// In your layout or app root
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
        />
      </body>
    </html>
  )
}
```

## AI Prompt

> Create a toast notification system with:
> - Multiple toast types: success, error, info, warning, loading
> - Promise support for async operations
> - Action buttons within toasts
> - Stacking and auto-dismiss
> - Customizable position and duration
> - Smooth enter/exit animations
> - Dark mode support
