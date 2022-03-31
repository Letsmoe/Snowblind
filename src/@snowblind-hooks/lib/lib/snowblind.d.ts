export namespace Snowblind {
    export { Component };
    export function createContext(initialValue: any): any[];
    export function createContext(initialValue: any): any[];
    export function renderAllIn(element?: HTMLElement): void;
    export function renderAllIn(element?: HTMLElement): void;
    export function getNodeProperties(node: any): any;
    export function getNodeProperties(node: any): any;
    export namespace eventBus {
        function on(event: any, callback: any): void;
        function on(event: any, callback: any): void;
        function dispatch(event: any, data: any): void;
        function dispatch(event: any, data: any): void;
        function remove(event: any, callback: any): void;
        function remove(event: any, callback: any): void;
    }
    export function createElement(type: any, props: any, children?: any[]): any;
}
declare class Component {
    constructor(props: any, generator: any, options?: {
        hasTheme: boolean;
        replace: any;
    });
    hasTheme: boolean;
    _maxCopies: number;
    _usesTransition: boolean;
    didMountCallbacks: any[];
    didUpdateCallbacks: any[];
    willUnmountCallbacks: any[];
    _Observer: Observer;
    props: any;
    Renderer: RenderAssignment;
    _generatorFunction: any;
    onComponentDidMount(callback: any): void;
    onComponentDidUpdate(callback: any): void;
    onComponentWillUnmount(callback: any): void;
    render(...args: any[]): any;
}
import { Observer } from "@snowblind/core/lib/observer";
import RenderAssignment from "@snowblind/core/lib/render-assignment";
export { useRef, useState, useEffect } from "./hooks/index";
//# sourceMappingURL=snowblind.d.ts.map