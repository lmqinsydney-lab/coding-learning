import type { Article } from '../../types'
import original from './original.md?raw'

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryInstall from './assets/summary-install.webp'
import summaryMinimax from './assets/summary-minimax.webp'
import summaryObsidian from './assets/summary-obsidian.webp'

/**
 * 基础知识 · 源自 Cooper：《01-基础建设：Claude Code 本地部署接 minimax + Obsidian 全流程》
 * 纯命令型教程，无图。contentModules 把三段安装拆成可点的命令速查。
 */
export const claudeCodeSetup: Article = {
  id: 'claude-code-setup',
  title: '【环境部署】Claude Code + Obsidian',
  category: 'basics',
  summary:
    '从零把 Claude Code 装到本地、接上 minimax 模型，再让 Obsidian 也能直接调用——后续所有 AI 工作流的地基。',
  highlights: ['环境配置', 'Claude Code', 'minimax', 'Obsidian'],

  bodyMarkdown: original,

  contentModules: [
    {
      id: 'install',
      originAnchor: 'Claude code 本地部署',
      title: '本地部署 Claude Code',
      shortTitle: '本地部署',
      order: 1,
      brief: '装 Node.js → npm 安装 → 验证版本号',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryInstall, alt: '本地部署 Claude Code 信息总结图' },
            {
              kind: 'commands',
              intro: '三步装好，点开看每条做什么：',
              items: [
                { cmd: '装 Node.js', desc: '先准备科学上网环境，再到 nodejs.org 装最新版 Node.js（npm 随它一起来）。' },
                { cmd: 'npm install -g @anthropic-ai/claude-code', desc: '全局安装 Claude Code 命令行工具。', pitfall: '报错原因各异——把报错原文丢给 Claude/豆包等，让它给修复命令，逐条执行直到无错。' },
                { cmd: 'claude --version', desc: '验证安装：能打印出版本号就成功了。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'minimax',
      originAnchor: '接入minimax模型',
      title: '接入 minimax 模型',
      shortTitle: '接 minimax',
      order: 2,
      brief: '改 settings.json 把模型指向 minimax',
      motif: 'api',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryMinimax, alt: '接入 minimax 模型信息总结图' },
            { kind: 'p', text: '前提：已装好 Claude Code，并在 minimaxi.com 注册、购买套餐拿到 API Key。' },
            { kind: 'steps', items: [
              '备份旧配置：cp ~/.claude/settings.json ~/.claude/settings.json.bak',
              '写入新 settings.json：把 ANTHROPIC_BASE_URL 指向 https://api.minimaxi.com/anthropic，各 MODEL 填 abab6.5s-chat，AUTH_TOKEN 填你的真实密钥',
              '删多余的 ~/.claude.json（避免冲突）：rm -f ~/.claude.json',
              '验证 JSON 合法：python3 -m json.tool ~/.claude/settings.json，无报错即格式正确',
              '重启测试：claude code',
            ] },
            {
              kind: 'code',
              lang: 'json',
              code: `{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_MINIMAX_API_KEY",
    "ANTHROPIC_MODEL": "abab6.5s-chat",
    "ANTHROPIC_SMALL_FAST_MODEL": "abab6.5s-chat"
  },
  "hasCompletedOnboarding": true
}`,
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: '记得把 YOUR_MINIMAX_API_KEY 换成自己的真实密钥，别原样写进去。' },
            { kind: 'callout', tone: 'info', text: '写完一定跑一遍 python3 -m json.tool 校验——JSON 多个逗号就启动失败，这步最省事。' },
          ],
        },
      ],
    },
    {
      id: 'obsidian',
      originAnchor: 'Obsidian',
      title: '让 Obsidian 调用 Claude Code',
      shortTitle: 'Obsidian 接入',
      order: 3,
      brief: '装 Obsidian → BRAT 装 beta 插件 → 侧边机器人',
      motif: 'cube',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'img', src: summaryObsidian, alt: 'Obsidian 接入信息总结图' },
            { kind: 'steps', items: [
              '到 obsidian.md 下载安装 Obsidian',
              '设置 → 第三方插件 → 社区插件市场，搜 “BRAT” 安装并启用',
              'BRAT →「添加 beta 插件」，Repository 填 derek-larson14/obsidian-claude-sidebar，点添加',
              '左侧出现小机器人图标，点它即可在 Obsidian 里直接调用 Claude Code',
            ] },
          ],
        },
      ],
    },
  ],
}
