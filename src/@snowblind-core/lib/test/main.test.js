import { Snowblind, applyState } from "../../dist/snowblind.min.js";
function Comp(props) {
    const [items, setItems] = applyState([]);
    setTimeout(() => {
        setItems([{ nice: "Make eggs" }, { nice: "Holy" }]);
    }, 1000);
    setTimeout(() => {
        setItems([{ nice: "Make eggs" }, { nice: "Holy" }, { nice: "Shit" }]);
    }, 2000);
    return () => Snowblind.make(Snowblind.Fragment, null, items.map(key => {
        return Snowblind.make(Nested, { name: key.nice });
    }));
}
function Nested({ name }) {
    return () => (Snowblind.make("div", null,
        Snowblind.make("p", null, name)));
}
Snowblind.render(document.body, Snowblind.make(Comp, null));
//# sourceMappingURL=main.test.js.map