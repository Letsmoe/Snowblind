import { UpdateDispatcher, Observable, ValueBinder } from "../shared-internals.js";
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
            newState = newState();
        }
        newState = newState.valueOf();
        obs.next(newState);
        return newState;
    };
    return [value, _callback];
}
export { useState };
//# sourceMappingURL=useState.js.map
