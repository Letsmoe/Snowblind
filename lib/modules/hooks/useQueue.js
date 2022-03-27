import { useState } from "./useState.js";
function useQueue(limit, initialValues = []) {
    const makeState = (r) => ({
        state: r.slice(0, limit),
        queue: r.slice(limit)
    });
    const [{ state, queue }, setState] = useState({
        state: initialValues.slice(0, limit),
        queue: initialValues.slice(limit)
    });
    const shift = () => {
        var shiftedItem;
        setState((current) => {
            let results = [...current.state, ...current.queue];
            shiftedItem = results.shift();
            return makeState(results);
        });
        return shiftedItem;
    };
    const add = (...els) => {
        setState((current) => {
            let results = [...current.state, ...current.queue, ...els];
            return makeState(results);
        });
    };
    const update = (fn) => {
        setState((current) => {
            let results = fn([...current.state, ...current.queue]);
            return makeState(results);
        });
    };
    const cleanQueue = () => setState((current) => ({
        state: current.state,
        queue: []
    }));
    return {
        state,
        queue,
        add,
        shift,
        update,
        cleanQueue
    };
}
export { useQueue };
//# sourceMappingURL=useQueue.js.map