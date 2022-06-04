import { iSnowblind } from "./types.js";
export { useRef, useState, onRender } from "./hooks/index.js";
declare global {
    interface Window {
        typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
    }
}
declare const Snowblind: iSnowblind;
export { Snowblind };
//# sourceMappingURL=snowblind.d.ts.map