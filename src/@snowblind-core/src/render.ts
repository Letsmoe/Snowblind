import { Component } from "./component";
import { UpdateDispatcher } from "./shared-internals";

function render(parent: HTMLElement, element: Component | DocumentFragment) {
	if (element instanceof Component) {
		UpdateDispatcher.next(element);
		let rendered = element.render();
		parent.appendChild(rendered);
		element.didUpdate()
		return rendered;
	} else {
		parent.appendChild(element);
		return element;
	}
}

export { render }