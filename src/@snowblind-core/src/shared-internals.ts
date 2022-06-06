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

	restore() {
		this.subscribers = [];
		this.value = undefined;
	}
}

function ObserverProxy(obs: Observable) {
	let target = { value: obs.value };
	/** A function to update the value of the proxy from the instance that instantiated the proxy */
	obs.subscribe((newValue: any) => target.value = newValue);
	return  new Proxy(target, {
		get(target, prop) {
			if (prop === isProxy) {
				return obs
			}
			const prim = Reflect.get(target, "value");
			const value = prim[prop];
			return typeof value === "function" ? value.bind(prim) : value;
		},
		ownKeys(target) {
			return Reflect.ownKeys(target.value);
		}
	})

}

class Reference {
	public current : any;
	constructor() {
		this.current;
	}
}
const UpdateDispatcher = new Observable();
const isProxy = Symbol("isProxy");

export {
	UpdateDispatcher, Observable, Reference, ObserverProxy, isProxy
}