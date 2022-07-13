import { Snowblind, applyState } from "../../dist/snowblind.min.js";

function Comp(props: Snowblind.Props) {
	const [items, setItems] = applyState([]);
	setInterval(() => {
		setItems([{nice: "Make eggs"}])
	}, 1000);

	return () => <>{props.children} {items.map(x => <p>{x.nice}</p>)}</>;
}

Snowblind.render(
	document.body,
	<Comp>
		<div>
			<p>Nice</p>
		</div>
	</Comp>
);
