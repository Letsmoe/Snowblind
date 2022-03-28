import { ValueBinder } from "@snowblind/core";
import { useState } from "@snowblind/core";

/**
 * Toggle through a list of options.
 * @param initialValue The first value the function shall use.
 * @param options A list of options to choose from.
 * @returns An array consisting of the value, on the first call it'll be the initial value and a toggle function to loop through the possibilities starting at the index of the initial value.
 */
function useToggle(
	initialValue: boolean | number | string,
	options: (boolean | number | string)[]
): [ValueBinder, Function] {
	let index = options.indexOf(initialValue);
	const [value, setValue] = useState(initialValue);
	const mimicSetValue = () => {
		// Let the index wrap back around.
		index = index == options.length - 1 ? 0 : index + 1;
		let value = options[index];
		setValue(value);
	};
	return [value, mimicSetValue];
}

export { useToggle };
