# Coding Learning Platform

把代码 / AI 文章拆解、再生成为**可点击信息图 + 可滑动模块卡**的学习 Web 平台，面向设计师降低学习门槛。

> 一期：纯前端可跑原型（无后端/登录/运行时 API）。栈：React + Vite + TypeScript。UI：暗色 Linear 风（紫 `#6d5dfc` / 青绿 `#5fd0a8`）。

## 快速开始

```bash
npm install
npm run dev      # → http://localhost:5180
npm run build    # tsc -b && vite build
```

> 必须通过 dev server 访问，不能直接双击 `index.html`（Vite 工程需实时编译）。

## 核心体验

文章页（`/article/:id`）自上而下：

1. **顶栏**：← 目录 / 文章标题；coverflow 滑出视口后，右侧出现 `‹ 当前模块 ›` 切换。
2. **coverflow 卡片轮播**（快速学习）：3D 横向，中心卡正对、两侧景深透视。点中心卡 → 右侧开模块面板；点侧卡 → 归中；箭头/键盘/拖拽/翻页点均可切。
3. **双栏**：左 = 原文（markdown，随页滚动）；右 = 模块面板（sticky 常驻、内部滚动，含导读信息图 + 可点击气泡/类比/清单/避坑 + 视角锚点 scrollspy）。切模块时左原文按 `originAnchor` 联动锚定到对应章节。

## 内容模型

`src/content/types.ts`：

```
Article {
  id, title, category('code'|'ai'), summary, highlights?,
  bodyMarkdown(原文 markdown) + assetMap(asset:<file> → 本地图 URL),
  contentModules: [ ContentModule {
    id, title, shortTitle?(卡片用短标题), brief?, motif?(科技图主题),
    originAnchor?(对应原文标题文本，切模块时原文滚到此),
    lenses: [ Lens { type:'intro'|'concept'|'reference'|'pitfall', title, icon?, blocks?, custom? } ]
  } ]
}
```

`ContentBlock` 类型：`p / h / list / code / callout / analogy / commands(可点击气泡) / steps(可勾选清单) / img / custom`。

**新增一篇文章** = 加 `src/content/articles/<id>/index.ts` + 在 `src/content/registry.ts` 注册。

## 作者期管线（脚本）

密钥放 `scripts/.env`（已 gitignore，不入库、不进前端）。

```bash
# 从 Cooper 导入：拉正文 + 下全部图 + 压 WebP(限宽1200) + 落 assets + 输出 _manifest.json
node scripts/import-cooper.mjs <pageId> <slug>

# 生成导读信息总结图（速创 GPT-Image-2 文生图，0.1 元/张；中文标题+流程标签）
node --env-file=scripts/.env scripts/gen-summary-images.mjs scripts/summary-jobs-<x>.json

# 压缩某目录图片为 WebP
node scripts/optimize-images.mjs <dir>
```

> 图片一律本地化为 WebP（Cooper/外链带过期 token，必须导入时下载）。`img` 块的 `src` 是字符串，二期换 CDN 不改文章数据。

## 目录结构

```
src/
  shell/      AppShell / CatalogPage / ArticlePage / ModuleGraph(coverflow) / ModuleDrawer(面板) / HeroBackground
  modules/    Markdown / Blocks / TechGlyph / widgets(ClickableBubble, StepChecklist) / AnchorNav
  content/    types.ts / registry.ts / articles/<id>/(index.ts + original.md + assets/)
  theme/      tokens.css / global.css
docs/         PRD + 实现计划（source-articles/ 原文素材已 gitignore）
scripts/      import-cooper / gen-summary-images / optimize-images / lib-images
```

## 现状（一期 M1–M4 完成）

- 文章：**秒创**(code) / **Git 基础**(code) / **设计代码化**(ai) 三篇真实内容上线。
- 已具备：Cooper 一键导入、图片 WebP 本地化、AI 导读信息图、coverflow + 双栏学习全链路。

## 二期方向（未做）

自助上传(Word/PDF/Cooper 链接) → 解析 → AI 按 schema 自动生成 → 人工微调；接 CDN/对象存储；登录与权限；部署上线；新增业务类/设计类分类。平台命名待定。

详见 `docs/2026-06-15-coding-learning-platform-prd.md`。
