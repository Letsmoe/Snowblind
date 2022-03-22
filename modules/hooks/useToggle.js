import {useState} from "/modules/hooks/useState.js";

/**
 * Toggle through a list of options.
 * @param {any} initialValue The first value the function shall use.
 * @param {Array<any>} options A list of options to choose from.
 * @returns {Array<any, Function>} An array consisting of the value, on the first call it'll be the initial value and a toggle function to loop through the possibilities starting at the index of the initial value.
 */
function useToggle(initialValue, options) {
	let index = options.indexOf(initialValue);
	const [value, setValue] = useState(initialValue);
	const mimicSetValue = () => {
		// Let the index wrap back around.
		index = (index == options.length - 1) ? 0 : index + 1;
		let value = options[index]
		setValue(value)
	}
	return [value, mimicSetValue]
}

export {useToggle};