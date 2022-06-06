import { Reference } from "../shared-internals.js";
/**
 * Focus an element instance after a render cycle, allowing to pass methods directly through to the DOM Node.
 * @returns A reference Object representing the current node captured by the ref.
 */
function applyRef() {
    return new Reference();
}
export { applyRef };
//# sourceMappingURL=applyRef.js.map