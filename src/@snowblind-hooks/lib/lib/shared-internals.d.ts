export const UpdateDispatcher: Observable;
export class ValueBinder {
    constructor(obs: any);
    observable: any;
    value: any;
    valueOf(): any;
    toString(): any;
}
export class Observable {
    constructor(value: any);
    _value: any;
    _subscribers: any[];
    next(value: any): void;
    subscribe(callback: any): void;
    complete(): void;
    restore(): void;
}
export const exposedComponents: {};
export class SnowblindChild {
    constructor(el: any);
    ID: string;
    setElement(el: any): void;
    element: any;
}
export const childrenObjects: {};
export class SnowblindRef {
}
//# sourceMappingURL=shared-internals.d.ts.map