# Supabase 保活说明

UIXskills 当前使用 GitHub Actions 定时请求公开接口 `/api/keepalive`，用于避免 Supabase Free Plan 因长时间低活跃而进入暂停状态。

## 现有方案

- 保活接口：`https://uixskills.com/api/keepalive`
- 定时任务：`/.github/workflows/supabase-keepalive.yml`
- 执行频率：每天 03:17 UTC（北京时间 11:17）
- 手动触发：GitHub Actions 页面里的 `workflow_dispatch`

## 工作原理

`/api/keepalive` 会执行一次最小化的 Supabase 查询：

- 查询表：`skills`
- 查询方式：`select('id').limit(1)`
- 返回内容：简单健康状态 JSON
- 缓存策略：`Cache-Control: no-store`，并由定时任务追加时间戳参数，尽量避免 CDN 或中间缓存绕过数据库

## 首次启用时需要做的事

1. 确保这个仓库已经推送到 GitHub。
2. 确保 GitHub Actions 已启用。
3. 确保 Cloudflare Pages 线上站点已经部署了本次新增的 `functions/api/keepalive.ts`。
4. 如果项目已经被暂停，先去 Supabase Dashboard 手动点击一次 `Restore` 恢复项目。

## 排查

- 如果 GitHub Actions 运行失败，先看 workflow 日志里的 HTTP 状态码和响应内容。
- 如果接口返回 500，优先检查 Cloudflare Pages 环境变量中的 `SUPABASE_URL` / `SUPABASE_ANON_KEY`，或 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 是否仍然存在。
- 如果站点域名未来变更，需要同步更新 workflow 里的 `KEEPALIVE_URL`。
