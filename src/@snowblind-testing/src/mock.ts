function mockFn(mockFunction : any) {
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
			const instance = target(args);
			mockObject.instances.push(instance);
			return instance;
		}
	})
	return object;
}

export {mockFn};