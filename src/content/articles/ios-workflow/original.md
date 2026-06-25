# 独立开发 iOS 创新工作流

**Claude Code + Obsidian + Xcode 联动 iOS 开发**

> **文档背景 ：**

> 本文档基于 **iOS App 的实际开发过程总结**，记录了如何将 Claude Code、Obsidian 和 Xcode 三者联动，形成一套高效的 Vibe Coding iOS 开发工作流。

**涉及项目**：

- EnterpriseLens 企业分析 App → `[[企业分析App-PRD]]` · `[[企业分析App-技术方案]]`

备注：EnterpriseLens 企业分析 App与内部业务暂无关联，仅做iOS app应用开发工作流想法兑现

---

## 目标

本工作流旨在解决两个核心问题：

**问题一：文档与代码脱节**

大多数开发流程中，PRD 和技术文档写完后有时会束之高阁，代码实现时往往偏离文档，遇到的问题和决策也不回写到文档中。时间一长，文档和代码成了两套独立的历史记录，无法互相印证。

**问题二：iOS 开发反馈周期长**

传统 iOS 开发需要：写代码 → 编译 → 部署到模拟器 → 运行 → 才能看到效果。一次交互验证可能需要几分钟到十几分钟，容易打断思路，且不利于快速迭代。

**本工作流的目标：**

1. **文档即开发日志** — 技术文档从「写完就完」变成「持续更新」，代码的每一次调整都同步记录到文档中，形成可追溯的知识库

2. **预览即验证** — 用 Xcode Canvas 替代传统编译-运行循环，实现秒级 UI 验证，把精力留给产品思考而非等待

3. **三人协作闭环** — Obsidian（思考）→ Claude Code（执行）→ Xcode（验证）→ Obsidian（沉淀），工具各司其职，减少上下文切换

适用人群 本工作流最适合：**产品设计师独立做 iOS 开发**、**全栈开发者快速验证 UI 方案**、**习惯用笔记工具整理思路的开发者**。

## 1. 工作流总览

```PlainText
┌──────────────────────────────────────────────────────────────┐
│                     文档先行 → 代码同步 → 预览验证               │
│                                                              │
│   Obsidian              Claude Code            Xcode         │
│  ┌────────┐           ┌──────────┐         ┌────────┐        │
│  │ PRD    │──────────▶│ 编写代码  │────────▶│ Canvas  │       │
│  │ 技术文档│           │ 修复调整  │         │ 交互预览 │        │
│  │ 记录卡点│◀──────────│ 记录进展  │◀────────│ 反馈问题 │        │
│  └────────┘           └──────────┘         └────────┘        │
└──────────────────────────────────────────────────────────────┘
```

### 三个工具的分工

| 工具 <br> | 职责 <br> | 产出 <br> |
| --- | --- | --- |
| **Obsidian** <br> | 产品思考、需求文档、技术方案、进度记录 <br> | `.md` 文档（PRD / 技术方案 / Todo） <br> |
| **Claude Code** <br> | 编写代码、调试修复、驱动整个流程 <br> | Swift 文件、后端脚本 <br> |
| **Xcode** <br> | 实时交互预览、发现 UI/交互问题 <br> | 可运行的 App 预览 <br> |

---

## 2. 完整开发流程

### Phase 1：文档规划（Obsidian）

在 Obsidian 中完成产品定义和技术设计，形成可执行的技术文档。

**创建文档的顺序：**

1. **PRD（产品需求文档）** → 明确要做什么、核心功能、优先级

2. **技术方案** → 明确技术选型、架构设计、API 端点、项目结构

3. **Todo / 进度卡点** → 在文档中用 `[ ]` 任务列表管理实施步骤

```PlainText
企业分析App-PRD.md
  └── 核心功能定义、页面结构、数据源架构、MVP范围

企业分析App-技术方案.md
  └── 技术选型、项目结构、API设计、实施进度表
```

> 文档先行的优势 在动笔之前，产品方向和技术路径都已想清楚。Claude Code 编写代码时可以直接引用 Obsidian 文档中的技术决策，避免边做边想、频繁返工。

---

### Phase 2：代码实现（Claude Code）

根据技术方案，Claude Code 驱动完成代码编写。

**典型执行顺序：**

```PlainText
① 项目脚手架
   XcodeGen project.yml → 生成 Xcode 项目
   CocoaPods Podfile → 管理第三方依赖

② 后端服务
   Backend/server.py → 零依赖 Python HTTP Server
   API 端点实现 → 搜索 / 报告 / 登录 / Freemium

③ iOS 核心代码
   Models（数据模型）
   Services（网络请求、认证、本地存储）
   ViewModels（业务逻辑）
   Views（SwiftUI 页面和组件）
```

> 项目管理方式 使用 **XcodeGen**（`project.yml`）管理 Xcode 项目，而非手动编辑 `.xcodeproj`。每次修改文件结构后，执行 `xcodegen generate` 即可重新生成项目文件。

---

### Phase 3：预览验证（Xcode）

Claude Code 生成代码后，在 Xcode 中打开项目进行实时预览。

**Xcode Canvas 预览流程：**

1. Claude Code 完成代码编写

2. Claude Code 执行 `xcodegen generate`（如有项目结构调整）

3. 用户在终端执行 `open xxx.xcodeproj` 打开 Xcode

4. 打开右侧 **Canvas** 面板（`⌥⌘⏎`）

5. 观察 UI 效果、进行交互操作（点击、输入、切换 Tab 等）

6. 如发现问题，记录卡点并反馈给 Claude Code

```PlainText
Xcode 操作：
  ⌥⌘⏎  → 打开/关闭 Canvas 预览
  ⌘⌥⌘P → 强制刷新预览
```

> CarLoanBanner 案例 该项目先将 React 组件转换为 SwiftUI，再在 Xcode Canvas 中预览，通过两轮调整（圆角、文案位置）完成设计还原。调整过程记录在 `[[CarLoanBanner Xcode预览项目记录]]` 中。

---

### Phase 4：反馈循环（Claude Code ↔ Xcode）

```PlainText
Xcode 预览发现问题
       │
       ▼
在 Claude Code 对话中描述问题
       │
       ├── 描述现象（如："登录按钮点击无反应"）
       ├── 描述预期（如："点击后应弹出验证码输入框"）
       └── 提供 Xcode 报错信息（如有）

Claude Code 诊断原因
       │
       ├── 修复代码
       ├── 更新技术文档（记录问题和解决方案）
       └── 说明下一步

用户回到 Xcode 验证
```

**技术文档在循环中的作用：**

- 记录遇到的问题及解决方案（如模拟器 IPv6 连接问题）

- 记录设计调整的决策过程（如卡片圆角从 0 改为 24pt）

- 保持 Todo 状态同步，追踪实施进度

```PlainText
企业分析App-技术方案.md 中的实施进度表：
  | Step | 内容                  | 状态  |
  | 1    | Backend/server.py    | ✅ 完成 |
  | 6    | 报告卡片组件           | ✅ 完成 |
  | 10   | 国际化 Localizable    | ✅ 完成 |
  | —    | 模拟器↔后端 IPv6 连接  | 🔴 待解决 |
```

> 问题记录示例 模拟器无法连接后端 API 的问题被完整记录在 `[[企业分析App-技术方案]]` 中，包括：

- 症状描述

- 排查过程（尝试的所有方案）

- 根本原因分析

- 解决方向

---

## 3. 关键技术决策

### 3.1 XcodeGen 管理项目

**为什么用 XcodeGen：**

- 避免手动编辑 `.xcodeproj`（容易损坏或冲突）

- 文件增删改后 `xcodegen generate` 即可

- 配置文件 `project.yml` 可纳入版本控制

```Bash
# 安装
npm install -g xcodegen

# 每次修改项目结构后
xcodegen generate
```

**常见问题排查记录：**

- Preview 报错 `"Not built with -Onone"` → 统一 `SWIFT_OPTIMIZATION_LEVEL: -Onone`

- `"Multiple commands produce .app"` → 移除空 `configFiles`，添加显式 `PRODUCT_BUNDLE_IDENTIFIER`

- Scheme 未生成 → 在 `project.yml` 中显式添加 `schemes` 配置

### 3.2 零依赖后端

后端使用纯 Python 标准库（无 Flask/Django/FastAPI），复用 ashare-analysis skill 的 `aastock_server.py` 架构：

- `http.server` 处理 HTTP 请求

- `json` 处理数据序列化

- 所有数据源通过 `urllib` 调用东方财富等公开 API

### 3.3 SwiftUI Canvas 预览优势

| 对比项 <br> | SwiftUI Canvas <br> | React Native Expo <br> |
| --- | --- | --- |
| 预览位置 <br> | Xcode 内 <br> | 手机 + 浏览器 <br> |
| 刷新速度 <br> | 秒级，代码即改即看 <br> | Metro 热更新，较快 <br> |
| 交互操作 <br> | ✅ 可完全操作 <br> | ✅ 可完全操作 <br> |
| 依赖环境 <br> | 只需 Xcode <br> | 需要 npm + Metro <br> |

---

## 4. 文档驱动开发的关键习惯

### 4.1 技术文档即开发日志

每次调试和修复后，立即将结论写回技术文档，而非仅存在于对话记忆中。

```PlainText
❌ 不好：只在对话中说"已修复"但不记录
✅ 好：修复后更新技术文档的状态、原因、解决方案
```

### 4.2 文档中的卡点管理

使用任务列表 `[ ]` 在技术文档中管理待办，边开发边更新：

```Markdown
## 实施进度

- [x] 后端核心 API 实现
- [x] 登录页面 + AuthService
- [ ] 报告卡片组件（进行中）
    - [x] 概况卡片
    - [x] 财务卡片
    - [ ] 舆情卡片（卡点：情绪分析接口待接入）
- [ ] 历史记录 + 收藏页面
```

### 4.3 决策留痕

重要的技术决策（框架选型、架构设计、问题方案）记录在文档中，附上**决策原因**和**备选方案对比**。

```PlainText
## 关键决策记录

| 决策点 | 结论 | 原因 |
|--------|------|------|
| 本地存储选型 | SQLite.swift | 历史记录量大，JSON 不够用 |
| 后端框架 | 零依赖 Python | 轻量 + 复用 ashare skill 架构 |
| iOS 版本 | iOS 16+ | Swift Charts 原生支持 |
```

---

## 5. 工作流核心价值

### 5.1 相比纯代码开发的优势

| 传统方式 <br> | 本工作流 <br> |
| --- | --- |
| 产品需求在脑子里，容易遗漏 <br> | PRD 文档化，需求不丢失 <br> |
| 技术决策边做边改，缺乏全局视角 <br> | 技术方案先行，路径清晰 <br> |
| Bug 修复过程无记录，下次遇到重走弯路 <br> | 文档记录问题+方案，知识沉淀 <br> |
| UI 效果靠脑补 <br> | Xcode Canvas 实时预览，所见即所得 <br> |

### 5.2 相比纯文档写作的优势

| 纯文档写作 <br> | 本工作流 <br> |
| --- | --- |
| 文档写完不知道能不能实现 <br> | 边写代码边验证，技术可行性即时确认 <br> |
| 设计问题到开发后期才发现 <br> | Xcode 预览提前暴露 UI/交互问题 <br> |
| 文档和代码容易脱节 <br> | 技术文档和代码同步更新，始终一致 <br> |

### 5.3 适用场景

✅ **最适合：**

- 个人开发者 / 小团队

- 产品设计师转 iOS 开发

- 快速原型验证

- 轻量级工具类 App

⚠️ **需调整的场景：**

- 多人协作（需引入 Git 分支策略 + Code Review）

- 大型项目（需增加模块拆分 + CI/CD）

- 需要复杂动画（建议增加 Figma → SwiftUI 设计稿还原流程）

---

## 6. 快速开始清单

新项目启动 Checklist

- [ ] **Obsidian**：创建 PRD 文档，定义核心功能和 MVP 范围


- [ ] **Obsidian**：创建技术方案文档，确定技术选型和项目结构


- [ ] **Claude Code**：使用 XcodeGen 创建项目脚手架（`project.yml`）


- [ ] **Claude Code**：实现后端服务或接入现有后端


- [ ] **Claude Code**：实现 iOS 核心代码（Models → Services → Views）


- [ ] **Xcode**：打开项目，用 Canvas 预览并交互验证


- [ ] **Xcode → Claude Code**：根据预览反馈修复调整


- [ ] **Claude Code**：将进展和问题记录回技术文档


- [ ] **Obsidian**：更新 Todo 状态，持续迭代直到功能完成

## 7. 过程截图

| ![](asset:img01.webp) <br> |
| --- |
| ![](asset:img02.webp) <br> |
| ![](asset:img03.webp) <br> |

| ![](asset:img04.webp) <br> | ![](asset:img05.webp) <br> | ![](asset:img06.webp) <br> | ![](asset:img07.webp) <br> |
| --- | --- | --- | --- |
