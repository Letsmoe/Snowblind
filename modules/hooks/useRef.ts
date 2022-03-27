export interface SnowblindRef {
	current : undefined | HTMLElement,
}


/**
 * Focus an element instance after a render cycle, allowing to pass methods directly through to the DOM Node.
 * @returns A reference Object representing the current node captured by the ref.
 */
function useRef() {
	class SnowblindRef implements SnowblindRef {
		public current: undefined | HTMLElement
		constructor() {
			this.current;
		}
	}
	return new SnowblindRef();
}

export { useRef };
