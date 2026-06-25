# 01-基础建设：Claude code 本地部署接minimax模型+Obsidian安装并接入Claude code全流程

# 一、Claude code 本地部署接minimax模型

## 1、Claude code 本地部署

### 基础准备

1. 先准备一个**科学的网络环境**

2.到这里安装最新版本的 Node.js，地址： <https://nodejs.org/>

### 正式安装

在终端里，粘贴下面的命令，然后回车。

```PlainText
npm install -g @anthropic-ai/claude-code
```

这里可能会报错，但报错原因各不相同，可以直接把报错信息复制到Claude ai或者豆包等chat bot中，他们会给出命令行，一步一步复制到终端即可。如果中途有其他报错，再复制到bot中，让它再给命令，直到无报错，再验证是否安装成功。

验证安装是否成功的方法： 安装完成后，输入 `claude --version`，如果出现版本号，则代表安装成功。

## 2、Claude code接入minimax模型

### 前提

1. 已成功部署安装Claude code

2.minimax官网注册登录：官网地址： <https://www.minimaxi.com/>

3.注册后，购买套餐后：选择套餐（可以选择29元/月，使用感受一下），使用以下链接可享9折： <https://platform.minimaxi.com/subscribe/token-plan?code=IXJvM7jxO3&source=link>

### 正式接入minimax

**步骤 1：备份旧配置（避免误操作）**

运行

```PlainText
# 备份原有配置文件
cp ~/.claude/settings.json ~/.claude/settings.json.bak
cp ~/.claude.json ~/.claude.json.bak 2>/dev/null
```

**步骤 2：创建 / 覆盖正确的 **`**settings.json**`

在终端运行以下命令，注意几那个YOUR_MINIMAX_API_KEY替换为你的minimax真实密钥

```PlainText
# 直接写入正确配置（替换 YOUR_MINIMAX_API_KEY 为真实密钥）
cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_MINIMAX_API_KEY",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_MODEL": "abab6.5s-chat",
    "ANTHROPIC_SMALL_FAST_MODEL": "abab6.5s-chat",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "abab6.5s-chat",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "abab6.5s-chat",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "abab6.5s-chat"
  },
  "hasCompletedOnboarding": true
}
EOF
```

**步骤 3：删除多余的 **`**.claude.json**`**（避免冲突）**

运行

```PlainText
rm -f ~/.claude.json
```

**步骤 4：验证配置格式（关键）**

运行

```PlainText
# 验证 JSON 合法性，无报错则格式正确
python3 -m json.tool ~/.claude/settings.json
```

**步骤 5：启动 Claude Code 测试**

运行

```PlainText
# 退出旧会话（若有），重启 Claude Code
claude code
```

# 二、Obsidian安装

官网下载直接安装即可 <https://obsidian.md/>

# 三、Obsidian接Claude code

1. 打开obsidian，点击左下角设置图标，找到第三方插件，点进进入社区插件市场，搜索“BRAT”插件并安装。

2.安装后启用，找到并点击“添加beta插件”按钮，在第一行“Repository（代码库）”输入框处粘贴输入“derek-larson14/obsidian-claude-sidebar”后点击按钮“添加插件”

3.此时，你就可以在obsidian左侧看到一个小机器人的图标，点击即可调用调用Claude code。