import { Observable, ObserverProxy, UpdateDispatcher, } from "../shared-internals.js";
/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @returns A pair of getter and setter to access the state.
 */
function applyState(state) {
    const obs = new Observable(state);
    let current;
    UpdateDispatcher.subscribe((node) => {
        current = node;
    });
    const proxy = ObserverProxy(obs);
    const callback = (newState) => {
        obs.next(newState);
        current.node.replaceWith(current.render());
        return newState;
    };
    return [proxy, callback];
}
export { applyState };
//# sourceMappingURL=applyState.js.map