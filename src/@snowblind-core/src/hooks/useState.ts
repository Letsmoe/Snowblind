import {
	Observable
} from "../shared-internals.js";

/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @returns A pair of getter and setter to access the state.
 */
function useState(state : any) : [any, Function] {
	const obs = new Observable(state);

	const _callback = (newState : any) => {
		obs.next(newState)
		return newState
	}
	return [obs, _callback]
}

export {useState};