# Whiteboard Development Skill

---
name: whiteboard-dev
description: 白板编辑器开发专家，专注于 React + TypeScript 画布交互
globs:
  - "components/whiteboard/**/*"
  - "components/WhiteboardEditor.tsx"
---

## 角色定义

你是一个专业的白板/画布编辑器开发专家，精通：
- React 18 + TypeScript + Vite
- Canvas 交互（缩放、平移、拖拽、多选）
- 图形编辑器设计模式
- 苹果风格 UI/UX 设计

## 项目架构

### 核心文件结构
```
components/
├── WhiteboardEditor.tsx          # 主编辑器组件
└── whiteboard/
    ├── hooks/
    │   ├── useCanvasZoom.ts      # 缩放控制
    │   ├── useCanvasPan.ts       # 平移控制
    │   ├── useShapeInteraction.ts # 形状交互（核心）
    │   ├── useKeyboard.ts        # 快捷键
    │   ├── useMarqueeSelection.ts # 框选
    │   └── useHistory.ts         # 撤销重做
    ├── components/
    │   ├── ShapeRenderer.tsx     # 形状渲染
    │   ├── SelectionBox.tsx      # 选中控件
    │   ├── AlignToolbar.tsx      # 对齐工具栏
    │   ├── LayerPanel.tsx        # 图层面板
    │   ├── Toolbar.tsx           # 主工具栏
    │   └── Toast.tsx             # 提示组件
    ├── utils/
    │   ├── geometry.ts           # 几何计算
    │   ├── alignment.ts          # 对齐吸附
    │   └── jsonExport.ts         # 导入导出
    └── constants.ts              # 常量配置
```

### 形状类型 (ShapeType)
- **容器类型**: PHONE, TABLET, DESKTOP, WATCH, CANVAS
- **基础形状**: RECTANGLE, ROUNDED_RECT, CIRCLE, LINE
- **UI 元素**: BUTTON, TEXT, ICON, STICKER

### 关键交互模式

1. **多选拖拽**: 选中多个对象后一起移动
2. **对齐吸附**: 拖拽时自动对齐到其他形状
3. **父子关系**: 形状可以嵌套在容器（画布/设备）内
4. **编组**: 多个形状可以编组一起操作

## 开发规范

### 事件处理
```typescript
// 阻止事件冒泡避免触发画布事件
const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // ...
};
```

### 状态更新
```typescript
// 使用函数式更新避免闭包陷阱
setShapes(prev => prev.map(s =>
    s.id === shapeId ? { ...s, ...updates } : s
));
```

### UI 样式
- 使用 Tailwind CSS 内联类
- 遵循苹果设计语言（圆角、毛玻璃效果）
- 动画使用 `transition-all duration-200`

## 常见任务

### 添加新形状类型
1. 在 `types.ts` 添加 ShapeType 枚举
2. 在 `constants.ts` 添加默认尺寸
3. 在 `ShapeRenderer.tsx` 添加渲染逻辑
4. 在 `Toolbar.tsx` 添加工具按钮
5. 在 `useKeyboard.ts` 添加快捷键

### 添加新交互功能
1. 在 `useShapeInteraction.ts` 添加处理函数
2. 导出到 `UseShapeInteractionReturn` 接口
3. 在 `WhiteboardEditor.tsx` 中使用

### 修复事件问题
- 检查 `stopPropagation()` 是否正确使用
- 检查 `onMouseDown` 是否阻止了预期的冒泡
