import type { Article } from '../../types'
import original from './original.md?raw'

import img01 from './assets/img01.webp'
import img02 from './assets/img02.webp'
import img03 from './assets/img03.webp'
import img04 from './assets/img04.webp'
import img05 from './assets/img05.webp'
import img06 from './assets/img06.webp'
import img07 from './assets/img07.webp'

const assetMap: Record<string, string> = {
  'img01.webp': img01, 'img02.webp': img02, 'img03.webp': img03,
  'img04.webp': img04, 'img05.webp': img05, 'img06.webp': img06, 'img07.webp': img07,
}

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryGoal from './assets/summary-goal.webp'
import summaryTools from './assets/summary-tools.webp'
import summaryFlow from './assets/summary-flow.webp'
import summaryDecisions from './assets/summary-decisions.webp'
import summaryHabits from './assets/summary-habits.webp'
import summaryValue from './assets/summary-value.webp'

/**
 * 代码实践 · 源自 Cooper：《独立开发 iOS 创新工作流》
 * bodyMarkdown = 原文（含工作流图、对比表、过程截图）。
 * contentModules = 提炼总结的学习层。
 */
export const iosWorkflow: Article = {
  id: 'ios-workflow',
  createdAt: '2026-06-25T14:03:00',
  title: '【工作流探索】Claude Code + Obsidian + Xcode 联动 iOS 开发',
  category: 'practice',
  summary:
    'Obsidian（思考）→ Claude Code（执行）→ Xcode（验证）三者联动，让文档即开发日志、预览即验证，设计师也能独立做 iOS。',
  highlights: ['实操经验', 'Obsidian', 'Claude Code', 'Xcode'],

  bodyMarkdown: original,
  assetMap,

  contentModules: [
    {
      id: 'goal',
      originAnchor: '目标',
      title: '为什么需要这套工作流',
      shortTitle: '目标与痛点',
      order: 1,
      brief: '解决「文档代码脱节」与「iOS 反馈周期长」',
      motif: 'grid',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryGoal, alt: '目标与痛点信息总结图' },
            { kind: 'p', text: '传统开发有两个老问题：PRD/技术文档写完就束之高阁，代码越走越偏；iOS 改一行要「编译→部署模拟器→运行」才看得到效果，一次验证几分钟，思路全被打断。' },
            {
              kind: 'analogy',
              designSide: '改个设计稿，实时就能看到效果',
              codeSide: '改一行 iOS 代码，传统要编译运行几分钟才看到',
            },
            { kind: 'callout', tone: 'info', text: '目标：① 文档即开发日志（持续更新、可追溯）② 预览即验证（Xcode Canvas 秒级看 UI）③ 三人协作闭环（工具各司其职，少切换）。' },
          ],
        },
      ],
    },
    {
      id: 'tools',
      originAnchor: '工作流总览',
      title: '三个工具的分工',
      shortTitle: '工具分工',
      order: 2,
      brief: 'Obsidian 思考 · Claude Code 执行 · Xcode 验证',
      motif: 'branch',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryTools, alt: '三工具分工信息总结图' },
            { kind: 'p', text: '一句话记住闭环：文档先行 → 代码同步 → 预览验证 → 沉淀回文档。' },
            {
              kind: 'commands',
              intro: '点任一工具，看它在闭环里干什么：',
              items: [
                { cmd: 'Obsidian · 思考', desc: '写 PRD、技术方案、Todo/卡点，产出 .md 文档。', analogy: '相当于设计师的「需求 + 设计说明 + 进度看板」。' },
                { cmd: 'Claude Code · 执行', desc: '据技术方案写代码、调试修复，并驱动整个流程。', analogy: '相当于一个会写代码、还会随手记笔记的搭档。' },
                { cmd: 'Xcode · 验证', desc: '用 Canvas 实时预览 UI、做交互操作，发现问题反馈回去。', analogy: '相当于设计稿的「实时预览窗口」。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'flow',
      originAnchor: '完整开发流程',
      title: '四阶段开发流程',
      shortTitle: '开发流程',
      order: 3,
      brief: '文档规划 → 代码实现 → 预览验证 → 反馈循环',
      motif: 'prototype',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryFlow, alt: '四阶段开发流程信息总结图' },
            { kind: 'steps', items: [
              'Phase 1 文档规划（Obsidian）：先写 PRD，再写技术方案，最后用 [ ] 任务列表列出实施步骤',
              'Phase 2 代码实现（Claude Code）：项目脚手架（XcodeGen）→ 后端服务 → iOS 核心代码（Models→Services→ViewModels→Views）',
              'Phase 3 预览验证（Xcode）：open .xcodeproj，⌥⌘⏎ 打开 Canvas，直接点击/输入做交互验证',
              'Phase 4 反馈循环：在 Claude Code 里描述「现象+预期+报错」，它修复并把问题与方案写回技术文档',
            ] },
            {
              kind: 'analogy',
              designSide: '先定方向→出稿→走查→改稿，每轮留记录',
              codeSide: '文档先行→生成代码→Canvas 走查→修复并回写文档',
            },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            {
              kind: 'commands',
              intro: '流程里最常用的几个动作：',
              items: [
                { cmd: 'open xxx.xcodeproj', desc: '在终端打开 Xcode 工程。' },
                { cmd: '⌥⌘⏎', desc: '在 Xcode 中打开 / 关闭右侧 Canvas 实时预览面板。' },
                { cmd: 'xcodegen generate', desc: '改了文件结构后，重新生成 .xcodeproj。', pitfall: '不要手动编辑 .xcodeproj，容易损坏或冲突。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'decisions',
      originAnchor: '关键技术决策',
      title: '关键技术决策',
      shortTitle: '技术决策',
      order: 4,
      brief: 'XcodeGen 管项目 · 零依赖后端 · Canvas 预览',
      motif: 'terminal',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryDecisions, alt: '关键技术决策信息总结图' },
            {
              kind: 'commands',
              intro: '三个值得记住的选型，点开看为什么：',
              items: [
                { cmd: 'XcodeGen 管项目', desc: '用 project.yml 描述工程，改文件后 xcodegen generate 重生成；配置可纳入版本控制。', pitfall: 'Preview 报 "Not built with -Onone" → 统一 SWIFT_OPTIMIZATION_LEVEL: -Onone。' },
                { cmd: '零依赖后端', desc: '纯 Python 标准库（http.server + json + urllib），不引 Flask/Django，轻量好复用。' },
                { cmd: 'SwiftUI Canvas', desc: '预览在 Xcode 内、秒级即改即看、可完全交互，只需 Xcode；比 RN + Metro 那套更省环境。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'habits',
      originAnchor: '文档驱动开发的关键习惯',
      title: '文档驱动的三个习惯',
      shortTitle: '文档习惯',
      order: 5,
      brief: '开发日志 · 卡点管理 · 决策留痕',
      motif: 'storage',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryHabits, alt: '文档驱动三习惯信息总结图' },
            { kind: 'list', items: [
              '① 技术文档即开发日志：每次调试/修复后，立即把结论写回文档，而不是只留在对话记忆里',
              '② 卡点管理：用 [ ] 任务列表在文档里管待办，边开发边勾选，子任务也能拆',
              '③ 决策留痕：重要选型记结论 + 原因 + 备选方案对比，下次不重走弯路',
            ] },
            { kind: 'callout', tone: 'warn', text: '反例：只在对话里说「已修复」却不记录——换个会话上下文就丢了。' },
          ],
        },
      ],
    },
    {
      id: 'value',
      originAnchor: '工作流核心价值',
      title: '价值与适用场景',
      shortTitle: '价值与边界',
      order: 6,
      brief: '谁最适合、什么场景要调整',
      motif: 'finish',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryValue, alt: '价值与边界信息总结图' },
            { kind: 'p', text: '相比纯写代码，它让需求不丢、路径清晰、问题有记录、UI 所见即所得；相比纯写文档，它边写边验证技术可行性，提前暴露交互问题。' },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '最适合：个人/小团队、设计师转 iOS、快速原型、轻量工具类 App。' },
            { kind: 'callout', tone: 'warn', text: '需调整：多人协作要加 Git 分支策略 + Code Review；大型项目要加模块拆分 + CI/CD；复杂动画建议补 Figma → SwiftUI 还原流程。' },
          ],
        },
      ],
    },
  ],
}
