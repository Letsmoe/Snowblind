import { Component } from "./component.js";
import { render } from "./render.js";
import { make } from "./make.js";
import { options } from "./options.js";

declare global {
	interface Window {
		typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
	}
}
type Props = { children: any[]; [key: string]: any };

interface Snowblind {
	options: {
		// Whether to allow assigning properties of type object to nodes.
		allowObjectProperties: boolean
	};
	Component: typeof Component;
	Fragment: -32 | string;
	make: (
		initializer:
			| string
			| ((props: { [key: string]: any }) => HTMLElement)
			| -32,
		props: Object | null,
		...children: any[] | null
	) => any;
	render: (parent: any, children: any) => void;
	Props?: Props;
};

const Snowblind: Snowblind = {
	options: options,
	Component: Component,
	Fragment: "div",
	make: make,
	render: render
};

export { Snowblind };
export {
	applyState,
	applyRef,
	applyMemo,
	applyReducer,
	applyStyles,
	applyChange,
} from "./hooks/index.js";
