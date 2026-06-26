import type { Article } from '../../types'
import original from './original.md?raw'

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryBackground from './assets/summary-background.webp'
import summaryFlow from './assets/summary-flow.webp'
import summaryDesignMd from './assets/summary-design-md.webp'
import summaryPromptTemplate from './assets/summary-prompt-template.webp'
import summaryCase from './assets/summary-case.webp'

/**
 * 代码实践 · 源自 Cooper：《应用：高效率调用-滴滴钱包组件代码》
 * 设计稿→生产级代码的指令工作流规范。纯文字（含一个 .tsx 附件链接）。
 */
export const walletComponent: Article = {
  id: 'wallet-component',
  title: '应用：把设计稿变成生产级组件代码（钱包实战）',
  category: 'practice',
  summary:
    '滴滴钱包组件代码化的完整工作流：用 DESIGN.md 锁住规范、用四段式指令模板喂给 Claude Code，做到像素级还原 + 微动效，迭代周期对半砍。',
  highlights: ['Design.MD撰写', 'Claude Code'],

  bodyMarkdown: original,

  contentModules: [
    {
      id: 'background',
      originAnchor: '背景',
      title: '背景与目标',
      shortTitle: '背景与目标',
      order: 1,
      brief: '为什么要做组件代码化、要做到什么程度',
      motif: 'grid',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryBackground, alt: '背景与目标信息总结图' },
            { kind: 'p', text: '设计迭代里有几个老痛点：还原度不足、迭代慢、动效/交互反复沟通、组件难复用。组件代码化就是把设计稿高保真还原成生产级代码来解决它们。' },
            {
              kind: 'analogy',
              designSide: '写一份还原文档 + 反复跟前端对齐动效',
              codeSide: '把规范喂给 AI，直接产出可复用、带微动效的组件代码',
            },
            { kind: 'callout', tone: 'info', text: '目标：还原度 ≥ 95%、单组件迭代从 3-5 天缩到 1-2 天、动效一次过审。交付物 = 组件代码 + DESIGN.md + 预览页 + Props 定义。' },
          ],
        },
      ],
    },
    {
      id: 'flow',
      originAnchor: '工作流',
      title: '工作流总览',
      shortTitle: '工作流',
      order: 2,
      brief: '从设计稿到上线的 7 个环节',
      motif: 'prototype',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryFlow, alt: '工作流总览信息总结图' },
            { kind: 'steps', items: [
              '设计稿（MasterGo / Figma）',
              '提取组件规范',
              '建立 DESIGN.md',
              'Claude Code 生成高保真代码（含微动效）',
              '还原度验收',
              '前端调用转化',
              '发布上线',
            ] },
            {
              kind: 'analogy',
              designSide: '设计 → 标注 → 交付 → 开发 → 走查',
              codeSide: '设计 → DESIGN.md 规范 → AI 生成 → 验收 → 转化上线',
            },
          ],
        },
      ],
    },
    {
      id: 'design-md',
      originAnchor: 'DESIGN.md',
      title: '用 DESIGN.md 锁住规范',
      shortTitle: 'DESIGN.md',
      order: 3,
      brief: '把 token / 结构 / 组件清单写成约束',
      motif: 'storage',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryDesignMd, alt: 'DESIGN.md 规范信息总结图' },
            { kind: 'p', text: 'DESIGN.md 是给 AI 的「规范说明书」——把设计令牌、页面结构、组件清单写清楚，AI 输出才稳定、才不自由发挥。' },
            { kind: 'list', items: [
              '设计令牌（Tokens）：color / font / spacing / radius / shadow / motion 一张表全列出',
              '页面结构：布局方式 + 区块顺序',
              '区块规格：每个区块的视觉、排版、间距',
              '组件清单：每个组件的变体（default/hover/active/disabled）、尺寸（sm/md/lg）、示例代码',
            ] },
            {
              kind: 'analogy',
              designSide: '一套设计规范文档（色板 / 字阶 / 间距 / 圆角）',
              codeSide: 'DESIGN.md 里的 Tokens 表，AI 直接照着取值',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: '像素级还原、不允许自由发挥布局——规范越具体，AI 跑偏越少。' },
          ],
        },
      ],
    },
    {
      id: 'prompt-template',
      originAnchor: '指令模板',
      title: '四段式指令模板',
      shortTitle: '指令模板',
      order: 4,
      brief: '上下文 → 设计稿描述 → 动效专项 → Figma 直连',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryPromptTemplate, alt: '四段式指令模板信息总结图' },
            {
              kind: 'commands',
              intro: '一条好指令分四段，点开看每段写什么：',
              items: [
                { cmd: '① 上下文声明', desc: '先定角色和底线：「你是精通前端的工程师，我是设计师，技术栈 React+Tailwind，要求独立可复用、像素级还原、含微动效、不能廉价」。' },
                { cmd: '② 设计稿描述', desc: '结构化给：组件名/用途/尺寸 + 视觉规格（背景、主色、字体、圆角、阴影）+ 交互要求（hover/点击/入场）。' },
                { cmd: '③ 动效专项', desc: '单列动效规范：入场（opacity+translateY，500ms 贝塞尔，列表 stagger）、hover（上浮+阴影，250ms）、点击（scale 0.97 回弹）。', pitfall: '不要用 linear；时长控制在 150–500ms；移动端适配 prefers-reduced-motion。' },
                { cmd: '④ Figma 直连（最高效）', desc: '给 Figma 链接 + 节点 ID，让它「读取节点设计数据、严格按设计值还原、再叠加我描述的动效」。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'case',
      originAnchor: '车抵贷组件',
      title: '实战：车抵贷 Banner',
      shortTitle: '实战案例',
      order: 5,
      brief: '一条可直接复制的完整还原指令',
      motif: 'api',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryCase, alt: '实战车抵贷 Banner 信息总结图' },
            { kind: 'p', text: '原文给了一条「车抵贷 Banner」的完整指令，可直接复制使用——它把上面四段式落到了一个真实组件上。' },
            { kind: 'list', items: [
              '整体：最大宽 ~860px、高 ~180px、135deg 浅蓝→浅青渐变、圆角 18px、轻阴影',
              '左栏文字：副标题 14px 灰 / 主标题 24px Bold 近黑 / 两个 ✓ 标签 12px',
              '右栏按钮：「去申请」橙色胶囊（圆角 50px，~100×44），垂直居中靠右',
              '插图：汽车 + 金币装饰，左下角绝对定位，允许少量超出裁切',
              'Props：subtitle / title / tags / ctaText / onCtaClick / carImageUrl / coinImageUrl',
            ] },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '这个 Banner 明确「纯静态还原、不要任何设计稿之外的装饰」——按需求决定要不要动效，不是越多越好。' },
          ],
        },
      ],
    },
  ],
}
