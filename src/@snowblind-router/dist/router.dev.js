/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./lib/demo.js":
/*!*********************!*\
  !*** ./lib/demo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ \"./lib/index.js\");\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\n\nfunction Expenses() {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_1__.html `<div></div>`;\n}\nfunction Invoices() {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_1__.html `<div>\n\t\t<Link to=\"/expenses\"></Link>\n\t</div>`;\n}\nfunction App() {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_1__.html `<WindowRouter>\n\t\t<Routes>\n\t\t\t<Route path=\"/expenses\" element=${Expenses}></Route>\n\t\t\t<Route path=\"/invoices\" element=${Invoices}></Route>\n\t\t</Routes>\n\t</WindowRouter>`;\n}\n(0,_snowblind_core__WEBPACK_IMPORTED_MODULE_1__.expose)({ App, WindowRouter: _index_js__WEBPACK_IMPORTED_MODULE_0__.WindowRouter, Route: _index_js__WEBPACK_IMPORTED_MODULE_0__.Route, Routes: _index_js__WEBPACK_IMPORTED_MODULE_0__.Routes, Link: _index_js__WEBPACK_IMPORTED_MODULE_0__.Link });\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/demo.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Link\": () => (/* reexport safe */ _link_js__WEBPACK_IMPORTED_MODULE_3__.Link),\n/* harmony export */   \"Route\": () => (/* reexport safe */ _route_js__WEBPACK_IMPORTED_MODULE_1__.Route),\n/* harmony export */   \"Routes\": () => (/* reexport safe */ _routes_js__WEBPACK_IMPORTED_MODULE_2__.Routes),\n/* harmony export */   \"WindowRouter\": () => (/* reexport safe */ _router_js__WEBPACK_IMPORTED_MODULE_0__.WindowRouter)\n/* harmony export */ });\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./lib/router.js\");\n/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ \"./lib/route.js\");\n/* harmony import */ var _routes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes.js */ \"./lib/routes.js\");\n/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./link.js */ \"./lib/link.js\");\n/* harmony import */ var _demo_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./demo.js */ \"./lib/demo.js\");\n\n\n\n\n\nconsole.log(_demo_js__WEBPACK_IMPORTED_MODULE_4__);\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/index.js?");

/***/ }),

/***/ "./lib/link.js":
/*!*********************!*\
  !*** ./lib/link.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Link\": () => (/* binding */ Link)\n/* harmony export */ });\nfunction Link(props) { }\n\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/link.js?");

/***/ }),

/***/ "./lib/route.js":
/*!**********************!*\
  !*** ./lib/route.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Route\": () => (/* binding */ Route)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction Route(props) {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.html `<div></div>`;\n}\n\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/route.js?");

/***/ }),

/***/ "./lib/router.js":
/*!***********************!*\
  !*** ./lib/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WindowRouter\": () => (/* binding */ WindowRouter)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction WindowRouter(props) {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.html `<div>\n\t\t${props.children}\n\t</div>`;\n}\n\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/router.js?");

/***/ }),

/***/ "./lib/routes.js":
/*!***********************!*\
  !*** ./lib/routes.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Routes\": () => (/* binding */ Routes)\n/* harmony export */ });\n/* harmony import */ var _snowblind_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @snowblind/core */ \"./node_modules/@snowblind/core/dist/snowblind.min.js\");\n\nfunction Routes(props) {\n    return () => _snowblind_core__WEBPACK_IMPORTED_MODULE_0__.html `<div>\n\t\t${props.children}\n\t</div>`;\n}\n\n\n\n//# sourceURL=webpack://@snowblind/router/./lib/routes.js?");

/***/ }),

/***/ "./node_modules/@snowblind/core/dist/snowblind.min.js":
/*!************************************************************!*\
  !*** ./node_modules/@snowblind/core/dist/snowblind.min.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Observable\": () => (/* binding */ C),\n/* harmony export */   \"Snowblind\": () => (/* binding */ E),\n/* harmony export */   \"SnowblindRef\": () => (/* binding */ T),\n/* harmony export */   \"UpdateDispatcher\": () => (/* binding */ A),\n/* harmony export */   \"ValueBinder\": () => (/* binding */ g),\n/* harmony export */   \"expose\": () => (/* binding */ j),\n/* harmony export */   \"html\": () => (/* binding */ x),\n/* harmony export */   \"useEffect\": () => (/* binding */ N),\n/* harmony export */   \"useRef\": () => (/* binding */ S),\n/* harmony export */   \"useState\": () => (/* binding */ L)\n/* harmony export */ });\nvar e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{y$:()=>i,KS:()=>b,tz:()=>a,MI:()=>h,oj:()=>c,Jj:()=>p,dy:()=>_,d4:()=>f,sO:()=>m,eJ:()=>d});class n{constructor(e,t={}){if(e._Observer.boundRender=this,this._wasDestroyed=!1,this._renderIsFirstTime=!0,this._maxCopies=e._maxCopies,this._copiesKeptAlive=0,this._lastNode=t.replace||document.body.appendChild(document.createElement(\"i\")),this._Node,this.Object=e,!(e instanceof b.Component))throw new Error(\"Renderer didn't receive object of type Snowblind.Component\")}Render(){if(this._wasDestroyed)throw new Error(\"Renderer has been destroyed.\");if(this.Object._usesTransition){const e=this._Node;this._copiesKeptAlive>=this._maxCopies?e.remove():this.Object.transitionFunction.leave((()=>{e.remove(),this._copiesKeptAlive-=1}))}var e=this.Object.render();if(!(e instanceof HTMLElement))throw new Error(\"Can only initialize object with type of HTMLElement.\");this._Node=e,this.Object.Node=this._Node;var t=this._Node;const n=document.activeElement,s=n.selectionStart,o=n.selectionEnd;if(this._lastNode.replaceWith(this._Node),n){const e=n.getAttribute(\"key\");if(e){const n=t.querySelector(`[key='${e}']`);n.focus(),n.setSelectionRange(s,o)}}if(this._lastNode=t,this.Object._usesTransition&&(this._copiesKeptAlive++,this.Object.transitionFunction.from((()=>{this._renderIsFirstTime||this.Object.transitionFunction.render()}))),this.Object.hasTheme){const e=document.createElement(\"div\"),n=(e,t)=>{const n=this.Object.hasTheme[t];for(const r of Array.from(e))if(\"object\"==typeof n)for(const e in n)r.style[e]=n[e];else r.style[t]=n};for(const r in this.Object.hasTheme){const s=t.querySelectorAll(r);s&&s.length>0?n(s,r):void 0!==e.style[r]&&n(Array.from(t.getElementsByTagName(\"*\")).concat([t]),r)}}!0===this._renderIsFirstTime?(r(this.Object.didMountCallbacks,this._Node),this._renderIsFirstTime=!1):r(this.Object.didUpdateCallbacks,this._Node)}reinitialize(){this._renderIsFirstTime=!0,this.constructor(this.Object)}Destroy(){this._wasDestroyed=!0,r(this.Object.willUnmountCallbacks),this.Object._usesTransition?this.Object.transitionFunction.leave((()=>{this._Node.remove()})):this._Node.remove()}}const r=(e,...t)=>e.map((e=>e(...t))),s=Symbol(\"\");class o{constructor(e,t=(()=>{})){const n={get(e,t){if(t===s)return!0;const r=e[t];if(void 0!==r){if(null!==r){var o=r.constructor;r[s]||!o||o!=={}.constructor&&o!==[].constructor||(e[t]=new Proxy(r,n))}return e[t]}},set:(e,n,r)=>(e[n]=r,this.boundRender&&(this.debounce&&window.cancelAnimationFrame(this.debounce),this.debounce=window.requestAnimationFrame((()=>{this.boundRender.Render()}))),t(e,n,r),!0)};this._value=new Proxy(e,n)}}class i{constructor(e){this._value=e,this._subscribers=[]}next(e){this._value=e;for(const t of this._subscribers)t(e)}subscribe(e){this._subscribers.push(e)}complete(){this._subscribers=new Proxy([],{set:()=>{throw new Error(\"Observable has been completed.\")}})}restore(){this._subscribers=[],this._value=void 0}}class a{constructor(){this.current}}class c{constructor(e){this.observable=e,this.value=e._value,e.subscribe((e=>{this.value=e}))}valueOf(){return this.value}toString(){return this.value.toString()}}const l={},h=new i;function d(e,t=!0){const n=new i(e);var r=new c(n);return!0===t&&h.subscribe((e=>{const t=e.Renderer;n.subscribe((()=>{t.Render()}))})),[r,e=>(\"function\"==typeof e&&(e=e()),e=e.valueOf(),n.next(e),e)]}const u=function e(t,n){if(t===n)return!0;if(!(t instanceof Object&&n instanceof Object))return!1;if(t.constructor!==n.constructor)return!1;for(var r in t)if(t.hasOwnProperty(r)){if(!n.hasOwnProperty(r))return!1;if(t[r]!==n[r]){if(\"object\"!=typeof t[r])return!1;if(!e(t[r],n[r]))return!1}}for(r in n)if(n.hasOwnProperty(r)&&!t.hasOwnProperty(r))return!1;return!0};function f(e,t=[]){var n=t.map((e=>e.valueOf()));h.subscribe((r=>{const s=r=>{n.length>0?(n.filter(((e,n)=>!u(e,t[n].valueOf()))).length>0||0==n.length)&&(e(r),n=t.map((e=>e.valueOf()))):e(r)};r.onComponentDidMount(s),r.onComponentDidUpdate(s)}))}function m(){return new a}function p(e,t=[]){t=Array.from([t]).flat();for(const r in e){const s=e[r];var n=(void 0===t[0]?r:t[0]).toLowerCase();l[n]=s}}const b={Component:class{constructor(e,t,r={hasTheme:!1,replace:void 0}){const s=l[t.name.toLowerCase()];if(s){const t=s.propTypes;t&&window.typeCheck&&(e=window.typeCheck(e,t,s.defaultProps))}this.hasTheme=r.hasTheme,this._maxCopies=1/0,this._usesTransition=!1,this.didMountCallbacks=[],this.didUpdateCallbacks=[],this.willUnmountCallbacks=[],r.replace instanceof HTMLElement&&(e.children=Array.from(r.replace.childNodes)),this._Observer=new o(e||{}),this.props=this._Observer._value,this.Renderer=new n(this,r);const i=r.replace.isReferenceTo;this._generatorFunction=t(e,i),h.next(this),h.restore(),this.Renderer.Render()}onComponentDidMount(e){this.didMountCallbacks.push(e)}onComponentDidUpdate(e){this.didUpdateCallbacks.push(e)}onComponentWillUnmount(e){this.willUnmountCallbacks.push(e)}render(...e){return this._generatorFunction()}},createContext(e){if(\"object\"!=typeof e)throw new TypeError(\"`createContext` may only be used with objects.\");const t=new i(e);return[new o(e,(e=>{t.next(e)}))._value,t]},renderAllIn(e=document.body){const t=e=>{for(const n of e){if(n instanceof HTMLScriptElement)continue;let e=n.nodeName.toLowerCase();if(l.hasOwnProperty(e)){let t=l[e];if(\"function\"==typeof t){const e=this.getNodeProperties(n);new b.Component(e,t,{hasTheme:!1,replace:n})}}else t(Array.from(n.children))}};t(Array.from(e.children))},getNodeProperties:e=>Object.fromEntries(Array.from(e.attributes).map((e=>[e.name,e.value]))),eventBus:{on(e,t){document.addEventListener(e,(e=>t(e instanceof CustomEvent?e.detail:void 0)))},dispatch(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove(e,t){document.removeEventListener(e,t)}},createElement:(e,t,n=[])=>{let r=document.createElement(e);for(let e in t)if(Object.hasOwnProperty.call(t,e)){let n=t[e];if(null!=n)if(\"text\"==e)r.innerText=n;else{let t=e.substring(1).replace(\"@\",\"\");if(\"@\"===e[0])r.addEventListener(e,(t=>{\"@\"==e[1]&&t.target.isEqualNode(r),n(r,t)}));else if(\".\"===e[0])r[t]=n;else if(\"?\"===e[0])n&&r.setAttribute(t,n);else if(\"object\"==typeof n)for(const e in n)r.setAttribute(e,n[e]);else r.setAttribute(e,n)}}for(let e of n)\"function\"==typeof e||e instanceof HTMLElement&&r.appendChild(e);return r}};window.addEventListener(\"load\",(()=>{b.renderAllIn()}));const v=/\\{\\{([0-9]+)\\}\\}/g;class y{constructor(e,t,n){this.attributes=(e=>Array.from(e.attributes).map((e=>[e.name,e.value])).reduce(((e,t)=>(e[t[0]]=t[1],e)),{}))(e),this.node=e,this.values=t;let r=this.node.nodeName.toLowerCase();const s=l.hasOwnProperty(r);for(const e in this.attributes){let n,r=this.attributes[e],o=Array.from(r.matchAll(v)).map((e=>t[parseInt(e[1])])),i=e.substring(1),a=!1;n=-1===o.map((e=>\"string\"==typeof e)).indexOf(!1)?r.replace(v,((e,n)=>(n=parseInt(n),t[n]))):o[o.length-1],this.attributes[e]=n,!1===s&&(\"ref\"===e&&(n.current=this.node,this.node.isReferenceTo=n,this.node.removeAttribute(\"ref\")),e.startsWith(\"@\")?\"@\"===e[1]?this.setEvent(i.substring(1),n,!0):this.setEvent(i,n,!1):e.startsWith(\".\")?this.setProperties(i,n):e.startsWith(\"?\")?this.setConditionally(i,n):e.startsWith(\"!\")?this.setObject(n):(this.trySetAttribute(e,n),a=!0),a||this.node.removeAttribute(e))}if(!0===s){!function(e,t){var n=document.createTreeWalker(e,1,null);let r;for(;r=n.nextNode();)r=new y(r,t,n).node}(this.node,this.values),n&&n.previousSibling();let e=new b.Component(this.attributes,l[r],{hasTheme:!1,replace:this.node});this.node=e.Node,this.createdNewComponent=!0}}trySetAttribute(e,t){try{this.node.setAttribute(e,t)}catch(t){console.error(`'${e}' is not a valid attribute name.`)}}setObject(e){for(const t in e){let n=e[t];this.trySetAttribute(t,n)}}setConditionally(e,t){t&&(this.node[e]=t)}setProperties(e,t){this.node[e]=t}setEvent(e,t,n=!1){this.node.addEventListener(e,(e=>{n&&e.target.isEqualNode(this.node)?t(this.node,e):n||t(this.node,e)}))}}function w(e,t,n=\"or\"){let r=(t=[t].flat(1)).map((t=>e instanceof t));return\"or\"==n?r.indexOf(!0)>-1:-1==r.indexOf(!1)}function O(e,t){var n=document.createTextNode(t);return e.appendChild(n),n}function _(e,...t){var n=\"\",r=0;for(const t of e)n+=t+(e[e.length-1]===t?\"\":`{{${r++}}}`);const s=document.createElement(\"template\");if(n=n.replace(/<([A-z0-9]+)(.*?)\\/>(?: |$|<[A-z]|\\n)/g,\"<$1 $2></$1>\"),s.innerHTML=n,s.content.children.length>1)throw new Error(\"Multiple elements must be wrapped in a single element.\");var o=document.createTreeWalker(s.content,1,null);let i,a=0;for(;null!==(i=o.nextNode());){const e=new y(i,t,o);var l;i=e.node,w(i,[HTMLTextAreaElement,HTMLInputElement])&&(i.hasAttribute(\"key\")||(i.setAttribute(\"key\",\"input-\"+a),a++));var h=Array.from(i.childNodes);for(const e of h)if(e.nodeType===Node.TEXT_NODE){var d=e.textContent;const n=Array.from(d.matchAll(v));d=d.replace(v,(e=>\" \".repeat(e.length))),n.length>0&&(e.textContent=\"\");var u=0;for(let r=0;r<n.length;r++){const s=n[r];var f=t[parseInt(s[1])],m=d.substring(u,s.index);\"\"!==m&&(l=O(i,m));const o=e=>{var t,n;w(e,[HTMLElement,SVGElement,Text])?(t=e,(n=l)&&n.parentNode&&n.parentNode.insertBefore(t,n.nextSibling),l=e):Array.isArray(e)?e.slice().map((e=>o(e))):e!==Object(e)||w(e,c)?l=O(i,e):console.error(\"Only instances of HTMLElement, SVGElement, Text or Array are supported.\")};if(o(f),r==n.length-1){e.remove();var p=d.substring(s.index+s[0].length);\"\"!=p&&O(i,p)}u=s.index+f&&f.length}}}const _=s.content.children[0];return b.renderAllIn(_),_}var C=t.y$,E=t.KS,T=t.tz,A=t.MI,g=t.oj,j=t.Jj,x=t.dy,N=t.d4,S=t.sO,L=t.eJ;\n\n//# sourceURL=webpack://@snowblind/router/./node_modules/@snowblind/core/dist/snowblind.min.js?");

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
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ var __webpack_exports__Link = __webpack_exports__.Link;
/******/ var __webpack_exports__Route = __webpack_exports__.Route;
/******/ var __webpack_exports__Routes = __webpack_exports__.Routes;
/******/ var __webpack_exports__WindowRouter = __webpack_exports__.WindowRouter;
/******/ export { __webpack_exports__Link as Link, __webpack_exports__Route as Route, __webpack_exports__Routes as Routes, __webpack_exports__WindowRouter as WindowRouter };
/******/ 
