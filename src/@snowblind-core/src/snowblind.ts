import { iSnowblind } from "./types.js";
export { useRef, useState, onRender } from "./hooks/index.js";

import {
	UpdateDispatcher,
	Observable,
	SnowblindRef,
} from "./shared-internals.js";

declare global {
	interface Window {
		typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
	}
}

class Component {
	_didUpdateOnce: boolean;
	didMountCallbacks: any[];
	didUpdateCallbacks: any[];
	willUnmountCallbacks: any[];
	props: any;
	node: HTMLElement;
	generator: Function;
	constructor(
		props: { children?: any[] },
		generator: Function
	) {
		this._didUpdateOnce = false;
		this.props = props
		this.generator = generator;
		this.didMountCallbacks = [];
		this.didUpdateCallbacks = [];
		this.willUnmountCallbacks = [];
		/**
		 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
		 */
		UpdateDispatcher.next(this);
		UpdateDispatcher.restore();
	}
	transitionFunction?: { leave: Function; from: Function; render: Function };

	render() {
		this.node = this.generator(this.props);
		return this.node;
	}

	onComponentDidMount(callback: Function) {
		this.didMountCallbacks.push(callback);
	}

	onComponentDidUpdate(callback: Function) {
		this.didUpdateCallbacks.push(callback);
	}
	onComponentWillUnmount(callback: Function) {
		this.willUnmountCallbacks.push(callback);
	}

	didUpdate() {
		if (this._didUpdateOnce) {
			this.didUpdateCallbacks.forEach((callback) => callback(this.node));
		} else {
			this.didMountCallbacks.forEach((callback) => callback(this.node));
			this._didUpdateOnce = true;
		}
	}
}

function SnowblindFragment() {
	return document.createDocumentFragment();
}

function render(parent: HTMLElement, element: Component) {
	UpdateDispatcher.next(element);
	parent.appendChild(element.render());
	element.didUpdate()
}

const eventBus = {
	on(event: string, callback: Function) {
		document.addEventListener(event, (e: Event) =>
			callback(e instanceof CustomEvent ? e.detail : undefined)
		);
	},
	dispatch(event: string, data: any) {
		document.dispatchEvent(
			new CustomEvent(event, {
				detail: data,
			})
		);
	},
	remove(event: string, callback: EventListenerOrEventListenerObject) {
		document.removeEventListener(event, callback);
	},
};

/**
 * A function that generates an HTML node from given inputs.
 * @param initializer The HTML type of the component or an initializer function to be called generating the HTML content.
 * @param props An object containing all attributes supposed to be assigned to the component.
 * @param children An array of child elements.
 * @returns The generated node as HTMLElement.
 */
function make(
	initializer: string | ((props: { [key: string]: any }) => HTMLElement),
	props: Object | null,
	...children: any[] | null
) {
	let node: HTMLElement;
	if (typeof initializer === "function") {
		return new Component(props, initializer);
	} else {
		node = document.createElement(initializer);
	}
	if (props) {
		for (const [key, value] of Object.entries(props)) {
			if (typeof value === "function") {
				// Try trimming the "on" from the key name
				const eventName = key.replace(/^on/, "").toLowerCase();
				node.addEventListener(eventName, value);
			} else if (value instanceof Observable) {
				value.subscribe((newValue) => {
					node.setAttribute(key, newValue);
				})
				node.setAttribute(key, value.value);
			} else if (key === "ref" || value instanceof SnowblindRef) {
				value.current = node;
			} else {
				node.setAttribute(key, value.toString());
			}
		}
	}
	for (const child of children.flat(Infinity)) {
		if (child instanceof Component) {
			render(node, child);
			child.didUpdate();
		} else if (child instanceof HTMLElement) {
			node.appendChild(child);
		} else if (child instanceof Observable) {
			// Store the generated item in a variable so we can access it on each update.
			let lastItem = document.createTextNode(child.value)
			child.subscribe((newValue) => {
				// Change the value of the child node.
				lastItem.textContent = newValue;
			})
			node.appendChild(lastItem);
		} else {
			node.appendChild(document.createTextNode(child));
		}
	}
	return node;
}

const Snowblind: iSnowblind = {
	Component: Component,
	Fragment: SnowblindFragment,
	make: make,
	render: render,
	eventBus: eventBus,
};

export { Snowblind };
