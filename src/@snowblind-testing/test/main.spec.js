// test/sub.spec.js
import {describe, it, expect, afterEach, beforeEach, afterAll, beforeAll} from "../lib/index.js";
import {add} from "./importmodule.js";

describe("every matching condition", () => {
	it("tests the `toBe` property", () => {
		expect(expect(true, false).toBe(true).result).toBe(true);
		expect(expect(false, false).toBe(true).result).toBe(false)
	})
	it("tests the `toEqual` property", () => {
		expect(expect("Hey", false).toEqual("Hey").result).toBe(true)
		expect(expect("Hey", false).toEqual("Nice").result).toBe(false)
	})

	it("check whether a value is truthy", () => {
		expect(expect(1, false).toBeTruthy().result).toBe(true)
		expect(expect(0, false).toBeTruthy().result).toBe(false)
	})

	it("checks whether a value is falsy", () => {
		expect(expect("", false).toBeFalsy().result).toBe(true)
		expect(expect("awd", false).toBeFalsy().result).toBe(false)
	})

	it("tests if a number is x digits close to another", () => {
		expect(expect(4.02, false).closeTo(4, 1).result).toBe(true)
		expect(expect(-24.005, false).closeTo(12.5, 1).result).toBe(false)
	})
})

describe("test add functions", () => {
	it("should return 4", () => {
		expect(add(2,2)).toBe(4)
		expect(add(2,3)).to(x => x == 5)
	})
})

describe("Asynchronous thread handling", () => {
	it("should resolve asynchronously", () => {
		expect(new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(1)
			}, 500)
		})).resolves.toBe(1);
		expect(new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({hello: "nice"})
			}, 500)
		})).resolves.toEqual({hello: "nice"});
	})
})