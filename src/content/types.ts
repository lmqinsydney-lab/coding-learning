import type { ReactNode } from 'react'

export type Category = 'code' | 'ai'

/** 解读视角：导读 / 核心概念图解 / 指令交互速查 / 避坑 */
export type LensType = 'intro' | 'concept' | 'reference' | 'pitfall'

export interface Lens {
  type: LensType
  title: string
  /** Tabler outline 图标名，如 "book" -> ti ti-book */
  icon?: string
  /** 结构化正文：段落 / 列表 / 自定义块的混合 */
  blocks?: ContentBlock[]
  /** 该视角专属交互组件（如可点击的 git 指令信息图） */
  custom?: ReactNode
}

/** 第一层：内容模块，来自文章最高层级标题 */
export interface ContentModule {
  id: string
  title: string
  order: number
  /** 一句话概述，显示在总览大纲卡片上 */
  brief?: string
  lenses: Lens[]
}

/** 可点击气泡的单条指令/API 条目 */
export interface CommandItem {
  cmd: string
  /** 一句话讲解 */
  desc: string
  /** 设计师类比（可选） */
  analogy?: string
  /** 易错点（可选） */
  pitfall?: string
}

export type ContentBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; code: string; lang?: string }
  | { kind: 'callout'; tone?: 'info' | 'warn'; text: string }
  | { kind: 'analogy'; designSide: string; codeSide: string }
  /** 可点击气泡：点指令弹讲解（指令交互速查的核心范式） */
  | { kind: 'commands'; intro?: string; items: CommandItem[] }
  /** 分步实操清单：可勾选 */
  | { kind: 'steps'; items: string[] }
  /** 图片（原文截图，本地化） */
  | { kind: 'img'; src: string; alt?: string; caption?: string }
  | { kind: 'custom'; node: ReactNode }

export interface Article {
  id: string
  title: string
  category: Category
  summary: string
  /** 交互亮点标签，显示在目录卡片上 */
  highlights?: string[]
  /** 原文（铺在总览页大纲下方）。两种写法二选一： */
  body?: ContentBlock[]
  /** 原文的 markdown 原文（原封不动），优先于 body 渲染 */
  bodyMarkdown?: string
  /** markdown 里 asset:<file> 的解析表：文件名 → 打包后的 URL */
  assetMap?: Record<string, string>
  contentModules: ContentModule[]
}

export const CATEGORY_LABEL: Record<Category, string> = {
  code: '代码类',
  ai: 'AI 学习类',
}

export const LENS_LABEL: Record<LensType, string> = {
  intro: '导读',
  concept: '核心概念图解',
  reference: '指令交互速查',
  pitfall: '避坑',
}

export const LENS_ICON: Record<LensType, string> = {
  intro: 'book',
  concept: 'bulb',
  reference: 'terminal-2',
  pitfall: 'alert-triangle',
}
