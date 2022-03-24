import {useState} from "./useState.js";

function useReducer(reducerFunction, initialValue, initFunction = (x) => x) {
	const [value, setValue] = useState(initFunction(initialValue));

	const dispatch = (obj) => {
		setValue(reducerFunction(obj))
	}

	return [value, dispatch]
}

export {useReducer}