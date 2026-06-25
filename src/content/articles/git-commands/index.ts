import type { Article } from '../../types'
import original from './original.md?raw'

/** 基础知识 · Git 常用指令速查（面向设计师，原文为自撰）。承接《看懂 Git：版本控制入门》的动手版。 */
export const gitCommands: Article = {
  id: 'git-commands',
  title: 'Git 常用指令速查：从配置到后悔药',
  category: 'basics',
  summary: '日常真正会敲的 Git 命令，按场景分组：配置、提交、同步、分支、撤销，每条配设计师类比和易错点。',
  highlights: ['指令速查', '按场景分组', '后悔药'],
  bodyMarkdown: original,
  contentModules: [
    {
      id: 'setup',
      title: '配置与获取仓库',
      shortTitle: '配置 / 获取',
      originAnchor: '一次性配置',
      order: 1,
      brief: '第一次用：config / init / clone',
      motif: 'cube',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            {
              kind: 'commands',
              intro: '点任一指令，看讲解、类比和易错点：',
              items: [
                { cmd: 'git config --global user.name/email', desc: '告诉 Git 你是谁，之后每次提交都会署名。', analogy: '相当于在协作工具里先填好你的昵称。', pitfall: '--global 全局只需配一次；公司项目有时要求用工作邮箱单独配。' },
                { cmd: 'git init', desc: '在当前文件夹建一个全新的空仓库（从零开始的项目用）。', analogy: '给一个新设计项目建一个带历史记录的文件夹。' },
                { cmd: 'git clone <地址>', desc: '把云端已有仓库整个下载到本地（加入已有项目用）。', analogy: '把团队协作云盘里的整个项目同步到本机。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'commit',
      title: '日常提交循环',
      shortTitle: '日常提交',
      originAnchor: '日常提交循环',
      order: 2,
      brief: 'status / add / commit / log',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '九成时间只在重复：看状态 → 加暂存 → 提交。' },
            {
              kind: 'commands',
              intro: '点开看每条做什么：',
              items: [
                { cmd: 'git status', desc: '看现在有哪些改动、哪些已经暂存。', analogy: '瞄一眼「未保存 / 已保存」状态提示。' },
                { cmd: 'git diff', desc: '看具体改了哪几行（针对还没暂存的改动）。', analogy: '设计稿的「改动对比」视图。' },
                { cmd: 'git add .', desc: '把改动放进暂存区，标记准备提交。', analogy: '把要打包的文件先拖进待发送文件夹。', pitfall: '. 代表全部；只想加某个文件就写文件名。' },
                { cmd: 'git commit -m "说明"', desc: '把暂存区的改动存成一个版本快照，附一句说明。', analogy: '给当前稿子存一个带备注的历史版本。', pitfall: '说明写清「做了什么」，别只写「update」。' },
                { cmd: 'git log --oneline', desc: '查看提交历史，--oneline 一行一条更精简。', analogy: '翻看这份稿子的全部历史版本列表。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'remote',
      title: '与远程同步',
      shortTitle: '远程同步',
      originAnchor: '与远程同步',
      order: 3,
      brief: 'pull / push / fetch / remote',
      motif: 'api',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            {
              kind: 'commands',
              intro: '本地和云端互通有无：',
              items: [
                { cmd: 'git pull', desc: '把云端别人的最新改动拉到本地。', analogy: '打开云盘把同事最新版同步下来。', pitfall: '开工前先 pull，能省掉大量冲突。' },
                { cmd: 'git push', desc: '把本地的提交上传到云端，别人才看得到。', analogy: '把改好的稿子同步回协作云盘。', pitfall: 'push 前要先 commit，否则没东西可传。' },
                { cmd: 'git fetch', desc: '只下载云端更新、先不合并，想先看看再决定时用。', analogy: '先把同事的新版下载下来摆着，还没替换你手上的。' },
                { cmd: 'git remote -v', desc: '查看当前连接的远程仓库地址。', analogy: '看这个项目「同步到哪个云盘」。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'branch',
      title: '分支操作',
      shortTitle: '分支',
      originAnchor: '分支操作',
      order: 4,
      brief: 'branch / switch / merge',
      motif: 'branch',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '分支 = 一条独立的时间线，做实验不影响主线。' },
            {
              kind: 'commands',
              intro: '点开看用法：',
              items: [
                { cmd: 'git branch', desc: '列出所有分支，带 * 的是当前所在。', analogy: '看现在有哪几条平行的设计方案线。' },
                { cmd: 'git switch <分支名>', desc: '切换到某条分支（旧写法是 git checkout）。', analogy: '切换到另一条方案线上继续工作。' },
                { cmd: 'git switch -c <新分支名>', desc: '新建并立刻切到一条新分支。', analogy: '复制一份当前稿子，新开一条线去大改。' },
                { cmd: 'git merge <分支名>', desc: '把某条分支的改动合并进当前分支。', analogy: '把实验线满意的改动并回主线。' },
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [{ kind: 'callout', tone: 'warn', text: '改动前先 git branch 确认自己在哪条分支，别在 main 上直接动手。' }],
        },
      ],
    },
    {
      id: 'undo',
      title: '后悔药：撤销改动',
      shortTitle: '后悔药',
      originAnchor: '后悔药',
      order: 5,
      brief: 'restore / revert / stash',
      motif: 'storage',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '改错、删错、提交错——按「错到哪一步」对症下药。' },
            {
              kind: 'commands',
              intro: '点开看各自适用场景：',
              items: [
                { cmd: 'git restore <文件>', desc: '丢弃工作区里还没暂存的改动，回到上次提交的样子。', analogy: '撤销当前画布上还没保存的乱改。' },
                { cmd: 'git restore --staged <文件>', desc: '把已经 add 进暂存区的文件再撤出来（改动还在，只是不暂存了）。' },
                { cmd: 'git revert <提交号>', desc: '生成一个新提交来「抵消」某次旧提交，安全、保留历史。', analogy: '不是删历史，而是补一步「撤销操作」。' },
                { cmd: 'git stash', desc: '把手头没做完的改动临时收起来，工作区变干净；用 git stash pop 恢复。', analogy: '先把半成品稿收进抽屉，腾出桌面处理急事。' },
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [{ kind: 'callout', tone: 'warn', text: 'reset 能改写历史、比较猛，新手优先用更安全的 restore 和 revert；真要用 reset 前先问清楚。' }],
        },
      ],
    },
  ],
}
