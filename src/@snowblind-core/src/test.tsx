import { Snowblind, useState } from "./snowblind.js";

function App(props: {initial: number}) {
	const [count, setCount] = useState(props.initial);
	return (
		<div>
			<p>You clicked <Counter count={count} /> times</p>
			<button onClick={() => setCount(count + 1)} data-count={count}>Click me</button>
			<UpdatingComponent interval={1000} />
		</div>
	);
}

function UpdatingComponent(props: {interval: number}) {
	const [count, setCount] = useState(0);
	setInterval(() => {
		console.log("Hello")
		setCount(count + 1)
	}, props.interval);
	return <p>{count}</p>;
}

function Counter(props: {count: number}) {
	return <span data-count={props.count}>{props.count}</span>
}

Snowblind.render(document.body, <App initial={5}/>);