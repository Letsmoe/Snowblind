import { ValueBinder, Observable } from "@snowblind/core";

/**
 * Creates a memoized state meaning it will only trigger a rerender once one of it's dependencies change reducing the amount of cycles per update.
 * @param callback A callback function, run once a dependency changes
 * @param dependencies A list of dependencies to observe for changes, once they change, they'll trigger a render cycle.
 * @returns A ValueBinder containing the newest information about the callbacks result.
 */
function useMemo(
	callback: Function,
	dependencies: Array<ValueBinder | any>
): ValueBinder {
	let value = callback();
	const obs = new Observable(value);

	for (const dependency of dependencies) {
		if (dependency instanceof ValueBinder) {
			dependency.observable.subscribe(() => {
				obs.next(callback());
			});
		}
	}

	return new ValueBinder(obs);
}

export { useMemo };
