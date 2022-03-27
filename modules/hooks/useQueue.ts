import { ValueBinder } from "../../src/shared-internals.js";
import {useState} from "./useState.js";

/**
 * Sort items into a queue to use later
 * @param limit The maximum number of items to stay in the state array at the same time.
 * @param initialValues An array of initials to fill state and queue with.
 * @returns State and queue as well as functions to modify the queue
 */
function useQueue(limit: number, initialValues: Array<any> = []) : {state : [], queue: [], add: Function, shift: Function, update: Function, cleanQueue: Function} {
	const makeState = (r: any[]) => ({
		state: r.slice(0, limit),
		queue: r.slice(limit)
	})

	const [{
		// @ts-ignore
		state,
		// @ts-ignore
		queue
	}, setState] = useState({
		state: initialValues.slice(0, limit),
		queue: initialValues.slice(limit)
	})

	const shift = () => {
		var shiftedItem : any;
		setState((current: {state: [], queue: []}) => {
			let results = [...current.state, ...current.queue];
			shiftedItem = results.shift();
			return makeState(results)
		})
		return shiftedItem;
	}

	const add = (...els : any[]) => {
		setState((current: {state: [], queue: []}) => {
			let results = [...current.state, ...current.queue, ...els];
			return makeState(results)
		})
	}

	const update = (fn : Function) => {
		setState((current: {state: [], queue: []}) => {
			let results = fn([...current.state, ...current.queue]);
			return makeState(results)
		})
	}

	const cleanQueue = () => setState((current: {state: [], queue: []}) => ({
		state: current.state,
		queue: []
	}));

	return {
		state,
		queue,
		add,
		shift,
		update,
		cleanQueue
	}
}

export {useQueue};