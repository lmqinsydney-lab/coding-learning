import type { Article } from '../../types'
import original from './original.md?raw'

import img01 from './assets/img01.webp'
import img02 from './assets/img02.webp'
import img03 from './assets/img03.webp'
import img04 from './assets/img04.webp'
import img05 from './assets/img05.webp'
import img06 from './assets/img06.webp'
import img07 from './assets/img07.webp'
import img08 from './assets/img08.webp'
import img09 from './assets/img09.webp'
import img10 from './assets/img10.webp'
import img11 from './assets/img11.webp'
import img12 from './assets/img12.webp'
import img13 from './assets/img13.webp'
import img14 from './assets/img14.webp'
import img15 from './assets/img15.webp'
import img16 from './assets/img16.webp'
import img17 from './assets/img17.webp'
import img18 from './assets/img18.webp'
import img19 from './assets/img19.webp'

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryBackground from './assets/summary-background.webp'
import summaryConcept from './assets/summary-concept.webp'
import summaryPaths from './assets/summary-paths.webp'
import summaryResults from './assets/summary-results.webp'
import summarySteps from './assets/summary-steps.webp'

const assetMap: Record<string, string> = {
  'img01.webp': img01, 'img02.webp': img02, 'img03.webp': img03, 'img04.webp': img04,
  'img05.webp': img05, 'img06.webp': img06, 'img07.webp': img07, 'img08.webp': img08,
  'img09.webp': img09, 'img10.webp': img10, 'img11.webp': img11, 'img12.webp': img12,
  'img13.webp': img13, 'img14.webp': img14, 'img15.webp': img15, 'img16.webp': img16,
  'img17.webp': img17, 'img18.webp': img18, 'img19.webp': img19,
}

/**
 * 代码实践 · 源自 Cooper：《02 -【设计代码化】》
 * bodyMarkdown = 原文（含三路径对比表、还原度截图、步骤截图）。
 * contentModules = 提炼总结的学习层。
 */
export const designToCode: Article = {
  id: 'design-to-code',
  createdAt: '2026-06-18T10:23:00',
  title: '设计代码化：AI 把设计稿变成代码',
  category: 'practice',
  summary:
    '设计稿转代码的最短最优路径：Figma / MasterGo 的 MCP + Claude Code 三条路径实测，还原度 >90%。',
  highlights: ['实操经验', 'Figma MCP', 'MasterGo MCP', 'Claude Code'],

  bodyMarkdown: original,
  assetMap,

  contentModules: [
    {
      id: 'background',
      originAnchor: '背景',
      title: '背景与目标',
      order: 1,
      brief: '从「看图写代码」到「读设计稿写代码」',
      motif: 'grid',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryBackground, alt: '背景与目标信息总结图' },
            { kind: 'p', text: '设计稿转代码长期是设计与开发之间的痛点：切图标注、写还原文档交付给开发，过程里信息损失、反复沟通、还原偏差。' },
            {
              kind: 'analogy',
              designSide: '切图 + 标注 + 写还原文档，交给开发手敲',
              codeSide: 'AI 直接读设计稿的结构化数据，自动生成代码',
            },
            { kind: 'callout', tone: 'info', text: '目标：最短最优路径——短（少格式转化、少失真）、优（1.0 版还原度 >90%、少调试）。' },
          ],
        },
      ],
    },
    {
      id: 'concept',
      originAnchor: '概念解释',
      title: '核心概念',
      order: 2,
      brief: 'MCP / Claude Code / Figma Make / DSL',
      motif: 'cube',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryConcept, alt: '核心概念信息总结图' },
            {
              kind: 'commands',
              intro: '点任一概念，看通俗解释：',
              items: [
                { cmd: 'MCP', desc: 'Model Context Protocol，Anthropic 发起的开放协议。', analogy: '像 USB-C，给 AI 一个统一接口去接外部工具和数据。' },
                { cmd: 'Claude Code', desc: 'Anthropic 的终端 AI 编码工具，能读项目上下文、自主写代码/调试/跑测试，支持 MCP 接外部服务。' },
                { cmd: 'Figma Make', desc: 'Figma 内置 AI 原型工具，自然语言→可交互高保真原型，底层 React + Tailwind，可选 Claude 或 Gemini。' },
                { cmd: 'DSL', desc: '设计工具把设计稿转成的结构化中间表示（布局/样式/组件层级），供 AI 解析。', analogy: '相当于给 AI 看的「设计稿说明书」。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'paths',
      originAnchor: '目标',
      title: '三条路径',
      order: 3,
      brief: 'Figma MCP / MasterGo MCP / Figma Make',
      motif: 'branch',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryPaths, alt: '三条路径信息总结图' },
            {
              kind: 'commands',
              intro: '三条路径，点开看机制与取舍：',
              items: [
                { cmd: '路径A · Figma MCP', desc: 'Figma MCP Server 暴露设计数据，Claude Code 读取生成代码；只耗 Claude token，组件识别强。', pitfall: '需把 MasterGo 文件转成 Figma，会失真。' },
                { cmd: '路径B · MasterGo MCP', desc: 'MasterGo Magic MCP 提供 DSL，Claude Code 解析生成；直接粘链接，最简洁、失真最少。', pitfall: '组件识别不如 Figma。' },
                { cmd: '路径C · Figma Make', desc: 'Figma 内置 prompt-to-code 直接调 Claude；组件识别强。', pitfall: '要把 MasterGo 转 Figma，失真较严重，且耗 Figma+Claude 双份 token。' },
              ],
            },
            {
              kind: 'analogy',
              designSide: 'A / B / C 像三种交付路线',
              codeSide: '推荐 B：直接把 MasterGo 链接粘给 Claude Code，最短、失真最少',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: 'MasterGo 用 getD2C，别用 getDSL——前者还原度更高。' },
            { kind: 'callout', tone: 'warn', text: 'Figma / MasterGo 的图层命名和嵌套 group 要规范，否则 AI 识别差。' },
          ],
        },
      ],
    },
    {
      id: 'results',
      originAnchor: '方案实践',
      title: '实战还原度',
      order: 4,
      brief: 'C1 / C2 两个真实页面实测',
      motif: 'api',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryResults, alt: '实战还原度信息总结图' },
            { kind: 'p', text: '用两个真实页面（C1、C2 首页）实测三条路径的还原度，对比原稿（生成效果原图见下方原文）。' },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: 'C2 难点：大量复杂 PNG/SVG 图形、文本多、排版难。' },
            { kind: 'list', items: ['C1：路径A 85% · 路径B 90% · 路径C 90%', 'C2：路径A 85% · 路径B 90% · 路径C 95%'] },
            { kind: 'callout', tone: 'info', text: '结论：路径 B/C 还原度更高（90–95%），路径 A 略低（85%）。' },
          ],
        },
      ],
    },
    {
      id: 'steps',
      originAnchor: '具体操作流程',
      title: '操作流程',
      order: 5,
      brief: '安装 → 复制链接 → 生成 → 预览',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summarySteps, alt: '操作流程信息总结图' },
            {
              kind: 'commands',
              intro: '关键命令，点开看用法：',
              items: [
                { cmd: 'claude mcp add figma …', desc: '给 Claude Code 添加 Figma MCP（http 传输 https://mcp.figma.com/mcp），之后 /mcp 选 Figma 完成 OAuth 认证。' },
                { cmd: 'mastergo-magic-mcp', desc: '让 Claude Code 在 MCP 配置加 @mastergo/magic-mcp，带上 token 和 url。', pitfall: '用自己的 token 替换 <YOUR_TOKEN>：mastergo.com → 个人设置 → 安全设置 → 生成 API Token。' },
                { cmd: 'open ~/文件名.html', desc: 'Claude Code 生成完，用 open 打开 html 预览效果。' },
              ],
            },
            { kind: 'p', text: '路径 B（最简洁）四步走：' },
            {
              kind: 'steps',
              items: [
                '配置 MasterGo MCP（带自己的 token）',
                '复制目标 Frame / Component 的 URL',
                '粘到 Claude Code：「基于这个 MasterGo 设计稿，生成响应式 HTML + CSS：[url]」',
                'open 打开生成的 html，核对还原度',
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '想最省事 → 路径 B（粘链接）；想组件识别更准 → 路径 A / C（Figma）。' },
          ],
        },
      ],
    },
  ],
}
