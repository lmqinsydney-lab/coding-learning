# 给自己的工具接入公司 SSO：从申请到本地跑通

> 面向团队同学：想让你自己做的工具也能用**公司账号登录**、识别用户身份与权限？这篇把「秒创」接入 SSO 的完整过程，整理成一份可复用、可照做的步骤。
>
> 说明：文中所有公司内部 SSO 域名 / 内网地址都用占位符 `{SSO_BASE_URL}` 表示，**真实地址请查公司内部《SSO 知多少》文档**（本文不在公网放内网地址）。

## 为什么要接 SSO

工具想给团队用，第一步是知道「**是谁登录的**」，才能决定这个用户进入什么界面、能操作什么功能。

| | A 白名单 JSON | B 接入公司 SSO |
| --- | --- | --- |
| 做法 | 项目里放 `whitelist.json`，写死谁能用 | 用户身份直接从公司系统调用 |
| 成本 | 5 分钟 | 要读鉴权文档、配回调、处理 cookie/session |
| 适合 | 临时 / 个人小工具 | 要长期给团队用的工具 |

> 判断标准不是「短期成本」，而是「**项目能不能脱离我独立运转**」。要长期给团队用，选 B。

## 登录这条链路怎么走

一句话：**未登录 → 服务端 302 跳到 SSO → 登录成功带 `code` 回调你的服务 → 你用 code 换 ticket → 用 ticket 拿用户身份 → 写进 session**。

```text
浏览器                      你的服务端(子系统)                    公司 SSO
  │ 访问任意页 ───────────▶ │ 有有效 ticket 吗？                  │
  │                        │ ── 无/失效 → 302 ──────────────────▶│ 展示登录页
  │ ◀── 跳 {SSO}/sso/login?app_id&jumpto&version ────────────────│
  │ 登录成功                │                                     │
  │ ◀──── SSO 302 回调你的 /auth/callback?code=xxx&jumpto ───────│
  │ ─────────────────────▶ │ POST check_code(app_id,app_key,code)│
  │                        │ ◀── { ticket, username } ───────────│
  │                        │ 把 ticket 存进服务端 session        │
  │ ◀── 302 跳回 jumpto ─── │ 后续请求用 check_ticket 校验        │
```

**四个核心接口（路径相对 `{SSO_BASE_URL}`，方法/参数固定）：**

| 接口 | 方法 | 作用 | 关键参数 / 返回 |
| --- | --- | --- | --- |
| `/sso/login` | GET(302) | 跳转登录页 | `app_id`、`jumpto`(urlencode)、`version=1.0` |
| `/sso/api/check_code` | POST | 用 code 换 ticket | 入参 `app_id/app_key/code`；返回 `{ticket, username}` |
| `/sso/api/check_ticket` | POST | 校验登录态是否有效 | 入参 `ticket/app_id`；返回 `errno=0` 即有效 |
| `/sso/api/check_user_ticket` | POST | 用 ticket 取用户信息 | 返回 `{username, username_zh, email, uid}` |
| `/ldap/logout` | GET(302) | 统一退出 | `app_id`、`jumpto` |

> `code` 用一次即失效、有效期很短（约 30s）；`ticket` 有效期 5 小时、每次校验续期。**用 `username` 作唯一标识，不要用 `uid`。**

**jumpto 四个坑（最容易踩）：**

1. 不带 `jumpto`，SSO 回调会默认带 `jumpto=index`，你要据此跳自己主页。
2. 真正的回调地址是 **UPM 里配置的那个**，不是 jumpto；jumpto 只是登录后透传回来、由你决定跳哪。
3. 推荐用法：用户未登录访问了 A 页 → 把 A 页塞进 jumpto → 登录完跳回 A 页。
4. **回调地址里不能带 `?`**（SSO 会从 `?` 处截断），`jumpto` 不能带 `#`；非要带就多 encode 几次、回调端多 decode 几次。

## 服务端怎么实现（参考骨架）

任何语言同理，核心是「中间件校验登录态 → 无效则 302 去 login → `/auth/callback` 用 code 换 ticket → 存 session」。下面是 Node/Express 伪代码：

```js
// 1) 登录态中间件：受保护路由先过这里
async function requireLogin(req, res, next) {
  const ticket = req.session.ticket
  if (ticket && (await checkTicket(ticket))) return next()
  const jumpto = encodeURIComponent(APP_BASE_URL + req.originalUrl)
  res.redirect(`${SSO_BASE_URL}/sso/login?app_id=${APP_ID}&jumpto=${jumpto}&version=1.0`)
}

// 2) 回调：SSO 登录成功后带 code 跳回这里
app.get('/auth/callback', async (req, res) => {
  const { code, jumpto } = req.query
  const r = await postForm(`${SSO_BASE_URL}/sso/api/check_code`,
    { app_id: APP_ID, app_key: APP_KEY, code })
  if (r.errno !== 0) return res.status(401).send('登录失败')
  req.session.ticket = r.data.ticket      // ticket 只存服务端，别明文给前端
  req.session.username = r.data.username
  res.redirect(jumpto && jumpto !== 'index' ? jumpto : '/')
})

// 表单 POST + 校验 ticket
async function postForm(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
  })
  return res.json()
}
async function checkTicket(ticket) {
  const r = await postForm(`${SSO_BASE_URL}/sso/api/check_ticket`, { ticket, app_id: APP_ID })
  return r.errno === 0
}
```

> 铁律：**登录态必须服务端校验、由服务端发起跳转**；ticket 不在前端明文出现、不跨系统传输（可加密或后端映射存储）。

## 申请 app_id / app_key

`app_id` / `app_key` 是你工具在公司系统里的「**工牌**」——由 **UPM（用户权限管理系统）**发放。到 **BPM** 提交申请表单（流程 `sso_upm_app_add_v3`），关键字段：

| 字段 | 怎么填 |
| --- | --- |
| 子系统名称 | 你的工具名 |
| 回调地址 | 后端给的地址 + `/auth/callback`（本地 `http://localhost:8000/auth/callback`） |
| 主页地址 | 你的工具首页（本地 `http://localhost:8000`） |
| 管理员账号前缀 | 邮箱前缀，逗号隔开（线上不能填外包 / 实习） |
| 系统所属环境 | **测试、线上各申请一套**（两套环境完全独立） |

> 通过后邮箱收到 app_id/app_key。**app_key 绝不外发给任何人或 AI**——泄漏=平台可被任何人入侵。

## 配置 .env

AI 生成的项目里会带一个 `.env`（隐藏文件，macOS 按 `⌘+⇧+.` 显示）。核对这 5 个值：

| 变量 | 填什么 |
| --- | --- |
| `SSO_APP_ID` | UPM 拿到的 app_id |
| `SSO_APP_KEY` | UPM 拿到的 app_key（机密） |
| `SSO_BASE_URL` | 公司 SSO 地址（按环境填，查内部文档） |
| `APP_BASE_URL` | 你的服务地址（本地默认 `http://localhost:8000`） |
| `SESSION_SECRET` | 终端跑 `openssl rand -base64 32` 生成 |

## 本地跑通登录

把代码放在**全英文路径**下，在 IDE 终端启动服务——有 AI 可以「逃课」：直接 `claude`，说「帮我在本地运行服务」。跑通标志：

- 终端显示服务已启动、监听端口
- 浏览器打开本地地址，**自动跳转到公司 SSO 登录页**
- 登录后跳回你的工具，能拿到当前用户身份

## 常见问题排查

| 问题表现 | 原因 / 处理 |
| --- | --- |
| 请求超时 | 环境没对应——线上接线上 SSO、测试接测试，别混用 |
| 线下通过、线上 `check_code/check_ticket` 失败 | 线上服务器需开通访问 SSO 的网络权限（找 OP）；或改用内网直连地址 |
| 线上 `check_code` 失败 | 线上线下环境独立，要**各申请一套 app_id/key**；`code` 一次性，排查时反复用同一个会失败 |
| 连无线网/代理时无法访问、要验证码 | 被识别成外网——**关掉 VPN / 代理**（含浏览器自带云加速） |
| 登录后**浏览器重定向过多** | 用了**错误的 ticket**：① 线上线下 cookie 混用 → 清缓存；② set cookie 失败（内容过长）；③ cookie 被 set 到全局域名导致取到别的系统的 ticket |

## 安全与避坑清单

- `app_key` 保密，绝不外发；喂 AI 文档前先**脱敏**（去掉真实地址 / key）。
- 登录态服务端校验、服务端发起跳转；ticket 不前端明文、不跨系统传。
- `code` 一次性（约 30s）、`ticket` 5h；唯一标识用 `username`。
- 连公司内网登录别开 VPN；代码路径全英文。
- 调试三板斧：无痕模式清缓存、F12 看「网络/控制台」、把截图+完整报错一起给 AI。
