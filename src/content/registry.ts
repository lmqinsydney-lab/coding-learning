import type { Article } from './types'
import { miaochuang } from './articles/miaochuang'
import { gitBasics } from './articles/git-basics'
import { gitCommands } from './articles/git-commands'
import { designToCode } from './articles/design-to-code'
import { iosWorkflow } from './articles/ios-workflow'
import { claudeCodeSetup } from './articles/claude-code-setup'
import { claudeFigmaObsidian } from './articles/claude-figma-obsidian'
import { walletComponent } from './articles/wallet-component'
import { ssoIntegration } from './articles/sso-integration'

/** 所有文章注册于此。新增一篇 = 加一个 articles/<id>/ 并在此 import 注册。 */
export const articles: Article[] = [
  miaochuang,
  gitBasics,
  gitCommands,
  designToCode,
  iosWorkflow,
  claudeCodeSetup,
  claudeFigmaObsidian,
  walletComponent,
  ssoIntegration,
]

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}
