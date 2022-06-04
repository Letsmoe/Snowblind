class Observable {
	public value: any;
	private subscribers: any[];
	constructor(value? : any) {
		this.value = value;
		this.subscribers = [];
	}

	next(value : any) {
		this.value = value;
		for (const subscriber of this.subscribers) {
			subscriber(value)
		}
	}

	subscribe(callback : (element? : any) => void) {
		this.subscribers.push(callback);
	}

	complete() {
		this.subscribers = new Proxy([], {set: () => {
			throw new Error("Observable has been closed.")
		}});
	}

	restore() {
		this.subscribers = [];
		this.value = undefined;
	}

	valueOf() {
		return this.value;
	}

	toString() {
		return this.value.toString();
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
		this.value = obs.value;

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

const exposedComponents = {};
const UpdateDispatcher = new Observable();

export {
	UpdateDispatcher, ValueBinder, Observable, exposedComponents, SnowblindRef, NodeInsertAfter
}