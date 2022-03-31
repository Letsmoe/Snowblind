import { html } from "@snowblind/core";
function WindowRouter(props) {
    return () => html `<div>
		${props.children}
	</div>`;
}
export { WindowRouter };
