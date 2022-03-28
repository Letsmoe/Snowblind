import {useState} from "@snowblind/core";

function useReducer(reducerFunction : (obj : any) => any, initialValue : any, initFunction = (x : any) => x) {
	const [value, setValue] = useState(initFunction(initialValue));

	const dispatch = (obj : any) => {
		setValue(reducerFunction(obj))
	}

	return [value, dispatch]
}

export {useReducer}