import {
	UpdateDispatcher, Observable, ValueBinder
} from "../src/shared-internals.js";


/**
	 * Compares two values for equality.
	 * @param {any} x First value to compare
	 * @param {any} y Second value to compare
	 */
 function compare(x, y) {
	if (x === y) return true;
	// if both x and y are null or undefined and exactly the same

	if (!(x instanceof Object) || !(y instanceof Object)) return false;
	// if they are not strictly equal, they both need to be Objects

	if (x.constructor !== y.constructor) return false;
	// they must have the exact same prototype chain, the closest we can do is
	// test their constructor.

	for (var p in x) {
		if (!x.hasOwnProperty(p)) continue;
		// other properties were tested using x.constructor === y.constructor

		if (!y.hasOwnProperty(p)) return false;
		// allows to compare x[ p ] and y[ p ] when set to undefined

		if (x[p] === y[p]) continue;
		// if they have the same strict value or identity then they are equal

		if (typeof (x[p]) !== "object") return false;
		// Numbers, Strings, Functions, Booleans must be strictly equal

		if (!compare(x[p], y[p])) return false;
		// Objects and Arrays must be tested recursively
	}

	for (p in y)
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
			return false;
	// allows x[ p ] to be set to undefined

	return true;
}


function useRef() {
	class SnowblindRef {
		constructor() {
			this.current = undefined;
		}
	}
	return new SnowblindRef();
}


/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param {any} state A value used as a state to the current render cycle.
 * @returns {Array<any, function>} A pair of getter and setter to access the state.
 */
function useState(state) {
	const obs = new Observable(state);
	var value = new ValueBinder(obs)
	UpdateDispatcher.subscribe((component) => {
		const renderer = component.Renderer;
		obs.subscribe(() => {
			renderer.Render();
		})
	})

	const _callback = (x) => {
		x = x.valueOf()
		obs.next(x)
		return x
	}
	return [value, _callback]
}

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
				if (originalValues.filter((x, i) => !compare(x, stateConditional[i].valueOf())).length > 0) {
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

export {
	useRef,
	useState,
	useEffect
}