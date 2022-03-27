import { Observer } from "./observer.js";
import RenderAssignment from "./render-assignment.js";

export interface Component {
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
