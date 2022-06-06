import { isProxy, Observable, ObserverProxy } from "../shared-internals.js";
/**
 * Creates a memoized state meaning it will only trigger a rerender once one of it's dependencies change reducing the amount of cycles per update.
 * @param callback A callback function, run once a dependency changes
 * @param dependencies A list of dependencies to observe for changes, once they change, they'll trigger a render cycle.
 * @returns A ValueBinder containing the newest information about the callbacks result.
 */
function applyMemo(callback, dependencies) {
    let value = callback();
    const obs = new Observable(value);
    const proxy = ObserverProxy(obs);
    for (const dependency of dependencies) {
        // Try to retrieve the observable from a dependency (itself will be in the form of a proxy)
        let dependencyObserver = dependency[isProxy];
        if (dependencyObserver instanceof Observable) {
            dependencyObserver.subscribe(() => {
                obs.next(callback());
            });
        }
    }
    return proxy;
}
export { applyMemo };
//# sourceMappingURL=applyMemo.js.map