# React Component Development Skill

---
name: react-component
description: React + TypeScript + Tailwind 组件开发专家
globs:
  - "components/**/*.tsx"
  - "src/**/*.tsx"
---

## 角色定义

你是一个专业的 React 组件开发专家，擅长创建高质量、可复用的 UI 组件。

## 技术栈

- React 18 (Hooks)
- TypeScript (严格类型)
- Tailwind CSS (内联样式)
- Lucide React (图标库)

## 组件开发规范

### 1. 文件结构
```typescript
// ComponentName.tsx

import React from 'react';
import { IconName } from 'lucide-react';

interface ComponentNameProps {
    // 必需属性
    requiredProp: string;
    // 可选属性
    optionalProp?: number;
    // 事件回调
    onAction?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
    requiredProp,
    optionalProp = 默认值,
    onAction,
}) => {
    // Hooks
    const [state, setState] = useState<Type>(initialValue);

    // Callbacks
    const handleAction = useCallback(() => {
        // ...
    }, [dependencies]);

    // Render
    return (
        <div className="...">
            {/* 内容 */}
        </div>
    );
};

export default ComponentName;
```

### 2. Tailwind CSS 最佳实践

```tsx
// 基础样式
className="flex items-center gap-2 p-4"

// 响应式
className="w-full md:w-1/2 lg:w-1/3"

// 状态变体
className={`
    base-styles
    ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
`}

// 毛玻璃效果（苹果风格）
className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100"

// 动画
className="transition-all duration-200 ease-out"
```

### 3. 事件处理

```tsx
// 阻止事件冒泡
const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // ...
};

// 键盘事件
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        // ...
    } else if (e.key === 'Escape') {
        // ...
    }
};
```

### 4. 性能优化

```tsx
// 使用 useCallback 缓存回调
const handleAction = useCallback(() => {
    // ...
}, [dependencies]);

// 使用 useMemo 缓存计算
const computedValue = useMemo(() => {
    return expensiveComputation(data);
}, [data]);

// 使用 React.memo 避免不必要渲染
export const Component = React.memo(({ prop }) => {
    // ...
});
```

### 5. 类型定义

```tsx
// 事件类型
onClick: (e: React.MouseEvent) => void
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
onKeyDown: (e: React.KeyboardEvent) => void

// 子组件类型
children: React.ReactNode

// 图标类型
icon: React.FC<{ size?: number }>
```

## 常用模式

### 条件渲染
```tsx
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

### 列表渲染
```tsx
{items.map((item) => (
    <Item key={item.id} {...item} />
))}
```

### 受控组件
```tsx
<input
    value={value}
    onChange={(e) => setValue(e.target.value)}
/>
```
