import { exposedComponents } from "./shared-internals.js";
import { Snowblind } from "./snowblind.js";
import { MATCH_INDEX } from "./types.js";
const getAttributes = (node) => {
    return Array.from(node.attributes)
        .map((a) => [a.name, a.value])
        .reduce((acc, attr) => {
        acc[attr[0]] = attr[1];
        return acc;
    }, {});
};
const scanElement = (node, arrValues) => {
    var walker = document.createTreeWalker(node, 1, null);
    let current;
    while ((current = walker.nextNode())) {
        current = new SnowblindElement(current, arrValues, walker).node;
    }
};
const isStringArray = (arr) => arr.map((x) => typeof x === "string").indexOf(false) === -1;
const findIndex = (str) => str.matchAll(MATCH_INDEX);
class SnowblindElement {
    constructor(node, values, walker) {
        this.attributes = getAttributes(node);
        this.node = node;
        this.values = values;
        let nodeName = this.node.nodeName.toLowerCase();
        // Check if node is a component-to-be and stop any attribute assignment on it, just fill the attributes object.
        const stopOverwrite = exposedComponents.hasOwnProperty(nodeName);
        for (const key in this.attributes) {
            let indexString = this.attributes[key];
            let indices = Array.from(findIndex(indexString));
            let arrValues = indices.map((index) => {
                // Index number is stored in first capture group (index[1]) as a string.
                return values[parseInt(index[1])];
            });
            /**
             * We can assume that only string based attributes will have more than one value inserted into them.
             */
            let subName = key.substring(1);
            let value;
            let dontRemove = false;
            if (isStringArray(arrValues)) {
                // The whole thing is just strings, replace them together...
                value = indexString.replace(MATCH_INDEX, (full, index) => {
                    index = parseInt(index);
                    return values[index];
                });
            }
            else {
                // We cannot assign multiple values to the same property... We just take the last one and that's it!
                value = arrValues[arrValues.length - 1];
            }
            // Set the filled property on the `attributes` object.
            this.attributes[key] = value;
            if (stopOverwrite === false) {
                if (key === "ref") {
                    /**
                     * User wants a reference to the current object
                     */
                    value.current = this.node;
                    this.node.isReferenceTo = value;
                    this.node.removeAttribute("ref");
                }
                if (key.startsWith("@")) {
                    // Assign a new event to the node. (Check if second char is @ sign, if so it should only apply to the node not it's children.)
                    if (key[1] === "@") {
                        this.setEvent(subName.substring(1), value, true);
                    }
                    else {
                        this.setEvent(subName, value, false);
                    }
                }
                else if (key.startsWith(".")) {
                    // Assign JS property value to the node.
                    this.setProperties(subName, value);
                }
                else if (key.startsWith("?")) {
                    // Conditionally Apply to the node.
                    this.setConditionally(subName, value);
                }
                else if (key.startsWith("!")) {
                    // Apply object as attributes.
                    this.setObject(value);
                }
                else {
                    // Treat as though there could be multiple values inside. Replace each found key with it's corresponding value.
                    this.trySetAttribute(key, value);
                    dontRemove = true;
                }
                if (!dontRemove) {
                    this.node.removeAttribute(key);
                }
            }
        }
        if (stopOverwrite === true) {
            scanElement(this.node, this.values);
            if (walker) {
                walker.previousSibling();
            }
            // Create a new component from the found node.
            let component = new Snowblind.Component(this.attributes, exposedComponents[nodeName], {
                hasTheme: false,
                replace: this.node,
            });
            this.node = component.Node;
            this.createdNewComponent = true;
        }
    }
    trySetAttribute(key, value) {
        try {
            this.node.setAttribute(key, value);
        }
        catch (e) {
            console.error(`'${key}' is not a valid attribute name.`);
        }
    }
    setObject(object) {
        for (const key in object) {
            let value = object[key];
            this.trySetAttribute(key, value);
        }
    }
    setConditionally(property, value) {
        if (value) {
            this.node[property] = value;
        }
    }
    setProperties(property, props) {
        this.node[property] = props;
    }
    setEvent(event, callback, onlyThisNode = false) {
        this.node.addEventListener(event, (e) => {
            if (onlyThisNode &&
                e.target.isEqualNode(this.node)) {
                callback(this.node, e);
            }
            else if (!onlyThisNode) {
                callback(this.node, e);
            }
        });
    }
}
export { SnowblindElement };
//# sourceMappingURL=element.js.map