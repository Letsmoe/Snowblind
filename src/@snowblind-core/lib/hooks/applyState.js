import { Observable, UpdateDispatcher } from "../shared-internals.js";
/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @returns A pair of getter and setter to access the state.
 */
function applyState(state) {
    const obs = new Observable(state);
    let current;
    let target = { value: obs.value };
    UpdateDispatcher.subscribe(node => {
        current = node;
    });
    const callback = (newState) => {
        obs.next(newState);
        target.value = newState;
        console.log(obs);
        if (typeof newState === "object") {
            current.node.replaceWith(current.render());
        }
        return newState;
    };
    const proxy = new Proxy(target, {
        get(target, prop) {
            if (prop === "__proxy") {
                return obs;
            }
            const prim = Reflect.get(target, "value");
            const value = prim[prop];
            return typeof value === "function" ? value.bind(prim) : value;
        },
    });
    return [proxy, callback];
}
export { applyState };
//# sourceMappingURL=applyState.js.map