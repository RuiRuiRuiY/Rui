# Capability: Home Page

## Purpose

网站首页展示，包含 Hero 区域和最新文章列表。

## Requirements

### Requirement: 首页显示 Hero 区域
系统 SHALL 在首页顶部显示 Hero 区域，包含主标题和副标题。

#### Scenario: 访问首页
- **WHEN** 用户访问首页
- **THEN** 页面顶部显示 Hero 区域
- **AND** 主标题为 "学好AI，用好AI"
- **AND** 副标题为 "用程序员的深度，做你的AI向导"

### Requirement: 首页显示最新文章区域
系统 SHALL 在 Hero 区域下方显示"最新文章"区域，展示3篇文章卡片。

#### Scenario: 查看最新文章
- **WHEN** 用户滚动到 Hero 区域下方
- **THEN** 看到 "最新文章" 标题
- **AND** 看到3篇文章卡片水平/垂直排列

### Requirement: 文章卡片显示完整信息
系统 SHALL 确保每篇文章卡片显示：标题、摘要、发布日期、标签。

#### Scenario: 查看文章卡片
- **WHEN** 用户查看任意文章卡片
- **THEN** 卡片显示文章标题
- **AND** 显示简短描述/摘要
- **AND** 显示发布日期
- **AND** 显示分类标签

### Requirement: 首页提供查看更多链接
系统 SHALL 在最新文章区域底部提供"查看更多"链接，指向博客列表页。

#### Scenario: 点击查看更多
- **WHEN** 用户点击"查看更多"链接
- **THEN** 浏览器导航到 /blog（当前可显示空白或占位提示）

### Requirement: 首页响应式布局
系统 SHALL 确保首页在桌面端和移动端均有良好的显示效果。

#### Scenario: 桌面端布局
- **WHEN** 用户在桌面设备访问首页
- **THEN** 文章卡片以网格或水平布局排列
- **AND** 各元素间距充足

#### Scenario: 移动端布局
- **WHEN** 用户在移动设备访问首页
- **THEN** 文章卡片垂直堆叠排列
- **AND** 文字大小适配屏幕
