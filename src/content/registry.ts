import type { Article } from './types'
import { miaochuang } from './articles/miaochuang'
import { gitBasics } from './articles/git-basics'
import { designToCode } from './articles/design-to-code'
import { iosWorkflow } from './articles/ios-workflow'
import { claudeCodeSetup } from './articles/claude-code-setup'
import { claudeFigmaObsidian } from './articles/claude-figma-obsidian'
import { walletComponent } from './articles/wallet-component'

/** 所有文章注册于此。新增一篇 = 加一个 articles/<id>/ 并在此 import 注册。 */
export const articles: Article[] = [
  miaochuang,
  gitBasics,
  designToCode,
  iosWorkflow,
  claudeCodeSetup,
  claudeFigmaObsidian,
  walletComponent,
]

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}
