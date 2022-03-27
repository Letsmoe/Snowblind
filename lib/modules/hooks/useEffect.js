import { UpdateDispatcher } from "../../src/shared-internals.js";
import deepCompare from "../utils/deepCompare.js";
function useEffect(callback, stateConditional = []) {
    var originalValues = stateConditional.map(x => x.valueOf());
    UpdateDispatcher.subscribe((value) => {
        const runCallback = (node) => {
            if (originalValues.length > 0) {
                if (originalValues.filter((x, i) => !deepCompare(x, stateConditional[i].valueOf())).length > 0 || originalValues.length == 0) {
                    callback(node);
                    originalValues = stateConditional.map(x => x.valueOf());
                }
            }
            else {
                callback(node);
            }
        };
        value.onComponentDidMount(runCallback);
        value.onComponentDidUpdate(runCallback);
    });
}
export { useEffect };
//# sourceMappingURL=useEffect.js.map