/**
 * Sets the caret on a specified position in a text input element.
 * @param {HTMLElement} elem
 * @param {Integer} caretPos
 * @returns {void}
 */
function setCaretPosition(elem, caretPos) {
	if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.move('character', caretPos);
		range.select();
	} else {
		elem.setSelectionRange(caretPos, caretPos);
	}
}

/**
 * Get all parent nodes of a given element
 * @param {HTMLElement} element
 * @returns {Array<Object>}
 */
function getParents(element) {
	var parents = [];
	while (element) {
		parents.unshift(element);
		element = element.parentNode;
	}
	return {
		elements: parents,
		tagNames: parents.map(x => x.tagName && x.tagName.toLowerCase()).filter(x => x),
		classNames: parents.map(x => x.classList && Array.from(x.classList))
	}
}

/**
 * Escapes double quotes in a string to allow for direct insertion.
 * @param {String} string The string to be escaped
 * @returns String with escaped double quotes
 */
function esc(string) {
	return string.replace(/"/g, '&#34');
}

export {
	getParents,
	setCaretPosition,
	esc
}