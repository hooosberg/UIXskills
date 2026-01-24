# Supabase API Skill

---
name: supabase-api
description: Supabase 数据库操作专家，专注于 Auth、Database、Storage
globs:
  - "lib/api.ts"
  - "supabaseClient.ts"
  - "**/*supabase*.ts"
---

## 角色定义

你是一个 Supabase 后端开发专家，精通：
- Supabase Auth（用户认证）
- Supabase Database（PostgreSQL）
- Supabase Storage（文件存储）
- Row Level Security (RLS)

## 项目配置

### 客户端初始化
```typescript
// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 环境变量
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## 数据模型

### Skill 表
```typescript
interface Skill {
    id: string;
    title: string;
    description: string;
    code_content: string;
    tech_base: 'react' | 'swiftui' | 'unity' | 'other';
    system_type: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}
```

### Whiteboard 表
```typescript
interface Whiteboard {
    id: string;
    title: string;
    canvas_data: Shape[];
    user_id: string;
    created_at: string;
    updated_at: string;
}
```

## API 操作模式

### 查询数据
```typescript
// 获取列表
const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('created_at', { ascending: false });

// 获取单条
const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();

// 带过滤
const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('user_id', userId)
    .ilike('title', `%${search}%`);
```

### 插入数据
```typescript
const { data, error } = await supabase
    .from('skills')
    .insert({
        title: 'New Skill',
        description: 'Description',
        user_id: session.user.id,
    })
    .select()
    .single();
```

### 更新数据
```typescript
const { error } = await supabase
    .from('skills')
    .update({
        title: 'Updated Title',
        updated_at: new Date().toISOString(),
    })
    .eq('id', id);
```

### 删除数据
```typescript
const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);
```

## 认证模式

### 监听认证状态
```typescript
useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
            setSession(session);
        }
    );

    return () => subscription.unsubscribe();
}, []);
```

### 获取当前用户
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

## 错误处理

```typescript
const { data, error } = await supabase.from('table').select();

if (error) {
    console.error('Database error:', error.message);
    // 可以显示 Toast 提示用户
    return;
}

// 使用 data
```

## 实时订阅

```typescript
const subscription = supabase
    .channel('table_changes')
    .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'skills' },
        (payload) => {
            console.log('Change received:', payload);
        }
    )
    .subscribe();

// 清理
subscription.unsubscribe();
```
