import { ValueBinder } from "../shared-internals.js";
/**
 * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.
 * @param state A value used as a state to the current render cycle.
 * @param bind Whether to bind the state to a render instance
 * @returns A pair of getter and setter to access the state.
 */
declare function useState(state: any, bind?: boolean): [ValueBinder, Function];
export { useState };
//# sourceMappingURL=useState.d.ts.map