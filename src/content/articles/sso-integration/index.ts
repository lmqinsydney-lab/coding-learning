import type { Article } from '../../types'
import original from './original.md?raw'

/**
 * 基础知识 · 给自己的工具接入公司 SSO（面向团队同学，原文为自撰）。
 * 素材源自《秒创》的「功能层·登录与鉴权」模块，抽成可复用的接入指南。
 */
export const ssoIntegration: Article = {
  id: 'sso-integration',
  title: '给自己的工具接入公司 SSO：从申请到本地跑通',
  category: 'basics',
  summary:
    '想让你做的工具也能用公司账号登录、识别身份与权限？把秒创接入 SSO 的过程整理成可复用步骤：决策、调用链、申请 app_id/key、配 .env、本地跑通。',
  highlights: ['SSO 接入', 'app_id/app_key', '本地跑通'],
  bodyMarkdown: original,
  contentModules: [
    {
      id: 'why-sso',
      title: '为什么接 SSO',
      shortTitle: '为什么接',
      originAnchor: '为什么要接 SSO',
      order: 1,
      brief: '白名单 vs SSO 的 A/B 决策',
      motif: 'grid',
      lenses: [
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '工具想给团队用，第一步是知道「是谁登录的」，才能决定这个用户进入什么界面、能操作什么功能。' },
            {
              kind: 'analogy',
              designSide: 'A 白名单 JSON：5 分钟，写死谁能用',
              codeSide: 'B 接入公司 SSO：成本高，但工具能脱离个人独立运转',
            },
            { kind: 'callout', tone: 'info', text: '判断标准不是「短期成本」，而是「项目能不能脱离我独立运转」。要长期给团队用，选 B。' },
          ],
        },
      ],
    },
    {
      id: 'login-flow',
      title: '看懂登录调用链',
      shortTitle: '登录链路',
      originAnchor: '看懂登录',
      order: 2,
      brief: '点登录 → 跳 SSO → 回调 → 拿身份',
      motif: 'api',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '整条调用链一句话：用户点登录 → 跳到 SSO → 登录成功回调你的服务 → 你拿到用户身份。先看懂登录地址的结构（点每一段看含义）：' },
            {
              kind: 'commands',
              intro: 'URL 拆解：me.xiaojukeji.com/.../login.html?redirect_uri=...&app_id=21xxxxx',
              items: [
                { cmd: '协议 https', desc: '用什么方式通信，https 是加密的 http。', analogy: '走哪条路、加不加密。' },
                { cmd: '域名 Host', desc: 'me.xiaojukeji.com —— SSO 服务在哪台机器上。', analogy: '门牌地址，定位到哪栋楼。' },
                { cmd: '路径 Path', desc: '/project/stargate-auth/html/login.html —— 具体哪个登录页。', analogy: '楼里的哪个房间。' },
                { cmd: 'redirect_uri', desc: '登录成功后跳回哪里（你的回调地址 /auth/callback）。', analogy: '办完事该把人送回的目的地。' },
                { cmd: 'app_id', desc: '应用 ID，标识「是哪个系统在请求登录」。', analogy: '你这个工具的工牌号。' },
              ],
            },
          ],
        },
        {
          type: 'intro',
          title: '导读',
          blocks: [
            { kind: 'p', text: '接入前建议先补几个概念，不懂就把脱敏后的文档丢给 AI 用大白话讲：' },
            { kind: 'list', items: [
              '接口是什么、由什么构成、怎么调用',
              'cookie / session / localStorage 的区别（登录态存在哪）',
              '公司 SSO 的那几个接口分别干什么',
            ] },
          ],
        },
      ],
    },
    {
      id: 'apply',
      title: '申请 app_id / app_key',
      shortTitle: '申请工牌',
      originAnchor: '申请 app_id',
      order: 3,
      brief: 'UPM 发放、BPM 提单',
      motif: 'auth',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: 'app_id / app_key 是你工具在公司系统里的「工牌」——有它公司才认识你的系统，你才能拿到员工身份。由 UPM（用户权限管理系统）发放。' },
            {
              kind: 'analogy',
              designSide: '进公司大楼要先办一张工牌',
              codeSide: '接入 UPM 拿到 app_id/app_key，系统才被公司「认识」',
            },
          ],
        },
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '到 BPM 提交申请表单（流程 sso_upm_app_add_v3），关键字段：' },
            {
              kind: 'steps',
              items: [
                '子系统名称：填你的工具名',
                '回调地址：后端给的 IP + /auth/callback（本地 http://localhost:8000/auth/callback）',
                '主页地址：你的工具首页（本地 http://localhost:8000）',
                '管理员账号前缀：邮箱前缀，逗号隔开（线上不能填外包/实习）',
                '系统所属环境：建议测试、线上各申请一套',
                '通过后邮箱收到 app_id/app_key；可在 upm.xiaojukeji.com / upm-test.xiaojukeji.com 查看修改',
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: 'app_key 绝不要发给任何人或 AI，否则平台可能被任何人入侵！' },
            { kind: 'callout', tone: 'info', text: '建议申请两套：一套本地测试、一套线上正式。' },
          ],
        },
      ],
    },
    {
      id: 'env-config',
      title: '配置 .env',
      shortTitle: '.env 配置',
      originAnchor: '配置 .env',
      order: 4,
      brief: '核对 5 个关键值',
      motif: 'storage',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: 'AI 生成的项目里会带一个 .env（隐藏文件，macOS 按 ⌘+⇧+. 显示）。核对这 5 个值：' },
            {
              kind: 'commands',
              intro: '点开看每个值填什么：',
              items: [
                { cmd: 'SSO_APP_ID', desc: '从 UPM 拿到的 app_id。' },
                { cmd: 'SSO_APP_KEY', desc: '从 UPM 拿到的 app_key。', pitfall: '机密，绝不外发。' },
                { cmd: 'SSO_BASE_URL', desc: '公司 SSO 地址，一般不用改。' },
                { cmd: 'APP_BASE_URL', desc: '你的服务地址，本地默认 http://localhost:8000。' },
                { cmd: 'openssl rand -base64 32', desc: '生成 SESSION_SECRET（会话密钥），把输出填进 .env。', analogy: '给系统配一把随机的「保险箱钥匙」。' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'run-local',
      title: '本地跑通登录',
      shortTitle: '本地跑通',
      originAnchor: '本地跑通',
      order: 5,
      brief: '让 AI 起服务，看到公司登录页即成功',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '把代码放在全英文路径下，在 IDE 终端启动服务——有 AI 可以「逃课」：' },
            {
              kind: 'steps',
              items: [
                '在 IDE 终端输入 claude 启动，说「帮我在本地运行服务」',
                '终端显示服务已启动、监听 8000 端口',
                '浏览器打开 http://localhost:8000，自动跳转到公司 SSO 登录页',
                '登录后跳回你的工具，并能拿到当前用户身份 —— 跑通',
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: '连公司内网登录时别开 VPN，只连公司内网才行。' },
            { kind: 'callout', tone: 'warn', text: '代码存放路径全英文，不要出现中文。' },
            { kind: 'callout', tone: 'info', text: '调试三板斧：无痕模式清缓存、F12 看「网络/控制台」、把截图+完整报错一起给 AI。' },
          ],
        },
      ],
    },
  ],
}
