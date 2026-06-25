import type { Article } from '../../types'
import original from './original.md?raw'

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryMcp from './assets/summary-mcp.webp'
import summaryWorkflow from './assets/summary-workflow.webp'
import summaryAdvanced from './assets/summary-advanced.webp'
import summaryEditors from './assets/summary-editors.webp'

/**
 * 基础知识 · 源自 Cooper：《02-基础建设：打通 Claude Code + Figma + Obsidian》
 * 纯文字教程，无图。contentModules 把「接入 → 用法 → 进阶 → 选型」拆开。
 */
export const claudeFigmaObsidian: Article = {
  id: 'claude-figma-obsidian',
  title: '基础建设②：一句话驱动 Figma 设计，并自动沉淀设计记忆',
  category: 'basics',
  summary:
    '在 Obsidian 里接上 Claude Code + Figma MCP，用自然语言驱动 Figma 出设计，过程与结果自动写成「设计记忆文档」，打通想法→设计→记录的闭环。',
  highlights: ['一句指令出设计', 'Figma MCP', '设计记忆沉淀'],

  bodyMarkdown: original,

  contentModules: [
    {
      id: 'mcp',
      originAnchor: 'Figma MCP 接入',
      title: '接入 Figma MCP',
      shortTitle: 'Figma MCP 接入',
      order: 1,
      brief: '装插件 → OAuth 授权 → 拿到读图/建图能力',
      motif: 'cube',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryMcp, alt: '接入 Figma MCP 信息总结图' },
            { kind: 'p', text: '前提：先完成「基础建设①」里的 Claude Code 部署与 Obsidian 插件安装。' },
            {
              kind: 'commands',
              intro: '点开看每步怎么操作：',
              items: [
                { cmd: 'claude plugin install figma@claude-plugins-official', desc: '在 Claude Code 里安装 Figma MCP 插件，装完重启 Obsidian。' },
                { cmd: '/plugin', desc: '在 Claude Code 里找到 Figma MCP 做 OAuth 授权（也可直接在对话里说要授权 Figma）。', analogy: '整个过程无需打开 Figma，授权后 AI 就能读你的设计。' },
              ],
            },
            { kind: 'p', text: '授权后 Claude Code 具备四类核心能力：' },
            { kind: 'list', items: [
              '读取设计：拿节点结构、截图、变量和样式',
              '生成截图：对指定节点/页面出可视化预览',
              '创建图表：在 FigJam 里画流程图、时序图、状态图',
              '代码映射：Code Connect 把 Figma 组件和代码组件关联',
            ] },
          ],
        },
      ],
    },
    {
      id: 'workflow',
      originAnchor: '一句指令',
      title: '一句指令：自动设计 + 自动记录',
      shortTitle: '核心用法',
      order: 2,
      brief: '描述需求，AI 在 Figma 出稿并写设计记忆文档',
      motif: 'prototype',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryWorkflow, alt: '一句指令自动设计 + 记录信息总结图' },
            { kind: 'p', text: '核心用法就是给 Claude Code 一句话，例如：「调用 Figma 创建新画布，设计『登录注册流程优化』页面，并生成一个设计记忆文档存入 Obsidian」。' },
            { kind: 'steps', items: [
              '在你的 Figma 账号中创建新画布',
              '根据指令设计相应页面',
              '在 Obsidian 中生成设计记忆文档',
            ] },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '「设计记忆文档」通常包含这几块，让设计可追溯、可接力：' },
            { kind: 'list', items: [
              '基本信息：文件链接、创建时间、设计目标（文件 Key / 节点 ID）',
              '模块进度：各页面/组件的完成状态',
              '设计规范：提取出的颜色、字体、间距等 token',
              '待办事项：还需优化的细节',
              '继续方式：如何在此基础上接着设计',
            ] },
            {
              kind: 'analogy',
              designSide: '设计稿改完，手动整理交付说明 + 规范 + 待办',
              codeSide: 'AI 出稿同时自动写好设计记忆文档，下次接着改',
            },
          ],
        },
      ],
    },
    {
      id: 'advanced',
      originAnchor: '进阶用法',
      title: '进阶用法',
      shortTitle: '进阶用法',
      order: 3,
      brief: 'FigJam 图表 · 设计转代码 · Code Connect',
      motif: 'api',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryAdvanced, alt: '进阶用法信息总结图' },
            {
              kind: 'commands',
              intro: '三类进阶指令，点开看怎么说：',
              items: [
                { cmd: 'generate_diagram', desc: '直接在 FigJam 里建图，如「用 generate_diagram 创建一个用户旅程图」。', analogy: '支持 flowchart / sequenceDiagram / stateDiagram / gantt。' },
                { cmd: '读设计稿 → 出代码', desc: '「读取 Figma 设计稿，为其生成 Tailwind CSS 实现方案」，把设计转译成代码组件或设计系统规范。' },
                { cmd: 'add_code_connect_map', desc: '「将 Figma 按钮组件映射到代码中的 Button 组件」，建立设计与开发的对应关系。' },
              ],
            },
            { kind: 'callout', tone: 'info', text: '以上用法都可让 Claude Code 记录进 Obsidian，持续累积成设计记忆文档。' },
          ],
        },
      ],
    },
    {
      id: 'editors',
      originAnchor: '其他编辑器配置',
      title: '其他编辑器 & 为什么选 Obsidian',
      shortTitle: '编辑器选型',
      order: 4,
      brief: 'Cursor / VS Code 也能接，但入口推荐 Obsidian',
      motif: 'branch',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryEditors, alt: '编辑器选型信息总结图' },
            { kind: 'list', items: [
              'Cursor：Cmd+Shift+P → Open chat → 输入 /add-plugin figma → Settings → MCP → Connect 授权',
              'VS Code：先装 GitHub Copilot → Cmd+Shift+P → MCP: Open User Configuration → 粘 Figma MCP 配置 → Start 授权',
            ] },
            {
              kind: 'analogy',
              designSide: '把「需求—过程—结果」都记在同一个本子里',
              codeSide: 'Obsidian 双链笔记 + AI 对话天然结合，设计可沉淀、笔记可反向触发设计',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '入口推荐 Obsidian（适合沉淀设计记忆）；Cursor / VS Code 更适合纯代码开发场景。' },
          ],
        },
      ],
    },
  ],
}
