class Observable {
	public value: any;
	private subscribers: any[];
	public subscriberCount : number = 0;
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
		this.subscriberCount++;
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
}

class Reference {
	public current : any;
	constructor() {
		this.current;
	}
}
const UpdateDispatcher = new Observable();

export {
	UpdateDispatcher, Observable, Reference
}