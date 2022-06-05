import { Snowblind, applyState, applyRef } from "./index.js";

function App() {
	const [todos, setTodos] = applyState(["Clean"]);
	const inputRef = applyRef();
	const addTodo = () => {
		if (inputRef.current.value)
			setTodos([...todos, inputRef.current.value]);
	};

	return () => (
		<div>
			<h1>Todos ({todos.length})</h1>
			<ul>
				{todos.map((todo, index) => {
					return <li key={index}>{todo} - {Math.random()}</li>;
				})}
			</ul>
			<input type="text" ref={inputRef} onEnter={addTodo}></input>
			<button onClick={addTodo}>Add Todo</button>
		</div>
	);
}

Snowblind.render(document.body, <App />);
