import {
	UpdateDispatcher
} from "/src/shared-internals.js";
import deepCompare from "../utils/deepCompare.js";

function useEffect(callback, stateConditional = []) {
	/**
	 * Store original values to compare against later on, if one updated render the component again.
	 */
	var originalValues = stateConditional.map(x => x.valueOf());

	/**
	 * Exit the main event loop and enter a subscribe function to stagger execution of subscription.
	 */
	UpdateDispatcher.subscribe((value) => {
		const runCallback = () => {
			if (originalValues.length > 0) {
				/**
				 * Compare values on rerender.
				 */
				if (originalValues.filter((x, i) => !deepCompare(x, stateConditional[i].valueOf())).length > 0) {
					callback();
					originalValues = stateConditional.map(x => x.valueOf());
				}
			} else {
				/**
				 * Always call the passed callback
				 */
				callback()
			}
		}
		value.onComponentDidMount(runCallback);
		value.onComponentDidUpdate(runCallback);
	})
}

export {useEffect};