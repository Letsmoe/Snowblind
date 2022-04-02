const sideEffects = {
    beforeEach: [],
    afterEach: [],
    beforeAll: [],
    afterAll: [],
};
const beforeEach = (fn) => {
    sideEffects.beforeEach.push(fn);
};
const afterEach = (fn) => {
    sideEffects.afterEach.push(fn);
};
const beforeAll = (fn) => {
    sideEffects.beforeAll.push(fn);
};
const afterAll = (fn) => {
    sideEffects.afterAll.push(fn);
};
var currIt = { current: { expects: [], name: "" } };
var currDesc = { current: { it: [], name: "" } };
export { sideEffects, beforeAll, afterAll, beforeEach, afterEach, currIt, currDesc };
