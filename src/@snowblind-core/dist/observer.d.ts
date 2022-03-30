import RenderAssignment from "./render-assignment.js";
declare class Observer {
    _value: any;
    boundRender: RenderAssignment;
    debounce: any;
    constructor(value: object, callback?: Function);
}
export { Observer };
//# sourceMappingURL=observer.d.ts.map