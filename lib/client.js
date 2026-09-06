/* dsh-prompt-optimizer — browser half: one module-loader factory registration. */
window.__ModuleLoader__.load({
	id: "dsh-prompt-optimizer",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const React = require("react");
		const CHANNEL = "/prompt-optimizer";
		const inject = ["slots", "connection"];

		// Shipped static-client convention: one idempotent <style data-plugin-css> tag.
		function injectCss(css) {
			const tagId = "dsh-prompt-optimizer";
			if (typeof document !== "undefined" && document.querySelector('style[data-plugin-css="' + tagId + '"]') === null) {
				const tag = document.createElement("style");
				tag.setAttribute("data-plugin-css", tagId);
				tag.textContent = css;
				document.head.appendChild(tag);
			}
		}

		const apply = (ctx) => {
    const slots = ctx.slots
    const connection = ctx.connection

    // One authenticated unary call on the shared Connection transport.
    function optimizeCall(args) {
      return connection.rpc.call(CHANNEL, 'optimize', args).then((response) => {
        if (response === null || typeof response !== 'object' || response.ok !== true) {
          const failure = response !== null && typeof response === 'object' ? response.error : null
          const message = failure !== null && typeof failure === 'object' && typeof failure.message === 'string' && failure.message !== '' ? failure.message : '宿主调用失败'
          return { ok: false, error: message }
        }
        return response.value
      })
    }

    // dsh 思考图标（IconThinkOutline16）的两条路径，viewBox 0 0 16 16
    const THINK_PATH_DOT = 'M8.00192 6.64454C8.75026 6.64454 9.35732 7.25169 9.35739 8.00001C9.35739 8.74838 8.7503 9.35548 8.00192 9.35548C7.25367 9.35533 6.64743 8.74829 6.64743 8.00001C6.6475 7.25178 7.25371 6.64468 8.00192 6.64454Z'
    const THINK_PATH_OUTLINE = 'M9.97165 1.29981C11.5853 0.718916 13.271 0.642197 14.3144 1.68555C15.3577 2.72902 15.2811 4.41466 14.7002 6.02833C14.4707 6.66561 14.1504 7.32937 13.75 8.00001C14.1504 8.67062 14.4707 9.33444 14.7002 9.97169C15.2811 11.5854 15.3578 13.271 14.3144 14.3145C13.271 15.3579 11.5854 15.2811 9.97165 14.7002C9.3344 14.4708 8.67059 14.1505 7.99997 13.75C7.32933 14.1505 6.66558 14.4708 6.02829 14.7002C4.41461 15.2811 2.72899 15.3578 1.68552 14.3145C0.642155 13.271 0.71887 11.5854 1.29977 9.97169C1.52915 9.33454 1.84865 8.67049 2.24899 8.00001C1.84866 7.32953 1.52915 6.66544 1.29977 6.02833C0.718852 4.41459 0.64207 2.729 1.68552 1.68555C2.72897 0.642112 4.41456 0.718887 6.02829 1.29981C6.66541 1.52918 7.32949 1.8487 7.99997 2.24903C8.67045 1.84869 9.33451 1.52919 9.97165 1.29981ZM12.9404 9.2129C12.4391 9.893 11.8616 10.5681 11.2148 11.2149C10.568 11.8616 9.89296 12.4391 9.21286 12.9404C9.62532 13.1579 10.0271 13.338 10.4121 13.4766C11.9146 14.0174 12.9172 13.8738 13.3955 13.3955C13.8737 12.9173 14.0174 11.9146 13.4765 10.4121C13.3379 10.0271 13.1578 9.62535 12.9404 9.2129ZM3.05856 9.2129C2.84121 9.62523 2.66197 10.0272 2.52341 10.4121C1.98252 11.9146 2.12627 12.9172 2.60446 13.3955C3.08278 13.8737 4.08544 14.0174 5.58786 13.4766C5.97264 13.338 6.37389 13.1577 6.7861 12.9404C6.10624 12.4393 5.43168 11.8614 4.78513 11.2149C4.13823 10.5679 3.55992 9.89313 3.05856 9.2129ZM7.99899 3.792C7.23179 4.31419 6.45306 4.95512 5.70407 5.70411C4.95509 6.45309 4.31415 7.23184 3.79196 7.99903C4.3143 8.76666 4.95471 9.54653 5.70407 10.2959C6.45309 11.0449 7.23271 11.6848 7.99997 12.207C8.76725 11.6848 9.54683 11.0449 10.2959 10.2959C11.0449 9.54686 11.6848 8.76729 12.207 8.00001C11.6848 7.23275 11.0449 6.45312 10.2959 5.70411C9.5465 4.95475 8.76662 4.31434 7.99899 3.792ZM5.58786 2.52344C4.08533 1.98255 3.08272 2.12625 2.60446 2.6045C2.12621 3.08275 1.98252 4.08536 2.52341 5.5879C2.66189 5.97253 2.8414 6.37409 3.05856 6.78614C3.55983 6.10611 4.1384 5.43189 4.78513 4.78516C5.43186 4.13843 6.10606 3.55987 6.7861 3.0586C6.37405 2.84144 5.97249 2.66192 5.58786 2.52344ZM13.3955 2.6045C12.9172 2.12631 11.9146 1.98257 10.4121 2.52344C10.0272 2.66201 9.62519 2.84125 9.21286 3.0586C9.8931 3.55996 10.5679 4.13827 11.2148 4.78516C11.8614 5.43172 12.4392 6.10627 12.9404 6.78614C13.1577 6.37393 13.338 5.97267 13.4765 5.5879C14.0174 4.08549 13.8736 3.08281 13.3955 2.6045Z'
    const MASK_SVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='" + THINK_PATH_DOT + "' fill='black'/><path d='" + THINK_PATH_OUTLINE + "' fill='black' fill-rule='evenodd'/></svg>"
    const MASK_URL = 'url("data:image/svg+xml,' + encodeURIComponent(MASK_SVG) + '")'

    // 运行态动效 = dsh「深度求索中 / Deep diving」的同款渐变流光（1.8s linear 扫过）
    injectCss([
      '.dsh-po-btn{background:transparent;width:28px;height:28px;color:var(--dsw-alias-label-primary);cursor:pointer;border:none;border-radius:999px;flex:none;display:grid;place-items:center;padding:0}',
      '.dsh-po-btn:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-solid,rgba(128,128,128,.12))}',
      '.dsh-po-btn:disabled{opacity:.5;cursor:default}',
      '.dsh-po-btn[data-error="true"]{color:var(--dsw-alias-state-error-primary)}',
      '.dsh-po-run{display:block;width:16px;height:16px;background:linear-gradient(90deg, var(--dsw-static-deepseek-500,#4d6bfe) 0%, var(--dsw-static-deepseek-500,#4d6bfe) 40%, var(--dsw-static-deepseek-200,#b3c2ff) 50%, var(--dsw-static-deepseek-500,#4d6bfe) 60%, var(--dsw-static-deepseek-500,#4d6bfe) 100%);background-size:250% 100%;background-position:100% 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-position:center;mask-position:center;-webkit-mask-size:16px 16px;mask-size:16px 16px;animation:dsh-po-shimmer 1.8s linear infinite}',
      '@keyframes dsh-po-shimmer{to{background-position:0 0}}',
      '@media (prefers-reduced-motion:reduce){.dsh-po-run{animation:none;background-position:50% 0}}'
    ].join('\n'))

    function ThinkIcon() {
      return React.createElement('svg', {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': true,
        style: { display: 'block' }
      },
        React.createElement('path', { d: THINK_PATH_DOT, fill: 'currentColor' }),
        React.createElement('path', { fillRule: 'evenodd', clipRule: 'evenodd', d: THINK_PATH_OUTLINE, fill: 'currentColor' })
      )
    }

    function OptimizeButton(props) {
      const useInput = props.useInput
      const inputActions = props.inputActions
      const useProjection = props.useProjection
      const sessionId = props.sessionId
      const draft = useInput((s) => s.draft)
      const selection = useProjection('modelSelection')
      const [running, setRunning] = React.useState(false)
      const [error, setError] = React.useState('')
      const hasText = typeof draft === 'string' && draft.trim() !== ''
      const disabled = running || !hasText
      const title = running
        ? '优化中…'
        : error !== ''
          ? '优化失败：' + error + '（可重试）'
          : hasText
            ? '一键优化提示词'
            : '先在输入框写点什么，再点我优化'
      const onClick = () => {
        if (running || !hasText) return
        const source = draft
        // 包私有 RPC 只走无损 JSON：可选字段缺失时整个键都不写，绝不放 undefined。
        const pickStr = (v) => (typeof v === 'string' && v !== '' ? v : null)
        const cur = selection && selection.next !== null && selection.next !== undefined
          ? selection.next
          : selection ? selection.lastUsed : null
        let sentSelection = null
        if (cur !== null && cur !== undefined) {
          const provider = pickStr(cur.provider)
          const model = pickStr(cur.model)
          if (provider !== null && model !== null) {
            const effort = pickStr(cur.reasoningEffort)
            sentSelection = { provider, model, ...(effort === null ? {} : { reasoningEffort: effort }) }
          }
        }
        const callArgs = { prompt: source }
        const sid = pickStr(sessionId)
        if (sid !== null) callArgs.sessionId = sid
        if (sentSelection !== null) callArgs.selection = sentSelection
        setRunning(true)
        setError('')
        optimizeCall(callArgs).then((result) => {
          setRunning(false)
          const value = result === null || typeof result !== 'object' ? {} : result
          if (value.ok === true && typeof value.text === 'string' && value.text !== '') {
            if (value.text !== source) inputActions.setDraft(value.text)
            return
          }
          const message = typeof value.error === 'string' ? value.error : '未知错误'
          setError(message)
          if (timer !== undefined) setTimeout(() => setError(''), 6000)
        }, (reason) => {
          setRunning(false)
          setError(reason instanceof Error ? reason.message : String(reason))
          if (timer !== undefined) setTimeout(() => setError(''), 6000)
        })
      }
      return React.createElement('button', {
        type: 'button',
        className: 'dsh-po-btn',
        'aria-label': '一键优化提示词',
        'data-error': error !== '' ? 'true' : undefined,
        disabled: disabled,
        title: title,
        onClick: onClick
      }, running
        ? React.createElement('span', {
            className: 'dsh-po-run',
            'aria-hidden': true,
            style: { WebkitMaskImage: MASK_URL, maskImage: MASK_URL }
          })
        : ThinkIcon())
    }

    slots.inject('conversation.input.right', () => slots.register(
      { name: 'conversation.input.right', id: 'prompt-optimizer', order: 50, label: '提示词优化' },
      (props) => React.createElement(OptimizeButton, props)
    ))
		};
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
