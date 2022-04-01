const propTypes = new Proxy({
	Number: (x) => typeof x === 'number',
	Integer: (x) => (typeof x === 'number') && x % 1 === 0,
	BigInt: (x) => typeof x === "bigint",
	Float: (x) => (typeof x === "number") && x % 1 !== 0,
	String: (x) => typeof x === "string",
	Array: (x) => Array.isArray(x),
	Object: (x) => (typeof x === "object") && !Array.isArray(x),
	Symbol: (x) => typeof x === "symbol",
	Boolean: (x) => typeof x === "boolean",
	Function: (x) => typeof x === "function",
	node: (x) => ["number", "string"].indexOf(typeof x) > -1 || x instanceof HTMLElement || Array.isArray(x),
	element: (x) => x instanceof HTMLElement,
	elementType: (x) => x instanceof this.Component,
	instanceOf: function (instance) {
		return (x) => x instanceof instance;
	},
	typeOf: function (type) {
		return (x) => typeof x === type;
	},
	oneOfType: function (types) {
		return (x) => {
			return types.map(y => {
				return typeof y === "function" ? y(x) : this[y](x)
			}).indexOf(true) > -1
		};
	},
	oneOf: function (values) {
		return (x) => {
			return values.indexOf(x) > -1;
		}
	},
	arrayOf: function (type) {
		return (x) => {
			return this.Array.isArray(x) ? x.map(y => {
				typeof type === "function" ? type(x) : this[type](x)
			}).indexOf(false) === -1 : false
		};
	},
	objectOf: function (type) {
		return (x) => {
			return x ? this.arrayOf(type)(Object.values(x)) : false
		};
	},
	shape: function (typeObject) {
		return (testObj) => {
			/**
			 * Run exact inexactly :)
			 */
			return this.exact(typeObject, true)(testObj)
		}
	},
	exact: function (typeObject, runInexact = false) {
		return (testObj) => {
			if (testObj && typeObject) {
				for (const i in testObj) {
					if (typeObject.hasOwnProperty(i)) {
						var compareFunc = typeof typeObject[i] === "string" ? this[typeObject[i]] : typeObject[i];
						var result = compareFunc(testObj[i])
						if (result === false) {
							return result
						}
					} else if (!runInexact) {
						return false
					}
				}
			} else {
				return false
			}
		}
	},
	customProp: (Func) => {
		return Func
	},
	Any: () => true
}, {
	set: () => false,
	get: function (obj, key) {
		if (obj.hasOwnProperty(key)) {
			var Func = obj[key];
			Func.isRequired = function (x, prop) {
				if (typeof x === "undefined") {
					throw new Error(`Encountered undefined prop "${prop}" as required object.`)
				} else {
					return obj[key](x);
				}
			}
			Func.ofLength = function (length) {
				return (x) => {
					return obj[key](x) && x.length === length;
				}
			}
			return Func
		} else {
			throw new Error(`Invalid type for property "${key}" encountered.`)
		}
	}
})

const typeIf = function (value, type, ifTrue, ifFalse) {
	var result = typeCheck({
		value: value
	}, {
		value: type
	}, {}, {
		returnBool: true
	})
	return result ? ifTrue : ifFalse;
}

const typeCheck = function (obj, optPropertyTypes, defaultProps, options) {
	options = Object.assign({
		returnBool: false
	}, options)
	obj = Object.assign({}, defaultProps, obj)
	var store = []
	if (typeof optPropertyTypes !== 'undefined') {
		for (const prop in optPropertyTypes) {
			const propType = optPropertyTypes[prop];
			const runFunction = typeof propType === "function" ? propType : (propTypes[propType] || (() => false))
			var Result = runFunction(obj[prop], prop);
			if (Result === false) {
				if (options.returnBool) {
					return Result;
				} else {
					throw new Error(`Invalid type for property "${prop}" encountered.`)
				}
			}
			store.push(Result)
		}
	}
	if (options.returnBool && store.indexOf(false) === -1) {
		return true
	}
	return obj
}

export {
	typeIf,
	typeCheck,
	propTypes
}