/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeType = function (node) {
	if (node.nodeType === 3) return 'text';
	if (node.nodeType === 8) return 'comment';
	return node.tagName.toLowerCase();
};

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
var getNodeContent = function (node) {
	if (node.childNodes && node.childNodes.length > 0) return null;
	return node.textContent;
};

/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
export default function diff(template, elem) {

	// Get arrays of child nodes
	var domNodes = Array.prototype.slice.call(elem.childNodes);
	var templateNodes = Array.prototype.slice.call(template.childNodes);

	// If extra elements in DOM, remove them
	var count = domNodes.length - templateNodes.length;
	if (count > 0) {
		for (; count > 0; count--) {
			domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
		}
	}

	// Diff each item in the templateNodes
	templateNodes.forEach(function (node, index) {

		// If element doesn't exist, create it
		if (!domNodes[index]) {
			elem.appendChild(node.cloneNode(true));
			return;
		}

		// If element is not the same type, replace it with new element
		if (getNodeType(node) !== getNodeType(domNodes[index])) {
			domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
			return;
		}

		// If content is different, update it
		var templateContent = getNodeContent(node);
		if (templateContent && templateContent !== getNodeContent(domNodes[index])) {
			domNodes[index].textContent = templateContent;
		}

		const nodeChildNodes = node.childNodes;
		const domNodeChildren = domNodes[index].childNodes;

		// If target element should be empty, wipe it
		if (domNodeChildren.length > 0 && nodeChildNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

		// If element is empty and shouldn't be, build it up
		// This uses a document fragment to minimize reflows
		if (domNodeChildren.length < 1 && nodeChildNodes.length > 0) {
			var fragment = document.createDocumentFragment();
			diff(node, fragment);
			domNodes[index].appendChild(fragment);
			return;
		}

		// If there are existing child elements that need to be modified, diff them
		if (nodeChildNodes.length > 0) {
			diff(node, domNodes[index]);
		}

		if (getNodeType(node) !== "text") {
			for (const attr of Array.from(node.attributes)) {
				if (!domNodes[index].hasAttribute(attr.name)) {
					domNodes[index].setAttribute(attr.name, attr.value)
				} else {
					if (domNodes[index].getAttribute(attr.name) !== attr.value) {
						domNodes[index].setAttribute(attr.name, attr.value)
					}
				}
			}
		}

		// If the node serves as a reference, re-assign to the active node rather than the one that will be rendered.
		if (node.isReferenceTo !== undefined) {
			node.isReferenceTo = domNodes[index]
		}
	});

};