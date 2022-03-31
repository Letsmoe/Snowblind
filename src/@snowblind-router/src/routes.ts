import { html } from "@snowblind/core"

function Routes(props : {children : HTMLElement[]}) {
	return () => html`<div>
		${props.children}
	</div>`
}

export {Routes}