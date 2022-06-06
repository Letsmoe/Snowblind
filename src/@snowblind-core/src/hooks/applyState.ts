import {
	Observable,
	ObserverProxy,
	UpdateDispatcher,
} from "../shared-internals.js";
import { Snowblind } from "../snowblind.js";

/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @returns A pair of getter and setter to access the state.
 */
function applyState(state: any): [any, Function] {
	const obs = new Observable(state);
	let current: any;

	UpdateDispatcher.subscribe((node) => {
		current = node;
	});

	const proxy = ObserverProxy(obs);

	const callback = (newState: any) => {
		obs.next(newState);
		current.node.replaceWith(current.render());
		return newState;
	};

	return [proxy, callback];
}

export { applyState };
