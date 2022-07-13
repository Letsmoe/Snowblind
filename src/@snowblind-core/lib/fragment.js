import { make } from "./make";
function SnowblindFragment(props) {
    return () => make("div", null, ...props.children);
}
export { SnowblindFragment };
//# sourceMappingURL=fragment.js.map