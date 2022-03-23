import {useState} from "./useState.js";

/**
 * Shorthand for the `event.currentTarget.value` syntax that would have to be used with inputs normally.
 * @param {any} initialValue The value to initialize the state with.
 * @returns [value, changeEvent]
 */
function useInputState(initialValue) {
	const [value, setValue] = useState(initialValue);
	const changeEvent = (evt) => setValue(evt.currentTarget.value);

	return [value, changeEvent];
}

export {useInputState};