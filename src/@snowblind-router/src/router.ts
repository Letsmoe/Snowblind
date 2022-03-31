import { html } from "@snowblind/core"

function WindowRouter(props : {children: HTMLElement[]}) {

	return () => html`<div>
		${props.children}
	</div>`
}

export {WindowRouter}