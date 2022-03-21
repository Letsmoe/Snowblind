import RenderAssignment from "./render-assignment.js";
import {Observer} from "./observer.js";
import {
	typeCheck,
} from "../modules/typecheck.js";
import {
	html
} from "./html.js"

import {UpdateDispatcher, exposedComponents} from "./shared-internals.js"

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
		exposedComponents[name] = component;
	}
}

/**
 * Add component to global scope;
 */
const Snowblind = {
	Component: class Component {
		constructor(props, options = {}) {
			options = Object.assign({
				replace: false,
				generator: false,
				hasTheme: false,
			}, options)

			this.createdReferences = {} // All references to nodes created with (useRef())
			this.globalSelf = exposedComponents[this.constructor.name.toLowerCase()];
			/**
			 * Convert expected properties
			 */
			if (this.globalSelf) {
				const propTypes = this.globalSelf.propTypes;
				if (propTypes) {
					props = typeCheck(props, propTypes, this.globalSelf.defaultProps)
					this.unexpectedArguments = {}
					for (const typeName in props) {
						var value = props[typeName];
						if (!propTypes.hasOwnProperty(typeName)) {
							this.unexpectedArguments[typeName] = value;
							delete props[typeName];
						}
					}
				}
			}

			/**
			 * Custom theme when object created from styled() function
			 */
			this.hasTheme = options.hasTheme;
			this._watchingObservers = []
			this._maxCopies = Infinity;
			/**
			 * Check if obj is a function, then it needs execution
			 */
			this._isFunction = typeof options.generator === "function";
			this._usesTransition = false

			/**
			 * Setup arrays for event listening
			 */
			this.didMountCallbacks = []
			this.didUpdateCallbacks = []
			this.willUnmountCallbacks = []
			/**
			 * Initialize empty dependencies object for useEffect calls
			 */
			props.children = Array.from(options.replace.childNodes);
			this._Observer = new Observer(props || {})
			this.props = this._Observer._value
			if (options.replace instanceof HTMLElement) {
				this.originalElement = options.replace
				this.originalChildren = Array.from(options.replace.childNodes);
			}

			this.Renderer = new RenderAssignment(this, options)

			if (this._isFunction) {
				this._generatorFunction = options.generator(props)
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
		onComponentWillUnmount() {
			this.willUnmountCallbacks.push(callback)
		}

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
	/**
	 * Searches the DOMTree recursively for components, this will ensure parent nodes will be rendered and their children will be included in the render afterwards
	 * 
	 */
	renderAllIn(element = document.body) {
		const recurse = (parentList) => {
			// Filter out scripts
			for (const parent of parentList) {
				if (parent instanceof HTMLScriptElement) {
					continue;
				}
				let nodeName = parent.nodeName.toLowerCase()
				if (exposedComponents.hasOwnProperty(nodeName)) {
					// Element nodeName in the names of exposed components, it must be one!
					let component = exposedComponents[nodeName];
					const isFunction = typeof component === 'function'
					const isComponent = component && component.prototype instanceof Snowblind.Component;
					if (isComponent || isFunction) {
						const props = Snowblind.getNodeProperties(parent)
						if (isFunction) {
							new Snowblind.Component(props, {
								generator: component,
								replace: parent
							})
						} else {
							new component(props, {
								replace: parent
							})
						}
					}
				} else {
					// No component here! Let's go deeper!
					recurse(Array.from(parent.children))
				}
			}
		}

		recurse(Array.from(element.children));
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
	Snowblind.renderAllIn()
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