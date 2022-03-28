import {useState} from "@snowblind/core";

function useContext(context) {
	if (!context.subscribe) {
		throw new TypeError('`useContext` must be used with a context object created with `createContext`')
	}
	// Subscribe to the component;
	const [state, setState] = useState(context._value);
	context.subscribe(newValue => {
		setState(newValue);
	})

	return state.value;
}

export { useContext }