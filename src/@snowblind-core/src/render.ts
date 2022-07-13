import { Component } from "./component";
import { UpdateDispatcher } from "./shared-internals";

function render(parent: HTMLElement, element: Component | DocumentFragment) {
	if (element instanceof DocumentFragment) {
		parent.appendChild(element);
		return element;
	} else {
		UpdateDispatcher.next(element);
		let rendered = element.render();
		parent.appendChild(rendered);
		element.didUpdate()
		return rendered;
	}
}

export { render }