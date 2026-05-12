## 1. 依赖安装

- [x] 1.1 安装 `next-mdx-remote`、`gray-matter`、`shiki`

## 2. 内容基础设施

- [x] 2.1 创建 `content/posts/` 目录
- [x] 2.2 创建示例文章文件（what-is-llm.md、how-to-talk-to-ai.md、why-ai-is-different.md）
- [x] 2.3 创建 `lib/posts.ts`，实现 `getAllPosts()` 函数
- [x] 2.4 实现 `getPostBySlug()` 函数
- [x] 2.5 实现 `getAllTags()` 函数（含文章计数）
- [x] 2.6 实现 `getAdjacentPosts()` 函数（上一篇/下一篇）
- [x] 2.7 实现阅读时间计算函数

## 3. MDX 渲染组件

- [x] 3.1 创建 `components/mdx-content.tsx`
- [x] 3.2 集成 Shiki 代码高亮，配置浅色/深色主题
- [x] 3.3 实现 MDX 序列化和渲染

## 4. 博客列表页

- [x] 4.1 创建 `app/blog/page.tsx`
- [x] 4.2 集成 `PostCard` 组件展示文章网格
- [x] 4.3 创建标签筛选器组件
- [x] 4.4 实现客户端多选筛选（OR 逻辑）
- [x] 4.5 处理空状态展示

## 5. 文章详情页

- [x] 5.1 创建 `app/blog/[slug]/page.tsx`
- [x] 5.2 实现 `generateStaticParams()` 生成静态路径
- [x] 5.3 渲染文章标题、日期、标签、阅读时间
- [x] 5.4 集成 `MdxContent` 渲染正文
- [x] 5.5 添加返回博客列表链接
- [x] 5.6 添加上一篇/下一篇导航
- [x] 5.7 处理 404 状态

## 6. 验证与收尾

- [x] 6.1 运行 `next build` 验证构建成功
- [x] 6.2 验证博客列表页显示正确
- [x] 6.3 验证标签筛选功能正常
- [x] 6.4 验证文章详情页渲染正确
- [x] 6.5 验证代码高亮在浅色/深色模式下正常
- [x] 6.6 验证响应式布局
