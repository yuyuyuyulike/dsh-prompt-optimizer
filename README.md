# dsh-prompt-optimizer

给 [DeepSeek Harness (dsh)](https://www.npmjs.com/package/@deepseek-ai/dsh) 聊天输入框加一个「一键优化」思考按钮：写好草稿 → 点一下 → 用**当前对话所选模型**把提示词优化后直接覆盖回输入框。

![界面位置](assets/screenshot.png)

## 特点

- 按钮在输入框右侧提交键旁，沿用 dsh 思考图标；运行时是「深度求索中」同款流光动效（尊重 `prefers-reduced-motion`）
- 模型跟随当前对话的选择（含 reasoning effort）；优化请求不进对话上下文，也不展示思考内容（reasoning 流直接丢弃）
- 优化结果直接覆盖草稿；草稿本来清楚时只做轻量润色
- 失败时按钮变红，悬停可看原因，6 秒后自动恢复，可重试
- 优化标准克制、通用：不改写原意、不发明需求、不做角色扮演，`@` 标记 / URL / 代码标识符原样保留
- 纯静态安装：重启 dsh 不会消失；无第三方依赖、免构建

## 安装

前置：机器上有 `pnpm`，且已在用 `dsh web`（profile `web`）。

```powershell
# 1. 下载本仓库（zip 解压或 git clone）
# 2. 把该目录挂到 web profile（绝对路径）
dsh plugin --profile web add C:\path\to\dsh-prompt-optimizer
# 3. 重启 dsh web，刷新页面即可看到按钮
```

## 卸载

```powershell
dsh plugin --profile web remove dsh-prompt-optimizer
```

然后重启 dsh web。

## 实现一览

| 文件 | 作用 |
| --- | --- |
| `cordis.patch.yml` | 向 profile 组合插入一行宿主 row |
| `lib/index.js` | 宿主半边：经 `connection.rpc.handle` 注册认证 RPC 通道 `/prompt-optimizer/optimize`，调 `llm.stream` 生成优化结果 |
| `lib/client.js` | 浏览器半边：module loader 工厂，向 `conversation.input.right` 插槽注册按钮组件 |
| `package.json` | `dsh.bundle`（宿主补丁层）+ `dsh.client`（浏览器入口）声明 |

浏览器到宿主只有一种报文：`prompt → { ok, text | error }`，不向页面暴露任何宿主对象。

## License

MIT
