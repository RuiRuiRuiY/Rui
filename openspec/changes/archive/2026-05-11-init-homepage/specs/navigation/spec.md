## ADDED Requirements

### Requirement: 导航栏显示 Logo
系统 SHALL 在导航栏左侧显示网站 Logo "Rui"。

#### Scenario: 首页访问
- **WHEN** 用户访问首页
- **THEN** 导航栏左侧显示 "Rui" 文字 Logo
- **AND** 点击 Logo 可返回首页

### Requirement: 导航栏提供页面链接
系统 SHALL 在导航栏中央提供主要页面链接：首页、博客、关于。

#### Scenario: 导航链接显示
- **WHEN** 用户查看导航栏
- **THEN** 看到 "首页"、"博客"、"关于" 三个链接

#### Scenario: 首页链接当前状态
- **WHEN** 用户在首页
- **THEN** "首页" 链接显示为当前激活状态

### Requirement: 导航栏包含主题切换按钮
系统 SHALL 在导航栏右侧提供主题切换按钮，可切换浅色/深色模式。

#### Scenario: 浅色模式下的按钮
- **WHEN** 网站处于浅色模式
- **THEN** 主题切换按钮显示月亮图标

#### Scenario: 深色模式下的按钮
- **WHEN** 网站处于深色模式
- **THEN** 主题切换按钮显示太阳图标

### Requirement: 导航栏响应式适配
系统 SHALL 确保导航栏在桌面端和移动端均有良好的显示效果。

#### Scenario: 桌面端显示
- **WHEN** 用户在桌面设备访问
- **THEN** 所有导航链接水平排列显示
- **AND** Logo、链接、主题按钮在一行内

#### Scenario: 移动端显示
- **WHEN** 用户在移动设备访问
- **THEN** 导航栏适配屏幕宽度
- **AND** 必要时链接可收起或换行
