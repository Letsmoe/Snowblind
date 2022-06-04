import {
	UpdateDispatcher
} from "../shared-internals.js";
import deepCompare from "../utils/deepCompare.js";

function onRender(callback : Function, stateConditional = []) {
	// Store original values to compare against later on, if one updated render the component again.
	var originalValues = stateConditional.map(x => x.valueOf());

	/**
	 * Exit the main event loop and enter a subscribe function to stagger execution of subscription.
	 */
	const current = UpdateDispatcher.value;
	const runCallback = (node : any) => {
		if (originalValues.length > 0) {
			/**
			 * Compare values on rerender.
			 */
			let flag = true;
			for (let i = 0; i < originalValues.length; i++) {
				if (!deepCompare(originalValues[i], stateConditional[i].valueOf())) {
					flag = false;
					break;
				}
			}
			if (flag) {
				callback(node);
				originalValues = stateConditional.map(x => x.valueOf());
			}
		} else {
			/**
			 * Always call the passed callback
			 */
			callback(node)
		}
	}
	current.onComponentDidMount(runCallback);
	current.onComponentDidUpdate(runCallback);
}

export {onRender};