## Why

项目已通过 create-next-app 完成初始化，但尚未实现任何页面功能。需要快速构建一个可见效果的首页，建立项目的视觉基础架构（深色模式、导航、布局），为后续内容页面开发提供参考模板。

## What Changes

- 安装并配置 `next-themes` 和 `lucide-react` 依赖
- 创建深色模式 Provider 和主题切换功能
- 创建导航栏组件（Logo + 首页/博客/关于链接 + 主题切换按钮）
- 创建页脚组件（版权 + 社交链接占位）
- 创建文章卡片组件
- 实现首页：Hero区 + 最新文章展示（3篇假数据）+ 页脚
- 配置 Geist 字体和 Tailwind CSS 变量

## Capabilities

### New Capabilities
- `dark-mode`: 深色/浅色模式切换，系统偏好自动检测，手动切换按钮
- `navigation`: 顶部导航栏，包含 Logo、页面链接、主题切换
- `home-page`: 首页布局与内容展示，Hero区和文章卡片列表
- `post-card`: 文章卡片组件，展示标题、摘要、日期、标签

### Modified Capabilities
- （无，本次仅为新增功能）

## Impact

- **新增依赖**: `next-themes`, `lucide-react`
- **修改文件**: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- **新增目录**: `components/`, `lib/`, `content/`, `app/blog/`, `app/about/`
- **暂不影响**: 博客列表页、文章详情页、关于页（仅预留目录结构）
