# Capability: Content Management

## Purpose

管理博客文章内容的解析、排序、标签聚合等基础设施功能。

## Requirements

### Requirement: 系统解析 Markdown 文件元数据
系统 SHALL 正确解析 Markdown 文件的 YAML frontmatter。

#### Scenario: 解析有效 frontmatter
- **WHEN** 读取包含有效 frontmatter 的 Markdown 文件
- **THEN** 提取 `title`、`description`、`date`、`tags`、`slug`
- **AND** 提取正文内容

#### Scenario: 处理缺失字段
- **WHEN** frontmatter 缺少某些字段
- **THEN** 非必要字段使用默认值（如 description 为空字符串）
- **AND** 必要字段缺失时记录警告

### Requirement: 系统按日期排序文章
系统 SHALL 确保文章按发布日期降序排列。

#### Scenario: 默认排序
- **WHEN** 获取文章列表
- **THEN** 返回按 `date` 降序排列的数组（最新在前）

### Requirement: 系统计算阅读时间
系统 SHALL 根据正文长度计算预计阅读时间。

#### Scenario: 中文内容
- **WHEN** 文章内容为中文字符
- **THEN** 按字符数 ÷ 400 计算分钟数（向上取整）

#### Scenario: 英文内容
- **WHEN** 文章内容为英文单词
- **THEN** 按单词数 ÷ 200 计算分钟数（向上取整）

#### Scenario: 混合内容
- **WHEN** 文章包含中英文混合
- **THEN** 分别计算后相加，得到总阅读时间

### Requirement: 系统聚合所有标签
系统 SHALL 从所有文章中提取并聚合标签信息。

#### Scenario: 获取标签列表
- **WHEN** 调用获取标签函数
- **THEN** 返回所有唯一的标签名称
- **AND** 返回每个标签对应的文章数量

#### Scenario: 标签去重
- **WHEN** 多篇文章使用相同标签
- **THEN** 该标签在列表中只出现一次

### Requirement: 系统提供相邻文章查询
系统 SHALL 提供获取指定文章相邻文章的功能。

#### Scenario: 获取上一篇
- **WHEN** 传入当前文章 slug
- **THEN** 返回按时间顺序的上一篇文章（日期更晚）

#### Scenario: 获取下一篇
- **WHEN** 传入当前文章 slug
- **THEN** 返回按时间顺序的下一篇文章（日期更早）

#### Scenario: 无相邻文章
- **WHEN** 文章是最新或最旧的一篇
- **THEN** 对应方向返回 null

### Requirement: 系统生成静态路径参数
系统 SHALL 为 Next.js 提供所有有效的文章 slug 列表。

#### Scenario: 构建时生成路径
- **WHEN** 执行 `next build`
- **THEN** 所有文章 slug 被提供给 `generateStaticParams`
- **AND** 为每个 slug 生成静态页面
