import { Component } from "./component.js";
declare global {
    interface Window {
        typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
    }
}
declare type Props = {
    children: any[];
    [key: string]: any;
};
interface Snowblind {
    options: {
        allowObjectProperties: boolean;
    };
    Component: typeof Component;
    Fragment: -32 | string;
    make: (initializer: string | ((props: {
        [key: string]: any;
    }) => HTMLElement) | -32, props: Object | null, ...children: any[] | null) => any;
    render: (parent: any, children: any) => void;
    Props?: Props;
}
declare const Snowblind: Snowblind;
export { Snowblind };
export { applyState, applyRef, applyMemo, applyReducer, applyStyles, applyChange, } from "./hooks/index.js";
//# sourceMappingURL=snowblind.d.ts.map