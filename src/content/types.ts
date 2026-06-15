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

export type ContentBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'code'; code: string; lang?: string }
  | { kind: 'callout'; tone?: 'info' | 'warn'; text: string }
  | { kind: 'analogy'; designSide: string; codeSide: string }
  | { kind: 'custom'; node: ReactNode }

export interface Article {
  id: string
  title: string
  category: Category
  summary: string
  /** 交互亮点标签，显示在目录卡片上 */
  highlights?: string[]
  /** 原文，铺在总览页大纲下方 */
  body: ContentBlock[]
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
