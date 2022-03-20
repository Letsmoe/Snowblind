import Snowblind from "./snowblind.js"

export default class RenderAssignment {
	constructor(obj, options = {}) {
		obj._Observer.boundRender = this
		this._wasDestroyed = false;
		this.copiesKeptAlive = 0;
		this.lastNode;
		this.Node;
		this.ID = Math.random().toString(36).substring(2, 15);
		/**
		 * Create a linking placeholder
		 */
		var Link = document.createElement("span");
		Link.classList.add("render-placeholder");
		Link.setAttribute("render-is-linked-to", this.ID);
		if (options.replace instanceof HTMLElement) {
			options.replace.replaceWith(Link);
		} else {
			document.body.appendChild(Link);
		}
		this.LinkedTo = Link
		this.Object = obj
		if (!(obj instanceof Snowblind.Component)) {
			throw new Error("Renderer didn't receive object of type Snowblind.Component");
		}
		this._renderIsFirstTime = true
	}

	Render() {
		if (this._wasDestroyed) {
			/**
			 * Destroy method has been called, cancel the render
			 */
			throw new Error("Renderer has been destroyed.")
		}
		var maxCopies = this.Object.transitionMaxCopies;

		if (this._renderIsFirstTime === false) {
			/**
			 * Assign childElements
			 */
			this.Object.originalChildren = this.Node.childNodes;
		}

		if (this.Object.usesTransition) {
			const currentNode = this.Node;
			if (this.copiesKeptAlive >= maxCopies) {
				currentNode.remove()
			} else {
				this.Object.transitionFunction.leave(() => {
					currentNode.remove()
					this.copiesKeptAlive -= 1
				})
			}
		}
		/**
		 * Give access to parent element
		 */
		this.Object.parentElement = this.LinkedTo.parentNode;
		var obj = this.Object.getNode()
		if (obj instanceof HTMLElement) {
			/**
			 * Keep eventListeners and append directly as HTMLElement
			 */
			this.Node = obj
		} else {
			throw new Error("Can only initialize object with type of HTMLElement.")
		}
		/**
		 * Reset nodes on base object
		 */
		this.Object.Node = this.Node
		var Node = this.Node
		if (this.lastNode) {
			const activeElement = document.activeElement;
			const selectionStart = activeElement.selectionStart;
			const selectionEnd = activeElement.selectionEnd;
			this.lastNode.replaceWith(Node);
			if (activeElement) {
				const key = activeElement.getAttribute("key");
				if (key) {
					const focusNode = Node.querySelector(`[key='${key}']`)
					focusNode.focus();
					focusNode.setSelectionRange(selectionStart, selectionEnd)
				}
			}
		} else {
			this.LinkedTo.replaceWith(Node);
		}
		this.lastNode = Node;
		/**
		 * Provide node to the component
		 */

		if (this.Object.usesTransition) {
			/**
			 * Apply any transition effects to the node
			 */
			this.copiesKeptAlive++
			this.Object.transitionFunction.from(() => {
				if (!this._renderIsFirstTime) {
					this.Object.transitionFunction.render()
				}
			})
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
							subNode.style[propName] = properties[propName]
						}
					} else {
						subNode.style[query] = properties
					}
				}
			}

			for (const query in this.Object.hasTheme) {
				const elements = Node.querySelectorAll(query)
				if (elements && elements.length > 0) {
					appendStyles(elements, query)
				} else if (typeof compareStyles.style[query] !== "undefined") {
					appendStyles(Array.from(Node.getElementsByTagName("*")).concat([Node]), query)
				}
			}
		}

		if (this._renderIsFirstTime === true) {
			/**
			 * Component is only mounted AFTER the render finishes
			 */
			this.Object.componentDidMount()
			for (const listener of this.Object.didMountCallbacks) {
				listener()
			}
			this._renderIsFirstTime = false
		} else {
			/**
			 * Run componentDidUpdate() method AFTER component rerender
			 */
			this.Object.componentDidUpdate()
			for (const listener of this.Object.didUpdateCallbacks) {
				listener()
			}
		}
	}

	reinitialize() {
		/**
		 * Build the render again (reset render status and call constructor)
		 */
		this._renderIsFirstTime = true
		this.constructor(this.Object)
	}

	Destroy() {
		/**
		 * Unmount component then remove node and linking element
		 */
		this._wasDestroyed = true
		this.Object.componentWillUnmount()
		if (this.Object.usesTransition) {
			this.Object.transitionFunction.leave(() => {
				this.Node.remove()
			})
		} else {
			this.Node.remove()
		}
	}
}