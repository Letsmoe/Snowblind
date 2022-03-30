import { Snowblind } from "./snowblind.js";
import {
	ValueBinder,
	SnowblindChild,
	NodeInsertAfter,
	exposedComponents,
} from "./shared-internals.js";
import { ISnowblindElement } from "./types";

const getAttributes = (node: HTMLElement) => {
	return Array.from(node.attributes)
		.map((a) => [a.name, a.value])
		.reduce((acc, attr) => {
			acc[attr[0]] = attr[1];
			return acc;
		}, {});
};

const MATCH_INDEX = /\{\{([0-9]+)\}\}/g;

const isStringArray = (arr : any[]) => arr.map(x => typeof x === "string").indexOf(false) === -1;
const findIndex = (str : string) => str.matchAll(MATCH_INDEX);

class SnowblindElement {
	public attributes: { [key: string]: any };
	public node : ISnowblindElement;
	public values : any[];
	constructor(node: ISnowblindElement, values : any[]) {
		this.attributes = getAttributes(node);
		this.node = node;
		this.values = values;
		let nodeName = this.node.nodeName.toLowerCase();
		// Check if node is a component-to-be and stop any attribute assignment on it, just fill the attributes object.
		const stopOverwrite = exposedComponents.hasOwnProperty(nodeName);

		for (const key in this.attributes) {
			let indexString = this.attributes[key];
			let indices = Array.from(findIndex(indexString));
			let arrValues = indices.map(index => {
				// Index number is stored in first capture group (index[1]) as a string.
				return values[parseInt(index[1])];
			})
			
			/**
			 * We can assume that only string based attributes will have more than one value inserted into them.
			 */
			let subName = key.substring(1);
			let value : any;
			let dontRemove = false;
			if (isStringArray(arrValues)) {
				// The whole thing is just strings, replace them together...
				value = indexString.replace(MATCH_INDEX, (full: any, index: any) => {
					index = parseInt(index);
					return values[index];
				})
			} else {
				// We cannot assign multiple values to the same property... We just take the last one and that's it!
				value = arrValues[arrValues.length - 1];
			}

			// Set the filled property on the `attributes` object.
			this.attributes[key] = value;
			if (stopOverwrite === false) {
				if (key === "ref") {
					/**
					 * User wants a reference to the current object
					 */
					value.current = this.node;
					this.node.isReferenceTo = value;
					this.node.removeAttribute("ref");
				}
	
				if (key.startsWith("@")) {
					// Assign a new event to the node. (Check if second char is @ sign, if so it should only apply to the node not it's children.)
					if (key[1] === "@") {
						this.setEvent(subName.substring(1), value, true);
					} else {
						this.setEvent(subName, value, false);
					}
				} else if (key.startsWith(".")) {
					// Assign JS property value to the node.
					this.setProperties(subName, value)
				} else if (key.startsWith("?")) {
					// Conditionally Apply to the node.
					this.setConditionally(subName, value);
				} else if (key.startsWith("!")) {
					// Apply object as attributes.
					this.setObject(value);
				} else {
					// Treat as though there could be multiple values inside. Replace each found key with it's corresponding value.
					this.trySetAttribute(key, value);
					dontRemove = true;
				}
				if (!dontRemove) {
					this.node.removeAttribute(key);
				}
			}
		}

		if (stopOverwrite === true) {
			// Create a new component from the found node.
			let component = new Snowblind.Component(this.attributes, exposedComponents[nodeName], {
				hasTheme: false,
				replace: this.node,
			})
			this.node = component.Node;
		}
	}

	trySetAttribute(key: string, value : any) {
		try {
			this.node.setAttribute(key, value);
		} catch (e) {
			console.error(`'${key}' is not a valid attribute name.`)
		}
	}

	setObject(object: {}) {
		for (const key in object) {
			let value = object[key];
			this.trySetAttribute(key, value);
		}
	}

	setConditionally(property: string, value: any) {
		if (value) {
			this.node[property] = value;
		}
	}

	setProperties(property : string, props : any) {
		this.node[property] = props;
	}

	setEvent(event: string, callback: Function, onlyThisNode: boolean = false) {
		this.node.addEventListener(event, (e) => {
			if (onlyThisNode && (e.target as HTMLElement).isEqualNode(this.node)) {
				callback(this.node, e)
			} else if (!onlyThisNode) {
				callback(this.node, e)
			}
		});
	}
}

function html(strings: TemplateStringsArray, ...vars: any[]) {
	function insertText(elem : ISnowblindElement, text : string) {
		var textElement = document.createTextNode(text);
		elem.appendChild(textElement);
	}

	var result = "",
		i = 0;
	for (const str of strings) {
		result +=
			str + (strings[strings.length - 1] === str ? "" : `{{${i++}}}`);
	}
	const template = document.createElement("template");
	// Try correcting non-terminated HTML tags
	result = result.replace(/<([A-z0-9]+)(.*?)\/>(?: |$|<[A-z]|\n)/g, "<$1 $2></$1>")

	template.innerHTML = result;

	/**
	 * Limit to one element per fragment, require multiple to be wrapped in another element.
	 */
	if (template.content.children.length > 1) {
		throw new Error(
			"Multiple elements must be wrapped in a single element."
		);
	}

	var walker = document.createTreeWalker(template.content, 1, null);

	let node: ISnowblindElement;
	let foundInputs = 0;

	while ((node = walker.nextNode() as HTMLElement) !== null) {
		console.log(node);
		
		const element = new SnowblindElement(node, vars)
		node = element.node
		
		/**
		 * Check if node is an input or a textarea, if so, set a key for focusing it later on.
		 */
		if (
			node instanceof HTMLTextAreaElement ||
			node instanceof HTMLInputElement
		) {
			if (!node.hasAttribute("key")) {
				node.setAttribute("key", "input-" + foundInputs);
				foundInputs++;
			}
		}
		

		/**
		 * Check text nodes, append HTML if necessary
		 */
		var childNodes = Array.from(node.childNodes);
		for (const children of childNodes) {
			if (children.nodeType === Node.TEXT_NODE) {
				var innerText = children.textContent;
				const matchArray = Array.from(
					innerText.matchAll(MATCH_INDEX)
				);
				innerText = innerText.replace(
					MATCH_INDEX,
					(i: string) => {
						return " ".repeat(i.length);
					}
				);
				if (matchArray.length > 0) {
					// We're gonna insert everything from scratch, just remove all content before inserting something twice...
					children.textContent = "";
				}
				var lastOffsetIndex = 0;
				for (let i = 0; i < matchArray.length; i++) {
					const match = matchArray[i];
					var index = parseInt(match[1]);
					var value: any = vars[index];

					/**
					 * Insert text before the element if existed beforehand.
					 */
					var insertBefore = innerText.substring(
						lastOffsetIndex,
						match.index
					);
					if (insertBefore !== "") {
						insertText(node, insertBefore);
					}
					/**
					 * Object is no primitive, handle differently
					 */
					const appendNonPrimitive = (value: any) => {
						if (value instanceof SnowblindChild) {
							appendNonPrimitive(value.element);
						} else if (
							value instanceof HTMLElement ||
							value instanceof SVGElement ||
							value instanceof Text
						) {
							NodeInsertAfter(value, children);
						} else if (Array.isArray(value)) {
							value
								.slice()
								.reverse()
								.map((x) => appendNonPrimitive(x));
						} else {
							if (
								value !== Object(value) ||
								value instanceof ValueBinder
							) {
								/**
								 * Handle primitive, simple insert
								 */
								insertText(node, value);
							} else {
								console.error(
									"Only instances of HTMLElement, SVGElement, Text, Array or SnowblindChild are supported."
								);
							}
						}
					};
					appendNonPrimitive(value);

					if (i == matchArray.length - 1) {
						/**
						 * Last element, append rest of string.
						 */
						children.remove();
						var insertAfter = innerText.substring(
							match.index + match[0].length
						);
						if (insertAfter != "") {
							insertText(node, insertAfter);
						}
					}
					lastOffsetIndex = match.index + value && value.length;
				}
			}
		}
	}

	/**
	 * Loop through all children again and render components
	 */
	const child = template.content.children[0];
	Snowblind.renderAllIn(child as HTMLElement);
	return child;
}

export { html };
