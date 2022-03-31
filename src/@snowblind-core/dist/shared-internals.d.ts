declare class Observable {
    _value: any;
    _subscribers: any[];
    constructor(value?: any);
    next(value: any): void;
    subscribe(callback: (element?: any) => void): void;
    complete(): void;
    restore(): void;
}
declare class SnowblindRef {
    current: HTMLElement;
    constructor();
}
declare class ValueBinder {
    observable: any;
    value: any;
    constructor(obs: Observable);
    valueOf(): any;
    toString(): any;
}
declare const NodeInsertAfter: (newNode: any, current: any) => void;
declare const exposedComponents: {};
declare const UpdateDispatcher: Observable;
export { UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindRef, NodeInsertAfter };
//# sourceMappingURL=shared-internals.d.ts.map