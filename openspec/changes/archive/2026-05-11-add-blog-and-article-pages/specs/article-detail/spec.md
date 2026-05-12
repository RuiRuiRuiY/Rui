## ADDED Requirements

### Requirement: 文章详情页渲染 MDX 内容
系统 SHALL 在 `/blog/[slug]` 路由渲染对应文章的 MDX 内容。

#### Scenario: 访问有效文章
- **WHEN** 用户访问 `/blog/what-is-llm`
- **THEN** 页面显示该文章的标题、日期、标签
- **AND** 显示渲染后的 MDX 正文内容

#### Scenario: 访问无效文章
- **WHEN** 用户访问不存在的 slug，如 `/blog/not-found`
- **THEN** 返回 404 页面

### Requirement: 文章详情页支持代码高亮
系统 SHALL 对文章中的代码块进行语法高亮，并适配深色/浅色模式。

#### Scenario: 浅色模式代码块
- **WHEN** 网站处于浅色模式且文章包含代码块
- **THEN** 代码使用 GitHub Light 主题高亮显示

#### Scenario: 深色模式代码块
- **WHEN** 网站处于深色模式且文章包含代码块
- **THEN** 代码使用 GitHub Dark Dimmed 主题高亮显示

#### Scenario: 代码块语言识别
- **WHEN** 代码块标注语言（如 ```python）
- **THEN** 按该语言进行语法高亮

### Requirement: 文章详情页显示阅读时间
系统 SHALL 在文章头部显示预计阅读时间。

#### Scenario: 显示阅读时间
- **WHEN** 用户打开任意文章
- **THEN** 标题下方显示「约 X 分钟阅读」

### Requirement: 文章详情页提供相邻文章导航
系统 SHALL 在文章底部提供上一篇/下一篇导航。

#### Scenario: 显示上一篇
- **WHEN** 文章不是时间顺序上的第一篇
- **THEN** 底部显示「上一篇：xxx」链接

#### Scenario: 显示下一篇
- **WHEN** 文章不是时间顺序上的最后一篇
- **THEN** 底部显示「下一篇：yyy」链接

#### Scenario: 第一篇没有上一篇
- **WHEN** 文章是最新发布的
- **THEN** 只显示下一篇链接，上一篇区域留空或隐藏

### Requirement: 文章详情页提供返回链接
系统 SHALL 提供返回博客列表的链接。

#### Scenario: 点击返回
- **WHEN** 用户点击「← 返回博客列表」
- **THEN** 导航到 `/blog`

### Requirement: 文章详情页响应式布局
系统 SHALL 确保文章页在不同设备上有良好的阅读体验。

#### Scenario: 桌面端阅读
- **WHEN** 用户在桌面设备阅读
- **THEN** 正文区域最大宽度受限（约 720px），居中显示

#### Scenario: 移动端阅读
- **WHEN** 用户在移动设备阅读
- **THEN** 正文宽度适配屏幕，字号适当调整
