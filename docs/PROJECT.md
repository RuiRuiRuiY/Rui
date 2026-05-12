# 个人网站 - Rui

## 项目定位

### 目标用户
- **主要**：非技术背景，但希望理解和使用AI的职场人士
- **次要**：有技术基础但想快速了解AI应用场景的开发者

### 价值主张
"用程序员的深度，做你的AI向导"——将技术概念翻译为非技术人员能懂的实用指南。

### 内容方向
- **系列一：AI基础认知**（MVP阶段重点）
  - 为什么现在的AI和以前不一样？
  - 大模型到底是什么？
  - 如何与AI有效对话（Prompt基础）
- **后续规划**：AI办公提效、AI内容创作、AI工具评测、技术透视

## 设计风格

- **整体风格**：Vercel极简主义
- **品牌色**：#0072f5
- **设计原则**：
  - 内容优先，留白充足
  - 专业但不冰冷，亲和但不轻浮
  - 响应式优先（桌面+移动端）
  - 支持深色模式

## 功能架构

### MVP功能（v1.0）

#### 页面结构
```
/
├── 导航栏（Logo + 首页 + 博客 + 关于）
├── Hero区
│   ├── 主标题：学好AI，用好AI
│   └── 副标题：用程序员的深度，做你的AI向导
├── 最新文章（3篇卡片 + 查看更多链接）
└── 页脚（版权 + GitHub/抖音/公众号链接）

/blog
└── 文章卡片列表（标题 + 摘要 + 日期 + 标签）

/blog/[slug]
├── 文章标题 + 元信息（日期、标签）
├── 正文（Markdown渲染 + 代码高亮）
└── 相关导航

/about
├── 个人介绍 + 专业背景
├── 网站定位说明
├── 社交媒体链接
└── 联系方式
```

#### 功能特性
| 功能 | 优先级 | 说明 |
|-----|-------|------|
| 响应式布局 | P0 | 适配桌面与移动端 |
| 深色模式 | P0 | 系统偏好自动切换，支持手动切换 |
| Markdown渲染 | P0 | 支持标准Markdown语法 |
| 代码高亮 | P0 | 浅色：GitHub Light，深色：GitHub Dark Dimmed |
| SEO基础 | P1 | title/meta/description/Open Graph |

### 后续版本规划

#### v1.1
- 文章系列索引页
- 标签筛选功能
- 站内搜索
- 邮件订阅入口

#### v1.2
- 相关文章推荐
- 阅读进度条
- 返回顶部按钮
- RSS订阅

## 技术栈

### 核心框架
| 技术 | 选型 | 说明 |
|-----|------|------|
| **Next.js** | 15.x App Router | 使用最新App Router，为未来ISR扩展预留 |
| **渲染模式** | Static Export (SSG) | 开发阶段静态导出，暂不部署 |

### 样式与UI
| 技术 | 选型 | 说明 |
|-----|------|------|
| **CSS框架** | Tailwind CSS | Vercel风格的最佳搭档，开发效率高 |
| **字体** | Geist | Vercel官方字体，现代简洁 |
| **图标** | Lucide React | 与Vercel风格高度匹配 |
| **深色模式** | next-themes | 系统偏好自动检测，支持手动切换 |

### 内容处理
| 技术 | 选型 | 说明 |
|-----|------|------|
| **Markdown渲染** | next-mdx-remote | 支持MDX，未来可嵌入React组件 |
| **代码高亮** | Shiki | VS Code同款，支持亮色/暗色主题 |
| **代码主题** | GitHub Light / GitHub Dark Dimmed | 对非技术用户友好 |

### 项目目录结构
```
rui/
├── app/                    # Next.js App Router
│   ├── (home)/             # 首页路由组
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── blog/
│   │   ├── page.tsx        # 博客列表
│   │   └── [slug]/
│   │       └── page.tsx    # 文章详情
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx          # 根布局（含深色模式Provider）
│   └── globals.css         # Tailwind + 基础样式
├── components/             # 可复用组件
│   ├── ui/                 # 基础UI组件
│   ├── nav.tsx
│   ├── footer.tsx
│   ├── post-card.tsx
│   └── mdx-content.tsx     # MDX渲染组件
├── content/
│   └── posts/              # Markdown 文章
├── lib/
│   ├── posts.ts            # 文章数据获取工具
│   └── utils.ts            # 工具函数
├── public/
│   └── images/             # 图片资源
├── tailwind.config.ts
└── next.config.js
```

---

## 内容管理方案

### 技术选型：纯Markdown文件（方案A）

#### 目录结构
```
content/
└── posts/
    ├── 01-what-is-llm.md
    ├── 02-how-to-talk-to-ai.md
    └── 03-prompt-basics.md

public/
└── images/
    └── posts/
        ├── 01-what-is-llm/
        │   ├── diagram-1.png
        │   └── screenshot-2.png
        └── 02-how-to-talk-to-ai/
            └── example.png
```

#### 文章Frontmatter格式
```yaml
---
title: "什么是大模型？一张图讲清楚"
slug: "what-is-llm"           # 手动自定义，简洁英文
date: "2026-05-09"
description: "用非技术语言解释ChatGPT背后的技术原理，让每个人都能理解"
tags: ["基础认知", "原理解析"]
---
```

#### 图片引用方式
```markdown
![描述](/images/posts/what-is-llm/diagram-1.png)
```

### 未来可扩展性
- 当前：SSG（Static Site Generation）
- 未来：可迁移至SSG+ISR，实现无需重新构建即可发布新文章

## 内容策略

### 文章写作模板
每篇文章遵循以下结构：
1. **场景引入**：一个具体的真实问题或场景
2. **踩坑记录**：普通人会遇到的困难
3. **技术透视**：简化的技术原理解释
4. **解决方案**：具体可复现的操作步骤
5. **进阶技巧**（可选）：想深入的技术细节

### 发布策略
- 文章同步发布于：个人网站（主阵地）、知乎、公众号
- 网站作为系列内容的组织中心和流量枢纽
- MVP阶段重点产出"AI基础认知"系列3-5篇文章

## 品牌与引流

### 社交媒体矩阵
- GitHub：代码与项目展示
- 公众号：内容推送与互动
- 知乎：SEO流量与讨论
- 抖音：暂不涉及视频内容

### 网站独特价值
- 知识库：系列化内容组织，便于系统学习
- 信任背书：About页展示专业背景
- 流量枢纽：各平台内容的索引与汇聚

## 项目目标

1. **知识沉淀**：系统整理AI学习过程中的实战经验
2. **个人品牌**：建立"程序员教非程序员用AI"的专业形象
3. **流量引流**：将网站作为中心，向社交媒体导流
4. **持续积累**：项目即学习，无硬性流量指标，重质量轻数量
