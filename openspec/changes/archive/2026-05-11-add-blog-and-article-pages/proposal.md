## Why

首页已开发完成，但导航栏中的「博客」链接和文章卡片的详情链接指向的页面尚不存在。为了让用户可以浏览完整的文章列表并阅读文章内容，需要实现博客列表页和文章详情页。

## What Changes

- 新增博客列表页 (`/blog`)：展示所有文章卡片，支持标签多选筛选
- 新增文章详情页 (`/blog/[slug]`)：渲染 MDX 内容，支持代码高亮
- 创建文章内容目录结构 (`content/posts/`)，包含示例文章
- 实现内容加载工具 (`lib/posts.ts`)：解析 Markdown、提取标签、计算阅读时间
- 新增 MDX 内容渲染组件 (`components/mdx-content.tsx`)
- 安装依赖：`next-mdx-remote`、`gray-matter`、`shiki`

## Capabilities

### New Capabilities
- `blog-list`: 博客文章列表展示，包含标签筛选功能
- `article-detail`: 单篇文章详情渲染，包含 MDX 处理和代码高亮
- `content-management`: Markdown 内容管理，包含文件解析、元数据提取、标签聚合

### Modified Capabilities
- 无现有能力需要修改（首页 `post-card` 组件将复用，不涉及需求变更）

## Impact

- **新增路由**: `/blog` 和 `/blog/[slug]`
- **新增目录**: `content/posts/` 用于存放 Markdown 文章
- **新增依赖**: `next-mdx-remote`、`gray-matter`、`shiki`
- **新增组件**: `components/mdx-content.tsx`
- **新增工具**: `lib/posts.ts`
