import { iSnowblind } from "./types.js";
export { useRef, useState, useEffect } from "./hooks/index.js";
declare global {
    interface Window {
        typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
    }
}
/**
 * Exposes a component to be grabbed by the initial render process.
 * @param components List of components to add
 * @param optNames Optional list of names if they shall not be auto-retrieved from the components class name.
 */
declare function expose(components: any, optNames?: string[]): void;
declare const Snowblind: iSnowblind;
export { Snowblind, expose };
//# sourceMappingURL=snowblind.d.ts.map