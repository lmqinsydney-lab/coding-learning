import type { Article } from '../../types'
import original from './original.md?raw'

/**
 * 基础知识 · 给自己的工具接入公司 SSO（面向团队同学，原文为自撰）。
 * 公开站脱敏版：保留完整流程/接口作用/代码骨架/排查，内网 IP 与真实 live 域名用占位符。
 * 真实接口细节见公司内部《SSO 知多少》文档。
 */
export const ssoIntegration: Article = {
  id: 'sso-integration',
  createdAt: '2026-06-25T19:40:00',
  title: '【SSO登录】你的工具需不需要接SSO登录能力？',
  category: 'basics',
  summary:
    '想让你做的工具也能用公司账号登录、识别身份与权限？完整流程 + 四个核心接口 + 服务端代码骨架 + 申请/配置 + 排查 FAQ，可照做（内网地址脱敏）。',
  highlights: ['实操经验', '登录能力', 'SSO接入'],
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
      title: '登录链路与四个接口',
      shortTitle: '登录链路',
      originAnchor: '登录这条链路怎么走',
      order: 2,
      brief: '点登录 → 跳 SSO → code 换 ticket → 拿身份',
      motif: 'api',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: '一句话：未登录 → 服务端 302 跳 SSO → 登录成功带 code 回调 → 用 code 换 ticket → 用 ticket 拿用户 → 写 session。' },
            {
              kind: 'commands',
              intro: '四个核心接口（路径相对 {SSO_BASE_URL}），点开看作用：',
              items: [
                { cmd: 'GET /sso/login', desc: '跳转登录页。参数 app_id、jumpto(urlencode)、version=1.0。', analogy: '把没登录的人领到公司统一登录台。' },
                { cmd: 'POST /sso/api/check_code', desc: '用回调拿到的 code 换 ticket。入参 app_id/app_key/code，返回 {ticket, username}。', pitfall: 'code 一次性、约 30s 失效，别重复用同一个。' },
                { cmd: 'POST /sso/api/check_ticket', desc: '校验登录态是否仍有效。errno=0 即有效。', analogy: '每次进门刷一下工牌还有效没。' },
                { cmd: 'POST /sso/api/check_user_ticket', desc: '用 ticket 取用户信息：username / username_zh / email / uid。', pitfall: '唯一标识用 username，不要用 uid。' },
                { cmd: 'GET /ldap/logout', desc: '统一退出。先清自己的 session 再 302 到这里。' },
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'p', text: 'jumpto 四个最容易踩的坑：' },
            { kind: 'list', items: [
              '不带 jumpto，SSO 回调会默认带 jumpto=index，你要据此跳自己主页',
              '真正的回调地址是 UPM 里配置的那个，不是 jumpto；jumpto 只是登录后透传、由你决定跳哪',
              '推荐用法：未登录访问了 A 页 → 把 A 页塞进 jumpto → 登录完跳回 A 页',
              '回调地址不能带 ?（会被截断），jumpto 不能带 #；非要带就多 encode/decode 几次',
            ] },
          ],
        },
      ],
    },
    {
      id: 'impl',
      title: '服务端怎么实现',
      shortTitle: '服务端实现',
      originAnchor: '服务端怎么实现',
      order: 3,
      brief: '中间件 → 302 → 回调换 ticket → session',
      motif: 'terminal',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '任何语言同理，核心四步（详见下方原文里的 Express 伪代码）：' },
            { kind: 'steps', items: [
              '登录态中间件：受保护路由先校验 session 里的 ticket（check_ticket）',
              '无 ticket / 失效 → 服务端 302 跳到 /sso/login，带上 app_id 和 jumpto',
              '/auth/callback 收到 code → check_code 换 ticket → 存进服务端 session',
              '退出：清 session → 302 到 /ldap/logout',
            ] },
            { kind: 'callout', tone: 'warn', text: '铁律：登录态必须服务端校验、由服务端发起跳转；ticket 不在前端明文出现、不跨系统传输。' },
          ],
        },
      ],
    },
    {
      id: 'apply',
      title: '申请 app_id / app_key',
      shortTitle: '申请工牌',
      originAnchor: '申请 app_id',
      order: 4,
      brief: 'UPM 发放、BPM 提单',
      motif: 'auth',
      lenses: [
        {
          type: 'concept',
          title: '核心概念图解',
          blocks: [
            { kind: 'p', text: 'app_id / app_key 是你工具在公司系统里的「工牌」——有它公司才认识你的系统。由 UPM（用户权限管理系统）发放。' },
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
                '子系统名称：你的工具名',
                '回调地址：后端给的地址 + /auth/callback（本地 http://localhost:8000/auth/callback）',
                '主页地址：你的工具首页（本地 http://localhost:8000）',
                '管理员账号前缀：邮箱前缀，逗号隔开（线上不能填外包/实习）',
                '系统所属环境：测试、线上各申请一套（两套环境完全独立）',
              ],
            },
          ],
        },
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'warn', text: 'app_key 绝不外发给任何人或 AI，否则平台可能被任何人入侵！' },
          ],
        },
      ],
    },
    {
      id: 'env-config',
      title: '配置 .env',
      shortTitle: '.env 配置',
      originAnchor: '配置 .env',
      order: 5,
      brief: '核对 5 个关键值',
      motif: 'storage',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: 'AI 生成的项目里会带 .env（隐藏文件，macOS 按 ⌘+⇧+. 显示）。核对这 5 个值：' },
            {
              kind: 'commands',
              intro: '点开看每个值填什么：',
              items: [
                { cmd: 'SSO_APP_ID', desc: '从 UPM 拿到的 app_id。' },
                { cmd: 'SSO_APP_KEY', desc: '从 UPM 拿到的 app_key。', pitfall: '机密，绝不外发。' },
                { cmd: 'SSO_BASE_URL', desc: '公司 SSO 地址，按环境填（真实值查内部文档）。' },
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
      order: 6,
      brief: '让 AI 起服务，看到公司登录页即成功',
      motif: 'prototype',
      lenses: [
        {
          type: 'reference',
          title: '指令交互速查',
          blocks: [
            { kind: 'p', text: '把代码放全英文路径下，在 IDE 终端启动服务——有 AI 可以「逃课」：' },
            {
              kind: 'steps',
              items: [
                '在 IDE 终端输入 claude 启动，说「帮我在本地运行服务」',
                '终端显示服务已启动、监听端口',
                '浏览器打开本地地址，自动跳转到公司 SSO 登录页',
                '登录后跳回你的工具，并能拿到当前用户身份 —— 跑通',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'troubleshoot',
      title: '常见问题排查',
      shortTitle: '排查 FAQ',
      originAnchor: '常见问题排查',
      order: 7,
      brief: '超时 / 环境隔离 / 重定向过多',
      motif: 'branch',
      lenses: [
        {
          type: 'pitfall',
          title: '避坑',
          blocks: [
            { kind: 'callout', tone: 'info', text: '请求超时 → 环境没对应：线上接线上 SSO、测试接测试，别混用。' },
            { kind: 'callout', tone: 'info', text: '线下通过、线上 check_code/check_ticket 失败 → 线上服务器需开通访问 SSO 的网络权限（找 OP），或改用内网直连地址。' },
            { kind: 'callout', tone: 'info', text: '线上 check_code 失败 → 线上线下环境独立、要各申请一套 app_id/key；code 一次性，反复用同一个会失败。' },
            { kind: 'callout', tone: 'info', text: '连无线网/代理无法访问、要验证码 → 被识别成外网，关掉 VPN/代理（含浏览器自带云加速）。' },
            { kind: 'callout', tone: 'warn', text: '登录后浏览器重定向过多 → 用了错误的 ticket：①线上线下 cookie 混用（清缓存）②set cookie 失败（内容过长）③cookie 被 set 到全局域名取到别系统的 ticket。' },
          ],
        },
      ],
    },
  ],
}
