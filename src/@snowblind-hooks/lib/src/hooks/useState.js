import { UpdateDispatcher, Observable, ValueBinder } from "../shared-internals.js";
/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @param bind Whether to bind the state to a render instance
 * @returns A pair of getter and setter to access the state.
 */
function useState(state, bind = true) {
    const obs = new Observable(state);
    var value = new ValueBinder(obs);
    if (bind === true) {
        UpdateDispatcher.subscribe((component) => {
            const renderer = component.Renderer;
            obs.subscribe(() => {
                renderer.Render();
            });
        });
    }
    const _callback = (newState) => {
        if (typeof newState === 'function') {
            // Execute a function to get the next values;
            newState = newState();
        }
        newState = newState.valueOf();
        obs.next(newState);
        return newState;
    };
    return [value, _callback];
}
export { useState };
