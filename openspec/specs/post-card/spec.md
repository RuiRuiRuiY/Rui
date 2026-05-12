# Capability: Post Card

## Purpose

文章卡片组件，用于展示文章列表中的单个文章摘要信息。

## Requirements

### Requirement: 文章卡片显示标题
系统 SHALL 在卡片上显示文章标题。

#### Scenario: 显示标题
- **WHEN** 渲染文章卡片并传入标题数据
- **THEN** 卡片上显示该标题

### Requirement: 文章卡片显示摘要
系统 SHALL 在卡片上显示文章摘要/描述，限制长度以防溢出。

#### Scenario: 显示摘要
- **WHEN** 渲染文章卡片并传入摘要数据
- **THEN** 卡片上显示该摘要
- **AND** 摘要超过一定长度时自动截断

### Requirement: 文章卡片显示发布日期
系统 SHALL 在卡片上显示文章的发布日期，格式为 "YYYY-MM-DD"。

#### Scenario: 显示日期
- **WHEN** 渲染文章卡片并传入日期数据
- **THEN** 卡片上显示格式化的日期

### Requirement: 文章卡片显示标签
系统 SHALL 在卡片上显示文章的分类标签，可显示多个标签。

#### Scenario: 显示单个标签
- **WHEN** 渲染文章卡片并传入单个标签
- **THEN** 卡片上显示该标签

#### Scenario: 显示多个标签
- **WHEN** 渲染文章卡片并传入多个标签
- **THEN** 卡片上显示所有标签
- **AND** 标签之间有一定间距

### Requirement: 文章卡片可点击
系统 SHALL 使文章卡片具有可点击性，点击后导航到文章详情页。

#### Scenario: 点击卡片
- **WHEN** 用户点击文章卡片
- **THEN** 浏览器导航到对应的文章详情页（如 /blog/article-slug）

### Requirement: 文章卡片适配深色模式
系统 SHALL 确保文章卡片在深色和浅色模式下均有良好的视觉效果。

#### Scenario: 浅色模式下的卡片
- **WHEN** 网站处于浅色模式
- **THEN** 卡片背景为浅色、文字为深色

#### Scenario: 深色模式下的卡片
- **WHEN** 网站处于深色模式
- **THEN** 卡片背景为深色、文字为浅色
