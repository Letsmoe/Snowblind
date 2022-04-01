import {
	expect, it, describe
} from "./index.js";

console.log(expect, it, describe);

describe("the functionality of `expect`", function() {
	it("should return `true` for `expect(true).toBe(true)`", () => {
		expect(expect(true).toBe(true)).toBe(true);
	})
})