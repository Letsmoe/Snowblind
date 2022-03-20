/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./index.testing.js":
/*!**************************!*\
  !*** ./index.testing.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"afterEach\": () => (/* reexport safe */ _modules_testing_js__WEBPACK_IMPORTED_MODULE_0__.afterEach),\n/* harmony export */   \"describe\": () => (/* reexport safe */ _modules_testing_js__WEBPACK_IMPORTED_MODULE_0__.describe),\n/* harmony export */   \"expect\": () => (/* reexport safe */ _modules_testing_js__WEBPACK_IMPORTED_MODULE_0__.expect),\n/* harmony export */   \"it\": () => (/* reexport safe */ _modules_testing_js__WEBPACK_IMPORTED_MODULE_0__.it)\n/* harmony export */ });\n/* harmony import */ var _modules_testing_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/testing.js */ \"./modules/testing.js\");\n\n\n\n\n//# sourceURL=webpack://snowblind/./index.testing.js?");

/***/ }),

/***/ "./modules/testing.js":
/*!****************************!*\
  !*** ./modules/testing.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"afterEach\": () => (/* binding */ afterEach),\n/* harmony export */   \"beforeEach\": () => (/* binding */ beforeEach),\n/* harmony export */   \"conductedTests\": () => (/* binding */ conductedTests),\n/* harmony export */   \"describe\": () => (/* binding */ describe),\n/* harmony export */   \"expect\": () => (/* binding */ expect),\n/* harmony export */   \"it\": () => (/* binding */ it),\n/* harmony export */   \"mockFn\": () => (/* binding */ mockFn)\n/* harmony export */ });\n/* harmony import */ var _typecheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typecheck.js */ \"./modules/typecheck.js\");\n\n/**\n * Test something against what it should return to eliminate mistakes.\n * @param {String} description A description what is going to be tested.\n * @param {Function} callback The expression to be executed to test whether something holds true.\n */\nvar expectingDescription;\nconst executionMap = [[]];\nvar currentExecutionContext = executionMap[0];\nvar testInfo = [];\nconst conductedTests = [];\nwindow.conductedTests = conductedTests;\n\nconst executePrepare = (listen = \"BEFORE\") => {\n\tfor (const i of executionMap) {\n\t\tfor (const j of i) {\n\t\t\tif (j[0] === listen) {\n\t\t\t\tj[1]();\n\t\t\t}\n\t\t}\n\t}\n}\n\nconst executeTeardown = () => executePrepare(\"AFTER\")\n\nfunction beforeEach(callback) {\n\tcurrentExecutionContext.push([\"BEFORE\", callback])\n}\n\nfunction afterEach(callback) {\n\tcurrentExecutionContext.push([\"AFTER\", callback])\n}\n\nfunction describe(description = \"\", callback = () => {}) {\n\texecutionMap.push([]);\n\tcurrentExecutionContext = executionMap[executionMap.length - 1];\n\tcallback();\n\texecutionMap.pop()\n\tconst obj = {\n\t\tdescription: description,\n\t\ttests: testInfo\n\t};\n\ttestInfo = []\n\tconductedTests.push(obj)\n\treturn obj\n}\n\nfunction it(description = \"\", callback = () => {}, captureError = (e) => {\n\tthrow e\n}) {\n\texecutePrepare();\n\texpectingDescription = description;\n\tvar info;\n\ttry {\n\t\tinfo = {\n\t\t\tstate: \"COMPLETED\",\n\t\t\tvalue: callback(),\n\t\t\tdescription: description,\n\t\t\tcode: callback.toString(),\n\t\t}\n\t} catch (e) {\n\t\tcaptureError(e);\n\t\tinfo = {\n\t\t\tstate: \"FAILED\",\n\t\t\terror: e,\n\t\t\tdescription: description,\n\t\t\tcode: callback.toString()\n\t\t};\n\t}\n\ttestInfo.push(info);\n\texecuteTeardown()\n\treturn info\n}\n\nfunction expect(result) {\n\tvar awaitResult = false;\n\tvar declineResult = false;\n\n\tconst lookupObject = new Proxy({\n\t\ttoBe: (r, x) => ({\n\t\t\tmessage: `expected '${r}' to be '${x}'`,\n\t\t\tpass: Object.is(x, r)\n\t\t}),\n\t\ttoEqual: (r, x) => ({\n\t\t\tmessage: `expected '${r}' to equal '${x}'`,\n\t\t\tpass: x == r\n\t\t}),\n\t\ttoHaveType: (r, type) => ({\n\t\t\tmessage: `expected '${r}' to be of type '${type}'`,\n\t\t\tpass: _typecheck_js__WEBPACK_IMPORTED_MODULE_0__.propTypes[type](r)\n\t\t}),\n\t\ttoContain: (r, x) => ({\n\t\t\tmessage: `expected '${r}' to contain '${x}'`,\n\t\t\tpass: _typecheck_js__WEBPACK_IMPORTED_MODULE_0__.propTypes.String(r) && r.includes(x)\n\t\t}),\n\t\tcloseTo: (r, x, digits = 2) => ({\n\t\t\tmessage: `expected '${r}' to be ${digits} digits close to '${x}'`,\n\t\t\tpass: Math.abs(r - x) < (10 ** -digits) / 2\n\t\t}),\n\t\ttoBeTruthy: (r) => ({\n\t\t\tmessage: `expected '${r}' to be truthy`,\n\t\t\tpass: r ? true : false\n\t\t}),\n\t\ttoBeFalsy: (r) => ({\n\t\t\tmessage: `expected '${r}' to be falsy`,\n\t\t\tpass: r ? false : true\n\t\t}),\n\t\ttoBeInTheDocument: (r) => ({\n\t\t\tmessage: `expected node to be in the document`,\n\t\t\tpass: document.contains(r)\n\t\t})\n\t}, {\n\t\tset: () => false,\n\t\tget: (x, y) => {\n\t\t\tif (y === \"not\") {\n\t\t\t\tdeclineResult = !declineResult;\n\t\t\t\treturn lookupObject\n\t\t\t} else if (y === \"resolves\") {\n\t\t\t\tawaitResult = true;\n\t\t\t\treturn lookupObject\n\t\t\t} else if (y === \"and\") {\n\t\t\t\treturn lookupObject\n\t\t\t}\n\n\t\t\treturn (...args) => {\n\t\t\t\tconst not = declineResult;\n\t\t\t\tconst resolveResult = (res) => {\n\t\t\t\t\tconst isTrue = not ? !res.pass : res.pass\n\t\t\t\t\tif (isTrue === false) {\n\t\t\t\t\t\tthrow new Error(`Test failed! \"${expectingDescription}\" - ${res.message}.`)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (awaitResult) {\n\t\t\t\t\tresult.then(d => {\n\t\t\t\t\t\tif (x[y]) {\n\t\t\t\t\t\t\tconst res = x[y](d, ...args)\n\t\t\t\t\t\t\tresolveResult(res, d);\n\t\t\t\t\t\t}\n\t\t\t\t\t})\n\t\t\t\t} else {\n\t\t\t\t\tif (x.hasOwnProperty(y)) {\n\t\t\t\t\t\tconst res = x[y](result, ...args);\n\t\t\t\t\t\tresolveResult(res, result)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\treturn lookupObject\n\t\t\t}\n\t\t}\n\t})\n\n\treturn lookupObject;\n}\n\n\n\nfunction mockFn(mockFunction = false) {\n\tconst originalMockedFunction = mockFunction || (() => {\n\t\tconst once = _returnValueOnce.shift();\n\t\treturn once !== undefined ? once : _returnValue;\n\t})\n\n\tconst mockObject = {\n\t\tcalls: [],\n\t\tresults: [],\n\t\tinstances: [],\n\t\tlastCall: [],\n\t\tmockedFunction: originalMockedFunction\n\t}\n\n\tvar _returnValue = null\n\tvar _returnValueOnce = []\n\tvar _name = \"\";\n\n\tconst reference = {\n\t\treturnValue: (val) => _returnValue = val,\n\t\treturnValueOnce: (val) => _returnValueOnce.push(val),\n\t\tmockName: (val) => _name = val,\n\t\tgetMockName: () => _name,\n\t\tmockClear: () => mockObject.calls = mockObject.results = mockObject.instances = mockObject.lastCall = [],\n\t\tmockImplementation: (fn) => mockObject.mockedFunction = fn,\n\t\tmockImplementationOnce: (fn) => {\n\t\t\tconst oldFunction = mockObject.mockedFunction;\n\t\t\tmockObject.mockedFunction = () => {\n\t\t\t\tmockObject.mockedFunction = oldFunction;\n\t\t\t\treturn fn()\n\t\t\t}\n\t\t},\n\t\tmockResolvedValue: (val) => {\n\t\t\treference.mockImplementation(() => {\n\t\t\t\tPromise.resolve(val);\n\t\t\t})\n\t\t},\n\t\tmockResolvedValueOnce: (val) => {\n\t\t\treference.mockImplementationOnce(() => {\n\t\t\t\tPromise.resolve(val);\n\t\t\t})\n\t\t},\n\t\tmockRejectedValue: (val) => {\n\t\t\treference.mockImplementation(() => {\n\t\t\t\tPromise.reject(val);\n\t\t\t})\n\t\t},\n\t\tmockRejectedValueOnce: (val) => {\n\t\t\treference.mockImplementationOnce(() => {\n\t\t\t\tPromise.reject(val);\n\t\t\t})\n\t\t},\n\t\tmockRestore: () => {\n\t\t\treference.mockClear();\n\t\t\tmockObject.mockedFunction = originalMockedFunction\n\t\t},\n\t\tmockReturnThis: () => {\n\t\t\treference.mockImplementation(function () {\n\t\t\t\treturn this\n\t\t\t})\n\t\t}\n\t}\n\n\tconst fn = function (...args) {\n\t\treturn mockObject.mockedFunction(...args)\n\t}\n\n\tconst object = new Proxy(fn, {\n\t\tset() {\n\t\t\treturn false\n\t\t},\n\t\tget(x, name) {\n\t\t\tif (mockObject.hasOwnProperty(name)) {\n\t\t\t\treturn mockObject[name]\n\t\t\t}\n\n\t\t\treturn (...args) => {\n\t\t\t\treference[name](...args)\n\t\t\t\treturn object\n\t\t\t}\n\t\t},\n\t\tapply(target, thisArg, args) {\n\t\t\tmockObject.calls.push(args)\n\t\t\tmockObject.lastCall = args\n\t\t\ttry {\n\t\t\t\tconst result = fn(...args);\n\t\t\t\tmockObject.results.push({\n\t\t\t\t\ttype: \"return\",\n\t\t\t\t\tvalue: result\n\t\t\t\t})\n\t\t\t\treturn result;\n\t\t\t} catch (e) {\n\t\t\t\tmockObject.results.push({\n\t\t\t\t\ttype: \"throw\",\n\t\t\t\t\tvalue: e\n\t\t\t\t})\n\t\t\t\treturn e\n\t\t\t}\n\t\t},\n\t\tconstruct(target, args) {\n\t\t\tconst instance = new target(args);\n\t\t\tmockObject.instances.push(instance);\n\t\t\treturn instance;\n\t\t}\n\t})\n\treturn object;\n}\n\n\n\n\n//# sourceURL=webpack://snowblind/./modules/testing.js?");

/***/ }),

/***/ "./modules/typecheck.js":
/*!******************************!*\
  !*** ./modules/typecheck.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"propTypes\": () => (/* binding */ propTypes),\n/* harmony export */   \"typeCheck\": () => (/* binding */ typeCheck),\n/* harmony export */   \"typeIf\": () => (/* binding */ typeIf)\n/* harmony export */ });\nconst propTypes = new Proxy({\n\tNumber: (x) => typeof x === 'number',\n\tInteger: (x) => (typeof x === 'number') && x % 1 === 0,\n\tBigInt: (x) => typeof x === \"bigint\",\n\tFloat: (x) => (typeof x === \"number\") && x % 1 !== 0,\n\tString: (x) => typeof x === \"string\",\n\tArray: (x) => Array.isArray(x),\n\tObject: (x) => (typeof x === \"object\") && !Array.isArray(x),\n\tSymbol: (x) => typeof x === \"symbol\",\n\tBoolean: (x) => typeof x === \"boolean\",\n\tFunction: (x) => typeof x === \"function\",\n\tnode: (x) => [\"number\", \"string\"].indexOf(typeof x) > -1 || x instanceof HTMLElement || Array.isArray(x),\n\telement: (x) => x instanceof HTMLElement,\n\telementType: (x) => x instanceof undefined.Component,\n\tinstanceOf: function (instance) {\n\t\treturn (x) => x instanceof instance;\n\t},\n\ttypeOf: function (type) {\n\t\treturn (x) => typeof x === type;\n\t},\n\toneOfType: function (types) {\n\t\treturn (x) => {\n\t\t\treturn types.map(y => {\n\t\t\t\treturn typeof y === \"function\" ? y(x) : this[y](x)\n\t\t\t}).indexOf(true) > -1\n\t\t};\n\t},\n\toneOf: function (values) {\n\t\treturn (x) => {\n\t\t\treturn values.indexOf(x) > -1;\n\t\t}\n\t},\n\tarrayOf: function (type) {\n\t\treturn (x) => {\n\t\t\treturn this.Array.isArray(x) ? x.map(y => {\n\t\t\t\ttypeof type === \"function\" ? type(x) : this[type](x)\n\t\t\t}).indexOf(false) === -1 : false\n\t\t};\n\t},\n\tobjectOf: function (type) {\n\t\treturn (x) => {\n\t\t\treturn x ? this.arrayOf(type)(Object.values(x)) : false\n\t\t};\n\t},\n\tshape: function (typeObject) {\n\t\treturn (testObj) => {\n\t\t\t/**\n\t\t\t * Run exact inexactly :)\n\t\t\t */\n\t\t\treturn this.exact(typeObject, true)(testObj)\n\t\t}\n\t},\n\texact: function (typeObject, runInexact = false) {\n\t\treturn (testObj) => {\n\t\t\tif (testObj && typeObject) {\n\t\t\t\tfor (const i in testObj) {\n\t\t\t\t\tif (typeObject.hasOwnProperty(i)) {\n\t\t\t\t\t\tvar compareFunc = typeof typeObject[i] === \"string\" ? this[typeObject[i]] : typeObject[i];\n\t\t\t\t\t\tvar result = compareFunc(testObj[i])\n\t\t\t\t\t\tif (result === false) {\n\t\t\t\t\t\t\treturn result\n\t\t\t\t\t\t}\n\t\t\t\t\t} else if (!runInexact) {\n\t\t\t\t\t\treturn false\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\treturn false\n\t\t\t}\n\t\t}\n\t},\n\tcustomProp: (Func) => {\n\t\treturn Func\n\t},\n\tAny: () => true\n}, {\n\tset: () => false,\n\tget: function (obj, key) {\n\t\tif (obj.hasOwnProperty(key)) {\n\t\t\tvar Func = obj[key];\n\t\t\tFunc.isRequired = function (x, prop) {\n\t\t\t\tif (typeof x === \"undefined\") {\n\t\t\t\t\tthrow new Error(`Encountered undefined prop \"${prop}\" as required object.`)\n\t\t\t\t} else {\n\t\t\t\t\treturn obj[key](x);\n\t\t\t\t}\n\t\t\t}\n\t\t\tFunc.ofLength = function (length) {\n\t\t\t\treturn (x) => {\n\t\t\t\t\treturn obj[key](x) && x.length === length;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn Func\n\t\t} else {\n\t\t\tthrow new Error(`Invalid type for property \"${key}\" encountered.`)\n\t\t}\n\t}\n})\n\nconst typeIf = function (value, type, ifTrue, ifFalse) {\n\tvar result = typeCheck({\n\t\tvalue: value\n\t}, {\n\t\tvalue: type\n\t}, {}, {\n\t\treturnBool: true\n\t})\n\treturn result ? ifTrue : ifFalse;\n}\n\nconst typeCheck = function (obj, optPropertyTypes, defaultProps, options) {\n\toptions = Object.assign({\n\t\treturnBool: false\n\t}, options)\n\tobj = Object.assign({}, defaultProps, obj)\n\tvar store = []\n\tif (typeof optPropertyTypes !== 'undefined') {\n\t\tfor (const prop in optPropertyTypes) {\n\t\t\tconst propType = optPropertyTypes[prop];\n\t\t\tconst runFunction = typeof propType === \"function\" ? propType : (propTypes[propType] || (() => false))\n\t\t\tvar Result = runFunction(obj[prop], prop);\n\t\t\tif (Result === false) {\n\t\t\t\tif (options.returnBool) {\n\t\t\t\t\treturn Result;\n\t\t\t\t} else {\n\t\t\t\t\tthrow new Error(`Invalid type for property \"${prop}\" encountered.`)\n\t\t\t\t}\n\t\t\t}\n\t\t\tstore.push(Result)\n\t\t}\n\t}\n\tif (options.returnBool && store.indexOf(false) === -1) {\n\t\treturn true\n\t}\n\treturn obj\n}\n\n\n\n//# sourceURL=webpack://snowblind/./modules/typecheck.js?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./index.testing.js");
/******/ var __webpack_exports__afterEach = __webpack_exports__.afterEach;
/******/ var __webpack_exports__describe = __webpack_exports__.describe;
/******/ var __webpack_exports__expect = __webpack_exports__.expect;
/******/ var __webpack_exports__it = __webpack_exports__.it;
/******/ export { __webpack_exports__afterEach as afterEach, __webpack_exports__describe as describe, __webpack_exports__expect as expect, __webpack_exports__it as it };
/******/ 
