import { Snowblind, applyState } from "../../dist/snowblind.min.js";
function Comp(props) {
    const [items, setItems] = applyState([]);
    setInterval(() => {
        setItems([{ nice: "Make eggs" }]);
    }, 1000);
    return () => Snowblind.make(Snowblind.Fragment, null,
        props.children,
        " ",
        items.map(x => Snowblind.make("p", null, x.nice)));
}
Snowblind.render(document.body, Snowblind.make(Comp, null,
    Snowblind.make("div", null,
        Snowblind.make("p", null, "Nice"))));
//# sourceMappingURL=main.test.js.map