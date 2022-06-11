declare class Observable {
    value: any;
    private subscribers;
    subscriberCount: number;
    constructor(value?: any);
    next(value: any): void;
    subscribe(callback: (element?: any) => void): void;
    restore(): void;
}
declare function ObserverProxy(obs: Observable): {
    value: any;
};
declare class Reference {
    current: any;
    constructor();
}
declare const UpdateDispatcher: Observable;
declare const isProxy: unique symbol;
export { UpdateDispatcher, Observable, Reference, ObserverProxy, isProxy };
//# sourceMappingURL=shared-internals.d.ts.map