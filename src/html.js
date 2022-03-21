import Snowblind from "./snowblind.js";
import {ValueBinder, exposedComponents} from "./shared-internals.js"

function html(strings, ...vars) {

	function applyEvent(elem, trigger, event, onlyThisNode) {
		elem.addEventListener(trigger, (e) => {
			if (onlyThisNode && e.target.isEqualNode(elem)) {
				event(elem, e)
			} else if (!onlyThisNode) {
				event(elem, e)
			}
		})
	}

	function insertText(elem, text) {
		var textElement = document.createTextNode(text);
		elem.appendChild(textElement);
	}

	const MATCH_INDEX_REGEX = /\{\{([0-9]+)\}\}/g;
	var result = "",
		i = 0;
	for (const str of strings) {
		result += str + (strings[strings.length - 1] === str ? "" : `{{${i++}}}`);
	}
	const template = document.createElement("template");
	template.innerHTML = result;

	/**
	 * Limit to one element per fragment, require multiple to be wrapped in another element.
	 */
	if (template.content.children.length > 1) {
		throw new Error("Multiple elements must be wrapped in a single element.");
	}

	const walker = document.createTreeWalker(template.content, 1, null);

	let node;
	let foundInputs = 0;

	while ((node = walker.nextNode()) !== null) {
		/**
		 * Check if node is an input or a textarea, if so, set a key for focusing it later on.
		 */
		if (node instanceof HTMLTextAreaElement || node instanceof HTMLInputElement) {
			if (!node.hasAttribute("key")) {
				node.setAttribute("key", "inputNo" + foundInputs);
				foundInputs++
			}
		}

		for (const attribute of Array.from(node.attributes)) {
			var name = attribute.name;
			var value = attribute.nodeValue;
			var nameStart = name[0];
			var realName = name.substring(1)

			const MATCH_MULTI_CHAR = /\{([@.?!]+)\}/;

			value = value.replace(MATCH_INDEX_REGEX, (x, y) => {
				var index = parseInt(y);
				var realValue = vars[index];
				var applyValue = "";

				if (name === "ref" && realValue.constructor && realValue.constructor.name === "SnowblindRef") {
					/**
					 * User wants a reference to the current object
					 */
					realValue.current = node;
					node.isReferenceTo = realValue;
					node.removeAttribute("ref");
					return
				} else if (name === "sx") {
					/**
					 * Default style override
					 */
					if (typeof realValue === "string") {
						node.style = realValue;
					} else if (typeof realValue === "object") {
						for (const styleName in realValue) {
							node.style[styleName] = realValue[styleName];
						}
					}
					node.removeAttribute("sx")
					return
				}

				/**
				 * Check name for multiple applied startKeys and apply everyone of them in order.
				 * {!?.} -> Expand Object into array, 
				 * 			conditional check, 
				 * 			apply as JS property.
				 * 
				 * 	Regex -> {([@.?!]+)}
				 */

				const isMultiCharacterAttribute = name.match(MATCH_MULTI_CHAR);

				var arrAttributes = [];

				const _applyArray = (callback) => {
					let i = 0;
					for (const x of arrAttributes) {
						const result = callback(x[0], x[1]);
						if (result === false) {
							delete arrAttributes[i];
							arrAttributes = arrAttributes.filter(y => y)
							continue
						}
						i++
					}
				}

				const _applyEvent = (useArr = false) => {
					/**
					 * Apply event listener (@@ makes sure only this node triggers the event)
					 */
					if (useArr) {
						_applyArray((key, val) => {
							applyEvent(node, key, val, false);
							return false
						})
					} else {
						var onlyThisNode = false;
						if (name[1] === "@") {
							onlyThisNode = true;
							realName = realName.substring(1)
						}
						applyEvent(node, realName, realValue, onlyThisNode);
					}
				}

				const _applyJS = (useArr = false) => {
					/**
					 * Apply property per JS
					 */
					if (useArr) {
						_applyArray((key, val) => {
							node[key] = val
						})
					} else {
						node[realName] = realValue;
					}
				}

				const _applyConditional = (useArr = false) => {
					/**
					 * Check truthyness, apply if true
					 */
					if (useArr) {
						_applyArray((key, val) => {
							if (val instanceof ValueBinder) {
								val = val.valueOf()
							}
							if (!val) {
								return false;
							}
						})
					} else {
						if (realValue instanceof ValueBinder) {
							realValue = realValue.valueOf()
						}
						realValue ? node[realName] = realValue : 0;
					}
				}

				const _applyObject = (useArr = false) => {
					/**
					 * Arguments inside an object (e.g. for unexpected args)
					 */
					for (const i in realValue) {
						if (useArr) {
							arrAttributes.push([i, realValue[i]])
						} else {
							node.setAttribute(i, realValue[i])
						}
					}
				}

				const applyFromChar = (char, arr = true) => {
					if (char === "!") {
						_applyObject(arr)
					} else if (char === ".") {
						_applyJS(arr)
					} else if (char === "?") {
						_applyConditional(arr)
					} else if (char === "@") {
						_applyEvent(arr)
					} else {
						applyValue = realValue
					}
				}

				if (isMultiCharacterAttribute) {
					for (const char of isMultiCharacterAttribute[1]) {
						applyFromChar(char, true)
					}
				} else {
					applyFromChar(nameStart, false)
				}

				_applyArray((key, val) => {
					node.setAttribute(key, val)
				})

				return applyValue;
			})
			if (["@", ".", "?", "!"].indexOf(nameStart) !== -1 || name.match(MATCH_MULTI_CHAR)) {
				node.removeAttribute(name)
			} else if (name !== "ref") {
				node.setAttribute(name, value)
			}
		}

		/**
		 * Check text nodes, append HTML if necessary
		 */
		var childNodes = Array.from(node.childNodes);
		for (const children of childNodes) {
			if (children.nodeType === Node.TEXT_NODE) {
				var innerText = children.wholeText;
				const matchArray = Array.from(innerText.matchAll(MATCH_INDEX_REGEX));
				innerText = innerText.replace(MATCH_INDEX_REGEX, (i) => {
					return " ".repeat(i.length)
				})
				if (matchArray.length > 0) {
					// We're gonna insert everything from scratch, just remove all content before inserting something twice...
					children.textContent = ""
				}
				var lastOffsetIndex = 0;
				for (let i = 0; i < matchArray.length; i++) {
					const match = matchArray[i];
					var index = parseInt(match[1]);
					var value = vars[index];

					/**
					 * Insert text before the element if existed beforehand.
					 */
					var insertBefore = innerText.substring(lastOffsetIndex, match.index);
					if (insertBefore !== "") {
						insertText(node, insertBefore)
					}
					/**
					 * Object is no primitive, handle differently
					 */
					const appendNonPrimitive = (value) => {
						if (value instanceof HTMLElement || value instanceof SVGElement || value instanceof Text) {
							var span = document.createElement("span")
							span.insertAfter(children)
							span.replaceWith(value)
						} else if (value instanceof HTMLCollection || value instanceof NodeList) {
							var span = document.createElement("span")
							span.insertAfter(children)
							span.replaceWith(...value)
						} else if (Array.isArray(value)) {
							value.reverse().map(x => appendNonPrimitive(x))
						} else {
							if (value !== Object(value) || value instanceof ValueBinder) {
								/**
								 * Handle primitive, simple insert
								 */
								insertText(node, value)
							} else {
								console.error('The value you passed as a variable is not yet supported.')
							}
						}
					}
					appendNonPrimitive(value)

					if (i == matchArray.length - 1) {
						/**
						 * Last element, append rest of string.
						 */
						children.remove()
						var insertAfter = innerText.substring(match.index + match[0].length)
						if (insertAfter != "") {
							insertText(node, insertAfter)
						}
					}
					lastOffsetIndex = match.index + value && value.length
				}
			}
		}
	}

	/**
	 * Loop through all children again and render components
	 */
	const child = template.content.children[0];
	Snowblind.renderAllIn(child)
	return child
}

function repeat(items, itemTemplate, keyFunction = () => {}) {
	var arr = []
	for (const i in items) {
		const item = items[i];
		var uniqueKey = keyFunction(i, item);
		arr.push(itemTemplate(i, item, uniqueKey));
	}
	return arr
}

function classMap(classes) {
	var classNames = []
	for (const key in classes) {
		const evaluationProperty = classes[key];
		if (evaluationProperty) {
			classNames.push(key)
		}
	}
	return classNames.join(" ").trim();
}

/**
 * Takes an array of classes and returns them as string if they evaluate to true.
 * @param {Array} classes Array of classes to be checked
 * @returns {String}
 */
function classArray(classes) {
	return classMap(Object.fromEntries(classes.map(x => {
		if (Array.isArray(x)) {
			return Array.isArray(x[0]) ? x[0].map(y => [y, x[1]]) : x;
		} else {
			return [x, x ? true : false]
		}
	})))
}

function styleMap(styles) {
	var string = "";
	for (const i in styles) {
		string += styles[i] ? `${i}: ${styles[i]};` : "";
	}
	return string;
}

function when(condition, evaluateTrue, evaluateFalse) {
	return condition ? evaluateTrue() : evaluateFalse();
}

function choose(prop, options, fallback) {
	if (options.hasOwnProperty(prop)) {
		return options[prop](prop);
	}
	return fallback()
}

function range(start, end, step = 1) {
	return Array((end - start) / step).fill(0).map((x, i) => i * step + start)
}

/**
 * Takes a condition and element only returns it if the condition is true.
 * @param {any} condition The condition to be checked
 * @param {any} element The return value if the condition is true
 * @returns {any | String}
 */
function elemIf(condition, element) {
	return condition ? element : "";
}
/**
 * Inserts a given element after another.
 * @param {HTMLElement} el The element given node should be inserted after.
 */
HTMLElement.prototype.insertAfter = function (el) {
	if (el && el.parentNode) {
		el.parentNode.insertBefore(this, el.nextSibling);
	}
};

export {
	html,
	repeat,
	when,
	choose,
	classMap,
	classArray,
	range,
	styleMap,
}