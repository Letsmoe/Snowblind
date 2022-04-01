import {
	UpdateDispatcher
} from "../shared-internals.js";
import deepCompare from "../utils/deepCompare.js";
import {SnowblindComponent} from "../types.js"

function useEffect(callback : Function, stateConditional = []) {
	/**
	 * Store original values to compare against later on, if one updated render the component again.
	 */
	var originalValues = stateConditional.map(x => x.valueOf());

	/**
	 * Exit the main event loop and enter a subscribe function to stagger execution of subscription.
	 */
	UpdateDispatcher.subscribe((value : SnowblindComponent) => {
		const runCallback = (node : any) => {
			if (originalValues.length > 0) {
				/**
				 * Compare values on rerender.
				 */
				if (originalValues.filter((x, i) => !deepCompare(x, stateConditional[i].valueOf())).length > 0 || originalValues.length == 0) {
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
		value.onComponentDidMount(runCallback);
		value.onComponentDidUpdate(runCallback);
	})
}

export {useEffect};