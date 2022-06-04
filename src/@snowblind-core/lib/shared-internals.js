class Observable {
    constructor(value) {
        this.value = value;
        this.subscribers = [];
    }
    next(value) {
        this.value = value;
        for (const subscriber of this.subscribers) {
            subscriber(value);
        }
    }
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    complete() {
        this.subscribers = new Proxy([], { set: () => {
                throw new Error("Observable has been closed.");
            } });
    }
    restore() {
        this.subscribers = [];
        this.value = undefined;
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value.toString();
    }
}
class SnowblindRef {
    constructor() {
        this.current;
    }
}
class ValueBinder {
    constructor(obs) {
        this.observable = obs;
        this.value = obs.value;
        obs.subscribe((val) => {
            this.value = val;
        });
    }
    valueOf() {
        return this.value;
    }
    toString() {
        return this.value.toString();
    }
}
;
/**
 * Inserts a given element after another.
 * @param newNode The node to be inserted after
 * @param current The element given node should be inserted after.
 */
const NodeInsertAfter = function (newNode, current) {
    if (current && current.parentNode) {
        current.parentNode.insertBefore(newNode, current.nextSibling);
    }
};
const exposedComponents = {};
const UpdateDispatcher = new Observable();
export { UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindRef, NodeInsertAfter };
//# sourceMappingURL=shared-internals.js.map