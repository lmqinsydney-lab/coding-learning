import type { Article } from '../../types'

/** 占位样板（M4 将替换为完整 AI 学习类文章） */
export const stubAi: Article = {
  id: 'stub-ai',
  title: 'Prompt 工程 30 分钟',
  category: 'ai',
  summary: '用设计师熟悉的语言理解提示词：角色、上下文、约束与示例。',
  highlights: ['实验台(mock)'],
  body: [
    { kind: 'h', text: '这是一篇占位原文' },
    { kind: 'p', text: 'M4 会替换为真实的 AI 学习类文章，并加入一个 mock 实验台交互。' },
  ],
  contentModules: [
    {
      id: 'prompt-anatomy',
      title: '一条好提示词的结构',
      order: 1,
      brief: '角色 / 上下文 / 约束 / 示例',
      motif: 'api',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'list', items: ['角色：你是谁', '上下文：背景信息', '约束：边界与格式', '示例：给样板'] },
          ],
        },
      ],
    },
    {
      id: 'common-mistakes',
      title: '常见误区',
      order: 2,
      brief: '别让模型猜',
      motif: 'auth',
      lenses: [
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [{ kind: 'callout', tone: 'warn', text: '指令越模糊，输出越发散。把要求写具体。' }],
        },
      ],
    },
  ],
}
