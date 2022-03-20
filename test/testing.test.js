import {it, describe, expect} from "../dist/testing.js";


const insideTest = () => {
	return describe("test-description", () => {
		it("test-sub-description", () => {
			expect(true).toBe(true);
		})
	})
}

describe("testing tests with test functions that aren't tested with tests xD", () => {
	it("should return true when calling `expect(true).toBe(true)`", () => {
		const testValue = insideTest();
		expect(testValue.description).toEqual("test-description");
		expect(testValue.tests.length).toEqual(1)
		expect(testValue.tests[0].description).toEqual("test-sub-description");
		expect(testValue.tests[0].state).toEqual("COMPLETED")
		expect(testValue.tests[0].value).toEqual(undefined)
	})
})