import { Component } from "./component";
import { UpdateDispatcher } from "./shared-internals";

function render(parent: HTMLElement, element: Component) {
	UpdateDispatcher.next(element);
	let rendered = element.render();
	parent.appendChild(rendered);
	element.didUpdate()
	return rendered;
}

export { render }