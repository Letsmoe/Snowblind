import { useState } from "./useState.js";
function useInputState(initialValue) {
    const [value, setValue] = useState(initialValue);
    const changeEvent = (e) => setValue(e.value);
    return [value, changeEvent];
}
export { useInputState };
//# sourceMappingURL=useInputState.js.map