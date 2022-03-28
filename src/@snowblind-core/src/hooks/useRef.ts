import { SnowblindRef } from "../shared-internals";

/**
 * Focus an element instance after a render cycle, allowing to pass methods directly through to the DOM Node.
 * @returns A reference Object representing the current node captured by the ref.
 */
function useRef() : ISnowblindRef {
	class SnowblindRef implements ISnowblindRef {
		public current: undefined | HTMLElement
		constructor() {
			this.current;
		}
	}
	return new SnowblindRef();
}

export { useRef };
