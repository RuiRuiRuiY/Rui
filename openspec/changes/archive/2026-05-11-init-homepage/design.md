## Context

项目已通过 `create-next-app` 完成基础初始化，使用 Next.js 15 + TypeScript + Tailwind CSS。当前处于 MVP 第一阶段，目标是快速建立可运行的首页，作为后续功能开发的基准。

**已有基础：**
- Next.js 15 App Router 结构
- Tailwind CSS 配置
- TypeScript 支持

**需解决问题：**
- 深色/浅色模式切换架构
- 导航与布局组件设计
- 首页内容组织与假数据展示

## Goals / Non-Goals

**Goals:**
- 实现完整的深色模式切换（系统偏好检测 + 手动切换）
- 创建可复用的导航栏和页脚组件
- 实现 Hero 区域 + 文章卡片列表的首页布局
- 使用 Geist 字体统一视觉风格
- 确保响应式布局（桌面 + 移动端）

**Non-Goals:**
- 博客列表页完整功能（仅预留目录）
- 文章详情页（仅预留目录）
- 关于页（仅预留目录）
- MDX 渲染功能
- 真实 Markdown 文章加载
- 代码高亮
- SEO 优化细节

## Decisions

### 1. 深色模式: 使用 next-themes + CSS 变量
**选择**: `next-themes` 提供 ThemeProvider，配合 Tailwind 的 `dark:` 前缀

**理由**:
- Next.js 社区标准方案，文档完善
- 支持系统偏好自动检测（`prefers-color-scheme`）
- 支持手动切换并持久化到 localStorage
- 与 Tailwind CSS 集成简单

**替代方案**: 自建 Context + CSS 变量 — 拒绝原因：增加不必要的维护成本

### 2. 字体: 使用 next/font 加载 Geist
**选择**: 通过 `next/font/google` 导入 Geist Sans 和 Geist Mono

**理由**:
- Next.js 15 内置支持，自动优化（子集化、预加载）
- CSS 变量方式注入，无需额外网络请求
- 配合 Tailwind 的 font-sans 配置

### 3. 路由结构: 保持默认 app/ 结构
**选择**: 不使用 `(home)` 路由组，首页直接放在 `app/page.tsx`

**理由**:
- 用户明确选择保持默认结构
- 功能完全一致，减少目录层级
- 与 create-next-app 生成结构保持一致

**替代方案**: `(home)` 路由组 — 用户已明确拒绝

### 4. 假数据: 硬编码在页面组件中
**选择**: 首页文章卡片使用硬编码假数据

**理由**:
- 快速可见效果，无需等待内容准备
- 后续替换为真实数据时，只需替换数据源逻辑
- 组件接口设计保持不变

### 5. 组件组织: 扁平化结构
**选择**: `components/nav.tsx`, `components/footer.tsx`, `components/post-card.tsx`

**理由**:
- 当前组件数量少，扁平结构足够
- `components/ui/` 预留用于后续基础 UI 组件
- 符合 PROJECT.md 目录规范

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| next-themes 与 Next.js 15 的兼容性问题 | 使用最新版本，在社区验证 stable 后实施；备选方案自建 Context |
| 假数据后续替换成本 | 组件 Props 接口设计时就考虑真实数据结构，替换时仅改数据源 |
| 响应式断点选择不当 | 使用 Tailwind 默认断点（sm/md/lg/xl），符合主流实践 |
| 深色模式闪烁（FOUC） | next-themes 内置防闪烁脚本；必要时添加 suppressHydrationWarning |
