import { Component } from "./component.js";
import { render } from "./render.js";
import { SnowblindFragment } from "./fragment.js";
import { make } from "./make.js";
import { options } from "./options.js";

declare global {
	interface Window {
		typeCheck: (props: {}, propTypes: {}, defaultProps: {}) => never | {};
	}
}

const Snowblind = {
	options: options,
	Component: Component,
	Fragment: SnowblindFragment,
	make: make,
	render: render,
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
