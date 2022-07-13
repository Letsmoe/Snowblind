import { Component } from "./component.js";
import { render } from "./render.js";
import { make } from "./make.js";
import { options } from "./options.js";
;
const Snowblind = {
    options: options,
    Component: Component,
    Fragment: "div",
    make: make,
    render: render
};
export { Snowblind };
export { applyState, applyRef, applyMemo, applyReducer, applyStyles, applyChange, } from "./hooks/index.js";
//# sourceMappingURL=snowblind.js.map