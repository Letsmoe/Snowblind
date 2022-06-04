import { Snowblind } from "./snowblind.js";
export default class RenderAssignment {
    constructor(obj, options = {}) {
        obj._Observer.boundRender = this;
        this._wasDestroyed = false;
        this._renderIsFirstTime = true;
        this._maxCopies = obj._maxCopies;
        this._copiesKeptAlive = 0;
        this._lastNode = options.replace || document.body.appendChild(document.createElement("i"));
        this._Node;
        this.Object = obj;
        if (!(obj instanceof Snowblind.Component)) {
            throw new Error("Renderer didn't receive object of type Snowblind.Component");
        }
    }
    Render() {
        var _a;
        if (this._wasDestroyed) {
            /**
             * Destroy method has been called, cancel the render
             */
            throw new Error("Renderer has been destroyed.");
        }
        if (this.Object._usesTransition) {
            const currentNode = this._Node;
            if (this._copiesKeptAlive >= this._maxCopies) {
                currentNode.remove();
            }
            else {
                this.Object.transitionFunction.leave(() => {
                    currentNode.remove();
                    this._copiesKeptAlive -= 1;
                });
            }
        }
        /**
         * Give access to parent element
         */
        var obj = this.Object.render();
        if (obj instanceof HTMLElement) {
            /**
             * Keep eventListeners and append directly as HTMLElement
             */
            this._Node = obj;
        }
        else {
            throw new Error("Can only initialize object with type of HTMLElement.");
        }
        /**
         * Reset nodes on base object
         */
        this.Object.Node = this._Node;
        var Node = this._Node;
        const activeElement = document.activeElement;
        const selectionStart = activeElement.selectionStart;
        const selectionEnd = activeElement.selectionEnd;
        this._lastNode.replaceWith(this._Node);
        if (activeElement) {
            // Check if there was a focused element and if it had a `key` attribute that might be used to re-focus it.
            const key = activeElement.getAttribute("key");
            if (key) {
                // Key found, let's focus the element.
                const focusNode = ((_a = Node.attributes["key"]) === null || _a === void 0 ? void 0 : _a.value) === key ? Node : Node.querySelector(`[key='${key}']`);
                focusNode.focus();
                focusNode.setSelectionRange(selectionStart, selectionEnd);
            }
        }
        this._lastNode = Node;
        /**
         * Provide node to the component
         */
        if (this.Object._usesTransition) {
            /**
             * Apply any transition effects to the node
             */
            this._copiesKeptAlive++;
            this.Object.transitionFunction.from(() => {
                if (!this._renderIsFirstTime) {
                    this.Object.transitionFunction.render();
                }
            });
        }
        if (this.Object.hasTheme) {
            /**
             * Apply custom styling
             */
            const compareStyles = document.createElement("div");
            const appendStyles = (elements, query) => {
                const properties = this.Object.hasTheme[query];
                for (const subNode of Array.from(elements)) {
                    if (typeof properties === "object") {
                        for (const propName in properties) {
                            subNode.style[propName] = properties[propName];
                        }
                    }
                    else {
                        subNode.style[query] = properties;
                    }
                }
            };
            for (const query in this.Object.hasTheme) {
                const elements = Node.querySelectorAll(query);
                if (elements && elements.length > 0) {
                    appendStyles(elements, query);
                }
                else if (typeof compareStyles.style[query] !== "undefined") {
                    appendStyles(Array.from(Node.getElementsByTagName("*")).concat([Node]), query);
                }
            }
        }
        if (this._renderIsFirstTime === true) {
            /**
             * Component is only mounted AFTER the render finishes
             */
            execArray(this.Object.didMountCallbacks, this._Node);
            this._renderIsFirstTime = false;
        }
        else {
            /**
             * Run componentDidUpdate() method AFTER component rerender
             */
            execArray(this.Object.didUpdateCallbacks, this._Node);
        }
    }
    reinitialize() {
        /**
         * Build the render again (reset render status and call constructor)
         */
        this._renderIsFirstTime = true;
        this.constructor(this.Object);
    }
    Destroy() {
        /**
         * Unmount component then remove node and linking element
         */
        this._wasDestroyed = true;
        execArray(this.Object.willUnmountCallbacks);
        if (this.Object._usesTransition) {
            this.Object.transitionFunction.leave(() => {
                this._Node.remove();
            });
        }
        else {
            this._Node.remove();
        }
    }
}
const execArray = (arr, ...args) => arr.map(x => x(...args));
//# sourceMappingURL=render-assignment.js.map