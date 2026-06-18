
# 02 -【设计代码化】

项目类型：信用购/频道导流生息

项目成员：刘孟强 朱梦翔

项目时间：2026年3月起至今 

文档负责：刘孟强撰写

---

#### 背景

设计稿转代码（Design-to-Code）一直是产品设计与前端开发之间的核心痛点。传统工作流中，设计师在 Figma 或 MasterGo 中完成设计，然后通过切图标注、视觉还原文档等方式交付给开发者，开发者再根据这些静态信息手动编写前端代码。这个过程充满了信息损失、反复沟通和还原偏差。

2024–2026年，随着 AI 大模型能力的飞速提升和 MCP（Model Context Protocol）协议的出现，设计工具与 AI 编码工具之间的连接变得前所未有地流畅。Figma 和 MasterGo 等主流设计工具均已推出官方 MCP Server，让 AI 模型可以直接读取设计文件的结构化数据，实现从「看图写代码」到「读设计稿写代码」的范式转变。

#### 概念解释

| **概念** <br> | **说明** <br> |
| --- | --- |
| **MCP** <br> | Model Context Protocol，由 Anthropic 发起的开放协议。像 USB-C 一样，为 AI 模型提供统一的「接口」来访问外部工具和数据源。 <br> |
| **Claude Code** <br> | Anthropic 的 Agentic 编码工具，运行在终端中，可以理解项目上下文、自主写代码、调试、运行测试，支持通过 MCP 连接外部服务。 <br> |
| **Figma Make** <br> | Figma 内置的 AI 原型工具，用户用自然语言描述需求，自动生成可交互的高保真原型，底层运行 React + Tailwind 代码。支持选择 Claude 或 Gemini 模型。 <br> |
| **DSL** <br> | Domain-Specific Language，设计工具将设计稿转化为结构化的中间表示，包含布局、样式、组件层级等信息，供 AI 解析。 <br> |

#### 目标

探索借助AI工具实现设计稿代码化的**最短最优**路径

**短：**尽量减少文件格式的转化，减少因存储格式而造成的失真

**优：**尽量保证设计稿代码化的1.0版本**还原度>90%**，减少调试成本

| **路径** <br> | **路径 A** <br>Figma MCP + Claude Code <br> | **路径 B** <br>MasterGo MCP + Claude Code <br> | **路径 C** <br>Figma Make 内置 Claude模型 <br> |
| --- | --- | --- | --- |
| **核心机制** <br> | Figma MCP Server 暴露设计数据，Claude Code 读取并生成代码 <br> | MasterGo Magic MCP 提供 DSL 数据，Claude Code 解析生成代码 <br> | Figma 内置 prompt-to-code，直接调用 Claude <br> |
| **token消耗** <br> | 只消耗claude的token <br> | 只消耗claude的token <br> | 消耗figma和claude的token <br> |
| **优点** <br> | figma对于设计组件的识别能力更强 <br> | 直接粘贴链接到claude code，最简洁，失真最少 <br> | figma对于设计组件的识别能力更强 <br> |
| **缺点** <br> | 需要将mastergo文件转化为figma文件，会失真 <br> | 组件识别能力不如figma <br> | 需要将mastergo文件转化为figma文件，失真较为严重 <br> |
| **使用心得** <br> | 1. MasterGo要使用getD2C不要使用getDSL方法，前者的还原度会更高 <br><br>2. figma和MasterGo设计命名和嵌套group要规范 <br><br> |

#### 方案实践

##### **1. C1首页**

| **路径** <br> | **路径 A** <br>Figma MCP + Claude Code <br> | **路径 B** <br>MasterGo MCP + Claude Code <br> | **路径 C** <br>Figma Make 内置 Claude模型 <br> | **设计原稿** <br> |
| --- | --- | --- | --- | --- |
| **生成效果** <br> | **还原度85%** <br> | **还原度90%** <br> | **还原度90%** <br> | - <br> |
| ![](asset:img01.webp) <br> | ![](asset:img02.webp) <br> | ![](asset:img03.webp) <br> | ![](asset:img04.webp) <br> |

‍

##### **2. C2首页**

难点：页面包含大量复杂PNG、SVG图形；文本信息偏多，排版难度大

| **路径** <br> | **路径 A** <br>Figma MCP + Claude Code <br> | **路径 B** <br>MasterGo MCP + Claude Code <br> | **路径 C** <br>Figma Make 内置 Claude模型 <br> | **设计原稿** <br> |
| --- | --- | --- | --- | --- |
| **生成效果** <br> | **还原度85%** <br> | **还原度90%** <br> | **还原度95%** <br> | - <br> |
| ![](asset:img05.webp) <br> | ![](asset:img06.webp) <br> | ![](asset:img07.webp) <br> | ![](asset:img08.webp) <br> |

#### 具体操作流程

| **路径A** <br>Figma MCP + Claude Code <br> | **说明** <br> | **截图** <br> |
| --- | --- | --- |
| **Step 1：安装与认证** <br> | 在终端中执行以下命令添加 Figma MCP： <br>claude mcp add --transport http figma https://mcp.figma.com/mcp <br>然后打开 Claude Code，输入 /mcp，选择 Figma，浏览器中完成 OAuth 认证。 <br> | ![](asset:img09.webp) <br> |
| **Step 2：获取设计稿链接** <br> | 在 Figma 中选中目标 Frame 或组件，右键选择「Copy link to selection」复制链接。 <br> | ![](asset:img10.webp) <br> |
| **Step 3：在 Claude Code 中生成代码** <br> | 将链接粘贴到 Claude Code 并描述需求： <br>「基于这个 Figma 设计稿，生成 React + Tailwind CSS 代码: \[figma-link\]」 <br> | ![](asset:img11.webp) <br> |
| **Step 4：打开html文件** <br> | 在 Claude Code 中开发完成后，可通过open /\~文件名称.html的方式打开html <br> | ![](asset:img12.webp) <br> |

‍

| **路径B** <br>MasterGo MCP + Claude Code <br> | **说明** <br> | **截图** <br> |
| --- | --- | --- |
| **Step 1：配置 MCP 服务** <br> | 直接在 Claude Code 对话，让他在 MCP 配置中添加： <br>{ "mcpServers": { "mastergo-magic-mcp": { <br>    "command": "npx", <br>    "args": \["-y", "@mastergo/magic-mcp", "--token=&lt;**YOUR_TOKEN**&gt;", <br>            "--url=https://mastergo.com"\], <br>    "env": {} } } } <br> <br> | ![](asset:img13.webp) <br>==记得用自己的token替换掉====**&lt;YOUR_TOKEN&gt;**== <br>Token 获取方式：登录 mastergo.com → 个人设置 → 安全设置 → 生成 API Token <br> |
| **Step 2：复制设计稿 URL** <br> | 在 MasterGo 中打开目标设计文件，复制特定 Frame 或 Component 的 URL <br> | ![](asset:img14.webp) <br> |
| **Step 3：在 Claude Code 中生成** <br> | 将 URL 粘贴到 Claude Code，结合 Prompt 生成代码： <br>「基于这个 MasterGo 设计稿，生成响应式 HTML + CSS: \[mastergo-url\]」 <br> | ![](asset:img15.webp) <br> |
| **Step 4：打开html文件** <br> | 在 Claude Code 中开发完成后，可通过open /\~文件名称.html的方式打开html <br> | ![](asset:img12.webp) <br> |

‍

| **路径C** <br>Figma Make 内置 AI <br> | **说明** <br> | **截图** <br> |
| --- | --- | --- |
| **Step 1：创建 Make 文件** <br> | 在 Figma 中新建 Make 文件（非传统 Design 文件）。 <br> <br> | ![](asset:img16.webp) <br> |
| **Step 2：选择 AI 模型** <br> | 在 Make 设置中选择底层 AI 模型。当前可选 Claude 4.6（UI 细节还原更好）或 Gemini 3（动效表现更佳）。 <br> | ![](asset:img17.webp) <br> |
| **Step 3：用 Prompt 生成原型** <br> | 用自然语言描述你想要的界面，例如： <br>「一个带登录表单、指标卡片和暗色模式切换的 SaaS Dashboard」 <br> | ![](asset:img18.webp) <br> |
| **Step 4：提取代码** <br> | 通过 Figma MCP 将 Make 文件中的代码资源提供给 Claude Code，作为生产代码的参考基础 <br> | ![](asset:img19.webp) <br> |

‍