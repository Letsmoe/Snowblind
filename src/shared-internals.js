class Observable {
	constructor(value) {
		this._value = value;
		this._subscribers = [];
	}

	_updateValue(value) {
		this._value = value;
		for (const subscriber of this._subscribers) {
			subscriber(value)
		}
	}

	next(value) {
		this._updateValue(value)
	}

	subscribe(callback) {
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

class ValueBinder {
	constructor(obs) {
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

const UpdateDispatcher = new Observable();

export {
	UpdateDispatcher, ValueBinder, Observable
}