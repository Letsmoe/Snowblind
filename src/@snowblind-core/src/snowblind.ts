import { iSnowblind } from "./types.js";

import {
	UpdateDispatcher,
	Observable,
	Reference,
} from "./shared-internals.js";

declare global {
	interface Window {
		typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
	}
}

class Component {
	private didUpdateOnce: boolean = false;
	private didMountCallbacks: any[] = [];
	private didUpdateCallbacks: any[] = [];
	private willUnmountCallbacks: any[] = [];
	node: HTMLElement;
	generator: Function;
	constructor(
		generator: any
	) {
		this.generator = generator;
		/**
		 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
		 */
		UpdateDispatcher.next(this);
		UpdateDispatcher.restore();
	}
	transitionFunction?: { leave: Function; from: Function; render: Function };

	render() {
		this.node = this.generator();
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
		if (this.didUpdateOnce) {
			this.didUpdateCallbacks.forEach((callback) => callback(this.node));
		} else {
			this.didMountCallbacks.forEach((callback) => callback(this.node));
			this.didUpdateOnce = true;
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
	props = props || {}
	let node: HTMLElement;
	if (typeof initializer === "function") {
		// Initialize the component by calling the initializer function.
		props["children"] = children;
		node = initializer(props);
		return new Component(node);
	} else {
		node = document.createElement(initializer);
	}
	if (props) {
		for (const [key, value] of Object.entries(props)) {
			if (typeof value === "function") {
				// Apply an event listener to run the passed callback
				node[key.toLowerCase()] = value
			} else if (value instanceof Observable) {
				value.subscribe((newValue) => {
					node.setAttribute(key, newValue);
				})
				node.setAttribute(key, value.value);
			} else if (value instanceof Reference) {
				value.current = node;
			} else if (typeof value === "object") {
				if (key === "style") {
					for (let [styleKey, styleValue] of Object.entries(value)) {
						if (styleValue instanceof Observable) {
							styleValue.subscribe((newValue) => {
								node.style[styleKey] = newValue;
							})
						}
						if (styleValue === null) {
							styleValue = "none"
						} else  if (typeof styleValue === "number") {
							styleValue = styleValue + "px"
						}
						node.style[styleKey] = styleValue;
					}
				} else if (key === "props") {
					for (const [styleKey, styleValue] of Object.entries(value)) {
						if (styleValue instanceof Observable) {
							styleValue.subscribe((newValue) => {
								node[styleKey] = newValue;
							})
						}
						node[styleKey] = styleValue;
					}
				} else {
					node.setAttribute(key, JSON.stringify(value));
				}
			} else {
				node.setAttribute(key, value.toString());
			}
		}
	}
	const loopChildren = (children: any[]) => {
		for (const child of children) {
			if (Array.isArray(child)) {
				loopChildren(child);
			} else if (child instanceof Component) {
				render(node, child);
				child.didUpdate();
			} else if (child instanceof HTMLElement) {
				node.appendChild(child);
			} else if (child.__proxy instanceof Observable) {
				// Store the generated item in a variable so we can access it on each update.
				let lastItem = document.createTextNode(child)
				child.__proxy.subscribe((newValue: any) => {
					// Change the value of the child node.
					lastItem.textContent = newValue;
				})
				node.appendChild(lastItem);
			} else {
				node.appendChild(document.createTextNode(child));
			}
		}
	}
	loopChildren(children.flat(Infinity));
	return node;
}

const Snowblind: iSnowblind = {
	Component: Component,
	Fragment: SnowblindFragment,
	make: make,
	render: render
};

export { Snowblind };
