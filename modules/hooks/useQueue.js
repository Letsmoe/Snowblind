import {useState} from "./useState.js";

/**
 * Sort items into a queue to use later
 * @param {Integer} limit The maximum number of items to stay in the state array at the same time.
 * @param {Array<any>} initialValues An array of initials to fill state and queue with.
 * @returns {state, queue, add, shift, update, cleanQueue}
 */
function useQueue(limit, initialValues = []) {
	const makeState = (r) => ({
		state: r.slice(0, limit),
		queue: r.slice(limit)
	})

	const [{
		state,
		queue
	}, setState] = useState({
		state: initialValues.slice(0, limit),
		queue: initialValues.slice(limit)
	})

	const shift = () => {
		var shiftedItem;
		setState(current => {
			let results = [...current.state, ...current.queue];
			shiftedItem = results.shift();
			return makeState(results)
		})
		return shiftedItem;
	}

	const add = (...els) => {
		setState(current => {
			let results = [...current.state, ...current.queue, ...els];
			return makeState(results)
		})
	}

	const update = (fn) => {
		setState(current => {
			let results = fn([...current.state, ...current.queue]);
			return makeState(results)
		})
	}

	const cleanQueue = () => setState(current => ({
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