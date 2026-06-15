import type { Article } from '../../types'

/** 占位样板（M3 将替换为完整 Git 文章 + 可点击指令信息图） */
export const stubGit: Article = {
  id: 'stub-git',
  title: '看懂 Git：版本控制入门',
  category: 'code',
  summary: '从设计师视角理解版本控制：仓库、提交、分支与协作，配可点击的指令速查。',
  highlights: ['交互速查', '设计师类比'],
  body: [
    { kind: 'h', text: '这是一篇占位原文' },
    {
      kind: 'p',
      text: '总览页大纲下方会铺整篇原文，供通读参考。M3 里这里会替换为真实的 Git 文章内容。',
    },
    {
      kind: 'p',
      text: '点上方任一内容模块，会从右侧滑出抽屉，展示该模块再生成的结构化学习层。',
    },
  ],
  contentModules: [
    {
      id: 'what-is-vcs',
      title: '什么是版本控制',
      order: 1,
      brief: '为什么需要、解决什么问题',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '版本控制就是给文件的每次改动留一个可回溯的快照。' },
            {
              kind: 'analogy',
              designSide: '设计稿命名 终版/真的终版/最终版2',
              codeSide: 'Git 自动记录每次提交，随时回到任意历史版本',
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: '别把版本号塞进文件名——交给 Git 管理。' },
          ],
        },
      ],
    },
    {
      id: 'daily-ops',
      title: '日常基础操作',
      order: 2,
      brief: 'add / commit / push 的日常循环',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '工作区 → 暂存区 → 本地仓库 → 远程仓库，是 Git 的四个区域。' },
            {
              kind: 'steps',
              items: [
                '在工作区改文件',
                'git add 把改动放进暂存区',
                'git commit 存成本地版本',
                'git push 上传到远程',
              ],
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
                {
                  cmd: 'git add .',
                  desc: '把改动放进「暂存区」，标记这些改动准备提交。',
                  analogy: '像把要打包的设计文件先拖进一个待发送文件夹。',
                  pitfall: '别忘了 . 代表所有改动；只想加某个文件就写文件名。',
                },
                {
                  cmd: 'git commit -m "msg"',
                  desc: '把暂存区的改动正式存为一个版本快照，附一句说明。',
                  analogy: '相当于给当前设计稿存一个带备注的历史版本。',
                  pitfall: '说明要写清楚做了什么，未来的你会感谢现在的你。',
                },
                {
                  cmd: 'git push',
                  desc: '把本地的提交上传到云端仓库，别人才能看到。',
                  analogy: '把改好的设计稿同步到协作云盘的最新版。',
                  pitfall: 'push 前要先 commit，否则没东西可传。',
                },
                {
                  cmd: 'git pull',
                  desc: '把云端别人的最新改动拉到本地，保持同步。',
                  analogy: '打开云盘把同事的最新版同步下来再继续改。',
                  pitfall: '开工前先 pull，能少很多冲突。',
                },
                {
                  cmd: 'git status',
                  desc: '查看当前有哪些改动、哪些已暂存，随时心里有数。',
                  analogy: '像看一眼「未保存 / 已保存」的状态提示。',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'branching',
      title: '分支管理',
      order: 3,
      brief: '并行开发不打架',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            {
              kind: 'analogy',
              designSide: '复制一份设计稿做大改，不影响原稿',
              codeSide: '开一个分支做实验，随时合并或丢弃',
            },
          ],
        },
      ],
    },
  ],
}
