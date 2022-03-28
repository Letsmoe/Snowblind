import { useState } from "@snowblind/core";
/**
 * Shorthand for the `event.currentTarget.value` syntax that would have to be used with inputs normally.
 * @param initialValue The value to initialize the state with.
 * @returns An instance of a ValueBinder containing information about the states value and the event changing the ValueBinder's value.
 */
function useInputState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const changeEvent = (e) => setValue(e.value);
    return [value, changeEvent];
}
export { useInputState };
