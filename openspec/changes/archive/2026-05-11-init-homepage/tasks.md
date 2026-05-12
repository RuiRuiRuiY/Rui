## 1. 依赖安装与配置

- [X] 1.1 安装 next-themes 和 lucide-react 依赖
- [X] 1.2 创建项目缺失目录（components/ui/, lib/, content/posts/, app/blog/, app/about/）

## 2. 深色模式基础设施

- [X] 2.1 创建 `components/color-scheme-provider.tsx`（使用 next-themes 的 ThemeProvider）
- [X] 2.2 更新 `app/layout.tsx`（引入 Provider，配置 Geist 字体，引入 Nav/Footer）
- [X] 2.3 更新 `app/globals.css`（添加深色模式 CSS 变量，品牌色 #0072f5）

## 3. 通用组件开发

- [X] 3.1 创建 `lib/utils.ts`（cn 工具函数，整合 tailwind-merge 和 clsx）
- [X] 3.2 创建 `components/nav.tsx`（Logo + 首页/博客/关于链接 + 主题切换按钮）
- [X] 3.3 创建 `components/footer.tsx`（版权信息 + 社交链接占位）
- [X] 3.4 创建 `components/post-card.tsx`（标题/摘要/日期/标签展示）

## 4. 首页实现

- [X] 4.1 更新 `app/page.tsx`（实现 Hero 区：主标题 + 副标题）
- [X] 4.2 在 `app/page.tsx` 添加最新文章区域（3篇假数据卡片 + 查看更多链接）

## 5. 验证与收尾

- [X] 5.1 运行 `npm run dev` 验证项目正常启动
- [X] 5.2 验证首页显示 Hero 区域和 3 篇文章卡片
- [X] 5.3 验证深色模式切换按钮工作正常
- [X] 5.4 验证响应式布局（桌面端和移动端）
- [X] 5.5 清理默认生成的示例文件（如有）
