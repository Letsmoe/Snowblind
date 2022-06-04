import { Observable } from "../shared-internals.js";
/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @returns A pair of getter and setter to access the state.
 */
function useState(state) {
    const obs = new Observable(state);
    const callback = (newState) => {
        obs.next(newState);
        return newState;
    };
    return [obs, callback];
}
export { useState };
//# sourceMappingURL=useState.js.map