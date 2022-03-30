import { SnowblindRef } from "../shared-internals.js";
import {ISnowblindRef} from "../types"

/**
 * Focus an element instance after a render cycle, allowing to pass methods directly through to the DOM Node.
 * @returns A reference Object representing the current node captured by the ref.
 */
function useRef() : ISnowblindRef {
	return new SnowblindRef();
}

export { useRef };
