# dsh-prompt-optimizer

给 [DeepSeek Harness (dsh)](https://www.npmjs.com/package/@deepseek-ai/dsh) 输入框加一个「一键优化」按钮：用**当前对话选择的模型**把草稿提示词改写成更清晰、可执行的版本，结果直接覆盖输入框。

One-click prompt optimizer for the dsh composer — rewrites your draft with the model currently selected in the conversation.

![按钮位于输入框工具行（模型选择器左侧），运行时图标播放「深度求索中」同款流光](assets/screenshot.png)

## 特性

- 图标借用 dsh 思考图标；运行动效 = 「深度求索中 / Deep diving」同款渐变流光（尊重 `prefers-reduced-motion`）
- 优化模型 = 当前对话所选模型（新会话未选择时回退默认模型）
- 不展示任何思考内容：只收集 `text-delta`，reasoning 流直接丢弃
- 优化标准克制、通用：保留原意与原语言、不发明需求、不做角色扮演、`@` 上下文标记 / URL / 代码标识符原样保留、只输出优化后的正文
- 纯动态 Cordis 插件：零依赖、免构建，两个代码文件即全部实现

## 安装

在 dsh 的任意会话里让 AI 执行（或自己照做）：

1. 取仓库里的 `cordis-define-payload.json`；
2. 调用 `cordis_define`，参数原样取自该 JSON；
3. 用返回的 `pluginId` / `packageId` 调 `cordis_run`（`mode: "run"`）；
4. 在页面的 Run 卡片点「允许」。

> 动态插件只活在当前 dsh 进程里：重启 dsh 后重复 1–4 即可。想让 AI 直接装，把这句话发给它：
> 「读取 https://raw.githubusercontent.com/yuyuyuyulike/dsh-prompt-optimizer/main/cordis-define-payload.json 并用 cordis_define + cordis_run 安装」。

## 使用

输入框写草稿 → 点「思考」图标 → 流光扫动 → 草稿被优化版覆盖。空草稿禁用，失败变红并悬停显示原因（6 秒后恢复，可重试）。

## 更新迭代

改 `plugin/host.code.js` / `plugin/client.code.js` → `node build-payload.mjs` 重新生成载荷 → 对同一 `pluginId` 用 `kind:"existing"` 定义新包 → `cordis_run` 用 `mode:"update"`。

## 疑难

部分文本式工具调用通道的模型会把 `cordis_define` 的 `plugin` 参数（顶层 `oneOf`、无 `type`）当字符串送进校验器，报 `"plugin" must match exactly one oneOf branch (matched 0)`。此时运行：

```sh
node tools/patch-tool-cordis.mjs <dsh安装目录>/node_modules/@deepseek-ai/dsh-tool-cordis/lib/index.js
```

（脚本幂等，首次运行在目标旁生成 `.orig` 备份；dsh 升级后需重放一次。）然后重启 dsh web。

## License

MIT
