import RenderAssignment from "./render-assignment.js";
import { Observer } from "./observer.js";
export { useRef, useState, useEffect, } from "./hooks/index";
import { UpdateDispatcher, exposedComponents, SnowblindChild, Observable, } from "./shared-internals.js";
/**
 * Exposes a component to be grabbed by the initial render process.
 * @param {Array<Snowblind.Component>} components List of components to add
 * @param {Array<String>} optNames Optional list of names if they shall not be auto-retrieved from the components class name.
 */
window.expose = function (components, optNames) {
    optNames = Array.from([optNames]).flat();
    var i = 0;
    for (const key in components) {
        const component = components[key];
        var name = (typeof optNames[i] === "undefined" ? key : optNames[i]).toLowerCase();
        exposedComponents[name] = component;
    }
};
/**
 * Add component to global scope;
 */
const Snowblind = {
    Component: class Component {
        constructor(props, generator, options = {
            hasTheme: false,
            replace: undefined,
        }) {
            const globalSelf = exposedComponents[generator.name.toLowerCase()];
            /**
             * Convert expected properties
             */
            if (globalSelf) {
                const propTypes = globalSelf.propTypes;
                if (propTypes && window.typeCheck) {
                    props = window.typeCheck(props, propTypes, globalSelf.defaultProps);
                }
            }
            /**
             * Custom theme when object created from styled() function
             */
            this.hasTheme = options.hasTheme;
            this._maxCopies = Infinity;
            /**
             * Check if obj is a function, then it needs execution
             */
            this._usesTransition = false;
            /**
             * Setup arrays for event listening
             */
            this.didMountCallbacks = [];
            this.didUpdateCallbacks = [];
            this.willUnmountCallbacks = [];
            /**
             * Initialize empty dependencies object for useEffect calls
             */
            if (options.replace instanceof HTMLElement) {
                props.children = Array.from(options.replace.childNodes).map((x) => new SnowblindChild(x));
            }
            this._Observer = new Observer(props || {});
            this.props = this._Observer._value;
            this.Renderer = new RenderAssignment(this, options);
            /**
             * Try to find a ref to the item.
             */
            const ref = options.replace.isReferenceTo;
            this._generatorFunction = generator(props, ref);
            /**
             * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
             */
            UpdateDispatcher.next(this);
            UpdateDispatcher.restore();
            this.Renderer.Render();
        }
        onComponentDidMount(callback) {
            this.didMountCallbacks.push(callback);
        }
        onComponentDidUpdate(callback) {
            this.didUpdateCallbacks.push(callback);
        }
        onComponentWillUnmount(callback) {
            this.willUnmountCallbacks.push(callback);
        }
        render(...args) {
            return this._generatorFunction();
        }
    },
    createContext(initialValue) {
        if (typeof initialValue !== "object") {
            throw new TypeError("`createContext` may only be used with objects.");
        }
        // Bind the object to an observable to update all references later on.
        const provider = new Observable(initialValue);
        const changeCallback = (obj) => {
            provider.next(obj);
        };
        // Observe object changes with an observer
        const newObject = new Observer(initialValue, changeCallback);
        return [newObject._value, provider];
    },
    /**
     * Searches the DOMTree recursively for components, this will ensure parent nodes will be rendered and their children will be included in the render afterwards
     */
    renderAllIn(element = document.body) {
        const recurse = (parentList) => {
            // Filter out scripts
            for (const parent of parentList) {
                if (parent instanceof HTMLScriptElement) {
                    continue;
                }
                let nodeName = parent.nodeName.toLowerCase();
                if (exposedComponents.hasOwnProperty(nodeName)) {
                    // Element nodeName in the names of exposed components, it must be one!
                    let component = exposedComponents[nodeName];
                    let isFunction = typeof component === "function";
                    if (isFunction) {
                        const props = this.getNodeProperties(parent);
                        new Snowblind.Component(props, component, {
                            hasTheme: false,
                            replace: parent,
                        });
                    }
                }
                else {
                    // No component here! Let's go deeper!
                    recurse(Array.from(parent.children));
                }
            }
        };
        recurse(Array.from(element.children));
    },
    getNodeProperties(node) {
        return Object.fromEntries(Array.from(node.attributes).map((x) => {
            return [x.name, x.value];
        }));
    },
    eventBus: {
        on(event, callback) {
            document.addEventListener(event, (e) => callback(e instanceof CustomEvent ? e.detail : undefined));
        },
        dispatch(event, data) {
            document.dispatchEvent(new CustomEvent(event, {
                detail: data,
            }));
        },
        remove(event, callback) {
            document.removeEventListener(event, callback);
        },
    },
    createElement: (type, props, children = []) => {
        let element = document.createElement(type);
        for (let name in props) {
            if (Object.hasOwnProperty.call(props, name)) {
                let value = props[name];
                if (value !== null && value !== undefined) {
                    if (name == "text") {
                        element.innerText = value;
                    }
                    else {
                        let trimmedName = name.substring(1).replace("@", "");
                        if (name[0] === "@") {
                            element.addEventListener(name, (e) => {
                                if (name[1] == "@" &&
                                    e.target.isEqualNode(element)) {
                                    value(element, e);
                                }
                                else {
                                    value(element, e);
                                }
                            });
                        }
                        else if (name[0] === ".") {
                            element[trimmedName] = value;
                        }
                        else if (name[0] === "?") {
                            if (value) {
                                element.setAttribute(trimmedName, value);
                            }
                        }
                        else if (typeof value === "object") {
                            for (const i in value) {
                                element.setAttribute(i, value[i]);
                            }
                        }
                        else {
                            element.setAttribute(name, value);
                        }
                    }
                }
            }
        }
        for (let node of children) {
            if (typeof node === "function") {
                // Check if a component reference was passed.
            }
            else if (node instanceof HTMLElement) {
                element.appendChild(node);
            }
        }
        return element;
    },
};
window.addEventListener("load", () => {
    Snowblind.renderAllIn();
});
/**
 * Inserts a given element after another.
 * @param el The element given node should be inserted after.
 */
HTMLElement.prototype.insertAfter = function (el) {
    if (el && el.parentNode) {
        el.parentNode.insertBefore(this, el.nextSibling);
    }
};
export { Snowblind };
