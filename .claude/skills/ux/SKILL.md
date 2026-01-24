---
description: UIXskills User Experience & Interaction Logic Patterns
---

# UX Skills (Interaction Logic)

本文档定义了 UIXskills 项目的核心交互逻辑和用户体验模式，重点在于基于用户状态的差异化展示和无缝导航。

## 一、上下文感知导航 (Context-Aware Navigation)

系统根据用户的登录状态动态调整导航结构，确保界面始终展示最相关的信息。

### 1.1 侧边栏 vs 顶部栏 (Sidebar vs Header)
- **Guest (未登录)**: 使用 `SharedHeader` (顶部导航栏)，提供登录/注册入口，保持传统落地页体验。
- **User (已登录)**: 使用 `Sidebar` (左侧垂直导航)，提供 Dashboard、My Skills 等应用级功能入口。顶部栏自动隐藏或简化。

**逻辑规则:**
- 在 `/skills` 等公共页面，如果检测到 `session`，则包裹在 `<Layout>` 中显示侧边栏。
- 在 `/skills/submit` 等功能页面，如果用户已登录（已有侧边栏），则 **移除** `SharedHeader`，避免双重导航占用屏幕空间。

### 1.2 渐进式披露 (Progressive Disclosure)
仅在用户需要时展示特定操作入口。

- **Call-to-Action (CTA)**:
  - **访客**: 在列表底部显示 "Have a skill to share?" 引导注册/登录。
  - **用户**: 隐藏上述引导（因为用户已知晓如何提交，且不需要营销引导），减少视觉噪音。

---

## 二、高效交互模式

### 2.1 全局快捷键
赋予 Power User 更高的操作效率。
- **搜索**: 按下 `/` 键自动聚焦全局搜索框。
- **退出**: `Esc` 关闭模态框。

### 2.2 状态反馈
- **Skeleton Screens**: 加载过程中使用骨架屏而非旋转 loading，减少感知等待时间。
- **Success States**: 关键操作（如提交技能）完成后，通过全屏或显著的成功页面提供明确反馈，并提供 "Back to Gallery" 等明确的后续路径。

---

## 三、用户流 (User Flows)

### 3.1 技能提交流
1. **Entry**: 点击 "Submit Skill"。
2. **Auth Check**: 未登录 -> 弹出 `AuthModal`。
3. **Input**:
   - 自动解析 GitHub URL。
   - 自动预填充 Repo 信息（Owner, Repo Name）。
4. **Validation**: 实时检查 Repo 有效性。
5. **Completion**: 成功页 -> 引导回列表。

### 3.2 查看技能流
1. **List**: 列表页浏览 (支持 infinite scroll 或 pagination)。
2. **Detail**: 点击进入详情页，支持直接复制安装指令 `npx uixskills add ...`。
3. **Back**: 详情页提供清晰的 "Back" 按钮返回列表上下文。

---

## 四、检查清单 (UX Checklist)

在开发新功能时，请检查：
- [ ] **Auth State**: 该功能在登录/未登录状态下是否应该有不同表现？
- [ ] **Redundancy**: 页面中是否有重复的导航或标题（特别是由于 Layout 嵌套导致的）？
- [ ] **Keyboard**: 是否支持基本的键盘操作？
- [ ] **Feedback**: 异步操作是否有明确的 Loading 和 Success/Error 状态？
