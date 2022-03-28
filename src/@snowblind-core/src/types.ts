import { Observer } from "./observer.js";
import RenderAssignment from "./render-assignment.js";

export interface ISnowblindRef {
	current: undefined | HTMLElement;
}

export interface SnowblindComponent {
	Node: HTMLElement;
	transitionFunction?: {
		leave: Function;
		from: Function;
		render: Function;
	};
	hasTheme: Boolean;
	_maxCopies: number;
	_usesTransition: Boolean;
	didMountCallbacks: Array<Function>;
	didUpdateCallbacks: Array<Function>;
	willUnmountCallbacks: Array<Function>;
	_Observer: Observer;
	props: Object;
	Renderer: RenderAssignment;
	_generatorFunction: Function;

	onComponentDidMount(callback: Function): void;
	onComponentDidUpdate(callback: Function): void;
	onComponentWillUnmount(callback: Function): void;
	render(...args: any[]): any;
}

export interface SnowblindElement extends HTMLElement {
	isReferenceTo?: ISnowblindRef
}