import RenderAssignment from "./render-assignment.js";
import { Observer } from "./observer.js";
import {SnowblindComponent, ISnowblindElement} from "./types"

export {
	useRef,
	useState,
	useEffect,
} from "./hooks/index.js";

import {
	UpdateDispatcher,
	exposedComponents,
	Observable
} from "./shared-internals.js";

declare global {
	interface Window {
		typeCheck: (
			props: {},
			propTypes: {},
			defaultProps: {}
		) => never | {};
	}
}

/**
 * Exposes a component to be grabbed by the initial render process.
 * @param components List of components to add
 * @param optNames Optional list of names if they shall not be auto-retrieved from the components class name.
 */
function expose(
	components: any,
	optNames: string[] = []
) {
	optNames = Array.from([optNames]).flat();

	var i = 0;
	for (const key in components) {
		const component = components[key];
		var name = (
			typeof optNames[i] === "undefined" ? key : optNames[i]
		).toLowerCase();
		exposedComponents[name] = component;
	}
};

/**
 * Add component to global scope;
 */
const Snowblind = {
	Component: class Component implements SnowblindComponent {
		hasTheme: any;
		_maxCopies: number;
		_usesTransition: boolean;
		didMountCallbacks: any[];
		didUpdateCallbacks: any[];
		willUnmountCallbacks: any[];
		_Observer: Observer;
		props: any;
		Renderer: RenderAssignment;
		_generatorFunction: any;
		constructor(
			props: { children?: any[] },
			generator: Function,
			options: { hasTheme: boolean; replace: ISnowblindElement } = {
				hasTheme: false,
				replace: undefined,
			}
		) {
			const globalSelf = exposedComponents[generator.name.toLowerCase()];
			/**
			 * Convert expected properties
			 */
			if (globalSelf) {
				const propTypes = globalSelf.propTypes;
				if (propTypes && window.typeCheck) {
					props = window.typeCheck(
						props,
						propTypes,
						globalSelf.defaultProps
					);
				}
			}

			/**
			 * Custom theme when object created from styled() function
			 */
			this.hasTheme = options.hasTheme;
			this._maxCopies = Infinity;
			/**
			 * Check if obj is a function, then it needs execution
			 */
			this._usesTransition = false;

			/**
			 * Setup arrays for event listening
			 */
			this.didMountCallbacks = [];
			this.didUpdateCallbacks = [];
			this.willUnmountCallbacks = [];
			/**
			 * Initialize empty dependencies object for useEffect calls
			 */
			if (options.replace instanceof HTMLElement) {
				props.children = Array.from(options.replace.childNodes)
			}
			this._Observer = new Observer(props || {});
			this.props = this._Observer._value;

			this.Renderer = new RenderAssignment(this, options);
			/**
			 * Try to find a ref to the item.
			 */
			const ref = options.replace.isReferenceTo;
			this._generatorFunction = generator(props, ref);
			/**
			 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
			 */
			UpdateDispatcher.next(this);
			UpdateDispatcher.restore();

			this.Renderer.Render();
		}
		Node: HTMLElement;
		transitionFunction?: { leave: Function; from: Function; render: Function; };

		onComponentDidMount(callback: Function) {
			this.didMountCallbacks.push(callback);
		}

		onComponentDidUpdate(callback: Function) {
			this.didUpdateCallbacks.push(callback);
		}
		onComponentWillUnmount(callback: Function) {
			this.willUnmountCallbacks.push(callback);
		}

		render(...args: any[]) {
			return this._generatorFunction();
		}
	},
	createContext(initialValue) {
		if (typeof initialValue !== "object") {
			throw new TypeError(
				"`createContext` may only be used with objects."
			);
		}

		// Bind the object to an observable to update all references later on.
		const provider = new Observable(initialValue);

		const changeCallback = (obj: any) => {
			provider.next(obj);
		};

		// Observe object changes with an observer
		const newObject = new Observer(initialValue, changeCallback);
		return [newObject._value, provider];
	},
	/**
	 * Searches the DOMTree recursively for components, this will ensure parent nodes will be rendered and their children will be included in the render afterwards
	 */
	renderAllIn(element = document.body) {
		const recurse = (parentList) => {
			// Filter out scripts
			for (const parent of parentList) {
				if (parent instanceof HTMLScriptElement) {
					continue;
				}
				let nodeName = parent.nodeName.toLowerCase();
				if (exposedComponents.hasOwnProperty(nodeName)) {
					// Element nodeName in the names of exposed components, it must be one!
					let component = exposedComponents[nodeName];
					let isFunction = typeof component === "function";
					if (isFunction) {
						const props = this.getNodeProperties(parent);
						new Snowblind.Component(props, component, {
							hasTheme: false,
							replace: parent,
						});
					}
				} else {
					// No component here! Let's go deeper!
					recurse(Array.from(parent.children));
				}
			}
		};

		recurse(Array.from(element.children));
	},
	getNodeProperties(node: HTMLElement): Object {
		return Object.fromEntries(
			Array.from(node.attributes).map((x) => {
				return [x.name, x.value];
			})
		);
	},
	eventBus: {
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
	},
	createElement: (type: string, props: Object, children = []) => {
		let element: HTMLElement = document.createElement(type);
		for (let name in props) {
			if (Object.hasOwnProperty.call(props, name)) {
				let value = props[name];
				if (value !== null && value !== undefined) {
					if (name == "text") {
						element.innerText = value;
					} else {
						let trimmedName = name.substring(1).replace("@", "");
						if (name[0] === "@") {
							element.addEventListener(name, (e) => {
								if (
									name[1] == "@" &&
									(e.target as HTMLElement).isEqualNode(
										element
									)
								) {
									value(element, e);
								} else {
									value(element, e);
								}
							});
						} else if (name[0] === ".") {
							element[trimmedName] = value;
						} else if (name[0] === "?") {
							if (value) {
								element.setAttribute(trimmedName, value);
							}
						} else if (typeof value === "object") {
							for (const i in value) {
								element.setAttribute(i, value[i]);
							}
						} else {
							element.setAttribute(name, value);
						}
					}
				}
			}
		}

		for (let node of children) {
			if (typeof node === "function") {
				// Check if a component reference was passed.
			} else if (node instanceof HTMLElement) {
				element.appendChild(node);
			}
		}
		return element;
	},
};

window.addEventListener("load", () => {
	Snowblind.renderAllIn();
});
export {Snowblind, expose};
