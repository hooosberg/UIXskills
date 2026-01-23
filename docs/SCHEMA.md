# UIXskills Whiteboard JSON Schema

> 本文档定义了 UIXskills 白板的 JSON 格式规范。任何 AI 都可以参照此规范生成可直接导入白板的设计 JSON。

## 快速开始

将以下 Prompt 复制给任意 AI（Claude、GPT、Gemini 等），即可生成符合规范的 JSON：

```
请根据 UIXskills 白板格式生成 JSON：

{
  "version": "1.0",
  "title": "项目名称",
  "shapes": [
    {
      "id": "唯一ID",
      "type": "PHONE|TABLET|DESKTOP|RECTANGLE|ROUNDED_RECT|CIRCLE|BUTTON|TEXT|ICON",
      "x": 0, "y": 0,
      "width": 375, "height": 812,
      "cornerRadius": 12,
      "fillColor": "#FFFFFF",
      "strokeColor": "#E5E5EA",
      "text": "文本内容",
      "textColor": "#000000",
      "fontSize": 16
    }
  ],
  "groups": []
}

设备尺寸：PHONE(375×812), TABLET(768×1024), DESKTOP(1280×800)
```

---

## 完整 JSON 结构

```json
{
  "version": "1.0",
  "title": "我的 UI 设计",
  "description": "可选的项目描述",
  "canvas": {
    "backgroundColor": "#F5F5F7"
  },
  "shapes": [...],
  "groups": [...],
  "metadata": {
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "exportedBy": "UIXskills Whiteboard",
    "targetPlatform": "web",
    "targetFramework": "react"
  },
  "designTokens": {
    "colors": { "primary": "#000000", "secondary": "#86868B" },
    "spacing": { "sm": 8, "md": 16, "lg": 24 },
    "borderRadius": { "sm": 4, "md": 8, "lg": 16 }
  }
}
```

---

## Shape 类型 (ShapeType)

| 类型 | 说明 | 默认尺寸 | 特殊属性 |
|------|------|----------|----------|
| `PHONE` | iPhone 设备框 | 375×812 | cornerRadius: 40 |
| `TABLET` | iPad 设备框 | 768×1024 | cornerRadius: 24 |
| `DESKTOP` | 桌面浏览器框 | 1280×800 | cornerRadius: 8 |
| `WATCH` | Apple Watch 框 | 184×224 | cornerRadius: 40 |
| `CANVAS` | 自定义画布 | 自定义 | - |
| `RECTANGLE` | 矩形 | 100×100 | - |
| `ROUNDED_RECT` | 圆角矩形 | 100×100 | cornerRadius |
| `CIRCLE` | 圆形 | 100×100 | - |
| `LINE` | 直线 | 100×2 | - |
| `BUTTON` | 按钮 | 120×44 | text, textColor |
| `TEXT` | 文本 | 200×24 | text, fontSize |
| `ICON` | 图标 | 24×24 | text (图标名) |
| `STICKER` | 注释贴纸 | 200×100 | text |

---

## Shape 属性详解

### 必需属性

```typescript
{
  id: string;       // 唯一标识符
  type: ShapeType;  // 形状类型
  x: number;        // X 坐标（画布左上角为 0,0）
  y: number;        // Y 坐标
  width: number;    // 宽度
  height: number;   // 高度
}
```

### 样式属性

```typescript
{
  cornerRadius?: number;   // 圆角半径 (默认: 0)
  fillColor?: string;      // 填充颜色 (默认: #FFFFFF)
  strokeColor?: string;    // 边框颜色 (默认: #E5E5EA)
  strokeWidth?: number;    // 边框宽度 (默认: 1)
  rotation?: number;       // 旋转角度 0-360 (默认: 0)
}
```

### 文本属性

```typescript
{
  text?: string;           // 文本内容
  textColor?: string;      // 文字颜色 (默认: #000000)
  fontSize?: number;       // 字体大小 (默认: 14)
}
```

### 语义属性（用于代码生成）

```typescript
{
  uiRole?: UIRole;              // UI 角色类型
  componentName?: string;       // 建议的组件名（PascalCase）
  description?: string;         // 功能描述
  parentId?: string;            // 父元素 ID
  childrenIds?: string[];       // 子元素 ID 数组
  props?: Record<string, any>;  // 预设组件属性
  events?: string[];            // 事件列表 ["onClick", "onHover"]
  dataBinding?: string;         // 数据绑定路径
}
```

---

## UI 角色 (UIRole)

用于标注元素的语义角色，便于后续代码生成：

| 角色 | 说明 |
|------|------|
| `SCREEN` | 屏幕/页面容器 |
| `HEADER` | 头部导航 |
| `FOOTER` | 底部导航 |
| `SIDEBAR` | 侧边栏 |
| `CARD` | 卡片 |
| `BUTTON` | 按钮 |
| `INPUT` | 输入框 |
| `LIST` | 列表 |
| `LIST_ITEM` | 列表项 |
| `IMAGE` | 图片 |
| `ICON` | 图标 |
| `TEXT` | 文本 |
| `CONTAINER` | 容器 |
| `MODAL` | 模态框 |
| `TAB_BAR` | 标签栏 |
| `CUSTOM` | 自定义 |

---

## 设计规范

### 间距系统（8px 网格）

```
8, 12, 16, 20, 24, 32, 40, 48, 56, 64
```

### 圆角系统

```
4, 8, 12, 16, 20, 24, 32, 40
```

### 颜色系统

| 用途 | 颜色值 |
|------|--------|
| 主色/文字 | `#000000` |
| 次要文字 | `#86868B` |
| 占位符 | `#C7C7CC` |
| 边框 | `#E5E5EA` |
| 背景 | `#F5F5F7` |
| 白色 | `#FFFFFF` |

### iPhone 安全区

- 顶部状态栏：44px
- 底部 Home Indicator：34px

---

## 示例：登录页面

```json
{
  "version": "1.0",
  "title": "登录页面",
  "shapes": [
    {
      "id": "phone-1",
      "type": "PHONE",
      "x": 100,
      "y": 50,
      "width": 375,
      "height": 812,
      "cornerRadius": 40,
      "fillColor": "#FFFFFF",
      "strokeColor": "#E5E5EA",
      "strokeWidth": 1,
      "uiRole": "SCREEN",
      "componentName": "LoginScreen"
    },
    {
      "id": "title-1",
      "type": "TEXT",
      "x": 120,
      "y": 150,
      "width": 335,
      "height": 40,
      "text": "欢迎回来",
      "fontSize": 28,
      "textColor": "#000000",
      "uiRole": "TEXT",
      "componentName": "Title"
    },
    {
      "id": "email-input",
      "type": "ROUNDED_RECT",
      "x": 120,
      "y": 220,
      "width": 335,
      "height": 48,
      "cornerRadius": 8,
      "fillColor": "#F5F5F7",
      "strokeColor": "#E5E5EA",
      "strokeWidth": 1,
      "text": "邮箱地址",
      "textColor": "#C7C7CC",
      "fontSize": 14,
      "uiRole": "INPUT",
      "componentName": "EmailInput"
    },
    {
      "id": "password-input",
      "type": "ROUNDED_RECT",
      "x": 120,
      "y": 284,
      "width": 335,
      "height": 48,
      "cornerRadius": 8,
      "fillColor": "#F5F5F7",
      "strokeColor": "#E5E5EA",
      "strokeWidth": 1,
      "text": "密码",
      "textColor": "#C7C7CC",
      "fontSize": 14,
      "uiRole": "INPUT",
      "componentName": "PasswordInput"
    },
    {
      "id": "login-btn",
      "type": "BUTTON",
      "x": 120,
      "y": 364,
      "width": 335,
      "height": 48,
      "cornerRadius": 12,
      "fillColor": "#000000",
      "text": "登录",
      "textColor": "#FFFFFF",
      "fontSize": 16,
      "uiRole": "BUTTON",
      "componentName": "LoginButton",
      "events": ["onClick"]
    }
  ],
  "groups": [],
  "metadata": {
    "targetPlatform": "ios",
    "targetFramework": "swiftui"
  }
}
```

---

## 在 Claude Code 中使用

创建 `.claude/skills/uixskills/SKILL.md`：

```markdown
# UIXskills UI Generator

当用户需要设计 UI 时，生成符合 UIXskills 白板格式的 JSON。

## 规范
参考：https://github.com/yourrepo/uixskills/docs/SCHEMA.md

## 输出格式
始终输出完整的 JSON，包含 version、title、shapes 字段。
```

---

## 验证规则

导入时会验证以下内容：

1. ✅ `version` 字段必须存在
2. ✅ `shapes` 必须是数组
3. ✅ 每个 shape 必须有 `id`、`type`、`x`、`y`、`width`、`height`
4. ✅ `type` 必须是有效的 ShapeType 枚举值
5. ✅ 坐标和尺寸必须是数字

---

## 更新日志

- **v1.0** (2024-01) - 初始版本
