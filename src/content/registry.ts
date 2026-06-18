import type { Article } from './types'
import { miaochuang } from './articles/miaochuang'
import { gitBasics } from './articles/git-basics'
import { designToCode } from './articles/design-to-code'

/** 所有文章注册于此。新增一篇 = 加一个 articles/<id>/ 并在此 import 注册。 */
export const articles: Article[] = [miaochuang, gitBasics, designToCode]

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}
