import RenderAssignment from "./render-assignment";
declare class Observer {
    _value: any;
    boundRender: RenderAssignment;
    debounce: any;
    /**
     * Instantiates a proxy based on a passed object supporting rerendering of components.
     * @param value The object a proxy should be attached to.
     */
    constructor(value: object, callback?: Function);
}
export { Observer };
//# sourceMappingURL=observer.d.ts.map