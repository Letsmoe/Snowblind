import { Snowblind } from "./snowblind.js";
import {
	ValueBinder,
	NodeInsertAfter,
	exposedComponents,
} from "./shared-internals.js";

import {SnowblindElement} from "./element.js";
import { ISnowblindElement, MATCH_INDEX } from "./types.js";

function isInstance(el : any, type : any | any[], mode : string = "or") {
	type = [type].flat(1);
	let map = type.map((x: any) => el instanceof x);
	return (mode == "or" ? map.indexOf(true) > -1 : map.indexOf(false) == -1);
}

function insertText(elem: ISnowblindElement, text: string) {
	var textElement = document.createTextNode(text);
	elem.appendChild(textElement);
	return textElement;
}
function html(strings: TemplateStringsArray, ...vars: any[]) {
	var result = "",
		i = 0;
	for (const str of strings) {
		result +=
			str + (strings[strings.length - 1] === str ? "" : `{{${i++}}}`);
	}
	const template = document.createElement("template");
	// Try correcting non-terminated HTML tags
	result = result.replace(
		/<([A-z0-9]+)(.*?)\/>(?: |$|<[A-z]|\n)/g,
		"<$1 $2></$1>"
	);

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
		const element = new SnowblindElement(node, vars, walker);
		node = element.node;

		/**
		 * Check if node is an input or a textarea, if so, set a key for focusing it later on.
		 */
		if (
			isInstance(node, [HTMLTextAreaElement, HTMLInputElement])
		) {
			if (!node.hasAttribute("key")) {
				node.setAttribute("key", "input-" + foundInputs);
				foundInputs++;
			}
		}

		/**
		 * Check text nodes, append HTML if necessary
		 */
		var lastItem : HTMLElement | Text;
		var childNodes = Array.from(node.childNodes);
		for (const children of childNodes) {
			if (children.nodeType === Node.TEXT_NODE) {
				var innerText = children.textContent;
				const matchArray = Array.from(innerText.matchAll(MATCH_INDEX));
				innerText = innerText.replace(MATCH_INDEX, (i: string) => {
					return " ".repeat(i.length);
				});
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
						lastItem = insertText(node, insertBefore);
					}
					/**
					 * Handle different insertion options.
					 */
					const appendItem = (value: any) => {
						if (
							isInstance(value, [HTMLElement, SVGElement, Text])
						) {
							NodeInsertAfter(value, lastItem);
							lastItem = value;
						} else if (Array.isArray(value)) {
							value
								.slice()
								.map((x) => appendItem(x));
						} else {
							if (
								value !== Object(value) ||
								isInstance(value, ValueBinder)
							) {
								/**
								 * Handle primitive, simple insert
								 */
								lastItem = insertText(node, value);
							} else {
								console.error(
									"Only instances of HTMLElement, SVGElement, Text or Array are supported."
								);
							}
						}
					};
					appendItem(value);

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
	return child;
}

export { html };
