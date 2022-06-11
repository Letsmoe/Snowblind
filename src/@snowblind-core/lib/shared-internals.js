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
    restore() {
        this.subscribers = [];
        this.value = undefined;
    }
}
function ObserverProxy(obs) {
    let target = { value: obs.value };
    /** A function to update the value of the proxy from the instance that instantiated the proxy */
    obs.subscribe((newValue) => target.value = newValue);
    return new Proxy(target, {
        get(target, prop) {
            if (prop === isProxy) {
                return obs;
            }
            const prim = Reflect.get(target, "value");
            const value = prim[prop];
            return typeof value === "function" ? value.bind(prim) : value;
        },
        ownKeys(target) {
            return Reflect.ownKeys(target.value);
        }
    });
}
class Reference {
    constructor() {
        this.current;
    }
}
const UpdateDispatcher = new Observable();
const isProxy = Symbol("isProxy");
export { UpdateDispatcher, Observable, Reference, ObserverProxy, isProxy };
//# sourceMappingURL=shared-internals.js.map