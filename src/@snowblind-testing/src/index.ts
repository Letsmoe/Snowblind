/* import {
	propTypes
} from "../../bundles/typecheck.min.js"; */
import {mockFn} from "./mock";

declare global {
	interface Window {
		conductedTests: any[];
	}
}

/**
 * Test something against what it should return to eliminate mistakes.
 * @param {String} description A description what is going to be tested and what for.
 * @param {Function} callback The expression to be executed to test whether something holds true.
 */
var expectingDescription;
const executionMap = [
	[]
];
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
		/* toHaveType: (r, type) => ({
			message: `expected '${r}' to be of type '${type}'`,
			pass: propTypes[type](r)
		}),
		toContain: (r, x) => ({
			message: `expected '${r}' to contain '${x}'`,
			pass: propTypes.String(r) && r.includes(x)
		}), */
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
							resolveResult(res);
						}
					})
				} else {
					const res = x[y](result, ...args);
					resolveResult(res)
				}
				return lookupObject
			}
		}
	})

	return lookupObject;
}

export {
	it,
	expect,
	beforeEach,
	mockFn,
	describe,
	conductedTests
}