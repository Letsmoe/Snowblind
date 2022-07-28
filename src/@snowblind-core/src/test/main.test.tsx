import { Snowblind, applyState } from "../../dist/snowblind.min.js";

function Comp(props: Snowblind.Props) {
	const [items, setItems] = applyState([]);
	setTimeout(() => {
		setItems([{nice: "Make eggs"}, {nice: "Holy"}])
	}, 1000);

	setTimeout(() => {
		setItems([{nice: "Make eggs"}, {nice: "Holy"}, {nice: "Shit"}]);
	}, 2000)

	return () => <>
		{items.map(key => {
			return <Nested name={key.nice}/>
		})}
	</>;
}

function Nested({name}) {
	return () => (<div><p>{name}</p></div>)
}

Snowblind.render(
	document.body,
	<Comp />
);
