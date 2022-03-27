import { useState } from "./useState.js";
function useValidatedState(initialValue, validation) {
    const [value, setValue] = useState(initialValue);
    const [lastValidValue, setLastValidValue] = useState(validation(initialValue) ? initialValue : undefined, false);
    const [valid, setValid] = useState(validation(initialValue), false);
    const changeValue = (newValue) => {
        if (validation(newValue)) {
            setLastValidValue(newValue);
            setValid(true);
        }
        else {
            setValid(false);
        }
        setValue(newValue);
    };
    return [{
            value,
            lastValidValue,
            valid
        }, changeValue];
}
export { useValidatedState };
//# sourceMappingURL=useValidatedState.js.map