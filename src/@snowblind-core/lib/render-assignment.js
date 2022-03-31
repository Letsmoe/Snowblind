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
        if (this._wasDestroyed) {
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
        var obj = this.Object.render();
        if (obj instanceof HTMLElement) {
            this._Node = obj;
        }
        else {
            throw new Error("Can only initialize object with type of HTMLElement.");
        }
        this.Object.Node = this._Node;
        var Node = this._Node;
        const activeElement = document.activeElement;
        const selectionStart = activeElement.selectionStart;
        const selectionEnd = activeElement.selectionEnd;
        this._lastNode.replaceWith(this._Node);
        if (activeElement) {
            const key = activeElement.getAttribute("key");
            if (key) {
                const focusNode = Node.querySelector(`[key='${key}']`);
                focusNode.focus();
                focusNode.setSelectionRange(selectionStart, selectionEnd);
            }
        }
        this._lastNode = Node;
        if (this.Object._usesTransition) {
            this._copiesKeptAlive++;
            this.Object.transitionFunction.from(() => {
                if (!this._renderIsFirstTime) {
                    this.Object.transitionFunction.render();
                }
            });
        }
        if (this.Object.hasTheme) {
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
            execArray(this.Object.didMountCallbacks, this._Node);
            this._renderIsFirstTime = false;
        }
        else {
            execArray(this.Object.didUpdateCallbacks, this._Node);
        }
    }
    reinitialize() {
        this._renderIsFirstTime = true;
        this.constructor(this.Object);
    }
    Destroy() {
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