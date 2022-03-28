class Observable {
	_value: any;
	_subscribers: any[];
	constructor(value? : any) {
		this._value = value;
		this._subscribers = [];
	}

	next(value : any) {
		this._value = value;
		for (const subscriber of this._subscribers) {
			subscriber(value)
		}
	}

	subscribe(callback : (element? : any) => void) {
		this._subscribers.push(callback);
	}

	complete() {
		this._subscribers = new Proxy([], {set: () => {
			throw new Error("Observable has been completed.")
		}});
	}

	restore() {
		this._subscribers = [];
		this._value = undefined;
	}
}

class SnowblindRef {
	public current : HTMLElement;
	constructor() {
		this.current;
	}
}

class ValueBinder {
	observable: any;
	value: any;
	constructor(obs : Observable) {
		this.observable = obs;
		this.value = obs._value;

		obs.subscribe((val) => {
			this.value = val
		})
	}

	valueOf() {
		return this.value
	}

	toString() {
		return this.value.toString()
	}
};

class SnowblindChild {
	ID: string;
	element: any;
	constructor(el : HTMLElement) {
		this.ID = (Math.random() + 1).toString(36).substring(2);
		childrenObjects[this.ID] = this;
		this.setElement(el)
	}

	setElement(el : HTMLElement) {
		this.element = el;
		if (this.element.setAttribute) {
			this.element.setAttribute("data-is-snowblind-child", this.ID);
		}
	}
}

/**
 * Inserts a given element after another.
 * @param newNode The node to be inserted after
 * @param current The element given node should be inserted after.
 */
const NodeInsertAfter = function (newNode : any, current : any) : void {
	if (current && current.parentNode) {
		current.parentNode.insertBefore(newNode, current.nextSibling);
	}
};

const childrenObjects = {};
const exposedComponents = {};
const UpdateDispatcher = new Observable();

export {
	UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindChild, childrenObjects, SnowblindRef, NodeInsertAfter
}