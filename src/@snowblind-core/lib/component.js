import { UpdateDispatcher } from "./shared-internals";
class Component {
    constructor(generator, typeName) {
        this.didUpdateOnce = false;
        this.didMountCallbacks = [];
        this.didUpdateCallbacks = [];
        this.willUnmountCallbacks = [];
        this.type = typeName;
        this.generator = generator;
        /**
         * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
         */
        UpdateDispatcher.next(this);
        UpdateDispatcher.restore();
    }
    render() {
        this.node = this.generator();
        return this.node;
    }
    onComponentDidMount(callback) {
        this.didMountCallbacks.push(callback);
    }
    onComponentDidUpdate(callback) {
        this.didUpdateCallbacks.push(callback);
    }
    onComponentWillUnmount(callback) {
        this.willUnmountCallbacks.push(callback);
    }
    didUpdate() {
        if (this.didUpdateOnce) {
            this.didUpdateCallbacks.forEach((callback) => callback(this.node));
        }
        else {
            this.didMountCallbacks.forEach((callback) => callback(this.node));
            this.didUpdateOnce = true;
        }
    }
}
export { Component };
//# sourceMappingURL=component.js.map