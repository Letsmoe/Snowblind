interface DescriptionObject {
	current: {
		name: string;
		it: Array<IterationObject["current"]>;
	}
}

interface IterationObject {
	current: {
		expects: Array<{ name: string; status: boolean, async: boolean }>;
		name: string;
	}
}

const sideEffects = {
	beforeEach: [],
	afterEach: [],
	beforeAll: [],
	afterAll: [],
};

const beforeEach = (fn: Function) => {
	sideEffects.beforeEach.push(fn);
}

const afterEach = (fn: Function) => {
	sideEffects.afterEach.push(fn);
}

const beforeAll = (fn: Function) => {
	sideEffects.beforeAll.push(fn);
}

const afterAll = (fn: Function) => {
	sideEffects.afterAll.push(fn);
}

var currIt: IterationObject = {current: {expects: [], name: ""}};
var currDesc: DescriptionObject = {current: {it: [], name: ""}};

export {
	sideEffects, beforeAll, afterAll, beforeEach, afterEach, currIt, currDesc
}

