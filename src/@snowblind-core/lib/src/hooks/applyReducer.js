import { applyState } from "./applyState.js";
function applyReducer(reducer, initialValue, initFunction = (x) => x) {
    // Get the initial value by running the initFunction with the initialValue as argument.
    let init = initFunction(initialValue);
    const [state, setState] = applyState(init);
    const dispatch = (action) => {
        let result = reducer(state, action);
        setState(result);
    };
    return [state, dispatch];
}
export { applyReducer };
//# sourceMappingURL=applyReducer.js.map