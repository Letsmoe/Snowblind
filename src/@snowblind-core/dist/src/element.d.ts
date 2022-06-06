import { ISnowblindElement } from "./types.js";
declare class SnowblindElement {
    attributes: {
        [key: string]: any;
    };
    node: ISnowblindElement;
    values: any[];
    createdNewComponent: boolean;
    constructor(node: ISnowblindElement, values: any[], walker?: TreeWalker);
    trySetAttribute(key: string, value: any): void;
    setObject(object: {}): void;
    setConditionally(property: string, value: any): void;
    setProperties(property: string, props: any): void;
    setEvent(event: string, callback: Function, onlyThisNode?: boolean): void;
}
export { SnowblindElement };
//# sourceMappingURL=element.d.ts.map