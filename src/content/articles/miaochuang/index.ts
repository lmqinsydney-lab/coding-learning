import type { Article } from '../../types'

// 原文截图（已本地化，按原文顺序嵌入对应模块）
import imgStages from './assets/nEX5VtTs0qqSLDJB.webp'
import imgSso from './assets/jELQ1CE5tkjbfUxg.webp'
import imgStorage1 from './assets/sq5K5y6fWEWotPPO.webp'
import imgStorage2 from './assets/vMeUgk2lTpRaNnD0.webp'
import imgUrl from './assets/MLec2XMhgjP0nYyP.webp'
import imgLoginFlow from './assets/JRLkxohAyMOLlcSf.webp'
import imgUpmBadge from './assets/0BxmtGKdwOnRzIIu.webp'
import imgApply from './assets/PNbN6lOR1MOlklOs.webp'
import imgPerm from './assets/aIhg4SDyRVwZ0WxZ.webp'
import imgUpmManage from './assets/JU3ntOOrfDE3f8nm.webp'
import imgRoute1 from './assets/B9apSzJypyVREmon.webp'
import imgRoute2 from './assets/UAkKW6m6BPtGDtN7.webp'
import imgPath from './assets/MkBv2BewsX9HFhwr.webp'
import imgEnvHidden from './assets/9E18tY2dzqdRlMg1.webp'
import imgEnvExample from './assets/Alt468gXwgZbVp0p.webp'
import imgLocalRun from './assets/lC59eyoMJMkR3yJ8.webp'
import imgClaudeRun from './assets/Tq9JWWeJ0gMfO6IP.webp'
import imgLoginPage from './assets/ucoiDczS1HtwijRS.webp'
import imgNet from './assets/ozDjO1iwIxcwHeSZ.webp'
import imgConsole from './assets/xmLO75gpPPfBjost.webp'
import imgTwoTerm from './assets/Pl6kg2MiGBNhLevX.webp'
import imgNeedDb from './assets/1jBFU9ZxngwCrGaT.webp'
import imgLocalJson from './assets/y1IkR37SFhlQeRI9.webp'
import imgGitConcept from './assets/uLk3YaII1kcKa3jk.webp'
import imgSshKey from './assets/jdTWwAt99gEuvNso.webp'
import imgCommitPush from './assets/4pXZz9sVYJ3pWPkY.webp'
import imgCheckBranch from './assets/wMzGbQ4hCQ5HLRxp.webp'
import imgDeployTip from './assets/wYsjAsnhzP9J9Xdp.webp'

/**
 * 首发代码类文章，源自 Cooper：
 * 《代码：设计师如何把【秒创】从 IDEA 到项目落地》
 * 两层模型：5 个阶段(+简介/写在最后) 作内容模块，每个模块配解读视角。
 * 原文截图已本地化，按原文顺序嵌入各模块。
 */
export const miaochuang: Article = {
  id: 'miaochuang',
  title: '设计师如何把【秒创】从 IDEA 到项目落地',
  category: 'code',
  summary:
    '一名设计师花 3 周，把一个 AI 生成的 HTML 文件，部署成多人协作的生产后台。这是一份设计师迈向工程化的实战攻略。',
  highlights: ['真实案例', 'URL 拆解', 'A/B 决策', '部署上线'],

  body: [
    { kind: 'p', text: '作为一名设计师，我花了 3 周，把一个 AI 生成的 HTML 文件，成功部署成了一个多人协作的生产后台。' },
    { kind: 'h', text: '项目简介' },
    {
      kind: 'p',
      text: '项目名为【秒创】，目的是帮运营同学在设计标准的框架下批量生成活动营销素材，节省视觉同学的成本。由产品+设计 @王伊乐 负责 V1.0 原型，设计+前端 @刘孟强 负责 AI 代码化落地与部署。',
    },
    { kind: 'h', text: '项目阶段' },
    { kind: 'p', text: '整个项目经历 5 个阶段，每个阶段都是落地过程中不可或缺的一环。点上方任一阶段卡片，进入该阶段的结构化学习。' },
    { kind: 'img', src: imgStages, alt: '项目 5 个阶段总览', caption: '项目 5 个阶段：体验层 → 功能层 → 验证层 → 发布层 → 数据层' },
    { kind: 'p', text: '写在最后：工程能力的本质不是会写多少代码，而是能想清楚一个系统怎么运转——数据怎么流、权限怎么管、出错怎么定位。这些思考会反过来让你成为更好的设计师。AI 帮你扫盲，但路要自己走。' },
  ],

  contentModules: [
    /* ---------- 0 项目简介 ---------- */
    {
      id: 'intro',
      title: '项目简介',
      order: 1,
      brief: '它是什么 · 谁来做',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '【秒创】是一个营销素材批量生成后台：让运营在设计定好的模板框架内快速产出，省下视觉同学反复出图的成本。' },
            {
              kind: 'analogy',
              designSide: '把「设计规范 + 模板」交付给运营自助使用',
              codeSide: '把模板做成系统，运营在后台一键生成、导出',
            },
            { kind: 'list', items: ['产品+设计 @王伊乐：V1.0 功能梳理 + 可点击原型', '设计+前端 @刘孟强：AI 代码化落地与部署'] },
          ],
        },
      ],
    },

    /* ---------- 1 体验层 ---------- */
    {
      id: 'prototype',
      title: '体验层 · 手搓 HTML 原型',
      order: 2,
      brief: '一个可操作的 index.html',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '这一步相当于传统设计流程里的「产品 → 设计」：让 AI 反复确认你的真实意图与产品核心，结合 skill 输出一份 PRD，再据此生成初版 UI。' },
            { kind: 'p', text: '因为不需要太多业务背景，输入时讲清楚背景、角色、核心功能即可。目的是让 AI 理清产品核心，方便后续产出开发文档和接口文档。' },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            {
              kind: 'analogy',
              designSide: '先做一个可点击的高保真 Demo 给大家试',
              codeSide: '一个能在浏览器打开的 index.html 原型',
            },
            { kind: 'p', text: '工具：Claude Code + /brainstorming skill（先对齐意图，再生成 PRD 与 UI）。' },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            {
              kind: 'callout',
              tone: 'warn',
              text: '单 HTML + localStorage 跑不出「多人协作」：只能自己电脑跑或发文件给同事，且操作记录无法保存。这正是要往后做功能层的原因。',
            },
          ],
        },
      ],
    },

    /* ---------- 2 功能层（最丰富） ---------- */
    {
      id: 'auth',
      title: '功能层 · 登录与鉴权',
      order: 3,
      brief: '先知道「是谁在用」',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '工具想给团队用，第一步是知道「是谁登录的」，才能判断这个用户进入什么界面、能操作什么功能。' },
            { kind: 'p', text: '解决登录有两条路，作者做了一次关键的 A/B 决策：' },
            {
              kind: 'analogy',
              designSide: 'A 白名单 JSON：5 分钟，写死谁能用',
              codeSide: 'B 接入公司 SSO：成本高，但项目能脱离个人独立运转',
            },
            {
              kind: 'callout',
              tone: 'info',
              text: '结论：选 B。判断标准不是「短期成本」，而是「项目能不能脱离我独立运转」。',
            },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '【一】先学 SSO（单点登录）基础：把脱敏后的公司 SSO 文档丢给 AI，让它用大白话讲一遍这条链路。' },
            { kind: 'img', src: imgSso, alt: 'SSO 基础知识', caption: '学习 SSO 相关基础知识' },
            { kind: 'p', text: '过程中你会顺带搞懂：什么是接口、接口怎么运作、cookie / session / localStorage 的区别。' },
            { kind: 'img', src: imgStorage1, alt: '数据存储方式对比 1' },
            { kind: 'img', src: imgStorage2, alt: 'cookie / session / localStorage 区别' },
            { kind: 'p', text: '登录调用链：用户点登录 → 跳到 SSO → 回调你的服务 → 你拿到用户身份。先看懂一个登录地址的结构（点下面每一段看含义）：' },
            {
              kind: 'commands',
              intro: 'URL 拆解：me.xiaojukeji.com/.../login.html?redirect_uri=...&app_id=2103456',
              items: [
                { cmd: '协议 https', desc: '用什么方式通信，https 是加密的 http。', analogy: '相当于「走哪条路、加不加密」。' },
                { cmd: '域名 Host', desc: 'me.xiaojukeji.com —— 服务在哪台机器上。', analogy: '像门牌地址，定位到哪栋楼。' },
                { cmd: '路径 Path', desc: '/project/stargate-auth/html/login.html —— 具体哪个页面。', analogy: '楼里的哪个房间。' },
                { cmd: 'redirect_uri', desc: '登录成功后跳回哪里（你的回调地址）。', analogy: '办完事该把人送回的目的地。' },
                { cmd: 'app_id', desc: '应用 ID，标识「是哪个系统在请求登录」。', analogy: '你这个系统的工牌号。' },
              ],
            },
            { kind: 'img', src: imgUrl, alt: '登录 URL 结构分析' },
            { kind: 'p', text: '一般后台登录流程：访问后台 → 带 app_id 去 SSO 登录 → 登录成功拿着「工牌」回后台。' },
            { kind: 'img', src: imgLoginFlow, alt: '登录流程图', caption: '后台登录的完整流程' },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '【二】接入 UPM（用户权限管理）会拿到 app_id 和 app_key，相当于秒创系统的「工牌」，公司系统靠它认识你。' },
            { kind: 'img', src: imgUpmBadge, alt: 'app_id / app_key 工牌' },
            { kind: 'p', text: '到 BPM 按字段填写申请：子系统名称、回调地址（一般结尾加 /auth/callback）、主页地址、管理员账号、所属环境等。' },
            { kind: 'img', src: imgApply, alt: 'app 申请表单' },
            { kind: 'img', src: imgPerm, alt: '开放权限申请' },
            { kind: 'p', text: '【三】申请通过后邮件会给你 app_id / app_key，可登录 UPM 后台查看修改。' },
            { kind: 'img', src: imgUpmManage, alt: 'UPM 后台管理 app' },
            { kind: 'p', text: '【四】SSO 路由部署：告诉 AI 你和后端的配合方式，先在本地跑通一次公司内网登录；建一个全英文路径存放代码。' },
            { kind: 'img', src: imgRoute1, alt: 'SSO 路由部署 1' },
            { kind: 'img', src: imgRoute2, alt: 'SSO 路由部署 2' },
            { kind: 'img', src: imgPath, alt: '代码存放路径' },
            { kind: 'p', text: '【五】修改 .env 配置文件（默认隐藏，Command+Shift+. 显示）。核对 5 个值：' },
            { kind: 'img', src: imgEnvHidden, alt: '.env 配置文件' },
            { kind: 'img', src: imgEnvExample, alt: '.env 示例' },
            {
              kind: 'commands',
              intro: '常用到的命令（点开看说明与类比）：',
              items: [
                { cmd: 'openssl rand -base64 32', desc: '生成 SESSION_SECRET（会话密钥），填进 .env。', analogy: '给系统配一把随机的「保险箱钥匙」。' },
                { cmd: 'claude', desc: '在 IDE 终端里启动 Claude，直接说「帮我在本地运行服务」即可跑通。', analogy: '把跑服务交给会写代码的搭子。' },
                { cmd: 'ls', desc: '查看当前路径下有哪些文件。', analogy: '看一眼这个文件夹里都有啥。' },
                { cmd: 'cd banner', desc: '进入某个文件夹（这里进 banner 目录）。', analogy: '双击进入一个文件夹。' },
              ],
            },
            { kind: 'p', text: '【六】SSO 能力本地调通：让 AI「帮我在本地运行服务」，看到「✅ 服务已成功启动」即跑通。' },
            { kind: 'img', src: imgLocalRun, alt: 'SSO 本地调通' },
            { kind: 'img', src: imgClaudeRun, alt: 'Claude 本地运行服务' },
            { kind: 'p', text: '浏览器打开 http://localhost:8000，就能看到公司内网的登录界面。' },
            { kind: 'img', src: imgLoginPage, alt: '公司内网登录界面' },
            {
              kind: 'steps',
              items: [
                '读懂公司 SSO/接口文档，脱敏后让 AI 讲一遍',
                '到 BPM 申请 app_id / app_key',
                '在 .env 里核对 5 个值：APP_ID / APP_KEY / SSO_BASE_URL / APP_BASE_URL / SESSION_SECRET',
                '本地启动服务，浏览器打开 localhost:8000 看到公司登录页即跑通',
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: 'app_key 绝不要发给任何人或 AI，否则平台可能被任何人入侵！' },
            { kind: 'callout', tone: 'warn', text: '内网登录时不要开 VPN，只连公司内网才行。' },
            { kind: 'callout', tone: 'warn', text: '代码存放路径最好全英文，不要出现中文。' },
            { kind: 'p', text: '【附加篇】用 AI 调试 bug：无痕模式清缓存，F12 重点看「网络」和「控制台」，把截图+完整报错给 AI。' },
            { kind: 'img', src: imgNet, alt: '网络面板调试' },
            { kind: 'img', src: imgConsole, alt: '控制台报错' },
            { kind: 'img', src: imgTwoTerm, alt: '同时开两个终端调试' },
          ],
        },
      ],
    },

    /* ---------- 3 验证层 ---------- */
    {
      id: 'local-data',
      title: '验证层 · 数据本地化存储',
      order: 4,
      brief: '从孤岛到公共记忆',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '登录跑通后，工具还是「自己用」。要让团队共享数据，必须有一个所有人都能访问的「公共记忆」。' },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '数据存储的三层认知（点开看每层意味着什么）：' },
            {
              kind: 'commands',
              items: [
                { cmd: '① localStorage', desc: '只是「你这台浏览器的记忆」，A 存的 B 看不到。这不是协作，是孤岛。', pitfall: '设计师最容易停在这一层。' },
                { cmd: '② 公共 JSON', desc: '跑一个 Node 服务，把数据写进公共的 assets.json，所有人读写同一份。你从「前端」变成「全栈」，开始设计 API 协议和数据模型。', analogy: 'API 协议=前后端的契约；数据模型=工程的核心。' },
                { cmd: '③ 真数据库', desc: 'JSON 文件是玩具不是生产：合上电脑就用不了、文件大了变慢、并发写会损坏。需要真正的数据库。', pitfall: '但「玩具阶段」极有价值——它让你把整条数据流跑通。' },
              ],
            },
            { kind: 'p', text: '怎么判断要不要数据库？看四个信号：' },
            { kind: 'steps', items: ['时间性：数据要长期保留吗', '共享性：需要多人共享吗', '可信性：需要可追溯吗', '复杂性：是复合信息（文字+图片+配置）吗'] },
            { kind: 'img', src: imgNeedDb, alt: '判断是否需要数据库' },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '本地阶段用 JSON 文件当「本地数据库」：让 AI 按接口生成各种 JSON 存储文件，就能本地调试验证。' },
            { kind: 'img', src: imgLocalJson, alt: '本地 JSON 存储' },
            {
              kind: 'commands',
              items: [
                { cmd: 'cat data/categories.json | python3 -m json.tool | head -40', desc: '在终端直接查看某个 JSON 文件的实况，验证数据有没有被正确写入。', analogy: '像直接打开「本地数据库」看一眼内容。' },
              ],
            },
            { kind: 'callout', tone: 'info', text: '验证数据是否写入有两招：① 让 AI 在日志里多打几行；② 终端直接 cat 出 JSON 文件。' },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: '从一开始就用「软删除」（加 deleted 字段标记，而不是真删）。前期没有备份，误删无法恢复——软删除是给未来的自己买的保险。' },
          ],
        },
      ],
    },

    /* ---------- 4 发布层 ---------- */
    {
      id: 'deploy',
      title: '发布层 · 部署到服务器',
      order: 5,
      brief: '让别人能通过 IP 访问',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '本地跑通后，要把代码部署到服务器，别人才能通过一个 IP 地址访问你的系统。学一点基本的 git 概念，有助于看懂 AI 在干嘛。' },
            { kind: 'img', src: imgGitConcept, alt: 'git 基本指令与概念' },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '用 GitLab 管理代码：先找后端开通仓库权限，并配置 ssh_key。' },
            { kind: 'img', src: imgSshKey, alt: '配置 ssh_key' },
            { kind: 'p', text: '下面是常用 git 动作——你甚至可以直接用大白话让 AI 执行：' },
            {
              kind: 'commands',
              items: [
                { cmd: 'ssh_key', desc: '到 git 平台 profile/keys 按指引配置 SSH 公钥，本机才能免密连仓库。', analogy: '给你的电脑和代码仓库配一对「专属钥匙」。' },
                { cmd: '建立仓库连接', desc: '「帮我建立与这个代码仓库的连接 git@...:pay/banner-generator.git」。', analogy: '把本地文件夹和云端仓库绑定。' },
                { cmd: '创建分支', desc: '「帮我创建一个分支，命名 20260604-mycode-test」。', analogy: '复制一份设计稿副本，改坏了不影响主稿。' },
                { cmd: 'pull 拉取', desc: '「帮我把这个分支最新的代码拉到本地」。', analogy: '把云端最新版同步下来。' },
                { cmd: 'commit & push', desc: '「我本地更新了代码，帮我 commit and push」。', analogy: '给当前版本存档并上传到云端。' },
              ],
            },
            { kind: 'img', src: imgCommitPush, alt: 'commit & push 到远程' },
            { kind: 'p', text: '部署：OE 平台用来搭流水线，找后端建好后，你只需执行「编译」和「部署」两步，成功后去看预发环境 IP 能否打开。' },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '推上去后检查三点：分支、上传时间、操作编码（commit）。' },
            { kind: 'img', src: imgCheckBranch, alt: '检查分支/时间/commit' },
            { kind: 'callout', tone: 'warn', text: '部署/重启服务器前，一定提醒大家不要在编辑数据——重启会保存不了别人的数据！' },
            { kind: 'img', src: imgDeployTip, alt: '部署提醒' },
          ],
        },
      ],
    },

    /* ---------- 5 数据层 ---------- */
    {
      id: 'backend',
      title: '数据层 · 联动后端，闭环上线',
      order: 6,
      brief: '中间层双模式',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '后端同事加入，Java 后端接管真实数据库。你之前写的 Node 服务不下线，而是变成「中间层」。' },
          ],
        },
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '关键工程决策——中间层的双模式：用环境变量（如 USE_BACKEND_API=true/false）控制数据源。' },
            {
              kind: 'analogy',
              designSide: '一套设计稿，预览用假数据、上线用真数据',
              codeSide: '同一份代码：本地走 assets.json，线上转发给 Java 后端',
            },
            { kind: 'p', text: '价值：联调最忙的两周，本地随时复现 bug 不麻烦后端，线上出问题能立刻判断是哪一层的责任。' },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '接口文档先行：每加一个接口，先和后端约定路径/参数/返回字段/错误码，发群里统一版本。口头约定一定出事。' },
            { kind: 'callout', tone: 'info', text: '联调分层定位：先看浏览器 Network 的状态码，再看 Node 中间层日志，最后看 Java 日志。分层排查不要跳步。' },
            { kind: 'callout', tone: 'warn', text: '保留软删除和审计字段：删除时记录 deleted_at / deleted_by，比事后补字段省 10 倍力气。' },
          ],
        },
      ],
    },

    /* ---------- 6 写在最后 ---------- */
    {
      id: 'closing',
      title: '写在最后',
      order: 7,
      brief: '设计与工程的边界正在模糊',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: 'AI 不是把设计师变成工程师，而是让设计师不再被「我不会」挡住自己。' },
            { kind: 'p', text: '工程能力的本质不是会写多少代码，而是能想清楚一个完整系统怎么运转：数据怎么流、权限怎么管、出错怎么定位、改一处会不会影响别处。这些思考会反过来让你成为更好的设计师。' },
            { kind: 'callout', tone: 'info', text: '走出去就有路。AI 帮你扫盲，但路要自己走。' },
          ],
        },
      ],
    },
  ],
}
