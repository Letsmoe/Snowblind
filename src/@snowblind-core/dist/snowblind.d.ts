import { Component } from "./component.js";
import { render } from "./render.js";
import { SnowblindFragment } from "./fragment.js";
import { make } from "./make.js";
declare global {
    interface Window {
        typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
    }
}
declare const Snowblind: {
    options: {
        allowObjectProperties: boolean;
    };
    Component: typeof Component;
    Fragment: typeof SnowblindFragment;
    make: typeof make;
    render: typeof render;
};
export { Snowblind };
export { applyState, applyRef, applyMemo, applyReducer, applyStyles, applyChange, } from "./hooks/index.js";
//# sourceMappingURL=snowblind.d.ts.map