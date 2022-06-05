class Observable {
    constructor(value) {
        this.subscriberCount = 0;
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
        this.subscriberCount++;
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
}
class Reference {
    constructor() {
        this.current;
    }
}
const UpdateDispatcher = new Observable();
export { UpdateDispatcher, Observable, Reference };
//# sourceMappingURL=shared-internals.js.map