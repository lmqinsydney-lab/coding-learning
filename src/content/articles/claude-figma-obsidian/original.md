# 02-基础建设：打通 Claude code + Figma + Obsidian，实现设计自动化与设计记忆沉淀

这篇文档主要介绍如何在 Obsidian 中接入 Claude Code + Figma MCP，通过自然语言指令驱动 Figma 设计，并将设计过程与结果自动沉淀为设计记忆文档，构建 AI 驱动的设计工作流。

前置条件：

需要先完成 [Claude code 本地部署接minimax模型+Obsidian安装并接入Claude code全流程](https://cooper.didichuxing.com/knowledge/2202213537030/2207248726088) 中的 Claude Code 部署与 Obsidian 插件安装。

---

## 一、Figma MCP 接入

### 1.1 安装 Figma MCP 插件

在 Claude Code 中执行以下命令安装 Figma MCP：

```Bash
claude plugin install figma@claude-plugins-official
```

安装完成后，重启 Obsidian。

### 1.2 授权 Figma 访问

重启后，在 Claude Code 中输入以下命令找到 Figma MCP 进行授权：

```PlainText
/plugin
```

或在对话中直接说明需要授权 Figma MCP。

授权说明

Figma MCP 需要在你的 Figma 账号中进行 OAuth 授权。授权后，Claude Code 便具备读取 Figma 设计、创建 FigJam 图表等核心功能。**整个过程中无需打开 Figma 。**

### 1.3 核心能力概览

| 功能 <br> | 说明 <br> |
| --- | --- |
| **读取设计** <br> | 获取设计文件的节点结构、截图、变量和样式 <br> |
| **生成截图** <br> | 对指定节点或页面生成可视化预览 <br> |
| **创建图表** <br> | 在 FigJam 中生成流程图、时序图、状态图等 <br> |
| **代码映射** <br> | 建立 Figma 组件与代码组件的关联（Code Connect） <br> |

---

## 二、工作流：一句指令，AI 自动完成设计和记录

### 2.1 核心使用方式

**在 Claude Code 中输入以下格式的指令：**

调用 Figma 创建新的画布，在此画布中设计「登录注册流程优化」页面，并生成一个设计记忆文档，存入 Obsidian 中

**Claude Code 将自动完成以下工作：**

1. 在你的 Figma 账号中创建新画布

2.根据指令设计相应页面

3.在 Obsidian 中生成设计记忆文档，包含：

- 设计文件信息（文件 Key、节点 ID）

- 页面模块与进度追踪

- 设计规范（颜色、字体、间距等 token）

- 继续任务与下一步

### 2.2 设计记忆文档结构

**Claude Code 生成的设计记忆文档通常包含以下模块：**

- **基本信息** — 文件链接、创建时间、设计目标

- **模块进度** — 各页面/组件的完成状态

- **设计规范** — 提取的颜色、字体、间距等 token

- **待办事项** — 还需要优化的细节

- **继续方式** — 如何在此基础上继续设计

另外，你可以进一步要求 Claude Code 生成设计系统文档、组件清单，或与其他笔记建立链接。

---

## 三、其他编辑器配置

### 3.1 Cursor 配置

- `Cmd+Shift+P` → `Open chat`

- 输入 `/add-plugin figma` 安装

- `Settings` → `MCP` → `Connect` → 完成授权

### 3.2 VS Code 配置

前置要求

需要先安装 GitHub Copilot 扩展。

- `Cmd+Shift+P` → `MCP: Open User Configuration`

- 粘贴 Figma MCP 的 JSON 配置

- 保存 → `Start` → 完成授权

为什么推荐 Obsidian 作为主要入口？

Obsidian 的双链笔记与 AI 对话天然结合——设计诉求、过程及结果可以直接沉淀为笔记，笔记中的内容也可以反向触发 AI 设计。Cursor 和 VS Code 更适合纯代码开发场景。

---

## 四、进阶用法

### 4.1 FigJam 图表生成

使用 `generate_diagram` 工具可直接在 FigJam 中创建图表：

```PlainText
使用 generate_diagram 在 FigJam 中创建一个用户旅程图
```

支持的图表类型：`flowchart`、`sequenceDiagram`、`stateDiagram`、`gantt`

### 4.2 设计稿读取与转译

读取 Figma 设计稿后，要求 Claude Code 将其转译为代码组件或设计系统规范：

```PlainText
读取 Figma 设计稿，为其生成 Tailwind CSS 实现方案
```

### 4.3 Code Connect 映射

建立 Figma 组件与代码组件的关联，便于设计与开发协同：

```PlainText
使用 add_code_connect_map 将 Figma 按钮组件映射到代码中的 Button 组件
```

**以上用法均可通过Claude code记录于obsidian，形成设计记忆文档**

---

## 五、相关资源

- [Claude code 本地部署接minimax模型+Obsidian安装并接入Claude code全流程](https://cooper.didichuxing.com/knowledge/2202213537030/2207248726088)

---

**小结**

通过 Figma MCP，Claude Code 成为了真正的 AI 设计搭档——你只需描述需求，AI 在 Figma 中完成设计，并将过程与结果沉淀为可追溯的设计记忆。这一工作流打通了「想法 → 设计 → 记录」的完整闭环。