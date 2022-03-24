import RenderAssignment from "./render-assignment.js";
import {Observer} from "./observer.js";
import {
	typeCheck,
} from "../modules/typecheck.js";
import {
	html
} from "./html.js"

export {useRef, useState, useEffect, useTransition} from "../modules/hooks/index.js";

import {UpdateDispatcher, exposedComponents, SnowblindChild} from "./shared-internals.js"

/**
 * Exposes a component to be grabbed by the initial render process.
 * @param {Array<Snowblind.Component>} components List of components to add
 * @param {Array<String>} optNames Optional list of names if they shall not be auto-retrieved from the components class name.
 */
window.expose = function (components, optNames) {
	optNames = Array.from([optNames]).flat()

	var i = 0;
	for (const key in components) {
		const component = components[key];
		var name = (typeof optNames[i] === "undefined" ? key : optNames[i]).toLowerCase();
		exposedComponents[name] = component;
	}
}

/**
 * Add component to global scope;
 */
const Snowblind = {
	Component: class Component {
		constructor(props, generator, options = {}) {
			options = Object.assign({
				replace: false,
				hasTheme: false,
			}, options)

			this.createdReferences = {} // All references to nodes created with (useRef())
			this.globalSelf = exposedComponents[generator.name.toLowerCase()];
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
			if (options.replace instanceof HTMLElement) {
				props.children = Array.from(options.replace.childNodes).map(x => new SnowblindChild(x));
			}
			this._Observer = new Observer(props || {})
			this.props = this._Observer._value

			this.Renderer = new RenderAssignment(this, options)
			/**
			 * Try to find a ref to the item.
			 */
			const ref = options.replace.isReferenceTo;
			this._generatorFunction = generator(props, ref)
			/**
			 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
			 */
			UpdateDispatcher.next(this);
			UpdateDispatcher.restore();
			
			for (const i of this._watchingObservers) {
				i.boundRender = this.Renderer
			}
			this.Renderer.Render()
		}

		onComponentDidMount(callback) {
			this.didMountCallbacks.push(callback)
		}

		onComponentDidUpdate(callback) {
			this.didUpdateCallbacks.push(callback)
		}
		onComponentWillUnmount(callback) {
			this.willUnmountCallbacks.push(callback)
		}

		render(...args) {
			return this._generatorFunction()
		}
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
				let nodeName = parent.nodeName.toLowerCase()
				if (exposedComponents.hasOwnProperty(nodeName)) {
					// Element nodeName in the names of exposed components, it must be one!
					let component = exposedComponents[nodeName];
					let isFunction = typeof component === 'function'
					if (isFunction) {
						const props = this.getNodeProperties(parent);
						new Snowblind.Component(props, component, {
							replace: parent
						})
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
	},
	createElement: (type, props, children = []) => {
		let element = document.createElement(type);
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
								if (name[1] == "@" && e.target.isEqualNode(element)) {
									value(element, e)
								} else {
									value(element, e)
								}
							})
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
export default Snowblind