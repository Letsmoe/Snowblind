import { Observable, UpdateDispatcher } from "../shared-internals.js";
import deepCompare from "../utils/deepCompare.js";
function onChange(callback, stateConditional = []) {
    // Store original values to compare against later on, if one updated render the component again.
    var originalValues = stateConditional.map((x) => x.valueOf());
    const current = UpdateDispatcher.value;
    const runCallback = (node) => {
        if (originalValues.length > 0) {
            // Compare the original values to the current values, if they are different, render the component again.
            let flag = false;
            for (let i = 0; i < originalValues.length; i++) {
                if (!deepCompare(originalValues[i], stateConditional[i].valueOf())) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                callback(node);
                originalValues = stateConditional.map((x) => x.valueOf());
            }
        }
        else {
            /**
             * Always call the passed callback
             */
            callback(node);
        }
    };
    current.onComponentDidMount(runCallback);
    current.onComponentDidUpdate(runCallback);
    stateConditional.forEach((x) => {
        if (x instanceof Observable) {
            x.subscribe(runCallback);
        }
    });
}
export { onChange };
//# sourceMappingURL=onChange.js.map