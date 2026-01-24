# UIXskills 设计系统规范

本文档定义了 UIXskills 项目的统一 UI 设计规范，所有新增或修改的 UI 组件都必须遵循此规范。

---

## 一、设计语言

UIXskills 采用 **极简主义 + 苹果风格** 的设计语言，强调：

- **留白**：大量使用空白区域，让内容呼吸
- **层次感**：通过微妙的阴影和边框区分层级
- **一致性**：统一的圆角、间距、字体系统
- **流畅动效**：使用 `transition-all duration-300` 的平滑过渡
- **黑白为主**：避免彩色渐变，使用灰度色阶

---

## 二、颜色系统

### 2.1 主色调

```css
/* 品牌主色 - 禅意绿 */
--zen-primary: #0a4841;
--zen-primary-hover: #0d5a52;

/* 背景色 */
--bg-primary: #F5F5F7;      /* 页面背景 - 苹果灰 */
--bg-white: #FFFFFF;         /* 卡片/模态框背景 */
--bg-white-80: rgba(255, 255, 255, 0.8);  /* 毛玻璃背景 */

/* 文字色 */
--text-primary: #1d1d1f;     /* 主文字 - 接近纯黑 */
--text-secondary: #86868b;   /* 次要文字 - 苹果灰 */
--text-muted: #6e6e73;       /* 辅助文字 */

/* 边框色 */
--border-light: rgba(0, 0, 0, 0.05);   /* 轻边框 */
--border-default: #E5E5EA;              /* 默认边框 */
--border-dark: rgba(0, 0, 0, 0.1);     /* 深边框 */

/* 状态色 - 仅用于状态指示，不作为装饰 */
--color-success: #34C759;    /* 成功绿 */
--color-warning: #FF9500;    /* 警告橙 */
--color-error: #FF3B30;      /* 错误红 */
--color-info: #007AFF;       /* 信息蓝 */
```

### 2.2 Tailwind 类名速查

| 用途 | Tailwind 类 |
|------|-------------|
| 页面背景 | `bg-[#F5F5F7]` |
| 卡片背景 | `bg-white` |
| 毛玻璃背景 | `bg-white/80 backdrop-blur-sm` |
| 主文字 | `text-black` 或 `text-gray-900` |
| 次要文字 | `text-gray-500` |
| 辅助文字 | `text-gray-400` |
| 轻边框 | `border-black/5` |
| 默认边框 | `border-gray-200` |
| 品牌主色 | `text-zen-primary` / `bg-zen-primary` |

---

## 三、排版系统

### 3.1 字体

```css
/* 主字体 - 无衬线 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* 等宽字体 - 代码/技术文字/副标题 */
font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
```

### 3.2 字体大小层级

| 用途 | Tailwind 类 | 实际大小 |
|------|-------------|----------|
| 超大标题 | `text-6xl md:text-8xl` | 60px / 96px |
| 页面标题 | `text-2xl` | 24px |
| 区块标题 | `text-lg` | 18px |
| 卡片标题 | `text-sm font-bold` | 14px |
| 正文 | `text-sm` | 14px |
| 辅助文字 | `text-xs` | 12px |
| 微小标签 | `text-[10px]` | 10px |

### 3.3 字重与样式

| 用途 | Tailwind 类 |
|------|-------------|
| 页面标题 | `font-bold tracking-tight` |
| 副标题（注释风格） | `text-gray-500 text-sm font-mono` + `// 内容` |
| 区块标题 | `text-xs font-bold uppercase tracking-wider text-gray-400` |
| 按钮文字 | `font-bold` |
| 正文 | `font-normal` 或 `font-medium` |

---

## 四、间距系统

### 4.1 标准间距

基于 4px 网格系统：

| Tailwind | 像素值 | 常用场景 |
|----------|--------|----------|
| `gap-1` | 4px | 紧凑元素间距 |
| `gap-2` | 8px | 相关元素间距 |
| `gap-3` | 12px | 组件内间距 |
| `gap-4` | 16px | 卡片内间距 |
| `gap-6` | 24px | 区块间距 |
| `gap-8` | 32px | 大区块间距 |

### 4.2 内边距规范

| 组件类型 | Tailwind 类 |
|----------|-------------|
| 页面容器 | `p-8` |
| 卡片 | `p-5` 或 `p-6` |
| 按钮（小） | `px-3 py-1.5` |
| 按钮（中） | `px-5 py-2` 或 `py-2.5` |
| 按钮（大） | `px-10 py-4` |
| 模态框 | `p-6` |
| 输入框 | `px-4 py-2` |

---

## 五、圆角系统

| 用途 | Tailwind 类 | 像素值 |
|------|-------------|--------|
| 按钮/徽章/标签 | `rounded-sm` | 2px |
| 输入框 | `rounded-lg` | 8px |
| 卡片/图标容器 | `rounded-xl` | 12px |
| 模态框 | `rounded-2xl` | 16px |
| 头像 | `rounded-full` | 圆形 |

**重要**：按钮统一使用 `rounded-sm`，模态框统一使用 `rounded-2xl`

---

## 六、阴影系统

| 用途 | Tailwind 类 |
|------|-------------|
| 卡片（默认） | 无阴影，使用 `border border-black/5` |
| 卡片（悬浮） | `hover:border-black/10` |
| 模态框 | `shadow-2xl` |
| 下拉菜单 | `shadow-lg` |

---

## 七、核心组件规范

### 7.1 页面标题区

```tsx
<div className="pb-6 border-b border-black/5">
  <h1 className="text-2xl font-bold tracking-tight text-black">页面标题</h1>
  <p className="text-gray-500 text-sm mt-1 font-mono">// 副标题说明</p>
</div>
```

### 7.2 区块标题

```tsx
<h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
  区块标题
</h3>
```

### 7.3 模态框 (Modal)

```tsx
<div className="fixed inset-0 z-[100] flex items-center justify-center">
  {/* 遮罩层 */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

  {/* 模态框主体 */}
  <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between p-6 border-b border-black/5">
      <h2 className="text-lg font-bold text-black">标题</h2>
      <button
        onClick={onClose}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
      >
        <X size={18} />
      </button>
    </div>

    {/* Content */}
    <div className="p-6">
      {/* 内容 */}
    </div>
  </div>
</div>
```

### 7.4 按钮 (Button)

**主要按钮（黑底白字）：**
```tsx
<button className="px-5 py-2.5 bg-black text-white rounded-sm text-sm font-bold hover:bg-gray-800 transition-colors">
  主要操作
</button>
```

**次要按钮（白底黑框）：**
```tsx
<button className="px-5 py-2.5 border border-gray-200 rounded-sm text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
  次要操作
</button>
```

**幽灵按钮（无边框）：**
```tsx
<button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
  链接按钮
</button>
```

### 7.5 图标容器

```tsx
{/* 标准图标容器 - 浅灰底深灰图标 */}
<div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
  <Icon className="w-5 h-5 text-gray-500" />
</div>

{/* 小图标容器 */}
<div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
  <Icon className="w-4 h-4 text-gray-500" />
</div>
```

### 7.6 卡片 (Card)

```tsx
<div className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 transition-colors">
  {/* 卡片内容 */}
</div>
```

### 7.7 表格

```tsx
<div className="bg-white border border-black/5 rounded-xl overflow-hidden">
  <table className="w-full">
    <thead className="border-b border-black/5">
      <tr>
        <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
          表头
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-black/5">
      <tr className="hover:bg-gray-50/50 transition-colors">
        <td className="px-5 py-3 text-sm">内容</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 7.8 徽章/标签

```tsx
{/* 角色徽章 */}
<span className="px-2 py-1 text-xs font-bold uppercase rounded-sm bg-gray-100 text-gray-500 border border-gray-200">
  FREE
</span>

{/* 状态徽章 */}
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-medium bg-green-50 text-green-600 border border-green-100">
  <CheckCircle className="w-3 h-3" />
  正常
</span>
```

### 7.9 输入框

```tsx
<input
  type="text"
  placeholder="占位文字..."
  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-black focus:ring-0 focus:outline-none transition-colors placeholder:text-gray-400"
/>

{/* 等宽字体输入框 */}
<textarea
  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm resize-none focus:border-black focus:ring-0 focus:outline-none transition-colors placeholder:text-gray-400 font-mono"
/>
```

---

## 八、禁止事项

1. **禁止使用彩色渐变背景**（如 `bg-gradient-to-r from-amber-50 to-orange-50`）
2. **禁止使用彩色图标容器**（应使用 `bg-gray-100 text-gray-500`）
3. **禁止使用 Crown 等装饰性彩色图标**（使用功能性图标如 Plus、Lock、Mail）
4. **禁止按钮使用 `rounded-lg` 或 `rounded-xl`**（统一用 `rounded-sm`）
5. **禁止卡片使用阴影**（使用 `border border-black/5`）
6. **禁止使用默认的 Tailwind 蓝色**（`blue-500`）作为品牌色

---

## 九、管理后台专用规范

### 9.1 页面结构
```tsx
<div className="space-y-6">
  {/* 页面标题 */}
  <div className="pb-6 border-b border-black/5">
    <h1 className="text-2xl font-bold tracking-tight text-black">页面标题</h1>
    <p className="text-gray-500 text-sm mt-1 font-mono">// 页面描述</p>
  </div>

  {/* 内容区 */}
  <div>...</div>
</div>
```

### 9.2 统计卡片
```tsx
<div className="bg-white border border-black/5 rounded-xl p-6">
  <div className="flex items-center justify-between mb-4">
    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-gray-600" />
    </div>
    <span className="text-2xl font-bold text-black">123</span>
  </div>
  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">统计名称</p>
</div>
```

### 9.3 操作按钮组
```tsx
<div className="flex items-center gap-2">
  <button className="px-3 py-1.5 bg-black text-white rounded-sm text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-1">
    <Check className="w-3 h-3" />
    通过
  </button>
  <button className="px-3 py-1.5 border border-black/10 rounded-sm text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1">
    <X className="w-3 h-3" />
    拒绝
  </button>
</div>
```

---

## 十、检查清单

在提交 UI 相关代码前，请检查：

- [ ] 页面背景色是否为 `bg-[#F5F5F7]`
- [ ] 模态框是否使用 `rounded-2xl shadow-2xl`
- [ ] 按钮是否使用 `rounded-sm`
- [ ] 图标容器是否使用 `bg-gray-100` + 灰色图标
- [ ] 卡片是否使用 `border border-black/5` 而非阴影
- [ ] 页面标题是否使用 `// 注释风格` 副标题
- [ ] 是否移除了所有彩色渐变背景
- [ ] 是否移除了装饰性彩色图标（如 Crown）
