import { ValueBinder, Observable } from "../../src/shared-internals.js";
function useMemo(callback, dependencies) {
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
//# sourceMappingURL=useMemo.js.map