interface DescriptionObject {
    current: {
        name: string;
        it: Array<IterationObject["current"]>;
    };
}
interface IterationObject {
    current: {
        expects: Array<{
            name: string;
            status: boolean;
            async: boolean;
        }>;
        name: string;
    };
}
declare const sideEffects: {
    beforeEach: any[];
    afterEach: any[];
    beforeAll: any[];
    afterAll: any[];
};
declare const beforeEach: (fn: Function) => void;
declare const afterEach: (fn: Function) => void;
declare const beforeAll: (fn: Function) => void;
declare const afterAll: (fn: Function) => void;
declare var currIt: IterationObject;
declare var currDesc: DescriptionObject;
export { sideEffects, beforeAll, afterAll, beforeEach, afterEach, currIt, currDesc };
//# sourceMappingURL=side-effects.d.ts.map