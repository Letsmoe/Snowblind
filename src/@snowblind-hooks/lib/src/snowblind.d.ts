import RenderAssignment from "./render-assignment.js";
import { Observer } from "./observer.js";
export { useRef, useState, useEffect, } from "./hooks/index";
import { SnowblindChild } from "./shared-internals.js";
/**
 * Add component to global scope;
 */
declare const Snowblind: {
    Component: {
        new (props: {
            children?: SnowblindChild[];
        }, generator: Function, options?: {
            hasTheme: boolean;
            replace: HTMLElement;
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
    /**
     * Searches the DOMTree recursively for components, this will ensure parent nodes will be rendered and their children will be included in the render afterwards
     */
    renderAllIn(element?: HTMLElement): void;
    getNodeProperties(node: HTMLElement): Object;
    eventBus: {
        on(event: string, callback: Function): void;
        dispatch(event: string, data: any): void;
        remove(event: string, callback: EventListenerOrEventListenerObject): void;
    };
    createElement: (type: string, props: Object, children?: any[]) => HTMLElement;
};
export { Snowblind };
//# sourceMappingURL=snowblind.d.ts.map