import { Snowblind, useState, useRef, onRender } from "./snowblind.js";
function App(props) {
    const [count, setCount] = useState(props.initial);
    const inputItem = useRef();
    onRender((node) => {
        console.log("Did render", node);
        inputItem.current.focus();
    }, [count]);
    return (Snowblind.make("div", { "data-name": count },
        Snowblind.make("p", null,
            "You clicked ",
            Snowblind.make(Counter, { count: count }),
            " times"),
        Snowblind.make("button", { onClick: () => setCount(count + 1), "data-count": count }, "Click me"),
        Snowblind.make(UpdatingComponent, { interval: 5000 }),
        Snowblind.make("input", { ref: inputItem, type: "text" })));
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
Snowblind.render(document.body, Snowblind.make(App, { initial: 0 }));
//# sourceMappingURL=test.js.map