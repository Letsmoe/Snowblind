/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./lib/forwardRef.js":
/*!***************************!*\
  !*** ./lib/forwardRef.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"forwardRef\": () => (/* binding */ forwardRef)\n/* harmony export */ });\nfunction forwardRef(callback) {\n    return (props, ref) => {\n        return callback(props, ref);\n    };\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/forwardRef.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"forwardRef\": () => (/* reexport safe */ _forwardRef__WEBPACK_IMPORTED_MODULE_7__.forwardRef),\n/* harmony export */   \"useClickOutside\": () => (/* reexport safe */ _useClickOutside__WEBPACK_IMPORTED_MODULE_6__.useClickOutside),\n/* harmony export */   \"useContext\": () => (/* reexport safe */ _useContext__WEBPACK_IMPORTED_MODULE_9__.useContext),\n/* harmony export */   \"useDisclosure\": () => (/* reexport safe */ _useDisclosure__WEBPACK_IMPORTED_MODULE_1__.useDisclosure),\n/* harmony export */   \"useInputState\": () => (/* reexport safe */ _useInputState__WEBPACK_IMPORTED_MODULE_0__.useInputState),\n/* harmony export */   \"useMemo\": () => (/* reexport safe */ _useMemo__WEBPACK_IMPORTED_MODULE_10__.useMemo),\n/* harmony export */   \"useQueue\": () => (/* reexport safe */ _useQueue__WEBPACK_IMPORTED_MODULE_2__.useQueue),\n/* harmony export */   \"useReducer\": () => (/* reexport safe */ _useReducer__WEBPACK_IMPORTED_MODULE_8__.useReducer),\n/* harmony export */   \"useToggle\": () => (/* reexport safe */ _useToggle__WEBPACK_IMPORTED_MODULE_3__.useToggle),\n/* harmony export */   \"useTransition\": () => (/* reexport safe */ _useTransition__WEBPACK_IMPORTED_MODULE_4__.useTransition),\n/* harmony export */   \"useValidatedState\": () => (/* reexport safe */ _useValidatedState__WEBPACK_IMPORTED_MODULE_5__.useValidatedState)\n/* harmony export */ });\n/* harmony import */ var _useInputState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useInputState */ \"./lib/useInputState.js\");\n/* harmony import */ var _useDisclosure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useDisclosure */ \"./lib/useDisclosure.js\");\n/* harmony import */ var _useQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useQueue */ \"./lib/useQueue.js\");\n/* harmony import */ var _useToggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useToggle */ \"./lib/useToggle.js\");\n/* harmony import */ var _useTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useTransition */ \"./lib/useTransition.js\");\n/* harmony import */ var _useValidatedState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useValidatedState */ \"./lib/useValidatedState.js\");\n/* harmony import */ var _useClickOutside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useClickOutside */ \"./lib/useClickOutside.js\");\n/* harmony import */ var _forwardRef__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./forwardRef */ \"./lib/forwardRef.js\");\n/* harmony import */ var _useReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./useReducer */ \"./lib/useReducer.js\");\n/* harmony import */ var _useContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./useContext */ \"./lib/useContext.js\");\n/* harmony import */ var _useMemo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./useMemo */ \"./lib/useMemo.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/index.js?");

/***/ }),

/***/ "./lib/useClickOutside.js":
/*!********************************!*\
  !*** ./lib/useClickOutside.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useClickOutside\": () => (/* binding */ useClickOutside)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n\nfunction useClickOutside(callback, events = [\"mousedown\", \"touchstart\"]) {\n    const ref = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n    var reffedNode;\n    const clickCallback = (e) => {\n        const target = e.target;\n        if (target && reffedNode) {\n            const inParents = (parent) => {\n                if (parent instanceof HTMLBodyElement) {\n                    return false;\n                }\n                else if (parent.isEqualNode(reffedNode)) {\n                    return true;\n                }\n                else if (parent.parentNode) {\n                    return inParents(parent.parentNode);\n                }\n            };\n            if (!inParents(target)) {\n                callback();\n            }\n        }\n    };\n    events.forEach((fn) => document.addEventListener(fn, clickCallback));\n    (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useEffect)((node) => {\n        reffedNode = node;\n    });\n    return ref;\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useClickOutside.js?");

/***/ }),

/***/ "./lib/useContext.js":
/*!***************************!*\
  !*** ./lib/useContext.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useContext\": () => (/* binding */ useContext)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction useContext(context) {\n    if (!context.subscribe) {\n        throw new TypeError('`useContext` must be used with a context object created with `createContext`');\n    }\n    // Subscribe to the component;\n    const [state, setState] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(context._value);\n    context.subscribe(newValue => {\n        setState(newValue);\n    });\n    return state.value;\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useContext.js?");

/***/ }),

/***/ "./lib/useDisclosure.js":
/*!******************************!*\
  !*** ./lib/useDisclosure.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useDisclosure\": () => (/* binding */ useDisclosure)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Hook to help with boolean checks, providing callbacks to handle modal open/close events.\n * @param initialValue The value to start with, either `true` or `false`\n * @param callbacks Callbacks to handle a close or open event\n * @returns The state, an open, close and toggle method.\n */\nfunction useDisclosure(initialValue, callbacks) {\n    const [opened, setOpened] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n    const open = () => {\n        var _a;\n        if (!opened) {\n            setOpened(true);\n            (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onOpen) === null || _a === void 0 ? void 0 : _a.call(callbacks);\n        }\n    };\n    const close = () => {\n        var _a;\n        if (opened) {\n            setOpened(false);\n            (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onClose) === null || _a === void 0 ? void 0 : _a.call(callbacks);\n        }\n    };\n    const toggle = () => {\n        opened ? close() : open();\n    };\n    return [\n        opened,\n        {\n            open,\n            close,\n            toggle,\n        },\n    ];\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useDisclosure.js?");

/***/ }),

/***/ "./lib/useInputState.js":
/*!******************************!*\
  !*** ./lib/useInputState.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useInputState\": () => (/* binding */ useInputState)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Shorthand for the `event.currentTarget.value` syntax that would have to be used with inputs normally.\n * @param initialValue The value to initialize the state with.\n * @returns An instance of a ValueBinder containing information about the states value and the event changing the ValueBinder's value.\n */\nfunction useInputState(initialValue) {\n    const [value, setValue] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n    const changeEvent = (e) => setValue(e.value);\n    return [value, changeEvent];\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useInputState.js?");

/***/ }),

/***/ "./lib/useMemo.js":
/*!************************!*\
  !*** ./lib/useMemo.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useMemo\": () => (/* binding */ useMemo)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Creates a memoized state meaning it will only trigger a rerender once one of it's dependencies change reducing the amount of cycles per update.\n * @param callback A callback function, run once a dependency changes\n * @param dependencies A list of dependencies to observe for changes, once they change, they'll trigger a render cycle.\n * @returns A ValueBinder containing the newest information about the callbacks result.\n */\nfunction useMemo(callback, dependencies) {\n    let value = callback();\n    const obs = new _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.Observable(value);\n    for (const dependency of dependencies) {\n        if (dependency instanceof _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.ValueBinder) {\n            dependency.observable.subscribe(() => {\n                obs.next(callback());\n            });\n        }\n    }\n    return new _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.ValueBinder(obs);\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useMemo.js?");

/***/ }),

/***/ "./lib/useQueue.js":
/*!*************************!*\
  !*** ./lib/useQueue.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useQueue\": () => (/* binding */ useQueue)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Sort items into a queue to use later\n * @param limit The maximum number of items to stay in the state array at the same time.\n * @param initialValues An array of initials to fill state and queue with.\n * @returns State and queue as well as functions to modify the queue\n */\nfunction useQueue(limit, initialValues = []) {\n    const makeState = (r) => ({\n        state: r.slice(0, limit),\n        queue: r.slice(limit)\n    });\n    const [{ \n    // @ts-ignore\n    state, \n    // @ts-ignore\n    queue }, setState] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        state: initialValues.slice(0, limit),\n        queue: initialValues.slice(limit)\n    });\n    const shift = () => {\n        var shiftedItem;\n        setState((current) => {\n            let results = [...current.state, ...current.queue];\n            shiftedItem = results.shift();\n            return makeState(results);\n        });\n        return shiftedItem;\n    };\n    const add = (...els) => {\n        setState((current) => {\n            let results = [...current.state, ...current.queue, ...els];\n            return makeState(results);\n        });\n    };\n    const update = (fn) => {\n        setState((current) => {\n            let results = fn([...current.state, ...current.queue]);\n            return makeState(results);\n        });\n    };\n    const cleanQueue = () => setState((current) => ({\n        state: current.state,\n        queue: []\n    }));\n    return {\n        state,\n        queue,\n        add,\n        shift,\n        update,\n        cleanQueue\n    };\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useQueue.js?");

/***/ }),

/***/ "./lib/useReducer.js":
/*!***************************!*\
  !*** ./lib/useReducer.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useReducer\": () => (/* binding */ useReducer)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction useReducer(reducerFunction, initialValue, initFunction = (x) => x) {\n    const [value, setValue] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(initFunction(initialValue));\n    const dispatch = (obj) => {\n        setValue(reducerFunction(obj));\n    };\n    return [value, dispatch];\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useReducer.js?");

/***/ }),

/***/ "./lib/useToggle.js":
/*!**************************!*\
  !*** ./lib/useToggle.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useToggle\": () => (/* binding */ useToggle)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Toggle through a list of options.\n * @param initialValue The first value the function shall use.\n * @param options A list of options to choose from.\n * @returns An array consisting of the value, on the first call it'll be the initial value and a toggle function to loop through the possibilities starting at the index of the initial value.\n */\nfunction useToggle(initialValue, options) {\n    let index = options.indexOf(initialValue);\n    const [value, setValue] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n    const mimicSetValue = () => {\n        // Let the index wrap back around.\n        index = index == options.length - 1 ? 0 : index + 1;\n        let value = options[index];\n        setValue(value);\n    };\n    return [value, mimicSetValue];\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useToggle.js?");

/***/ }),

/***/ "./lib/useTransition.js":
/*!******************************!*\
  !*** ./lib/useTransition.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useTransition\": () => (/* binding */ useTransition)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction useTransition(obj, options) {\n    _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.UpdateDispatcher.subscribe((component) => {\n        /**\n         * Animates the render cycle given CSS properties\n         */\n        options = Object.assign({\n            delay: 0,\n            duration: 400,\n            maxCopies: Infinity,\n            timingFunction: (t, b, c, d) => {\n                // Default easeInOutSine function\n                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;\n            }\n        }, options);\n        component._maxCopies = options.maxCopies;\n        component._usesTransition = true;\n        const animateChange = (from, to, nodes) => {\n            return new Promise((resolve) => {\n                setTimeout(() => {\n                    const startTime = performance.now();\n                    const matchRegExp = new RegExp(/([0-9.-]+)([A-z%]+)?/g);\n                    const convert = (i) => [undefined, null].indexOf(i) == -1 && i.toString().matchAll(matchRegExp);\n                    const interval = (lastExpectedCycle) => {\n                        const elapsed = performance.now() - startTime;\n                        if (elapsed >= options.duration) {\n                            /**\n                             * Run one last time to clear lastly updated properties\n                             */\n                            if (!lastExpectedCycle) {\n                                requestAnimationFrame(() => {\n                                    interval(true);\n                                });\n                            }\n                            resolve();\n                        }\n                        else {\n                            requestAnimationFrame(() => {\n                                interval(false);\n                            });\n                        }\n                        for (const i in to) {\n                            var end = Array.from(convert(to[i]));\n                            if ([undefined, null].indexOf(from[i]) == -1) {\n                                var j = 0;\n                                var replaced = from[i].toString().replace(matchRegExp, (x, num, unit) => {\n                                    num = parseFloat(num);\n                                    var _to = parseFloat(end[j][1]);\n                                    j++;\n                                    var standardUnit = ([\"color\", \"background\", \"background-color\"].indexOf(i) === -1) ? \"px\" : \"\";\n                                    return options.timingFunction(elapsed, num, _to - num, options.duration).toString() + (unit || end[j - 1][2] || standardUnit);\n                                });\n                                for (const node of nodes) {\n                                    node[0].style[i] = replaced;\n                                    if (lastExpectedCycle) {\n                                        node[0].style[i] = to[i];\n                                    }\n                                }\n                            }\n                        }\n                    };\n                    requestAnimationFrame(() => {\n                        interval(false);\n                    });\n                }, options.delay);\n            });\n        };\n        component.transitionFunction = {\n            from: (callback) => {\n                for (const i in obj.from) {\n                    component.Node.style[i] = obj.from[i];\n                }\n                callback();\n            },\n            render: (callback) => {\n                animateChange(obj.render, obj.enter, component.Node).then(callback);\n            },\n            enter: (callback) => {\n                animateChange(obj.from, obj.enter, component.Node).then(callback);\n            },\n            leave: (callback) => {\n                animateChange(obj.enter, obj.leave, component.Node).then(callback);\n            }\n        };\n    });\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useTransition.js?");

/***/ }),

/***/ "./lib/useValidatedState.js":
/*!**********************************!*\
  !*** ./lib/useValidatedState.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useValidatedState\": () => (/* binding */ useValidatedState)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n/**\n * Tests on every new value, whether it matches a certain condition, useful for boolean checks.\n * @param initialValue The value to initialize with\n * @param validation A function that checks whether a new value passes the validation\n * @returns [{value, lastValidValue, valid}, changeValue]\n */\nfunction useValidatedState(initialValue, validation) {\n    const [value, setValue] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);\n    const [lastValidValue, setLastValidValue] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(validation(initialValue) ? initialValue : undefined, false);\n    const [valid, setValid] = (0,_snowblind_core__WEBPACK_IMPORTED_MODULE_0__.useState)(validation(initialValue), false);\n    const changeValue = (newValue) => {\n        if (validation(newValue)) {\n            setLastValidValue(newValue);\n            setValid(true);\n        }\n        else {\n            setValid(false);\n        }\n        setValue(newValue);\n    };\n    return [{\n            value,\n            lastValidValue,\n            valid\n        }, changeValue];\n}\n\n\n\n//# sourceURL=webpack://@snowblind/hooks/./lib/useValidatedState.js?");

/***/ }),

/***/ "./node_modules/@snowblind/core/dist/snowblind.min.js":
/*!************************************************************!*\
  !*** ./node_modules/@snowblind/core/dist/snowblind.min.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Observable\": () => (/* binding */ _),\n/* harmony export */   \"Snowblind\": () => (/* binding */ O),\n/* harmony export */   \"SnowblindChild\": () => (/* binding */ A),\n/* harmony export */   \"SnowblindRef\": () => (/* binding */ E),\n/* harmony export */   \"UpdateDispatcher\": () => (/* binding */ T),\n/* harmony export */   \"ValueBinder\": () => (/* binding */ g),\n/* harmony export */   \"html\": () => (/* binding */ C),\n/* harmony export */   \"useEffect\": () => (/* binding */ x),\n/* harmony export */   \"useRef\": () => (/* binding */ j),\n/* harmony export */   \"useState\": () => (/* binding */ N)\n/* harmony export */ });\nvar e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{y$:()=>n,KS:()=>v,Ax:()=>o,tz:()=>r,MI:()=>a,oj:()=>s,dy:()=>y,d4:()=>b,sO:()=>p,eJ:()=>f});class n{constructor(e){this._value=e,this._subscribers=[]}next(e){this._value=e;for(const t of this._subscribers)t(e)}subscribe(e){this._subscribers.push(e)}complete(){this._subscribers=new Proxy([],{set:()=>{throw new Error(\"Observable has been completed.\")}})}restore(){this._subscribers=[],this._value=void 0}}class r{constructor(){this.current}}class s{constructor(e){this.observable=e,this.value=e._value,e.subscribe((e=>{this.value=e}))}valueOf(){return this.value}toString(){return this.value.toString()}}class o{constructor(e){this.ID=(Math.random()+1).toString(36).substring(2),i[this.ID]=this,this.setElement(e)}setElement(e){this.element=e,this.element.setAttribute&&this.element.setAttribute(\"data-is-snowblind-child\",this.ID)}}const i={},c={},a=new n;class l{constructor(e,t={}){if(e._Observer.boundRender=this,this._wasDestroyed=!1,this._renderIsFirstTime=!0,this._maxCopies=e._maxCopies,this._copiesKeptAlive=0,this._lastNode=t.replace||document.body.appendChild(document.createElement(\"i\")),this._Node,this.Object=e,!(e instanceof v.Component))throw new Error(\"Renderer didn't receive object of type Snowblind.Component\")}Render(){if(this._wasDestroyed)throw new Error(\"Renderer has been destroyed.\");if(this.Object._usesTransition){const e=this._Node;this._copiesKeptAlive>=this._maxCopies?e.remove():this.Object.transitionFunction.leave((()=>{e.remove(),this._copiesKeptAlive-=1}))}var e=this.Object.render();if(!(e instanceof HTMLElement))throw new Error(\"Can only initialize object with type of HTMLElement.\");this._Node=e,this.Object.Node=this._Node;var t=this._Node;const n=document.activeElement,r=n.selectionStart,s=n.selectionEnd;let o;if((o=this._lastNode.getAttribute(\"data-is-snowblind-child\"))&&i[o].setElement(this._Node),this._lastNode.replaceWith(this._Node),n){const e=n.getAttribute(\"key\");if(e){const n=t.querySelector(`[key='${e}']`);n.focus(),n.setSelectionRange(r,s)}}if(this._lastNode=t,this.Object._usesTransition&&(this._copiesKeptAlive++,this.Object.transitionFunction.from((()=>{this._renderIsFirstTime||this.Object.transitionFunction.render()}))),this.Object.hasTheme){const e=document.createElement(\"div\"),n=(e,t)=>{const n=this.Object.hasTheme[t];for(const r of Array.from(e))if(\"object\"==typeof n)for(const e in n)r.style[e]=n[e];else r.style[t]=n};for(const r in this.Object.hasTheme){const s=t.querySelectorAll(r);s&&s.length>0?n(s,r):void 0!==e.style[r]&&n(Array.from(t.getElementsByTagName(\"*\")).concat([t]),r)}}!0===this._renderIsFirstTime?(d(this.Object.didMountCallbacks,this._Node),this._renderIsFirstTime=!1):d(this.Object.didUpdateCallbacks,this._Node)}reinitialize(){this._renderIsFirstTime=!0,this.constructor(this.Object)}Destroy(){this._wasDestroyed=!0,d(this.Object.willUnmountCallbacks),this.Object._usesTransition?this.Object.transitionFunction.leave((()=>{this._Node.remove()})):this._Node.remove()}}const d=(e,...t)=>e.map((e=>e(...t))),u=Symbol(\"\");class h{constructor(e,t=(()=>{})){const n={get(e,t){if(t===u)return!0;const r=e[t];if(void 0!==r){if(null!==r){var s=r.constructor;r[u]||!s||s!=={}.constructor&&s!==[].constructor||(e[t]=new Proxy(r,n))}return e[t]}},set:(e,n,r)=>(e[n]=r,this.boundRender&&(this.debounce&&window.cancelAnimationFrame(this.debounce),this.debounce=window.requestAnimationFrame((()=>{this.boundRender.Render()}))),t(e,n,r),!0)};this._value=new Proxy(e,n)}}function f(e,t=!0){const r=new n(e);var o=new s(r);return!0===t&&a.subscribe((e=>{const t=e.Renderer;r.subscribe((()=>{t.Render()}))})),[o,e=>(\"function\"==typeof e&&(e=e()),e=e.valueOf(),r.next(e),e)]}const m=function e(t,n){if(t===n)return!0;if(!(t instanceof Object&&n instanceof Object))return!1;if(t.constructor!==n.constructor)return!1;for(var r in t)if(t.hasOwnProperty(r)){if(!n.hasOwnProperty(r))return!1;if(t[r]!==n[r]){if(\"object\"!=typeof t[r])return!1;if(!e(t[r],n[r]))return!1}}for(r in n)if(n.hasOwnProperty(r)&&!t.hasOwnProperty(r))return!1;return!0};function b(e,t=[]){var n=t.map((e=>e.valueOf()));a.subscribe((r=>{const s=r=>{n.length>0?(n.filter(((e,n)=>!m(e,t[n].valueOf()))).length>0||0==n.length)&&(e(r),n=t.map((e=>e.valueOf()))):e(r)};r.onComponentDidMount(s),r.onComponentDidUpdate(s)}))}function p(){return new r}window.expose=function(e,t){t=Array.from([t]).flat();for(const r in e){const s=e[r];var n=(void 0===t[0]?r:t[0]).toLowerCase();c[n]=s}};const v={Component:class{constructor(e,t,n={hasTheme:!1,replace:void 0}){const r=c[t.name.toLowerCase()];if(r){const t=r.propTypes;t&&window.typeCheck&&(e=window.typeCheck(e,t,r.defaultProps))}this.hasTheme=n.hasTheme,this._maxCopies=1/0,this._usesTransition=!1,this.didMountCallbacks=[],this.didUpdateCallbacks=[],this.willUnmountCallbacks=[],n.replace instanceof HTMLElement&&(e.children=Array.from(n.replace.childNodes).map((e=>new o(e)))),this._Observer=new h(e||{}),this.props=this._Observer._value,this.Renderer=new l(this,n);const s=n.replace.isReferenceTo;this._generatorFunction=t(e,s),a.next(this),a.restore(),this.Renderer.Render()}onComponentDidMount(e){this.didMountCallbacks.push(e)}onComponentDidUpdate(e){this.didUpdateCallbacks.push(e)}onComponentWillUnmount(e){this.willUnmountCallbacks.push(e)}render(...e){return this._generatorFunction()}},createContext(e){if(\"object\"!=typeof e)throw new TypeError(\"`createContext` may only be used with objects.\");const t=new n(e);return[new h(e,(e=>{t.next(e)}))._value,t]},renderAllIn(e=document.body){const t=e=>{for(const n of e){if(n instanceof HTMLScriptElement)continue;let e=n.nodeName.toLowerCase();if(c.hasOwnProperty(e)){let t=c[e];if(\"function\"==typeof t){const e=this.getNodeProperties(n);new v.Component(e,t,{hasTheme:!1,replace:n})}}else t(Array.from(n.children))}};t(Array.from(e.children))},getNodeProperties:e=>Object.fromEntries(Array.from(e.attributes).map((e=>[e.name,e.value]))),eventBus:{on(e,t){document.addEventListener(e,(e=>t(e instanceof CustomEvent?e.detail:void 0)))},dispatch(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove(e,t){document.removeEventListener(e,t)}},createElement:(e,t,n=[])=>{let r=document.createElement(e);for(let e in t)if(Object.hasOwnProperty.call(t,e)){let n=t[e];if(null!=n)if(\"text\"==e)r.innerText=n;else{let t=e.substring(1).replace(\"@\",\"\");if(\"@\"===e[0])r.addEventListener(e,(t=>{\"@\"==e[1]&&t.target.isEqualNode(r),n(r,t)}));else if(\".\"===e[0])r[t]=n;else if(\"?\"===e[0])n&&r.setAttribute(t,n);else if(\"object\"==typeof n)for(const e in n)r.setAttribute(e,n[e]);else r.setAttribute(e,n)}}for(let e of n)\"function\"==typeof e||e instanceof HTMLElement&&r.appendChild(e);return r}};function y(e,...t){function n(e,t,n,r){e.addEventListener(t,(t=>{r&&t.target.isEqualNode(e)?n(e,t):r||n(e,t)}))}function r(e,t){var n=document.createTextNode(t);e.appendChild(n)}const i=/\\{\\{([0-9]+)\\}\\}/g;var c=\"\",a=0;for(const t of e)c+=t+(e[e.length-1]===t?\"\":`{{${a++}}}`);const l=document.createElement(\"template\");if(l.innerHTML=c,l.content.children.length>1)throw new Error(\"Multiple elements must be wrapped in a single element.\");const d=document.createTreeWalker(l.content,1,null);let u,h=0;for(;null!==(u=d.nextNode());){(u instanceof HTMLTextAreaElement||u instanceof HTMLInputElement)&&(u.hasAttribute(\"key\")||(u.setAttribute(\"key\",\"inputNo\"+h),h++));for(const e of Array.from(u.attributes)){var f=e.name;let r=e.nodeValue;var m=f[0],b=f.substring(1);const o=/\\{([@.?!]+)\\}/;r=r.replace(i,((e,r)=>{var i,c=parseInt(r),a=t[c],l=\"\";if(\"ref\"===f&&\"SnowblindRef\"===(null===(i=null==a?void 0:a.constructor)||void 0===i?void 0:i.name))return a.current=u,u.isReferenceTo=a,void u.removeAttribute(\"ref\");if(\"sx\"===f){if(\"string\"==typeof a)u.setAttribute(\"style\",a);else if(\"object\"==typeof a)for(const e in a)u.style[e]=a[e];return void u.removeAttribute(\"sx\")}const d=f.match(o);var h=[];const p=e=>{let t=0;for(const n of h)!1!==e(n[0],n[1])?t++:(delete h[t],h=h.filter((e=>e)))},v=(e,t=!0)=>{\"!\"===e?((e=!1)=>{for(const t in a)e?h.push([t,a[t]]):u.setAttribute(t,a[t])})(t):\".\"===e?((e=!1)=>{e?p(((e,t)=>{u[e]=t})):u[b]=a})(t):\"?\"===e?((e=!1)=>{e?p(((e,t)=>{if(t instanceof s&&(t=t.valueOf()),!t)return!1})):(a instanceof s&&(a=a.valueOf()),a&&(u[b]=a))})(t):\"@\"===e?((e=!1)=>{if(e)p(((e,t)=>(n(u,e,t,!1),!1)));else{var t=!1;\"@\"===f[1]&&(t=!0,b=b.substring(1)),n(u,b,a,t)}})(t):l=a};if(d)for(const e of d[1])v(e,!0);else v(m,!1);return p(((e,t)=>{u.setAttribute(e,t)})),l})),-1!==[\"@\",\".\",\"?\",\"!\"].indexOf(m)||f.match(o)?u.removeAttribute(f):\"ref\"!==f&&\"sx\"!==f&&u.setAttribute(f,r)}var p=Array.from(u.childNodes);for(const e of p)if(e.nodeType===Node.TEXT_NODE){var y=e.textContent;const n=Array.from(y.matchAll(i));y=y.replace(i,(e=>\" \".repeat(e.length))),n.length>0&&(e.textContent=\"\");var _=0;for(let i=0;i<n.length;i++){const c=n[i];var O=parseInt(c[1]),A=t[O],E=y.substring(_,c.index);\"\"!==E&&r(u,E);const a=t=>{t instanceof o?a(t.element):t instanceof HTMLElement||t instanceof SVGElement||t instanceof Text?w(t,e):Array.isArray(t)?t.slice().reverse().map((e=>a(e))):t!==Object(t)||t instanceof s?r(u,t):console.error(\"Only instances of HTMLElement, SVGElement, Text, Array or SnowblindChild are supported.\")};if(a(A),i==n.length-1){e.remove();var T=y.substring(c.index+c[0].length);\"\"!=T&&r(u,T)}_=c.index+A&&A.length}}}const g=l.content.children[0];return v.renderAllIn(g),g}window.addEventListener(\"load\",(()=>{v.renderAllIn()})),HTMLElement.prototype.insertAfter=function(e){e&&e.parentNode&&e.parentNode.insertBefore(this,e.nextSibling)};const w=function(e,t){t&&t.parentNode&&t.parentNode.insertBefore(e,t.nextSibling)};var _=t.y$,O=t.KS,A=t.Ax,E=t.tz,T=t.MI,g=t.oj,C=t.dy,x=t.d4,j=t.sO,N=t.eJ;\n\n//# sourceURL=webpack://@snowblind/hooks/./node_modules/@snowblind/core/dist/snowblind.min.js?");

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
/******/ var __webpack_exports__forwardRef = __webpack_exports__.forwardRef;
/******/ var __webpack_exports__useClickOutside = __webpack_exports__.useClickOutside;
/******/ var __webpack_exports__useContext = __webpack_exports__.useContext;
/******/ var __webpack_exports__useDisclosure = __webpack_exports__.useDisclosure;
/******/ var __webpack_exports__useInputState = __webpack_exports__.useInputState;
/******/ var __webpack_exports__useMemo = __webpack_exports__.useMemo;
/******/ var __webpack_exports__useQueue = __webpack_exports__.useQueue;
/******/ var __webpack_exports__useReducer = __webpack_exports__.useReducer;
/******/ var __webpack_exports__useToggle = __webpack_exports__.useToggle;
/******/ var __webpack_exports__useTransition = __webpack_exports__.useTransition;
/******/ var __webpack_exports__useValidatedState = __webpack_exports__.useValidatedState;
/******/ export { __webpack_exports__forwardRef as forwardRef, __webpack_exports__useClickOutside as useClickOutside, __webpack_exports__useContext as useContext, __webpack_exports__useDisclosure as useDisclosure, __webpack_exports__useInputState as useInputState, __webpack_exports__useMemo as useMemo, __webpack_exports__useQueue as useQueue, __webpack_exports__useReducer as useReducer, __webpack_exports__useToggle as useToggle, __webpack_exports__useTransition as useTransition, __webpack_exports__useValidatedState as useValidatedState };
/******/ 
