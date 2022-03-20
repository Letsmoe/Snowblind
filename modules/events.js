class SyntheticEvent {
	constructor() {

	}
}


window.addEventListener("load", function () {

	function getSelectedNode() {
		if (document.selection)
			return document.selection.createRange().parentElement();
		else {
			var selection = window.getSelection();
			if (selection.rangeCount > 0) {
				return selection.getRangeAt(0).startContainer.parentNode;
			}
		}
	}

	const _keyDownMap = {}

	window.addEventListener("keydown", function (e_key) {
		_keyDownMap[e_key.key.toLowerCase()] = true
		var isShift = _keyDownMap["shift"],
			isCtrl = _keyDownMap["control"],
			e_target = e_key.target;

		var _targets = e_target,
			_event;


		if ((isCtrl && _keyDownMap["v"]) || (isShift && _keyDownMap["insert"])) {
			/**
			 * Listen for paste event
			 */
			_event = new Event("onPaste");
		} else if ((isCtrl && _keyDownMap["c"]) || (isCtrl && _keyDownMap["insert"])) {
			/**
			 * Listen for copy event
			 */
			_event = new Event("onCopy");
			_targets = getSelectedNode();
		}


		for (const elem of Array.from(_targets)) {
			elem.dispatchEvent(_event);
		}
	})

	window.addEventListener("keyup", (e_key) => {
		_keyDownMap[e_key.key] = false
	})
})