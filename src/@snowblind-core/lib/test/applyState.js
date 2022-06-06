import { Snowblind, applyState } from "../../dist/snowblind.min.js";
function App(props) {
    const [count, setCount] = applyState(0);
    return () => (Snowblind.make("div", null,
        Snowblind.make("h1", null, count),
        Snowblind.make("button", { onClick: () => setCount(count + 1) }, "+")));
}
let container = document.createElement("div");
container.id = "app";
document.body.appendChild(container);
Snowblind.render(document.getElementById("app"), Snowblind.make(App, null));
//# sourceMappingURL=applyState.js.map