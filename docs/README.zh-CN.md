<div align="center">
  <img src="uixskillicon.png" width="80" alt="UIX Skills Logo" />

  # UIX Skills

  ## [🌐 UIXSKILLS.COM](https://uixskills.com)

  **AI 时代的 UI/UX 画廊 & Skill 白板**

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Skills](https://img.shields.io/badge/skills-38+-green.svg)](uixskills/)

  [English](../README.md) | [中文](README.zh-CN.md)
</div>

---

## 🌟 核心理念：Skill 白板

**不要让 AI 猜你的设计，用 Skill 白板定义它。**

UIX Skills 是一个 **UI/UX 画廊**，也是一套 **Skill 白板协议**。我们提供精心封装的 "Skill"（设计规范组件），配合可视化的 "Skill 白板"，生成 AI 可读的精确 JSON 指令。

AI → JSON → Whiteboard → SKILL→ UI

### 为什么需要 UIX Skills？

- **UI/UX 画廊**：像逛画廊一样浏览 shadcn/ui、Magic UI、iOS 原生设计等 38+ 种精选设计风格。
- **Skill 白板**：可视化的 JSON 生成器。导入 AI 生成的草稿，拖拽注入画廊中的 Skill，生成标准化的 JSON 描述文件。
- **精确控制**：告别自然语言的模糊。用 JSON 告诉 AI：\"这里使用 `react/shadcn/button`，参数是 `outline`\"，而不是 \"做一个好看的按钮\"。

---

## 🚀 快速开始

### 1. 在 Claude Code 中使用

UIX Skills 设计为即插即用的 "技能包"。

```bash
# 克隆仓库
git clone https://github.com/hooosberg/UIXskills.git

# 安装技能 (以 Claude 为例)
cp -r UIXskills/uixskills/claude-skills/* ~/.claude/skills/
```

### 2. 引用技能开发

在 Claude Code 对话中，直接引用已安装的 Skill：

```
> 请使用 frontend-design skill 设计一个登录页，风格参考 apple/ios-design
```

### 3. 使用 Skill 白板

1. 让 AI 生成基础 JSON 骨架。
2. 在 [uixskills.com/whiteboard](https://uixskills.com/whiteboard) 打开 Skill 白板。
3. 导入 JSON，在画廊中选择 Skill 绑定到组件。
4. 导出最终 JSON，喂给 AI 生成代码。

---

## 📚 技能画廊分类

目前仓库包含 **38+** 个经过验证的 Skill，涵盖以下领域：

| 🎨 **UI 框架** | 📱 **设计规范** | 🤖 **AI 自动化** |
| :--- | :--- | :--- |
| **React / shadcn/ui**<br>Button, Toast, Command... | **Apple Platforms**<br>iOS, macOS, visionOS... | **Claude Skills**<br>Frontend Design Expert |
| **React / Magic UI**<br>Shiny Text, Bento Grid... | **Android**<br>Material 3, Pixel Experience | **Artifacts Builder**<br>自动构建 HTML 制品 |
| **React / Framer Motion**<br>Tabs, Lists, Gestures | **Gaming**<br>Console, RPG UI Patterns | **Test Automation**<br>Playwright, iOS Sim |

---

## 🎯 AI Prompt: 生成白板 JSON

复制以下 Prompt 发送给任何 AI (Claude/GPT/DeepSeek)，让它为你生成可直接导入的白板文件：

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

## 🤝 贡献

欢迎向画廊提交新的 Skill！每一个 Skill 都是一份标准化的 `.md` 文件。

由于 **"一切皆为文件"**，你只需要 Fork 本仓库，添加你的 Skill Markdown 文件即可。

---

## 📄 许可证

MIT License © 2026

---

<div align="center">

**[uixskills.com](https://uixskills.com)** · Everything is a file

</div>
