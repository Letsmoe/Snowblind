import { useState } from "@snowblind/core";
function useReducer(reducerFunction, initialValue, initFunction = (x) => x) {
    const [value, setValue] = useState(initFunction(initialValue));
    const dispatch = (obj) => {
        setValue(reducerFunction(obj));
    };
    return [value, dispatch];
}
export { useReducer };
