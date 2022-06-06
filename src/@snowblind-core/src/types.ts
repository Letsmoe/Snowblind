export interface ISnowblindRef {
	current: undefined | HTMLElement;
}

export interface ISnowblindElement extends HTMLElement {
	isReferenceTo?: ISnowblindRef
}

export interface iSnowblind {
	Component: any;
	options: {
		/** Whether to allow passing objects such as arrays or other objects as properties to an HTML element. */
		allowObjectProperties: boolean;
	}
	/** The default implementation of an HTML fragment (<> </>) */
	Fragment: (props: any) => () => DocumentFragment;
	render: (container: HTMLElement, component: any) => void;
	make: (initializer: Function | string | HTMLElement, props: {[key: string]: any}) => any;
}

export const MATCH_INDEX = /\{\{([0-9]+)\}\}/g;