<div align="center">
  <img src="docs/uixskillicon.png" width="80" alt="UIX Skills Logo" />

  # UIX Skills

  ## [🌐 UIXSKILLS.COM](https://uixskills.com)

  **UI/UX Gallery & Skill Whiteboard for the AI Era**

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Skills](https://img.shields.io/badge/skills-38+-green.svg)](uixskills/)

  [English](README.md) | [中文](docs/README.zh-CN.md)
</div>

---

## 🌟 Core Concept: Skill Whiteboard

**Don't let AI guess your design — define it with the Skill Whiteboard.**

UIX Skills is both a **UI/UX Gallery** and a **Skill Whiteboard Protocol**. We provide carefully packaged "Skills" (design specification components) paired with a visual "Skill Whiteboard" that generates AI-readable precise JSON instructions.

AI → JSON → Whiteboard → SKILL → UI

### Why UIX Skills?

- **UI/UX Gallery**: Browse 38+ curated design styles like shadcn/ui, Magic UI, and iOS native design — like visiting an art gallery.
- **Skill Whiteboard**: A visual JSON generator. Import AI-generated drafts, drag and inject Skills from the gallery, and generate standardized JSON description files.
- **Precise Control**: Say goodbye to the ambiguity of natural language. Tell AI with JSON: "Use `react/shadcn/button` here, with parameter `outline`" instead of "make a nice button."

---

## 🚀 Quick Start

### Install via npx (Recommended)

```bash
# Install a skill from GitHub
npx uixskills add hooosberg/UIXskills

# Install to a custom directory
npx uixskills add hooosberg/UIXskills --dir ./my-skills

# Or install globally
npm install -g uixskills
uixskills add hooosberg/UIXskills
```

> **Requires Node.js 18+** | [View on npm](https://www.npmjs.com/package/uixskills)

### CLI Commands

```bash
# List top skills
npx uixskills list

# Search for skills
npx uixskills search glassmorphism
```

### Use with Claude Code

In Claude Code conversations, directly reference installed Skills:

```
> Please use the frontend-design skill to design a login page, with style referencing apple/ios-design
```

### Use the Skill Whiteboard

1. Have AI generate a basic JSON skeleton.
2. Open the Skill Whiteboard at [uixskills.com/whiteboard](https://uixskills.com/whiteboard).
3. Import JSON, select Skills from the gallery to bind to components.
4. Export the final JSON and feed it to AI for code generation.

---

## 📚 Skill Gallery Categories

The repository currently contains **38+** verified Skills covering the following areas:

| 🎨 **UI Frameworks** | 📱 **Design Systems** | 🤖 **AI Automation** |
| :--- | :--- | :--- |
| **React / shadcn/ui**<br>Button, Toast, Command... | **Apple Platforms**<br>iOS, macOS, visionOS... | **Claude Skills**<br>Frontend Design Expert |
| **React / Magic UI**<br>Shiny Text, Bento Grid... | **Android**<br>Material 3, Pixel Experience | **Artifacts Builder**<br>Auto-build HTML artifacts |
| **React / Framer Motion**<br>Tabs, Lists, Gestures | **Gaming**<br>Console, RPG UI Patterns | **Test Automation**<br>Playwright, iOS Sim |

---

## 🎯 AI Prompt: Generate Whiteboard JSON

Copy the following prompt and send it to any AI (Claude/GPT/DeepSeek) to generate importable whiteboard files:

````markdown
# UIXskills Whiteboard JSON Specification

You are a UI design JSON generator. Generate JSON that can be directly imported into UIXskills Whiteboard.

## Shape Types (ShapeType)

| Type | Description | Default Size |
|------|-------------|--------------|
| PHONE | iPhone frame | 375×812 |
| TABLET | iPad frame | 768×1024 |
| DESKTOP | Desktop browser | 1280×800 |
| WATCH | Apple Watch | 184×224 |
| RECTANGLE | Rectangle | 100×100 |
| ROUNDED_RECT | Rounded rect | 100×100 |
| CIRCLE | Circle | 100×100 |
| BUTTON | Button | 120×44 |
| TEXT | Text | 200×24 |
| ICON | Icon | 24×24 |
| LINE | Line | 100×2 |
| STICKER | Annotation | 200×100 |

## UI Roles (Optional)

SCREEN, HEADER, FOOTER, SIDEBAR, CARD, BUTTON, INPUT, LIST, LIST_ITEM, IMAGE, ICON, TEXT, CONTAINER, MODAL, TAB_BAR, CUSTOM

## JSON Structure

```json
{
  "version": "1.0",
  "title": "Project Name",
  "shapes": [
    {
      "id": "unique-id",
      "type": "PHONE",
      "x": 100,
      "y": 100,
      "width": 375,
      "height": 812,
      "cornerRadius": 40,
      "fillColor": "#FFFFFF",
      "strokeColor": "#E5E5EA",
      "strokeWidth": 1
    }
  ],
  "groups": [],
  "metadata": {
    "targetPlatform": "web",
    "targetFramework": "react"
  }
}
```

## Required Fields

Each shape must have:
- `id`: Unique string
- `type`: ShapeType enum value
- `x`, `y`: Canvas coordinates
- `width`, `height`: Dimensions

## Common Properties

| Property | Type | Description |
|----------|------|-------------|
| cornerRadius | number | Border radius |
| fillColor | string | Fill color (#HEX) |
| strokeColor | string | Stroke color |
| strokeWidth | number | Stroke width |
| text | string | Text content |
| textColor | string | Text color |
| fontSize | number | Font size |

## Design Guidelines

- Use 8px grid
- Common spacing: 8, 12, 16, 20, 24, 32, 40, 48
- Common radius: 4, 8, 12, 16, 20, 24

---

Generate JSON for the following requirement:
````

---

## 🤝 Contributing

We welcome new Skill submissions to the gallery! Each Skill is a standardized `.md` file.

Since **"Everything is a file,"** simply fork this repository and add your Skill Markdown file.

---

## 📄 License

MIT License © 2026

---

<div align="center">

**[uixskills.com](https://uixskills.com)** · Everything is a file

</div>
