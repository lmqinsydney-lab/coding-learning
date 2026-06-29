import type { Article } from '../../types'
import original from './original.md?raw'

// 导读信息总结图（速创 GPT-Image-2 生成、本地化）
import summaryWhatIsVcs from './assets/summary-what-is-vcs.webp'
import summaryDailyOps from './assets/summary-daily-ops.webp'
import summaryBranching from './assets/summary-branching.webp'

/** 基础知识 · Git 基础（面向设计师，原文为自撰） */
export const gitBasics: Article = {
  id: 'git-basics',
  createdAt: '2026-06-15T16:41:00',
  title: 'Git基础知识【一】：版本控制入门',
  category: 'basics',
  summary: '从设计师视角理解版本控制：仓库、提交、分支与协作，配可点击的指令速查。',
  highlights: ['基础知识', 'git指令'],
  bodyMarkdown: original,
  contentModules: [
    {
      id: 'what-is-vcs',
      title: '什么是版本控制',
      originAnchor: '什么是版本控制',
      order: 1,
      brief: '为什么需要、解决什么问题',
      motif: 'cube',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryWhatIsVcs, alt: '什么是版本控制信息总结图' },
            { kind: 'p', text: '版本控制就是给文件的每次改动留一个可回溯的快照，随时能回到任意历史版本。' },
            {
              kind: 'analogy',
              designSide: '设计稿命名 终版/真的终版/最终版2',
              codeSide: 'Git 自动记录每次提交，干净地回到任意版本',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [{ kind: 'callout', tone: 'warn', text: '别把版本号塞进文件名——交给 Git 管理。' }],
        },
      ],
    },
    {
      id: 'daily-ops',
      title: '日常基础操作',
      originAnchor: '日常基础操作',
      order: 2,
      brief: 'add / commit / push 的日常循环',
      motif: 'terminal',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'img', src: summaryDailyOps, alt: 'Git 四个区域与日常操作信息总结图' },
            { kind: 'p', text: '工作区 → 暂存区 → 本地仓库 → 远程仓库，是 Git 的四个区域。' },
            {
              kind: 'steps',
              items: ['在工作区改文件', 'git add 把改动放进暂存区', 'git commit 存成本地版本', 'git push 上传到远程'],
            },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            {
              kind: 'commands',
              intro: '点任一指令，看它的讲解、设计师类比和易错点：',
              items: [
                { cmd: 'git add .', desc: '把改动放进「暂存区」，标记准备提交。', analogy: '像把要打包的文件先拖进待发送文件夹。', pitfall: '. 代表所有改动；只想加某个文件就写文件名。' },
                { cmd: 'git commit -m "msg"', desc: '把暂存区的改动存为一个版本快照，附一句说明。', analogy: '给当前设计稿存一个带备注的历史版本。', pitfall: '说明要写清楚做了什么，未来的你会感谢现在的你。' },
                { cmd: 'git push', desc: '把本地的提交上传到云端仓库，别人才能看到。', analogy: '把改好的设计稿同步到协作云盘的最新版。', pitfall: 'push 前要先 commit，否则没东西可传。' },
                { cmd: 'git pull', desc: '把云端别人的最新改动拉到本地，保持同步。', analogy: '打开云盘把同事最新版同步下来再继续改。', pitfall: '开工前先 pull，能少很多冲突。' },
                { cmd: 'git status', desc: '查看当前有哪些改动、哪些已暂存。', analogy: '看一眼「未保存 / 已保存」状态提示。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'branching',
      title: '分支管理',
      originAnchor: '分支：并行开发',
      order: 3,
      brief: '并行开发不打架',
      motif: 'branch',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'img', src: summaryBranching, alt: '分支管理信息总结图' },
            {
              kind: 'analogy',
              designSide: '复制一份设计稿做大改，不影响原稿',
              codeSide: '开一个分支做实验，随时合并或丢弃',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [{ kind: 'callout', tone: 'warn', text: '改之前先确认在自己的分支上，别直接在主分支（main）上乱改。' }],
        },
      ],
    },
  ],
}
