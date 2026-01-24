# 白板连接线交互设计规范

> 参考 Google Opal、FigJam、Miro、Lucidchart 等优秀流程图工具的最佳实践

## 核心设计原则

### 1. 清晰性优先 (Clarity First)

- **正交路由**: 连接线使用水平和垂直线段，避免斜线造成的视觉混乱
- **最短路径**: 在保持正交的前提下，选择最短路径
- **避免穿越**: 连接线应绑定对象，而非穿过对象
- **最小化弯折**: 减少不必要的转角，保持路径简洁

### 2. 智能边缘连接 (Smart Edge Connection)

```
连接点选择规则：
┌─────────┐
│    T    │  T = Top (顶部中点)
│ L     R │  R = Right (右侧中点)
│    B    │  B = Bottom (底部中点)
└─────────┘  L = Left (左侧中点)

根据源和目标的相对位置自动选择最近边缘：
- 目标在右侧 → 源用 R，目标用 L
- 目标在下方 → 源用 B，目标用 T
- 目标在左侧 → 源用 L，目标用 R
- 目标在上方 → 源用 T，目标用 B
```

### 3. 正交折线路由 (Orthogonal Routing)

```
水平连接（源右 → 目标左）:
┌───┐         ┌───┐
│ A │────┬────│ B │
└───┘    │    └───┘
         │
    中点折线

垂直连接（源下 → 目标上）:
┌───┐
│ A │
└─┬─┘
  │
  │
┌─┴─┐
│ B │
└───┘
```

### 4. 圆角转角 (Rounded Corners)

- 转角使用 8px 圆角，提升视觉美感
- 使用二次贝塞尔曲线 (Q) 实现平滑转角

## 交互设计规范

### 连接创建流程

```
1. 选中对象 → 显示连接把手 (▶ ●)
2. 拖拽圆圈 → 显示预览线 (蓝色虚线)
3. 悬停目标 → 目标边框变蓝 (确认反馈)
4. 释放鼠标：
   - 在目标上 → 创建连接
   - 在空白区 → 取消操作
```

### 视觉状态

| 状态 | 线条颜色 | 线条样式 | 端点样式 |
|------|----------|----------|----------|
| 默认 | #0071E3 (蓝) | 实线 2px | 箭头 |
| 悬停 | #0071E3 | 实线 2.5px | 箭头 + 端点圆圈 |
| 选中 | #0071E3 | 实线 2.5px | 两端圆圈 |
| 拖拽预览 | #0071E3 | 虚线 2px | 箭头 |
| 注释连接 | #F59E0B (黄) | 虚线 1.5px | 箭头 |

### 目标确认反馈

```css
/* 悬停目标时的视觉反馈 */
.target-hover {
  outline: 2px solid #0071E3;
  outline-offset: 4px;
  background-color: rgba(0, 113, 227, 0.05);
}
```

### 删除/取消连接

- **拖拽到空白区释放**: 取消当前连接操作
- **选中连接线 + Delete**: 删除已有连接
- **右键连接线**: 显示"删除连接"菜单

## 连接线类型

### 1. 流程连接 (Flow Connection)

用于表示逻辑流程、数据流向

```
样式: 蓝色实线 + 箭头
用途: 用户流程、状态转换、数据流
```

### 2. 注释连接 (Annotation Connection)

用于贴纸注释指向目标

```
样式: 黄色虚线 + 箭头
用途: 设计批注、说明、备注
```

### 3. 关联连接 (Association Connection)

用于表示非定向关系

```
样式: 灰色虚线，无箭头
用途: 相关性、分组暗示
```

## 路由算法

### 正交路由计算

```typescript
function calculateOrthogonalPath(
  source: Point,
  target: Point,
  sourceEdge: Edge,
  targetEdge: Edge
): Point[] {
  const points = [source];

  // 水平连接
  if (sourceEdge === 'right' && targetEdge === 'left') {
    const midX = (source.x + target.x) / 2;
    points.push({ x: midX, y: source.y });
    points.push({ x: midX, y: target.y });
  }
  // 垂直连接
  else if (sourceEdge === 'bottom' && targetEdge === 'top') {
    const midY = (source.y + target.y) / 2;
    points.push({ x: source.x, y: midY });
    points.push({ x: target.x, y: midY });
  }

  points.push(target);
  return points;
}
```

### 圆角路径生成

```typescript
function generateRoundedPath(points: Point[], radius: number): string {
  // 使用 Q (二次贝塞尔) 在转角处生成圆角
  // L → Q → L 模式
}
```

## 性能优化

### 1. 路径缓存

- 缓存已计算的路径，避免重复计算
- 仅在源/目标位置变化时重新计算

### 2. 批量渲染

- 使用单个 SVG 容器渲染所有连接线
- 避免为每条连接线创建独立 DOM 节点

### 3. 视口裁剪

- 仅渲染视口内可见的连接线
- 对于大型画布，跳过视口外的渲染

## 无障碍设计

- 连接线颜色对比度 ≥ 4.5:1
- 箭头大小足够清晰 (≥ 8px)
- 支持键盘导航创建连接
- 提供连接关系的文本描述

## 参考资源

- [Google Opal](https://opal.google/) - AI 工作流编辑器
- [FigJam](https://figma.com/figjam/) - 协作白板
- [Miro](https://miro.com/) - 无限画布白板
- [Lucidchart](https://lucidchart.com/) - 专业流程图工具
- [Medium - Orthogonal Connector Routing](https://medium.com/) - 正交路由算法

---

*此设计规范适用于 UIXskills 白板编辑器的所有连接线交互*
