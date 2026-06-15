import type { Article } from './types'
import { stubGit } from './articles/stub-git'
import { stubAi } from './articles/stub-ai'

/** 所有文章注册于此。新增一篇 = 加一个 articles/<id>/ 并在此 import 注册。 */
export const articles: Article[] = [stubGit, stubAi]

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}
