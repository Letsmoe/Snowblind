declare class Observable {
    _value: any;
    _subscribers: any[];
    constructor(value?: any);
    next(value: any): void;
    subscribe(callback: (element?: any) => void): void;
    complete(): void;
    restore(): void;
}
declare class SnowblindRef implements ISnowblindRef {
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
declare class SnowblindChild {
    ID: string;
    element: any;
    constructor(el: HTMLElement);
    setElement(el: HTMLElement): void;
}
declare const childrenObjects: {};
declare const exposedComponents: {};
declare const UpdateDispatcher: Observable;
export { UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindChild, childrenObjects, SnowblindRef };
//# sourceMappingURL=shared-internals.d.ts.map