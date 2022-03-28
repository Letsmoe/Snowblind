import RenderAssignment from "./render-assignment.js";
import { Observer } from "./observer.js";
export { useRef, useState, useEffect, } from "./hooks/index";
import { UpdateDispatcher, exposedComponents, SnowblindChild, Observable, } from "./shared-internals.js";
window.expose = function (components, optNames) {
    optNames = Array.from([optNames]).flat();
    var i = 0;
    for (const key in components) {
        const component = components[key];
        var name = (typeof optNames[i] === "undefined" ? key : optNames[i]).toLowerCase();
        exposedComponents[name] = component;
    }
};
const Snowblind = {
    Component: class Component {
        constructor(props, generator, options = {
            hasTheme: false,
            replace: undefined,
        }) {
            const globalSelf = exposedComponents[generator.name.toLowerCase()];
            if (globalSelf) {
                const propTypes = globalSelf.propTypes;
                if (propTypes && window.typeCheck) {
                    props = window.typeCheck(props, propTypes, globalSelf.defaultProps);
                }
            }
            this.hasTheme = options.hasTheme;
            this._maxCopies = Infinity;
            this._usesTransition = false;
            this.didMountCallbacks = [];
            this.didUpdateCallbacks = [];
            this.willUnmountCallbacks = [];
            if (options.replace instanceof HTMLElement) {
                props.children = Array.from(options.replace.childNodes).map((x) => new SnowblindChild(x));
            }
            this._Observer = new Observer(props || {});
            this.props = this._Observer._value;
            this.Renderer = new RenderAssignment(this, options);
            const ref = options.replace.isReferenceTo;
            this._generatorFunction = generator(props, ref);
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
        const provider = new Observable(initialValue);
        const changeCallback = (obj) => {
            provider.next(obj);
        };
        const newObject = new Observer(initialValue, changeCallback);
        return [newObject._value, provider];
    },
    renderAllIn(element = document.body) {
        const recurse = (parentList) => {
            for (const parent of parentList) {
                if (parent instanceof HTMLScriptElement) {
                    continue;
                }
                let nodeName = parent.nodeName.toLowerCase();
                if (exposedComponents.hasOwnProperty(nodeName)) {
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
HTMLElement.prototype.insertAfter = function (el) {
    if (el && el.parentNode) {
        el.parentNode.insertBefore(this, el.nextSibling);
    }
};
export { Snowblind };
//# sourceMappingURL=snowblind.js.map