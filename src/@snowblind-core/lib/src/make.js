import { Component } from "./component";
import { options } from "./options";
import { render } from "./render";
import { isProxy, Observable, Reference } from "./shared-internals";
/**
 * A function that generates an HTML node from given inputs.
 * @param initializer The HTML type of the component or an initializer function to be called generating the HTML content.
 * @param props An object containing all attributes supposed to be assigned to the component.
 * @param children An array of child elements.
 * @returns The generated node as HTMLElement.
 */
function make(initializer, props, ...children) {
    // Prevent "props" from being null
    props = props || {};
    let node;
    if (typeof initializer === "function") {
        // Initialize the component by calling the initializer function.
        props["children"] = children;
        let generator = initializer(props);
        return new Component(generator);
    }
    else {
        node = document.createElement(initializer);
    }
    if (props) {
        for (const [key, value] of Object.entries(props)) {
            if (typeof value === "function") {
                // Apply an event listener to run the passed callback
                node[key.toLowerCase()] = value;
            }
            else if (value instanceof Observable) {
                value.subscribe((newValue) => {
                    node.setAttribute(key, newValue);
                });
                node.setAttribute(key, value.value);
            }
            else if (value instanceof Reference) {
                value.current = node;
            }
            else if (typeof value === "object") {
                if (key === "style") {
                    for (let [styleKey, styleValue] of Object.entries(value)) {
                        if (styleValue instanceof Observable) {
                            styleValue.subscribe((newValue) => {
                                node.style[styleKey] = newValue;
                            });
                        }
                        if (styleValue === null) {
                            styleValue = "none";
                        }
                        else if (typeof styleValue === "number") {
                            styleValue = styleValue + "px";
                        }
                        node.style[styleKey] = styleValue;
                    }
                }
                else if (key === "props") {
                    for (const [styleKey, styleValue] of Object.entries(value)) {
                        if (styleValue instanceof Observable) {
                            styleValue.subscribe((newValue) => {
                                node[styleKey] = newValue;
                            });
                        }
                        node[styleKey] = styleValue;
                    }
                }
                else {
                    // Check whether we want to set attributes whose value is an object
                    if (options.allowObjectProperties) {
                        node.setAttribute(key, JSON.stringify(value));
                    }
                }
            }
            else {
                node.setAttribute(key, value.toString());
            }
        }
    }
    const loopChildren = (children) => {
        for (const child of children) {
            if (Array.isArray(child)) {
                loopChildren(child);
            }
            else if (child instanceof Component) {
                render(node, child);
                child.didUpdate();
            }
            else if (child instanceof HTMLElement) {
                node.appendChild(child);
            }
            else if (child[isProxy] instanceof Observable) {
                // Store the generated item in a variable so we can access it on each update.
                let lastItem = document.createTextNode(child);
                child[isProxy].subscribe((newValue) => {
                    // Change the value of the child node.
                    lastItem.textContent = newValue;
                });
                node.appendChild(lastItem);
            }
            else {
                node.appendChild(document.createTextNode(child));
            }
        }
    };
    loopChildren(children.flat(Infinity));
    return node;
}
export { make };
//# sourceMappingURL=make.js.map