declare class Component {
    private didUpdateOnce;
    private didMountCallbacks;
    private didUpdateCallbacks;
    private willUnmountCallbacks;
    node: HTMLElement;
    generator: Function;
    constructor(generator: any);
    transitionFunction?: {
        leave: Function;
        from: Function;
        render: Function;
    };
    render(): HTMLElement;
    onComponentDidMount(callback: Function): void;
    onComponentDidUpdate(callback: Function): void;
    onComponentWillUnmount(callback: Function): void;
    didUpdate(): void;
}
export { Component };
//# sourceMappingURL=component.d.ts.map