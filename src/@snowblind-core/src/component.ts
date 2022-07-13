import { UpdateDispatcher } from "./shared-internals";

class Component {
	private didUpdateOnce: boolean = false;
	private didMountCallbacks: any[] = [];
	private didUpdateCallbacks: any[] = [];
	private willUnmountCallbacks: any[] = [];
	public type: string;
	node: HTMLElement;
	generator: Function;
	constructor(
		generator: any,
		typeName?: string
	) {
		this.type = typeName;
		this.generator = generator;
		/**
		 * Write component to the UpdateDispatcher to be captured by any hooks, close immediately after.
		 */
		UpdateDispatcher.next(this);
		UpdateDispatcher.restore();
	}
	transitionFunction?: { leave: Function; from: Function; render: Function };

	render() {
		this.node = this.generator();
		return this.node;
	}

	onComponentDidMount(callback: Function) {
		this.didMountCallbacks.push(callback);
	}

	onComponentDidUpdate(callback: Function) {
		this.didUpdateCallbacks.push(callback);
	}
	onComponentWillUnmount(callback: Function) {
		this.willUnmountCallbacks.push(callback);
	}

	didUpdate() {
		if (this.didUpdateOnce) {
			this.didUpdateCallbacks.forEach((callback) => callback(this.node));
		} else {
			this.didMountCallbacks.forEach((callback) => callback(this.node));
			this.didUpdateOnce = true;
		}
	}
}

export { Component }