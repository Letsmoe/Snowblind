declare class Observable {
    value: any;
    private subscribers;
    constructor(value?: any);
    next(value: any): void;
    subscribe(callback: (element?: any) => void): void;
    complete(): void;
    restore(): void;
    valueOf(): any;
    toString(): any;
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
/**
 * Inserts a given element after another.
 * @param newNode The node to be inserted after
 * @param current The element given node should be inserted after.
 */
declare const NodeInsertAfter: (newNode: any, current: any) => void;
declare const exposedComponents: {};
declare const UpdateDispatcher: Observable;
export { UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindRef, NodeInsertAfter };
//# sourceMappingURL=shared-internals.d.ts.map