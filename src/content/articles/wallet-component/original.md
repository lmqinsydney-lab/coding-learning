# 应用：高效率调用-滴滴钱包组件代码

项目类型：滴滴钱包组件代码块-高效调用

项目成员：杨少强

项目时间：2026年3月起至今 

文档负责：杨少强撰写

---

==本文档为滴滴钱包组件代码化项目的设计到代码工作流规范，包含背景、目标、流程及各阶段执行标准。==

# 背景

### 1.1 业务背景

滴滴钱包作为滴滴出行核心的流量阵地，在业务流量分发的效率和效果上需要不断尝试和迭代，以促进钱包流量更好地分发。

### 1.2 组件代码化背景

当前设计迭代中面临以下挑战：

- **模块还原度不足**：设计稿与实现代码之间存在视觉、交互还原偏差

- **迭代效率低**：每次迭代需要重新描述组件规范，前端工程师理解成本高

- **点击实现效率低**：动效、交互细节需要反复沟通确认

- **组件复用困难**：缺乏统一的组件规范文档，不同模块的组件风格不一致

**核心驱动力**

将设计稿高保真还原为生产级代码，实现像素级还原、包含微动效、细腻高级的迭代目标。

---

# 目标

### 2.1 核心目标

| 目标维度 <br> | 具体指标 <br> |
| --- | --- |
| **模块还原度** <br> | 设计稿与代码像素级一致，还原度 ≥ 95% <br> |
| **迭代上线效率** <br> | 单组件迭代周期从 3-5 天缩短至 1-2 天 <br> |
| **点击实现效率** <br> | 减少设计-前端沟通轮次，动效一次过审 <br> |

### 2.2 质量标准

代码质量标准

- 组件独立可复用，通过 props 配置内容

- 像素级还原设计稿，不允许自由发挥

- 包含入场动画、hover 状态、点击反馈等微动效

- 动效细腻克制，避免廉价感

- 响应式适配 `prefers-reduced-motion`

### 2.3 交付物标准

每个组件交付：

- 组件代码文件（React/Vue/HTML）

- 组件规范文档（DESIGN.md）

- 组件预览页面

- Props 接口定义

---

# 工作流

设计稿→ 提取组件规范 → 建立design.md → Claude Code  生成高保真代码（含微动效） → 还原度验收 →  前端调用转化 →  发布上线。

## 一、设计稿

[https://mastergo.com/goto/S27wXClT?page_id=153:81063&file=181764231263915](https://mastergo.com/goto/S27wXClT?page_id=153:81063&file=181764231263915) （待贴图）

## 二、提取组件规范

提取中

## 三、建立滴滴钱包组件的DESIGN.md

**1-DESIGN.md模板建立（备份使用）**

```Markdown
---
name: [页面/组件名称]
version: 1.0.0
description: [一句话描述用途]
author: [作者]
date: YYYY-MM-DD
---

# [页面名称]

## 概述
[简要说明这个页面/组件做什么，核心价值是什么]

## 设计目标
- [目标 1，可量化]
- [目标 2]

## 设计令牌（Tokens）

| Token | Value | 说明 |
|-------|-------|------|
| color.bg | #000000 | 背景色 |
| color.surface | #0F0F0F | 卡片/容器背景 |
| color.text | #FFFFFF | 主文字 |
| color.muted | #888888 | 次要文字 |
| color.accent | #0066FF | 强调色/CTA |
| font.heading | [字体], serif | 标题字体 |
| font.body | [字体], sans-serif | 正文字体 |
| spacing.unit | 4px | 基础间距单位 |
| radius.sm | 4px | 小圆角 |
| radius.md | 8px | 中圆角 |
| radius.lg | 16px | 大圆角 |
| shadow.sm | 0 2px 8px rgba(0,0,0,0.3) | 小阴影 |
| shadow.lg | 0 8px 32px rgba(0,0,0,0.5) | 大阴影 |
| motion.fast | 150ms | 快速过渡 |
| motion.normal | 300ms | 正常过渡 |
| motion.slow | 500ms | 慢速过渡 |
| motion.easing | cubic-bezier(0.16, 1, 0.3, 1) | 缓动曲线 |

## 页面结构

### 布局
[描述整体布局：固定/流动/网格]

### 区块顺序
1. [区块 1]
2. [区块 2]
3. [区块 3]

## [区块名称]

### 视觉
- 背景：
- 尺寸：
- 内边距：
- 圆角：
- 阴影：

### 排版
- 标题：[font, size, weight, color]
- 副标题：[font, size, weight, color]
- 正文：[font, size, weight, color]

### 间距
- 区块间距：
- 内部元素间距：
- 响应式变化：

## 组件清单

### 组件 A

**变体：**
- `default`：[描述]
- `hover`：[描述]
- `active`：[描述]
- `disabled`：[描述]

**尺寸：**
- `sm`：
- `md`：（默认）
- `lg`：

**示例代码：**
```html

<div class="[class-name]">[内容]</div>
```

**钱包组件DESIGN.md建立**

```Markdown
---
name: [滴滴钱包组件]
version: 1.0.0
description: [用于滴滴钱包组件的代码块建立]
author: [杨少强]
date: YYYY-MM-DD
---

# [滴滴钱包页面组件]

## 概述
[滴滴钱包组件用于，核心价值是建立规范约束，使AI输出更加符合标准]

## 设计目标
- [目标 1，可量化]
- [目标 2]

## 设计令牌（Tokens）

| Token | Value | 说明 |
|-------|-------|------|
| color.bg | #000000 | 背景色 |
| color.surface | #0F0F0F | 卡片/容器背景 |
| color.text | #FFFFFF | 主文字 |
| color.muted | #888888 | 次要文字 |
| color.accent | #0066FF | 强调色/CTA |
| font.heading | [字体], serif | 标题字体 |
| font.body | [字体], sans-serif | 正文字体 |
| spacing.unit | 4px | 基础间距单位 |
| radius.sm | 4px | 小圆角 |
| radius.md | 8px | 中圆角 |
| radius.lg | 16px | 大圆角 |
| shadow.sm | 0 2px 8px rgba(0,0,0,0.3) | 小阴影 |
| shadow.lg | 0 8px 32px rgba(0,0,0,0.5) | 大阴影 |
| motion.fast | 150ms | 快速过渡 |
| motion.normal | 300ms | 正常过渡 |
| motion.slow | 500ms | 慢速过渡 |
| motion.easing | cubic-bezier(0.16, 1, 0.3, 1) | 缓动曲线 |

## 页面结构

### 布局
[描述整体布局：固定/流动/网格]

### 区块顺序
1. [区块 1]
2. [区块 2]
3. [区块 3]

## [区块名称]

### 视觉
- 背景：
- 尺寸：
- 内边距：
- 圆角：
- 阴影：

### 排版
- 标题：[font, size, weight, color]
- 副标题：[font, size, weight, color]
- 正文：[font, size, weight, color]

### 间距
- 区块间距：
- 内部元素间距：
- 响应式变化：

## 组件清单

### 组件 A

**变体：**
- `default`：[描述]
- `hover`：[描述]
- `active`：[描述]
- `disabled`：[描述]

**尺寸：**
- `sm`：
- `md`：（默认）
- `lg`：

**示例代码：**
```html

<div class="[class-name]">[内容]</div>
```

## 二、滴滴钱包组件指令模板

### 第一步：上下文声明（必须）

```PlainText
你是一位精通前端实现的工程师，擅长将设计稿高保真还原为生产级代码。
我是 UI/UX 设计师，以下是我设计的 [组件名称] 组件。

技术栈：[React + Tailwind / Vue3 / 原生 HTML+CSS]
输出要求：
- 独立组件，可直接复用
- 像素级还原，不允许自由发挥布局
- 包含微动效（入场动画、hover、交互反馈）
- 动效要求：细腻、克制、高级感，不能廉价
```

### 第二步：设计稿描述（结构化提供）

```PlainText
【组件信息】
- 组件名：CardItem
- 用途：商品卡片，用于列表页展示
- 尺寸：宽 360px，高 480px

【视觉规格】
- 背景：#FFFFFF，圆角 16px，阴影 0 8px 32px rgba(0,0,0,0.08)
- 主色：#1A1A2E
- 字体：标题 Semibold 18px，副标题 Regular 14px #666
- 图片区域：顶部，高 240px，object-fit: cover

【交互要求】
- Hover：整卡上浮 -4px，阴影加深，过渡 300ms ease
- 图片 Hover：轻微放大 scale(1.03)，overflow hidden 裁切
- 收藏按钮：点击时心形有弹跳动效
- 入场：从下方 fadeInUp，错位延迟（列表中第n个延迟 n×80ms）

【附件】
[粘贴截图 或 Figma 链接]
```

### 第三步：动效专项指令

```PlainText
【微动效规范】
请使用 CSS transition / keyframe 或 Framer Motion 实现以下动效：

1. 入场动画
   - 效果：opacity 0→1 + translateY 20px→0
   - 时长：500ms，easing: cubic-bezier(0.22, 1, 0.36, 1)
   - 列表时支持 stagger delay

2. Hover 状态
   - 卡片：translateY(-4px) + box-shadow 加深
   - 时长：250ms ease-out

3. 点击反馈
   - scale(0.97) 持续 100ms，回弹至 1
   - 使用 active 伪类或 onPointerDown

4. 动效原则：
   - 不要 linear，全部用 ease 或自定义贝塞尔
   - 动效时长控制在 150ms~500ms 之间
   - 移动端减弱动效强度（prefers-reduced-motion 适配）
```

### 第四步：如果用 Figma（最高效的方式）

如果你用 Figma，可以这样说：

```PlainText
这是我的 Figma 组件链接：[URL]
节点 ID：[从 Figma URL 中获取]

请：
1. 读取该节点的设计数据（尺寸、颜色、字体、间距）
2. 严格按照设计值还原，不要自行调整
3. 在此基础上添加我下方描述的微动效
```

### 车抵贷组件

以下是针对这个「车抵贷」Banner 组件的完整 Claude Code 指令，可以直接复制使用：

---

```PlainText
请将以下设计稿严格还原为 React 组件（使用 Tailwind CSS）。
禁止自行调整布局、颜色、字体大小，严格像素级还原。

━━━━━━━━━━━━━━━━━━━━━━━━━━
【组件名称】CarLoanBanner
【用途】车抵贷金融产品 Banner 卡片，用于 App 首页或产品列表
【技术栈】React + Tailwind CSS（或纯 HTML + CSS 均可）
━━━━━━━━━━━━━━━━━━━━━━━━━━

【整体卡片】
- 宽度：自适应父容器，最大宽度约 860px
- 高度：约 180px（内容自然撑开）
- 背景：从左上到右下的渐变，
  左侧起点：#E8F4FF（浅蓝白色）
  右侧终点：#D6EEF0（浅青绿色）
  方向：135deg 或 to bottom right
- 圆角：18px
- 阴影：0 4px 20px rgba(0, 0, 0, 0.06)
- 内边距：左侧 24px，上下 20px
- overflow: hidden（保证图片不溢出）

【布局结构】
整体分为左右两栏：
- 左栏（文字区域）：flex-col，上下排列，占主体宽度
- 右栏（按钮区域）：垂直居中，绝对定位或 flex 布局，距右边约 32px
汽车插图：定位在卡片左下角，底部对齐，图片部分溢出底边也可以

【左侧文字区域（从上到下）】

第一行 - 副标题：
- 文字："钱拿走车照开"
- 字号：14px
- 字重：Regular 400
- 颜色：#666666（中灰色）
- margin-bottom：4px

第二行 - 主标题：
- 文字："最高享 100万车抵贷"
- 字号：24px
- 字重：Bold 700
- 颜色：#1A1A1A（近黑色）
- "100万" 部分需要与其他文字保持相同样式（不单独变色）
- margin-bottom：10px

第三行 - 标签栏（两个 tag 横向排列，间距 16px）：
Tag 1："✓ 最快当日放款"
Tag 2："✓ 最长分期5年"
- 字号：12px
- 字重：Regular 400
- 颜色：#555555
- ✓ 图标：使用圆形描边 checkmark icon（SVG 或 Unicode ✓），
  颜色：#3A9AD9（蓝色），尺寸 14px，与文字垂直居中对齐
- 两个 tag 之间间距 16px
- 整体 display: flex, align-items: center

【右侧按钮】
- 文字："去申请"
- 字号：18px
- 字重：Medium 500
- 颜色：#FFFFFF 白色
- 背景色：#F47B30（橙色，偏暖）
- 圆角：50px（完整胶囊形）
- 尺寸：宽约 100px，高约 44px
- 位置：垂直方向居中于卡片，水平靠右，距右边 32px
- 无边框，无阴影

【汽车插图区域】
- 使用 <img> 标签，src 由外部 props 传入，默认为占位图
- 位置：左下角，absolute 定位，bottom: 0，left: 120px（约）
- 图片宽度：约 240px
- 图片底部与卡片底部对齐，允许少量超出裁切
- 图片旁边有金币堆叠装饰图（小图），位置在车的右前方底部

【组件 Props 设计】
```tsx
interface CarLoanBannerProps {
  subtitle?: string        // 副标题，默认"钱拿走车照开"
  title?: string           // 主标题，默认"最高享 100万车抵贷"
  tags?: string[]          // 标签列表，默认["最快当日放款", "最长分期5年"]
  ctaText?: string         // 按钮文字，默认"去申请"
  onCtaClick?: () => void  // 按钮点击回调
  carImageUrl?: string     // 汽车图片 URL
  coinImageUrl?: string    // 金币装饰图 URL
}
```

【其他还原要求】
- 汽车和金币图片我单独传给你
- 卡片背景渐变要柔和，不能太突兀
- 整体风格：简洁、现代、金融感，不要加任何设计稿之外的装饰元素
- 不需要任何动效，纯静态还原
- 代码要求：结构清晰，className 语义化，方便后续维护

【附参考图】
![[车抵贷.png]]
```

## 已创建代码块-优化中

[CarLoanBanner.tsx](https://s3-ep-inter.didistatic.com/didoc2-upload-file-prod/files/1774611657819/N4nAf4z_H-DhDxfAF2I4b/CarLoanBanner.tsx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKDD00000000000EBLCTZNRBJHX6ZS%2F20260625%2Fgzep%2Fs3%2Faws4_request&X-Amz-Date=20260625T025424Z&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=2e27ee13a8db78d5b393ecd322d1a6387fcb92153a03a817763febd8f2b0c82b)