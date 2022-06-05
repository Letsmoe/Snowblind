import { Snowblind, applyState, applyRef } from "./index.js";
function App() {
    const [todos, setTodos] = applyState(["Clean"]);
    const inputRef = applyRef();
    const addTodo = () => {
        if (inputRef.current.value)
            setTodos([...todos, inputRef.current.value]);
    };
    return () => (Snowblind.make("div", null,
        Snowblind.make("h1", null,
            "Todos (",
            todos.length,
            ")"),
        Snowblind.make("ul", null, todos.map((todo, index) => {
            return Snowblind.make("li", { key: index },
                todo,
                " - ",
                Math.random());
        })),
        Snowblind.make("input", { type: "text", ref: inputRef, onEnter: addTodo }),
        Snowblind.make("button", { onClick: addTodo }, "Add Todo")));
}
Snowblind.render(document.body, Snowblind.make(App, null));
//# sourceMappingURL=test.js.map