import RenderAssignment from "./render-assignment.js";
import { Observer } from "./observer.js";
import { ISnowblindElement } from "./types";
export { useRef, useState, useEffect, } from "./hooks/index.js";
import { SnowblindChild } from "./shared-internals.js";
declare global {
    interface Window {
        typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
    }
}
declare function expose(components: any, optNames?: string[]): void;
declare const Snowblind: {
    Component: {
        new (props: {
            children?: SnowblindChild[];
        }, generator: Function, options?: {
            hasTheme: boolean;
            replace: ISnowblindElement;
        }): {
            hasTheme: any;
            _maxCopies: number;
            _usesTransition: boolean;
            didMountCallbacks: any[];
            didUpdateCallbacks: any[];
            willUnmountCallbacks: any[];
            _Observer: Observer;
            props: any;
            Renderer: RenderAssignment;
            _generatorFunction: any;
            Node: HTMLElement;
            transitionFunction?: {
                leave: Function;
                from: Function;
                render: Function;
            };
            onComponentDidMount(callback: Function): void;
            onComponentDidUpdate(callback: Function): void;
            onComponentWillUnmount(callback: Function): void;
            render(...args: any[]): any;
        };
    };
    createContext(initialValue: any): any[];
    renderAllIn(element?: HTMLElement): void;
    getNodeProperties(node: HTMLElement): Object;
    eventBus: {
        on(event: string, callback: Function): void;
        dispatch(event: string, data: any): void;
        remove(event: string, callback: EventListenerOrEventListenerObject): void;
    };
    createElement: (type: string, props: Object, children?: any[]) => HTMLElement;
};
export { Snowblind, expose };
//# sourceMappingURL=snowblind.d.ts.map