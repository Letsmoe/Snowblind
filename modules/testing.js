import {
	propTypes
} from "./typecheck.js";
/**
 * Test something against what it should return to eliminate mistakes.
 * @param {String} description A description what is going to be tested.
 * @param {Function} callback The expression to be executed to test whether something holds true.
 */
var expectingDescription;
const executionMap = [[]];
var currentExecutionContext = executionMap[0];
var testInfo = [];
const conductedTests = [];
window.conductedTests = conductedTests;

const executePrepare = (listen = "BEFORE") => {
	for (const i of executionMap) {
		for (const j of i) {
			if (j[0] === listen) {
				j[1]();
			}
		}
	}
}

const executeTeardown = () => executePrepare("AFTER")

function beforeEach(callback) {
	currentExecutionContext.push(["BEFORE", callback])
}

function afterEach(callback) {
	currentExecutionContext.push(["AFTER", callback])
}

function describe(description = "", callback = () => {}) {
	executionMap.push([]);
	currentExecutionContext = executionMap[executionMap.length - 1];
	callback();
	executionMap.pop()
	const obj = {
		description: description,
		tests: testInfo
	};
	testInfo = []
	conductedTests.push(obj)
	console.log(window.conductedTests, conductedTests);
	return obj
}

function it(description = "", callback = () => {}, captureError = (e) => {
	throw e
}) {
	executePrepare();
	expectingDescription = description;
	var info;
	try {
		info = {
			state: "COMPLETED",
			value: callback(),
			description: description,
			code: callback.toString(),
		}
	} catch (e) {
		captureError(e);
		info = {
			state: "FAILED",
			error: e,
			description: description,
			code: callback.toString()
		};
	}
	testInfo.push(info);
	executeTeardown()
	return info
}

function expect(result) {
	var awaitResult = false;
	var declineResult = false;

	const lookupObject = new Proxy({
		toBe: (r, x) => ({
			message: `expected '${r}' to be '${x}'`,
			pass: Object.is(x, r)
		}),
		toEqual: (r, x) => ({
			message: `expected '${r}' to equal '${x}'`,
			pass: x == r
		}),
		toHaveType: (r, type) => ({
			message: `expected '${r}' to be of type '${type}'`,
			pass: propTypes[type](r)
		}),
		toContain: (r, x) => ({
			message: `expected '${r}' to contain '${x}'`,
			pass: propTypes.String(r) && r.includes(x)
		}),
		closeTo: (r, x, digits = 2) => ({
			message: `expected '${r}' to be ${digits} digits close to '${x}'`,
			pass: Math.abs(r - x) < (10 ** -digits) / 2
		}),
		toBeTruthy: (r) => ({
			message: `expected '${r}' to be truthy`,
			pass: r ? true : false
		}),
		toBeFalsy: (r) => ({
			message: `expected '${r}' to be falsy`,
			pass: r ? false : true
		}),
		toBeInTheDocument: (r) => ({
			message: `expected node to be in the document`,
			pass: document.contains(r)
		})
	}, {
		set: () => false,
		get: (x, y) => {
			if (y === "not") {
				declineResult = !declineResult;
				return lookupObject
			} else if (y === "resolves") {
				awaitResult = true;
				return lookupObject
			} else if (y === "and") {
				return lookupObject
			}

			return (...args) => {
				const not = declineResult;
				const resolveResult = (res) => {
					const isTrue = not ? !res.pass : res.pass
					if (isTrue === false) {
						throw new Error(`Test failed! "${expectingDescription}" - ${res.message}.`)
					}
				}
				if (awaitResult) {
					result.then(d => {
						if (x[y]) {
							const res = x[y](d, ...args)
							resolveResult(res, d);
						}
					})
				} else {
					if (x.hasOwnProperty(y)) {
						const res = x[y](result, ...args);
						resolveResult(res, result)
					}
				}
				return lookupObject
			}
		}
	})

	return lookupObject;
}



function mockFn(mockFunction = false) {
	const originalMockedFunction = mockFunction || (() => {
		const once = _returnValueOnce.shift();
		return once !== undefined ? once : _returnValue;
	})

	const mockObject = {
		calls: [],
		results: [],
		instances: [],
		lastCall: [],
		mockedFunction: originalMockedFunction
	}

	var _returnValue = null
	var _returnValueOnce = []
	var _name = "";

	const reference = {
		returnValue: (val) => _returnValue = val,
		returnValueOnce: (val) => _returnValueOnce.push(val),
		mockName: (val) => _name = val,
		getMockName: () => _name,
		mockClear: () => mockObject.calls = mockObject.results = mockObject.instances = mockObject.lastCall = [],
		mockImplementation: (fn) => mockObject.mockedFunction = fn,
		mockImplementationOnce: (fn) => {
			const oldFunction = mockObject.mockedFunction;
			mockObject.mockedFunction = () => {
				mockObject.mockedFunction = oldFunction;
				return fn()
			}
		},
		mockResolvedValue: (val) => {
			reference.mockImplementation(() => {
				Promise.resolve(val);
			})
		},
		mockResolvedValueOnce: (val) => {
			reference.mockImplementationOnce(() => {
				Promise.resolve(val);
			})
		},
		mockRejectedValue: (val) => {
			reference.mockImplementation(() => {
				Promise.reject(val);
			})
		},
		mockRejectedValueOnce: (val) => {
			reference.mockImplementationOnce(() => {
				Promise.reject(val);
			})
		},
		mockRestore: () => {
			reference.mockClear();
			mockObject.mockedFunction = originalMockedFunction
		},
		mockReturnThis: () => {
			reference.mockImplementation(function () {
				return this
			})
		}
	}

	const fn = function (...args) {
		return mockObject.mockedFunction(...args)
	}

	const object = new Proxy(fn, {
		set() {
			return false
		},
		get(x, name) {
			if (mockObject.hasOwnProperty(name)) {
				return mockObject[name]
			}

			return (...args) => {
				reference[name](...args)
				return object
			}
		},
		apply(target, thisArg, args) {
			mockObject.calls.push(args)
			mockObject.lastCall = args
			try {
				const result = fn(...args);
				mockObject.results.push({
					type: "return",
					value: result
				})
				return result;
			} catch (e) {
				mockObject.results.push({
					type: "throw",
					value: e
				})
				return e
			}
		},
		construct(target, args) {
			const instance = new target(args);
			mockObject.instances.push(instance);
			return instance;
		}
	})
	return object;
}


export {
	it,
	expect,
	beforeEach,
	afterEach,
	mockFn,
	describe,
	conductedTests
}