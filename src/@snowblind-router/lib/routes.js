import { html } from "@snowblind/core";
function Routes(props) {
    return () => html `<div>
		${props.children}
	</div>`;
}
export { Routes };
