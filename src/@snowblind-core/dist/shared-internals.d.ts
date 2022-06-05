declare class Observable {
    value: any;
    private subscribers;
    subscriberCount: number;
    constructor(value?: any);
    next(value: any): void;
    subscribe(callback: (element?: any) => void): void;
    complete(): void;
    restore(): void;
}
declare class Reference {
    current: any;
    constructor();
}
declare const UpdateDispatcher: Observable;
export { UpdateDispatcher, Observable, Reference };
//# sourceMappingURL=shared-internals.d.ts.map