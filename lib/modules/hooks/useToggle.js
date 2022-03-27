import { useState } from "./useState.js";
function useToggle(initialValue, options) {
    let index = options.indexOf(initialValue);
    const [value, setValue] = useState(initialValue);
    const mimicSetValue = () => {
        index = index == options.length - 1 ? 0 : index + 1;
        let value = options[index];
        setValue(value);
    };
    return [value, mimicSetValue];
}
export { useToggle };
//# sourceMappingURL=useToggle.js.map