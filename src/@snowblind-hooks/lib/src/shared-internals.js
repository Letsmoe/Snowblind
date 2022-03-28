class Observable {
    constructor(value) {
        this._value = value;
        this._subscribers = [];
    }
    next(value) {
        this._value = value;
        for (const subscriber of this._subscribers) {
            subscriber(value);
        }
    }
    subscribe(callback) {
        this._subscribers.push(callback);
    }
    complete() {
        this._subscribers = new Proxy([], { set: () => {
                throw new Error("Observable has been completed.");
            } });
    }
    restore() {
        this._subscribers = [];
        this._value = undefined;
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
        this.value = obs._value;
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
class SnowblindChild {
    constructor(el) {
        this.ID = (Math.random() + 1).toString(36).substring(2);
        childrenObjects[this.ID] = this;
        this.setElement(el);
    }
    setElement(el) {
        this.element = el;
        if (this.element.setAttribute) {
            this.element.setAttribute("data-is-snowblind-child", this.ID);
        }
    }
}
const childrenObjects = {};
const exposedComponents = {};
const UpdateDispatcher = new Observable();
export { UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindChild, childrenObjects, SnowblindRef };
