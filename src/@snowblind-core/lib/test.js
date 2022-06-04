import { Snowblind, useState } from "./snowblind.js";
function App(props) {
    const [count, setCount] = useState(props.initial);
    return (Snowblind.make("div", null,
        Snowblind.make("p", null,
            "You clicked ",
            Snowblind.make(Counter, { count: count }),
            " times"),
        Snowblind.make("button", { onClick: () => setCount(count + 1), "data-count": count }, "Click me"),
        Snowblind.make(UpdatingComponent, { interval: 1000 })));
}
function UpdatingComponent(props) {
    const [count, setCount] = useState(0);
    setInterval(() => {
        console.log("Hello");
        setCount(count + 1);
    }, props.interval);
    return Snowblind.make("p", null, count);
}
function Counter(props) {
    return Snowblind.make("span", { "data-count": props.count }, props.count);
}
Snowblind.render(document.body, Snowblind.make(App, { initial: 5 }));
//# sourceMappingURL=test.js.map