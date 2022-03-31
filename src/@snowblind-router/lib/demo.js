import { WindowRouter, Route, Routes, Link } from "./index.js";
import { html, expose } from "@snowblind/core";
function Expenses() {
    return () => html `<div></div>`;
}
function Invoices() {
    return () => html `<div>
		<Link to="/expenses"></Link>
	</div>`;
}
function App() {
    return () => html `<WindowRouter>
		<Routes>
			<Route path="/expenses" element=${Expenses}></Route>
			<Route path="/invoices" element=${Invoices}></Route>
		</Routes>
	</WindowRouter>`;
}
expose({ App, WindowRouter, Route, Routes, Link });
