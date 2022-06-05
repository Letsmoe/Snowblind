/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./lib/hooks/applyChange.js":
/*!**********************************!*\
  !*** ./lib/hooks/applyChange.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyChange\": () => (/* binding */ applyChange)\n/* harmony export */ });\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared-internals.js */ \"./lib/shared-internals.js\");\n/* harmony import */ var _utils_deepCompare_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/deepCompare.js */ \"./lib/utils/deepCompare.js\");\n\n\nfunction applyChange(callback, stateConditional = []) {\n    // Store original values to compare against later on, if one updated render the component again.\n    var originalValues = stateConditional.map((x) => x.valueOf());\n    const current = _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.value;\n    const runCallback = (node) => {\n        if (originalValues.length > 0) {\n            // Compare the original values to the current values, if they are different, render the component again.\n            let flag = false;\n            for (let i = 0; i < originalValues.length; i++) {\n                if (!(0,_utils_deepCompare_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(originalValues[i], stateConditional[i].valueOf())) {\n                    flag = true;\n                    break;\n                }\n            }\n            if (flag) {\n                callback(node);\n                originalValues = stateConditional.map((x) => x.valueOf());\n            }\n        }\n        else {\n            /**\n             * Always call the passed callback\n             */\n            callback(node);\n        }\n    };\n    current.onComponentDidMount(runCallback);\n    current.onComponentDidUpdate(runCallback);\n    stateConditional.forEach((x) => {\n        if (x instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable) {\n            x.subscribe(runCallback);\n        }\n    });\n}\n\n//# sourceMappingURL=applyChange.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/applyChange.js?");

/***/ }),

/***/ "./lib/hooks/applyRef.js":
/*!*******************************!*\
  !*** ./lib/hooks/applyRef.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyRef\": () => (/* binding */ applyRef)\n/* harmony export */ });\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared-internals.js */ \"./lib/shared-internals.js\");\n\n/**\n * Focus an element instance after a render cycle, allowing to pass methods directly through to the DOM Node.\n * @returns A reference Object representing the current node captured by the ref.\n */\nfunction applyRef() {\n    return new _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Reference();\n}\n\n//# sourceMappingURL=applyRef.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/applyRef.js?");

/***/ }),

/***/ "./lib/hooks/applyState.js":
/*!*********************************!*\
  !*** ./lib/hooks/applyState.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyState\": () => (/* binding */ applyState)\n/* harmony export */ });\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared-internals.js */ \"./lib/shared-internals.js\");\n\n/**\n * Defines a state variable to be used for values inside the DOM, re-renders once it's value changes.\n * @param state A value used as a state to the current render cycle.\n * @returns A pair of getter and setter to access the state.\n */\nfunction applyState(state) {\n    const obs = new _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable(state);\n    let current;\n    let target = { value: obs.value };\n    _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.subscribe(node => {\n        current = node;\n    });\n    const callback = (newState) => {\n        obs.next(newState);\n        target.value = newState;\n        console.log(obs);\n        if (typeof newState === \"object\") {\n            current.node.replaceWith(current.render());\n        }\n        return newState;\n    };\n    const proxy = new Proxy(target, {\n        get(target, prop) {\n            if (prop === \"__proxy\") {\n                return obs;\n            }\n            const prim = Reflect.get(target, \"value\");\n            const value = prim[prop];\n            return typeof value === \"function\" ? value.bind(prim) : value;\n        },\n    });\n    return [proxy, callback];\n}\n\n//# sourceMappingURL=applyState.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/applyState.js?");

/***/ }),

/***/ "./lib/hooks/applyStyles.js":
/*!**********************************!*\
  !*** ./lib/hooks/applyStyles.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyStyles\": () => (/* binding */ applyStyles)\n/* harmony export */ });\nfunction applyStyles(styles) {\n    const makeRandomID = (length) => {\n        var result = \"\";\n        var characters = \"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\";\n        var charactersLength = characters.length;\n        for (var i = 0; i < length; i++) {\n            result += characters.charAt(Math.floor(Math.random() * charactersLength));\n        }\n        return result;\n    };\n    // Add the styles to a global stylesheet\n    let styleElement = document.createElement(\"style\");\n    document.head.appendChild(styleElement);\n    let sheet = styleElement.sheet;\n    let parentName = \"\";\n    let currentItem;\n    const readMap = {};\n    const recurse = (styles) => {\n        for (const key in styles) {\n            let value = styles[key];\n            if (value === null) {\n                currentItem.style[key] = \"none\";\n            }\n            else if (typeof value === \"number\") {\n                currentItem.style[key] = value + \"px\";\n            }\n            else if (typeof value === \"string\") {\n                currentItem.style[key] = value;\n            }\n            else {\n                if (key.indexOf(\"&\") > -1) {\n                    let correctKey = key.replace(/&/g, parentName);\n                    sheet.insertRule(`.${correctKey} {}`, 0);\n                    parentName = correctKey;\n                }\n                else {\n                    const id = makeRandomID(10);\n                    sheet.insertRule(`.${id} {}`, 0);\n                    parentName = id;\n                    readMap[key] = id;\n                }\n                currentItem = sheet.cssRules[0];\n                recurse(value);\n            }\n        }\n    };\n    recurse(styles);\n    // Return a map from the human readable name to a randomly generated class name.\n    return readMap;\n}\n\n//# sourceMappingURL=applyStyles.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/applyStyles.js?");

/***/ }),

/***/ "./lib/hooks/index.js":
/*!****************************!*\
  !*** ./lib/hooks/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"applyChange\": () => (/* reexport safe */ _applyChange_js__WEBPACK_IMPORTED_MODULE_1__.applyChange),\n/* harmony export */   \"applyRef\": () => (/* reexport safe */ _applyRef_js__WEBPACK_IMPORTED_MODULE_2__.applyRef),\n/* harmony export */   \"applyState\": () => (/* reexport safe */ _applyState_js__WEBPACK_IMPORTED_MODULE_0__.applyState),\n/* harmony export */   \"applyStyles\": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_4__.applyStyles),\n/* harmony export */   \"useTransition\": () => (/* reexport safe */ _useTransition_js__WEBPACK_IMPORTED_MODULE_3__.useTransition)\n/* harmony export */ });\n/* harmony import */ var _applyState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyState.js */ \"./lib/hooks/applyState.js\");\n/* harmony import */ var _applyChange_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./applyChange.js */ \"./lib/hooks/applyChange.js\");\n/* harmony import */ var _applyRef_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./applyRef.js */ \"./lib/hooks/applyRef.js\");\n/* harmony import */ var _useTransition_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useTransition.js */ \"./lib/hooks/useTransition.js\");\n/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./applyStyles.js */ \"./lib/hooks/applyStyles.js\");\n\n\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/index.js?");

/***/ }),

/***/ "./lib/hooks/useTransition.js":
/*!************************************!*\
  !*** ./lib/hooks/useTransition.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useTransition\": () => (/* binding */ useTransition)\n/* harmony export */ });\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared-internals.js */ \"./lib/shared-internals.js\");\n\nfunction useTransition(obj, options) {\n    _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.subscribe((component) => {\n        /**\n         * Animates the render cycle given CSS properties\n         */\n        options = Object.assign({\n            delay: 0,\n            duration: 400,\n            maxCopies: Infinity,\n            timingFunction: (t, b, c, d) => {\n                // Default easeInOutSine function\n                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;\n            }\n        }, options);\n        component._maxCopies = options.maxCopies;\n        component._usesTransition = true;\n        const animateChange = (from, to, nodes) => {\n            return new Promise((resolve) => {\n                setTimeout(() => {\n                    const startTime = performance.now();\n                    const matchRegExp = new RegExp(/([0-9.-]+)([A-z%]+)?/g);\n                    const convert = (i) => [undefined, null].indexOf(i) == -1 && i.toString().matchAll(matchRegExp);\n                    const interval = (lastExpectedCycle) => {\n                        const elapsed = performance.now() - startTime;\n                        if (elapsed >= options.duration) {\n                            /**\n                             * Run one last time to clear lastly updated properties\n                             */\n                            if (!lastExpectedCycle) {\n                                requestAnimationFrame(() => {\n                                    interval(true);\n                                });\n                            }\n                            resolve();\n                        }\n                        else {\n                            requestAnimationFrame(() => {\n                                interval(false);\n                            });\n                        }\n                        for (const i in to) {\n                            var end = Array.from(convert(to[i]));\n                            if ([undefined, null].indexOf(from[i]) == -1) {\n                                var j = 0;\n                                var replaced = from[i].toString().replace(matchRegExp, (x, num, unit) => {\n                                    num = parseFloat(num);\n                                    var _to = parseFloat(end[j][1]);\n                                    j++;\n                                    var standardUnit = ([\"color\", \"background\", \"background-color\"].indexOf(i) === -1) ? \"px\" : \"\";\n                                    return options.timingFunction(elapsed, num, _to - num, options.duration).toString() + (unit || end[j - 1][2] || standardUnit);\n                                });\n                                for (const node of nodes) {\n                                    node[0].style[i] = replaced;\n                                    if (lastExpectedCycle) {\n                                        node[0].style[i] = to[i];\n                                    }\n                                }\n                            }\n                        }\n                    };\n                    requestAnimationFrame(() => {\n                        interval(false);\n                    });\n                }, options.delay);\n            });\n        };\n        component.transitionFunction = {\n            from: (callback) => {\n                for (const i in obj.from) {\n                    component.Node.style[i] = obj.from[i];\n                }\n                callback();\n            },\n            render: (callback) => {\n                animateChange(obj.render, obj.enter, component.Node).then(callback);\n            },\n            enter: (callback) => {\n                animateChange(obj.from, obj.enter, component.Node).then(callback);\n            },\n            leave: (callback) => {\n                animateChange(obj.enter, obj.leave, component.Node).then(callback);\n            }\n        };\n    });\n}\n\n//# sourceMappingURL=useTransition.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/hooks/useTransition.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Observable\": () => (/* reexport safe */ _shared_internals_js__WEBPACK_IMPORTED_MODULE_2__.Observable),\n/* harmony export */   \"Reference\": () => (/* reexport safe */ _shared_internals_js__WEBPACK_IMPORTED_MODULE_2__.Reference),\n/* harmony export */   \"Snowblind\": () => (/* reexport safe */ _snowblind_js__WEBPACK_IMPORTED_MODULE_0__.Snowblind),\n/* harmony export */   \"applyChange\": () => (/* reexport safe */ _hooks_index_js__WEBPACK_IMPORTED_MODULE_1__.applyChange),\n/* harmony export */   \"applyRef\": () => (/* reexport safe */ _hooks_index_js__WEBPACK_IMPORTED_MODULE_1__.applyRef),\n/* harmony export */   \"applyState\": () => (/* reexport safe */ _hooks_index_js__WEBPACK_IMPORTED_MODULE_1__.applyState),\n/* harmony export */   \"applyStyles\": () => (/* reexport safe */ _hooks_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles)\n/* harmony export */ });\n/* harmony import */ var _snowblind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snowblind.js */ \"./lib/snowblind.js\");\n/* harmony import */ var _hooks_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/index.js */ \"./lib/hooks/index.js\");\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared-internals.js */ \"./lib/shared-internals.js\");\n\n\n\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/index.js?");

/***/ }),

/***/ "./lib/shared-internals.js":
/*!*********************************!*\
  !*** ./lib/shared-internals.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Observable\": () => (/* binding */ Observable),\n/* harmony export */   \"Reference\": () => (/* binding */ Reference),\n/* harmony export */   \"UpdateDispatcher\": () => (/* binding */ UpdateDispatcher)\n/* harmony export */ });\nclass Observable {\n    constructor(value) {\n        this.subscriberCount = 0;\n        this.value = value;\n        this.subscribers = [];\n    }\n    next(value) {\n        this.value = value;\n        for (const subscriber of this.subscribers) {\n            subscriber(value);\n        }\n    }\n    subscribe(callback) {\n        this.subscribers.push(callback);\n        this.subscriberCount++;\n    }\n    complete() {\n        this.subscribers = new Proxy([], { set: () => {\n                throw new Error(\"Observable has been closed.\");\n            } });\n    }\n    restore() {\n        this.subscribers = [];\n        this.value = undefined;\n    }\n}\nclass Reference {\n    constructor() {\n        this.current;\n    }\n}\nconst UpdateDispatcher = new Observable();\n\n//# sourceMappingURL=shared-internals.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/shared-internals.js?");

/***/ }),

/***/ "./lib/snowblind.js":
/*!**************************!*\
  !*** ./lib/snowblind.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Snowblind\": () => (/* binding */ Snowblind)\n/* harmony export */ });\n/* harmony import */ var _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared-internals.js */ \"./lib/shared-internals.js\");\n\nclass Component {\n    constructor(generator) {\n        this.didUpdateOnce = false;\n        this.didMountCallbacks = [];\n        this.didUpdateCallbacks = [];\n        this.willUnmountCallbacks = [];\n        this.generator = generator;\n        /**\n         * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.\n         */\n        _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.next(this);\n        _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.restore();\n    }\n    render() {\n        this.node = this.generator();\n        return this.node;\n    }\n    onComponentDidMount(callback) {\n        this.didMountCallbacks.push(callback);\n    }\n    onComponentDidUpdate(callback) {\n        this.didUpdateCallbacks.push(callback);\n    }\n    onComponentWillUnmount(callback) {\n        this.willUnmountCallbacks.push(callback);\n    }\n    didUpdate() {\n        if (this.didUpdateOnce) {\n            this.didUpdateCallbacks.forEach((callback) => callback(this.node));\n        }\n        else {\n            this.didMountCallbacks.forEach((callback) => callback(this.node));\n            this.didUpdateOnce = true;\n        }\n    }\n}\nfunction SnowblindFragment() {\n    return document.createDocumentFragment();\n}\nfunction render(parent, element) {\n    _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.next(element);\n    parent.appendChild(element.render());\n    element.didUpdate();\n}\n/**\n * A function that generates an HTML node from given inputs.\n * @param initializer The HTML type of the component or an initializer function to be called generating the HTML content.\n * @param props An object containing all attributes supposed to be assigned to the component.\n * @param children An array of child elements.\n * @returns The generated node as HTMLElement.\n */\nfunction make(initializer, props, ...children) {\n    props = props || {};\n    let node;\n    if (typeof initializer === \"function\") {\n        // Initialize the component by calling the initializer function.\n        props[\"children\"] = children;\n        node = initializer(props);\n        return new Component(node);\n    }\n    else {\n        node = document.createElement(initializer);\n    }\n    if (props) {\n        for (const [key, value] of Object.entries(props)) {\n            if (typeof value === \"function\") {\n                // Apply an event listener to run the passed callback\n                node[key.toLowerCase()] = value;\n            }\n            else if (value instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable) {\n                value.subscribe((newValue) => {\n                    node.setAttribute(key, newValue);\n                });\n                node.setAttribute(key, value.value);\n            }\n            else if (value instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Reference) {\n                value.current = node;\n            }\n            else if (typeof value === \"object\") {\n                if (key === \"style\") {\n                    for (let [styleKey, styleValue] of Object.entries(value)) {\n                        if (styleValue instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable) {\n                            styleValue.subscribe((newValue) => {\n                                node.style[styleKey] = newValue;\n                            });\n                        }\n                        if (styleValue === null) {\n                            styleValue = \"none\";\n                        }\n                        else if (typeof styleValue === \"number\") {\n                            styleValue = styleValue + \"px\";\n                        }\n                        node.style[styleKey] = styleValue;\n                    }\n                }\n                else if (key === \"props\") {\n                    for (const [styleKey, styleValue] of Object.entries(value)) {\n                        if (styleValue instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable) {\n                            styleValue.subscribe((newValue) => {\n                                node[styleKey] = newValue;\n                            });\n                        }\n                        node[styleKey] = styleValue;\n                    }\n                }\n                else {\n                    node.setAttribute(key, JSON.stringify(value));\n                }\n            }\n            else {\n                node.setAttribute(key, value.toString());\n            }\n        }\n    }\n    const loopChildren = (children) => {\n        for (const child of children) {\n            if (Array.isArray(child)) {\n                loopChildren(child);\n            }\n            else if (child instanceof Component) {\n                render(node, child);\n                child.didUpdate();\n            }\n            else if (child instanceof HTMLElement) {\n                node.appendChild(child);\n            }\n            else if (child.__proxy instanceof _shared_internals_js__WEBPACK_IMPORTED_MODULE_0__.Observable) {\n                // Store the generated item in a variable so we can access it on each update.\n                let lastItem = document.createTextNode(child);\n                child.__proxy.subscribe((newValue) => {\n                    // Change the value of the child node.\n                    lastItem.textContent = newValue;\n                });\n                node.appendChild(lastItem);\n            }\n            else {\n                node.appendChild(document.createTextNode(child));\n            }\n        }\n    };\n    loopChildren(children.flat(Infinity));\n    return node;\n}\nconst Snowblind = {\n    Component: Component,\n    Fragment: SnowblindFragment,\n    make: make,\n    render: render\n};\n\n//# sourceMappingURL=snowblind.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/snowblind.js?");

/***/ }),

/***/ "./lib/utils/deepCompare.js":
/*!**********************************!*\
  !*** ./lib/utils/deepCompare.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * Compares two values for equality.\n * @param {any} x First value to compare\n * @param {any} y Second value to compare\n */\nfunction deepCompare(x, y) {\n    if (x === y)\n        return true;\n    // if both x and y are null or undefined and exactly the same\n    if (!(x instanceof Object) || !(y instanceof Object))\n        return false;\n    // if they are not strictly equal, they both need to be Objects\n    if (x.constructor !== y.constructor)\n        return false;\n    // they must have the exact same prototype chain, the closest we can do is\n    // test their constructor.\n    for (var p in x) {\n        if (!x.hasOwnProperty(p))\n            continue;\n        // other properties were tested using x.constructor === y.constructor\n        if (!y.hasOwnProperty(p))\n            return false;\n        // allows to compare x[ p ] and y[ p ] when set to undefined\n        if (x[p] === y[p])\n            continue;\n        // if they have the same strict value or identity then they are equal\n        if (typeof x[p] !== \"object\")\n            return false;\n        // Numbers, Strings, Functions, Booleans must be strictly equal\n        if (!deepCompare(x[p], y[p]))\n            return false;\n        // Objects and Arrays must be tested recursively\n    }\n    for (p in y)\n        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))\n            return false;\n    // allows x[ p ] to be set to undefined\n    return true;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (deepCompare);\n//# sourceMappingURL=deepCompare.js.map\n\n//# sourceURL=webpack://@snowblind/core/./lib/utils/deepCompare.js?");

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
/******/ var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ var __webpack_exports__Observable = __webpack_exports__.Observable;
/******/ var __webpack_exports__Reference = __webpack_exports__.Reference;
/******/ var __webpack_exports__Snowblind = __webpack_exports__.Snowblind;
/******/ var __webpack_exports__applyChange = __webpack_exports__.applyChange;
/******/ var __webpack_exports__applyRef = __webpack_exports__.applyRef;
/******/ var __webpack_exports__applyState = __webpack_exports__.applyState;
/******/ var __webpack_exports__applyStyles = __webpack_exports__.applyStyles;
/******/ export { __webpack_exports__Observable as Observable, __webpack_exports__Reference as Reference, __webpack_exports__Snowblind as Snowblind, __webpack_exports__applyChange as applyChange, __webpack_exports__applyRef as applyRef, __webpack_exports__applyState as applyState, __webpack_exports__applyStyles as applyStyles };
/******/ 
