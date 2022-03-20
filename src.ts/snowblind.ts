interface Window {
	exposedComponents : Object,
	expose : Function
}


import RenderAssignment from "./render-assignment.js";
import {Observer} from "./observer.js";
import {
	typeCheck,
} from "../modules/typecheck.js";
import {
	html
} from "./html.js"

import {UpdateDispatcher} from "./shared-internals.js"
window.exposedComponents = {};

var style = document.createElement("style");
style.innerHTML = ".render-placeholder {display:none;}"
document.head.appendChild(style)

/**
 * Exposes a component to be grabbed by the initial render process.
 * @param {Array<Snowblind.Component>} components List of components to add
 * @param {Array<String>} optNames Optional list of names if they shall not be auto-retrieved from the components class name.
 */
window.expose = function (components, optNames) {
	components = Array.from([components]).flat();
	optNames = Array.from([optNames]).flat()

	for (let i = 0; i < components.length; i++) {
		const component = components[i];
		var name = (typeof optNames[i] === "undefined" ? component.name : optNames[i]).toLowerCase();
		window.exposedComponents[name] = component;
	}
}

/**
 * Add component to global scope;
 */

const Snowblind = {
	Component: class Component {
		constructor(obj, options = {}) {
			options = Object.assign({
				replace: false,
				isFunctionProps: {},
				hasTheme: false,
			}, options)

			this.createdReferences = {} // All references to nodes created with (useRef())
			this.globalSelf = window.exposedComponents[this.constructor.name.toLowerCase()];
			/**
			 * Convert expected properties
			 */
			if (this.globalSelf) {
				const propTypes = this.globalSelf.propTypes;
				if (propTypes) {
					obj = typeCheck(obj, propTypes, this.globalSelf.defaultProps)
					this.unexpectedArguments = {}
					for (const typeName in obj) {
						var value = obj[typeName];
						if (!propTypes.hasOwnProperty(typeName)) {
							this.unexpectedArguments[typeName] = value;
							delete obj[typeName];
						}
					}
				}
			}

			/**
			 * Custom theme when object created from styled() function
			 */
			this.hasTheme = options.hasTheme;
			this._watchingObservers = []
			this.transitionMaxCopies = Infinity;
			/**
			 * Check if obj is a function, then it needs execution
			 */
			this._isFunction = typeof obj === 'function';
			this.usesTransition = false

			/**
			 * Setup arrays for event listening
			 */
			this.didMountCallbacks = []
			this.didUpdateCallbacks = []
			/**
			 * Initialize empty dependencies object for useEffect calls
			 */
			this._Observer = new Observer(obj || {})
			this.props = this._Observer._value
			if (options.replace instanceof HTMLElement) {
				this.originalElement = options.replace
				this.originalChildren = Array.from(options.replace.childNodes);
			}

			this.Renderer = new RenderAssignment(this, options)

			if (this._isFunction) {
				this._generatorFunction = obj(options.isFunctionProps)
				/**
				 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
				 */
				UpdateDispatcher.next(this);
				UpdateDispatcher.restore();
			}
			
			for (const i of this._watchingObservers) {
				i.boundRender = this.Renderer
			}
			/**
			 * Initialization happens right before any render assignment is executed
			 */
			this.__init__()
			this.Renderer.Render()
		}

		fadeOutDestroy(duration = 400) {
			/**
			 * Debounce for performance
			 */
			var startTime = performance.now()
			const interval = () => {
				var elapsed = performance.now() - startTime;
				if (elapsed >= duration) {
					this.destroy()
					return
				}
				this.Nodes.map(x => x[0].style.opacity = 1 - (elapsed / duration))
				requestAnimationFrame(interval)
			}
			requestAnimationFrame(interval)
		}

		onComponentDidMount(callback) {
			this.didMountCallbacks.push(callback)
		}

		onComponentDidUpdate(callback) {
			this.didUpdateCallbacks.push(callback)
		}

		componentDidUpdate() {}
		componentDidMount() {}
		componentWillUnmount() {}

		destroy() {
			this.Renderer.Destroy()
			for (const ID in this.createdReferences) {
				delete this.createdReferences[ID];
			}
		}

		__init__() {}
		getNode(...args) {
			if (this._isFunction) {
				return this._generatorFunction()
			}
			throw new Error(
				"Could not render, are you sure you created the 'render' method according to our docs? https://continuum-ai.de/doc/snowblind/reference/render-assignment"
			);
		}
	},

	renderAll() {
		const getFrom = window.exposedComponents;

		for (const name in getFrom) {
			const property = getFrom[name]
			const isFunction = typeof property === 'function'
			const isComponent = property && property.prototype instanceof Snowblind.Component;
			if (isComponent || isFunction) {
				const LinkedComponents = Array.from(document.getElementsByTagName(name))
				for (const Component of LinkedComponents) {
					/**
					 * Try to auto populate an entries value with a global variable or constant
					 */
					const props = Snowblind.getNodeProperties(Component)
					if (isFunction) {
						new Snowblind.Component(getFrom[name], {
							replace: Component,
							isFunctionProps: props,
						})
					} else {
						new getFrom[name](props, {
							replace: Component
						})
					}
				}
			}
		}
	},
	getNodeProperties(node) {
		return Object.fromEntries(Array.from(node.attributes).map(x => {
			var attributeValue = x.value,
				attributeName = x.name;
			let Value;
			if ((Value = attributeValue.match(/\{\{([A-z0-9_ ]*?)\}\}/))) {
				/**
				 * Try to assign a constant when finding this: "{{constantName}}"
				 */
				var constantName = Value[1].trim(),
					type = typeof window[constantName]
				if (type !== "undefined" && type !== "function") {
					attributeValue = window[constantName]
				} else if (type === "function") {
					attributeValue = constantName + constantName.endsWith("()") ? "" : "()"
				}
			} else if (attributeName.startsWith(":")) {
				/**
				 * User passed HTML as attribute, convert to node
				 */
				var attributeValue = html([attributeValue]);
				attributeName = attributeName.substring(1)
			} else if (attributeValue.startsWith("{") && attributeValue.endsWith("}")) {
				var innerValue = attributeValue.substring(1, attributeValue.length - 1)
				if (innerValue === "true" || innerValue === "false") {
					/**
					 * Try to match the value to a typical datatype
					 */
					attributeValue = innerValue === "true" ? true : false;
				} else if (parseFloat(innerValue) == innerValue) {
					attributeValue = parseFloat(innerValue)
				}
			} else if (attributeValue.startsWith("[") && attributeValue.endsWith("]")) {
				/**
				 * Make an array
				 */
				attributeValue = JSON.parse(attributeValue.replace(/(?<!\\)'/g, '"'));
			}
			/**
			 * style can not be used, circumvent by adding _ in front, has to be removed here
			 */
			return [attributeName.startsWith("_") ? attributeName.substring(1) : attributeName, attributeValue]
		}))
	},
	eventBus: {
		on(event, callback) {
			document.addEventListener(event, (e) => callback(e.detail));
		},
		dispatch(event, data) {
			document.dispatchEvent(new CustomEvent(event, {
				detail: data
			}));
		},
		remove(event, callback) {
			document.removeEventListener(event, callback);
		},
	}
}

window.addEventListener("load", () => {
	Snowblind.renderAll()
})

/**
 * Inserts a given element after another.
 * @param {HTMLElement} el The element given node should be inserted after.
 */
HTMLElement.prototype.insertAfter = function (el) {
	if (el && el.parentNode) {
		el.parentNode.insertBefore(this, el.nextSibling);
	}
};

/* EventTarget.prototype.originalAddEvent = EventTarget.prototype.addEventListener;
EventTarget.prototype.originalRemoveEvent = EventTarget.prototype.removeEventListener;

EventTarget.prototype.addEventListener = function (...args) {
	var eventType = args[0];
	if (!this._savedEvents) {
		this._savedEvents = {};
	}
	if (!this._savedEvents[eventType]) {
		this._savedEvents[eventType] = [];
	}
	this._savedEvents[eventType].push(args)
	console.log(this.originalAddEvent);
	this.originalAddEvent(...args)
}

EventTarget.prototype.removeEventListener = function (...args) {
	var eventType = args[0];
	if (args[1] && this._savedEvents) {
		var events = this._savedEvents[eventType];
		if (events) {
			for (let i = 0; i < events.length; i++) {
				const eventArray = events[i];
				if (eventArray[1] == args[1]) {
					delete events[i]
					this._savedEvents[eventType] = events.filter(x => x)
					break
				}
			}
		}
	}
	this.originalRemoveEvent(...args)
} */
export default Snowblind