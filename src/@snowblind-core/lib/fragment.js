import { make } from "./make";
function SnowblindFragment(props) {
    return () => make("Fragment", null, ...props.children);
}
export { SnowblindFragment };
//# sourceMappingURL=fragment.js.map