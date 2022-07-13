import { Component } from "./component.js";
declare type MakeFunctionInitializer = {
    displayName: string;
    defaultProps: {
        [key: string]: any;
    };
    propTypes: {
        [key: string]: any;
    };
    (props: {
        [key: string]: any;
    }): HTMLElement;
};
/**
 * A function that generates an HTML node from given inputs.
 * @param initializer The HTML type of the component or an initializer function to be called generating the HTML content.
 * @param props An object containing all attributes supposed to be assigned to the component.
 * @param children An array of child elements.
 * @returns The generated node as HTMLElement.
 */
declare function make(initializer: string | MakeFunctionInitializer | -32, props: Object | null, ...children: any[] | null): HTMLElement | Component;
export { make };
//# sourceMappingURL=make.d.ts.map