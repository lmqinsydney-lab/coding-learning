# Coding Learning Platform · 实现计划

- 文档日期：2026-06-15
- 对应 PRD：[2026-06-15-coding-learning-platform-prd.md](./2026-06-15-coding-learning-platform-prd.md)
- 范围：一期纯前端可跑原型（React + Vite + TS，无后端）

---

## 总览

按里程碑推进，每个里程碑结束都应「可跑、可演示」。

```
Phase 0 脚手架  →  M1 外壳  →  M2 视角与范式库  →  M3 Git 样板文章  →  M4 第二篇(AI)
```

技术选型：React + Vite + TypeScript + react-router-dom + ogl（Ripple Grid 用）。

---

## Phase 0 · 脚手架（依赖：无）

**目标**：一个能 `npm run dev` 打开的空壳工程，目录结构与类型就位。

步骤：
1. 在 `coding-learning/` 初始化 Vite React-TS 工程（保留已有 `docs/`、`.git`、`.gitignore`）。
2. 安装依赖：`react-router-dom`；`ogl`（背景特效，M1 收尾用）。
3. 建立目录结构：
   ```
   src/
     shell/      # 布局、路由、主题、抽屉、HeroBackground
     modules/    # 解读视角组件 + 交互范式 + 锚点导航
     content/    # types.ts + registry.ts + articles/<id>/
     theme/      # tokens.css 设计变量
     App.tsx  main.tsx
   ```
4. `theme/tokens.css`：暗色 Linear 色板（底 `#0d0d12`、卡片 `#14131c`、紫 `#6d5dfc`、AI 青绿 `#5fd0a8`、警示橙 `#f0a04b`）、字阶（24/18/16/14/12/11/10）、圆角、边框。
5. `content/types.ts`：`Article / ContentModule / Lens / LensType / Category`（照 PRD §5 schema）。

**验收**：`npm run dev` 打开是暗色空白页，无报错；类型可被 import。

---

## M1 · 外壳（依赖：Phase 0）

**目标**：目录页 → 文章总览页（大纲+原文）→ 右侧抽屉 全链路可点通；收尾铺 Ripple Grid。

步骤：
1. `shell/router.tsx`：路由 `/`、`/article/:id`（抽屉态读 `?m=`）。
2. `shell/AppShell.tsx`：顶栏（Logo/占位的 DOCS·分类）、内容容器、暗色主题挂载。
3. **目录页** `shell/CatalogPage.tsx`：
   - 分类筛选 `全部/代码类/AI 学习类`（前端过滤 registry）。
   - 卡片网格：标题、分类色标、内容模块数、交互亮点标签、摘要。
4. **文章总览页（基页）** `shell/ArticlePage.tsx`：
   - 顶部内容模块大纲（序号+标题），点击 → 设置 `?m=`。
   - 大纲下方渲染 `article.body` 原文。
5. **右侧抽屉** `shell/ModuleDrawer.tsx`：
   - 读 `?m=` 打开；遮罩 + 右侧滑入动画；关闭/遮罩点击/后退键关闭（清 `?m=`）。
   - 内容区为连续滚动容器（M2 填具体视角）。
   - 底部「上一个/下一个」内容模块切换。
6. 放 1 篇 **stub 文章**（`content/articles/_stub/`）驱动外壳跑通（内容占位即可）。
7. 二期入口占位：目录页放「上传/粘贴链接」按钮，点击 toast「敬请期待」。
8. **收尾**：`shell/HeroBackground.tsx` 接入 React Bits Ripple Grid（拷源码 + `ogl`），首页 hero 背景；`prefers-reduced-motion`/低端设备降级关闭动画。

**验收**：目录页筛选可用 → 点卡片进总览 → 点大纲模块右侧弹抽屉、能关、后退键生效、能切上下个；首页有 Ripple Grid 背景且可降级。

---

## M2 · 视角与范式库（依赖：M1）

**目标**：抽屉内 4 个解读视角组件 + 锚点导航(scrollspy) + 核心交互范式。

步骤：
1. `modules/AnchorNav.tsx`：抽屉顶部锚点条；scrollspy 监听滚动高亮当前视角；点击平滑滚动到对应锚点。
2. 4 个视角组件（`modules/lenses/`）：
   - `IntroLens`（导读，支持嵌入类比卡）
   - `ConceptLens`（核心概念图解）
   - `ReferenceLens`（指令交互速查，承载可点击气泡）
   - `PitfallLens`（避坑）
   - 统一按 `Lens.type` 路由渲染；支持 `lens.custom` 自定义组件覆盖。
3. 交互范式组件（`modules/widgets/`，可嵌入任一视角正文）：
   - `ClickableBubble`（点元素弹气泡讲解）
   - `AnalogyCard`（设计师类比图文卡）
   - `StepChecklist`（可勾选步骤）
   - 预留 `ExperimentBench`、`DragDemo` 接口（二期/按需实现）。
4. 用 stub 文章把 4 视角 + 范式串起来联调。

**验收**：抽屉内能连续滚动浏览 4 个视角，顶部锚点随滚动高亮、点击可跳转；气泡/类比卡/清单交互正常。

---

## M3 · Git 样板文章（代码类）（依赖：M2）

**目标**：用真实的 Git 文章跑通全链路，含可点击 git 指令交互信息图。

步骤：
1. （可选）配置 Cooper MCP token 后拉取参考文章；否则我基于通用 Git 知识 + 你补充撰写。
2. `content/articles/git-intro/index.ts`：
   - `body` 原文；`contentModules`（如 版本控制是什么 / 安装与初始化 / 日常基础操作 / 分支管理 / 远程协作）。
   - 每模块按需挂视角（导读/概念图解/指令交互速查/避坑）。
3. `content/articles/git-intro/GitCommandMap.tsx`：可点击的 git 指令信息图（点 `git push` 等弹气泡：讲解+设计师类比+易错），挂到对应模块的 reference 视角 `custom`。
4. 注册进 `content/registry.ts`，目录页归「代码类」。

**验收**：从目录页进入 Git 文章，大纲+原文正常；抽屉内可点击 git 指令看气泡讲解；体验完整顺畅。

---

## M4 · 第二篇文章（AI 学习类）（依赖：M2）

**目标**：验证「每篇表现形式可不同」+ 视角/范式复用。

步骤：
1. 选定一篇 AI 学习类内容（你提供或我拟一篇如「Prompt 工程入门」）。
2. `content/articles/<ai-article>/index.ts`：内容模块 + 视角；可加一个 AI 类专属交互（如 `ExperimentBench` 的 mock 版，无 API 时用预置示例切换）。
3. 注册进 registry，归「AI 学习类」。

**验收**：第二篇与 Git 篇表现有差异但复用同一外壳/视角体系；目录页两分类筛选正常。

---

## 风险与注意

- Ripple Grid 性能：务必降级开关，避免低端设备卡顿。
- Cooper 未配 token：M3 内容可先用通用知识撰写，不阻塞。
- schema 一旦在 M1/M2 落地，M3/M4 照填即可；如发现 schema 不够用，回头小步调整并更新 PRD §5。
