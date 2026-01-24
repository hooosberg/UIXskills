---
description: UIXskills UI Design System & Visual Style Guide
---

# UI Skills (Visual Design System)

本文档定义了 UIXskills 项目的统一 UI 设计规范，融合了 Zen 极简主义、苹果设计风格以及程序员风格的视觉元素。

## 一、核心设计语言

UIXskills 采用 **极简主义 + 苹果风格 + 极客元素** 的混合设计语言：

- **Zen Theme**: 以 `#F5F5F7` (Apple Gray) 为背景，强调留白和呼吸感。
- **Glassmorphism**: 使用 `backdrop-blur` 和半透明白色背景构建层级。
- **Programmer Aesthetic**: 在标题和关键数据展示上使用等宽字体 (Monospace) 和像素点阵效果。
- **Consistency**: 统一的 `rounded-sm` (按钮) vs `rounded-xl` (容器) 圆角系统。

---

## 二、特效文字系统 (New)

### 2.1 像素点阵标题 (Pixel Matrix Title)

用于页面主标题 (Hero Title)，营造复古极客感。

**样式代码:**
```tsx
<h1 
  className="font-mono uppercase font-black tracking-tighter"
  style={{
    backgroundImage: 'radial-gradient(circle, #1a1a1a 1.5px, transparent 1.5px)',
    backgroundSize: '4px 4px',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'contrast(1.2)'
  }}
>
  TITLE TEXT
</h1>
```

**特征:**
- 字体: `font-mono`
- 大小写: `uppercase`
- 字重: `font-black`
- 纹理: 使用 `radial-gradient` 模拟 LED/LCD 点阵显示效果

---

## 三、颜色系统

### 3.1 品牌色
```css
--zen-primary: #0a4841; /* 禅意绿 */
--text-primary: #1d1d1f;
--bg-primary: #F5F5F7;
```

### 3.2 Tailwind 映射
| 用途 | 类名 |
|------|------|
| 页面背景 | `bg-[#F5F5F7]` |
| 玻璃面板 | `bg-white/40 backdrop-blur-md` |
| 边框 | `border-black/5` (替代阴影) |

---

## 四、排版系统

### 4.1 字体策略
- **UI 界面**: San Francisco / System Sans (`font-sans`)
- **数据/代码/强调**: Monospace (`font-mono`)

### 4.2 标签样式 (Programmer Badge)
用于展示元数据或分类标签，模仿代码编辑器风格。

```tsx
<div className="inline-flex items-center gap-2 px-2 py-1 border border-black/5 bg-white rounded-sm text-[10px] font-mono text-gray-500 uppercase tracking-wider">
  <Icon size={10} />
  <span>LABEL</span>
</div>
```

---

## 五、组件规范

### 5.1 按钮 (Buttons)
所有功能性按钮统一使用 **小圆角** (`rounded-sm`)，以区别于内容容器的 **大圆角**。

- **Primary**: `bg-zen-primary text-white rounded-sm`
- **Secondary**: `bg-white border border-black/10 rounded-sm`

### 5.2 卡片 (Cards)
极简风格，无阴影，仅使用极淡的边框。

```tsx
<div className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 transition-colors">
  {/* Content */}
</div>
```

---

## 六、禁止事项
1. **禁止阴影**: 尽量避免使用 `box-shadow`，使用 `border-black/5` 代替层级分割。
2. **禁止大圆角按钮**: 按钮必须是 `rounded-sm`。
3. **禁止默认蓝**: 必须使用 `--zen-primary` 或灰度色。
