## Context

首页 (`/`) 已完成开发，包含 Hero 区域、最新文章展示和响应式布局。导航栏链接 `/blog` 和文章卡片链接 `/blog/[slug]` 已存在但目标页面缺失。

当前技术状态：
- Next.js 15 + App Router + SSG（Static Export）
- Tailwind CSS + Geist 字体 + next-themes 深色模式
- `PostCard` 组件已实现，接收 `title/description/date/tags/slug` 属性

## Goals / Non-Goals

**Goals:**
- 实现博客列表页 `/blog`，展示所有文章并支持标签筛选
- 实现文章详情页 `/blog/[slug]`，渲染 MDX 内容和代码高亮
- 建立 Markdown 内容管理基础设施
- 复用现有 `PostCard` 组件，保持视觉一致性

**Non-Goals:**
- 服务端渲染（SSR）或增量静态生成（ISR）
- 搜索引擎（站内搜索）
- 评论系统
- 文章系列索引页（v1.1 规划）

## Decisions

### 1. 内容加载：构建时 SSG
**选择**: 在 `next build` 时读取 Markdown 文件，生成静态页面。

**理由**:
- 文章数量少（MVP 阶段 < 20 篇），构建速度快
- 与现有首页的 SSG 策略一致
- 零运行时依赖，部署简单

**替代方案**: ISR（按需重新生成）—— 过早优化，MVP 不需要。

### 2. Markdown 解析栈：gray-matter + next-mdx-remote
**选择**: `gray-matter` 解析 frontmatter，`next-mdx-remote` 渲染 MDX。

**理由**:
- PROJECT.md 已指定，与团队决策保持一致
- `next-mdx-remote` 支持构建时序列化，适合 SSG
- 未来可扩展自定义 MDX 组件（Callout、Warning 等）

**替代方案**: `contentlayer` —— 配置复杂，学习成本高。

### 3. 代码高亮：Shiki
**选择**: Shiki 作为代码高亮引擎。

**理由**:
- PROJECT.md 指定使用 Shiki
- 支持 VS Code 主题，浅色/深色自动切换
- 构建时高亮，零运行时开销

**主题选择**:
- 浅色模式：GitHub Light
- 深色模式：GitHub Dark Dimmed

### 4. 标签筛选：客户端 OR 逻辑
**选择**: 构建时加载全部文章，客户端筛选。

**理由**:
- 文章数量少，首屏加载无压力
- 交互响应快，无需页面跳转
- 实现简单，后续可迁移至服务端筛选

**替代方案**: 服务端生成 `/blog/tag/[tag]` 页面 —— 文章多了再考虑。

### 5. 数据结构：Post 类型设计
```typescript
interface Post {
  title: string
  description: string
  date: string        // YYYY-MM-DD
  tags: string[]
  slug: string
  content: string     // MDX 原始字符串
  readingTime: number // 分钟，中文按字数计算
}
```

### 6. 阅读时间计算：中文字符 + 英文单词
**选择**: 中文按字符数（÷ 400），英文按单词数（÷ 200），两者相加。

**理由**:
- 混合中英文内容更准确
- 400 字/分钟、200 词/分钟是常见阅读速度假设

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
文章多了构建变慢 | 当前 < 20 篇无影响；超过 100 篇时考虑 ISR |
标签多了筛选困难 | 当前 < 10 个标签用紧凑式；超过 15 个时考虑搜索或下拉 |
MDX 组件安全 | 只使用受信任的自定义组件，不暴露任意 JSX 执行 |
| 图片路径问题 | 统一使用 `/images/posts/[slug]/xxx.png` 格式，文档约束 |

## Migration Plan

无需迁移，这是新功能开发。

部署步骤：
1. 安装依赖：`pnpm add next-mdx-remote gray-matter shiki`
2. 创建示例文章文件
3. 构建验证：`next build` 应成功生成 `/blog.html` 和 `/blog/[slug].html`

## Open Questions

无。
