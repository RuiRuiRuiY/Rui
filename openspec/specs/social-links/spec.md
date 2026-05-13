# Capability: Social Links

## Purpose

在页脚展示社交媒体入口，支持二维码弹层交互，便于用户扫码关注公众号和抖音。

## Requirements

### Requirement: 页脚显示社交图标
系统 SHALL 在页脚显示 GitHub、公众号、抖音三个社交平台的图标链接。

#### Scenario: 页脚社交入口显示
- **WHEN** 用户查看页脚
- **THEN** 看到 GitHub、公众号、抖音三个图标
- **AND** 图标水平排列，间距一致

#### Scenario: 图标点击响应
- **WHEN** 用户点击 GitHub 图标
- **THEN** 在新标签页打开 GitHub 个人主页

### Requirement: 公众号二维码弹层
系统 SHALL 在用户悬停或点击公众号图标时，弹出微信公众号二维码。

#### Scenario: 悬停显示二维码
- **WHEN** 用户鼠标悬停在公众号图标上
- **THEN** 弹出公众号二维码图片
- **AND** 二维码尺寸不小于 150x150 像素

#### Scenario: 点击显示二维码
- **WHEN** 用户点击公众号图标（移动端）
- **THEN** 弹出公众号二维码图片
- **AND** 点击二维码外区域或再次点击图标可关闭

### Requirement: 抖音二维码弹层
系统 SHALL 在用户悬停或点击抖音图标时，弹出抖音二维码。

#### Scenario: 悬停显示二维码
- **WHEN** 用户鼠标悬停在抖音图标上
- **THEN** 弹出抖音二维码图片
- **AND** 二维码尺寸不小于 150x150 像素

#### Scenario: 点击显示二维码
- **WHEN** 用户点击抖音图标（移动端）
- **THEN** 弹出抖音二维码图片
- **AND** 点击二维码外区域或再次点击图标可关闭

### Requirement: 二维码图片资源
系统 SHALL 从 `/public/images/qr/` 目录加载公众号和抖音的二维码图片。

#### Scenario: 二维码图片加载
- **WHEN** 页脚组件渲染
- **THEN** 二维码图片路径为 `/images/qr/wechat.png` 和 `/images/qr/douyin.png`
